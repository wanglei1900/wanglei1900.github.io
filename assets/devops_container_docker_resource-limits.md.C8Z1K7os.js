import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Docker 资源限制配置 - 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/docker/resource-limits.md","filePath":"devops/container/docker/resource-limits.md"}'),_={name:"devops/container/docker/resource-limits.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="docker-资源限制配置-完整学习笔记" tabindex="-1"><strong>Docker 资源限制配置 - 完整学习笔记</strong> <a class="header-anchor" href="#docker-资源限制配置-完整学习笔记" aria-label="Permalink to &quot;**Docker 资源限制配置 - 完整学习笔记**&quot;">​</a></h1><h2 id="一、资源限制概述与原理" tabindex="-1"><strong>一、资源限制概述与原理</strong> <a class="header-anchor" href="#一、资源限制概述与原理" aria-label="Permalink to &quot;**一、资源限制概述与原理**&quot;">​</a></h2><h3 id="_1-1-为什么需要资源限制" tabindex="-1"><strong>1.1 为什么需要资源限制？</strong> <a class="header-anchor" href="#_1-1-为什么需要资源限制" aria-label="Permalink to &quot;**1.1 为什么需要资源限制？**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">资源竞争问题：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 内存溢出 → 容器耗尽内存，影响宿主机稳定性</span></span>
<span class="line"><span class="__shiki_wvjl67">2. CPU饥饿 → 单个容器占用全部CPU，其他容器无法工作</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 磁盘I/O阻塞 → 大量磁盘操作导致系统卡顿</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 进程数爆炸 → fork炸弹耗尽系统进程ID</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">核心目标：</span></span>
<span class="line"><span class="__shiki_wvjl67">- 保证公平性：多容器共享资源</span></span>
<span class="line"><span class="__shiki_wvjl67">- 保证稳定性：防止单一容器影响系统</span></span>
<span class="line"><span class="__shiki_wvjl67">- 保证性能：确保关键服务获得足够资源</span></span>
<span class="line"><span class="__shiki_wvjl67">- 成本控制：精确分配资源，避免浪费</span></span></code></pre></div><h3 id="_1-2-linux-cgroups-基础" tabindex="-1"><strong>1.2 Linux cgroups 基础</strong> <a class="header-anchor" href="#_1-2-linux-cgroups-基础" aria-label="Permalink to &quot;**1.2 Linux cgroups 基础**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># cgroups 控制组层级结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">/sys/fs/cgroup/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> cpu,cpuacct/</span><span class="__shiki_21nrsd">           # CPU 和 CPU 核算</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> memory/</span><span class="__shiki_21nrsd">                # 内存限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> blkio/</span><span class="__shiki_21nrsd">                 # 块设备I/O</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> pids/</span><span class="__shiki_21nrsd">                  # 进程数限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> devices/</span><span class="__shiki_21nrsd">               # 设备访问控制</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> freezer/</span><span class="__shiki_21nrsd">               # 进程冻结</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> net_cls,net_prio/</span><span class="__shiki_21nrsd">      # 网络分类和优先级</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看容器的cgroup路径</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_mdbnqw"> &quot;Cgroup&quot;</span></span></code></pre></div><h2 id="二、cpu-资源限制" tabindex="-1"><strong>二、CPU 资源限制</strong> <a class="header-anchor" href="#二、cpu-资源限制" aria-label="Permalink to &quot;**二、CPU 资源限制**&quot;">​</a></h2><h3 id="_2-1-cpu-限制参数详解" tabindex="-1"><strong>2.1 CPU 限制参数详解</strong> <a class="header-anchor" href="#_2-1-cpu-限制参数详解" aria-label="Permalink to &quot;**2.1 CPU 限制参数详解**&quot;">​</a></h3><h4 id="_2-1-1-cpu-份额-cpu-shares" tabindex="-1"><strong>2.1.1 CPU 份额 (CPU shares)</strong> <a class="header-anchor" href="#_2-1-1-cpu-份额-cpu-shares" aria-label="Permalink to &quot;**2.1.1 CPU 份额 (CPU shares)**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 默认所有容器权重相等 (1024)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器A: --cpu-shares=1024</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器B: --cpu-shares=512</span></span>
<span class="line"><span class="__shiki_21nrsd"># 当CPU竞争时，A获得2/3，B获得1/3的CPU时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> web1</span><span class="__shiki_dzsirb"> --cpu-shares=512</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> web2</span><span class="__shiki_dzsirb"> --cpu-shares=1024</span><span class="__shiki_mdbnqw"> nginx</span></span></code></pre></div><h4 id="_2-1-2-cpu-周期和配额" tabindex="-1"><strong>2.1.2 CPU 周期和配额</strong> <a class="header-anchor" href="#_2-1-2-cpu-周期和配额" aria-label="Permalink to &quot;**2.1.2 CPU 周期和配额**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># --cpu-period (微秒): 重新分配CPU时间片的周期</span></span>
<span class="line"><span class="__shiki_21nrsd"># --cpu-quota (微秒): 在一个周期内可使用的CPU时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 示例: 限制容器最多使用50%的单核CPU</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --cpu-period=100000</span><span class="__shiki_dzsirb"> --cpu-quota=50000</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 等效于使用--cpus参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --cpus=0.5</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_21nrsd">  # 限制使用半个CPU核心</span></span></code></pre></div><h4 id="_2-1-3-cpu-集绑定" tabindex="-1"><strong>2.1.3 CPU 集绑定</strong> <a class="header-anchor" href="#_2-1-3-cpu-集绑定" aria-label="Permalink to &quot;**2.1.3 CPU 集绑定**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 将容器绑定到特定CPU核心</span></span>
<span class="line"><span class="__shiki_21nrsd"># --cpuset-cpus: 指定可使用的CPU核心</span></span>
<span class="line"><span class="__shiki_21nrsd"># --cpuset-mems: 指定可使用的内存节点(NUMA)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 绑定到CPU核心0和1</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --cpuset-cpus=</span><span class="__shiki_mdbnqw">&quot;0,1&quot;</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 绑定到CPU核心0-3</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --cpuset-cpus=</span><span class="__shiki_mdbnqw">&quot;0-3&quot;</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># NUMA架构下绑定内存节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> --cpuset-cpus=</span><span class="__shiki_mdbnqw">&quot;0,1&quot;</span><span class="__shiki_dzsirb"> --cpuset-mems=</span><span class="__shiki_mdbnqw">&quot;0&quot;</span><span class="__shiki_mdbnqw"> nginx</span></span></code></pre></div><h3 id="_2-2-cpu-限制配置示例" tabindex="-1"><strong>2.2 CPU 限制配置示例</strong> <a class="header-anchor" href="#_2-2-cpu-限制配置示例" aria-label="Permalink to &quot;**2.2 CPU 限制配置示例**&quot;">​</a></h3><h4 id="_2-2-1-生产环境配置模板" tabindex="-1"><strong>2.2.1 生产环境配置模板</strong> <a class="header-anchor" href="#_2-2-1-生产环境配置模板" aria-label="Permalink to &quot;**2.2.1 生产环境配置模板**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Web应用：中等CPU需求</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> webapp</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=1.5</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                   # 限制1.5个CPU核心</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-shares</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">768</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">             # 相对权重</span></span>
<span class="line"><span class="__shiki_140thh">  --cpuset-cpus</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;0-3,8-11&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">     # 允许使用这些核心（避开关键核心）</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-period</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">100000</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">          # 100ms周期</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-quota</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">150000</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">           # 每周期150ms = 1.5核心</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批处理任务：低优先级</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> batch-job</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=0.5</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                   # 限制0.5个CPU核心</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-shares</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">256</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">             # 低优先级</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-period</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">100000</span><span class="__shiki_1t8gfj"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpu-quota=50000</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  batch-processor:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数据库：高CPU需求</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> postgres</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=4</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                     # 4个CPU核心</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-shares</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">1024</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">            # 标准优先级</span></span>
<span class="line"><span class="__shiki_140thh">  --cpuset-cpus</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;4-7&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">          # 绑定到特定核心</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-period</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">100000</span><span class="__shiki_1t8gfj"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpu-quota=400000</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  postgres:14</span></span></code></pre></div><h4 id="_2-2-2-实时cpu监控" tabindex="-1"><strong>2.2.2 实时CPU监控</strong> <a class="header-anchor" href="#_2-2-2-实时cpu监控" aria-label="Permalink to &quot;**2.2.2 实时CPU监控**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 监控容器CPU使用率</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}\\t{{.BlockIO}}&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看详细的cgroup CPU配置</span></span>
<span class="line"><span class="__shiki_140thh">CONTAINER_ID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> name=webapp</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">PID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_mdbnqw"> &#39;{{.State.Pid}}&#39;</span><span class="__shiki_140thh"> $CONTAINER_ID)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/cpu/docker/</span><span class="__shiki_140thh">$CONTAINER_ID</span><span class="__shiki_mdbnqw">/cpu.shares</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/cpu/docker/</span><span class="__shiki_140thh">$CONTAINER_ID</span><span class="__shiki_mdbnqw">/cpu.cfs_period_us</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/cpu/docker/</span><span class="__shiki_140thh">$CONTAINER_ID</span><span class="__shiki_mdbnqw">/cpu.cfs_quota_us</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/cpuset/docker/</span><span class="__shiki_140thh">$CONTAINER_ID</span><span class="__shiki_mdbnqw">/cpuset.cpus</span></span></code></pre></div><h3 id="_2-3-cpu-调度策略" tabindex="-1"><strong>2.3 CPU 调度策略</strong> <a class="header-anchor" href="#_2-3-cpu-调度策略" aria-label="Permalink to &quot;**2.3 CPU 调度策略**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 实时进程调度（需要CAP_SYS_NICE）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> realtime-app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cap-add=sys_nice</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpu-rt-runtime=950000</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">       # 实时任务最多运行950ms/秒</span></span>
<span class="line"><span class="__shiki_140thh">  --cpu-rt-period</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">1000000</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">       # 周期1秒</span></span>
<span class="line"><span class="__shiki_1t8gfj">  realtime-app:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 注意：--cpu-rt-runtime和--cpu-rt-period需要内核参数支持</span></span>
<span class="line"><span class="__shiki_21nrsd"># 需要设置：CONFIG_RT_GROUP_SCHED=y</span></span></code></pre></div><h2 id="三、内存资源限制" tabindex="-1"><strong>三、内存资源限制</strong> <a class="header-anchor" href="#三、内存资源限制" aria-label="Permalink to &quot;**三、内存资源限制**&quot;">​</a></h2><h3 id="_3-1-内存限制类型详解" tabindex="-1"><strong>3.1 内存限制类型详解</strong> <a class="header-anchor" href="#_3-1-内存限制类型详解" aria-label="Permalink to &quot;**3.1 内存限制类型详解**&quot;">​</a></h3><h4 id="_3-1-1-内存限制参数" tabindex="-1"><strong>3.1.1 内存限制参数</strong> <a class="header-anchor" href="#_3-1-1-内存限制参数" aria-label="Permalink to &quot;**3.1.1 内存限制参数**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基本内存限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=</span><span class="__shiki_mdbnqw">&quot;512m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">               # 硬内存限制（不可超过）</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-swap</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;1g&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">            # 内存+交换分区总限制</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-reservation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;256m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">   # 软内存限制（尽量不超过）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存交换限制</span></span>
<span class="line"><span class="__shiki_21nrsd"># --memory-swap 配置说明：</span></span>
<span class="line"><span class="__shiki_21nrsd"># -1            → 允许使用无限swap（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 0             → 禁用swap</span></span>
<span class="line"><span class="__shiki_21nrsd"># 等于--memory  → 禁用swap</span></span>
<span class="line"><span class="__shiki_21nrsd"># 大于--memory  → 差值可用于swap</span></span></code></pre></div><h4 id="_3-1-2-内核内存限制" tabindex="-1"><strong>3.1.2 内核内存限制</strong> <a class="header-anchor" href="#_3-1-2-内核内存限制" aria-label="Permalink to &quot;**3.1.2 内核内存限制**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 内核内存特殊限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --kernel-memory=</span><span class="__shiki_mdbnqw">&quot;128m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">        # 内核内存（栈、页表等）</span></span>
<span class="line"><span class="__shiki_140thh">  --memory</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;512m&quot;</span><span class="__shiki_1t8gfj"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --oom-kill-disable</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">            # 禁用OOM Killer（危险！）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  critical-app:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># OOM分数调整</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --oom-score-adj=-500</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">          # 调整OOM优先级（-1000到1000）</span></span>
<span class="line"><span class="__shiki_140thh">  --memory</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;512m&quot;</span><span class="__shiki_1t8gfj"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  important-app:latest</span></span></code></pre></div><h3 id="_3-2-内存限制配置实践" tabindex="-1"><strong>3.2 内存限制配置实践</strong> <a class="header-anchor" href="#_3-2-内存限制配置实践" aria-label="Permalink to &quot;**3.2 内存限制配置实践**&quot;">​</a></h3><h4 id="_3-2-1-不同应用场景配置" tabindex="-1"><strong>3.2.1 不同应用场景配置</strong> <a class="header-anchor" href="#_3-2-1-不同应用场景配置" aria-label="Permalink to &quot;**3.2.1 不同应用场景配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 微服务：适度内存限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> api-service</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=</span><span class="__shiki_mdbnqw">&quot;256m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">               # 最大256MB</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-reservation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;128m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">   # 至少保证128MB</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-swap</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;512m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">          # 允许256MB swap</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-swappiness</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">10</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">        # 低交换倾向（0-100）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  api-service:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数据库：大内存，严格限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> mysql-db</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=</span><span class="__shiki_mdbnqw">&quot;4g&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                 # 最大4GB</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-swap</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;4g&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">            # 禁用swap（等值）</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-reservation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;3g&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">     # 尽量保证3GB</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-swappiness</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">0</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">         # 尽可能不使用swap</span></span>
<span class="line"><span class="__shiki_1t8gfj">  mysql:8.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Java应用：考虑JVM内存</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> java-app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=</span><span class="__shiki_mdbnqw">&quot;2g&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                 # 容器总内存</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-swap</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;2g&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">            # 禁用swap</span></span>
<span class="line"><span class="__shiki_1t8gfj">  -e</span><span class="__shiki_mdbnqw"> JAVA_OPTS=&quot;-Xmx1500m -Xms512m&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # JVM堆内存</span></span>
<span class="line"><span class="__shiki_1t8gfj">  java-app:latest</span></span></code></pre></div><h4 id="_3-2-2-内存监控与调试" tabindex="-1"><strong>3.2.2 内存监控与调试</strong> <a class="header-anchor" href="#_3-2-2-内存监控与调试" aria-label="Permalink to &quot;**3.2.2 内存监控与调试**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看容器内存使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;table {{.Name}}\\t{{.MemUsage}}\\t{{.MemPerc}}\\t{{.PIDs}}&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看详细内存统计</span></span>
<span class="line"><span class="__shiki_140thh">CONTAINER_ID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> name=mysql-db</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/memory/docker/</span><span class="__shiki_140thh">$CONTAINER_ID</span><span class="__shiki_mdbnqw">/memory.stat</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关键指标：</span></span>
<span class="line"><span class="__shiki_21nrsd"># cache        → 页面缓存</span></span>
<span class="line"><span class="__shiki_21nrsd"># rss          → 常驻内存集</span></span>
<span class="line"><span class="__shiki_21nrsd"># swap         → 交换使用量</span></span>
<span class="line"><span class="__shiki_21nrsd"># oom_control  → OOM控制状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模拟内存压力测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --memory=</span><span class="__shiki_mdbnqw">&quot;100m&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  progrium/stress</span><span class="__shiki_dzsirb"> --vm</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_dzsirb"> --vm-bytes</span><span class="__shiki_mdbnqw"> 90M</span><span class="__shiki_dzsirb"> --vm-hang</span><span class="__shiki_dzsirb"> 0</span></span></code></pre></div><h3 id="_3-3-oom-killer-处理策略" tabindex="-1"><strong>3.3 OOM Killer 处理策略</strong> <a class="header-anchor" href="#_3-3-oom-killer-处理策略" aria-label="Permalink to &quot;**3.3 OOM Killer 处理策略**&quot;">​</a></h3><h4 id="_3-3-1-oom-预防与响应" tabindex="-1"><strong>3.3.1 OOM 预防与响应</strong> <a class="header-anchor" href="#_3-3-1-oom-预防与响应" aria-label="Permalink to &quot;**3.3.1 OOM 预防与响应**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 监控OOM事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">dmesg</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;killed process&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">journalctl</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> oom</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 查看容器OOM状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;{{.State.OOMKilled}} {{.State.ExitCode}}&#39;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. OOM事件自动重启策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> resilient-app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=</span><span class="__shiki_mdbnqw">&quot;256m&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --restart=on-failure:5</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">        # OOM时自动重启，最多5次</span></span>
<span class="line"><span class="__shiki_140thh">  --restart-max-duration</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">30s</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">    # 30秒内重启</span></span>
<span class="line"><span class="__shiki_1t8gfj">  app:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 紧急内存回收脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># emergency-memory-cleanup.sh</span></span>
<span class="line"><span class="__shiki_140thh">MEM_THRESHOLD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">90</span></span>
<span class="line"><span class="__shiki_140thh">MEM_USAGE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> Mem</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $3/$2 * 100.0}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (( $(echo </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$MEM_USAGE</span><span class="__shiki_mdbnqw"> &gt; </span><span class="__shiki_140thh">$MEM_THRESHOLD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_140thh"> bc </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">l) )); </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;High memory usage detected: \${</span><span class="__shiki_140thh">MEM_USAGE</span><span class="__shiki_mdbnqw">}%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理Docker缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">    docker</span><span class="__shiki_mdbnqw"> system</span><span class="__shiki_mdbnqw"> prune</span><span class="__shiki_dzsirb"> -f</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重启低优先级容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">    docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> &quot;label=priority=low&quot;</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> xargs</span><span class="__shiki_mdbnqw"> docker</span><span class="__shiki_mdbnqw"> restart</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 触发内存回收</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /proc/sys/vm/drop_caches</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span></code></pre></div><h2 id="四、磁盘-i-o-资源限制" tabindex="-1"><strong>四、磁盘 I/O 资源限制</strong> <a class="header-anchor" href="#四、磁盘-i-o-资源限制" aria-label="Permalink to &quot;**四、磁盘 I/O 资源限制**&quot;">​</a></h2><h3 id="_4-1-块设备-i-o-限制" tabindex="-1"><strong>4.1 块设备 I/O 限制</strong> <a class="header-anchor" href="#_4-1-块设备-i-o-限制" aria-label="Permalink to &quot;**4.1 块设备 I/O 限制**&quot;">​</a></h3><h4 id="_4-1-1-读写带宽限制" tabindex="-1"><strong>4.1.1 读写带宽限制</strong> <a class="header-anchor" href="#_4-1-1-读写带宽限制" aria-label="Permalink to &quot;**4.1.1 读写带宽限制**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限制读/写带宽 (bytes/s)</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> io-limited</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --device-read-bps</span><span class="__shiki_mdbnqw"> /dev/sda:1mb</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">     # 读带宽限制：1MB/s</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --device-write-bps</span><span class="__shiki_mdbnqw"> /dev/sda:1mb</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">    # 写带宽限制：1MB/s</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --device-read-iops</span><span class="__shiki_mdbnqw"> /dev/sda:100</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">    # 读IOPS限制：100</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --device-write-iops</span><span class="__shiki_mdbnqw"> /dev/sda:100</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">   # 写IOPS限制：100</span></span>
<span class="line"><span class="__shiki_1t8gfj">  data-processor:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 针对特定设备的限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --device-read-bps</span><span class="__shiki_mdbnqw"> /dev/nvme0n1:500mb</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">  # NVMe设备</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --device-read-bps</span><span class="__shiki_mdbnqw"> /dev/sdb:50mb</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">       # HDD设备</span></span>
<span class="line"><span class="__shiki_1t8gfj">  app:latest</span></span></code></pre></div><h4 id="_4-1-2-权重与优先级" tabindex="-1"><strong>4.1.2 权重与优先级</strong> <a class="header-anchor" href="#_4-1-2-权重与优先级" aria-label="Permalink to &quot;**4.1.2 权重与优先级**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用权重分配I/O资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --blkio-weight=500</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">               # 默认权重500，范围10-1000</span></span>
<span class="line"><span class="__shiki_140thh">  --blkio-weight-device</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/dev/sda:200&quot;</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 特定设备权重</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 相对权重示例：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器A: --blkio-weight=300  → 获得30%的I/O资源</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器B: --blkio-weight=700  → 获得70%的I/O资源</span></span></code></pre></div><h3 id="_4-2-存储配额限制" tabindex="-1"><strong>4.2 存储配额限制</strong> <a class="header-anchor" href="#_4-2-存储配额限制" aria-label="Permalink to &quot;**4.2 存储配额限制**&quot;">​</a></h3><h4 id="_4-2-1-存储驱动限制" tabindex="-1"><strong>4.2.1 存储驱动限制</strong> <a class="header-anchor" href="#_4-2-1-存储驱动限制" aria-label="Permalink to &quot;**4.2.1 存储驱动限制**&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// /etc/docker/daemon.json - Overlay2大小限制</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;storage-driver&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;overlay2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;storage-opts&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;overlay2.size=20G&quot;</span><span class="__shiki_21nrsd">  // 限制单个容器/镜像大小为20GB</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// DeviceMapper Thin Pool配置</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;storage-driver&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;devicemapper&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;storage-opts&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;dm.basesize=10G&quot;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 基础镜像大小限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;dm.loopdatasize=200G&quot;</span><span class="__shiki_21nrsd">  // 数据文件大小</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-磁盘使用监控" tabindex="-1"><strong>4.2.2 磁盘使用监控</strong> <a class="header-anchor" href="#_4-2-2-磁盘使用监控" aria-label="Permalink to &quot;**4.2.2 磁盘使用监控**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看容器磁盘使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> system</span><span class="__shiki_mdbnqw"> df</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> system</span><span class="__shiki_mdbnqw"> df</span><span class="__shiki_dzsirb"> -v</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看容器详细磁盘信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --size</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控脚本：磁盘使用率告警</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_140thh">THRESHOLD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">80</span></span>
<span class="line"><span class="__shiki_140thh">CONTAINERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> CONTAINER </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $CONTAINERS; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    USAGE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format=</span><span class="__shiki_mdbnqw">&#39;{{.SizeRootFs}}&#39;</span><span class="__shiki_140thh"> $CONTAINER </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> numfmt</span><span class="__shiki_dzsirb"> --to=si</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format=</span><span class="__shiki_mdbnqw">&#39;{{.HostConfig.StorageOpt}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Container: $(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect </span><span class="__shiki_dzsirb">--format=</span><span class="__shiki_mdbnqw">&#39;{{.Name}}&#39; </span><span class="__shiki_140thh">$CONTAINER</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Disk Usage: </span><span class="__shiki_140thh">$USAGE</span><span class="__shiki_mdbnqw"> / </span><span class="__shiki_140thh">$LIMIT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h2 id="五、网络资源限制" tabindex="-1"><strong>五、网络资源限制</strong> <a class="header-anchor" href="#五、网络资源限制" aria-label="Permalink to &quot;**五、网络资源限制**&quot;">​</a></h2><h3 id="_5-1-网络带宽限制" tabindex="-1"><strong>5.1 网络带宽限制</strong> <a class="header-anchor" href="#_5-1-网络带宽限制" aria-label="Permalink to &quot;**5.1 网络带宽限制**&quot;">​</a></h3><h4 id="_5-1-1-使用-tc-traffic-control" tabindex="-1"><strong>5.1.1 使用 tc (traffic control)</strong> <a class="header-anchor" href="#_5-1-1-使用-tc-traffic-control" aria-label="Permalink to &quot;**5.1.1 使用 tc (traffic control)**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建网络限速容器（需要特权模式）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> rate-limiter</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cap-add=NET_ADMIN</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /var/run/docker.sock:/var/run/docker.sock</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  traffic-control-image</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或者使用第三方工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> pumba</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --network</span><span class="__shiki_mdbnqw"> host</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /var/run/docker.sock:/var/run/docker.sock</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  gaiaadm/pumba</span><span class="__shiki_mdbnqw"> netem</span><span class="__shiki_dzsirb"> --duration</span><span class="__shiki_mdbnqw"> 10m</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  rate</span><span class="__shiki_dzsirb"> --rate</span><span class="__shiki_mdbnqw"> 1mbps</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">container_nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h4 id="_5-1-2-容器网络限速方案" tabindex="-1"><strong>5.1.2 容器网络限速方案</strong> <a class="header-anchor" href="#_5-1-2-容器网络限速方案" aria-label="Permalink to &quot;**5.1.2 容器网络限速方案**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方案1：使用docker-tc项目</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> clone</span><span class="__shiki_mdbnqw"> https://github.com/lukaszlach/docker-tc</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> docker-tc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置网络限速规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> tc-config.yml</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">version: &#39;2&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  webapp:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rate: 10mbit</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ceil: 20mbit</span></span>
<span class="line"><span class="__shiki_mdbnqw">    burst: 1mb</span></span>
<span class="line"><span class="__shiki_mdbnqw">  database:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rate: 100mbit</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ceil: 200mbit</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h3 id="_5-2-连接数限制" tabindex="-1"><strong>5.2 连接数限制</strong> <a class="header-anchor" href="#_5-2-连接数限制" aria-label="Permalink to &quot;**5.2 连接数限制**&quot;">​</a></h3><h4 id="_5-2-1-系统级连接限制" tabindex="-1"><strong>5.2.1 系统级连接限制</strong> <a class="header-anchor" href="#_5-2-1-系统级连接限制" aria-label="Permalink to &quot;**5.2.1 系统级连接限制**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置容器网络命名空间的连接限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> connection-limited</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --sysctl</span><span class="__shiki_mdbnqw"> net.core.somaxconn=</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">        # TCP连接队列大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --sysctl</span><span class="__shiki_mdbnqw"> net.ipv4.tcp_max_syn_backlog=</span><span class="__shiki_dzsirb">2048</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # SYN队列大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --sysctl</span><span class="__shiki_mdbnqw"> net.netfilter.nf_conntrack_max=</span><span class="__shiki_dzsirb">65536</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 连接跟踪表大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看当前连接数</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> ss</span><span class="__shiki_dzsirb"> -s</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> netstat</span><span class="__shiki_dzsirb"> -an</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span></span></code></pre></div><h4 id="_5-2-2-应用级连接限制" tabindex="-1"><strong>5.2.2 应用级连接限制</strong> <a class="header-anchor" href="#_5-2-2-应用级连接限制" aria-label="Permalink to &quot;**5.2.2 应用级连接限制**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Nginx示例：在容器内配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> nginx-limited</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -e</span><span class="__shiki_mdbnqw"> NGINX_WORKER_CONNECTIONS=</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> ./nginx.conf:/etc/nginx/nginx.conf</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nginx:alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># nginx.conf 片段</span></span>
<span class="line"><span class="__shiki_1t8gfj">events</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    worker_connections</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    multi_accept</span><span class="__shiki_mdbnqw"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、进程与文件描述符限制" tabindex="-1"><strong>六、进程与文件描述符限制</strong> <a class="header-anchor" href="#六、进程与文件描述符限制" aria-label="Permalink to &quot;**六、进程与文件描述符限制**&quot;">​</a></h2><h3 id="_6-1-进程数限制" tabindex="-1"><strong>6.1 进程数限制</strong> <a class="header-anchor" href="#_6-1-进程数限制" aria-label="Permalink to &quot;**6.1 进程数限制**&quot;">​</a></h3><h4 id="_6-1-1-pids-cgroup-限制" tabindex="-1"><strong>6.1.1 PIDs cgroup 限制</strong> <a class="header-anchor" href="#_6-1-1-pids-cgroup-限制" aria-label="Permalink to &quot;**6.1.1 PIDs cgroup 限制**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限制容器内最大进程数</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> pids-limited</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --pids-limit=100</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">               # 最多100个进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --ulimit</span><span class="__shiki_mdbnqw"> nproc=50:100</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">          # 每个用户进程限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  app:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控进程数</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_mdbnqw"> aux</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/pids/docker/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">/pids.current</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/pids/docker/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">container_i</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">/pids.max</span></span></code></pre></div><h4 id="_6-1-2-fork-bomb-防护" tabindex="-1"><strong>6.1.2 Fork Bomb 防护</strong> <a class="header-anchor" href="#_6-1-2-fork-bomb-防护" aria-label="Permalink to &quot;**6.1.2 Fork Bomb 防护**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 防护脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># fork-bomb-detector.sh</span></span>
<span class="line"><span class="__shiki_140thh">CONTAINERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> CONTAINER </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $CONTAINERS; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    PID_LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;{{.HostConfig.PidsLimit}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_140thh">    CURRENT_PIDS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_140thh"> $CONTAINER </span><span class="__shiki_mdbnqw">ps</span><span class="__shiki_dzsirb"> -eLf</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ $PID_LIMIT </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ] &amp;&amp; [ $CURRENT_PIDS </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_140thh"> $((</span><span class="__shiki_1t8gfj">PID_LIMIT</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)) ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;警告：容器 $(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect </span><span class="__shiki_dzsirb">--format=</span><span class="__shiki_mdbnqw">&#39;{{.Name}}&#39; </span><span class="__shiki_140thh">$CONTAINER</span><span class="__shiki_mdbnqw">) 进程数接近限制&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;当前：</span><span class="__shiki_140thh">$CURRENT_PIDS</span><span class="__shiki_mdbnqw">，限制：</span><span class="__shiki_140thh">$PID_LIMIT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h3 id="_6-2-文件描述符限制" tabindex="-1"><strong>6.2 文件描述符限制</strong> <a class="header-anchor" href="#_6-2-文件描述符限制" aria-label="Permalink to &quot;**6.2 文件描述符限制**&quot;">​</a></h3><h4 id="_6-2-1-ulimit-配置" tabindex="-1"><strong>6.2.1 ulimit 配置</strong> <a class="header-anchor" href="#_6-2-1-ulimit-配置" aria-label="Permalink to &quot;**6.2.1 ulimit 配置**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置文件描述符限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> fd-limited</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ulimit</span><span class="__shiki_mdbnqw"> nofile=1024:4096</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">       # 软限制1024，硬限制4096</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --ulimit</span><span class="__shiki_mdbnqw"> nproc=1024:2048</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">        # 进程数限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --ulimit</span><span class="__shiki_mdbnqw"> core=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">                 # 禁用core dump</span></span>
<span class="line"><span class="__shiki_1t8gfj">  --ulimit</span><span class="__shiki_mdbnqw"> memlock=65536:65536</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd">    # 锁定内存限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">  high-fd-app:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 常用ulimit选项：</span></span>
<span class="line"><span class="__shiki_21nrsd"># nofile  → 文件描述符数量</span></span>
<span class="line"><span class="__shiki_21nrsd"># nproc   → 用户进程数</span></span>
<span class="line"><span class="__shiki_21nrsd"># core    → core文件大小</span></span>
<span class="line"><span class="__shiki_21nrsd"># memlock → 锁定内存大小</span></span>
<span class="line"><span class="__shiki_21nrsd"># fsize   → 文件大小限制</span></span></code></pre></div><h4 id="_6-2-2-监控文件描述符使用" tabindex="-1"><strong>6.2.2 监控文件描述符使用</strong> <a class="header-anchor" href="#_6-2-2-监控文件描述符使用" aria-label="Permalink to &quot;**6.2.2 监控文件描述符使用**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看容器文件描述符使用</span></span>
<span class="line"><span class="__shiki_140thh">CONTAINER_PID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_mdbnqw"> &#39;{{.State.Pid}}&#39;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> /proc/</span><span class="__shiki_140thh">$CONTAINER_PID</span><span class="__shiki_mdbnqw">/fd</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 容器内查看</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> bash</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;ulimit -n&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> bash</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;lsof | wc -l&quot;</span></span></code></pre></div><h2 id="七、综合资源配置管理" tabindex="-1"><strong>七、综合资源配置管理</strong> <a class="header-anchor" href="#七、综合资源配置管理" aria-label="Permalink to &quot;**七、综合资源配置管理**&quot;">​</a></h2><h3 id="_7-1-docker-compose-资源配置" tabindex="-1"><strong>7.1 Docker Compose 资源配置</strong> <a class="header-anchor" href="#_7-1-docker-compose-资源配置" aria-label="Permalink to &quot;**7.1 Docker Compose 资源配置**&quot;">​</a></h3><h4 id="_7-1-1-compose-v3-资源限制" tabindex="-1"><strong>7.1.1 Compose v3 资源限制</strong> <a class="header-anchor" href="#_7-1-1-compose-v3-资源限制" aria-label="Permalink to &quot;**7.1.1 Compose v3 资源限制**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  web</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0&#39;</span><span class="__shiki_21nrsd">          # CPU限制</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">512M</span><span class="__shiki_21nrsd">         # 内存限制</span></span>
<span class="line"><span class="__shiki_17hn0y">          pids</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">           # 进程数限制</span></span>
<span class="line"><span class="__shiki_17hn0y">        reservations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.5&#39;</span><span class="__shiki_21nrsd">         # CPU保留</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">256M</span><span class="__shiki_21nrsd">        # 内存保留</span></span>
<span class="line"><span class="__shiki_17hn0y">    ulimits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      nproc</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">65535</span></span>
<span class="line"><span class="__shiki_17hn0y">      nofile</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        soft</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20000</span></span>
<span class="line"><span class="__shiki_17hn0y">        hard</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">40000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:14</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;2.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">4G</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory-swap</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">4G</span><span class="__shiki_21nrsd">      # 禁用swap</span></span>
<span class="line"><span class="__shiki_17hn0y">        reservations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2G</span></span>
<span class="line"><span class="__shiki_17hn0y">    sysctls</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">net.core.somaxconn=1024</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">net.ipv4.tcp_max_syn_backlog=2048</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  redis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.5&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">256M</span></span>
<span class="line"><span class="__shiki_17hn0y">        reservations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.25&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128M</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-server --maxmemory 200mb --maxmemory-policy allkeys-lru</span></span></code></pre></div><h4 id="_7-1-2-多环境资源配置" tabindex="-1"><strong>7.1.2 多环境资源配置</strong> <a class="header-anchor" href="#_7-1-2-多环境资源配置" aria-label="Permalink to &quot;**7.1.2 多环境资源配置**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.override.yml (开发环境)</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  web</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.5&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">256M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># docker-compose.prod.yml (生产环境)</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  web</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;2.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2G</span></span>
<span class="line"><span class="__shiki_17hn0y">        reservations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1G</span></span>
<span class="line"><span class="__shiki_17hn0y">    ulimits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      nofile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">65535</span></span></code></pre></div><h3 id="_7-2-动态资源调整" tabindex="-1"><strong>7.2 动态资源调整</strong> <a class="header-anchor" href="#_7-2-动态资源调整" aria-label="Permalink to &quot;**7.2 动态资源调整**&quot;">​</a></h3><h4 id="_7-2-1-运行时资源更新" tabindex="-1"><strong>7.2.1 运行时资源更新</strong> <a class="header-anchor" href="#_7-2-1-运行时资源更新" aria-label="Permalink to &quot;**7.2.1 运行时资源更新**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 更新运行中容器的资源限制</span></span>
<span class="line"><span class="__shiki_21nrsd"># 注意：部分限制需要容器重启</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 更新内存限制（不需要重启）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --memory</span><span class="__shiki_mdbnqw"> 1g</span><span class="__shiki_dzsirb"> --memory-swap</span><span class="__shiki_mdbnqw"> 2g</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 更新CPU限制（不需要重启）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --cpus</span><span class="__shiki_dzsirb"> 2.0</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 更新多个资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus</span><span class="__shiki_dzsirb"> 1.5</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory</span><span class="__shiki_mdbnqw"> 512m</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory-reservation</span><span class="__shiki_mdbnqw"> 256m</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --blkio-weight</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 查看更新后的配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;{{.HostConfig.CpuShares}} {{.HostConfig.Memory}} {{.HostConfig.NanoCpus}}&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h4 id="_7-2-2-自动扩缩容脚本" tabindex="-1"><strong>7.2.2 自动扩缩容脚本</strong> <a class="header-anchor" href="#_7-2-2-自动扩缩容脚本" aria-label="Permalink to &quot;**7.2.2 自动扩缩容脚本**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># auto-scale.sh - 基于负载自动调整资源</span></span>
<span class="line"><span class="__shiki_140thh">CPU_THRESHOLD_HIGH</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">80</span></span>
<span class="line"><span class="__shiki_140thh">CPU_THRESHOLD_LOW</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">20</span></span>
<span class="line"><span class="__shiki_140thh">MEM_THRESHOLD_HIGH</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">85</span></span>
<span class="line"><span class="__shiki_140thh">CHECK_INTERVAL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">60</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">while</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    CONTAINERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> CONTAINER </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $CONTAINERS; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取当前使用率</span></span>
<span class="line"><span class="__shiki_140thh">        STATS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_dzsirb"> --no-stream</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;{{.CPUPerc}},{{.MemPerc}}&quot;</span><span class="__shiki_140thh"> $CONTAINER </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> tr</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        CPU_USAGE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> $STATS </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> cut</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_dzsirb"> -f1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        MEM_USAGE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> $STATS </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> cut</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_dzsirb"> -f2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取当前限制</span></span>
<span class="line"><span class="__shiki_140thh">        CPU_LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;{{.HostConfig.NanoCpus}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_140thh">        MEM_LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;{{.HostConfig.Memory}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态调整逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (( $(echo </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CPU_USAGE</span><span class="__shiki_mdbnqw"> &gt; </span><span class="__shiki_140thh">$CPU_THRESHOLD_HIGH</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_140thh"> bc </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">l) )); </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            NEW_CPU</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CPU_LIMIT</span><span class="__shiki_mdbnqw"> * 1.5 / 1000000000&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> bc</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            docker</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_dzsirb"> --cpus</span><span class="__shiki_140thh"> $NEW_CPU $CONTAINER</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">): 为 </span><span class="__shiki_140thh">$CONTAINER</span><span class="__shiki_mdbnqw"> 增加CPU到 \${</span><span class="__shiki_140thh">NEW_CPU</span><span class="__shiki_mdbnqw">}核心&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_140thh"> $CHECK_INTERVAL</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h2 id="八、监控与告警" tabindex="-1"><strong>八、监控与告警</strong> <a class="header-anchor" href="#八、监控与告警" aria-label="Permalink to &quot;**八、监控与告警**&quot;">​</a></h2><h3 id="_8-1-资源使用监控" tabindex="-1"><strong>8.1 资源使用监控</strong> <a class="header-anchor" href="#_8-1-资源使用监控" aria-label="Permalink to &quot;**8.1 资源使用监控**&quot;">​</a></h3><h4 id="_8-1-1-prometheus-监控配置" tabindex="-1"><strong>8.1.1 Prometheus 监控配置</strong> <a class="header-anchor" href="#_8-1-1-prometheus-监控配置" aria-label="Permalink to &quot;**8.1.1 Prometheus 监控配置**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># docker-compose.monitor.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prom/prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">./prometheus.yml:/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">prometheus_data:/prometheus</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--storage.tsdb.path=/prometheus&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--web.console.libraries=/etc/prometheus/console_libraries&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--web.console.templates=/etc/prometheus/consoles&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--storage.tsdb.retention.time=200h&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--web.enable-lifecycle&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2G</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        reservations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1G</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.5&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  node-exporter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prom/node-exporter</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/proc:/host/proc:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/sys:/host/sys:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/:/rootfs:ro</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--path.procfs=/host/proc&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--path.sysfs=/host/sys&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">256M</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.2&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  cadvisor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gcr.io/cadvisor/cadvisor:v0.47.0</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/:/rootfs:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/var/run:/var/run:rw</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/sys:/sys:ro</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">/var/lib/docker/:/var/lib/docker:ro</span></span>
<span class="line"><span class="__shiki_17hn0y">    deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">512M</span></span>
<span class="line"><span class="__shiki_17hn0y">          cpus</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0.5&#39;</span></span></code></pre></div><h4 id="_8-1-2-prometheus-告警规则" tabindex="-1"><strong>8.1.2 Prometheus 告警规则</strong> <a class="header-anchor" href="#_8-1-2-prometheus-告警规则" aria-label="Permalink to &quot;**8.1.2 Prometheus 告警规则**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># prometheus/rules/docker.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker-resource-alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighContainerCPU</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(container_cpu_usage_seconds_total{name!=&quot;&quot;}[5m]) * 100 &gt; 80</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;容器CPU使用率过高&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;容器 {{ $labels.name }} CPU使用率 {{ $value }}%&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighContainerMemory</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">container_memory_usage_bytes{name!=&quot;&quot;} / container_spec_memory_limit_bytes{name!=&quot;&quot;} * 100 &gt; 85</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;容器内存使用率过高&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;容器 {{ $labels.name }} 内存使用率 {{ $value }}%&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ContainerOOMKilled</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">increase(container_oom_events_total[5m]) &gt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;容器发生OOM&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;容器 {{ $labels.name }} 发生OOM，已被杀死&quot;</span></span></code></pre></div><h3 id="_8-2-日志与审计" tabindex="-1"><strong>8.2 日志与审计</strong> <a class="header-anchor" href="#_8-2-日志与审计" aria-label="Permalink to &quot;**8.2 日志与审计**&quot;">​</a></h3><h4 id="_8-2-1-资源限制审计日志" tabindex="-1"><strong>8.2.1 资源限制审计日志</strong> <a class="header-anchor" href="#_8-2-1-资源限制审计日志" aria-label="Permalink to &quot;**8.2.1 资源限制审计日志**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 审计Docker资源操作</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/audit/rules.d/docker-resource.rules</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /usr/bin/docker</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> x</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker-resource</span></span>
<span class="line"><span class="__shiki_1t8gfj">-w</span><span class="__shiki_mdbnqw"> /var/run/docker.sock</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> x</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker-resource</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看审计日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">ausearch</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_mdbnqw"> docker-resource</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> aureport</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_dzsirb"> -i</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义审计脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># audit-resource-changes.sh</span></span>
<span class="line"><span class="__shiki_140thh">LOGFILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/docker/resource-audit-$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d).log&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> &#39;type=container&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --filter</span><span class="__shiki_mdbnqw"> &#39;event=update&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --format</span><span class="__shiki_mdbnqw"> &#39;{{.Time}} {{.Type}} {{.Actor.Attributes.name}} {{.Actor.Attributes}}&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  &gt;&gt;</span><span class="__shiki_140thh"> $LOGFILE</span></span></code></pre></div><h2 id="九、最佳实践与故障排除" tabindex="-1"><strong>九、最佳实践与故障排除</strong> <a class="header-anchor" href="#九、最佳实践与故障排除" aria-label="Permalink to &quot;**九、最佳实践与故障排除**&quot;">​</a></h2><h3 id="_9-1-资源配置最佳实践" tabindex="-1"><strong>9.1 资源配置最佳实践</strong> <a class="header-anchor" href="#_9-1-资源配置最佳实践" aria-label="Permalink to &quot;**9.1 资源配置最佳实践**&quot;">​</a></h3><h4 id="_9-1-1-应用类型推荐配置" tabindex="-1"><strong>9.1.1 应用类型推荐配置</strong> <a class="header-anchor" href="#_9-1-1-应用类型推荐配置" aria-label="Permalink to &quot;**9.1.1 应用类型推荐配置**&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置模板库：config-templates/</span></span>
<span class="line"><span class="__shiki_17hn0y">web-application</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cpu</span><span class="__shiki_140thh">: </span></span>
<span class="line"><span class="__shiki_17hn0y">    shares</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">512</span></span>
<span class="line"><span class="__shiki_17hn0y">    limit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    reservation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;0.5&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  memory</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    limit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    reservation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    swap</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  pids</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1024</span></span>
<span class="line"><span class="__shiki_17hn0y">  ulimits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    nofile</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">65535</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cpu</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    shares</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1024</span></span>
<span class="line"><span class="__shiki_17hn0y">    limit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    reservation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  memory</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    limit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    reservation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;6Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    swap</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8Gi&quot;</span><span class="__shiki_21nrsd">  # 禁用swap</span></span>
<span class="line"><span class="__shiki_17hn0y">  pids</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4096</span></span>
<span class="line"><span class="__shiki_17hn0y">  blkio</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">800</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">batch-job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cpu</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    shares</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">256</span><span class="__shiki_21nrsd">  # 低优先级</span></span>
<span class="line"><span class="__shiki_17hn0y">    limit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  memory</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    limit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    reservation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  pids</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">512</span></span></code></pre></div><h4 id="_9-1-2-渐进式限制策略" tabindex="-1"><strong>9.1.2 渐进式限制策略</strong> <a class="header-anchor" href="#_9-1-2-渐进式限制策略" aria-label="Permalink to &quot;**9.1.2 渐进式限制策略**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 初始宽松限制（开发环境）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=4g</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory-swap=8g</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  development-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 逐步收紧限制（测试环境）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=1.5</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=2g</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory-swap=2g</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 减少swap</span></span>
<span class="line"><span class="__shiki_140thh">  --pids-limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">500</span><span class="__shiki_1t8gfj"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  staging-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 生产严格限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=1</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=1g</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory-swap=1g</span><span class="__shiki_dzsirb"> \\ </span><span class="__shiki_21nrsd"> # 禁用swap</span></span>
<span class="line"><span class="__shiki_140thh">  --memory-reservation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">768m</span><span class="__shiki_1t8gfj"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --pids-limit=200</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --blkio-weight=500</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  production-app</span></span></code></pre></div><h3 id="_9-2-常见问题与解决方案" tabindex="-1"><strong>9.2 常见问题与解决方案</strong> <a class="header-anchor" href="#_9-2-常见问题与解决方案" aria-label="Permalink to &quot;**9.2 常见问题与解决方案**&quot;">​</a></h3><h4 id="_9-2-1-资源限制问题排查" tabindex="-1"><strong>9.2.1 资源限制问题排查</strong> <a class="header-anchor" href="#_9-2-1-资源限制问题排查" aria-label="Permalink to &quot;**9.2.1 资源限制问题排查**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题1：容器频繁重启</span></span>
<span class="line"><span class="__shiki_21nrsd"># 可能原因：OOM Killer</span></span>
<span class="line"><span class="__shiki_21nrsd"># 排查：</span></span>
<span class="line"><span class="__shiki_1t8gfj">dmesg</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;killed process&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_mdbnqw"> &#39;{{.State.OOMKilled}}&#39;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> tail</span><span class="__shiki_dzsirb"> -50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题2：应用性能下降</span></span>
<span class="line"><span class="__shiki_21nrsd"># 可能原因：资源限制过紧</span></span>
<span class="line"><span class="__shiki_21nrsd"># 排查：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> stats</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> top</span><span class="__shiki_dzsirb"> -b</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/fs/cgroup/cpu/docker/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">containe</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw">/cpu.stat</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题3：磁盘空间不足</span></span>
<span class="line"><span class="__shiki_21nrsd"># 排查：</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> system</span><span class="__shiki_mdbnqw"> df</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> -s</span></span>
<span class="line"><span class="__shiki_1t8gfj">find</span><span class="__shiki_mdbnqw"> /var/lib/docker</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_dzsirb"> -size</span><span class="__shiki_mdbnqw"> +100M</span><span class="__shiki_dzsirb"> -exec</span><span class="__shiki_mdbnqw"> ls</span><span class="__shiki_dzsirb"> -lh</span><span class="__shiki_mdbnqw"> {}</span><span class="__shiki_dzsirb"> \\;</span></span></code></pre></div><h4 id="_9-2-2-资源限制检查脚本" tabindex="-1"><strong>9.2.2 资源限制检查脚本</strong> <a class="header-anchor" href="#_9-2-2-资源限制检查脚本" aria-label="Permalink to &quot;**9.2.2 资源限制检查脚本**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># resource-check.sh</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== Docker资源限制检查报告 ===&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;生成时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查所有容器资源限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_mdbnqw"> &quot;table {{.Names}}\\t{{.Status}}&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_mdbnqw"> line</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [[ $line </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;NAMES&quot;</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">        CONTAINER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> $line </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $1}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;容器: </span><span class="__shiki_140thh">$CONTAINER</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # CPU限制</span></span>
<span class="line"><span class="__shiki_140thh">        CPU_LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;{{.HostConfig.NanoCpus}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CPU_LIMIT</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &quot;0&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  CPU限制: $(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;scale=2; </span><span class="__shiki_140thh">$CPU_LIMIT</span><span class="__shiki_mdbnqw">/1000000000&quot; </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> bc</span><span class="__shiki_mdbnqw">) 核心&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  CPU限制: 无限制&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 内存限制</span></span>
<span class="line"><span class="__shiki_140thh">        MEM_LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;{{.HostConfig.Memory}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ $MEM_LIMIT </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  内存限制: $(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;scale=2; </span><span class="__shiki_140thh">$MEM_LIMIT</span><span class="__shiki_mdbnqw">/1024/1024&quot; </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> bc</span><span class="__shiki_mdbnqw">) MB&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  内存限制: 无限制&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 进程限制</span></span>
<span class="line"><span class="__shiki_140thh">        PIDS_LIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_dzsirb"> --format</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;{{.HostConfig.PidsLimit}}&#39;</span><span class="__shiki_140thh"> $CONTAINER)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ $PIDS_LIMIT </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  进程限制: </span><span class="__shiki_140thh">$PIDS_LIMIT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  进程限制: 无限制&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h3 id="_9-3-安全注意事项" tabindex="-1"><strong>9.3 安全注意事项</strong> <a class="header-anchor" href="#_9-3-安全注意事项" aria-label="Permalink to &quot;**9.3 安全注意事项**&quot;">​</a></h3><h4 id="_9-3-1-资源限制与安全" tabindex="-1"><strong>9.3.1 资源限制与安全</strong> <a class="header-anchor" href="#_9-3-1-资源限制与安全" aria-label="Permalink to &quot;**9.3.1 资源限制与安全**&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 防止资源耗尽攻击</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 所有生产容器必须设置资源限制</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 限制单个用户/项目的总资源</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 监控异常资源消耗模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用资源配额插件</span></span>
<span class="line"><span class="__shiki_21nrsd"># 安装docker-resource-quota</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> plugin</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> --alias</span><span class="__shiki_mdbnqw"> resource-quota</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  mikegolovanov/docker-resource-quota:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置项目级配额</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> quota-config.json</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;projects&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;project-a&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;cpu&quot;: 4.0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;memory&quot;: &quot;8G&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;containers&quot;: 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;project-b&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;cpu&quot;: 2.0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;memory&quot;: &quot;4G&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;containers&quot;: 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h2 id="附录-资源限制参考速查表" tabindex="-1"><strong>附录：资源限制参考速查表</strong> <a class="header-anchor" href="#附录-资源限制参考速查表" aria-label="Permalink to &quot;**附录：资源限制参考速查表**&quot;">​</a></h2><h3 id="cpu-限制速查表" tabindex="-1"><strong>CPU 限制速查表</strong> <a class="header-anchor" href="#cpu-限制速查表" aria-label="Permalink to &quot;**CPU 限制速查表**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| 参数 | 说明 | 示例值 | 等效命令 |</span></span>
<span class="line"><span class="__shiki_140thh">|------|------|--------|----------|</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--cpus\`</span><span class="__shiki_140thh"> | CPU核心数 | 1.5 | --cpu-period=100000 --cpu-quota=150000 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--cpu-shares\`</span><span class="__shiki_140thh"> | 相对权重 | 512 | 竞争时获得较少CPU |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--cpu-period\`</span><span class="__shiki_140thh"> | 周期(微秒) | 100000 | 100ms周期 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--cpu-quota\`</span><span class="__shiki_140thh"> | 配额(微秒) | 50000 | 每周期50ms |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--cpuset-cpus\`</span><span class="__shiki_140thh"> | CPU核心绑定 | 0-3 | 使用0-3号核心 |</span></span></code></pre></div><h3 id="内存限制速查表" tabindex="-1"><strong>内存限制速查表</strong> <a class="header-anchor" href="#内存限制速查表" aria-label="Permalink to &quot;**内存限制速查表**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| 参数 | 说明 | 示例值 | 效果 |</span></span>
<span class="line"><span class="__shiki_140thh">|------|------|--------|------|</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--memory\`</span><span class="__shiki_140thh"> | 内存硬限制 | 512m | 超过则OOM |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--memory-swap\`</span><span class="__shiki_140thh"> | 内存+交换区 | 1g | total = RAM + swap |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--memory-reservation\`</span><span class="__shiki_140thh"> | 内存软限制 | 256m | 尽量保证的内存 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--memory-swappiness\`</span><span class="__shiki_140thh"> | 交换倾向 | 10 | 0-100，越小越少swap |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--oom-kill-disable\`</span><span class="__shiki_140thh"> | 禁用OOM | true | 危险！可能导致系统崩溃 |</span></span></code></pre></div><h3 id="i-o-限制速查表" tabindex="-1"><strong>I/O 限制速查表</strong> <a class="header-anchor" href="#i-o-限制速查表" aria-label="Permalink to &quot;**I/O 限制速查表**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| 参数 | 说明 | 示例值 |</span></span>
<span class="line"><span class="__shiki_140thh">|------|------|--------|</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--blkio-weight\`</span><span class="__shiki_140thh"> | 块I/O权重 | 500 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--device-read-bps\`</span><span class="__shiki_140thh"> | 读带宽限制 | /dev/sda:1mb |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--device-write-bps\`</span><span class="__shiki_140thh"> | 写带宽限制 | /dev/sda:1mb |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--device-read-iops\`</span><span class="__shiki_140thh"> | 读IOPS限制 | /dev/sda:100 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--device-write-iops\`</span><span class="__shiki_140thh"> | 写IOPS限制 | /dev/sda:100 |</span></span></code></pre></div><h3 id="进程与文件限制速查表" tabindex="-1"><strong>进程与文件限制速查表</strong> <a class="header-anchor" href="#进程与文件限制速查表" aria-label="Permalink to &quot;**进程与文件限制速查表**&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| 参数 | 说明 | 示例值 |</span></span>
<span class="line"><span class="__shiki_140thh">|------|------|--------|</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--pids-limit\`</span><span class="__shiki_140thh"> | 最大进程数 | 100 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--ulimit\`</span><span class="__shiki_140thh"> | 资源限制 | nofile=1024:4096 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--ulimit nproc\`</span><span class="__shiki_140thh"> | 用户进程数 | 1024:2048 |</span></span>
<span class="line"><span class="__shiki_140thh">| </span><span class="__shiki_dzsirb">\`--ulimit core\`</span><span class="__shiki_140thh"> | core文件大小 | 0 |</span></span></code></pre></div><hr><h2 id="总结" tabindex="-1"><strong>总结</strong> <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;**总结**&quot;">​</a></h2><h3 id="核心原则" tabindex="-1"><strong>核心原则</strong> <a class="header-anchor" href="#核心原则" aria-label="Permalink to &quot;**核心原则**&quot;">​</a></h3><ol><li><strong>按需分配</strong>：根据应用实际需求设置限制</li><li><strong>逐步调优</strong>：从宽松到严格，观察应用表现</li><li><strong>监控告警</strong>：实时监控，及时调整</li><li><strong>安全底线</strong>：必须设置基本限制防止系统崩溃</li></ol><h3 id="关键配置建议" tabindex="-1"><strong>关键配置建议</strong> <a class="header-anchor" href="#关键配置建议" aria-label="Permalink to &quot;**关键配置建议**&quot;">​</a></h3><ul><li>所有生产容器必须设置内存和CPU限制</li><li>数据库类应用禁用或严格限制swap</li><li>I/O密集型应用考虑使用blkio权重</li><li>设置合理的进程数限制防止fork炸弹</li><li>使用docker-compose管理多容器资源分配</li></ul><h3 id="工具推荐" tabindex="-1"><strong>工具推荐</strong> <a class="header-anchor" href="#工具推荐" aria-label="Permalink to &quot;**工具推荐**&quot;">​</a></h3><ol><li><strong>监控</strong>：cAdvisor + Prometheus + Grafana</li><li><strong>测试</strong>：stress-ng, fio, iperf3</li><li><strong>管理</strong>：docker-compose, Portainer</li><li><strong>审计</strong>：docker events, auditd</li></ol><p>记住：<strong>资源限制既是科学也是艺术</strong>。需要根据实际业务场景、应用特性和监控数据不断调整优化，找到性能与稳定性的最佳平衡点。</p>`,120)])])}const o=a(_,[["render",l]]);export{r as __pageData,o as default};
