import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"分布式限流策略学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/scaling/throttling/distributed.md","filePath":"backend/scaling/throttling/distributed.md"}'),p={name:"backend/scaling/throttling/distributed.md"};function l(h,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="分布式限流策略学习笔记" tabindex="-1">分布式限流策略学习笔记 <a class="header-anchor" href="#分布式限流策略学习笔记" aria-label="Permalink to &quot;分布式限流策略学习笔记&quot;">​</a></h1><h2 id="_1-开发原则与分布式限流概述" tabindex="-1">1. 开发原则与分布式限流概述 <a class="header-anchor" href="#_1-开发原则与分布式限流概述" aria-label="Permalink to &quot;1. 开发原则与分布式限流概述&quot;">​</a></h2><h3 id="_1-1-分布式系统限流挑战" tabindex="-1">1.1 分布式系统限流挑战 <a class="header-anchor" href="#_1-1-分布式系统限流挑战" aria-label="Permalink to &quot;1.1 分布式系统限流挑战&quot;">​</a></h3><ul><li><strong>全局视角</strong>：需要跨多个节点协调流量控制</li><li><strong>一致性要求</strong>：确保所有节点遵循相同的限流规则</li><li><strong>网络延迟</strong>：中心化存储引入的网络开销</li><li><strong>容错性</strong>：限流组件故障不应影响核心业务</li><li><strong>扩展性</strong>：支持集群水平扩展</li></ul><h3 id="_1-2-分布式限流核心原则" tabindex="-1">1.2 分布式限流核心原则 <a class="header-anchor" href="#_1-2-分布式限流核心原则" aria-label="Permalink to &quot;1.2 分布式限流核心原则&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[一致性] --&gt; A1[所有节点统一计数]</span></span>
<span class="line"><span class="__shiki_140thh">    B[可用性] --&gt; B1[限流服务高可用]</span></span>
<span class="line"><span class="__shiki_140thh">    C[性能] --&gt; C1[低延迟高吞吐]</span></span>
<span class="line"><span class="__shiki_140thh">    D[容错] --&gt; D1[降级策略]</span></span>
<span class="line"><span class="__shiki_140thh">    E[扩展] --&gt; E1[水平扩展能力]</span></span></code></pre></div><h2 id="_2-分布式限流架构模式" tabindex="-1">2. 分布式限流架构模式 <a class="header-anchor" href="#_2-分布式限流架构模式" aria-label="Permalink to &quot;2. 分布式限流架构模式&quot;">​</a></h2><h3 id="_2-1-中心化架构" tabindex="-1">2.1 中心化架构 <a class="header-anchor" href="#_2-1-中心化架构" aria-label="Permalink to &quot;2.1 中心化架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[客户端1] --&gt; D[Redis集群]</span></span>
<span class="line"><span class="__shiki_140thh">    B[客户端2] --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    C[客户端N] --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[限流决策]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[通过/拒绝]</span></span></code></pre></div><h3 id="_2-2-去中心化架构" tabindex="-1">2.2 去中心化架构 <a class="header-anchor" href="#_2-2-去中心化架构" aria-label="Permalink to &quot;2.2 去中心化架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[客户端1] --&gt; A1[本地限流器]</span></span>
<span class="line"><span class="__shiki_140thh">    B[客户端2] --&gt; B1[本地限流器]</span></span>
<span class="line"><span class="__shiki_140thh">    C[客户端N] --&gt; C1[本地限流器]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A1 --&gt; D[协调层]</span></span>
<span class="line"><span class="__shiki_140thh">    B1 --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    C1 --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[全局配额分配]</span></span></code></pre></div><h3 id="_2-3-网关层限流" tabindex="-1">2.3 网关层限流 <a class="header-anchor" href="#_2-3-网关层限流" aria-label="Permalink to &quot;2.3 网关层限流&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[用户请求] --&gt; B[API网关]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[限流模块]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D{限流检查}</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|通过| E[后端服务]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|拒绝| F[返回429]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; G[Redis集群]</span></span>
<span class="line"><span class="__shiki_140thh">    H[配置中心] --&gt; C</span></span></code></pre></div><h2 id="_3-分布式限流算法实现" tabindex="-1">3. 分布式限流算法实现 <a class="header-anchor" href="#_3-分布式限流算法实现" aria-label="Permalink to &quot;3. 分布式限流算法实现&quot;">​</a></h2><h3 id="_3-1-分布式令牌桶算法" tabindex="-1">3.1 分布式令牌桶算法 <a class="header-anchor" href="#_3-1-分布式令牌桶算法" aria-label="Permalink to &quot;3.1 分布式令牌桶算法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DistributedTokenBucket</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String key;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> capacity;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> refillRate; </span><span class="__shiki_21nrsd">// 令牌/秒</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> tokens</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String luaScript </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local key = KEYS[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local tokensRequested = tonumber(ARGV[1])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local capacity = tonumber(ARGV[2])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local refillRate = tonumber(ARGV[3])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local now = tonumber(ARGV[4])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local bucket = redis.call(&#39;hmget&#39;, key, &#39;tokens&#39;, &#39;lastRefill&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local currentTokens = capacity</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local lastRefill = now</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if bucket[1] and bucket[2] then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                currentTokens = tonumber(bucket[1])</span></span>
<span class="line"><span class="__shiki_mdbnqw">                lastRefill = tonumber(bucket[2])</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 计算时间差并补充令牌</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local timePassed = math.max(0, now - lastRefill)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local tokensToAdd = math.floor(timePassed * refillRate / 1000)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                currentTokens = math.min(capacity, currentTokens + tokensToAdd)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if currentTokens &gt;= tokensRequested then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                currentTokens = currentTokens - tokensRequested</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;hmset&#39;, key, &#39;tokens&#39;, currentTokens, &#39;lastRefill&#39;, now)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;expire&#39;, key, math.ceil(capacity / refillRate) * 2)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;hmset&#39;, key, &#39;tokens&#39;, currentTokens, &#39;lastRefill&#39;, lastRefill)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;expire&#39;, key, math.ceil(capacity / refillRate) * 2)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Collections.</span><span class="__shiki_1t8gfj">singletonList</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(tokens),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(capacity),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(refillRate),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Long result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_140thh"> DefaultRedisScript&lt;&gt;(luaScript, Long.class),</span></span>
<span class="line"><span class="__shiki_140thh">            keys,</span></span>
<span class="line"><span class="__shiki_140thh">            args.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> String</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-分布式滑动窗口算法" tabindex="-1">3.2 分布式滑动窗口算法 <a class="header-anchor" href="#_3-2-分布式滑动窗口算法" aria-label="Permalink to &quot;3.2 分布式滑动窗口算法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DistributedSlidingWindow</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String keyPrefix;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> windowSizeInMs;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> maxRequests;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">identifier</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> windowStart </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> windowSizeInMs;</span></span>
<span class="line"><span class="__shiki_140thh">        String key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> keyPrefix </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> identifier;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        String luaScript </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local key = KEYS[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local now = tonumber(ARGV[1])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local windowStart = tonumber(ARGV[2])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local maxRequests = tonumber(ARGV[3])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local windowSize = tonumber(ARGV[4])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 移除过期时间窗口外的记录</span></span>
<span class="line"><span class="__shiki_mdbnqw">            redis.call(&#39;zremrangebyscore&#39;, key, 0, windowStart)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 获取当前窗口内请求数量</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local currentRequests = redis.call(&#39;zcard&#39;, key)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if currentRequests &lt; maxRequests then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 添加当前请求</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;zadd&#39;, key, now, now)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;expire&#39;, key, windowSize * 2 / 1000)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Collections.</span><span class="__shiki_1t8gfj">singletonList</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(now),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(windowStart),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(maxRequests),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(windowSizeInMs)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Long result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_140thh"> DefaultRedisScript&lt;&gt;(luaScript, Long.class),</span></span>
<span class="line"><span class="__shiki_140thh">            keys,</span></span>
<span class="line"><span class="__shiki_140thh">            args.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> String</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-基于时间分片的分布式计数器" tabindex="-1">3.3 基于时间分片的分布式计数器 <a class="header-anchor" href="#_3-3-基于时间分片的分布式计数器" aria-label="Permalink to &quot;3.3 基于时间分片的分布式计数器&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DistributedTimeSliceCounter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String keyPrefix;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> timeSliceInMs;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> maxRequestsPerSlice;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">identifier</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> currentTimeSlice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> timeSliceInMs;</span></span>
<span class="line"><span class="__shiki_140thh">        String key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> keyPrefix </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> identifier </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> currentTimeSlice;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        String luaScript </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local key = KEYS[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local maxRequests = tonumber(ARGV[1])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local expireTime = tonumber(ARGV[2])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local current = redis.call(&#39;get&#39;, key)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local count = 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if current then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                count = tonumber(current)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if count &lt; maxRequests then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;incr&#39;, key)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                if count == 0 then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    redis.call(&#39;expire&#39;, key, expireTime)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Collections.</span><span class="__shiki_1t8gfj">singletonList</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(maxRequestsPerSlice),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(timeSliceInMs </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 过期时间为时间片的两倍</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Long result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_140thh"> DefaultRedisScript&lt;&gt;(luaScript, Long.class),</span></span>
<span class="line"><span class="__shiki_140thh">            keys,</span></span>
<span class="line"><span class="__shiki_140thh">            args.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> String</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-分布式限流架构实现" tabindex="-1">4. 分布式限流架构实现 <a class="header-anchor" href="#_4-分布式限流架构实现" aria-label="Permalink to &quot;4. 分布式限流架构实现&quot;">​</a></h2><h3 id="_4-1-基于网关的分布式限流" tabindex="-1">4.1 基于网关的分布式限流 <a class="header-anchor" href="#_4-1-基于网关的分布式限流" aria-label="Permalink to &quot;4.1 基于网关的分布式限流&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Spring Cloud Gateway 限流配置</span></span>
<span class="line"><span class="__shiki_17hn0y">spring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cloud</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    gateway</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      routes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          uri</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lb://user-service</span></span>
<span class="line"><span class="__shiki_17hn0y">          predicates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">Path=/api/users/**</span></span>
<span class="line"><span class="__shiki_17hn0y">          filters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RequestRateLimiter</span></span>
<span class="line"><span class="__shiki_17hn0y">              args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                redis-rate-limiter.replenishRate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">                redis-rate-limiter.burstCapacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_17hn0y">                redis-rate-limiter.requestedTokens</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">                key-resolver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;#{@userKeyResolver}&quot;</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RateLimitConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> KeyResolver </span><span class="__shiki_1t8gfj">userKeyResolver</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> exchange </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 根据用户ID限流</span></span>
<span class="line"><span class="__shiki_140thh">            String userId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> exchange.</span><span class="__shiki_1t8gfj">getRequest</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getHeaders</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getFirst</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;X-User-Id&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> Mono.</span><span class="__shiki_1t8gfj">just</span><span class="__shiki_140thh">(Optional.</span><span class="__shiki_1t8gfj">ofNullable</span><span class="__shiki_140thh">(userId).</span><span class="__shiki_1t8gfj">orElse</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;anonymous&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> KeyResolver </span><span class="__shiki_1t8gfj">ipKeyResolver</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> exchange </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 根据IP限流</span></span>
<span class="line"><span class="__shiki_140thh">            String ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> exchange.</span><span class="__shiki_1t8gfj">getRequest</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getRemoteAddress</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getAddress</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getHostAddress</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> Mono.</span><span class="__shiki_1t8gfj">just</span><span class="__shiki_140thh">(ip);</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-客户端限流库实现" tabindex="-1">4.2 客户端限流库实现 <a class="header-anchor" href="#_4-2-客户端限流库实现" aria-label="Permalink to &quot;4.2 客户端限流库实现&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DistributedRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisConnectionFactory redisConnectionFactory;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">RateLimitConfig</span><span class="__shiki_140thh">&gt; configs;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> allowRequest</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">limitKey</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">configName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        RateLimitConfig config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> configs.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(configName);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (config </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> (RedisConnection conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisConnectionFactory.</span><span class="__shiki_1t8gfj">getConnection</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            byte</span><span class="__shiki_140thh">[] key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (configName </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> limitKey).</span><span class="__shiki_1t8gfj">getBytes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 使用Redis事务确保原子性</span></span>
<span class="line"><span class="__shiki_140thh">            conn.</span><span class="__shiki_1t8gfj">multi</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 移除过期记录</span></span>
<span class="line"><span class="__shiki_140thh">            conn.</span><span class="__shiki_1t8gfj">zRemRangeByScore</span><span class="__shiki_140thh">(key, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> config.</span><span class="__shiki_1t8gfj">getTimeWindow</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 获取当前请求数</span></span>
<span class="line"><span class="__shiki_140thh">            Long count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">zCard</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> config.</span><span class="__shiki_1t8gfj">getMaxRequests</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 添加当前请求</span></span>
<span class="line"><span class="__shiki_140thh">                conn.</span><span class="__shiki_1t8gfj">zAdd</span><span class="__shiki_140thh">(key, System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">                         String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">getBytes</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">                conn.</span><span class="__shiki_1t8gfj">expire</span><span class="__shiki_140thh">(key, config.</span><span class="__shiki_1t8gfj">getTimeWindow</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                conn.</span><span class="__shiki_1t8gfj">exec</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                conn.</span><span class="__shiki_1t8gfj">discard</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Data</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RateLimitConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> maxRequests;</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> timeWindow; </span><span class="__shiki_21nrsd">// 毫秒</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-高级分布式限流特性" tabindex="-1">5. 高级分布式限流特性 <a class="header-anchor" href="#_5-高级分布式限流特性" aria-label="Permalink to &quot;5. 高级分布式限流特性&quot;">​</a></h2><h3 id="_5-1-多维度限流" tabindex="-1">5.1 多维度限流 <a class="header-anchor" href="#_5-1-多维度限流" aria-label="Permalink to &quot;5.1 多维度限流&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> MultiDimensionRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(MultiDimensionKey </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户级别限流</span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> userAllowed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> tryUserLimit</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getUserId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_21nrsd">        // IP级别限流  </span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> ipAllowed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> tryIpLimit</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getIp</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_21nrsd">        // API级别限流</span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> apiAllowed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> tryApiLimit</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getApiPath</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> userAllowed </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> ipAllowed </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> apiAllowed;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquireWithPriority</span><span class="__shiki_140thh">(MultiDimensionKey </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 按优先级检查，高优先级通过后可跳过部分检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">trySystemWideLimit</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">tryUserLimit</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getUserId</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // VIP用户跳过IP限制</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">isVipUser</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getUserId</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">tryIpLimit</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getIp</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> tryApiLimit</span><span class="__shiki_140thh">(key.</span><span class="__shiki_1t8gfj">getApiPath</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-自适应限流" tabindex="-1">5.2 自适应限流 <a class="header-anchor" href="#_5-2-自适应限流" aria-label="Permalink to &quot;5.2 自适应限流&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AdaptiveRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> HealthChecker healthChecker;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">service</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">endpoint</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取系统健康状态</span></span>
<span class="line"><span class="__shiki_140thh">        SystemHealth health </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> healthChecker.</span><span class="__shiki_1t8gfj">getSystemHealth</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据健康状态调整限流阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> adjustmentFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> calculateAdjustmentFactor</span><span class="__shiki_140thh">(health);</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> adjustedLimit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">long</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">getBaseLimit</span><span class="__shiki_140thh">(endpoint) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> adjustmentFactor);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> tryAcquireWithLimit</span><span class="__shiki_140thh">(service, endpoint, adjustedLimit);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> calculateAdjustmentFactor</span><span class="__shiki_140thh">(SystemHealth </span><span class="__shiki_1jdh33">health</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (health.</span><span class="__shiki_1t8gfj">getCpuUsage</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> health.</span><span class="__shiki_1t8gfj">getMemoryUsage</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 系统负载高，降低限流阈值</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (health.</span><span class="__shiki_1t8gfj">getErrorRate</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 错误率高，适度降低阈值</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 正常状态</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-分布式漏桶算法" tabindex="-1">5.3 分布式漏桶算法 <a class="header-anchor" href="#_5-3-分布式漏桶算法" aria-label="Permalink to &quot;5.3 分布式漏桶算法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DistributedLeakyBucket</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> capacity</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> leakRate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String luaScript </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local key = KEYS[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local capacity = tonumber(ARGV[1])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local leakRate = tonumber(ARGV[2])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local now = tonumber(ARGV[3])</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            local bucket = redis.call(&#39;hmget&#39;, key, &#39;water&#39;, &#39;lastLeak&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local currentWater = 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local lastLeak = now</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            if bucket[1] and bucket[2] then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                currentWater = tonumber(bucket[1])</span></span>
<span class="line"><span class="__shiki_mdbnqw">                lastLeak = tonumber(bucket[2])</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 计算漏出的水量</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local timePassed = math.max(0, now - lastLeak)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local leakedWater = timePassed * leakRate / 1000</span></span>
<span class="line"><span class="__shiki_mdbnqw">                currentWater = math.max(0, currentWater - leakedWater)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- 尝试加水</span></span>
<span class="line"><span class="__shiki_mdbnqw">            if currentWater + 1 &lt;= capacity then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                currentWater = currentWater + 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;hmset&#39;, key, &#39;water&#39;, currentWater, &#39;lastLeak&#39;, now)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;expire&#39;, key, math.ceil(capacity / leakRate) * 2)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;hmset&#39;, key, &#39;water&#39;, currentWater, &#39;lastLeak&#39;, lastLeak)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                redis.call(&#39;expire&#39;, key, math.ceil(capacity / leakRate) * 2)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                return 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Collections.</span><span class="__shiki_1t8gfj">singletonList</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(capacity),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(leakRate),</span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Long result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_140thh"> DefaultRedisScript&lt;&gt;(luaScript, Long.class),</span></span>
<span class="line"><span class="__shiki_140thh">            keys,</span></span>
<span class="line"><span class="__shiki_140thh">            args.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> String</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-生产环境最佳实践" tabindex="-1">6. 生产环境最佳实践 <a class="header-anchor" href="#_6-生产环境最佳实践" aria-label="Permalink to &quot;6. 生产环境最佳实践&quot;">​</a></h2><h3 id="_6-1-配置管理" tabindex="-1">6.1 配置管理 <a class="header-anchor" href="#_6-1-配置管理" aria-label="Permalink to &quot;6.1 配置管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限流规则配置</span></span>
<span class="line"><span class="__shiki_17hn0y">rate-limit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user-login&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user:#{userId}:login&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;SLIDING_WINDOW&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">      window</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60000</span></span>
<span class="line"><span class="__shiki_17hn0y">      dimensions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;USER&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ENDPOINT&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;api-global&quot;</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;api:#{apiPath}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;TOKEN_BUCKET&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      capacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">      refill-rate</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      dimensions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;API&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;GLOBAL&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ip-limit&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ip:#{clientIp}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;FIXED_WINDOW&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_17hn0y">      limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">      window</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3600000</span></span>
<span class="line"><span class="__shiki_17hn0y">      dimensions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;IP&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_6-2-监控与告警" tabindex="-1">6.2 监控与告警 <a class="header-anchor" href="#_6-2-监控与告警" aria-label="Permalink to &quot;6.2 监控与告警&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RateLimitMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> MeterRegistry meterRegistry;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Counter</span><span class="__shiki_140thh">&gt; limitCounters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EventListener</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleRateLimitEvent</span><span class="__shiki_140thh">(RateLimitEvent </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String counterKey </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">getLimitKey</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">getResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        Counter counter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> limitCounters.</span><span class="__shiki_1t8gfj">computeIfAbsent</span><span class="__shiki_140thh">(counterKey, </span></span>
<span class="line"><span class="__shiki_140thh">            k </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> meterRegistry.</span><span class="__shiki_1t8gfj">counter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;rate_limit_requests&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;key&quot;</span><span class="__shiki_140thh">, event.</span><span class="__shiki_1t8gfj">getLimitKey</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;result&quot;</span><span class="__shiki_140thh">, event.</span><span class="__shiki_1t8gfj">getResult</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toLowerCase</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        counter.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 触发告警</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (event.</span><span class="__shiki_1t8gfj">getResult</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> RateLimitResult.BLOCKED </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            event.</span><span class="__shiki_1t8gfj">getBlockedCount</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            alertService.</span><span class="__shiki_1t8gfj">sendAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;高频限流告警&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;限流key: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">getLimitKey</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; 被拦截次数: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">getBlockedCount</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-降级策略" tabindex="-1">6.3 降级策略 <a class="header-anchor" href="#_6-3-降级策略" aria-label="Permalink to &quot;6.3 降级策略&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RateLimitFallback</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Object </span><span class="__shiki_1t8gfj">handleFallback</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">service</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">method</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[] </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                               RateLimitException </span><span class="__shiki_1jdh33">ex</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 返回默认值</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (method.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;get&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> method.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;query&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> getDefaultValue</span><span class="__shiki_140thh">(method);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 排队等待</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (ex.</span><span class="__shiki_1t8gfj">getWaitTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 等待时间小于5秒</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(ex.</span><span class="__shiki_1t8gfj">getWaitTime</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1t8gfj"> retryRequest</span><span class="__shiki_140thh">(service, method, args);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">ie</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 返回友好错误信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ResponseEntity.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">429</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">body</span><span class="__shiki_140thh">(Map.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;code&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;RATE_LIMITED&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;message&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;请求过于频繁，请稍后重试&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;retryAfter&quot;</span><span class="__shiki_140thh">, ex.</span><span class="__shiki_1t8gfj">getWaitTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">            ));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-性能优化策略" tabindex="-1">7. 性能优化策略 <a class="header-anchor" href="#_7-性能优化策略" aria-label="Permalink to &quot;7. 性能优化策略&quot;">​</a></h2><h3 id="_7-1-redis优化" tabindex="-1">7.1 Redis优化 <a class="header-anchor" href="#_7-1-redis优化" aria-label="Permalink to &quot;7.1 Redis优化&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RedisOptimizationConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">redisTemplate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; template </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> RedisTemplate&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setConnectionFactory</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">redisConnectionFactory</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用更快的序列化方式</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setKeySerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> StringRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setValueSerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> GenericJackson2JsonRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setHashKeySerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> StringRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setHashValueSerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> GenericJackson2JsonRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> template;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> RedisScript&lt;</span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">rateLimitScript</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 预加载Lua脚本，避免每次传输</span></span>
<span class="line"><span class="__shiki_140thh">        Resource scriptSource </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ClassPathResource</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;META-INF/scripts/rate_limit.lua&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> RedisScript.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(scriptSource, Long.class);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-本地缓存-分布式校验" tabindex="-1">7.2 本地缓存+分布式校验 <a class="header-anchor" href="#_7-2-本地缓存-分布式校验" aria-label="Permalink to &quot;7.2 本地缓存+分布式校验&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> HybridRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Cache&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">RateLimitState</span><span class="__shiki_140thh">&gt; localCache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> DistributedRateLimiter distributedLimiter;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryAcquire</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        RateLimitState state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> localCache.</span><span class="__shiki_1t8gfj">getIfPresent</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (state </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> state.</span><span class="__shiki_1t8gfj">isAllowed</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 本地检查通过</span></span>
<span class="line"><span class="__shiki_140thh">            state.</span><span class="__shiki_1t8gfj">recordRequest</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 本地检查不通过或状态不存在，进行分布式检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> allowed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> distributedLimiter.</span><span class="__shiki_1t8gfj">tryAcquire</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (allowed) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新本地状态</span></span>
<span class="line"><span class="__shiki_140thh">            localCache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(key, </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> RateLimitState</span><span class="__shiki_140thh">(allowed, System.</span><span class="__shiki_1t8gfj">currentTimeMillis</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> allowed;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-架构对比总结" tabindex="-1">8. 架构对比总结 <a class="header-anchor" href="#_8-架构对比总结" aria-label="Permalink to &quot;8. 架构对比总结&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">chart</span></span>
<span class="line"><span class="__shiki_140thh">    title 分布式限流架构对比</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;网关层限流&quot; : 35</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;客户端限流&quot; : 25</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;中间件限流&quot; : 40</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section 性能开销</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;网关层限流&quot; : 3</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;客户端限流&quot; : 4</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;中间件限流&quot; : 3</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section 实现复杂度</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;网关层限流&quot; : 2</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;客户端限流&quot; : 3</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;中间件限流&quot; : 4</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section 灵活性</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;网关层限流&quot; : 3</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;客户端限流&quot; : 5</span></span>
<span class="line"><span class="__shiki_140thh">    &quot;中间件限流&quot; : 4</span></span></code></pre></div><h2 id="_9-总结" tabindex="-1">9. 总结 <a class="header-anchor" href="#_9-总结" aria-label="Permalink to &quot;9. 总结&quot;">​</a></h2><p>分布式限流是微服务架构中保证系统稳定性的关键技术。通过合理的架构设计和算法选择，可以有效防止系统过载，保证服务质量。</p><p><strong>关键成功因素</strong>：</p><ul><li>选择合适的限流算法和架构模式</li><li>确保限流操作原子性和一致性</li><li>建立完善的监控和告警机制</li><li>设计优雅的降级和容错策略</li><li>持续优化性能和资源使用</li></ul><p><strong>推荐实践</strong>：</p><ul><li>从简单方案开始，逐步优化</li><li>在生产环境充分测试限流策略</li><li>建立限流配置的动态调整机制</li><li>结合业务特点设计多维度限流规则</li></ul>`,53)])])}const g=a(p,[["render",l]]);export{r as __pageData,g as default};
