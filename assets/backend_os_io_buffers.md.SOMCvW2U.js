import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"操作系统I/O管理 - 缓冲区管理完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/os/io/buffers.md","filePath":"backend/os/io/buffers.md"}'),p={name:"backend/os/io/buffers.md"};function l(h,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="操作系统i-o管理-缓冲区管理完整学习笔记" tabindex="-1">操作系统I/O管理 - 缓冲区管理完整学习笔记 <a class="header-anchor" href="#操作系统i-o管理-缓冲区管理完整学习笔记" aria-label="Permalink to &quot;操作系统I/O管理 - 缓冲区管理完整学习笔记&quot;">​</a></h1><h2 id="_1-缓冲区管理基础概念" tabindex="-1">1. 缓冲区管理基础概念 <a class="header-anchor" href="#_1-缓冲区管理基础概念" aria-label="Permalink to &quot;1. 缓冲区管理基础概念&quot;">​</a></h2><h3 id="_1-1-缓冲区定义与作用" tabindex="-1">1.1 缓冲区定义与作用 <a class="header-anchor" href="#_1-1-缓冲区定义与作用" aria-label="Permalink to &quot;1.1 缓冲区定义与作用&quot;">​</a></h3><ul><li><strong>缓冲区</strong>：内存中用于临时存储I/O数据的区域</li><li><strong>核心作用</strong>： <ul><li>平滑CPU与I/O设备间的速度差异</li><li>减少物理I/O操作次数</li><li>提高系统整体吞吐量</li><li>实现设备无关性</li></ul></li></ul><h3 id="_1-2-引入缓冲区的必要性" tabindex="-1">1.2 引入缓冲区的必要性 <a class="header-anchor" href="#_1-2-引入缓冲区的必要性" aria-label="Permalink to &quot;1.2 引入缓冲区的必要性&quot;">​</a></h3><ul><li><strong>速度鸿沟</strong>：CPU纳秒级 vs 磁盘毫秒级</li><li><strong>粒度不匹配</strong>：CPU字访问 vs 磁盘块访问</li><li><strong>并发需求</strong>：多进程共享设备资源</li></ul><h2 id="_2-缓冲区硬件基础" tabindex="-1">2. 缓冲区硬件基础 <a class="header-anchor" href="#_2-缓冲区硬件基础" aria-label="Permalink to &quot;2. 缓冲区硬件基础&quot;">​</a></h2><h3 id="_2-1-存储层次结构" tabindex="-1">2.1 存储层次结构 <a class="header-anchor" href="#_2-1-存储层次结构" aria-label="Permalink to &quot;2.1 存储层次结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">CPU寄存器 → 缓存 → 主存 → 磁盘 → 磁带</span></span>
<span class="line"><span class="__shiki_wvjl67">速度递减，容量递增，成本递减</span></span></code></pre></div><h3 id="_2-2-缓冲区与缓存区别" tabindex="-1">2.2 缓冲区与缓存区别 <a class="header-anchor" href="#_2-2-缓冲区与缓存区别" aria-label="Permalink to &quot;2.2 缓冲区与缓存区别&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>缓冲区</th><th>缓存</th></tr></thead><tbody><tr><td>目的</td><td>协调速度差异</td><td>加速数据访问</td></tr><tr><td>内容</td><td>特定I/O数据</td><td>频繁访问数据</td></tr><tr><td>生命周期</td><td>较短</td><td>较长</td></tr><tr><td>管理策略</td><td>FIFO为主</td><td>LRU等替换算法</td></tr></tbody></table><h2 id="_3-缓冲区类型与结构" tabindex="-1">3. 缓冲区类型与结构 <a class="header-anchor" href="#_3-缓冲区类型与结构" aria-label="Permalink to &quot;3. 缓冲区类型与结构&quot;">​</a></h2><h3 id="_3-1-按实现方式分类" tabindex="-1">3.1 按实现方式分类 <a class="header-anchor" href="#_3-1-按实现方式分类" aria-label="Permalink to &quot;3.1 按实现方式分类&quot;">​</a></h3><h4 id="_3-1-1-硬件缓冲区" tabindex="-1">3.1.1 硬件缓冲区 <a class="header-anchor" href="#_3-1-1-硬件缓冲区" aria-label="Permalink to &quot;3.1.1 硬件缓冲区&quot;">​</a></h4><ul><li>设备控制器内置缓冲区</li><li>如：磁盘控制器的缓存、网卡的接收缓冲区</li></ul><h4 id="_3-1-2-软件缓冲区" tabindex="-1">3.1.2 软件缓冲区 <a class="header-anchor" href="#_3-1-2-软件缓冲区" aria-label="Permalink to &quot;3.1.2 软件缓冲区&quot;">​</a></h4><ul><li>操作系统内核管理的缓冲区</li><li>位于主存中，由OS统一管理</li></ul><h3 id="_3-2-按组织结构分类" tabindex="-1">3.2 按组织结构分类 <a class="header-anchor" href="#_3-2-按组织结构分类" aria-label="Permalink to &quot;3.2 按组织结构分类&quot;">​</a></h3><h4 id="_3-2-1-单缓冲区" tabindex="-1">3.2.1 单缓冲区 <a class="header-anchor" href="#_3-2-1-单缓冲区" aria-label="Permalink to &quot;3.2.1 单缓冲区&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 单缓冲区结构示例</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> single_buffer {</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> data</span><span class="__shiki_140thh">[BLOCK_SIZE];</span><span class="__shiki_21nrsd">  // 数据区</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> device_no;</span><span class="__shiki_21nrsd">          // 所属设备</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> block_no;</span><span class="__shiki_21nrsd">           // 块号</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> status;</span><span class="__shiki_21nrsd">             // 状态标志</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><p><strong>工作流程</strong>：</p><ol><li>数据从设备读入缓冲区</li><li>进程从缓冲区处理数据</li><li>进程处理时，设备等待</li></ol><p><strong>优缺点</strong>：</p><ul><li>优点：实现简单，内存开销小</li><li>缺点：串行操作，效率低下</li></ul><h4 id="_3-2-2-双缓冲区-缓冲交换" tabindex="-1">3.2.2 双缓冲区（缓冲交换） <a class="header-anchor" href="#_3-2-2-双缓冲区-缓冲交换" aria-label="Permalink to &quot;3.2.2 双缓冲区（缓冲交换）&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 双缓冲区结构</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> double_buffering {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer </span><span class="__shiki_1jdh33">buf</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">    // 两个缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> current_buf;</span><span class="__shiki_21nrsd">         // 当前使用缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> filling_buf;</span><span class="__shiki_21nrsd">         // 正在填充的缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><p><strong>工作流程</strong>：</p><ol><li>设备向缓冲区A填充数据</li><li>进程从缓冲区B处理数据</li><li>完成后交换角色</li></ol><p><strong>优缺点</strong>：</p><ul><li>优点：实现并行操作</li><li>缺点：缓冲区数量固定，不够灵活</li></ul><h4 id="_3-2-3-多缓冲区-缓冲池" tabindex="-1">3.2.3 多缓冲区（缓冲池） <a class="header-anchor" href="#_3-2-3-多缓冲区-缓冲池" aria-label="Permalink to &quot;3.2.3 多缓冲区（缓冲池）&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 缓冲池管理结构</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_pool {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">free_list;</span><span class="__shiki_21nrsd">     // 空闲缓冲区链表</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">device_queues</span><span class="__shiki_140thh">[MAX_DEVICES];</span><span class="__shiki_21nrsd"> // 设备队列</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> total_buffers;</span><span class="__shiki_21nrsd">           // 缓冲区总数</span></span>
<span class="line"><span class="__shiki_140thh">    semaphore mutex;</span><span class="__shiki_21nrsd">             // 互斥信号量</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_4-缓冲池管理机制" tabindex="-1">4. 缓冲池管理机制 <a class="header-anchor" href="#_4-缓冲池管理机制" aria-label="Permalink to &quot;4. 缓冲池管理机制&quot;">​</a></h2><h3 id="_4-1-缓冲池组成要素" tabindex="-1">4.1 缓冲池组成要素 <a class="header-anchor" href="#_4-1-缓冲池组成要素" aria-label="Permalink to &quot;4.1 缓冲池组成要素&quot;">​</a></h3><h4 id="_4-1-1-缓冲区数据结构" tabindex="-1">4.1.1 缓冲区数据结构 <a class="header-anchor" href="#_4-1-1-缓冲区数据结构" aria-label="Permalink to &quot;4.1.1 缓冲区数据结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 缓冲区控制块（BCB）</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_control_block {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> buffer_id;</span><span class="__shiki_21nrsd">              // 缓冲区标识</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">data_area;</span><span class="__shiki_21nrsd">            // 数据区指针</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> device_no;</span><span class="__shiki_21nrsd">              // 设备号</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> block_no;</span><span class="__shiki_21nrsd">               // 块号</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> status;</span><span class="__shiki_21nrsd">                 // 状态标志</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">prev;</span><span class="__shiki_21nrsd"> // 前向指针</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">next;</span><span class="__shiki_21nrsd"> // 后向指针</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_4-1-2-缓冲区状态标志" tabindex="-1">4.1.2 缓冲区状态标志 <a class="header-anchor" href="#_4-1-2-缓冲区状态标志" aria-label="Permalink to &quot;4.1.2 缓冲区状态标志&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_BUSY</span><span class="__shiki_1itgoe">     0x</span><span class="__shiki_dzsirb">01</span><span class="__shiki_21nrsd">    // 缓冲区忙</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_VALID</span><span class="__shiki_1itgoe">    0x</span><span class="__shiki_dzsirb">02</span><span class="__shiki_21nrsd">    // 数据有效</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_DIRTY</span><span class="__shiki_1itgoe">    0x</span><span class="__shiki_dzsirb">04</span><span class="__shiki_21nrsd">    // 数据已修改</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_LOCKED</span><span class="__shiki_1itgoe">   0x</span><span class="__shiki_dzsirb">08</span><span class="__shiki_21nrsd">    // 缓冲区锁定</span></span></code></pre></div><h3 id="_4-2-缓冲池管理算法" tabindex="-1">4.2 缓冲池管理算法 <a class="header-anchor" href="#_4-2-缓冲池管理算法" aria-label="Permalink to &quot;4.2 缓冲池管理算法&quot;">​</a></h3><h4 id="_4-2-1-缓冲区的获取与释放" tabindex="-1">4.2.1 缓冲区的获取与释放 <a class="header-anchor" href="#_4-2-1-缓冲区的获取与释放" aria-label="Permalink to &quot;4.2.1 缓冲区的获取与释放&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 获取缓冲区算法伪代码</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">getblk</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> device</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> block</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 在设备队列中查找指定块</span></span>
<span class="line"><span class="__shiki_140thh">    buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> search_hash_queue</span><span class="__shiki_140thh">(device, block);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (buffer </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (buffer-&gt;status </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> BUFFER_BUSY) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            sleep_on</span><span class="__shiki_140thh">(buffer);</span><span class="__shiki_21nrsd">    // 等待缓冲区释放</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        buffer-&gt;status </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> BUFFER_BUSY;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        remove_from_free_list</span><span class="__shiki_140thh">(buffer);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> buffer;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 从空闲链表获取缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">    buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> remove_from_free_list</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (buffer-&gt;status </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> BUFFER_DIRTY) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        async_write</span><span class="__shiki_140thh">(buffer);</span><span class="__shiki_21nrsd">     // 异步写回</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 需要等待写完成或选择其他缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 设置缓冲区新身份</span></span>
<span class="line"><span class="__shiki_140thh">    buffer-&gt;device_no </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> device;</span></span>
<span class="line"><span class="__shiki_140thh">    buffer-&gt;block_no </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> block;</span></span>
<span class="line"><span class="__shiki_140thh">    buffer-&gt;status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BUFFER_BUSY;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    add_to_hash_queue</span><span class="__shiki_140thh">(buffer);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> buffer;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 释放缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> brelse</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">buffer</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    buffer-&gt;status </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_140thh">BUFFER_BUSY;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    wakeup_waiters</span><span class="__shiki_140thh">(buffer);</span><span class="__shiki_21nrsd">      // 唤醒等待进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">    add_to_free_list_tail</span><span class="__shiki_140thh">(buffer);</span><span class="__shiki_21nrsd"> // 加入空闲链表尾部</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-缓冲区读写操作" tabindex="-1">4.2.2 缓冲区读写操作 <a class="header-anchor" href="#_4-2-2-缓冲区读写操作" aria-label="Permalink to &quot;4.2.2 缓冲区读写操作&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 读缓冲区操作</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> bread</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> device</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> block</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">buf;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    buf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getblk</span><span class="__shiki_140thh">(device, block);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (buf-&gt;status </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> BUFFER_VALID) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> buf;</span><span class="__shiki_21nrsd">  // 缓冲区数据有效</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启动物理读操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">    start_io</span><span class="__shiki_140thh">(device, block, READ);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep_on_io_completion</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    buf-&gt;status </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> BUFFER_VALID;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> buf;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 写缓冲区操作</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> bwrite</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">buf</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    buf-&gt;status </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> BUFFER_DIRTY;</span></span>
<span class="line"><span class="__shiki_140thh">    buf-&gt;status </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_140thh">BUFFER_BUSY;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 同步或异步写回</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (sync_mode) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        start_io</span><span class="__shiki_140thh">(buf-&gt;device_no, buf-&gt;block_no, WRITE);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep_on_io_completion</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_140thh">        buf-&gt;status </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_140thh">BUFFER_DIRTY;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 延迟写，仅标记脏位</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    brelse</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-缓冲池替换算法" tabindex="-1">4.3 缓冲池替换算法 <a class="header-anchor" href="#_4-3-缓冲池替换算法" aria-label="Permalink to &quot;4.3 缓冲池替换算法&quot;">​</a></h3><h4 id="_4-3-1-空闲链表管理策略" tabindex="-1">4.3.1 空闲链表管理策略 <a class="header-anchor" href="#_4-3-1-空闲链表管理策略" aria-label="Permalink to &quot;4.3.1 空闲链表管理策略&quot;">​</a></h4><ul><li><strong>FIFO（先进先出）</strong></li><li><strong>LRU（最近最少使用）</strong></li><li><strong>二次机会算法</strong></li><li><strong>时钟算法</strong></li></ul><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 时钟算法实现示例</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> clock_algorithm {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">clock_hand;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> list_size;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">clock_get_victim</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (clock_hand-&gt;status </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> BUFFER_BUSY) {</span></span>
<span class="line"><span class="__shiki_140thh">            clock_hand </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_hand-&gt;next;</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (clock_hand-&gt;status </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> BUFFER_REFERENCED) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 给第二次机会，清除引用位</span></span>
<span class="line"><span class="__shiki_140thh">            clock_hand-&gt;status </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_140thh">BUFFER_REFERENCED;</span></span>
<span class="line"><span class="__shiki_140thh">            clock_hand </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_hand-&gt;next;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 找到替换目标</span></span>
<span class="line"><span class="__shiki_1itgoe">            struct</span><span class="__shiki_140thh"> buffer_control_block </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">victim </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_hand;</span></span>
<span class="line"><span class="__shiki_140thh">            clock_hand </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_hand-&gt;next;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> victim;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-unix缓冲区管理-经典实现" tabindex="-1">5. Unix缓冲区管理（经典实现） <a class="header-anchor" href="#_5-unix缓冲区管理-经典实现" aria-label="Permalink to &quot;5. Unix缓冲区管理（经典实现）&quot;">​</a></h2><h3 id="_5-1-缓冲区缓存结构" tabindex="-1">5.1 缓冲区缓存结构 <a class="header-anchor" href="#_5-1-缓冲区缓存结构" aria-label="Permalink to &quot;5.1 缓冲区缓存结构&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Unix System V 缓冲区管理</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buf {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> b_flags;</span><span class="__shiki_21nrsd">                // 状态标志</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">b_forw;</span><span class="__shiki_21nrsd">         // 设备队列前向指针</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">b_back;</span><span class="__shiki_21nrsd">         // 设备队列后向指针  </span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">av_forw;</span><span class="__shiki_21nrsd">        // 空闲队列前向指针</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">av_back;</span><span class="__shiki_21nrsd">        // 空闲队列后向指针</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> b_dev;</span><span class="__shiki_21nrsd">                  // 设备号</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> b_blkno;</span><span class="__shiki_21nrsd">               // 块号</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">b_addr;</span><span class="__shiki_21nrsd">              // 数据区地址</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 其他字段</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_5-2-散列队列管理" tabindex="-1">5.2 散列队列管理 <a class="header-anchor" href="#_5-2-散列队列管理" aria-label="Permalink to &quot;5.2 散列队列管理&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> NBUFHASH</span><span class="__shiki_dzsirb"> 64</span><span class="__shiki_21nrsd">    // 散列表大小</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">bufhash</span><span class="__shiki_140thh">[NBUFHASH];</span><span class="__shiki_21nrsd">  // 散列表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 散列函数</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> bufhash</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> dev</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> blkno</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> (dev </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> blkno) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> NBUFHASH;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 搜索缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">find_buffer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> dev</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> blkno</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> bufhash</span><span class="__shiki_140thh">(dev, blkno);</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">bp;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (bp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33"> bufhash</span><span class="__shiki_140thh">[hash]; bp </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">; bp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> bp-&gt;b_forw) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (bp-&gt;b_dev </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> dev </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> bp-&gt;b_blkno </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> blkno) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> bp;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-现代缓冲区管理技术" tabindex="-1">6. 现代缓冲区管理技术 <a class="header-anchor" href="#_6-现代缓冲区管理技术" aria-label="Permalink to &quot;6. 现代缓冲区管理技术&quot;">​</a></h2><h3 id="_6-1-页面缓存-page-cache" tabindex="-1">6.1 页面缓存（Page Cache） <a class="header-anchor" href="#_6-1-页面缓存-page-cache" aria-label="Permalink to &quot;6.1 页面缓存（Page Cache）&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Linux页面缓存概念</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> address_space {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> inode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">host;</span><span class="__shiki_21nrsd">         // 所属inode</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> radix_tree_root page_tree;</span><span class="__shiki_21nrsd"> // 基数树存储页面</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> nrpages;</span><span class="__shiki_21nrsd">      // 页面数量</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> page {</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> flags;</span><span class="__shiki_21nrsd">        // 页面状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> address_space </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">mapping;</span><span class="__shiki_21nrsd"> // 所属地址空间</span></span>
<span class="line"><span class="__shiki_dzsirb">    pgoff_t</span><span class="__shiki_140thh"> index;</span><span class="__shiki_21nrsd">             // 在文件中的偏移</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_6-2-预读机制" tabindex="-1">6.2 预读机制 <a class="header-anchor" href="#_6-2-预读机制" aria-label="Permalink to &quot;6.2 预读机制&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 预读算法核心逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> readahead_control {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> file </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">file;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> address_space </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">mapping;</span></span>
<span class="line"><span class="__shiki_dzsirb">    pgoff_t</span><span class="__shiki_140thh"> index;</span><span class="__shiki_21nrsd">             // 当前读取位置</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> nr_pages;</span><span class="__shiki_21nrsd">    // 预读页面数</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> do_page_cache_readahead</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> readahead_control </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">rac</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于访问模式预测后续读取</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sequential_access</span><span class="__shiki_140thh">(rac)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 顺序访问，大范围预读</span></span>
<span class="line"><span class="__shiki_140thh">        nr_to_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> max_pages;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 随机访问，小范围预读或关闭预读</span></span>
<span class="line"><span class="__shiki_140thh">        nr_to_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> min_pages;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 异步读取预读页面</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> nr_to_read; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> find_or_create_page</span><span class="__shiki_140thh">(rac-&gt;mapping, rac-&gt;index </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> i);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">PageUptodate</span><span class="__shiki_140thh">(page)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            submit_bio_read_page</span><span class="__shiki_140thh">(page);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-回写机制" tabindex="-1">6.3 回写机制 <a class="header-anchor" href="#_6-3-回写机制" aria-label="Permalink to &quot;6.3 回写机制&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 脏页回写控制</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> writeback_control {</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_140thh"> nr_to_write;</span><span class="__shiki_21nrsd">          // 要写回的页数</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> pages_skipped;</span><span class="__shiki_21nrsd"> // 跳过的页数</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sync_mode;</span><span class="__shiki_21nrsd">             // 同步模式</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> writeback_single_inode</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> inode </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">inode</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                          struct</span><span class="__shiki_140thh"> writeback_control </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">wbc</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 收集脏页</span></span>
<span class="line"><span class="__shiki_140thh">    list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> collect_dirty_pages</span><span class="__shiki_140thh">(inode, wbc-&gt;nr_to_write);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量写回</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">list_empty</span><span class="__shiki_140thh">(list)) {</span></span>
<span class="line"><span class="__shiki_140thh">        page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> list_first_entry</span><span class="__shiki_140thh">(list);</span></span>
<span class="line"><span class="__shiki_140thh">        success </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> writepage</span><span class="__shiki_140thh">(page, wbc);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">success) </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        list_del_init</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">page-&gt;lru);</span></span>
<span class="line"><span class="__shiki_140thh">        wbc-&gt;nr_to_write</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> wbc-&gt;nr_to_write;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-缓冲区性能优化策略" tabindex="-1">7. 缓冲区性能优化策略 <a class="header-anchor" href="#_7-缓冲区性能优化策略" aria-label="Permalink to &quot;7. 缓冲区性能优化策略&quot;">​</a></h2><h3 id="_7-1-缓冲区大小优化" tabindex="-1">7.1 缓冲区大小优化 <a class="header-anchor" href="#_7-1-缓冲区大小优化" aria-label="Permalink to &quot;7.1 缓冲区大小优化&quot;">​</a></h3><ul><li><strong>固定大小缓冲区</strong>：实现简单，但可能浪费内存</li><li><strong>可变大小缓冲区</strong>：更高效，但管理复杂</li><li><strong>最佳缓冲区大小计算</strong>：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">最佳缓冲区大小 = √(2 × 设备传输时间 × 数据量 / 内存访问时间)</span></span></code></pre></div></li></ul><h3 id="_7-2-缓冲区分配策略" tabindex="-1">7.2 缓冲区分配策略 <a class="header-anchor" href="#_7-2-缓冲区分配策略" aria-label="Permalink to &quot;7.2 缓冲区分配策略&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 动态缓冲区分配算法</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_allocation {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于工作集模型的分配</span></span>
<span class="line"><span class="__shiki_1itgoe">    size_t</span><span class="__shiki_1t8gfj"> working_set_size</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> process </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">p) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> calculate_recently_accessed_pages</span><span class="__shiki_140thh">(p);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于LRU的缓冲区分配</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> allocate_buffers_based_on_access_pattern</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 监控访问模式，动态调整缓冲区分配</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sequential_pattern_detected</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            increase_buffer_allocation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">            enable_aggressive_prefetch</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            reduce_buffer_allocation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">            use_conservative_caching</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_7-3-缓冲区一致性维护" tabindex="-1">7.3 缓冲区一致性维护 <a class="header-anchor" href="#_7-3-缓冲区一致性维护" aria-label="Permalink to &quot;7.3 缓冲区一致性维护&quot;">​</a></h3><h4 id="_7-3-1-写回策略" tabindex="-1">7.3.1 写回策略 <a class="header-anchor" href="#_7-3-1-写回策略" aria-label="Permalink to &quot;7.3.1 写回策略&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 写回策略选择</span></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_140thh"> writeback_policy {</span></span>
<span class="line"><span class="__shiki_140thh">    WRITE_THROUGH,</span><span class="__shiki_21nrsd">      // 直写</span></span>
<span class="line"><span class="__shiki_140thh">    WRITE_BACK,</span><span class="__shiki_21nrsd">         // 写回</span></span>
<span class="line"><span class="__shiki_140thh">    WRITE_BACK_CACHE</span><span class="__shiki_21nrsd">    // 带缓存的写回</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> handle_write_operation</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">buf</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">enum</span><span class="__shiki_140thh"> writeback_policy </span><span class="__shiki_1jdh33">policy</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (policy) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> WRITE_THROUGH:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 同时写缓冲区和磁盘</span></span>
<span class="line"><span class="__shiki_1t8gfj">            update_buffer</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            synchronous_write_to_disk</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> WRITE_BACK:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 只写缓冲区，延迟写磁盘</span></span>
<span class="line"><span class="__shiki_1t8gfj">            update_buffer</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            mark_buffer_dirty</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 异步或定期写回磁盘</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> WRITE_BACK_CACHE:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 使用回写缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">battery_backed_cache_available</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                update_buffer</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                write_to_battery_backed_cache</span><span class="__shiki_140thh">(buf);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                handle_write_operation</span><span class="__shiki_140thh">(buf, WRITE_BACK);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-3-2-一致性协议" tabindex="-1">7.3.2 一致性协议 <a class="header-anchor" href="#_7-3-2-一致性协议" aria-label="Permalink to &quot;7.3.2 一致性协议&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 多处理器缓冲区一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> cache_coherence_protocol {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // MESI协议状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    enum</span><span class="__shiki_140thh"> cache_line_state {</span></span>
<span class="line"><span class="__shiki_140thh">        MODIFIED,</span><span class="__shiki_21nrsd">       // 修改</span></span>
<span class="line"><span class="__shiki_140thh">        EXCLUSIVE,</span><span class="__shiki_21nrsd">      // 独占  </span></span>
<span class="line"><span class="__shiki_140thh">        SHARED,</span><span class="__shiki_21nrsd">         // 共享</span></span>
<span class="line"><span class="__shiki_140thh">        INVALID</span><span class="__shiki_21nrsd">         // 无效</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> handle_read_miss</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cache, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> address) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 总线嗅探，获取最新数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">        broadcast_read_request</span><span class="__shiki_140thh">(address);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        wait_for_response</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        update_cache_line</span><span class="__shiki_140thh">(cache, address, SHARED);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> handle_write_miss</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cache, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> address) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使其他缓存副本无效</span></span>
<span class="line"><span class="__shiki_1t8gfj">        broadcast_invalidate_request</span><span class="__shiki_140thh">(address);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        wait_for_acknowledgements</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        update_cache_line</span><span class="__shiki_140thh">(cache, address, MODIFIED);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_8-特殊设备的缓冲区管理" tabindex="-1">8. 特殊设备的缓冲区管理 <a class="header-anchor" href="#_8-特殊设备的缓冲区管理" aria-label="Permalink to &quot;8. 特殊设备的缓冲区管理&quot;">​</a></h2><h3 id="_8-1-磁盘缓冲区管理" tabindex="-1">8.1 磁盘缓冲区管理 <a class="header-anchor" href="#_8-1-磁盘缓冲区管理" aria-label="Permalink to &quot;8.1 磁盘缓冲区管理&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 磁盘I/O调度与缓冲区管理</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> disk_buffer_management {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 电梯算法调度</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> elevator_schedule</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> request_queue </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">queue) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sort_requests_by_block_number</span><span class="__shiki_140thh">(queue);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 避免磁头抖动</span></span>
<span class="line"><span class="__shiki_1t8gfj">        group_sequential_requests</span><span class="__shiki_140thh">(queue);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 预读取优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> disk_prefetch</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> file </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">file, </span><span class="__shiki_dzsirb">loff_t</span><span class="__shiki_140thh"> offset) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于访问模式预测</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">detect_sequential_read</span><span class="__shiki_140thh">(file, offset)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            schedule_read_ahead</span><span class="__shiki_140thh">(file, offset, PREFETCH_SIZE);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_8-2-网络缓冲区管理" tabindex="-1">8.2 网络缓冲区管理 <a class="header-anchor" href="#_8-2-网络缓冲区管理" aria-label="Permalink to &quot;8.2 网络缓冲区管理&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 网络协议栈缓冲区管理</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sk_buff {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sk_buff </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">next;</span><span class="__shiki_21nrsd">      // 下一个缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sk_buff </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">prev;</span><span class="__shiki_21nrsd">      // 前一个缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> len;</span><span class="__shiki_21nrsd">          // 数据长度</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> data_len;</span><span class="__shiki_21nrsd">     // 数据区长度</span></span>
<span class="line"><span class="__shiki_140thh">    __u16 alloc_cpu;</span><span class="__shiki_21nrsd">          // 分配CPU</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">destructor)(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sk_buff </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">skb);</span><span class="__shiki_21nrsd"> // 析构函数</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 零拷贝技术</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> zero_copy_receive</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> socket </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">sock</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 直接DMA到用户空间</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setup_dma_to_user_space</span><span class="__shiki_140thh">(sock);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 避免内核与用户空间的数据拷贝</span></span>
<span class="line"><span class="__shiki_1t8gfj">    bypass_kernel_copy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-性能监控与调优" tabindex="-1">9. 性能监控与调优 <a class="header-anchor" href="#_9-性能监控与调优" aria-label="Permalink to &quot;9. 性能监控与调优&quot;">​</a></h2><h3 id="_9-1-缓冲区命中率分析" tabindex="-1">9.1 缓冲区命中率分析 <a class="header-anchor" href="#_9-1-缓冲区命中率分析" aria-label="Permalink to &quot;9.1 缓冲区命中率分析&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 命中率统计</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> buffer_statistics {</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> total_accesses;</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> cache_hits;</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> cache_misses;</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> dirty_pages;</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> writebacks;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    double</span><span class="__shiki_1t8gfj"> hit_ratio</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">double</span><span class="__shiki_140thh">)cache_hits </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> total_accesses;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> monitor_performance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">hit_ratio</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 考虑增加缓冲区大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">            suggest_buffer_size_increase</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (dirty_pages </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> DIRTY_THRESHOLD) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 触发批量回写</span></span>
<span class="line"><span class="__shiki_1t8gfj">            trigger_writeback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_9-2-自适应缓冲区管理" tabindex="-1">9.2 自适应缓冲区管理 <a class="header-anchor" href="#_9-2-自适应缓冲区管理" aria-label="Permalink to &quot;9.2 自适应缓冲区管理&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于机器学习的方法</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> adaptive_buffer_manager {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> access_pattern_model model;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> buffer_config current_config;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> analyze_workload</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分析I/O模式</span></span>
<span class="line"><span class="__shiki_140thh">        pattern </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> model.</span><span class="__shiki_1t8gfj">analyze_recent_io</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 动态调整策略</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> (pattern.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> SEQUENTIAL:</span></span>
<span class="line"><span class="__shiki_140thh">                current_config.prefetch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> LARGE_PREFETCH;</span></span>
<span class="line"><span class="__shiki_140thh">                current_config.replacement_policy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> FIFO;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> RANDOM:</span></span>
<span class="line"><span class="__shiki_140thh">                current_config.prefetch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SMALL_PREFETCH;</span></span>
<span class="line"><span class="__shiki_140thh">                current_config.replacement_policy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> LRU;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> LOOPING:</span></span>
<span class="line"><span class="__shiki_140thh">                current_config.prefetch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MEDIUM_PREFETCH;</span></span>
<span class="line"><span class="__shiki_140thh">                current_config.replacement_policy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MRU;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_10-实际案例分析" tabindex="-1">10. 实际案例分析 <a class="header-anchor" href="#_10-实际案例分析" aria-label="Permalink to &quot;10. 实际案例分析&quot;">​</a></h2><h3 id="_10-1-数据库系统的缓冲区管理" tabindex="-1">10.1 数据库系统的缓冲区管理 <a class="header-anchor" href="#_10-1-数据库系统的缓冲区管理" aria-label="Permalink to &quot;10.1 数据库系统的缓冲区管理&quot;">​</a></h3><ul><li><strong>专用缓冲区池</strong>：为不同数据文件分配专用缓冲区</li><li><strong>预读取策略</strong>：基于查询计划的智能预读</li><li><strong>脏页管理</strong>：检查点机制协调缓冲区与事务日志</li></ul><h3 id="_10-2-文件系统的缓冲区优化" tabindex="-1">10.2 文件系统的缓冲区优化 <a class="header-anchor" href="#_10-2-文件系统的缓冲区优化" aria-label="Permalink to &quot;10.2 文件系统的缓冲区优化&quot;">​</a></h3><ul><li><strong>元数据缓存</strong>：优先缓存目录项和inode</li><li><strong>写聚集</strong>：合并小写操作成为大块写</li><li><strong>日志结构</strong>：减少随机写操作</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>缓冲区管理是操作系统I/O子系统中的核心技术，它通过巧妙的缓存和预读策略，有效弥合了CPU与I/O设备之间的性能鸿沟。现代操作系统的缓冲区管理已经从简单的缓冲池发展为复杂的、自适应的缓存系统，结合了先进的替换算法、预读机制和一致性维护策略。</p><p>理解缓冲区管理的原理和实现机制，对于系统性能调优、数据库设计和存储系统开发都具有重要意义。随着存储技术的发展，缓冲区管理仍在不断演进，以适应新的硬件特性和应用需求。</p>`,87)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
