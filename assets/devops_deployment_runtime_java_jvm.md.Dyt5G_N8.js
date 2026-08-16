import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"学习笔记：应用运行时部署 - Java生态 & JVM参数优化","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/runtime/java/jvm.md","filePath":"devops/deployment/runtime/java/jvm.md"}'),l={name:"devops/deployment/runtime/java/jvm.md"};function _(e,s,c,t,h,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="学习笔记-应用运行时部署-java生态-jvm参数优化" tabindex="-1">学习笔记：应用运行时部署 - Java生态 &amp; JVM参数优化 <a class="header-anchor" href="#学习笔记-应用运行时部署-java生态-jvm参数优化" aria-label="Permalink to &quot;学习笔记：应用运行时部署 - Java生态 &amp; JVM参数优化&quot;">​</a></h1><h2 id="第一部分-jvm参数优化概述" tabindex="-1">第一部分：JVM参数优化概述 <a class="header-anchor" href="#第一部分-jvm参数优化概述" aria-label="Permalink to &quot;第一部分：JVM参数优化概述&quot;">​</a></h2><h3 id="_1-1-为什么需要jvm参数优化" tabindex="-1">1.1 为什么需要JVM参数优化？ <a class="header-anchor" href="#_1-1-为什么需要jvm参数优化" aria-label="Permalink to &quot;1.1 为什么需要JVM参数优化？&quot;">​</a></h3><ul><li><strong>性能瓶颈</strong>：不合理的参数导致GC频繁、内存泄漏、CPU使用率高等问题</li><li><strong>资源浪费</strong>：默认配置无法充分利用硬件资源（内存、CPU）</li><li><strong>稳定性差</strong>：OOM频繁、长时间GC停顿导致应用不可用</li><li><strong>成本控制</strong>：合理优化可减少硬件投入，降低云资源成本</li></ul><h3 id="_1-2-优化目标" tabindex="-1">1.2 优化目标 <a class="header-anchor" href="#_1-2-优化目标" aria-label="Permalink to &quot;1.2 优化目标&quot;">​</a></h3><ul><li><strong>吞吐量优先</strong>：适合批处理、大数据计算类应用（Parallel GC）</li><li><strong>低延迟优先</strong>：适合Web服务、实时系统（G1/ZGC）</li><li><strong>内存占用最小化</strong>：适合微服务、容器化部署</li><li><strong>启动速度优化</strong>：适合Serverless、短时任务</li></ul><h3 id="_1-3-优化原则" tabindex="-1">1.3 优化原则 <a class="header-anchor" href="#_1-3-优化原则" aria-label="Permalink to &quot;1.3 优化原则&quot;">​</a></h3><ol><li><strong>测试驱动</strong>：每次只调整1-2个参数，A/B测试对比效果</li><li><strong>监控先行</strong>：基于监控数据发现问题，针对性优化</li><li><strong>场景适配</strong>：不同应用类型需要不同配置方案</li><li><strong>渐进式优化</strong>：从基础到高级，逐步调优</li></ol><h2 id="第二部分-jvm内存模型深度解析" tabindex="-1">第二部分：JVM内存模型深度解析 <a class="header-anchor" href="#第二部分-jvm内存模型深度解析" aria-label="Permalink to &quot;第二部分：JVM内存模型深度解析&quot;">​</a></h2><h3 id="_2-1-堆内存结构" tabindex="-1">2.1 堆内存结构 <a class="header-anchor" href="#_2-1-堆内存结构" aria-label="Permalink to &quot;2.1 堆内存结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">JVM Heap Structure:</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│             Java Heap                │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┬──────────┬────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  Young Gen  │   Old    │  Permanent │</span></span>
<span class="line"><span class="__shiki_wvjl67">│             │   Gen    │   Gen      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────┬───┬───┤          │ (Metaspace)│</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Eden│S0 │S1 │          │            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │   │   │          │            │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────┴───┴───┴──────────┴────────────┘</span></span></code></pre></div><h3 id="_2-2-各区域详细说明" tabindex="-1">2.2 各区域详细说明 <a class="header-anchor" href="#_2-2-各区域详细说明" aria-label="Permalink to &quot;2.2 各区域详细说明&quot;">​</a></h3><h4 id="_2-2-1-年轻代-young-generation" tabindex="-1">2.2.1 年轻代 (Young Generation) <a class="header-anchor" href="#_2-2-1-年轻代-young-generation" aria-label="Permalink to &quot;2.2.1 年轻代 (Young Generation)&quot;">​</a></h4><ul><li><strong>Eden区</strong>：新对象分配区域 <ul><li>参数：<code>-XX:NewRatio</code>，<code>-Xmn</code>，<code>-XX:SurvivorRatio</code></li></ul></li><li><strong>Survivor区</strong>：经过Minor GC存活的对象 <ul><li>参数：<code>-XX:InitialSurvivorRatio</code>，<code>-XX:TargetSurvivorRatio</code></li></ul></li></ul><h4 id="_2-2-2-老年代-old-generation" tabindex="-1">2.2.2 老年代 (Old Generation) <a class="header-anchor" href="#_2-2-2-老年代-old-generation" aria-label="Permalink to &quot;2.2.2 老年代 (Old Generation)&quot;">​</a></h4><ul><li>长期存活对象（默认年龄阈值15次）</li><li>参数：<code>-XX:MaxTenuringThreshold</code></li></ul><h4 id="_2-2-3-元空间-metaspace" tabindex="-1">2.2.3 元空间 (Metaspace) <a class="header-anchor" href="#_2-2-3-元空间-metaspace" aria-label="Permalink to &quot;2.2.3 元空间 (Metaspace)&quot;">​</a></h4><ul><li>替代永久代，存储类元数据</li><li>参数：<code>-XX:MetaspaceSize</code>，<code>-XX:MaxMetaspaceSize</code></li><li>关键点：默认无上限，需防止内存泄漏</li></ul><h4 id="_2-2-4-堆外内存" tabindex="-1">2.2.4 堆外内存 <a class="header-anchor" href="#_2-2-4-堆外内存" aria-label="Permalink to &quot;2.2.4 堆外内存&quot;">​</a></h4><ul><li><strong>直接内存</strong>：NIO Buffer使用 <ul><li>参数：<code>-XX:MaxDirectMemorySize</code></li></ul></li><li><strong>线程栈</strong>：<code>-Xss</code>（默认1M，建议256k-512k）</li><li><strong>代码缓存</strong>：JIT编译代码 <ul><li>参数：<code>-XX:ReservedCodeCacheSize</code></li></ul></li></ul><h2 id="第三部分-gc收集器详解与选择策略" tabindex="-1">第三部分：GC收集器详解与选择策略 <a class="header-anchor" href="#第三部分-gc收集器详解与选择策略" aria-label="Permalink to &quot;第三部分：GC收集器详解与选择策略&quot;">​</a></h2><h3 id="_3-1-垃圾收集器对比矩阵" tabindex="-1">3.1 垃圾收集器对比矩阵 <a class="header-anchor" href="#_3-1-垃圾收集器对比矩阵" aria-label="Permalink to &quot;3.1 垃圾收集器对比矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>收集器</th><th>算法</th><th>线程</th><th>适用场景</th><th>关键参数</th></tr></thead><tbody><tr><td><strong>Serial</strong></td><td>标记-复制/标记-整理</td><td>单线程</td><td>客户端、小型应用</td><td><code>-XX:+UseSerialGC</code></td></tr><tr><td><strong>Parallel</strong></td><td>标记-复制/标记-整理</td><td>多线程</td><td>吞吐量优先、批处理</td><td><code>-XX:+UseParallelGC</code></td></tr><tr><td><strong>CMS</strong></td><td>标记-清除</td><td>并发</td><td>低延迟、响应优先</td><td><code>-XX:+UseConcMarkSweepGC</code></td></tr><tr><td><strong>G1</strong></td><td>分区整理</td><td>并发</td><td>平衡吞吐/延迟（JDK9+默认）</td><td><code>-XX:+UseG1GC</code></td></tr><tr><td><strong>ZGC</strong></td><td>染色指针</td><td>并发</td><td>超大堆、极低暂停（&lt;10ms）</td><td><code>-XX:+UseZGC</code></td></tr><tr><td><strong>Shenandoah</strong></td><td>转发指针</td><td>并发</td><td>与ZGC类似，OpenJDK特有</td><td><code>-XX:+UseShenandoahGC</code></td></tr></tbody></table><h3 id="_3-2-各收集器详细配置" tabindex="-1">3.2 各收集器详细配置 <a class="header-anchor" href="#_3-2-各收集器详细配置" aria-label="Permalink to &quot;3.2 各收集器详细配置&quot;">​</a></h3><h4 id="_3-2-1-parallel-gc-吞吐量优先" tabindex="-1">3.2.1 Parallel GC（吞吐量优先） <a class="header-anchor" href="#_3-2-1-parallel-gc-吞吐量优先" aria-label="Permalink to &quot;3.2.1 Parallel GC（吞吐量优先）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseParallelGC</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseParallelOldGC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 优化参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ParallelGCThreads</span><span class="__shiki_mdbnqw">=CPU核心数</span><span class="__shiki_21nrsd">  # GC线程数，默认=CPU核心数</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseAdaptiveSizePolicy</span><span class="__shiki_21nrsd">        # 自适应大小策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:GCTimeRatio</span><span class="__shiki_mdbnqw">=99</span><span class="__shiki_21nrsd">               # GC时间与总时间比，默认99（1%时间GC）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:MaxGCPauseMillis</span><span class="__shiki_mdbnqw">=200</span><span class="__shiki_21nrsd">         # 最大GC停顿目标（ms）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+ScavengeBeforeFullGC</span><span class="__shiki_21nrsd">        # FullGC前先做Young GC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存分配</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:YoungGenerationSizeIncrement</span><span class="__shiki_mdbnqw">=20</span><span class="__shiki_21nrsd">   # 年轻代增长比例</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:TenuredGenerationSizeIncrement</span><span class="__shiki_mdbnqw">=10</span><span class="__shiki_21nrsd"> # 老年代增长比例</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:AdaptiveSizeDecrementScaleFactor</span><span class="__shiki_mdbnqw">=4</span><span class="__shiki_21nrsd"> # 缩容比例因子</span></span></code></pre></div><h4 id="_3-2-2-g1-gc-平衡型-jdk8推荐" tabindex="-1">3.2.2 G1 GC（平衡型，JDK8推荐） <a class="header-anchor" href="#_3-2-2-g1-gc-平衡型-jdk8推荐" aria-label="Permalink to &quot;3.2.2 G1 GC（平衡型，JDK8推荐）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用G1</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseG1GC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 区域大小设置（2MB-32MB，必须是2的幂）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1HeapRegionSize</span><span class="__shiki_mdbnqw">=16m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 停顿时间目标</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:MaxGCPauseMillis</span><span class="__shiki_mdbnqw">=200</span><span class="__shiki_21nrsd">           # 目标停顿时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:GCPauseIntervalMillis</span><span class="__shiki_mdbnqw">=3000</span><span class="__shiki_21nrsd">     # GC间隔目标（毫秒）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 并行阶段配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ConcGCThreads</span><span class="__shiki_mdbnqw">=4</span><span class="__shiki_21nrsd">                # 并发标记线程数</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:InitiatingHeapOccupancyPercent</span><span class="__shiki_mdbnqw">=45</span><span class="__shiki_21nrsd">  # 触发并发标记的堆使用率</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 混合收集优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1MixedGCLiveThresholdPercent</span><span class="__shiki_mdbnqw">=85</span><span class="__shiki_21nrsd">    # 区域存活对象阈值</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1MixedGCCountTarget</span><span class="__shiki_mdbnqw">=8</span><span class="__shiki_21nrsd">              # 混合GC最大次数</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1OldCSetRegionThresholdPercent</span><span class="__shiki_mdbnqw">=10</span><span class="__shiki_21nrsd">  # 一次混合GC最多收集的老年代区域比例</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 其他优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+G1HeapWastePercent</span><span class="__shiki_mdbnqw">=5</span><span class="__shiki_21nrsd">           # 允许浪费的堆百分比</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+G1ReservePercent</span><span class="__shiki_mdbnqw">=10</span><span class="__shiki_21nrsd">            # 预留空间百分比</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UnlockExperimentalVMOptions</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1NewSizePercent</span><span class="__shiki_mdbnqw">=5</span><span class="__shiki_21nrsd">              # 年轻代最小比例</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1MaxNewSizePercent</span><span class="__shiki_mdbnqw">=60</span><span class="__shiki_21nrsd">          # 年轻代最大比例</span></span></code></pre></div><h4 id="_3-2-3-zgc-超低延迟-jdk11" tabindex="-1">3.2.3 ZGC（超低延迟，JDK11+） <a class="header-anchor" href="#_3-2-3-zgc-超低延迟-jdk11" aria-label="Permalink to &quot;3.2.3 ZGC（超低延迟，JDK11+）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用ZGC（JDK15+生产可用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseZGC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存相关</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ZAllocationSpikeTolerance</span><span class="__shiki_mdbnqw">=2.0</span><span class="__shiki_21nrsd">   # 分配速率突增容忍度</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ZCollectionInterval</span><span class="__shiki_mdbnqw">=120</span><span class="__shiki_21nrsd">         # GC触发间隔（秒）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ZFragmentationLimit</span><span class="__shiki_mdbnqw">=25</span><span class="__shiki_21nrsd">          # 碎片化容忍度</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 线程配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ConcGCThreads</span><span class="__shiki_mdbnqw">=4</span><span class="__shiki_21nrsd">                 # 并发GC线程数</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ParallelGCThreads</span><span class="__shiki_mdbnqw">=8</span><span class="__shiki_21nrsd">             # 并行GC线程数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 大页面支持（Linux）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseLargePages</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseTransparentHugePages</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ZPath</span><span class="__shiki_mdbnqw">=/hugepages</span><span class="__shiki_21nrsd">                # 大页面路径</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># NUMA优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseNUMA</span></span></code></pre></div><h3 id="_3-3-收集器选择决策树" tabindex="-1">3.3 收集器选择决策树 <a class="header-anchor" href="#_3-3-收集器选择决策树" aria-label="Permalink to &quot;3.3 收集器选择决策树&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">是否需要极低延迟(&lt;10ms)?</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 是 → ZGC (JDK15+) 或 Shenandoah (OpenJDK11+)</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 否 → 堆大小是否超过16GB?</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 是 → G1 GC (平衡吞吐与延迟)</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 否 → 吞吐量优先还是响应优先?</span></span>
<span class="line"><span class="__shiki_wvjl67">        ├── 吞吐量 → Parallel GC</span></span>
<span class="line"><span class="__shiki_wvjl67">        └── 响应性 → CMS (JDK8) 或 G1</span></span></code></pre></div><h2 id="第四部分-堆内存优化策略" tabindex="-1">第四部分：堆内存优化策略 <a class="header-anchor" href="#第四部分-堆内存优化策略" aria-label="Permalink to &quot;第四部分：堆内存优化策略&quot;">​</a></h2><h3 id="_4-1-内存分配策略" tabindex="-1">4.1 内存分配策略 <a class="header-anchor" href="#_4-1-内存分配策略" aria-label="Permalink to &quot;4.1 内存分配策略&quot;">​</a></h3><h4 id="_4-1-1-堆大小设置黄金法则" tabindex="-1">4.1.1 堆大小设置黄金法则 <a class="header-anchor" href="#_4-1-1-堆大小设置黄金法则" aria-label="Permalink to &quot;4.1.1 堆大小设置黄金法则&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 生产环境推荐：初始=最大，避免动态调整开销</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Xms8g</span><span class="__shiki_dzsirb"> -Xmx8g</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 年轻代大小设置（经验值）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 总堆&lt;8G: 年轻代占1/3 ( -Xmn2g 或 -XX:NewRatio=2 )</span></span>
<span class="line"><span class="__shiki_21nrsd"># 总堆8-32G: 年轻代占1/4</span></span>
<span class="line"><span class="__shiki_21nrsd"># 总堆&gt;32G: 年轻代占1/5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 容器环境专用（JDK8u191+）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseContainerSupport</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:InitialRAMPercentage</span><span class="__shiki_mdbnqw">=50.0</span><span class="__shiki_21nrsd">    # 初始堆占容器内存50%</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:MaxRAMPercentage</span><span class="__shiki_mdbnqw">=75.0</span><span class="__shiki_21nrsd">        # 最大堆占容器内存75%</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:MinRAMPercentage</span><span class="__shiki_mdbnqw">=25.0</span><span class="__shiki_21nrsd">        # 最小堆占容器内存25%</span></span></code></pre></div><h4 id="_4-1-2-survivor区优化" tabindex="-1">4.1.2 Survivor区优化 <a class="header-anchor" href="#_4-1-2-survivor区优化" aria-label="Permalink to &quot;4.1.2 Survivor区优化&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 调整Survivor区比例（默认8:1:1）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:SurvivorRatio</span><span class="__shiki_mdbnqw">=8</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 动态年龄计算</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:TargetSurvivorRatio</span><span class="__shiki_mdbnqw">=50</span><span class="__shiki_21nrsd">       # Survivor区使用率目标（默认50%）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:MaxTenuringThreshold</span><span class="__shiki_mdbnqw">=15</span><span class="__shiki_21nrsd">      # 晋升年龄阈值（默认15）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 防止过早晋升</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+NeverTenure</span><span class="__shiki_21nrsd">                 # 对象永不晋升（测试用）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+AlwaysTenure</span><span class="__shiki_21nrsd">                # 对象立即晋升（测试用）</span></span></code></pre></div><h3 id="_4-2-内存分配器优化" tabindex="-1">4.2 内存分配器优化 <a class="header-anchor" href="#_4-2-内存分配器优化" aria-label="Permalink to &quot;4.2 内存分配器优化&quot;">​</a></h3><h4 id="_4-2-1-tlab-thread-local-allocation-buffer" tabindex="-1">4.2.1 TLAB（Thread Local Allocation Buffer） <a class="header-anchor" href="#_4-2-1-tlab-thread-local-allocation-buffer" aria-label="Permalink to &quot;4.2.1 TLAB（Thread Local Allocation Buffer）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># TLAB相关优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseTLAB</span><span class="__shiki_21nrsd">                    # 启用TLAB（默认开启）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:TLABSize</span><span class="__shiki_21nrsd">                    # 初始大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+ResizeTLAB</span><span class="__shiki_21nrsd">                # 允许动态调整（默认开启）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:TLABRefillWasteFraction</span><span class="__shiki_mdbnqw">=64</span><span class="__shiki_21nrsd">  # 浪费空间阈值</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:-UseBiasedLocking</span><span class="__shiki_21nrsd">          # 禁用偏向锁（高并发应用）</span></span></code></pre></div><h4 id="_4-2-2-大对象分配" tabindex="-1">4.2.2 大对象分配 <a class="header-anchor" href="#_4-2-2-大对象分配" aria-label="Permalink to &quot;4.2.2 大对象分配&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># G1的大对象阈值</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1HeapRegionSize</span><span class="__shiki_mdbnqw">=16m</span><span class="__shiki_21nrsd">       # 大对象直接进老年代</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:G1MixedGCLiveThresholdPercent</span><span class="__shiki_mdbnqw">=85</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 其他收集器</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:PretenureSizeThreshold</span><span class="__shiki_mdbnqw">=1m</span><span class="__shiki_21nrsd">  # 对象超过1M直接分配在老年代</span></span></code></pre></div><h2 id="第五部分-jit编译优化" tabindex="-1">第五部分：JIT编译优化 <a class="header-anchor" href="#第五部分-jit编译优化" aria-label="Permalink to &quot;第五部分：JIT编译优化&quot;">​</a></h2><h3 id="_5-1-分层编译策略-jdk7" tabindex="-1">5.1 分层编译策略（JDK7+） <a class="header-anchor" href="#_5-1-分层编译策略-jdk7" aria-label="Permalink to &quot;5.1 分层编译策略（JDK7+）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 编译级别：0-解释执行，1-简单C1，2-受限C1，3-完全C1，4-C2</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+TieredCompilation</span><span class="__shiki_21nrsd">          # 启用分层编译（默认）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:TieredStopAtLevel</span><span class="__shiki_mdbnqw">=4</span><span class="__shiki_21nrsd">         # 最高编译级别</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编译阈值调整</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:CompileThreshold</span><span class="__shiki_mdbnqw">=10000</span><span class="__shiki_21nrsd">      # 方法调用次数阈值（C1）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:OnStackReplacePercentage</span><span class="__shiki_mdbnqw">=140</span><span class="__shiki_21nrsd"> # OSR触发比例</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:InterpreterProfilePercentage</span><span class="__shiki_mdbnqw">=33</span><span class="__shiki_21nrsd"> # 解释器profile采样比例</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内联优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:MaxInlineSize</span><span class="__shiki_mdbnqw">=35</span><span class="__shiki_21nrsd">            # 字节码大小阈值（默认35）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:FreqInlineSize</span><span class="__shiki_mdbnqw">=325</span><span class="__shiki_21nrsd">          # 热点方法内联阈值</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:InlineSmallCode</span><span class="__shiki_mdbnqw">=1000</span><span class="__shiki_21nrsd">        # 已编译代码大小阈值</span></span></code></pre></div><h3 id="_5-2-代码缓存优化" tabindex="-1">5.2 代码缓存优化 <a class="header-anchor" href="#_5-2-代码缓存优化" aria-label="Permalink to &quot;5.2 代码缓存优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 代码缓存大小（默认240M）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:InitialCodeCacheSize</span><span class="__shiki_mdbnqw">=64m</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:ReservedCodeCacheSize</span><span class="__shiki_mdbnqw">=256m</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseCodeCacheFlushing</span><span class="__shiki_21nrsd">      # 缓存满时清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:CodeCacheMinimumFreeSpace</span><span class="__shiki_mdbnqw">=2M</span><span class="__shiki_21nrsd"> # 最小空闲空间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编译策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+BackgroundCompilation</span><span class="__shiki_21nrsd">     # 后台编译（默认）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:-UseCounterDecay</span><span class="__shiki_21nrsd">           # 禁用计数器衰减</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:CounterHalfLifeTime</span><span class="__shiki_mdbnqw">=30</span><span class="__shiki_21nrsd">     # 半衰期（分钟）</span></span></code></pre></div><h2 id="第六部分-监控与诊断参数" tabindex="-1">第六部分：监控与诊断参数 <a class="header-anchor" href="#第六部分-监控与诊断参数" aria-label="Permalink to &quot;第六部分：监控与诊断参数&quot;">​</a></h2><h3 id="_6-1-gc日志配置-生产环境必备" tabindex="-1">6.1 GC日志配置（生产环境必备） <a class="header-anchor" href="#_6-1-gc日志配置-生产环境必备" aria-label="Permalink to &quot;6.1 GC日志配置（生产环境必备）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># JDK8及之前</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintGCDetails</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintGCDateStamps</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintGCTimeStamps</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintTenuringDistribution</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintGCApplicationStoppedTime</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Xloggc:/opt/app/logs/gc.log</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UseGCLogFileRotation</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:NumberOfGCLogFiles</span><span class="__shiki_mdbnqw">=10</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:GCLogFileSize</span><span class="__shiki_mdbnqw">=100M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JDK9+统一日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Xlog:gc*,gc+age</span><span class="__shiki_mdbnqw">=trace,safepoint:file=/opt/app/logs/gc.log:time,uptime,level,tags:filecount=10,filesize=100M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 增强信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Xlog:gc+heap*</span><span class="__shiki_mdbnqw">=debug</span><span class="__shiki_21nrsd">           # 堆变化详情</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Xlog:gc+ergo*</span><span class="__shiki_mdbnqw">=debug</span><span class="__shiki_21nrsd">           # 自适应调整详情</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Xlog:gc+promotion*</span><span class="__shiki_mdbnqw">=debug</span><span class="__shiki_21nrsd">      # 晋升详情</span></span></code></pre></div><h3 id="_6-2-堆转储与内存分析" tabindex="-1">6.2 堆转储与内存分析 <a class="header-anchor" href="#_6-2-堆转储与内存分析" aria-label="Permalink to &quot;6.2 堆转储与内存分析&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># OOM时自动dump</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+HeapDumpOnOutOfMemoryError</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:HeapDumpPath</span><span class="__shiki_mdbnqw">=/opt/app/logs/heapdump-%t.hprof</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:OnOutOfMemoryError</span><span class="__shiki_mdbnqw">=</span><span class="__shiki_1t8gfj">&quot;sh /opt/app/scripts/restart.sh&quot;</span><span class="__shiki_21nrsd"> # OOM后处理</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动触发信号</span></span>
<span class="line"><span class="__shiki_21nrsd"># kill -3 &lt;pid&gt; 或 jcmd &lt;pid&gt; GC.heap_dump /path/to/dump.hprof</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 类加载卸载信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+TraceClassLoading</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+TraceClassUnloading</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintClassHistogramBeforeFullGC</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintClassHistogramAfterFullGC</span></span></code></pre></div><h3 id="_6-3-jvm监控jmx配置" tabindex="-1">6.3 JVM监控JMX配置 <a class="header-anchor" href="#_6-3-jvm监控jmx配置" aria-label="Permalink to &quot;6.3 JVM监控JMX配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 远程监控（注意安全）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Dcom.sun.management.jmxremote</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Dcom.sun.management.jmxremote.port</span><span class="__shiki_mdbnqw">=9090</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Dcom.sun.management.jmxremote.ssl</span><span class="__shiki_mdbnqw">=</span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Dcom.sun.management.jmxremote.authenticate</span><span class="__shiki_mdbnqw">=</span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 生产环境应为true</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Dcom.sun.management.jmxremote.rmi.port</span><span class="__shiki_mdbnqw">=9091</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Djava.rmi.server.hostname</span><span class="__shiki_mdbnqw">=your-server-ip</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 飞行记录器（JDK11+）</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:StartFlightRecording</span><span class="__shiki_mdbnqw">=delay=60s,duration=600s,filename=/opt/app/recordings/myrecording.jfr</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:FlightRecorderOptions</span><span class="__shiki_mdbnqw">=stackdepth=128</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 诊断命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+UnlockDiagnosticVMOptions</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:+PrintFlagsFinal</span><span class="__shiki_21nrsd">          # 查看所有参数最终值</span></span></code></pre></div><h2 id="第七部分-实战优化案例" tabindex="-1">第七部分：实战优化案例 <a class="header-anchor" href="#第七部分-实战优化案例" aria-label="Permalink to &quot;第七部分：实战优化案例&quot;">​</a></h2><h3 id="_7-1-场景一-微服务容器化部署-spring-boot" tabindex="-1">7.1 场景一：微服务容器化部署（Spring Boot） <a class="header-anchor" href="#_7-1-场景一-微服务容器化部署-spring-boot" aria-label="Permalink to &quot;7.1 场景一：微服务容器化部署（Spring Boot）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器内存限制：4GB</span></span>
<span class="line"><span class="__shiki_21nrsd"># 目标：内存占用最小化，快速启动</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">JAVA_OPTS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 容器感知</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseContainerSupport</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MaxRAMPercentage=75.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MinRAMPercentage=50.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # GC选择：G1（平衡型）</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseG1GC</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MaxGCPauseMillis=200</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:G1HeapRegionSize=8m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:InitiatingHeapOccupancyPercent=40</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 内存优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseStringDeduplication          # 字符串去重</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:StringDeduplicationAgeThreshold=3</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MetaspaceSize=128m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MaxMetaspaceSize=256m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xss512k                             # 减小线程栈</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 启动优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+AlwaysPreTouch                  # 启动时预分配内存</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseTransparentHugePages         # Linux大页</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+TieredCompilation</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:TieredStopAtLevel=1              # 快速启动，仅C1编译</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 日志</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xlog:gc*=info:file=/logs/gc.log:time,uptime,level,tags:filecount=5,filesize=50M</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+HeapDumpOnOutOfMemoryError</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:HeapDumpPath=/logs/heapdump.hprof</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 应用特定</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Dspring.profiles.active=container</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Djava.security.egd=file:/dev/./urandom</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h3 id="_7-2-场景二-大数据处理-吞吐量优先" tabindex="-1">7.2 场景二：大数据处理（吞吐量优先） <a class="header-anchor" href="#_7-2-场景二-大数据处理-吞吐量优先" aria-label="Permalink to &quot;7.2 场景二：大数据处理（吞吐量优先）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 物理机：32核心，128GB内存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 目标：最大化吞吐量</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">JAVA_OPTS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 堆内存（占用物理内存70%）</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xms90g -Xmx90g</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:NewRatio=1                       # 年轻代:老年代=1:1</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xmn45g                              # 年轻代45GB</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:SurvivorRatio=6                  # Eden:S0:S1=6:1:1</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # Parallel GC优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseParallelGC</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseParallelOldGC</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:ParallelGCThreads=24             # GC线程数=核心数*3/4</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseAdaptiveSizePolicy</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:GCTimeRatio=19                   # GC时间占比5%</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+ScavengeBeforeFullGC</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 内存分配</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:PretenureSizeThreshold=2m        # 大对象直接老年代</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+AlwaysPreTouch</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:-UseBiasedLocking                # 禁用偏向锁</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # JIT优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+TieredCompilation</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:TieredStopAtLevel=4</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:CompileThreshold=15000</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:ReservedCodeCacheSize=512m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 监控</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xlog:gc*,gc+heap*=debug:file=/var/log/gc.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+PrintCompilation</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+PrintInlining</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h3 id="_7-3-场景三-高并发低延迟api服务" tabindex="-1">7.3 场景三：高并发低延迟API服务 <a class="header-anchor" href="#_7-3-场景三-高并发低延迟api服务" aria-label="Permalink to &quot;7.3 场景三：高并发低延迟API服务&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 容器：8核心，16GB内存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 目标：P99延迟&lt;100ms</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">JAVA_OPTS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 堆内存</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xms12g -Xmx12g</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseContainerSupport</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # ZGC极致低延迟</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseZGC</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UnlockExperimentalVMOptions</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:ConcGCThreads=4</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:ParallelGCThreads=8</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:ZAllocationSpikeTolerance=3.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 内存优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MetaspaceSize=256m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:MaxMetaspaceSize=512m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xss256k</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseCompressedOops</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseCompressedClassPointers</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 锁与线程优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:-UseBiasedLocking</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseNUMA</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+UseLWPSynchronization          # Linux pthreads</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # JIT策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+TieredCompilation</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:TieredStopAtLevel=3             # 不进行C2编译，减少编译停顿</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:ReservedCodeCacheSize=512m</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 监控与诊断</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Xlog:gc*=debug:file=/logs/gc_%p.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:+FlightRecorder</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:StartFlightRecording=maxsize=1g,maxage=24h</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -XX:FlightRecorderOptions=stackdepth=256</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 网络与IO</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Dsun.net.client.defaultConnectTimeout=5000</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Dsun.net.client.defaultReadTimeout=30000</span></span>
<span class="line"><span class="__shiki_mdbnqw">  -Djava.net.preferIPv4Stack=true</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h2 id="第八部分-性能测试与调优方法" tabindex="-1">第八部分：性能测试与调优方法 <a class="header-anchor" href="#第八部分-性能测试与调优方法" aria-label="Permalink to &quot;第八部分：性能测试与调优方法&quot;">​</a></h2><h3 id="_8-1-压测工具与指标" tabindex="-1">8.1 压测工具与指标 <a class="header-anchor" href="#_8-1-压测工具与指标" aria-label="Permalink to &quot;8.1 压测工具与指标&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 常用压测工具</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. wrk/wrk2 - HTTP基准测试</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. JMeter - 复杂场景测试</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Gatling - Scala编写，高性能</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. Apache Bench (ab) - 简单快速</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关键监控指标</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. Throughput (TPS/QPS)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. Latency (P50, P90, P99, P999)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. GC频率与时长</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. CPU使用率</span></span>
<span class="line"><span class="__shiki_21nrsd"># 5. Heap使用率</span></span></code></pre></div><h3 id="_8-2-调优迭代流程" tabindex="-1">8.2 调优迭代流程 <a class="header-anchor" href="#_8-2-调优迭代流程" aria-label="Permalink to &quot;8.2 调优迭代流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 基线测试：记录默认参数性能指标</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 瓶颈分析：使用工具定位瓶颈（GC、CPU、内存）</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 参数调整：针对性调整1-2个参数</span></span>
<span class="line"><span class="__shiki_wvjl67">4. A/B测试：对比调整前后性能</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 稳定性测试：长期运行验证稳定性</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 文档记录：记录最优配置</span></span></code></pre></div><h3 id="_8-3-常见问题诊断命令" tabindex="-1">8.3 常见问题诊断命令 <a class="header-anchor" href="#_8-3-常见问题诊断命令" aria-label="Permalink to &quot;8.3 常见问题诊断命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 实时监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">jstat</span><span class="__shiki_dzsirb"> -gcutil</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">          # GC统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">jstat</span><span class="__shiki_dzsirb"> -gccapacity</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">         # 堆容量</span></span>
<span class="line"><span class="__shiki_1t8gfj">jmap</span><span class="__shiki_dzsirb"> -heap</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_21nrsd">                     # 堆摘要</span></span>
<span class="line"><span class="__shiki_1t8gfj">jstack</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> thread_dump.txt</span><span class="__shiki_21nrsd">       # 线程栈</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">jmap</span><span class="__shiki_dzsirb"> -histo:live</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_21nrsd">               # 存活对象直方图</span></span>
<span class="line"><span class="__shiki_1t8gfj">jmap</span><span class="__shiki_dzsirb"> -dump:live,format=b,file=heap.hprof</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 高级诊断</span></span>
<span class="line"><span class="__shiki_1t8gfj">jcmd</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> VM.flags</span><span class="__shiki_21nrsd">                  # 查看所有参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">jcmd</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> GC.class_histogram</span><span class="__shiki_21nrsd">        # 类直方图</span></span>
<span class="line"><span class="__shiki_1t8gfj">jcmd</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> Thread.print</span><span class="__shiki_21nrsd">              # 线程栈</span></span>
<span class="line"><span class="__shiki_1t8gfj">jcmd</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pi</span><span class="__shiki_140thh">d</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> VM.native_memory</span><span class="__shiki_mdbnqw"> summary</span><span class="__shiki_21nrsd">  # 本地内存</span></span></code></pre></div><h2 id="第九部分-安全与最佳实践" tabindex="-1">第九部分：安全与最佳实践 <a class="header-anchor" href="#第九部分-安全与最佳实践" aria-label="Permalink to &quot;第九部分：安全与最佳实践&quot;">​</a></h2><h3 id="_9-1-安全配置" tabindex="-1">9.1 安全配置 <a class="header-anchor" href="#_9-1-安全配置" aria-label="Permalink to &quot;9.1 安全配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 禁止危险参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:-DisableExplicitGC</span><span class="__shiki_21nrsd">              # 允许System.gc()</span></span>
<span class="line"><span class="__shiki_1t8gfj">-XX:-UseLargePages</span><span class="__shiki_21nrsd">                  # 大页内存可能被攻击</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 加密相关</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Djava.security.egd</span><span class="__shiki_mdbnqw">=file:/dev/./urandom</span><span class="__shiki_21nrsd">  # 避免熵池阻塞</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Djdk.tls.disabledAlgorithms</span><span class="__shiki_mdbnqw">=SSLv3,</span><span class="__shiki_mdbnqw"> TLSv1,</span><span class="__shiki_mdbnqw"> TLSv1.1,</span><span class="__shiki_mdbnqw"> RC4,</span><span class="__shiki_mdbnqw"> DES,</span><span class="__shiki_mdbnqw"> MD5withRSA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Djava.security.policy</span><span class="__shiki_mdbnqw">=/path/to/policy</span></span>
<span class="line"><span class="__shiki_1t8gfj">-Djava.rmi.server.useCodebaseOnly</span><span class="__shiki_mdbnqw">=</span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_9-2-生产环境检查清单" tabindex="-1">9.2 生产环境检查清单 <a class="header-anchor" href="#_9-2-生产环境检查清单" aria-label="Permalink to &quot;9.2 生产环境检查清单&quot;">​</a></h3><ul><li>[ ] 设置堆内存上限防止系统OOM</li><li>[ ] 配置GC日志和堆转储路径</li><li>[ ] 关闭JMX远程访问或启用认证</li><li>[ ] 验证容器环境参数兼容性</li><li>[ ] 设置合理的文件描述符限制</li><li>[ ] 配置OOM后的处理脚本</li><li>[ ] 监控关键JVM指标</li><li>[ ] 定期review和更新JVM版本</li></ul><h2 id="第十部分-jdk版本特性差异" tabindex="-1">第十部分：JDK版本特性差异 <a class="header-anchor" href="#第十部分-jdk版本特性差异" aria-label="Permalink to &quot;第十部分：JDK版本特性差异&quot;">​</a></h2><h3 id="_10-1-jdk8-vs-jdk11-vs-jdk17" tabindex="-1">10.1 JDK8 vs JDK11 vs JDK17 <a class="header-anchor" href="#_10-1-jdk8-vs-jdk11-vs-jdk17" aria-label="Permalink to &quot;10.1 JDK8 vs JDK11 vs JDK17&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>JDK8</th><th>JDK11</th><th>JDK17</th></tr></thead><tbody><tr><td><strong>默认GC</strong></td><td>Parallel</td><td>G1</td><td>G1 (ZGC可选)</td></tr><tr><td><strong>容器支持</strong></td><td>有限 (u191+)</td><td>完善</td><td>原生支持</td></tr><tr><td><strong>统一日志</strong></td><td>无</td><td>有</td><td>增强</td></tr><tr><td><strong>ZGC</strong></td><td>无</td><td>实验性</td><td>生产可用</td></tr><tr><td><strong>Shenandoah</strong></td><td>无</td><td>实验性</td><td>生产可用</td></tr><tr><td><strong>CDS</strong></td><td>有限</td><td>AppCDS</td><td>增强CDS</td></tr></tbody></table><h3 id="_10-2-升级注意事项" tabindex="-1">10.2 升级注意事项 <a class="header-anchor" href="#_10-2-升级注意事项" aria-label="Permalink to &quot;10.2 升级注意事项&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># JDK8 → JDK11</span></span>
<span class="line"><span class="__shiki_1t8gfj">1.</span><span class="__shiki_mdbnqw"> 移除PermGen相关参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">2.</span><span class="__shiki_mdbnqw"> 更新GC参数格式（Xlog替代PrintGCDetails）</span></span>
<span class="line"><span class="__shiki_1t8gfj">3.</span><span class="__shiki_mdbnqw"> 检查模块化影响</span></span>
<span class="line"><span class="__shiki_1t8gfj">4.</span><span class="__shiki_mdbnqw"> 更新TLS/加密相关配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JDK11 → JDK17</span></span>
<span class="line"><span class="__shiki_1t8gfj">1.</span><span class="__shiki_mdbnqw"> 评估ZGC生产可用性</span></span>
<span class="line"><span class="__shiki_1t8gfj">2.</span><span class="__shiki_mdbnqw"> 检查废弃API使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">3.</span><span class="__shiki_mdbnqw"> 启用新的垃圾收集器</span></span>
<span class="line"><span class="__shiki_1t8gfj">4.</span><span class="__shiki_mdbnqw"> 利用新CDS特性</span></span></code></pre></div><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>JVM参数优化是一个<strong>系统工程</strong>，需要：</p><ol><li><strong>理解应用特性</strong>：不同应用类型需求不同</li><li><strong>掌握JVM原理</strong>：垃圾收集、内存分配、JIT编译</li><li><strong>善用监控工具</strong>：基于数据而非猜测进行优化</li><li><strong>持续迭代优化</strong>：性能优化是一个持续过程</li><li><strong>平衡各方因素</strong>：吞吐量、延迟、内存、启动时间之间的权衡</li></ol><p><strong>黄金法则</strong>：</p><ul><li>没有最好的配置，只有最适合的配置</li><li>每次只调整少量参数，验证效果</li><li>生产环境变更必须有回滚计划</li><li>监控先行，数据驱动决策</li></ul><p>通过系统的JVM参数优化，通常可以获得30%-300%的性能提升，同时提高系统稳定性和资源利用率。</p>`,86)])])}const k=a(l,[["render",_]]);export{o as __pageData,k as default};
