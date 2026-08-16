import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"限流策略与自适应限流学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/scaling/throttling/adaptive.md","filePath":"backend/scaling/throttling/adaptive.md"}'),p={name:"backend/scaling/throttling/adaptive.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="限流策略与自适应限流学习笔记" tabindex="-1">限流策略与自适应限流学习笔记 <a class="header-anchor" href="#限流策略与自适应限流学习笔记" aria-label="Permalink to &quot;限流策略与自适应限流学习笔记&quot;">​</a></h1><h2 id="_1-开发原则" tabindex="-1">1. 开发原则 <a class="header-anchor" href="#_1-开发原则" aria-label="Permalink to &quot;1. 开发原则&quot;">​</a></h2><h3 id="_1-1-系统稳定性原则" tabindex="-1">1.1 系统稳定性原则 <a class="header-anchor" href="#_1-1-系统稳定性原则" aria-label="Permalink to &quot;1.1 系统稳定性原则&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[系统稳定性] --&gt; B[容错性]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[可恢复性]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[可观测性]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[弹性设计]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[优雅降级]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[熔断机制]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[超时控制]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[快速失败]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[自动恢复]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[数据备份]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[监控指标]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[日志追踪]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[告警机制]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[资源隔离]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[限流保护]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E3[负载均衡]</span></span></code></pre></div><h3 id="_1-2-设计原则" tabindex="-1">1.2 设计原则 <a class="header-anchor" href="#_1-2-设计原则" aria-label="Permalink to &quot;1.2 设计原则&quot;">​</a></h3><ul><li><strong>单一职责原则</strong>：限流组件应专注于流量控制</li><li><strong>开闭原则</strong>：限流策略应支持扩展而不修改现有代码</li><li><strong>依赖倒置原则</strong>：依赖抽象接口而非具体实现</li><li><strong>接口隔离原则</strong>：定义清晰的限流接口</li></ul><h2 id="_2-基础限流策略" tabindex="-1">2. 基础限流策略 <a class="header-anchor" href="#_2-基础限流策略" aria-label="Permalink to &quot;2. 基础限流策略&quot;">​</a></h2><h3 id="_2-1-固定窗口限流" tabindex="-1">2.1 固定窗口限流 <a class="header-anchor" href="#_2-1-固定窗口限流" aria-label="Permalink to &quot;2.1 固定窗口限流&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> FixedWindowRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> limit;  </span><span class="__shiki_21nrsd">// 时间窗口内最大请求数</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> windowSize; </span><span class="__shiki_21nrsd">// 时间窗口大小(毫秒)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> currentWindowStart; </span><span class="__shiki_21nrsd">// 当前窗口开始时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> currentCount; </span><span class="__shiki_21nrsd">// 当前窗口请求计数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否进入新窗口</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> currentWindowStart </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> windowSize) {</span></span>
<span class="line"><span class="__shiki_140thh">            currentWindowStart </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now;</span></span>
<span class="line"><span class="__shiki_140thh">            currentCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否超过限制</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (currentCount </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> limit) {</span></span>
<span class="line"><span class="__shiki_140thh">            currentCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>问题</strong>：窗口临界点可能承受双倍流量冲击</p><h3 id="_2-2-滑动窗口限流" tabindex="-1">2.2 滑动窗口限流 <a class="header-anchor" href="#_2-2-滑动窗口限流" aria-label="Permalink to &quot;2.2 滑动窗口限流&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SlidingWindowRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> limit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> windowSize;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> LinkedList&lt;</span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; requestTimestamps;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> windowStart </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> windowSize;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 移除过期时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">requestTimestamps.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">               requestTimestamps.</span><span class="__shiki_1t8gfj">getFirst</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> windowStart) {</span></span>
<span class="line"><span class="__shiki_140thh">            requestTimestamps.</span><span class="__shiki_1t8gfj">removeFirst</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查当前窗口内请求数</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (requestTimestamps.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> limit) {</span></span>
<span class="line"><span class="__shiki_140thh">            requestTimestamps.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(now);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-漏桶算法" tabindex="-1">2.3 漏桶算法 <a class="header-anchor" href="#_2-3-漏桶算法" aria-label="Permalink to &quot;2.3 漏桶算法&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[请求流入] --&gt; B[漏桶]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{桶是否已满}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|是| D[拒绝请求]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|否| E[请求入桶]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[恒定速率流出]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[处理请求]</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> LeakyBucketRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> capacity; </span><span class="__shiki_21nrsd">// 桶容量</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> leakRate; </span><span class="__shiki_21nrsd">// 漏水速率 请求/毫秒</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> currentWater; </span><span class="__shiki_21nrsd">// 当前水量</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> lastLeakTime; </span><span class="__shiki_21nrsd">// 上次漏水时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算漏水量</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> timePassed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> lastLeakTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> leakAmount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timePassed </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> leakRate;</span></span>
<span class="line"><span class="__shiki_140thh">        currentWater </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, currentWater </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> leakAmount);</span></span>
<span class="line"><span class="__shiki_140thh">        lastLeakTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查桶容量</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (currentWater </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> capacity) {</span></span>
<span class="line"><span class="__shiki_140thh">            currentWater </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-令牌桶算法" tabindex="-1">2.4 令牌桶算法 <a class="header-anchor" href="#_2-4-令牌桶算法" aria-label="Permalink to &quot;2.4 令牌桶算法&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[令牌生成器] --&gt; B[定期生成令牌]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[令牌桶]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D{令牌是否充足}</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|是| E[获取令牌]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[允许请求]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|否| G[拒绝请求]</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> TokenBucketRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> capacity;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> refillRate; </span><span class="__shiki_21nrsd">// 令牌填充速率 令牌/毫秒</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> currentTokens;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> lastRefillTime;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> tokens</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 填充令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> tokensToAdd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> lastRefillTime) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> refillRate;</span></span>
<span class="line"><span class="__shiki_140thh">        currentTokens </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(capacity, currentTokens </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> tokensToAdd);</span></span>
<span class="line"><span class="__shiki_140thh">        lastRefillTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查令牌是否足够</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (currentTokens </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> tokens) {</span></span>
<span class="line"><span class="__shiki_140thh">            currentTokens </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> tokens;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-5-算法对比" tabindex="-1">2.5 算法对比 <a class="header-anchor" href="#_2-5-算法对比" aria-label="Permalink to &quot;2.5 算法对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>算法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>固定窗口</td><td>实现简单</td><td>临界问题</td><td>简单场景</td></tr><tr><td>滑动窗口</td><td>平滑限流</td><td>内存消耗</td><td>API限流</td></tr><tr><td>漏桶算法</td><td>输出恒定</td><td>无法应对突发</td><td>流量整形</td></tr><tr><td>令牌桶</td><td>允许突发</td><td>实现复杂</td><td>大部分场景</td></tr></tbody></table><h2 id="_3-自适应限流" tabindex="-1">3. 自适应限流 <a class="header-anchor" href="#_3-自适应限流" aria-label="Permalink to &quot;3. 自适应限流&quot;">​</a></h2><h3 id="_3-1-自适应限流架构" tabindex="-1">3.1 自适应限流架构 <a class="header-anchor" href="#_3-1-自适应限流架构" aria-label="Permalink to &quot;3.1 自适应限流架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[请求入口] --&gt; B[自适应限流器]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[系统指标采集]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[限流决策引擎]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[动态规则调整]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[限流执行器]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[请求处理]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; H[请求拒绝]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[CPU使用率]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[内存使用率]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[QPS指标]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C4[响应时间]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C5[错误率]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[机器学习模型]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[启发式规则]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[反馈控制]</span></span></code></pre></div><h3 id="_3-2-基于系统负载的自适应限流" tabindex="-1">3.2 基于系统负载的自适应限流 <a class="header-anchor" href="#_3-2-基于系统负载的自适应限流" aria-label="Permalink to &quot;3.2 基于系统负载的自适应限流&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AdaptiveRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 系统指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> cpuUsage;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> memoryUsage;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> qps;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> responseTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> errorRate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 限流参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> currentLimit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> minLimit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> maxLimit;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 指标权重</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> cpuWeight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> memoryWeight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> responseTimeWeight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> errorRateWeight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> AdaptiveRateLimiter</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> minLimit</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> maxLimit</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.minLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> minLimit;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.maxLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxLimit;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxLimit;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        startMetricsCollection</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        startAdaptiveAdjustment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于当前限流值判断</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> currentCounter </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> currentLimit;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> startMetricsCollection</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        ScheduledExecutorService scheduler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Executors.</span><span class="__shiki_1t8gfj">newScheduledThreadPool</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        scheduler.</span><span class="__shiki_1t8gfj">scheduleAtFixedRate</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">collectMetrics, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, TimeUnit.SECONDS);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> collectMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 采集系统指标</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.cpuUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getCpuUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.memoryUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getMemoryUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.qps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getQPS</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.responseTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getAverageResponseTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.errorRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> getErrorRate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> startAdaptiveAdjustment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        ScheduledExecutorService scheduler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Executors.</span><span class="__shiki_1t8gfj">newScheduledThreadPool</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        scheduler.</span><span class="__shiki_1t8gfj">scheduleAtFixedRate</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">adjustLimit, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, TimeUnit.SECONDS);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> adjustLimit</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> systemHealthScore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> calculateSystemHealth</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (systemHealthScore </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统健康，适当增加限流</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(maxLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.2</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (systemHealthScore </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.6</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统正常，保持当前限流</span></span>
<span class="line"><span class="__shiki_21nrsd">            // currentLimit 保持不变</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (systemHealthScore </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.4</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统压力较大，适当减少限流</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(minLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统过载，大幅减少限流</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(minLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SystemHealth: {}, Adjusted limit: {}&quot;</span><span class="__shiki_140thh">, systemHealthScore, currentLimit);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> calculateSystemHealth</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // CPU权重调整</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cpuUsage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> cpuWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (cpuUsage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.6</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> cpuWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 内存权重调整</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (memoryUsage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.9</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> memoryWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.9</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (memoryUsage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> memoryWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 响应时间权重调整</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> responseTimeWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 1秒以上</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> responseTimeWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.4</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 500ms以上</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 错误率权重调整</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (errorRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> errorRateWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 错误率10%以上</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (errorRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> errorRateWeight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.4</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 错误率5%以上</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, score);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-基于机器学习的自适应限流" tabindex="-1">3.3 基于机器学习的自适应限流 <a class="header-anchor" href="#_3-3-基于机器学习的自适应限流" aria-label="Permalink to &quot;3.3 基于机器学习的自适应限流&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> numpy </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> np</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sklearn.ensemble </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> RandomForestRegressor</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> collections </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> deque</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MLAdaptiveRateLimiter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, min_limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, max_limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.min_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> min_limit</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.max_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> max_limit</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.current_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> max_limit</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 机器学习模型</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.model </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> RandomForestRegressor(</span><span class="__shiki_1jdh33">n_estimators</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.is_model_trained </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 训练数据</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.features_history </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> deque(</span><span class="__shiki_1jdh33">maxlen</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.labels_history </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> deque(</span><span class="__shiki_1jdh33">maxlen</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 系统指标</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.metrics_window </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> deque(</span><span class="__shiki_1jdh33">maxlen</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 保存60个时间点的指标</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> collect_features</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;收集特征数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        features </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.get_cpu_usage(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.get_memory_usage(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.get_current_qps(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.get_average_response_time(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.get_error_rate(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.get_thread_pool_usage(),</span></span>
<span class="line"><span class="__shiki_140thh">            time.localtime().tm_hour,  </span><span class="__shiki_21nrsd"># 小时特征，考虑时间模式</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> np.array(features)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> should_adjust_limit</span><span class="__shiki_140thh">(self, predicted_metrics):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;基于预测指标判断是否需要调整限流&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        pred_cpu, pred_rt, pred_error </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> predicted_metrics</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基于预测结果制定调整策略</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> pred_cpu </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_140thh"> pred_rt </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_140thh"> pred_error </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">  # 需要降低限流</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> pred_cpu </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> pred_rt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> pred_error </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">   # 可以增加限流</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_21nrsd">   # 保持现状</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> adjust_limit_ml</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;基于机器学习模型调整限流&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.features_history) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 数据不足时使用启发式规则</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.adjust_limit_heuristic()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 准备训练数据</span></span>
<span class="line"><span class="__shiki_140thh">        X </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.array(</span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.features_history))</span></span>
<span class="line"><span class="__shiki_140thh">        y </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.array(</span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.labels_history))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 训练模型（在实际应用中应该增量训练）</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.model.fit(X, y)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.is_model_trained </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 预测未来状态</span></span>
<span class="line"><span class="__shiki_140thh">        current_features </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.collect_features().reshape(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        predicted_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.model.predict(current_features)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基于预测调整限流</span></span>
<span class="line"><span class="__shiki_140thh">        adjustment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.should_adjust_limit(predicted_metrics)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> adjustment </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.current_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.min_limit, </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_limit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> adjustment </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.current_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.max_limit, </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_limit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.2</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> record_decision_point</span><span class="__shiki_140thh">(self, features, actual_metrics):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录决策点用于后续训练&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.features_history.append(features)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.labels_history.append(actual_metrics)</span></span></code></pre></div><h3 id="_3-4-梯度限流算法" tabindex="-1">3.4 梯度限流算法 <a class="header-anchor" href="#_3-4-梯度限流算法" aria-label="Permalink to &quot;3.4 梯度限流算法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> GradientRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> currentLimit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> minLimit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> maxLimit;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 滑动窗口统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> WindowStats windowStats;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 梯度调整参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> increaseFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> decreaseFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> smoothingFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> GradientRateLimiter</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> minLimit</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> maxLimit</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> windowSize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.minLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> minLimit;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.maxLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxLimit;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxLimit;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.windowStats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> WindowStats</span><span class="__shiki_140thh">(windowSize);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        windowStats.</span><span class="__shiki_1t8gfj">recordRequest</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> windowStats.</span><span class="__shiki_1t8gfj">getCurrentCount</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> currentLimit;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> recordSuccess</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">long</span><span class="__shiki_1jdh33"> responseTime</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        windowStats.</span><span class="__shiki_1t8gfj">recordSuccess</span><span class="__shiki_140thh">(responseTime);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        adjustLimitIfNeeded</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> recordFailure</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        windowStats.</span><span class="__shiki_1t8gfj">recordFailure</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        adjustLimitIfNeeded</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> adjustLimitIfNeeded</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">windowStats.</span><span class="__shiki_1t8gfj">isWindowFull</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> rejectionRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> windowStats.</span><span class="__shiki_1t8gfj">getRejectionRate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> avgResponseTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> windowStats.</span><span class="__shiki_1t8gfj">getAverageResponseTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> successRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> windowStats.</span><span class="__shiki_1t8gfj">getSuccessRate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 多维度评估函数</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> calculateHealthScore</span><span class="__shiki_140thh">(rejectionRate, avgResponseTime, successRate);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统健康，激进增加</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(maxLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> increaseFactor));</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.6</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统正常，保守增加</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(maxLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.05</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.4</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统压力，保守减少</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(minLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.9</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统过载，激进减少</span></span>
<span class="line"><span class="__shiki_140thh">            currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(minLimit, (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)(currentLimit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> decreaseFactor));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 平滑调整</span></span>
<span class="line"><span class="__shiki_140thh">        currentLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">) (smoothingFactor </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> currentLimit </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                             (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> smoothingFactor) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> windowStats.</span><span class="__shiki_1t8gfj">getIdealLimit</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        windowStats.</span><span class="__shiki_1t8gfj">resetWindow</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> calculateHealthScore</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> rejectionRate</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> responseTime</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> successRate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 拒绝率权重</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (rejectionRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 0.4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (rejectionRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 响应时间权重</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 0.15</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 成功率权重</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (successRate </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.9</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (successRate </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.95</span><span class="__shiki_140thh">) score </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 0.15</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, score);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> WindowStats</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> windowSize;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> currentCount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> successCount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> failureCount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> totalResponseTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Queue&lt;</span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; responseTimes;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计方法实现...</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> getRejectionRate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">double</span><span class="__shiki_140thh">) failureCount </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (currentCount </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> failureCount);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> getSuccessRate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">double</span><span class="__shiki_140thh">) successCount </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (successCount </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> failureCount);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> getAverageResponseTime</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> successCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">double</span><span class="__shiki_140thh">) totalResponseTime </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> successCount </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-实践建议与最佳实践" tabindex="-1">4. 实践建议与最佳实践 <a class="header-anchor" href="#_4-实践建议与最佳实践" aria-label="Permalink to &quot;4. 实践建议与最佳实践&quot;">​</a></h2><h3 id="_4-1-限流策略选择矩阵" tabindex="-1">4.1 限流策略选择矩阵 <a class="header-anchor" href="#_4-1-限流策略选择矩阵" aria-label="Permalink to &quot;4.1 限流策略选择矩阵&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[业务场景分析] --&gt; B{流量模式}</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|突发流量| C[令牌桶算法]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|平稳流量| D[漏桶算法]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|API限流| E[滑动窗口]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F{系统复杂度}</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|简单系统| G[固定窗口]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|复杂系统| H[自适应限流]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; I{资源约束}</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|内存敏感| J[计数器方式]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|CPU敏感| K[简单算法]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; L[电商秒杀]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; M[消息队列]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; N[API网关]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; O[简单应用]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; P[微服务架构]</span></span></code></pre></div><h3 id="_4-2-部署架构建议" tabindex="-1">4.2 部署架构建议 <a class="header-anchor" href="#_4-2-部署架构建议" aria-label="Permalink to &quot;4.2 部署架构建议&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限流配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">rate_limit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;adaptive&quot;</span><span class="__shiki_21nrsd">  # 自适应策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  algorithms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;token_bucket&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;sliding_window&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  adaptive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;cpu_usage&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;memory_usage&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;response_time&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;error_rate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;qps&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    adjustment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      min_limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_17hn0y">      sensitivity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  fallback</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;fixed_window&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    default_limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span></code></pre></div><h3 id="_4-3-监控与告警" tabindex="-1">4.3 监控与告警 <a class="header-anchor" href="#_4-3-监控与告警" aria-label="Permalink to &quot;4.3 监控与告警&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Slf4j</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RateLimitMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> MetricsCollector metricsCollector;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EventListener</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleRateLimitEvent</span><span class="__shiki_140thh">(RateLimitEvent </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录限流事件</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Rate limit triggered: {}&quot;</span><span class="__shiki_140thh">, event);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 上报监控指标</span></span>
<span class="line"><span class="__shiki_140thh">        metricsCollector.</span><span class="__shiki_1t8gfj">recordRateLimitEvent</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            event.</span><span class="__shiki_1t8gfj">getResource</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            event.</span><span class="__shiki_1t8gfj">getLimitType</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            event.</span><span class="__shiki_1t8gfj">getCurrentLimit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 触发告警检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">        checkAndAlert</span><span class="__shiki_140thh">(event);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> checkAndAlert</span><span class="__shiki_140thh">(RateLimitEvent </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于阈值触发告警</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (event.</span><span class="__shiki_1t8gfj">getRejectionRate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            alertService.</span><span class="__shiki_1t8gfj">sendAlert</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;HIGH_REJECTION_RATE&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                String.</span><span class="__shiki_1t8gfj">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Resource %s has high rejection rate: %.2f&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                    event.</span><span class="__shiki_1t8gfj">getResource</span><span class="__shiki_140thh">(), event.</span><span class="__shiki_1t8gfj">getRejectionRate</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-总结" tabindex="-1">5. 总结 <a class="header-anchor" href="#_5-总结" aria-label="Permalink to &quot;5. 总结&quot;">​</a></h2><h3 id="_5-1-关键要点" tabindex="-1">5.1 关键要点 <a class="header-anchor" href="#_5-1-关键要点" aria-label="Permalink to &quot;5.1 关键要点&quot;">​</a></h3><ol><li><strong>分层限流</strong>：结合全局限流和局部限流</li><li><strong>动态调整</strong>：基于系统状态自动调整限流阈值</li><li><strong>多维度评估</strong>：结合CPU、内存、响应时间等多指标</li><li><strong>优雅降级</strong>：限流时提供有意义的响应</li><li><strong>监控观测</strong>：完善的监控和告警体系</li></ol><h3 id="_5-2-演进路径" tabindex="-1">5.2 演进路径 <a class="header-anchor" href="#_5-2-演进路径" aria-label="Permalink to &quot;5.2 演进路径&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[基础限流] --&gt; B[多层限流]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[自适应限流]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[智能限流]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; A1[固定窗口]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; A2[令牌桶]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[网关限流]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[服务限流]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[资源限流]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[基于指标]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[基于预测]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[机器学习]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[A/B测试]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[自动调参]</span></span></code></pre></div><p>这份学习笔记涵盖了从基础限流算法到先进的自适应限流策略的完整知识体系，包括实现代码、架构设计和最佳实践。</p>`,42)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
