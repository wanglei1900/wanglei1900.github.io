import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Nginx性能调优完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/performance.md","filePath":"devops/web-servers/nginx/performance.md"}'),p={name:"devops/web-servers/nginx/performance.md"};function l(h,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nginx性能调优完全指南" tabindex="-1">Nginx性能调优完全指南 <a class="header-anchor" href="#nginx性能调优完全指南" aria-label="Permalink to &quot;Nginx性能调优完全指南&quot;">​</a></h1><h2 id="第一部分-性能调优基础理论" tabindex="-1">第一部分：性能调优基础理论 <a class="header-anchor" href="#第一部分-性能调优基础理论" aria-label="Permalink to &quot;第一部分：性能调优基础理论&quot;">​</a></h2><h3 id="_1-1-性能调优金字塔模型" tabindex="-1">1.1 性能调优金字塔模型 <a class="header-anchor" href="#_1-1-性能调优金字塔模型" aria-label="Permalink to &quot;1.1 性能调优金字塔模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">应用程序优化 (最有效)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">数据库/缓存优化</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">Nginx配置优化</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">操作系统优化</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">硬件优化 (基础)</span></span></code></pre></div><h3 id="_1-2-关键性能指标" tabindex="-1">1.2 关键性能指标 <a class="header-anchor" href="#_1-2-关键性能指标" aria-label="Permalink to &quot;1.2 关键性能指标&quot;">​</a></h3><ul><li><strong>QPS</strong>：每秒查询率</li><li><strong>响应时间</strong>：P50/P95/P99</li><li><strong>并发连接数</strong>：同时处理的连接</li><li><strong>吞吐量</strong>：单位时间处理的数据量</li><li><strong>资源使用率</strong>：CPU、内存、磁盘IO、网络带宽</li></ul><h3 id="_1-3-性能瓶颈分析框架" tabindex="-1">1.3 性能瓶颈分析框架 <a class="header-anchor" href="#_1-3-性能瓶颈分析框架" aria-label="Permalink to &quot;1.3 性能瓶颈分析框架&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 识别瓶颈类型</span></span>
<span class="line"><span class="__shiki_wvjl67">   - CPU瓶颈</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 内存瓶颈</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 磁盘IO瓶颈</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 网络瓶颈</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 应用瓶颈</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">2. 使用监控工具定位</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 系统层：top, vmstat, iostat, netstat</span></span>
<span class="line"><span class="__shiki_wvjl67">   - Nginx层：stub_status, access_log</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 应用层：应用性能监控</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">3. 优化实施与验证</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 制定优化方案</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 逐步实施</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 监控效果</span></span>
<span class="line"><span class="__shiki_wvjl67">   - 持续迭代</span></span></code></pre></div><h2 id="第二部分-操作系统层优化" tabindex="-1">第二部分：操作系统层优化 <a class="header-anchor" href="#第二部分-操作系统层优化" aria-label="Permalink to &quot;第二部分：操作系统层优化&quot;">​</a></h2><h3 id="_2-1-内核参数优化" tabindex="-1">2.1 内核参数优化 <a class="header-anchor" href="#_2-1-内核参数优化" aria-label="Permalink to &quot;2.1 内核参数优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/sysctl.conf - 内核参数优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网络相关优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 最大文件描述符数</span></span>
<span class="line"><span class="__shiki_1t8gfj">fs.file-max</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 2097152</span></span>
<span class="line"><span class="__shiki_1t8gfj">fs.nr_open</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 2097152</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># TCP相关优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># TCP缓冲区设置</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.core.rmem_max</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 16777216</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.core.wmem_max</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 16777216</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_rmem</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_dzsirb"> 87380</span><span class="__shiki_dzsirb"> 16777216</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_wmem</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_dzsirb"> 65536</span><span class="__shiki_dzsirb"> 16777216</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># TCP连接重用</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_tw_reuse</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_tw_recycle</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">  # 注意：在NAT环境中可能有问题，建议设为0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># TIME-WAIT连接优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_max_tw_buckets</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 2000000</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_fin_timeout</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SYN队列设置</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_max_syn_backlog</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 65536</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.core.somaxconn</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 65536</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Keepalive设置</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_keepalive_time</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 300</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_keepalive_probes</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_keepalive_intvl</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 15</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 端口范围</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.ip_local_port_range</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_dzsirb"> 65535</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 洪水攻击防护</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_syncookies</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_syn_retries</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_synack_retries</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 快速关闭连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_orphan_retries</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 拥塞控制算法</span></span>
<span class="line"><span class="__shiki_1t8gfj">net.ipv4.tcp_congestion_control</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> bbr</span><span class="__shiki_21nrsd">  # 或 cubic, reno</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存相关优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 内存过载保护</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.swappiness</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.dirty_ratio</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.dirty_background_ratio</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.dirty_expire_centisecs</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 3000</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.dirty_writeback_centisecs</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 500</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 虚拟内存</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.overcommit_memory</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.overcommit_ratio</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文件系统优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 文件系统缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">vm.vfs_cache_pressure</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># inode缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">fs.inotify.max_user_watches</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 524288</span></span>
<span class="line"><span class="__shiki_1t8gfj">fs.inotify.max_user_instances</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 应用配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -p</span></span></code></pre></div><h3 id="_2-2-系统资源限制优化" tabindex="-1">2.2 系统资源限制优化 <a class="header-anchor" href="#_2-2-系统资源限制优化" aria-label="Permalink to &quot;2.2 系统资源限制优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/security/limits.conf - 用户资源限制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 全局设置</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> soft nofile 65535</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> hard nofile 65535</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> soft nproc 65535</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> hard nproc 65535</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> soft memlock unlimited</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> hard memlock unlimited</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Nginx用户特定设置</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_mdbnqw"> soft</span><span class="__shiki_mdbnqw"> nofile</span><span class="__shiki_dzsirb"> 65535</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_mdbnqw"> hard</span><span class="__shiki_mdbnqw"> nofile</span><span class="__shiki_dzsirb"> 65535</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_mdbnqw"> soft</span><span class="__shiki_mdbnqw"> nproc</span><span class="__shiki_dzsirb"> 65535</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_mdbnqw"> hard</span><span class="__shiki_mdbnqw"> nproc</span><span class="__shiki_dzsirb"> 65535</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查当前限制</span></span>
<span class="line"><span class="__shiki_dzsirb">ulimit</span><span class="__shiki_dzsirb"> -a</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /proc/</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">pidof</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">/limits</span></span></code></pre></div><h3 id="_2-3-网络栈优化" tabindex="-1">2.3 网络栈优化 <a class="header-anchor" href="#_2-3-网络栈优化" aria-label="Permalink to &quot;2.3 网络栈优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 网络接口优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看网卡配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">ethtool</span><span class="__shiki_mdbnqw"> eth0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 优化网卡队列（根据CPU核心数调整）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 假设有8个CPU核心</span></span>
<span class="line"><span class="__shiki_1t8gfj">ethtool</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_mdbnqw"> combined</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_21nrsd">  # 设置8个队列</span></span>
<span class="line"><span class="__shiki_1t8gfj">ethtool</span><span class="__shiki_dzsirb"> -K</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_mdbnqw"> gro</span><span class="__shiki_mdbnqw"> on</span><span class="__shiki_21nrsd">      # 启用GRO</span></span>
<span class="line"><span class="__shiki_1t8gfj">ethtool</span><span class="__shiki_dzsirb"> -K</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_mdbnqw"> lro</span><span class="__shiki_mdbnqw"> off</span><span class="__shiki_21nrsd">     # 关闭LRO（可能有问题）</span></span>
<span class="line"><span class="__shiki_1t8gfj">ethtool</span><span class="__shiki_dzsirb"> -K</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_mdbnqw"> tso</span><span class="__shiki_mdbnqw"> on</span><span class="__shiki_21nrsd">      # 启用TSO</span></span>
<span class="line"><span class="__shiki_1t8gfj">ethtool</span><span class="__shiki_dzsirb"> -K</span><span class="__shiki_mdbnqw"> eth0</span><span class="__shiki_mdbnqw"> gso</span><span class="__shiki_mdbnqw"> on</span><span class="__shiki_21nrsd">      # 启用GSO</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IRQ亲和性设置（将中断绑定到特定CPU）</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看IRQ分配</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /proc/interrupts</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> eth0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置IRQ亲和性</span></span>
<span class="line"><span class="__shiki_21nrsd"># 假设eth0的IRQ是42，有8个CPU核心</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /proc/irq/42/smp_affinity</span><span class="__shiki_21nrsd">  # CPU1</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或者使用irqbalance服务</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># RPS/RFS设置（软件中断分发）</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 启用RPS（Receive Packet Steering）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 假设有8个CPU核心，位掩码为0xff（所有核心）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ff</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/class/net/eth0/queues/rx-0/rps_cpus</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用RFS（Receive Flow Steering）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> 32768</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /proc/sys/net/core/rps_sock_flow_entries</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/class/net/eth0/queues/rx-0/rps_flow_cnt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调整网络缓冲区</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看当前缓冲区大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_mdbnqw"> net.core.rmem_max</span><span class="__shiki_mdbnqw"> net.core.wmem_max</span></span></code></pre></div><h3 id="_2-4-文件系统优化" tabindex="-1">2.4 文件系统优化 <a class="header-anchor" href="#_2-4-文件系统优化" aria-label="Permalink to &quot;2.4 文件系统优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 文件系统挂载优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/fstab 配置示例</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 针对Nginx缓存目录使用XFS或ext4</span></span>
<span class="line"><span class="__shiki_1t8gfj">/dev/sdb1</span><span class="__shiki_mdbnqw"> /var/cache/nginx</span><span class="__shiki_mdbnqw"> ext4</span><span class="__shiki_mdbnqw"> defaults,noatime,nodiratime,data=writeback,barrier=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 参数解释：</span></span>
<span class="line"><span class="__shiki_21nrsd"># noatime/nodiratime - 减少磁盘写入</span></span>
<span class="line"><span class="__shiki_21nrsd"># data=writeback - 提高性能（风险略高）</span></span>
<span class="line"><span class="__shiki_21nrsd"># barrier=0 - 关闭屏障（需要UPS支持）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># tmpfs用于临时文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">tmpfs</span><span class="__shiki_mdbnqw"> /dev/shm</span><span class="__shiki_mdbnqw"> tmpfs</span><span class="__shiki_mdbnqw"> defaults,size=2g</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 磁盘调度器优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># ====================</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看当前调度器</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/block/sda/queue/scheduler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置为deadline或noop（SSD使用noop）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> deadline</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/block/sda/queue/scheduler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调整IO队列深度</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/block/sda/queue/nr_requests</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 预读设置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> 256</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/block/sda/queue/read_ahead_kb</span></span></code></pre></div><h2 id="第三部分-nginx基础配置优化" tabindex="-1">第三部分：Nginx基础配置优化 <a class="header-anchor" href="#第三部分-nginx基础配置优化" aria-label="Permalink to &quot;第三部分：Nginx基础配置优化&quot;">​</a></h2><h3 id="_3-1-进程与连接优化" tabindex="-1">3.1 进程与连接优化 <a class="header-anchor" href="#_3-1-进程与连接优化" aria-label="Permalink to &quot;3.1 进程与连接优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nginx.conf - 主配置文件</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">nginx nginx;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 工作进程数（核心优化）</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;  </span><span class="__shiki_21nrsd"># 自动检测CPU核心数</span></span>
<span class="line"><span class="__shiki_21nrsd"># worker_processes 8;   # 手动设置为CPU核心数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CPU亲和性绑定（减少上下文切换）</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_cpu_affinity </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或手动绑定（8核CPU示例）</span></span>
<span class="line"><span class="__shiki_21nrsd"># worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 工作进程优先级（-20到19，越小优先级越高）</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_priority </span><span class="__shiki_140thh">-10;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文件描述符限制</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_rlimit_nofile </span><span class="__shiki_dzsirb">65535</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误日志级别和位置</span></span>
<span class="line"><span class="__shiki_1itgoe">error_log </span><span class="__shiki_140thh">/var/log/nginx/error.log </span><span class="__shiki_dzsirb">warn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd"># error_log /dev/null;  # 生产环境可关闭错误日志</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># PID文件位置</span></span>
<span class="line"><span class="__shiki_1itgoe">pid </span><span class="__shiki_140thh">/var/run/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 事件处理模型</span></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用高效的事件模型</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;           </span><span class="__shiki_21nrsd"># Linux推荐</span></span>
<span class="line"><span class="__shiki_21nrsd">    # use kqueue;        # FreeBSD推荐</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 每个工作进程的最大连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">20480</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最大总连接数 = worker_processes * worker_connections</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 示例：8 * 20480 = 163840</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 尽可能接受更多连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    multi_accept </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 惊群问题优化（Linux内核≥3.9）</span></span>
<span class="line"><span class="__shiki_1itgoe">    accept_mutex </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接接受延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    accept_mutex_delay </span><span class="__shiki_140thh">100ms;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 调试连接（仅开发环境）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # debug_connection 192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 守护进程模式</span></span>
<span class="line"><span class="__shiki_1itgoe">daemon </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_3-2-http核心模块优化" tabindex="-1">3.2 HTTP核心模块优化 <a class="header-anchor" href="#_3-2-http核心模块优化" aria-label="Permalink to &quot;3.2 HTTP核心模块优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基本设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">mime.types;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default_type </span><span class="__shiki_140thh">application/octet-stream;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志格式优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_dzsirb">main</span><span class="__shiki_mdbnqw"> &#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;&quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;rt=$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> uct=&quot;$</span><span class="__shiki_140thh">upstream_connect_time</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;uht=&quot;$</span><span class="__shiki_140thh">upstream_header_time</span><span class="__shiki_mdbnqw">&quot; urt=&quot;$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;cs=$</span><span class="__shiki_140thh">upstream_cache_status</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_140thh">compression </span><span class="__shiki_mdbnqw">&#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;gzip_ratio=$</span><span class="__shiki_140thh">gzip_ratio</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 访问日志优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_140thh">/var/log/nginx/access.log </span><span class="__shiki_dzsirb">main</span><span class="__shiki_140thh"> buffer=32k flush=5s;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # access_log off;  # 高并发场景可考虑关闭</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误日志缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_log </span><span class="__shiki_140thh">/var/log/nginx/error.log </span><span class="__shiki_dzsirb">warn</span><span class="__shiki_140thh"> buffer=16k;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务器信息隐藏</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_tokens </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    more_clear_headers</span><span class="__shiki_140thh"> Server;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件发送优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile_max_chunk </span><span class="__shiki_dzsirb">512k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # TCP优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    tcp_nopush </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd"># 在sendfile为on时有效</span></span>
<span class="line"><span class="__shiki_1itgoe">    tcp_nodelay </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd"># 保持小包快速响应</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 直接IO（大文件场景）</span></span>
<span class="line"><span class="__shiki_1itgoe">    directio </span><span class="__shiki_dzsirb">4m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    directio_alignment </span><span class="__shiki_dzsirb">512</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 异步文件IO（需要内核支持）</span></span>
<span class="line"><span class="__shiki_1itgoe">    aio </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    aio_write </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接保持优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_timeout </span><span class="__shiki_dzsirb">75s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_requests </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 客户端超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_header_timeout </span><span class="__shiki_dzsirb">15s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_timeout </span><span class="__shiki_dzsirb">15s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    send_timeout </span><span class="__shiki_dzsirb">15s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重置超时连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    reset_timedout_connection </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求体限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求体缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_buffer_size </span><span class="__shiki_dzsirb">128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求头缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_header_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    large_client_header_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 输出缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    output_buffers </span><span class="__shiki_dzsirb">2</span><span class="__shiki_dzsirb"> 32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    postpone_output </span><span class="__shiki_dzsirb">1460</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 临时文件路径优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_body_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_proxy_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fastcgi_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_fastcgi_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    uwsgi_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_uwsgi_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    scgi_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_scgi_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 临时文件大小限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_max_temp_file_size </span><span class="__shiki_dzsirb">1024m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件系统缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache </span><span class="__shiki_140thh">max=10000 inactive=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_valid </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_min_uses </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_errors </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # MIME类型缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    types_hash_max_size </span><span class="__shiki_dzsirb">2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    types_hash_bucket_size </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务器名哈希表</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_names_hash_bucket_size </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_names_hash_max_size </span><span class="__shiki_dzsirb">2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 变量哈希表</span></span>
<span class="line"><span class="__shiki_1itgoe">    variables_hash_max_size </span><span class="__shiki_dzsirb">2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    variables_hash_bucket_size </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 忽略无效头</span></span>
<span class="line"><span class="__shiki_1itgoe">    ignore_invalid_headers </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求跟踪ID</span></span>
<span class="line"><span class="__shiki_21nrsd">    # request_id on;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # request_id_header &quot;X-Request-ID&quot;;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # request_id_log on;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接限制区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=addr:10m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=one:10m rate=10r/s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 其他模块加载</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">/etc/nginx/conf.d/*.conf;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-缓冲区优化策略" tabindex="-1">3.3 缓冲区优化策略 <a class="header-anchor" href="#_3-3-缓冲区优化策略" aria-label="Permalink to &quot;3.3 缓冲区优化策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于请求类型的缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $buffer_policy {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;small&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*\\.(mp4|avi|mkv|iso)$ </span><span class="__shiki_mdbnqw">&quot;large&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*\\.(jpg|jpeg|png|gif)$ </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_140thh">/api/ </span><span class="__shiki_mdbnqw">&quot;api&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_140thh">/upload </span><span class="__shiki_mdbnqw">&quot;upload&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态设置缓冲区策略</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($buffer_policy </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;small&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_busy_buffers_size </span><span class="__shiki_dzsirb">8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($buffer_policy </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffer_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffers </span><span class="__shiki_dzsirb">4</span><span class="__shiki_dzsirb"> 16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_busy_buffers_size </span><span class="__shiki_dzsirb">32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($buffer_policy </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;large&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffer_size </span><span class="__shiki_dzsirb">128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_busy_buffers_size </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 大文件关闭缓冲</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($buffer_policy </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;api&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffer_size </span><span class="__shiki_dzsirb">8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$proxy_busy_buffers_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># API请求关闭缓冲</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($buffer_policy </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;upload&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$client_body_buffer_size </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_140thh">$proxy_buffer_size;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffers </span><span class="__shiki_140thh">$proxy_buffers;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_busy_buffers_size </span><span class="__shiki_140thh">$proxy_busy_buffers_size;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-ssl-tls性能优化" tabindex="-1">第四部分：SSL/TLS性能优化 <a class="header-anchor" href="#第四部分-ssl-tls性能优化" aria-label="Permalink to &quot;第四部分：SSL/TLS性能优化&quot;">​</a></h2><h3 id="_4-1-ssl硬件加速" tabindex="-1">4.1 SSL硬件加速 <a class="header-anchor" href="#_4-1-ssl硬件加速" aria-label="Permalink to &quot;4.1 SSL硬件加速&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查SSL硬件加速支持</span></span>
<span class="line"><span class="__shiki_21nrsd"># openssl engine -t</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL会话缓存（减少握手开销）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_tickets </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 如果支持会话票证可开启</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_buffer_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL协议优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 现代加密套件（性能与安全平衡）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ciphers </span><span class="__shiki_140thh">ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 椭圆曲线优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ecdh_curve </span><span class="__shiki_140thh">X25519:prime256v1:secp384r1;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # DH参数（2048位足够）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_dhparam </span><span class="__shiki_140thh">/etc/nginx/dhparam.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # OCSP装订（减少客户端验证时间）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_trusted_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/ca-certs.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用HTTP/2（显著提升性能）</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2 </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_field_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_concurrent_streams </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_requests </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_header_size </span><span class="__shiki_dzsirb">32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_body_preread_size </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_push_preload </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用Brotli压缩（比gzip更高效）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 需要ngx_brotli模块</span></span>
<span class="line"><span class="__shiki_21nrsd">    # brotli on;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # brotli_comp_level 6;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # brotli_types text/plain text/css application/json ...;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2 reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_140thh">[::]:443 ssl http2 reuseport;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # SSL证书</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/fullchain.pem;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/privkey.pem;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用0-RTT（TLS 1.3）</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_early_data </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # SSL硬件加速（如果可用）</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ssl_engine qat;  # Intel QAT</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ssl_engine afalg;  # AF_ALG</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # HSTS头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=63072000; includeSubDomains; preload&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-tls-1-3优化配置" tabindex="-1">4.2 TLS 1.3优化配置 <a class="header-anchor" href="#_4-2-tls-1-3优化配置" aria-label="Permalink to &quot;4.2 TLS 1.3优化配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># TLS 1.3专用优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_protocols </span><span class="__shiki_140thh">TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_ciphers </span><span class="__shiki_140thh">TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># TLS 1.3不需要</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 0-RTT配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_early_data </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 密钥更新</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_session_tickets </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># OCSP Must-Staple</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_stapling </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_stapling_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=63072000; includeSubDomains; preload&quot;</span><span class="__shiki_140thh"> always;</span></span></code></pre></div><h2 id="第五部分-代理与上游优化" tabindex="-1">第五部分：代理与上游优化 <a class="header-anchor" href="#第五部分-代理与上游优化" aria-label="Permalink to &quot;第五部分：代理与上游优化&quot;">​</a></h2><h3 id="_5-1-上游连接池优化" tabindex="-1">5.1 上游连接池优化 <a class="header-anchor" href="#_5-1-上游连接池优化" aria-label="Permalink to &quot;5.1 上游连接池优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡算法选择</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 最少连接数，适合长连接</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务器定义</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend2.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend3.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接池配置（HTTP/1.1）</span></span>
<span class="line"><span class="__shiki_140thh">    keepalive </span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">;           </span><span class="__shiki_21nrsd"># 每个worker保持的连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_requests </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd"># 每个连接的最大请求数</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># 连接保持时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查（Nginx Plus）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # health_check interval=5s fails=3 passes=2;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 慢启动（Nginx Plus）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # server backend4.example.com:8080 weight=1 slow_start=30s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    max_conns</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    queue </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> timeout=30s;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # HTTP版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_connect_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_send_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_read_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_dzsirb">8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_busy_buffers_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 临时文件</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_temp_file_write_size </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重试机制</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout invalid_header http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_tries </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 请求ID传递</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存控制头</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ignore_headers </span><span class="__shiki_140thh">X-Accel-Expires Expires Cache-Control Set-Cookie;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加调试头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Upstream-Addr $upstream_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Upstream-Response-Time $upstream_response_time;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-微服务网关优化" tabindex="-1">5.2 微服务网关优化 <a class="header-anchor" href="#_5-2-微服务网关优化" aria-label="Permalink to &quot;5.2 微服务网关优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 动态上游配置</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> dynamic_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    zone </span><span class="__shiki_140thh">dynamic_backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态解析（定期更新DNS）</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> api.example.com:8080 resolve;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    resolver </span><span class="__shiki_dzsirb">8.8.8.8</span><span class="__shiki_dzsirb"> 1.1.1.1</span><span class="__shiki_140thh"> valid=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    resolver_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于内容的负载均衡</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $backend_pool {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/users    user_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/orders   order_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/products product_service;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">            gateway_service;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 熔断器模式</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">upstream_status</span><span class="__shiki_140thh"> $circuit_breaker {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;closed&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^[5]   </span><span class="__shiki_mdbnqw">&quot;open&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态选择上游</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$selected_backend $backend_pool;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 熔断检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($circuit_breaker </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;open&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_mdbnqw"> &quot;Service Temporarily Unavailable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$selected_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 快速失败</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream </span><span class="__shiki_140thh">timeout </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_timeout </span><span class="__shiki_dzsirb">0s</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 立即失败</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 连接复用</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;keep-alive&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 超时控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_connect_timeout </span><span class="__shiki_dzsirb">1s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_send_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_read_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录熔断状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> tonumber</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">upstream_status</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">circuit_status</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">upstream_addr</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-缓存优化策略" tabindex="-1">第六部分：缓存优化策略 <a class="header-anchor" href="#第六部分-缓存优化策略" aria-label="Permalink to &quot;第六部分：缓存优化策略&quot;">​</a></h2><h3 id="_6-1-多级缓存架构" tabindex="-1">6.1 多级缓存架构 <a class="header-anchor" href="#_6-1-多级缓存架构" aria-label="Permalink to &quot;6.1 多级缓存架构&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多级缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/l1_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=l1_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=10g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=1h</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off</span></span>
<span class="line"><span class="__shiki_140thh">    loader_threshold=300</span></span>
<span class="line"><span class="__shiki_140thh">    loader_files=200</span></span>
<span class="line"><span class="__shiki_140thh">    loader_sleep=50ms;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/l2_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=l2_cache:500m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=100g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=1d</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存键策略</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_method</span><span class="__shiki_140thh"> $cache_method {</span></span>
<span class="line"><span class="__shiki_140thh">    GET </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    HEAD </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_pragma</span><span class="__shiki_140thh"> $cache_control {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;no-cache&quot;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_authorization</span><span class="__shiki_140thh"> $auth_cache {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 智能缓存选择</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">uri</span><span class="__shiki_140thh"> $cache_zone {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/products/(hot|trending) l1_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/products/               l2_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/static/                        l2_cache;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">                           l1_cache;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 条件缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 跳过非GET请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($cache_method </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">0) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 跳过认证请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($auth_cache </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">0) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 跳过特定参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($arg_nocache) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态选择缓存区</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">$cache_zone;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存键设计</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">is_args</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">args</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存有效期</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_140thh">any </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_bypass </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_no_cache </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock_age </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 陈旧缓存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_background_update </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_revalidate </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Zone $cache_zone;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-热点数据优化" tabindex="-1">6.2 热点数据优化 <a class="header-anchor" href="#_6-2-热点数据优化" aria-label="Permalink to &quot;6.2 热点数据优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 热点数据检测与优化</span></span>
<span class="line"><span class="__shiki_1itgoe">lua_shared_dict</span><span class="__shiki_140thh"> hot_keys </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> hot_keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hot_keys</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> hot_keys</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(key) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 热点检测</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_21nrsd">  -- 阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 热点数据特殊处理</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hot_data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;true&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 预热二级缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 异步预热</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 获取数据并缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 计数递增</span></span>
<span class="line"><span class="__shiki_1t8gfj">            hot_keys</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(key, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 热点数据特殊处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($hot_data </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 更短的缓存时间</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 更高的缓存优先级</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_lock_age </span><span class="__shiki_dzsirb">1s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加热点标记</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Hot-Data </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 热点数据统计端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /stats/hot-keys </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> hot_keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hot_keys</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> hot_keys</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get_keys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> count = hot_keys:get(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> count and count &gt; </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    table.insert(result, {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        key</span><span class="__shiki_140thh"> = key,</span></span>
<span class="line"><span class="__shiki_1itgoe">                        count</span><span class="__shiki_140thh"> = count</span></span>
<span class="line"><span class="__shiki_140thh">                    })</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 按访问次数排序</span></span>
<span class="line"><span class="__shiki_140thh">            table.sort(result, function(a, b)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> a.count &gt; b.count</span></span>
<span class="line"><span class="__shiki_140thh">            end)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(result))</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-静态资源优化" tabindex="-1">第七部分：静态资源优化 <a class="header-anchor" href="#第七部分-静态资源优化" aria-label="Permalink to &quot;第七部分：静态资源优化&quot;">​</a></h2><h3 id="_7-1-静态文件服务极致优化" tabindex="-1">7.1 静态文件服务极致优化 <a class="header-anchor" href="#_7-1-静态文件服务极致优化" aria-label="Permalink to &quot;7.1 静态文件服务极致优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2 reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">static.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根目录配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www/static;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件系统极致优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache </span><span class="__shiki_140thh">max=20000 inactive=60s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_valid </span><span class="__shiki_dzsirb">120s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_min_uses </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_errors </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 静态文件可以关闭错误记录</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 发送文件优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile_max_chunk </span><span class="__shiki_dzsirb">2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 直接IO（大文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(iso|mkv|mp4)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        directio </span><span class="__shiki_dzsirb">8m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        directio_alignment </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        output_buffers </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 限制下载速度</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_rate_after </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_rate </span><span class="__shiki_dzsirb">2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用范围请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        mp4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        mp4_buffer_size </span><span class="__shiki_dzsirb">4m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        mp4_max_buffer_size </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 图片优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|webp)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 图片处理缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">        image_filter_buffer </span><span class="__shiki_dzsirb">20M</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # WebP自动转换（如果支持）</span></span>
<span class="line"><span class="__shiki_21nrsd">        # if ($http_accept ~* &quot;webp&quot;) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     add_header Vary Accept;</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     rewrite ^(.*)\\.(jpg|jpeg|png)$ $1.webp last;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 浏览器缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_140thh">1y;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 访问控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        valid_referers </span><span class="__shiki_140thh">none blocked server_names </span><span class="__shiki_1itgoe">~\\.google\\. ~</span><span class="__shiki_140thh">\\.baidu\\.;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($invalid_referer) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CSS/JS优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用gzip_static（预压缩文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">        gzip_static </span><span class="__shiki_140thh">always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 长期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_140thh">1y;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 资源提示</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Link </span><span class="__shiki_mdbnqw">&quot;&lt;/style.min.css&gt;; rel=preload; as=style&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Link </span><span class="__shiki_mdbnqw">&quot;&lt;/app.min.js&gt;; rel=preload; as=script&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字体文件优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(woff|woff2|ttf|eot|otf)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_140thh">1y;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Origin </span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件上传优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /upload </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 上传缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">        client_body_buffer_size </span><span class="__shiki_dzsirb">2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 上传超时</span></span>
<span class="line"><span class="__shiki_1itgoe">        client_body_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 临时存储</span></span>
<span class="line"><span class="__shiki_1itgoe">        client_body_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_upload;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用代理缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 进度报告</span></span>
<span class="line"><span class="__shiki_21nrsd">        # upload_progress uploads 1m;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 目录浏览优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /download/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        autoindex </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        autoindex_exact_size </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        autoindex_localtime </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 限制列表大小</span></span>
<span class="line"><span class="__shiki_1itgoe">        autoindex_max_size</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-cdn边缘优化" tabindex="-1">7.2 CDN边缘优化 <a class="header-anchor" href="#_7-2-cdn边缘优化" aria-label="Permalink to &quot;7.2 CDN边缘优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># CDN源站优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_x_forwarded_for</span><span class="__shiki_140thh"> $real_client_ip {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_21q97f">^(\\d+\\.\\d+\\.\\d+\\.\\d+) $</span><span class="__shiki_140thh">1;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CDN专用头部处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-CDN-Server $hostname;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Client-IP $real_client_ip;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存控制头（CDN友好）</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js|jpg|png|gif|ico)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存层级控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000, s-maxage=2592000&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # CDN特殊处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($http_x_cdn_cache_control) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Cache-Control $http_x_cdn_cache_control;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 边缘缓存标记</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Edge-Cache </span><span class="__shiki_mdbnqw">&quot;HIT from $</span><span class="__shiki_140thh">hostname</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态内容CDN缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(php|jsp|asp)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 短时间缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=300, s-maxage=60&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Vary </span><span class="__shiki_mdbnqw">&quot;Accept-Encoding, Cookie&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 条件请求支持</span></span>
<span class="line"><span class="__shiki_1itgoe">        etag </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 最后修改时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        if_modified_since </span><span class="__shiki_140thh">exact;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第八部分-流媒体与websocket优化" tabindex="-1">第八部分：流媒体与WebSocket优化 <a class="header-anchor" href="#第八部分-流媒体与websocket优化" aria-label="Permalink to &quot;第八部分：流媒体与WebSocket优化&quot;">​</a></h2><h3 id="_8-1-流媒体服务器优化" tabindex="-1">8.1 流媒体服务器优化 <a class="header-anchor" href="#_8-1-流媒体服务器优化" aria-label="Permalink to &quot;8.1 流媒体服务器优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># RTMP模块配置（需要单独编译）</span></span>
<span class="line"><span class="__shiki_1itgoe">rtmp</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">1935</span><span class="__shiki_140thh"> reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_140thh">[::]:1935 reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">        chunk_size</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        max_streams</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ping</span><span class="__shiki_dzsirb"> 30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ping_timeout</span><span class="__shiki_dzsirb"> 10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ack_window</span><span class="__shiki_dzsirb"> 5000000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        application</span><span class="__shiki_140thh"> live {</span></span>
<span class="line"><span class="__shiki_1itgoe">            live</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            record</span><span class="__shiki_dzsirb"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            meta</span><span class="__shiki_140thh"> copy;</span></span>
<span class="line"><span class="__shiki_1itgoe">            wait_key</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            wait_video</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            publish_notify</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            drop_idle_publisher</span><span class="__shiki_dzsirb"> 10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # HLS配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls</span><span class="__shiki_140thh"> on;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_path</span><span class="__shiki_140thh"> /tmp/hls;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_fragment </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_playlist_length</span><span class="__shiki_dzsirb"> 60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_sync</span><span class="__shiki_140thh"> 2ms;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_continuous</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_nested</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_cleanup</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            hls_type</span><span class="__shiki_140thh"> live;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # DASH配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            dash</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            dash_path</span><span class="__shiki_140thh"> /tmp/dash;</span></span>
<span class="line"><span class="__shiki_1itgoe">            dash_fragment</span><span class="__shiki_dzsirb"> 3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            dash_playlist_length</span><span class="__shiki_dzsirb"> 60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 带宽限制</span></span>
<span class="line"><span class="__shiki_21nrsd">            # max_connections 100;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # play_time 3600;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # idle_streams off;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 访问控制</span></span>
<span class="line"><span class="__shiki_21nrsd">            # allow publish 192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # deny publish all;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # allow play all;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 转码配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        application</span><span class="__shiki_140thh"> transcoded {</span></span>
<span class="line"><span class="__shiki_1itgoe">            live</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            exec</span><span class="__shiki_140thh"> ffmpeg -i rtmp://localhost/$app/$name</span></span>
<span class="line"><span class="__shiki_140thh">              -c:</span><span class="__shiki_1itgoe">v</span><span class="__shiki_140thh"> libx264 -preset veryfast -profile:v baseline -level 3.0</span></span>
<span class="line"><span class="__shiki_140thh">              -c:</span><span class="__shiki_1itgoe">a</span><span class="__shiki_140thh"> aac -ar </span><span class="__shiki_dzsirb">44100</span><span class="__shiki_140thh"> -ac </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> -b:a 64k</span></span>
<span class="line"><span class="__shiki_140thh">              -</span><span class="__shiki_1itgoe">f</span><span class="__shiki_140thh"> flv rtmp://localhost/hls/$name_low</span></span>
<span class="line"><span class="__shiki_140thh">              -c:</span><span class="__shiki_1itgoe">v</span><span class="__shiki_140thh"> libx264 -preset veryfast -profile:v </span><span class="__shiki_dzsirb">main</span><span class="__shiki_140thh"> -level 3.1</span></span>
<span class="line"><span class="__shiki_140thh">              -c:</span><span class="__shiki_1itgoe">a</span><span class="__shiki_140thh"> aac -ar </span><span class="__shiki_dzsirb">44100</span><span class="__shiki_140thh"> -ac </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> -b:a 128k</span></span>
<span class="line"><span class="__shiki_140thh">              -</span><span class="__shiki_1itgoe">f</span><span class="__shiki_140thh"> flv rtmp://localhost/hls/$name_mid</span></span>
<span class="line"><span class="__shiki_140thh">              -c:</span><span class="__shiki_1itgoe">v</span><span class="__shiki_140thh"> libx264 -preset fast -profile:v high -level 4.0</span></span>
<span class="line"><span class="__shiki_140thh">              -c:</span><span class="__shiki_1itgoe">a</span><span class="__shiki_140thh"> aac -ar </span><span class="__shiki_dzsirb">48000</span><span class="__shiki_140thh"> -ac </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> -b:a 192k</span></span>
<span class="line"><span class="__shiki_140thh">              -</span><span class="__shiki_1itgoe">f</span><span class="__shiki_140thh"> flv rtmp://localhost/hls/$name_high;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTTP流媒体服务</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # HLS服务</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /hls </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            types</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">                application/vnd.apple.mpegurl</span><span class="__shiki_140thh"> m3u8;</span></span>
<span class="line"><span class="__shiki_dzsirb">                video/mp2t</span><span class="__shiki_140thh"> ts;</span></span>
<span class="line"><span class="__shiki_dzsirb">                application/dash+xml</span><span class="__shiki_140thh"> mpd;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            root </span><span class="__shiki_140thh">/tmp;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Cache-Control no-cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Access-Control-Allow-Origin *;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Access-Control-Allow-Methods </span><span class="__shiki_mdbnqw">&#39;GET, OPTIONS&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Access-Control-Allow-Headers </span><span class="__shiki_mdbnqw">&#39;Range&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 启用范围请求</span></span>
<span class="line"><span class="__shiki_1itgoe">            mp4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            mp4_limit_rate </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            mp4_limit_rate_after </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 限制连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_conn </span><span class="__shiki_140thh">hls_conn </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_rate </span><span class="__shiki_dzsirb">2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-websocket连接优化" tabindex="-1">8.2 WebSocket连接优化 <a class="header-anchor" href="#_8-2-websocket连接优化" aria-label="Permalink to &quot;8.2 WebSocket连接优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># WebSocket连接池</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> websocket_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用IP哈希保持连接一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">    ip_hash</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> ws1.example.com:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> ws2.example.com:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> ws3.example.com:8080;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接保持</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_requests </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_upgrade</span><span class="__shiki_140thh"> $connection_upgrade {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> upgrade;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;&#39;</span><span class="__shiki_140thh"> close;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /ws/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://websocket_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # WebSocket升级头</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Upgrade $http_upgrade;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Connection $connection_upgrade;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 连接保持</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_read_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 24小时</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_send_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 心跳检测</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_socket_keepalive </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加监控头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-WebSocket-Version $http_sec_websocket_version;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-WebSocket-Protocol $http_sec_websocket_protocol;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 连接数限制</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_conn </span><span class="__shiki_140thh">ws_conn </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录连接状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ws_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;connections&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ws_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_activity&quot;</span><span class="__shiki_140thh">, ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WebSocket状态监控</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /ws/stats </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ws_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> conns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;connections&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> last </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;last_activity&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conns,</span></span>
<span class="line"><span class="__shiki_140thh">                last_activity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> last,</span></span>
<span class="line"><span class="__shiki_140thh">                uptime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">start_time</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            }))</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-监控与调优工具" tabindex="-1">第九部分：监控与调优工具 <a class="header-anchor" href="#第九部分-监控与调优工具" aria-label="Permalink to &quot;第九部分：监控与调优工具&quot;">​</a></h2><h3 id="_9-1-实时性能监控" tabindex="-1">9.1 实时性能监控 <a class="header-anchor" href="#_9-1-实时性能监控" aria-label="Permalink to &quot;9.1 实时性能监控&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 状态监控端点</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">localhost;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /nginx_status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        stub_status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Content-Type </span><span class="__shiki_mdbnqw">&quot;text/plain; charset=utf-8&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 详细状态（需要第三方模块）</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ngx_http_stub_status_module扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">        stub_status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 自定义格式</span></span>
<span class="line"><span class="__shiki_1itgoe">        stub_status_format</span><span class="__shiki_140thh"> json;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /connections </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 需要ngx_http_api_module（Nginx Plus）</span></span>
<span class="line"><span class="__shiki_21nrsd">        # api status/connections;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 共享内存状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /shared_status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> shared </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> shared</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get_keys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_140thh">                data[key] = shared:get(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(data))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        allow 127.0.0.1;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        deny all;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 性能指标收集</span></span>
<span class="line"><span class="__shiki_mdbnqw">log_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    local shared = ngx.shared.status</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    -- 请求计数</span></span>
<span class="line"><span class="__shiki_mdbnqw">    shared:incr(&quot;</span><span class="__shiki_140thh">requests_total</span><span class="__shiki_mdbnqw">&quot;, 1, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    -- 状态码统计</span></span>
<span class="line"><span class="__shiki_mdbnqw">    local status = tonumber(ngx.var.status)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    if status then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if status &gt;= 500 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            shared:incr(&quot;</span><span class="__shiki_140thh">status_5xx</span><span class="__shiki_mdbnqw">&quot;, 1, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        elseif status &gt;= 400 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            shared:incr(&quot;</span><span class="__shiki_140thh">status_4xx</span><span class="__shiki_mdbnqw">&quot;, 1, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        elseif status &gt;= 200 and status &lt; 300 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            shared:incr(&quot;</span><span class="__shiki_140thh">status_2xx</span><span class="__shiki_mdbnqw">&quot;, 1, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        end</span></span>
<span class="line"><span class="__shiki_mdbnqw">    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    -- 响应时间统计</span></span>
<span class="line"><span class="__shiki_mdbnqw">    local rt = tonumber(ngx.var.request_time)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    if rt then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if rt &gt; 1 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            shared:incr(&quot;</span><span class="__shiki_140thh">slow_requests</span><span class="__shiki_mdbnqw">&quot;, 1, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        end</span></span>
<span class="line"><span class="__shiki_mdbnqw">        shared:incr(&quot;</span><span class="__shiki_140thh">total_response_time</span><span class="__shiki_mdbnqw">&quot;, rt, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    -- 带宽使用</span></span>
<span class="line"><span class="__shiki_mdbnqw">    local bytes = tonumber(ngx.var.body_bytes_sent)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    if bytes then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        shared:incr(&quot;</span><span class="__shiki_140thh">bytes_sent</span><span class="__shiki_mdbnqw">&quot;, bytes, 0)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_9-2-性能分析工具集成" tabindex="-1">9.2 性能分析工具集成 <a class="header-anchor" href="#_9-2-性能分析工具集成" aria-label="Permalink to &quot;9.2 性能分析工具集成&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 性能分析端点</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /debug/pprof </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Go pprof兼容端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> pprof </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.pprof&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            pprof.</span><span class="__shiki_dzsirb">start</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 模拟一些工作</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000000</span><span class="__shiki_1itgoe"> do</span></span>
<span class="line"><span class="__shiki_140thh">                sum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> math.sqrt</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            pprof.</span><span class="__shiki_dzsirb">stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Profile completed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /debug/profile </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- CPU profiling</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> debug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;debug&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> profile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 开始采样</span></span>
<span class="line"><span class="__shiki_140thh">            debug.sethook(function(event)</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> info = debug.getinfo(2, </span><span class="__shiki_mdbnqw">&quot;Snl&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> info then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> key = info.source .. </span><span class="__shiki_mdbnqw">&quot;:&quot;</span><span class="__shiki_140thh"> .. info.currentline</span></span>
<span class="line"><span class="__shiki_140thh">                    profile[key] = (profile[key] </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> 0) + 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            end, &quot;c&quot;, 1000)  -- 每1000个调用采样一次</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 执行代码</span></span>
<span class="line"><span class="__shiki_140thh">            -- ...</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 停止采样</span></span>
<span class="line"><span class="__shiki_140thh">            debug.sethook()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 输出结果</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(profile))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    location = /debug/memory {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 内存分析</span></span>
<span class="line"><span class="__shiki_mdbnqw">            collectgarbage(&quot;</span><span class="__shiki_140thh">collect</span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local mem = collectgarbage(&quot;</span><span class="__shiki_140thh">count</span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 共享内存状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local shared = ngx.shared.memory_stats</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local keys = shared:get_keys()</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local stats = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                lua_memory_kb = mem,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                shared_memory_entries = #keys,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                timestamp = ngx.now()</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.header[&quot;</span><span class="__shiki_140thh">Content-Type</span><span class="__shiki_mdbnqw">&quot;] = &quot;</span><span class="__shiki_140thh">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(stats))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_9-3-自动化性能测试" tabindex="-1">9.3 自动化性能测试 <a class="header-anchor" href="#_9-3-自动化性能测试" aria-label="Permalink to &quot;9.3 自动化性能测试&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 性能测试端点</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /benchmark </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> benchmark </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.benchmark&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 测试配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 10秒</span></span>
<span class="line"><span class="__shiki_140thh">                concurrency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 定义测试用例</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> test_cases = {</span></span>
<span class="line"><span class="__shiki_140thh">                {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    name</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;static_file&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    path</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;/static/test.html&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    name</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;api_endpoint&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    path</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;/api/v1/test&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    headers</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_140thh">                        [&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 运行基准测试</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local results = benchmark.run(test_cases, config)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.header[&quot;</span><span class="__shiki_140thh">Content-Type</span><span class="__shiki_mdbnqw">&quot;] = &quot;</span><span class="__shiki_140thh">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(results))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    location = /stress_test {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 压力测试工具</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local http = require &quot;</span><span class="__shiki_140thh">resty.http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local urls = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;</span><span class="__shiki_140thh">http://127.0.0.1/</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;</span><span class="__shiki_140thh">http://127.0.0.1/api/v1/users</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;</span><span class="__shiki_140thh">http://127.0.0.1/static/style.css</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local threads = {}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local results = {}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 创建测试线程</span></span>
<span class="line"><span class="__shiki_mdbnqw">            for i = 1, 100 do  -- 100个并发线程</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local url = urls[math.random(#urls)]</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local co = ngx.thread.spawn(function()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local httpc = http.new()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local start = ngx.now()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local res, err = httpc:request_uri(url)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local elapsed = ngx.now() - start</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    return {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        url = url,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        status = res and res.status or nil,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        time = elapsed,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        error = err</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                table.insert(threads, co)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 收集结果</span></span>
<span class="line"><span class="__shiki_mdbnqw">            for i, co in ipairs(threads) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local ok, res = ngx.thread.wait(co)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                if ok then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    table.insert(results, res)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 分析结果</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local analysis = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                total = #results,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                success = 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                failed = 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                avg_time = 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                max_time = 0,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                min_time = math.huge</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local total_time = 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            for _, res in ipairs(results) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                if res.status and res.status == 200 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    analysis.success = analysis.success + 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    analysis.failed = analysis.failed + 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                if res.time then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    total_time = total_time + res.time</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    if res.time &gt; analysis.max_time then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        analysis.max_time = res.time</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    if res.time &lt; analysis.min_time then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        analysis.min_time = res.time</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if analysis.success &gt; 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                analysis.avg_time = total_time / analysis.success</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.header[&quot;</span><span class="__shiki_140thh">Content-Type</span><span class="__shiki_mdbnqw">&quot;] = &quot;</span><span class="__shiki_140thh">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(analysis))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="第十部分-高级调优技巧" tabindex="-1">第十部分：高级调优技巧 <a class="header-anchor" href="#第十部分-高级调优技巧" aria-label="Permalink to &quot;第十部分：高级调优技巧&quot;">​</a></h2><h3 id="_10-1-动态配置调优" tabindex="-1">10.1 动态配置调优 <a class="header-anchor" href="#_10-1-动态配置调优" aria-label="Permalink to &quot;10.1 动态配置调优&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于负载的动态调优</span></span>
<span class="line"><span class="__shiki_1itgoe">lua_shared_dict</span><span class="__shiki_140thh"> adaptive_config </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 自适应配置管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> adaptive </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;adaptive_config&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 启动监控循环</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            adaptive.</span><span class="__shiki_dzsirb">adjust_config</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 重新设置定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, handler)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态缓冲区调整</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> adaptive </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">adaptive_config</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> load_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> adaptive</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;load_level&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_mdbnqw"> &quot;normal&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> load_level </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;high&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 高负载时使用小缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_buffer_size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;4k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_buffers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;4 4k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_busy_buffers_size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;8k&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            elseif</span><span class="__shiki_140thh"> load_level </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;low&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 低负载时使用大缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_buffer_size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;16k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_buffers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;8 16k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_busy_buffers_size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;32k&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 正常负载</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_buffer_size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;8k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_buffers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;8 8k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">proxy_busy_buffers_size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;16k&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_140thh">$proxy_buffer_size;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffers </span><span class="__shiki_140thh">$proxy_buffers;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_busy_buffers_size </span><span class="__shiki_140thh">$proxy_busy_buffers_size;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载级别调整端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /admin/load_level </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> adaptive </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">adaptive_config</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_level</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> level </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> (level </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;low&quot; </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> level </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;normal&quot; </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> level </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;high&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">                adaptive</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;load_level&quot;</span><span class="__shiki_140thh">, level, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Load level set to: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> level)</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> adaptive</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;load_level&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_mdbnqw"> &quot;normal&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Current load level: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> current)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-基于机器学习的智能调优" tabindex="-1">10.2 基于机器学习的智能调优 <a class="header-anchor" href="#_10-2-基于机器学习的智能调优" aria-label="Permalink to &quot;10.2 基于机器学习的智能调优&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 机器学习调优集成</span></span>
<span class="line"><span class="__shiki_1itgoe">lua_shared_dict</span><span class="__shiki_140thh"> ml_models </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">lua_shared_dict</span><span class="__shiki_140thh"> performance_data </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> ml </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;ml_tuner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 加载预测模型</span></span>
<span class="line"><span class="__shiki_140thh">    ml.</span><span class="__shiki_dzsirb">load_model</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;buffer_size_model&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ml.</span><span class="__shiki_dzsirb">load_model</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_ttl_model&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 收集性能数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_1t8gfj"> collector</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ml.</span><span class="__shiki_dzsirb">collect_performance_data</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, collector)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, collector)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 模型训练循环</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_1t8gfj"> trainer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ml.</span><span class="__shiki_dzsirb">retrain_models</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, trainer)  </span><span class="__shiki_21nrsd">-- 每小时重训练</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, trainer)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ml </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;ml_tuner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 预测最优缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> features </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                request_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                content_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">content_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                client_speed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">performance_data</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;client_speed&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> optimal_buffer = ml.predict(</span><span class="__shiki_mdbnqw">&quot;buffer_size_model&quot;</span><span class="__shiki_140thh">, features)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.var.</span><span class="__shiki_1itgoe">proxy_buffer_size</span><span class="__shiki_140thh"> = optimal_buffer .. </span><span class="__shiki_mdbnqw">&quot;k&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 预测缓存TTL</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ttl_features = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                uri</span><span class="__shiki_140thh"> = ngx.var.uri,</span></span>
<span class="line"><span class="__shiki_1itgoe">                time_of_day</span><span class="__shiki_140thh"> = os.date(</span><span class="__shiki_mdbnqw">&quot;%H&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">                day_of_week</span><span class="__shiki_140thh"> = os.date(</span><span class="__shiki_mdbnqw">&quot;%w&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> optimal_ttl = ml.predict(</span><span class="__shiki_mdbnqw">&quot;cache_ttl_model&quot;</span><span class="__shiki_140thh">, ttl_features)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.var.</span><span class="__shiki_1itgoe">proxy_cache_valid</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;200 &quot;</span><span class="__shiki_140thh"> .. optimal_ttl .. </span><span class="__shiki_mdbnqw">&quot;s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_140thh">$proxy_buffer_size;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_140thh">$proxy_cache_valid;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 机器学习管理端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /admin/ml </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ml </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;ml_tuner&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_action</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;status&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ml.</span><span class="__shiki_dzsirb">get_status</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">(status))</span></span>
<span class="line"><span class="__shiki_1itgoe">            elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;retrain&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ml.</span><span class="__shiki_dzsirb">retrain_models</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Models retrained&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            elseif</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;predict&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 手动预测</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- ...</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Available actions: status, retrain, predict&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十一部分-生产环境检查清单" tabindex="-1">第十一部分：生产环境检查清单 <a class="header-anchor" href="#第十一部分-生产环境检查清单" aria-label="Permalink to &quot;第十一部分：生产环境检查清单&quot;">​</a></h2><h3 id="_11-1-部署前检查清单" tabindex="-1">11.1 部署前检查清单 <a class="header-anchor" href="#_11-1-部署前检查清单" aria-label="Permalink to &quot;11.1 部署前检查清单&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># nginx-performance-checklist.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Nginx性能调优检查清单&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=======================&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 系统配置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. 系统配置检查:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 文件描述符限制: $(</span><span class="__shiki_dzsirb">ulimit</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 进程限制: $(</span><span class="__shiki_dzsirb">ulimit</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 内存锁定: $(</span><span class="__shiki_dzsirb">ulimit</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 内核参数检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. 内核参数检查:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_mdbnqw"> net.core.somaxconn</span><span class="__shiki_mdbnqw"> net.ipv4.tcp_max_syn_backlog</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> &quot;^net\\.&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Nginx配置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. Nginx配置检查:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(successful|failed)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 工作进程检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. 工作进程检查:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - CPU核心数: $(</span><span class="__shiki_1t8gfj">nproc</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 当前Worker数: $(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_mdbnqw"> aux </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> nginx </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> worker </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 网络连接检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;5. 网络连接检查:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 监听端口:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">netstat</span><span class="__shiki_dzsirb"> -tlnp</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> nginx</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 资源使用检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;6. 资源使用检查:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 内存使用:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">ps</span><span class="__shiki_mdbnqw"> aux</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> nginx</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -5</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 打开文件数:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">lsof</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /var/run/nginx.pid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 性能基准测试</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;7. 性能基准测试建议:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 运行: wrk -t4 -c100 -d30s http://localhost/&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 运行: ab -n 10000 -c 100 http://localhost/&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 监控设置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;8. 监控设置检查:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 状态端点: http://localhost:8080/nginx_status&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 错误日志: /var/log/nginx/error.log&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  - 访问日志: /var/log/nginx/access.log&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;检查完成!&quot;</span></span></code></pre></div><h3 id="_11-2-性能监控仪表板" tabindex="-1">11.2 性能监控仪表板 <a class="header-anchor" href="#_11-2-性能监控仪表板" aria-label="Permalink to &quot;11.2 性能监控仪表板&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 性能监控仪表板</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">8081</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">monitor.local;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        root </span><span class="__shiki_140thh">/usr/share/nginx/monitor;</span></span>
<span class="line"><span class="__shiki_1itgoe">        index </span><span class="__shiki_140thh">dashboard.html;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/metrics </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 系统指标</span></span>
<span class="line"><span class="__shiki_140thh">            metrics.</span><span class="__shiki_1itgoe">system</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                load</span><span class="__shiki_140thh"> = io.popen(</span><span class="__shiki_mdbnqw">&quot;uptime | awk -F&#39;[a-z]:&#39; &#39;{ print $</span><span class="__shiki_140thh">2</span><span class="__shiki_mdbnqw">}&#39;&quot;</span><span class="__shiki_140thh">):read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">                memory</span><span class="__shiki_140thh"> = io.popen(</span><span class="__shiki_mdbnqw">&quot;free -m | awk &#39;NR==2{printf </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">%.2f%%</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">, $</span><span class="__shiki_140thh">3</span><span class="__shiki_mdbnqw">*100/$</span><span class="__shiki_140thh">2</span><span class="__shiki_mdbnqw"> }&#39;&quot;</span><span class="__shiki_140thh">):read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">                cpu</span><span class="__shiki_140thh"> = io.popen(</span><span class="__shiki_mdbnqw">&quot;top -bn1 | grep &#39;Cpu(s)&#39; | awk &#39;{print $</span><span class="__shiki_140thh">2</span><span class="__shiki_mdbnqw">}&#39;&quot;</span><span class="__shiki_140thh">):read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- Nginx指标</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> status = io.popen(</span><span class="__shiki_mdbnqw">&quot;curl -s http://127.0.0.1:8080/nginx_status&quot;</span><span class="__shiki_140thh">):read(</span><span class="__shiki_mdbnqw">&quot;*a&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> active, accepts, handled, requests, reading, writing, waiting = </span></span>
<span class="line"><span class="__shiki_1itgoe">                status</span><span class="__shiki_140thh">:match(&quot;Active connections: (%d+)%s+server%s+accepts%s+handled%s+requests%s+(%d+)%s+(%d+)%s+(%d+)%s+Reading:%s+(%d+)%s+Writing:%s+(%d+)%s+Waiting:%s+(%d+)&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            metrics.</span><span class="__shiki_1itgoe">nginx</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                active_connections</span><span class="__shiki_140thh"> = active,</span></span>
<span class="line"><span class="__shiki_1itgoe">                accepts</span><span class="__shiki_140thh"> = accepts,</span></span>
<span class="line"><span class="__shiki_1itgoe">                handled</span><span class="__shiki_140thh"> = handled,</span></span>
<span class="line"><span class="__shiki_1itgoe">                requests</span><span class="__shiki_140thh"> = requests,</span></span>
<span class="line"><span class="__shiki_1itgoe">                reading</span><span class="__shiki_140thh"> = reading,</span></span>
<span class="line"><span class="__shiki_1itgoe">                writing</span><span class="__shiki_140thh"> = writing,</span></span>
<span class="line"><span class="__shiki_1itgoe">                waiting</span><span class="__shiki_140thh"> = waiting</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 业务指标</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> shared = ngx.shared.performance_stats</span></span>
<span class="line"><span class="__shiki_140thh">            metrics.</span><span class="__shiki_1itgoe">business</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                qps</span><span class="__shiki_140thh"> = shared:get(</span><span class="__shiki_mdbnqw">&quot;qps&quot;</span><span class="__shiki_140thh">) or 0,</span></span>
<span class="line"><span class="__shiki_1itgoe">                error_rate</span><span class="__shiki_140thh"> = shared:get(</span><span class="__shiki_mdbnqw">&quot;error_rate&quot;</span><span class="__shiki_140thh">) or 0,</span></span>
<span class="line"><span class="__shiki_1itgoe">                avg_response_time</span><span class="__shiki_140thh"> = shared:get(</span><span class="__shiki_mdbnqw">&quot;avg_response_time&quot;</span><span class="__shiki_140thh">) or 0,</span></span>
<span class="line"><span class="__shiki_1itgoe">                cache_hit_rate</span><span class="__shiki_140thh"> = shared:get(</span><span class="__shiki_mdbnqw">&quot;cache_hit_rate&quot;</span><span class="__shiki_140thh">) or 0</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(metrics))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 实时图表数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">    location /api/charts {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local charts = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                connections = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    labels = {&quot;</span><span class="__shiki_140thh">1m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">2m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">3m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">4m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">5m</span><span class="__shiki_mdbnqw">&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    datasets = {{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        label = &quot;</span><span class="__shiki_140thh">Active Connections</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        data = {45, 52, 48, 55, 50}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                },</span></span>
<span class="line"><span class="__shiki_mdbnqw">                response_time = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    labels = {&quot;</span><span class="__shiki_140thh">1m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">2m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">3m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">4m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">5m</span><span class="__shiki_mdbnqw">&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    datasets = {{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        label = &quot;</span><span class="__shiki_140thh">Response Time (ms)</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        data = {45, 40, 38, 42, 39}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                },</span></span>
<span class="line"><span class="__shiki_mdbnqw">                throughput = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    labels = {&quot;</span><span class="__shiki_140thh">1m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">2m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">3m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">4m</span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">5m</span><span class="__shiki_mdbnqw">&quot;},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    datasets = {{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        label = &quot;</span><span class="__shiki_140thh">Requests/sec</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        data = {1200, 1350, 1250, 1400, 1300}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.header[&quot;</span><span class="__shiki_140thh">Content-Type</span><span class="__shiki_mdbnqw">&quot;] = &quot;</span><span class="__shiki_140thh">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ngx.say(require(&quot;</span><span class="__shiki_140thh">cjson</span><span class="__shiki_mdbnqw">&quot;).encode(charts))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="第十二部分-故障排除与优化案例" tabindex="-1">第十二部分：故障排除与优化案例 <a class="header-anchor" href="#第十二部分-故障排除与优化案例" aria-label="Permalink to &quot;第十二部分：故障排除与优化案例&quot;">​</a></h2><h3 id="_12-1-常见性能问题与解决方案" tabindex="-1">12.1 常见性能问题与解决方案 <a class="header-anchor" href="#_12-1-常见性能问题与解决方案" aria-label="Permalink to &quot;12.1 常见性能问题与解决方案&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题1：高CPU使用率</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 检查工作进程数</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;  </span><span class="__shiki_21nrsd"># 自动调整</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启用CPU亲和性</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_cpu_affinity </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 优化正则表达式（避免复杂regex）</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js|jpg|png)$ </span><span class="__shiki_140thh">{ ... }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 减少日志记录</span></span>
<span class="line"><span class="__shiki_1itgoe">access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 或使用缓冲日志</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题2：高内存使用率</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 调整缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 限制最大连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_connections </span><span class="__shiki_dzsirb">20480</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 优化缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">... max_size=10g;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 启用文件缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">open_file_cache </span><span class="__shiki_140thh">max=10000;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题3：连接数不足</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 增加系统限制</span></span>
<span class="line"><span class="__shiki_21nrsd"># /etc/security/limits.conf</span></span>
<span class="line"><span class="__shiki_140thh">* </span><span class="__shiki_1itgoe">soft</span><span class="__shiki_140thh"> nofile 65535</span></span>
<span class="line"><span class="__shiki_140thh">* </span><span class="__shiki_1itgoe">hard</span><span class="__shiki_140thh"> nofile 65535</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 增加Nginx限制</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_rlimit_nofile </span><span class="__shiki_dzsirb">65535</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_connections </span><span class="__shiki_dzsirb">20480</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 启用连接复用</span></span>
<span class="line"><span class="__shiki_1itgoe">keepalive_timeout </span><span class="__shiki_dzsirb">65s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">keepalive_requests </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题4：慢响应时间</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 启用Gzip压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">gzip </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">gzip_min_length </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 优化DNS解析</span></span>
<span class="line"><span class="__shiki_1itgoe">resolver </span><span class="__shiki_dzsirb">8.8.8.8</span><span class="__shiki_140thh"> valid=30s;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 减少上游超时</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_connect_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_read_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_12-2-真实案例-电商网站性能调优" tabindex="-1">12.2 真实案例：电商网站性能调优 <a class="header-anchor" href="#_12-2-真实案例-电商网站性能调优" aria-label="Permalink to &quot;12.2 真实案例：电商网站性能调优&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 案例：电商网站从1000到10000 QPS的调优历程</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第一阶段：基础优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># 初始QPS：1000</span></span>
<span class="line"><span class="__shiki_21nrsd"># 问题：高延迟，频繁超时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 启用keepalive</span></span>
<span class="line"><span class="__shiki_1itgoe">keepalive_timeout </span><span class="__shiki_dzsirb">65s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">keepalive_requests </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启用Gzip</span></span>
<span class="line"><span class="__shiki_1itgoe">gzip </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">gzip_min_length </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 静态资源缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js|jpg|png)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    expires </span><span class="__shiki_140thh">1y;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：中级优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># QPS提升到：3000</span></span>
<span class="line"><span class="__shiki_21nrsd"># 问题：CPU使用率高，内存不足</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 调整工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_cpu_affinity </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 优化缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_buffer_size </span><span class="__shiki_dzsirb">8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 启用文件缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">open_file_cache </span><span class="__shiki_140thh">max=10000 inactive=30s;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第三阶段：高级优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># QPS提升到：6000</span></span>
<span class="line"><span class="__shiki_21nrsd"># 问题：数据库压力大，缓存命中率低</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 启用代理缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx levels=1:2 keys_zone=product_cache:100m;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启用FastCGI缓存（PHP应用）</span></span>
<span class="line"><span class="__shiki_1itgoe">fastcgi_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/fastcgi levels=1:2 keys_zone=php_cache:50m;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 负载均衡优化</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend2 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend3 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第四阶段：极致优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># QPS目标：10000</span></span>
<span class="line"><span class="__shiki_21nrsd"># 问题：网络延迟，SSL开销</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 启用HTTP/2和SSL优化</span></span>
<span class="line"><span class="__shiki_140thh">listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2 reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 启用Brotli压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">brotli</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">brotli_comp_level</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 启用0-RTT（TLS 1.3）</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_early_data </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用CDN加速静态资源</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /static/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">CDN-Cache-Control </span><span class="__shiki_mdbnqw">&quot;max-age=604800&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 最终配置摘要：</span></span>
<span class="line"><span class="__shiki_21nrsd"># - QPS：从1000提升到10000+</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 平均响应时间：从500ms降低到50ms</span></span>
<span class="line"><span class="__shiki_21nrsd"># - CPU使用率：从90%降低到40%</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 内存使用：稳定在合理范围</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Nginx性能调优是一个系统工程，需要从多个层面进行优化：</p><h3 id="关键优化策略总结" tabindex="-1">关键优化策略总结： <a class="header-anchor" href="#关键优化策略总结" aria-label="Permalink to &quot;关键优化策略总结：&quot;">​</a></h3><ol><li><p><strong>操作系统层</strong>：</p><ul><li>调整内核参数（网络栈、文件系统）</li><li>优化资源限制（文件描述符、进程数）</li><li>配置适当的调度策略</li></ul></li><li><p><strong>Nginx配置层</strong>：</p><ul><li>合理设置工作进程和连接数</li><li>启用高效的传输机制（sendfile、tcp_nopush）</li><li>优化缓冲区大小和缓存策略</li><li>启用HTTP/2和TLS优化</li></ul></li><li><p><strong>应用架构层</strong>：</p><ul><li>实现多级缓存策略</li><li>优化负载均衡算法</li><li>实施连接池管理</li><li>启用智能压缩（Brotli）</li></ul></li><li><p><strong>监控与调优</strong>：</p><ul><li>建立全面的监控体系</li><li>定期进行性能测试</li><li>实施自动化调优</li><li>持续优化迭代</li></ul></li></ol><h3 id="最佳实践原则" tabindex="-1">最佳实践原则： <a class="header-anchor" href="#最佳实践原则" aria-label="Permalink to &quot;最佳实践原则：&quot;">​</a></h3><ol><li><strong>测量驱动优化</strong>：先测量，再优化，验证效果</li><li><strong>渐进式优化</strong>：一次只修改一个参数，观察影响</li><li><strong>场景化配置</strong>：根据业务特点选择优化策略</li><li><strong>自动化管理</strong>：使用工具实现自动化监控和调优</li><li><strong>持续改进</strong>：性能优化是一个持续的过程</li></ol><h3 id="工具推荐" tabindex="-1">工具推荐： <a class="header-anchor" href="#工具推荐" aria-label="Permalink to &quot;工具推荐：&quot;">​</a></h3><ol><li><strong>监控工具</strong>：Prometheus + Grafana, Datadog, New Relic</li><li><strong>测试工具</strong>：wrk, ab, vegeta, Locust</li><li><strong>分析工具</strong>：stap, perf, nginx-vts, nginx-amplify</li><li><strong>调优工具</strong>：nginx-tuning, nginx-config-formatter</li></ol><p>通过系统化的性能调优，Nginx可以支撑极高的并发和吞吐量，满足各种业务场景的性能需求。记住，没有一套配置适合所有场景，最佳配置需要根据实际业务、硬件环境和流量模式不断调整和优化。</p>`,80)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
