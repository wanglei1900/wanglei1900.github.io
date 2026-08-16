import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"操作系统知识 - 进程间通信 - 信号","description":"","frontmatter":{},"headers":[],"relativePath":"backend/os/ipc/signals.md","filePath":"backend/os/ipc/signals.md"}'),p={name:"backend/os/ipc/signals.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="操作系统知识-进程间通信-信号" tabindex="-1">操作系统知识 - 进程间通信 - 信号 <a class="header-anchor" href="#操作系统知识-进程间通信-信号" aria-label="Permalink to &quot;操作系统知识 - 进程间通信 - 信号&quot;">​</a></h1><h2 id="_1-信号的基本概念" tabindex="-1">1. 信号的基本概念 <a class="header-anchor" href="#_1-信号的基本概念" aria-label="Permalink to &quot;1. 信号的基本概念&quot;">​</a></h2><h3 id="_1-1-什么是信号" tabindex="-1">1.1 什么是信号 <a class="header-anchor" href="#_1-1-什么是信号" aria-label="Permalink to &quot;1.1 什么是信号&quot;">​</a></h3><ul><li><strong>信号</strong>是Linux/Unix系统中进程间通信的一种异步通知机制</li><li>用于通知进程发生了某种事件，类似于软件中断</li><li>信号是操作系统内核管理的一种资源</li></ul><h3 id="_1-2-信号的特点" tabindex="-1">1.2 信号的特点 <a class="header-anchor" href="#_1-2-信号的特点" aria-label="Permalink to &quot;1.2 信号的特点&quot;">​</a></h3><ul><li><strong>异步性</strong>：信号可以在任何时候发送给进程</li><li><strong>简单性</strong>：只能传递信号类型，不能携带复杂数据</li><li><strong>不可靠性</strong>：早期信号可能丢失，现代信号已解决此问题</li><li><strong>优先级</strong>：不同信号有不同的优先级</li></ul><h2 id="_2-信号的产生方式" tabindex="-1">2. 信号的产生方式 <a class="header-anchor" href="#_2-信号的产生方式" aria-label="Permalink to &quot;2. 信号的产生方式&quot;">​</a></h2><h3 id="_2-1-硬件异常产生的信号" tabindex="-1">2.1 硬件异常产生的信号 <a class="header-anchor" href="#_2-1-硬件异常产生的信号" aria-label="Permalink to &quot;2.1 硬件异常产生的信号&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例：除零错误产生 SIGFPE 信号</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">, b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> b;</span><span class="__shiki_21nrsd">  // 产生 SIGFPE 信号</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-终端特殊按键产生的信号" tabindex="-1">2.2 终端特殊按键产生的信号 <a class="header-anchor" href="#_2-2-终端特殊按键产生的信号" aria-label="Permalink to &quot;2.2 终端特殊按键产生的信号&quot;">​</a></h3><ul><li><strong>Ctrl+C</strong>：产生 SIGINT 信号（中断）</li><li><strong>Ctrl+\\</strong>：产生 SIGQUIT 信号（退出）</li><li><strong>Ctrl+Z</strong>：产生 SIGTSTP 信号（暂停）</li></ul><h3 id="_2-3-软件条件产生的信号" tabindex="-1">2.3 软件条件产生的信号 <a class="header-anchor" href="#_2-3-软件条件产生的信号" aria-label="Permalink to &quot;2.3 软件条件产生的信号&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例：alarm函数产生SIGALRM信号</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> alarm_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    write</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Alarm!</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGALRM, alarm_handler);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    alarm</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">  // 5秒后产生SIGALRM信号</span></span>
<span class="line"><span class="__shiki_1t8gfj">    pause</span><span class="__shiki_140thh">();</span><span class="__shiki_21nrsd">   // 等待信号</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-信号的分类" tabindex="-1">3. 信号的分类 <a class="header-anchor" href="#_3-信号的分类" aria-label="Permalink to &quot;3. 信号的分类&quot;">​</a></h2><h3 id="_3-1-不可靠信号-1-31" tabindex="-1">3.1 不可靠信号（1-31） <a class="header-anchor" href="#_3-1-不可靠信号-1-31" aria-label="Permalink to &quot;3.1 不可靠信号（1-31）&quot;">​</a></h3><ul><li>早期Unix系统中的信号，可能丢失</li><li>不支持排队，相同信号可能被合并</li></ul><h3 id="_3-2-可靠信号-34-64" tabindex="-1">3.2 可靠信号（34-64） <a class="header-anchor" href="#_3-2-可靠信号-34-64" aria-label="Permalink to &quot;3.2 可靠信号（34-64）&quot;">​</a></h3><ul><li>Linux扩展的信号，支持排队</li><li>不会丢失</li></ul><h3 id="_3-3-常见信号列表" tabindex="-1">3.3 常见信号列表 <a class="header-anchor" href="#_3-3-常见信号列表" aria-label="Permalink to &quot;3.3 常见信号列表&quot;">​</a></h3><table tabindex="0"><thead><tr><th>信号编号</th><th>信号名称</th><th>默认动作</th><th>说明</th></tr></thead><tbody><tr><td>1</td><td>SIGHUP</td><td>终止</td><td>终端挂起或控制进程终止</td></tr><tr><td>2</td><td>SIGINT</td><td>终止</td><td>键盘中断（Ctrl+C）</td></tr><tr><td>3</td><td>SIGQUIT</td><td>终止+core</td><td>键盘退出（Ctrl+\\）</td></tr><tr><td>4</td><td>SIGILL</td><td>终止+core</td><td>非法指令</td></tr><tr><td>8</td><td>SIGFPE</td><td>终止+core</td><td>浮点异常</td></tr><tr><td>9</td><td>SIGKILL</td><td>终止</td><td>强制杀死进程（不可捕获）</td></tr><tr><td>11</td><td>SIGSEGV</td><td>终止+core</td><td>段错误</td></tr><tr><td>14</td><td>SIGALRM</td><td>终止</td><td>定时器信号</td></tr><tr><td>15</td><td>SIGTERM</td><td>终止</td><td>程序结束信号</td></tr><tr><td>17</td><td>SIGCHLD</td><td>忽略</td><td>子进程状态改变</td></tr><tr><td>18</td><td>SIGCONT</td><td>继续</td><td>继续执行暂停的进程</td></tr><tr><td>19</td><td>SIGSTOP</td><td>暂停</td><td>暂停进程（不可捕获）</td></tr><tr><td>20</td><td>SIGTSTP</td><td>暂停</td><td>终端暂停（Ctrl+Z）</td></tr></tbody></table><h2 id="_4-信号的处理方式" tabindex="-1">4. 信号的处理方式 <a class="header-anchor" href="#_4-信号的处理方式" aria-label="Permalink to &quot;4. 信号的处理方式&quot;">​</a></h2><h3 id="_4-1-默认处理" tabindex="-1">4.1 默认处理 <a class="header-anchor" href="#_4-1-默认处理" aria-label="Permalink to &quot;4.1 默认处理&quot;">​</a></h3><ul><li>执行系统默认动作（终止、终止+core、忽略、暂停、继续）</li></ul><h3 id="_4-2-忽略信号" tabindex="-1">4.2 忽略信号 <a class="header-anchor" href="#_4-2-忽略信号" aria-label="Permalink to &quot;4.2 忽略信号&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 忽略SIGINT信号（Ctrl+C无效）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGINT, SIG_IGN);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Running... Press Ctrl+C has no effect.</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-捕获信号-自定义处理函数" tabindex="-1">4.3 捕获信号（自定义处理函数） <a class="header-anchor" href="#_4-3-捕获信号-自定义处理函数" aria-label="Permalink to &quot;4.3 捕获信号（自定义处理函数）&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 信号处理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> sigint_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">Received SIGINT signal </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, sig);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Do you really want to exit? (y/n): &quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_140thh"> answer;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    scanf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%c</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">answer);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (answer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;y&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> answer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;Y&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 注册信号处理函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGINT, sigint_handler);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Program running... Press Ctrl+C to test.</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-信号集操作" tabindex="-1">5. 信号集操作 <a class="header-anchor" href="#_5-信号集操作" aria-label="Permalink to &quot;5. 信号集操作&quot;">​</a></h2><h3 id="_5-1-信号集数据类型" tabindex="-1">5.1 信号集数据类型 <a class="header-anchor" href="#_5-1-信号集数据类型" aria-label="Permalink to &quot;5.1 信号集数据类型&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 信号集操作函数</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sigset_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">set</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">      // 清空信号集</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> sigfillset</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sigset_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">set</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">       // 填充所有信号</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> sigaddset</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sigset_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">set</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> signo</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">    // 添加信号</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> sigdelset</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sigset_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">set</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> signo</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">    // 删除信号</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> sigismember</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sigset_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">set</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> signo</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd"> // 测试信号是否在集合中</span></span></code></pre></div><h3 id="_5-2-信号阻塞" tabindex="-1">5.2 信号阻塞 <a class="header-anchor" href="#_5-2-信号阻塞" aria-label="Permalink to &quot;5.2 信号阻塞&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    sigset_t</span><span class="__shiki_140thh"> newset, oldset;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化信号集</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">newset);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaddset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">newset, SIGINT);</span><span class="__shiki_21nrsd">  // 阻塞SIGINT</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置信号屏蔽字</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigprocmask</span><span class="__shiki_140thh">(SIG_BLOCK, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">newset, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">oldset);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SIGINT is blocked for 10 seconds. Try Ctrl+C...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 恢复原来的信号屏蔽字</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigprocmask</span><span class="__shiki_140thh">(SIG_SETMASK, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">oldset, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SIGINT unblocked. Now try Ctrl+C...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-高级信号处理" tabindex="-1">6. 高级信号处理 <a class="header-anchor" href="#_6-高级信号处理" aria-label="Permalink to &quot;6. 高级信号处理&quot;">​</a></h2><h3 id="_6-1-sigaction函数" tabindex="-1">6.1 sigaction函数 <a class="header-anchor" href="#_6-1-sigaction函数" aria-label="Permalink to &quot;6.1 sigaction函数&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> signal_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">siginfo_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received signal </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> from process </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">           sig, info-&gt;si_pid);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User ID: </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, info-&gt;si_uid);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sigaction sa;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_sigaction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> signal_handler;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask);</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SA_SIGINFO;</span><span class="__shiki_21nrsd">  // 使用sa_sigaction而不是sa_handler</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 注册信号处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaction</span><span class="__shiki_140thh">(SIGINT, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Process PID: </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Send SIGINT to test...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    pause</span><span class="__shiki_140thh">();</span><span class="__shiki_21nrsd">  // 等待信号</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-可靠的信号处理" tabindex="-1">6.2 可靠的信号处理 <a class="header-anchor" href="#_6-2-可靠的信号处理" aria-label="Permalink to &quot;6.2 可靠的信号处理&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">volatile</span><span class="__shiki_dzsirb"> sig_atomic_t</span><span class="__shiki_140thh"> signal_received </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    signal_received </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sig;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sigaction sa;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    memset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(sa));</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_handler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> handler;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask);</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SA_RESTART;</span><span class="__shiki_21nrsd">  // 系统调用被信号中断后自动重启</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaction</span><span class="__shiki_140thh">(SIGINT, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaction</span><span class="__shiki_140thh">(SIGTERM, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (signal_received) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received signal: </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, signal_received);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (signal_received </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> SIGTERM) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Graceful shutdown...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            signal_received </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Working...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-信号的发送" tabindex="-1">7. 信号的发送 <a class="header-anchor" href="#_7-信号的发送" aria-label="Permalink to &quot;7. 信号的发送&quot;">​</a></h2><h3 id="_7-1-kill函数" tabindex="-1">7.1 kill函数 <a class="header-anchor" href="#_7-1-kill函数" aria-label="Permalink to &quot;7.1 kill函数&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/types.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 向指定进程发送信号</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> kill</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">pid_t</span><span class="__shiki_1jdh33"> pid</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_7-2-raise函数" tabindex="-1">7.2 raise函数 <a class="header-anchor" href="#_7-2-raise函数" aria-label="Permalink to &quot;7.2 raise函数&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 向当前进程发送信号</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> raise</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_7-3-示例-进程间信号通信" tabindex="-1">7.3 示例：进程间信号通信 <a class="header-anchor" href="#_7-3-示例-进程间信号通信" aria-label="Permalink to &quot;7.3 示例：进程间信号通信&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// sender.c - 发送信号</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> argc</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">argv</span><span class="__shiki_1itgoe">[]</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (argc </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Usage: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> &lt;pid&gt; &lt;signal&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">argv</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    pid_t</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> atoi</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">argv</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sig </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> atoi</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">argv</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">(pid, sig) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;kill&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Signal </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> sent to process </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, sig, pid);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// receiver.c - 接收信号</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Process </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> received signal </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">(), sig);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Receiver PID: </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 注册多个信号的处理函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGUSR1, handler);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGUSR2, handler);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGTERM, handler);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        pause</span><span class="__shiki_140thh">();</span><span class="__shiki_21nrsd">  // 等待信号</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-特殊信号处理" tabindex="-1">8. 特殊信号处理 <a class="header-anchor" href="#_8-特殊信号处理" aria-label="Permalink to &quot;8. 特殊信号处理&quot;">​</a></h2><h3 id="_8-1-sigchld信号处理" tabindex="-1">8.1 SIGCHLD信号处理 <a class="header-anchor" href="#_8-1-sigchld信号处理" aria-label="Permalink to &quot;8.1 SIGCHLD信号处理&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/wait.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> sigchld_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> status;</span></span>
<span class="line"><span class="__shiki_1itgoe">    pid_t</span><span class="__shiki_140thh"> pid;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用WNOHANG避免阻塞</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> ((pid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> waitpid</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">status, WNOHANG)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">WIFEXITED</span><span class="__shiki_140thh">(status)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Child </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> exited with status </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                   pid, </span><span class="__shiki_1t8gfj">WEXITSTATUS</span><span class="__shiki_140thh">(status));</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">WIFSIGNALED</span><span class="__shiki_140thh">(status)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Child </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> killed by signal </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                   pid, </span><span class="__shiki_1t8gfj">WTERMSIG</span><span class="__shiki_140thh">(status));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sigaction sa;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_handler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sigchld_handler;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask);</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SA_RESTART </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> SA_NOCLDSTOP;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sigaction</span><span class="__shiki_140thh">(SIGCHLD, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;sigaction&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建子进程</span></span>
<span class="line"><span class="__shiki_1itgoe">    pid_t</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (pid </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 子进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Child process </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> started</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Child process </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> exiting</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 父进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Parent process </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">, child PID: </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">(), pid);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Parent waiting...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">  // 等待SIGCHLD信号</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Parent exiting</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-信号的高级应用" tabindex="-1">9. 信号的高级应用 <a class="header-anchor" href="#_9-信号的高级应用" aria-label="Permalink to &quot;9. 信号的高级应用&quot;">​</a></h2><h3 id="_9-1-信号驱动i-o" tabindex="-1">9.1 信号驱动I/O <a class="header-anchor" href="#_9-1-信号驱动i-o" aria-label="Permalink to &quot;9.1 信号驱动I/O&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;fcntl.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">volatile</span><span class="__shiki_dzsirb"> sig_atomic_t</span><span class="__shiki_140thh"> data_ready </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> io_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    data_ready </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sigaction sa;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> fd;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置信号处理</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_handler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> io_handler;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask);</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaction</span><span class="__shiki_140thh">(SIGIO, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 打开文件并设置异步I/O</span></span>
<span class="line"><span class="__shiki_140thh">    fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/dev/tty&quot;</span><span class="__shiki_140thh">, O_RDWR);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (fd </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;open&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置文件描述符的属主进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fcntl</span><span class="__shiki_140thh">(fd, F_SETOWN, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 启用异步I/O</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fcntl</span><span class="__shiki_140thh">(fd, F_SETFL, </span><span class="__shiki_1t8gfj">fcntl</span><span class="__shiki_140thh">(fd, F_GETFL) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> O_ASYNC);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Process </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> waiting for I/O events...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (data_ready) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;I/O event occurred!</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            data_ready </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理I/O</span></span>
<span class="line"><span class="__shiki_1itgoe">            char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">            ssize_t</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">(fd, buffer, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(buffer)</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (n </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">                buffer</span><span class="__shiki_140thh">[n] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">                printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Read: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1t8gfj">        usleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">  // 100ms</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(fd);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_10-信号的最佳实践和注意事项" tabindex="-1">10. 信号的最佳实践和注意事项 <a class="header-anchor" href="#_10-信号的最佳实践和注意事项" aria-label="Permalink to &quot;10. 信号的最佳实践和注意事项&quot;">​</a></h2><h3 id="_10-1-信号处理的安全规则" tabindex="-1">10.1 信号处理的安全规则 <a class="header-anchor" href="#_10-1-信号处理的安全规则" aria-label="Permalink to &quot;10.1 信号处理的安全规则&quot;">​</a></h3><ol><li><strong>保持处理函数简单</strong>：避免在信号处理函数中执行复杂操作</li><li><strong>使用异步安全函数</strong>：在信号处理函数中只能使用异步安全函数</li><li><strong>保存和恢复errno</strong>：保护全局变量不被破坏</li><li><strong>处理可重入问题</strong>：避免使用非可重入函数</li></ol><h3 id="_10-2-异步安全函数示例" tabindex="-1">10.2 异步安全函数示例 <a class="header-anchor" href="#_10-2-异步安全函数示例" aria-label="Permalink to &quot;10.2 异步安全函数示例&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 异步安全的信号处理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> safe_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 只使用异步安全函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">msg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Signal received</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    write</span><span class="__shiki_140thh">(STDOUT_FILENO, msg, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(msg));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以安全地设置volatile sig_atomic_t变量</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 但不能调用printf, malloc等不安全函数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-3-完整的信号处理框架" tabindex="-1">10.3 完整的信号处理框架 <a class="header-anchor" href="#_10-3-完整的信号处理框架" aria-label="Permalink to &quot;10.3 完整的信号处理框架&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;signal.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;errno.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">volatile</span><span class="__shiki_dzsirb"> sig_atomic_t</span><span class="__shiki_140thh"> shutdown_requested </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> signal_handler</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> saved_errno </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errno;</span><span class="__shiki_21nrsd">  // 保存errno</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(sig) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SIGINT:</span></span>
<span class="line"><span class="__shiki_1t8gfj">            write</span><span class="__shiki_140thh">(STDOUT_FILENO, </span><span class="__shiki_mdbnqw">&quot;SIGINT received</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            shutdown_requested </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SIGTERM:</span></span>
<span class="line"><span class="__shiki_1t8gfj">            write</span><span class="__shiki_140thh">(STDOUT_FILENO, </span><span class="__shiki_mdbnqw">&quot;SIGTERM received</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">17</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            shutdown_requested </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SIGUSR1:</span></span>
<span class="line"><span class="__shiki_1t8gfj">            write</span><span class="__shiki_140thh">(STDOUT_FILENO, </span><span class="__shiki_mdbnqw">&quot;SIGUSR1 received</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">17</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    errno </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> saved_errno;</span><span class="__shiki_21nrsd">  // 恢复errno</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> setup_signal_handlers</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sigaction sa;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_handler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> signal_handler;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigemptyset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask);</span></span>
<span class="line"><span class="__shiki_140thh">    sa.sa_flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阻塞其他信号 during signal handling</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaddset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask, SIGINT);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sigaddset</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa.sa_mask, SIGTERM);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sigaction</span><span class="__shiki_140thh">(SIGINT, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sigaction</span><span class="__shiki_140thh">(SIGTERM, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">sigaction</span><span class="__shiki_140thh">(SIGUSR1, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">sa, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 忽略某些信号</span></span>
<span class="line"><span class="__shiki_1t8gfj">    signal</span><span class="__shiki_140thh">(SIGPIPE, SIG_IGN);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">setup_signal_handlers</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;setup_signal_handlers&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Process </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> started. Send signals to test.</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getpid</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">shutdown_requested) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 主循环工作</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Working...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Graceful shutdown completed.</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>信号是Linux/Unix系统中重要的进程间通信机制，具有以下关键点：</p><ol><li><strong>异步通知</strong>：信号提供了一种异步事件通知机制</li><li><strong>简单通信</strong>：适合简单的通知，不适合复杂数据传递</li><li><strong>多种处理方式</strong>：默认、忽略、自定义处理</li><li><strong>可靠性改进</strong>：现代信号支持排队，解决了丢失问题</li><li><strong>安全性考虑</strong>：信号处理函数需要特别注意线程安全和可重入性</li></ol><p>掌握信号机制对于编写健壮的Linux/Unix应用程序至关重要。</p>`,61)])])}const g=a(p,[["render",h]]);export{o as __pageData,g as default};
