import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"NoSQL数据库 - 键值存储Redis：Streams与消息队列深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/keyvalue/redis/streams.md","filePath":"data/database/nosql/keyvalue/redis/streams.md"}'),p={name:"data/database/nosql/keyvalue/redis/streams.md"};function l(h,s,e,c,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="nosql数据库-键值存储redis-streams与消息队列深度解析" tabindex="-1">NoSQL数据库 - 键值存储Redis：Streams与消息队列深度解析 <a class="header-anchor" href="#nosql数据库-键值存储redis-streams与消息队列深度解析" aria-label="Permalink to &quot;NoSQL数据库 - 键值存储Redis：Streams与消息队列深度解析&quot;">​</a></h1><h2 id="一、消息队列基础与redis演进" tabindex="-1">一、消息队列基础与Redis演进 <a class="header-anchor" href="#一、消息队列基础与redis演进" aria-label="Permalink to &quot;一、消息队列基础与Redis演进&quot;">​</a></h2><h3 id="_1-1-消息队列核心概念" tabindex="-1">1.1 消息队列核心概念 <a class="header-anchor" href="#_1-1-消息队列核心概念" aria-label="Permalink to &quot;1.1 消息队列核心概念&quot;">​</a></h3><p>消息队列是一种异步通信机制，用于解耦生产者和消费者：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌───────────┐    消息     ┌─────────────┐    消息     ┌───────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 生产者    │───────────▶│ 消息队列     │───────────▶│ 消费者    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│(Producer) │            │ (Message Queue)│           │(Consumer) │</span></span>
<span class="line"><span class="__shiki_wvjl67">└───────────┘            └─────────────┘            └───────────┘</span></span></code></pre></div><h3 id="_1-2-redis消息方案的演进" tabindex="-1">1.2 Redis消息方案的演进 <a class="header-anchor" href="#_1-2-redis消息方案的演进" aria-label="Permalink to &quot;1.2 Redis消息方案的演进&quot;">​</a></h3><h4 id="_1-2-1-早期方案" tabindex="-1">1.2.1 早期方案 <a class="header-anchor" href="#_1-2-1-早期方案" aria-label="Permalink to &quot;1.2.1 早期方案&quot;">​</a></h4><ol><li><p><strong>List-based Queue</strong>（列表队列）：</p><ul><li>LPUSH/BRPOP模式</li><li>简单但功能有限，不支持多消费者组</li></ul></li><li><p><strong>Pub/Sub</strong>（发布订阅）：</p><ul><li>实时广播，无持久化</li><li>消息丢失风险</li></ul></li><li><p><strong>Sorted Set-based Delay Queue</strong>（有序集合延迟队列）：</p><ul><li>使用ZADD/ZRANGEBYSCORE</li><li>实现延迟消息但复杂度高</li></ul></li></ol><h4 id="_1-2-2-redis-streams的诞生" tabindex="-1">1.2.2 Redis Streams的诞生 <a class="header-anchor" href="#_1-2-2-redis-streams的诞生" aria-label="Permalink to &quot;1.2.2 Redis Streams的诞生&quot;">​</a></h4><p>Redis 5.0引入Streams，提供了完整的消息队列功能：</p><ul><li>消息持久化</li><li>消费者组</li><li>消息回溯</li><li>阻塞读取</li></ul><h2 id="二、streams数据结构深度解析" tabindex="-1">二、Streams数据结构深度解析 <a class="header-anchor" href="#二、streams数据结构深度解析" aria-label="Permalink to &quot;二、Streams数据结构深度解析&quot;">​</a></h2><h3 id="_2-1-streams内部实现" tabindex="-1">2.1 Streams内部实现 <a class="header-anchor" href="#_2-1-streams内部实现" aria-label="Permalink to &quot;2.1 Streams内部实现&quot;">​</a></h3><h4 id="_2-1-1-整体结构" tabindex="-1">2.1.1 整体结构 <a class="header-anchor" href="#_2-1-1-整体结构" aria-label="Permalink to &quot;2.1.1 整体结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/stream.h - Redis Stream结构定义</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> stream {</span></span>
<span class="line"><span class="__shiki_140thh">    rax </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">rax;</span><span class="__shiki_21nrsd">               // 基数树，存储消息ID-&gt;消息内容映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint64_t</span><span class="__shiki_140thh"> length;</span><span class="__shiki_21nrsd">        // 消息数量</span></span>
<span class="line"><span class="__shiki_140thh">    streamID last_id;</span><span class="__shiki_21nrsd">       // 最后一条消息ID</span></span>
<span class="line"><span class="__shiki_140thh">    rax </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cgroups;</span><span class="__shiki_21nrsd">           // 消费者组基数树</span></span>
<span class="line"><span class="__shiki_140thh">} stream;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 消息ID结构</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> streamID {</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint64_t</span><span class="__shiki_140thh"> ms;</span><span class="__shiki_21nrsd">            // 毫秒时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint64_t</span><span class="__shiki_140thh"> seq;</span><span class="__shiki_21nrsd">           // 序列号</span></span>
<span class="line"><span class="__shiki_140thh">} streamID;</span></span></code></pre></div><h4 id="_2-1-2-消息存储结构" tabindex="-1">2.1.2 消息存储结构 <a class="header-anchor" href="#_2-1-2-消息存储结构" aria-label="Permalink to &quot;2.1.2 消息存储结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">消息在内存中的组织：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 基数树 (Rax Tree)                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 消息ID1 → 消息节点1                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 消息ID2 → 消息节点2                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ...      ...                                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">消息节点结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">typedef struct streamNode {</span></span>
<span class="line"><span class="__shiki_wvjl67">    streamID id;                    // 消息ID</span></span>
<span class="line"><span class="__shiki_wvjl67">    int64_t numfields;              // 字段数量</span></span>
<span class="line"><span class="__shiki_wvjl67">    unsigned char *lp;              // 指向listpack的指针</span></span>
<span class="line"><span class="__shiki_wvjl67">    struct streamNode *next;        // 下一个节点（双向链表）</span></span>
<span class="line"><span class="__shiki_wvjl67">    struct streamNode *prev;        // 前一个节点</span></span>
<span class="line"><span class="__shiki_wvjl67">} streamNode;</span></span></code></pre></div><h4 id="_2-1-3-listpack编码" tabindex="-1">2.1.3 Listpack编码 <a class="header-anchor" href="#_2-1-3-listpack编码" aria-label="Permalink to &quot;2.1.3 Listpack编码&quot;">​</a></h4><p>Redis使用listpack（替代ziplist）存储消息内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">listpack结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌────────────┬───────────┬────────────┬────────────┬──────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ total-bytes│ num-elements│ element1   │ element2   │ ...      │ EOF │</span></span>
<span class="line"><span class="__shiki_wvjl67">└────────────┴───────────┴────────────┴────────────┴──────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">每个消息字段存储格式：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────┬─────────────┬────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 字段长度 │ 字段名       │ 字段值     │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────┴─────────────┴────────────┘</span></span></code></pre></div><h3 id="_2-2-基数树-rax-tree-实现" tabindex="-1">2.2 基数树（Rax Tree）实现 <a class="header-anchor" href="#_2-2-基数树-rax-tree-实现" aria-label="Permalink to &quot;2.2 基数树（Rax Tree）实现&quot;">​</a></h3><p>基数树是Streams的核心数据结构，用于高效存储消息ID到消息的映射：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基数树节点结构</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> raxNode {</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint32_t</span><span class="__shiki_140thh"> iskey:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">       // 是否包含key</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint32_t</span><span class="__shiki_140thh"> isnull:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">      // 是否关联null值</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint32_t</span><span class="__shiki_140thh"> iscompr:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">     // 是否压缩节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint32_t</span><span class="__shiki_140thh"> size:</span><span class="__shiki_dzsirb">29</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">       // 子节点数量或压缩字符串长度</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_140thh"> data</span><span class="__shiki_1itgoe">[]</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">   // 柔性数组，存储字符和指针</span></span>
<span class="line"><span class="__shiki_140thh">} raxNode;</span></span></code></pre></div><p><strong>基数树示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">         [r]</span></span>
<span class="line"><span class="__shiki_wvjl67">         / \\</span></span>
<span class="line"><span class="__shiki_wvjl67">        a   b</span></span>
<span class="line"><span class="__shiki_wvjl67">       /     \\</span></span>
<span class="line"><span class="__shiki_wvjl67">     [d]     [e]</span></span>
<span class="line"><span class="__shiki_wvjl67">     / \\       \\</span></span>
<span class="line"><span class="__shiki_wvjl67">    r  *v1     *v2</span></span>
<span class="line"><span class="__shiki_wvjl67">   /</span></span>
<span class="line"><span class="__shiki_wvjl67"> [t]</span></span></code></pre></div><h2 id="三、streams核心命令详解" tabindex="-1">三、Streams核心命令详解 <a class="header-anchor" href="#三、streams核心命令详解" aria-label="Permalink to &quot;三、Streams核心命令详解&quot;">​</a></h2><h3 id="_3-1-基础命令" tabindex="-1">3.1 基础命令 <a class="header-anchor" href="#_3-1-基础命令" aria-label="Permalink to &quot;3.1 基础命令&quot;">​</a></h3><h4 id="_3-1-1-xadd-添加消息" tabindex="-1">3.1.1 XADD - 添加消息 <a class="header-anchor" href="#_3-1-1-xadd-添加消息" aria-label="Permalink to &quot;3.1.1 XADD - 添加消息&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础语法</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> stream</span><span class="__shiki_140thh"> [NOMKSTREAM] [MAXLEN</span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh">MINID [</span><span class="__shiki_1itgoe">=|</span><span class="__shiki_140thh">~] threshold [LIMIT count]] </span><span class="__shiki_1itgoe">*|</span><span class="__shiki_1t8gfj">id</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span><span class="__shiki_140thh"> [field </span><span class="__shiki_mdbnqw">value</span><span class="__shiki_mdbnqw"> ...]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> sensor-id</span><span class="__shiki_dzsirb"> 1234</span><span class="__shiki_mdbnqw"> temperature</span><span class="__shiki_dzsirb"> 19.8</span><span class="__shiki_mdbnqw"> humidity</span><span class="__shiki_dzsirb"> 45</span></span>
<span class="line"><span class="__shiki_21nrsd"># 返回: &quot;1681234567890-0&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制Stream长度</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> user_id</span><span class="__shiki_dzsirb"> 1001</span><span class="__shiki_mdbnqw"> action</span><span class="__shiki_mdbnqw"> login</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 指定消息ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 1681234567890-1</span><span class="__shiki_mdbnqw"> status</span><span class="__shiki_mdbnqw"> active</span></span></code></pre></div><p><strong>内部实现</strong>：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> xaddCommand</span><span class="__shiki_140thh">(client </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">c</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 解析参数</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 获取或创建stream</span></span>
<span class="line"><span class="__shiki_140thh">    robj </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">o </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> streamTypeLookupWriteOrCreate</span><span class="__shiki_140thh">(c, c-&gt;argv[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 生成消息ID</span></span>
<span class="line"><span class="__shiki_140thh">    streamID id;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">idstr</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;*&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 自动生成ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">        streamNextID</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">s-&gt;last_id, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">id);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 解析指定ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">        streamParseID</span><span class="__shiki_140thh">(idstr, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(idstr), </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">id);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 编码消息到listpack</span></span>
<span class="line"><span class="__shiki_1itgoe">    unsigned</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">lp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> lpNew</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> fieldcount; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        lp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> lpAppend</span><span class="__shiki_140thh">(lp, </span><span class="__shiki_1jdh33">fields</span><span class="__shiki_140thh">[i], </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_140thh">[i]));</span></span>
<span class="line"><span class="__shiki_140thh">        lp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> lpAppend</span><span class="__shiki_140thh">(lp, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">[i], </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">[i]));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 插入到基数树</span></span>
<span class="line"><span class="__shiki_1t8gfj">    raxInsert</span><span class="__shiki_140thh">(s-&gt;rax, (</span><span class="__shiki_1itgoe">unsigned</span><span class="__shiki_1itgoe"> char*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">id, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(id), lp, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 更新stream长度和last_id</span></span>
<span class="line"><span class="__shiki_140thh">    s-&gt;length</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    s-&gt;last_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> id;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-xrange-xrevrange-范围查询" tabindex="-1">3.1.2 XRANGE/XREVRANGE - 范围查询 <a class="header-anchor" href="#_3-1-2-xrange-xrevrange-范围查询" aria-label="Permalink to &quot;3.1.2 XRANGE/XREVRANGE - 范围查询&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查询特定范围消息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XRANGE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> COUNT</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 表示最小ID，+ 表示最大ID</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 按时间范围查询</span></span>
<span class="line"><span class="__shiki_1t8gfj">XRANGE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 1681234567890-0</span><span class="__shiki_mdbnqw"> 1681234667890-0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 反向查询</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREVRANGE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> COUNT</span><span class="__shiki_dzsirb"> 5</span></span></code></pre></div><h4 id="_3-1-3-xlen-获取长度" tabindex="-1">3.1.3 XLEN - 获取长度 <a class="header-anchor" href="#_3-1-3-xlen-获取长度" aria-label="Permalink to &quot;3.1.3 XLEN - 获取长度&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">XLEN</span><span class="__shiki_mdbnqw"> mystream</span></span></code></pre></div><h4 id="_3-1-4-xdel-删除消息" tabindex="-1">3.1.4 XDEL - 删除消息 <a class="header-anchor" href="#_3-1-4-xdel-删除消息" aria-label="Permalink to &quot;3.1.4 XDEL - 删除消息&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 删除单个消息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XDEL</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 1681234567890-0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量删除</span></span>
<span class="line"><span class="__shiki_1t8gfj">XDEL</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 1681234567890-0</span><span class="__shiki_mdbnqw"> 1681234567891-0</span></span></code></pre></div><h4 id="_3-1-5-xtrim-修剪stream" tabindex="-1">3.1.5 XTRIM - 修剪Stream <a class="header-anchor" href="#_3-1-5-xtrim-修剪stream" aria-label="Permalink to &quot;3.1.5 XTRIM - 修剪Stream&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于最大长度修剪</span></span>
<span class="line"><span class="__shiki_1t8gfj">XTRIM</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 近似修剪（性能更好）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XTRIM</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于最小ID修剪</span></span>
<span class="line"><span class="__shiki_1t8gfj">XTRIM</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MINID</span><span class="__shiki_mdbnqw"> 1681234567890-0</span></span></code></pre></div><h3 id="_3-2-消费命令" tabindex="-1">3.2 消费命令 <a class="header-anchor" href="#_3-2-消费命令" aria-label="Permalink to &quot;3.2 消费命令&quot;">​</a></h3><h4 id="_3-2-1-xread-独立消费" tabindex="-1">3.2.1 XREAD - 独立消费 <a class="header-anchor" href="#_3-2-1-xread-独立消费" aria-label="Permalink to &quot;3.2.1 XREAD - 独立消费&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 非阻塞读取</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREAD</span><span class="__shiki_mdbnqw"> COUNT</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_mdbnqw"> STREAMS</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 0-0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 阻塞读取（等待10秒）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREAD</span><span class="__shiki_mdbnqw"> BLOCK</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_mdbnqw"> STREAMS</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_140thh"> $</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从多个Stream读取</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREAD</span><span class="__shiki_mdbnqw"> BLOCK</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_mdbnqw"> STREAMS</span><span class="__shiki_mdbnqw"> mystream1</span><span class="__shiki_mdbnqw"> mystream2</span><span class="__shiki_140thh"> $ $</span></span></code></pre></div><p><strong>阻塞实现原理</strong>：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> blockForKeys</span><span class="__shiki_140thh">(client </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">c</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> btype</span><span class="__shiki_140thh">, robj </span><span class="__shiki_1itgoe">**</span><span class="__shiki_1jdh33">keys</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> numkeys</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">mstime_t</span><span class="__shiki_1jdh33"> timeout</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 将客户端加入阻塞列表</span></span>
<span class="line"><span class="__shiki_140thh">    c-&gt;bpop.timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timeout;</span></span>
<span class="line"><span class="__shiki_140thh">    c-&gt;bpop.target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> j </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; j </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> numkeys; j</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        robj </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33"> keys</span><span class="__shiki_140thh">[j];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查key是否有数据</span></span>
<span class="line"><span class="__shiki_140thh">        robj </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">o </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> lookupKeyRead</span><span class="__shiki_140thh">(c-&gt;db, key);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (o </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1t8gfj"> checkIfStreamHasData</span><span class="__shiki_140thh">(o, c-&gt;argv[numkeys</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">j])) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 有数据，立即返回</span></span>
<span class="line"><span class="__shiki_1t8gfj">            unblockClient</span><span class="__shiki_140thh">(c);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 加入阻塞列表</span></span>
<span class="line"><span class="__shiki_1t8gfj">        dictAdd</span><span class="__shiki_140thh">(c-&gt;bpop.keys, key, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        incrRefCount</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 将客户端添加到key的等待列表</span></span>
<span class="line"><span class="__shiki_1t8gfj">        listAddNodeTail</span><span class="__shiki_140thh">(server.ready_keys, key);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置客户端为阻塞状态</span></span>
<span class="line"><span class="__shiki_140thh">    c-&gt;flags </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> CLIENT_BLOCKED;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-xreadgroup-消费者组消费" tabindex="-1">3.2.2 XREADGROUP - 消费者组消费 <a class="header-anchor" href="#_3-2-2-xreadgroup-消费者组消费" aria-label="Permalink to &quot;3.2.2 XREADGROUP - 消费者组消费&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建消费者组</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> CREATE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_140thh"> $ </span><span class="__shiki_mdbnqw">MKSTREAM</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 消费者读取消息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREADGROUP</span><span class="__shiki_mdbnqw"> GROUP</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> consumer1</span><span class="__shiki_mdbnqw"> COUNT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw"> STREAMS</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_1itgoe"> &gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 读取特定消费者待处理消息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREADGROUP</span><span class="__shiki_mdbnqw"> GROUP</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> consumer1</span><span class="__shiki_mdbnqw"> STREAMS</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 不自动确认</span></span>
<span class="line"><span class="__shiki_1t8gfj">XREADGROUP</span><span class="__shiki_mdbnqw"> GROUP</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> consumer1</span><span class="__shiki_mdbnqw"> NOACK</span><span class="__shiki_mdbnqw"> STREAMS</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_1itgoe"> &gt;</span></span></code></pre></div><h2 id="四、消费者组-consumer-group-深度解析" tabindex="-1">四、消费者组（Consumer Group）深度解析 <a class="header-anchor" href="#四、消费者组-consumer-group-深度解析" aria-label="Permalink to &quot;四、消费者组（Consumer Group）深度解析&quot;">​</a></h2><h3 id="_4-1-消费者组架构" tabindex="-1">4.1 消费者组架构 <a class="header-anchor" href="#_4-1-消费者组架构" aria-label="Permalink to &quot;4.1 消费者组架构&quot;">​</a></h3><h4 id="_4-1-1-数据结构" tabindex="-1">4.1.1 数据结构 <a class="header-anchor" href="#_4-1-1-数据结构" aria-label="Permalink to &quot;4.1.1 数据结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 消费者组结构</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> streamCG {</span></span>
<span class="line"><span class="__shiki_140thh">    streamID last_id;</span><span class="__shiki_21nrsd">               // 最后传递的ID</span></span>
<span class="line"><span class="__shiki_140thh">    rax </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">pel;</span><span class="__shiki_21nrsd">                       // 待处理条目列表（Pending Entries List）</span></span>
<span class="line"><span class="__shiki_140thh">    rax </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">consumers;</span><span class="__shiki_21nrsd">                 // 消费者列表</span></span>
<span class="line"><span class="__shiki_140thh">} streamCG;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 消费者结构</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> streamConsumer {</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> seen_time;</span><span class="__shiki_21nrsd">             // 最后活跃时间</span></span>
<span class="line"><span class="__shiki_140thh">    sds name;</span><span class="__shiki_21nrsd">                       // 消费者名称</span></span>
<span class="line"><span class="__shiki_140thh">    rax </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">pel;</span><span class="__shiki_21nrsd">                       // 消费者待处理消息</span></span>
<span class="line"><span class="__shiki_140thh">} streamConsumer;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 待处理消息结构</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> streamNACK {</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> delivery_time;</span><span class="__shiki_21nrsd">         // 最近传递时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint64_t</span><span class="__shiki_140thh"> delivery_count;</span><span class="__shiki_21nrsd">        // 传递次数</span></span>
<span class="line"><span class="__shiki_140thh">    streamConsumer </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">consumer;</span><span class="__shiki_21nrsd">       // 消费者指针</span></span>
<span class="line"><span class="__shiki_140thh">} streamNACK;</span></span></code></pre></div><h4 id="_4-1-2-消费者组内存布局" tabindex="-1">4.1.2 消费者组内存布局 <a class="header-anchor" href="#_4-1-2-消费者组内存布局" aria-label="Permalink to &quot;4.1.2 消费者组内存布局&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Stream</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 基数树（消息存储）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 消费者组字典</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── Consumer Group &quot;mygroup&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67">│       ├── last_id: 1681234567890-5</span></span>
<span class="line"><span class="__shiki_wvjl67">│       ├── PEL基数树</span></span>
<span class="line"><span class="__shiki_wvjl67">│       │   ├── 消息ID1 → NACK1</span></span>
<span class="line"><span class="__shiki_wvjl67">│       │   ├── 消息ID2 → NACK2</span></span>
<span class="line"><span class="__shiki_wvjl67">│       │   └── ...</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── Consumers基数树</span></span>
<span class="line"><span class="__shiki_wvjl67">│           ├── &quot;consumer1&quot; → Consumer结构</span></span>
<span class="line"><span class="__shiki_wvjl67">│           ├── &quot;consumer2&quot; → Consumer结构</span></span>
<span class="line"><span class="__shiki_wvjl67">│           └── ...</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 其他元数据</span></span></code></pre></div><h3 id="_4-2-消费者组生命周期" tabindex="-1">4.2 消费者组生命周期 <a class="header-anchor" href="#_4-2-消费者组生命周期" aria-label="Permalink to &quot;4.2 消费者组生命周期&quot;">​</a></h3><h4 id="_4-2-1-创建与删除" tabindex="-1">4.2.1 创建与删除 <a class="header-anchor" href="#_4-2-1-创建与删除" aria-label="Permalink to &quot;4.2.1 创建与删除&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建消费者组（从最新消息开始）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> CREATE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_140thh"> $</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从指定ID开始</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> CREATE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建Stream（如果不存在）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> CREATE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_140thh"> $ </span><span class="__shiki_mdbnqw">MKSTREAM</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除消费者组</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> DESTROY</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除消费者</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> DELCONSUMER</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> consumer1</span></span></code></pre></div><h4 id="_4-2-2-消费者组信息查询" tabindex="-1">4.2.2 消费者组信息查询 <a class="header-anchor" href="#_4-2-2-消费者组信息查询" aria-label="Permalink to &quot;4.2.2 消费者组信息查询&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看Stream信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XINFO</span><span class="__shiki_mdbnqw"> STREAM</span><span class="__shiki_mdbnqw"> mystream</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看消费者组</span></span>
<span class="line"><span class="__shiki_1t8gfj">XINFO</span><span class="__shiki_mdbnqw"> GROUPS</span><span class="__shiki_mdbnqw"> mystream</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看消费者组详情</span></span>
<span class="line"><span class="__shiki_1t8gfj">XINFO</span><span class="__shiki_mdbnqw"> CONSUMERS</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span></span></code></pre></div><p><strong>XINFO输出示例</strong>：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;length&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1500</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;radix-tree-keys&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">124</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;radix-tree-nodes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">356</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-generated-id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1681234567890-1500&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;groups&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;first-entry&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;1681234500000-0&quot;</span><span class="__shiki_140thh">, {</span><span class="__shiki_dzsirb">&quot;field1&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;value1&quot;</span><span class="__shiki_140thh">}],</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;last-entry&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;1681234567890-1500&quot;</span><span class="__shiki_140thh">, {</span><span class="__shiki_dzsirb">&quot;status&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">}]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-消息处理流程" tabindex="-1">4.3 消息处理流程 <a class="header-anchor" href="#_4-3-消息处理流程" aria-label="Permalink to &quot;4.3 消息处理流程&quot;">​</a></h3><h4 id="_4-3-1-正常处理流程" tabindex="-1">4.3.1 正常处理流程 <a class="header-anchor" href="#_4-3-1-正常处理流程" aria-label="Permalink to &quot;4.3.1 正常处理流程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 消费者通过XREADGROUP读取消息</span></span>
<span class="line"><span class="__shiki_wvjl67">   └── 消息从Stream移动到PEL（Pending Entries List）</span></span>
<span class="line"><span class="__shiki_wvjl67">   </span></span>
<span class="line"><span class="__shiki_wvjl67">2. 消费者处理消息</span></span>
<span class="line"><span class="__shiki_wvjl67">   └── 业务逻辑处理</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">3. 消费者确认消息</span></span>
<span class="line"><span class="__shiki_wvjl67">   └── XACK命令从PEL移除消息</span></span></code></pre></div><h4 id="_4-3-2-消息重投递" tabindex="-1">4.3.2 消息重投递 <a class="header-anchor" href="#_4-3-2-消息重投递" aria-label="Permalink to &quot;4.3.2 消息重投递&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看待处理消息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XPENDING</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">1</span><span class="__shiki_140thh">) 1) </span><span class="__shiki_mdbnqw">&quot;1681234567890-5&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">   2</span><span class="__shiki_140thh">) </span><span class="__shiki_mdbnqw">&quot;consumer1&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">   3</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">integer</span><span class="__shiki_140thh">) 3600000  </span><span class="__shiki_21nrsd"># 空闲时间（毫秒）</span></span>
<span class="line"><span class="__shiki_1t8gfj">   4</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">integer</span><span class="__shiki_140thh">) 3        </span><span class="__shiki_21nrsd"># 传递次数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 认领超时消息</span></span>
<span class="line"><span class="__shiki_1t8gfj">XCLAIM</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> consumer2</span><span class="__shiki_dzsirb"> 3600000</span><span class="__shiki_mdbnqw"> 1681234567890-5</span></span></code></pre></div><p><strong>XCLAIM内部实现</strong>：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> xclaimCommand</span><span class="__shiki_140thh">(client </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">c</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 解析参数</span></span>
<span class="line"><span class="__shiki_140thh">    streamCG </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> streamLookupCG</span><span class="__shiki_140thh">(s, groupname);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 查找待处理消息</span></span>
<span class="line"><span class="__shiki_140thh">    streamNACK </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">nack </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> raxFind</span><span class="__shiki_140thh">(cg-&gt;pel, ...);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 检查空闲时间</span></span>
<span class="line"><span class="__shiki_dzsirb">    mstime_t</span><span class="__shiki_140thh"> idle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> nack-&gt;delivery_time;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (idle </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> minidle) </span><span class="__shiki_1itgoe">continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 转移消息所有权</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从原消费者PEL移除</span></span>
<span class="line"><span class="__shiki_1t8gfj">    raxRemove</span><span class="__shiki_140thh">(nack-&gt;consumer-&gt;pel, ...);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加到新消费者PEL</span></span>
<span class="line"><span class="__shiki_140thh">    nack-&gt;consumer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> newconsumer;</span></span>
<span class="line"><span class="__shiki_140thh">    nack-&gt;delivery_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now;</span></span>
<span class="line"><span class="__shiki_140thh">    nack-&gt;delivery_count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 返回消息内容</span></span>
<span class="line"><span class="__shiki_1t8gfj">    addReplyStreamEntry</span><span class="__shiki_140thh">(c, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">id, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">fields);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、高级特性与模式" tabindex="-1">五、高级特性与模式 <a class="header-anchor" href="#五、高级特性与模式" aria-label="Permalink to &quot;五、高级特性与模式&quot;">​</a></h2><h3 id="_5-1-自动创建与修剪策略" tabindex="-1">5.1 自动创建与修剪策略 <a class="header-anchor" href="#_5-1-自动创建与修剪策略" aria-label="Permalink to &quot;5.1 自动创建与修剪策略&quot;">​</a></h3><h4 id="_5-1-1-自动创建stream" tabindex="-1">5.1.1 自动创建Stream <a class="header-anchor" href="#_5-1-1-自动创建stream" aria-label="Permalink to &quot;5.1.1 自动创建Stream&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加消息时自动创建Stream</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建消费者组时自动创建Stream</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> CREATE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_140thh"> $ </span><span class="__shiki_mdbnqw">MKSTREAM</span></span></code></pre></div><h4 id="_5-1-2-智能修剪" tabindex="-1">5.1.2 智能修剪 <a class="header-anchor" href="#_5-1-2-智能修剪" aria-label="Permalink to &quot;5.1.2 智能修剪&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 精确修剪（性能较差）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XTRIM</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 近似修剪（性能好，可能略超限制）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XTRIM</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 组合使用（添加时修剪）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span></span></code></pre></div><h3 id="_5-2-消息id生成策略" tabindex="-1">5.2 消息ID生成策略 <a class="header-anchor" href="#_5-2-消息id生成策略" aria-label="Permalink to &quot;5.2 消息ID生成策略&quot;">​</a></h3><h4 id="_5-2-1-redis自动生成" tabindex="-1">5.2.1 Redis自动生成 <a class="header-anchor" href="#_5-2-1-redis自动生成" aria-label="Permalink to &quot;5.2.1 Redis自动生成&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自动生成时间戳和序列号</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span></span>
<span class="line"><span class="__shiki_21nrsd"># 返回格式: &quot;1681234567890-0&quot;</span></span></code></pre></div><h4 id="_5-2-2-自定义id" tabindex="-1">5.2.2 自定义ID <a class="header-anchor" href="#_5-2-2-自定义id" aria-label="Permalink to &quot;5.2.2 自定义ID&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 指定完整ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 1681234567890-5</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 只指定时间戳（序列号自动为0）</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_dzsirb"> 1681234567890</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用特殊ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 0-0</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span><span class="__shiki_21nrsd">  # 最小ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> 18446744073709551615-18446744073709551615</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span><span class="__shiki_21nrsd">  # 最大ID</span></span></code></pre></div><h3 id="_5-3-消费者组再平衡" tabindex="-1">5.3 消费者组再平衡 <a class="header-anchor" href="#_5-3-消费者组再平衡" aria-label="Permalink to &quot;5.3 消费者组再平衡&quot;">​</a></h3><h4 id="_5-3-1-自动负载均衡" tabindex="-1">5.3.1 自动负载均衡 <a class="header-anchor" href="#_5-3-1-自动负载均衡" aria-label="Permalink to &quot;5.3.1 自动负载均衡&quot;">​</a></h4><p>Redis Streams没有内置的自动再平衡，需要应用层实现：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StreamConsumerBalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, stream_name, group_name):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.stream_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stream_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.group_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> group_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.consumers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.rebalance_interval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_21nrsd">  # 30秒</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> rebalance</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;重新分配PEL中的消息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 1. 获取所有待处理消息</span></span>
<span class="line"><span class="__shiki_140thh">        pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_pending_messages()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 2. 计算每个消费者应处理的消息数</span></span>
<span class="line"><span class="__shiki_140thh">        target_per_consumer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(pending) </span><span class="__shiki_1itgoe">//</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.consumers)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 3. 重新分配</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i, consumer </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> enumerate</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.consumers):</span></span>
<span class="line"><span class="__shiki_140thh">            start_idx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> target_per_consumer</span></span>
<span class="line"><span class="__shiki_140thh">            end_idx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> start_idx </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> target_per_consumer</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            messages_to_claim </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pending[start_idx:end_idx]</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.claim_messages(consumer, messages_to_claim)</span></span></code></pre></div><h4 id="_5-3-2-消费者心跳与健康检查" tabindex="-1">5.3.2 消费者心跳与健康检查 <a class="header-anchor" href="#_5-3-2-消费者心跳与健康检查" aria-label="Permalink to &quot;5.3.2 消费者心跳与健康检查&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConsumerHealthMonitor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.consumer_last_seen </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> update_heartbeat</span><span class="__shiki_140thh">(self, consumer_name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;更新消费者心跳&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.consumer_last_seen[consumer_name] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_unhealthy_consumers</span><span class="__shiki_140thh">(self, timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查不健康的消费者&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        unhealthy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> consumer, last_seen </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.consumer_last_seen.items():</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> last_seen) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> timeout:  </span><span class="__shiki_21nrsd"># 转换为毫秒</span></span>
<span class="line"><span class="__shiki_140thh">                unhealthy.append(consumer)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> unhealthy</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> redistribute_messages</span><span class="__shiki_140thh">(self, unhealthy_consumers):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;重新分配不健康消费者的消息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> consumer </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> unhealthy_consumers:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 获取该消费者的所有待处理消息</span></span>
<span class="line"><span class="__shiki_140thh">            pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_consumer_pending(consumer)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 分配给其他健康消费者</span></span>
<span class="line"><span class="__shiki_140thh">            healthy_consumers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_healthy_consumers()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redistribute(pending, healthy_consumers)</span></span></code></pre></div><h2 id="六、streams性能优化" tabindex="-1">六、Streams性能优化 <a class="header-anchor" href="#六、streams性能优化" aria-label="Permalink to &quot;六、Streams性能优化&quot;">​</a></h2><h3 id="_6-1-内存优化策略" tabindex="-1">6.1 内存优化策略 <a class="header-anchor" href="#_6-1-内存优化策略" aria-label="Permalink to &quot;6.1 内存优化策略&quot;">​</a></h3><h4 id="_6-1-1-合理设置maxlen" tabindex="-1">6.1.1 合理设置MAXLEN <a class="header-anchor" href="#_6-1-1-合理设置maxlen" aria-label="Permalink to &quot;6.1.1 合理设置MAXLEN&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 根据业务需求设置合适长度</span></span>
<span class="line"><span class="__shiki_21nrsd"># 太长：内存占用高，恢复慢</span></span>
<span class="line"><span class="__shiki_21nrsd"># 太短：可能丢失历史消息</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 推荐：基于时间或数量限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span><span class="__shiki_21nrsd">  # 保留最近1万条</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> field</span><span class="__shiki_mdbnqw"> value</span><span class="__shiki_21nrsd">  # 保留最近100万条</span></span></code></pre></div><h4 id="_6-1-2-使用listpack优化" tabindex="-1">6.1.2 使用listpack优化 <a class="header-anchor" href="#_6-1-2-使用listpack优化" aria-label="Permalink to &quot;6.1.2 使用listpack优化&quot;">​</a></h4><p>Redis Streams使用listpack存储消息字段，优化建议：</p><ol><li>字段名尽量短</li><li>字段数量尽量少</li><li>使用数字代替字符串</li></ol><h3 id="_6-2-性能调优参数" tabindex="-1">6.2 性能调优参数 <a class="header-anchor" href="#_6-2-性能调优参数" aria-label="Permalink to &quot;6.2 性能调优参数&quot;">​</a></h3><h4 id="_6-2-1-redis配置参数" tabindex="-1">6.2.1 Redis配置参数 <a class="header-anchor" href="#_6-2-1-redis配置参数" aria-label="Permalink to &quot;6.2.1 Redis配置参数&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># redis.conf</span></span>
<span class="line"><span class="__shiki_mdbnqw">stream-node-max-entries 100</span><span class="__shiki_21nrsd">  # 每个listpack最大条目数</span></span>
<span class="line"><span class="__shiki_mdbnqw">stream-node-max-bytes 4096</span><span class="__shiki_21nrsd">   # 每个listpack最大字节数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory 4gb</span></span>
<span class="line"><span class="__shiki_mdbnqw">maxmemory-policy allkeys-lru</span></span></code></pre></div><h4 id="_6-2-2-消费者组参数优化" tabindex="-1">6.2.2 消费者组参数优化 <a class="header-anchor" href="#_6-2-2-消费者组参数优化" aria-label="Permalink to &quot;6.2.2 消费者组参数优化&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置合理的消费者组参数</span></span>
<span class="line"><span class="__shiki_21nrsd"># 自动创建消费者组</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> CREATE</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_140thh"> $ </span><span class="__shiki_mdbnqw">MKSTREAM</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定期清理空闲消费者</span></span>
<span class="line"><span class="__shiki_1t8gfj">XGROUP</span><span class="__shiki_mdbnqw"> DELCONSUMER</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> mygroup</span><span class="__shiki_mdbnqw"> idle-consumer</span></span></code></pre></div><h3 id="_6-3-批量操作优化" tabindex="-1">6.3 批量操作优化 <a class="header-anchor" href="#_6-3-批量操作优化" aria-label="Permalink to &quot;6.3 批量操作优化&quot;">​</a></h3><h4 id="_6-3-1-批量生产消息" tabindex="-1">6.3.1 批量生产消息 <a class="header-anchor" href="#_6-3-1-批量生产消息" aria-label="Permalink to &quot;6.3.1 批量生产消息&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> redis</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BatchProducer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client, stream_name, batch_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.stream_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stream_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch_size</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.pipeline </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.pipeline()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.message_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> add_message</span><span class="__shiki_140thh">(self, fields):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;添加消息到批量队列&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.pipeline.xadd(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.stream_name, fields, </span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.message_count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.message_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch_size:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.flush()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> flush</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行批量操作&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.message_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.pipeline.execute()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.pipeline </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.pipeline()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.message_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span></code></pre></div><h4 id="_6-3-2-批量消费确认" tabindex="-1">6.3.2 批量消费确认 <a class="header-anchor" href="#_6-3-2-批量消费确认" aria-label="Permalink to &quot;6.3.2 批量消费确认&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BatchConsumer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client, stream_name, group_name, consumer_name):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.stream_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stream_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.group_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> group_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.consumer_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> consumer_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.pending_acks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> set</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> process_messages</span><span class="__shiki_140thh">(self, count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;批量处理消息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 批量读取</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xreadgroup(</span></span>
<span class="line"><span class="__shiki_1jdh33">            groupname</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.group_name,</span></span>
<span class="line"><span class="__shiki_1jdh33">            consumername</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.consumer_name,</span></span>
<span class="line"><span class="__shiki_1jdh33">            streams</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.stream_name: </span><span class="__shiki_mdbnqw">&#39;&gt;&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1jdh33">            count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">count,</span></span>
<span class="line"><span class="__shiki_1jdh33">            block</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5000</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        messages </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> stream, message_list </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> message_id, fields </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> message_list:</span></span>
<span class="line"><span class="__shiki_140thh">                messages.append((message_id, fields))</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.pending_acks.add(message_id)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> messages</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> ack_messages</span><span class="__shiki_140thh">(self, message_ids</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;批量确认消息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> message_ids </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            message_ids </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.pending_acks)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> message_ids:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redis.xack(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.stream_name, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.group_name, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">message_ids)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 从待确认集合中移除</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> msg_id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> message_ids:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.pending_acks.discard(msg_id)</span></span></code></pre></div><h2 id="七、应用场景与实现模式" tabindex="-1">七、应用场景与实现模式 <a class="header-anchor" href="#七、应用场景与实现模式" aria-label="Permalink to &quot;七、应用场景与实现模式&quot;">​</a></h2><h3 id="_7-1-实时事件处理系统" tabindex="-1">7.1 实时事件处理系统 <a class="header-anchor" href="#_7-1-实时事件处理系统" aria-label="Permalink to &quot;7.1 实时事件处理系统&quot;">​</a></h3><h4 id="_7-1-1-架构设计" tabindex="-1">7.1.1 架构设计 <a class="header-anchor" href="#_7-1-1-架构设计" aria-label="Permalink to &quot;7.1.1 架构设计&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────┐   事件    ┌────────────┐   分发    ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 事件生产者       │──────────▶│ Redis      │─────────▶│ 事件处理器集群   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (Web服务器、     │           │ Streams    │          │ (消费者组)       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 微服务等)        │           │            │          │                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘           └────────────┘          └─────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                                      │                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">                                      ▼                        ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">                               ┌────────────┐          ┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">                               │ 事件归档    │          │ 监控与告警       │</span></span>
<span class="line"><span class="__shiki_wvjl67">                               │ (XREAD持久化)│          │ (实时分析)       │</span></span>
<span class="line"><span class="__shiki_wvjl67">                               └────────────┘          └─────────────────┘</span></span></code></pre></div><h4 id="_7-1-2-实现代码" tabindex="-1">7.1.2 实现代码 <a class="header-anchor" href="#_7-1-2-实现代码" aria-label="Permalink to &quot;7.1.2 实现代码&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EventProcessingSystem</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis.Redis()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.event_stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;events:stream&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.event_group </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;events:processors&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> emit_event</span><span class="__shiki_140thh">(self, event_type, data, source</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;unknown&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;发送事件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        event_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xadd(</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.event_stream,</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;type&quot;</span><span class="__shiki_140thh">: event_type,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;data&quot;</span><span class="__shiki_140thh">: json.dumps(data),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;source&quot;</span><span class="__shiki_140thh">: source,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;timestamp&quot;</span><span class="__shiki_140thh">: time.time(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;event_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(uuid.uuid4())</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_1jdh33">            maxlen</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000000</span><span class="__shiki_21nrsd">  # 保留最近100万事件</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> event_id</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> start_event_processor</span><span class="__shiki_140thh">(self, processor_name, event_types</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;启动事件处理器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 确保消费者组存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redis.xgroup_create(</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.event_stream,</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.event_group,</span></span>
<span class="line"><span class="__shiki_1jdh33">                id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;$&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                mkstream</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> redis.ResponseError:</span></span>
<span class="line"><span class="__shiki_1itgoe">            pass</span><span class="__shiki_21nrsd">  # 消费者组已存在</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 读取事件</span></span>
<span class="line"><span class="__shiki_140thh">                events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xreadgroup(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    groupname</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.event_group,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    consumername</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">processor_name,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    streams</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.event_stream: </span><span class="__shiki_mdbnqw">&#39;&gt;&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1jdh33">                    count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    block</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5000</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> events:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> stream, messages </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> events:</span></span>
<span class="line"><span class="__shiki_1itgoe">                        for</span><span class="__shiki_140thh"> message_id, fields </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> messages:</span></span>
<span class="line"><span class="__shiki_21nrsd">                            # 处理事件</span></span>
<span class="line"><span class="__shiki_dzsirb">                            self</span><span class="__shiki_140thh">.process_event(fields)</span></span>
<span class="line"><span class="__shiki_140thh">                            </span></span>
<span class="line"><span class="__shiki_21nrsd">                            # 确认处理完成</span></span>
<span class="line"><span class="__shiki_dzsirb">                            self</span><span class="__shiki_140thh">.redis.xack(</span></span>
<span class="line"><span class="__shiki_dzsirb">                                self</span><span class="__shiki_140thh">.event_stream,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                self</span><span class="__shiki_140thh">.event_group,</span></span>
<span class="line"><span class="__shiki_140thh">                                message_id</span></span>
<span class="line"><span class="__shiki_140thh">                            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Processor error: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                time.sleep(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_7-2-消息队列与任务调度" tabindex="-1">7.2 消息队列与任务调度 <a class="header-anchor" href="#_7-2-消息队列与任务调度" aria-label="Permalink to &quot;7.2 消息队列与任务调度&quot;">​</a></h3><h4 id="_7-2-1-延迟队列实现" tabindex="-1">7.2.1 延迟队列实现 <a class="header-anchor" href="#_7-2-1-延迟队列实现" aria-label="Permalink to &quot;7.2.1 延迟队列实现&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RedisDelayQueue</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client, queue_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;delay:queue&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queue_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queue_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.processing_stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:processing&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.dead_letter_stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:dead_letter&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> add_task</span><span class="__shiki_140thh">(self, task_data, delay_seconds</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;添加延迟任务&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        task_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(uuid.uuid4())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> delay_seconds </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 延迟任务，使用sorted set存储</span></span>
<span class="line"><span class="__shiki_140thh">            execute_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> delay_seconds</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redis.zadd(</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:delayed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                {task_id: execute_at}</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 存储任务数据</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redis.hset(</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:tasks&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                task_id,</span></span>
<span class="line"><span class="__shiki_140thh">                json.dumps(task_data)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 立即执行的任务</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redis.xadd(</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.queue_name,</span></span>
<span class="line"><span class="__shiki_140thh">                {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;task_id&quot;</span><span class="__shiki_140thh">: task_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;data&quot;</span><span class="__shiki_140thh">: json.dumps(task_data),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;added_at&quot;</span><span class="__shiki_140thh">: time.time()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> task_id</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> process_delayed_tasks</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;处理延迟到期的任务&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 获取已到期的任务</span></span>
<span class="line"><span class="__shiki_140thh">            now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">            tasks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.zrangebyscore(</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:delayed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                now,</span></span>
<span class="line"><span class="__shiki_1jdh33">                start</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                num</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> tasks:</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> task_id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> tasks:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 获取任务数据</span></span>
<span class="line"><span class="__shiki_140thh">                    task_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.hget(</span></span>
<span class="line"><span class="__shiki_1itgoe">                        f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:tasks&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        task_id</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> task_data:</span></span>
<span class="line"><span class="__shiki_21nrsd">                        # 添加到即时队列</span></span>
<span class="line"><span class="__shiki_dzsirb">                        self</span><span class="__shiki_140thh">.redis.xadd(</span></span>
<span class="line"><span class="__shiki_dzsirb">                            self</span><span class="__shiki_140thh">.queue_name,</span></span>
<span class="line"><span class="__shiki_140thh">                            {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;task_id&quot;</span><span class="__shiki_140thh">: task_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;data&quot;</span><span class="__shiki_140thh">: task_data.decode(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;delayed_until&quot;</span><span class="__shiki_140thh">: now,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;original_added_at&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.redis.hget(</span></span>
<span class="line"><span class="__shiki_1itgoe">                                    f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:meta&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                    task_id</span></span>
<span class="line"><span class="__shiki_140thh">                                )</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        )</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        # 清理</span></span>
<span class="line"><span class="__shiki_dzsirb">                        self</span><span class="__shiki_140thh">.redis.hdel(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:tasks&quot;</span><span class="__shiki_140thh">, task_id)</span></span>
<span class="line"><span class="__shiki_dzsirb">                        self</span><span class="__shiki_140thh">.redis.hdel(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:meta&quot;</span><span class="__shiki_140thh">, task_id)</span></span>
<span class="line"><span class="__shiki_dzsirb">                        self</span><span class="__shiki_140thh">.redis.zrem(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:delayed&quot;</span><span class="__shiki_140thh">, task_id)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 每秒检查一次</span></span></code></pre></div><h4 id="_7-2-2-优先级队列实现" tabindex="-1">7.2.2 优先级队列实现 <a class="header-anchor" href="#_7-2-2-优先级队列实现" aria-label="Permalink to &quot;7.2.2 优先级队列实现&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RedisPriorityQueue</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client, queue_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;priority:queue&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queue_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queue_name</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> add_task</span><span class="__shiki_140thh">(self, task_data, priority</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        添加优先级任务</span></span>
<span class="line"><span class="__shiki_mdbnqw">        priority: 1-10，1为最高优先级</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 为不同优先级创建不同的Stream</span></span>
<span class="line"><span class="__shiki_140thh">        priority_stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:p</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">priority</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        task_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xadd(</span></span>
<span class="line"><span class="__shiki_140thh">            priority_stream,</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;data&quot;</span><span class="__shiki_140thh">: json.dumps(task_data),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;priority&quot;</span><span class="__shiki_140thh">: priority,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;added_at&quot;</span><span class="__shiki_140thh">: time.time()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> task_id</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_next_task</span><span class="__shiki_140thh">(self, consumer_group</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;workers&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取下一个任务（按优先级顺序）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 从高优先级到低优先级检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> priority </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">11</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            stream_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.queue_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:p</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">priority</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 确保消费者组存在</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.redis.xgroup_create(</span></span>
<span class="line"><span class="__shiki_140thh">                    stream_name,</span></span>
<span class="line"><span class="__shiki_140thh">                    consumer_group,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;$&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    mkstream</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_140thh"> redis.ResponseError:</span></span>
<span class="line"><span class="__shiki_1itgoe">                pass</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 尝试读取消息</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xreadgroup(</span></span>
<span class="line"><span class="__shiki_1jdh33">                groupname</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">consumer_group,</span></span>
<span class="line"><span class="__shiki_1jdh33">                consumername</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;worker-1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                streams</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{stream_name: </span><span class="__shiki_mdbnqw">&#39;&gt;&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1jdh33">                count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                block</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> stream, messages </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> message_id, fields </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> messages:</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;message_id&quot;</span><span class="__shiki_140thh">: message_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;stream&quot;</span><span class="__shiki_140thh">: stream,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;data&quot;</span><span class="__shiki_140thh">: json.loads(fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;data&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;priority&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">(fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;priority&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span></code></pre></div><h3 id="_7-3-审计日志与事件溯源" tabindex="-1">7.3 审计日志与事件溯源 <a class="header-anchor" href="#_7-3-审计日志与事件溯源" aria-label="Permalink to &quot;7.3 审计日志与事件溯源&quot;">​</a></h3><h4 id="_7-3-1-审计日志系统" tabindex="-1">7.3.1 审计日志系统 <a class="header-anchor" href="#_7-3-1-审计日志系统" aria-label="Permalink to &quot;7.3.1 审计日志系统&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuditLogSystem</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.audit_stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;audit:log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_event</span><span class="__shiki_140thh">(self, user_id, action, resource, details</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, ip_address</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录审计事件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        event_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;event_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(uuid.uuid4()),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;timestamp&quot;</span><span class="__shiki_140thh">: time.time(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;user_id&quot;</span><span class="__shiki_140thh">: user_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;action&quot;</span><span class="__shiki_140thh">: action,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;resource&quot;</span><span class="__shiki_140thh">: resource,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;ip_address&quot;</span><span class="__shiki_140thh">: ip_address </span><span class="__shiki_1itgoe">or</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;details&quot;</span><span class="__shiki_140thh">: json.dumps(details </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> {})</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 使用XADD记录，确保顺序性</span></span>
<span class="line"><span class="__shiki_140thh">        message_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xadd(</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.audit_stream,</span></span>
<span class="line"><span class="__shiki_140thh">            event_data,</span></span>
<span class="line"><span class="__shiki_1jdh33">            maxlen</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000000</span><span class="__shiki_21nrsd">  # 保留100万条审计日志</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> message_id</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> query_events</span><span class="__shiki_140thh">(self, start_time</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, end_time</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, user_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;查询审计事件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        start_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;0-0&quot;</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> start_time </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{int</span><span class="__shiki_140thh">(start_time </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">-0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        end_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;+&quot;</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> end_time </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{int</span><span class="__shiki_140thh">(end_time </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">-0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取时间范围内的所有事件</span></span>
<span class="line"><span class="__shiki_140thh">        events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xrange(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.audit_stream, start_id, end_id)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        filtered_events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> message_id, fields </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> events:</span></span>
<span class="line"><span class="__shiki_140thh">            event </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;message_id&quot;</span><span class="__shiki_140thh">: message_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">(fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;timestamp&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;user_id&quot;</span><span class="__shiki_140thh">: fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">].decode(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;action&quot;</span><span class="__shiki_140thh">: fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;action&#39;</span><span class="__shiki_140thh">].decode(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;resource&quot;</span><span class="__shiki_140thh">: fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;resource&#39;</span><span class="__shiki_140thh">].decode(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;details&quot;</span><span class="__shiki_140thh">: json.loads(fields[</span><span class="__shiki_1itgoe">b</span><span class="__shiki_mdbnqw">&#39;details&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 应用过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> event[</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> user_id:</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> action </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> event[</span><span class="__shiki_mdbnqw">&#39;action&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> action:</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            filtered_events.append(event)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> filtered_events</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_audit_report</span><span class="__shiki_140thh">(self, start_time, end_time):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建审计报告&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.query_events(start_time, end_time)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;period&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;start&quot;</span><span class="__shiki_140thh">: start_time, </span><span class="__shiki_mdbnqw">&quot;end&quot;</span><span class="__shiki_140thh">: end_time},</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;total_events&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(events),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;users&quot;</span><span class="__shiki_140thh">: {},</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;actions&quot;</span><span class="__shiki_140thh">: {},</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;resources&quot;</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> event </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> events:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 统计用户活动</span></span>
<span class="line"><span class="__shiki_140thh">            user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event[</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            report[</span><span class="__shiki_mdbnqw">&#39;users&#39;</span><span class="__shiki_140thh">][user_id] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> report[</span><span class="__shiki_mdbnqw">&#39;users&#39;</span><span class="__shiki_140thh">].get(user_id, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 统计操作类型</span></span>
<span class="line"><span class="__shiki_140thh">            action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event[</span><span class="__shiki_mdbnqw">&#39;action&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            report[</span><span class="__shiki_mdbnqw">&#39;actions&#39;</span><span class="__shiki_140thh">][action] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> report[</span><span class="__shiki_mdbnqw">&#39;actions&#39;</span><span class="__shiki_140thh">].get(action, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 统计资源访问</span></span>
<span class="line"><span class="__shiki_140thh">            resource </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event[</span><span class="__shiki_mdbnqw">&#39;resource&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            report[</span><span class="__shiki_mdbnqw">&#39;resources&#39;</span><span class="__shiki_140thh">][resource] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> report[</span><span class="__shiki_mdbnqw">&#39;resources&#39;</span><span class="__shiki_140thh">].get(resource, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> report</span></span></code></pre></div><h2 id="八、监控与运维" tabindex="-1">八、监控与运维 <a class="header-anchor" href="#八、监控与运维" aria-label="Permalink to &quot;八、监控与运维&quot;">​</a></h2><h3 id="_8-1-streams监控指标" tabindex="-1">8.1 Streams监控指标 <a class="header-anchor" href="#_8-1-streams监控指标" aria-label="Permalink to &quot;8.1 Streams监控指标&quot;">​</a></h3><h4 id="_8-1-1-关键指标收集" tabindex="-1">8.1.1 关键指标收集 <a class="header-anchor" href="#_8-1-1-关键指标收集" aria-label="Permalink to &quot;8.1.1 关键指标收集&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StreamsMonitor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_stream_stats</span><span class="__shiki_140thh">(self, stream_name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取Stream统计信息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_stream(stream_name)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;stream&quot;</span><span class="__shiki_140thh">: stream_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;length&quot;</span><span class="__shiki_140thh">: info[</span><span class="__shiki_mdbnqw">&quot;length&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;radix_tree_keys&quot;</span><span class="__shiki_140thh">: info.get(</span><span class="__shiki_mdbnqw">&quot;radix-tree-keys&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;radix_tree_nodes&quot;</span><span class="__shiki_140thh">: info.get(</span><span class="__shiki_mdbnqw">&quot;radix-tree-nodes&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;last_generated_id&quot;</span><span class="__shiki_140thh">: info[</span><span class="__shiki_mdbnqw">&quot;last-generated-id&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;max_deleted_entry_id&quot;</span><span class="__shiki_140thh">: info.get(</span><span class="__shiki_mdbnqw">&quot;max-deleted-entry-id&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;entries_added&quot;</span><span class="__shiki_140thh">: info.get(</span><span class="__shiki_mdbnqw">&quot;entries-added&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;first_entry&quot;</span><span class="__shiki_140thh">: info.get(</span><span class="__shiki_mdbnqw">&quot;first-entry&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;last_entry&quot;</span><span class="__shiki_140thh">: info.get(</span><span class="__shiki_mdbnqw">&quot;last-entry&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> stats</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_consumer_groups_stats</span><span class="__shiki_140thh">(self, stream_name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取消费者组统计信息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        groups_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_groups(stream_name)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        groups_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> group_info </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> groups_info:</span></span>
<span class="line"><span class="__shiki_140thh">            group_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;name&quot;</span><span class="__shiki_140thh">: group_info[</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;consumers&quot;</span><span class="__shiki_140thh">: group_info[</span><span class="__shiki_mdbnqw">&quot;consumers&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;pending&quot;</span><span class="__shiki_140thh">: group_info[</span><span class="__shiki_mdbnqw">&quot;pending&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;last_delivered_id&quot;</span><span class="__shiki_140thh">: group_info[</span><span class="__shiki_mdbnqw">&quot;last-delivered-id&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;entries_read&quot;</span><span class="__shiki_140thh">: group_info.get(</span><span class="__shiki_mdbnqw">&quot;entries-read&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;lag&quot;</span><span class="__shiki_140thh">: group_info.get(</span><span class="__shiki_mdbnqw">&quot;lag&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 获取消费者详情</span></span>
<span class="line"><span class="__shiki_140thh">            consumers_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_consumers(stream_name, group_info[</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">            group_stats[</span><span class="__shiki_mdbnqw">&quot;consumers_detail&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">                {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;name&quot;</span><span class="__shiki_140thh">: c[</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;pending&quot;</span><span class="__shiki_140thh">: c[</span><span class="__shiki_mdbnqw">&quot;pending&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;idle&quot;</span><span class="__shiki_140thh">: c[</span><span class="__shiki_mdbnqw">&quot;idle&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> consumers_info</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            groups_stats.append(group_stats)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> groups_stats</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> calculate_lag</span><span class="__shiki_140thh">(self, stream_name, group_name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算消费延迟&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        stream_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_stream(stream_name)</span></span>
<span class="line"><span class="__shiki_140thh">        last_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stream_info[</span><span class="__shiki_mdbnqw">&quot;last-generated-id&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        group_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_groups(stream_name)</span></span>
<span class="line"><span class="__shiki_140thh">        target_group </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> next</span><span class="__shiki_140thh">((g </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> g </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> group_info </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> g[</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> group_name), </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> target_group:</span></span>
<span class="line"><span class="__shiki_140thh">            last_delivered </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> target_group[</span><span class="__shiki_mdbnqw">&quot;last-delivered-id&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 计算两个ID之间的消息数量</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 注意：这是一个简化版本，实际需要解析ID</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;last_stream_id&quot;</span><span class="__shiki_140thh">: last_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;last_delivered_id&quot;</span><span class="__shiki_140thh">: last_delivered,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;estimated_lag&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;需要根据ID计算&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span></code></pre></div><h4 id="_8-1-2-性能监控" tabindex="-1">8.1.2 性能监控 <a class="header-anchor" href="#_8-1-2-性能监控" aria-label="Permalink to &quot;8.1.2 性能监控&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 查看Streams内存使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">MEMORY</span><span class="__shiki_mdbnqw"> USAGE</span><span class="__shiki_mdbnqw"> mystream</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看Streams相关命令统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">INFO</span><span class="__shiki_mdbnqw"> commandstats</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(xadd|xread|xack|xgroup)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 慢查询日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_mdbnqw">SLOWLOG</span><span class="__shiki_mdbnqw"> GET</span><span class="__shiki_dzsirb"> 10</span></span></code></pre></div><h3 id="_8-2-故障诊断与恢复" tabindex="-1">8.2 故障诊断与恢复 <a class="header-anchor" href="#_8-2-故障诊断与恢复" aria-label="Permalink to &quot;8.2 故障诊断与恢复&quot;">​</a></h3><h4 id="_8-2-1-常见问题诊断" tabindex="-1">8.2.1 常见问题诊断 <a class="header-anchor" href="#_8-2-1-常见问题诊断" aria-label="Permalink to &quot;8.2.1 常见问题诊断&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StreamsDiagnostics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> diagnose_consumer_group</span><span class="__shiki_140thh">(self, stream_name, group_name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;诊断消费者组问题&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        issues </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查消费者组是否存在</span></span>
<span class="line"><span class="__shiki_140thh">            groups </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_groups(stream_name)</span></span>
<span class="line"><span class="__shiki_140thh">            group_exists </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">(g[</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> group_name </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> g </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> groups)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> group_exists:</span></span>
<span class="line"><span class="__shiki_140thh">                issues.append(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Consumer group &#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">group_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39; does not exist&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> issues</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查待处理消息</span></span>
<span class="line"><span class="__shiki_140thh">            pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xpending(stream_name, group_name)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> pending[</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                issues.append(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;High pending count: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">pending[</span><span class="__shiki_mdbnqw">&#39;count&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查消费者健康状态</span></span>
<span class="line"><span class="__shiki_140thh">            consumers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xinfo_consumers(stream_name, group_name)</span></span>
<span class="line"><span class="__shiki_140thh">            idle_consumers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> consumers </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c[</span><span class="__shiki_mdbnqw">&quot;idle&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 300000</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> idle_consumers:</span></span>
<span class="line"><span class="__shiki_140thh">                issues.append(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Idle consumers: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">[c[</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> idle_consumers]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> issues</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> redis.RedisError </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> [</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Redis error: </span><span class="__shiki_dzsirb">{str</span><span class="__shiki_140thh">(e)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> recover_stuck_messages</span><span class="__shiki_140thh">(self, stream_name, group_name, threshold_ms</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;恢复卡住的消息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取所有待处理消息</span></span>
<span class="line"><span class="__shiki_140thh">        pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xpending_range(</span></span>
<span class="line"><span class="__shiki_140thh">            stream_name,</span></span>
<span class="line"><span class="__shiki_140thh">            group_name,</span></span>
<span class="line"><span class="__shiki_1jdh33">            min</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;-&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            max</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;+&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        recovered </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> msg </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> pending:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 如果消息空闲时间超过阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> msg[</span><span class="__shiki_mdbnqw">&quot;idle&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> threshold_ms:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 尝试重新投递</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                    claimed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.xclaim(</span></span>
<span class="line"><span class="__shiki_140thh">                        stream_name,</span></span>
<span class="line"><span class="__shiki_140thh">                        group_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;recovery-consumer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        threshold_ms,</span></span>
<span class="line"><span class="__shiki_140thh">                        [msg[</span><span class="__shiki_mdbnqw">&quot;message_id&quot;</span><span class="__shiki_140thh">]],</span></span>
<span class="line"><span class="__shiki_1jdh33">                        justid</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> claimed:</span></span>
<span class="line"><span class="__shiki_140thh">                        recovered </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_dzsirb">                        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Recovered message: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">msg[</span><span class="__shiki_mdbnqw">&#39;message_id&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_1itgoe">                except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">                    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Failed to recover </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">msg[</span><span class="__shiki_mdbnqw">&#39;message_id&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> recovered</span></span></code></pre></div><h4 id="_8-2-2-备份与恢复" tabindex="-1">8.2.2 备份与恢复 <a class="header-anchor" href="#_8-2-2-备份与恢复" aria-label="Permalink to &quot;8.2.2 备份与恢复&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Streams备份策略</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 定期创建RDB快照</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用AOF持久化</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 导出Stream数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 导出Stream数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">redis-cli</span><span class="__shiki_dzsirb"> --eval</span><span class="__shiki_mdbnqw"> export_stream.lua</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> ,</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> mystream_backup.json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Lua脚本示例：export_stream.lua</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> stream_key = KEYS[1]</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> start_id = </span><span class="__shiki_mdbnqw">&quot;0-0&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> end_id = </span><span class="__shiki_mdbnqw">&quot;+&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> messages = redis.call(</span><span class="__shiki_1t8gfj">&#39;XRANGE&#39;</span><span class="__shiki_1t8gfj">,</span><span class="__shiki_mdbnqw"> stream_key,</span><span class="__shiki_mdbnqw"> start_id,</span><span class="__shiki_mdbnqw"> end_id</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> result = {}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> i, message in ipairs(</span><span class="__shiki_1t8gfj">messages</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">    table.insert(result,</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        id</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> message[1],</span></span>
<span class="line"><span class="__shiki_1t8gfj">        fields</span><span class="__shiki_mdbnqw"> =</span><span class="__shiki_mdbnqw"> message[2]</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> cjson.encode</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">result</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="九、与其他消息队列对比" tabindex="-1">九、与其他消息队列对比 <a class="header-anchor" href="#九、与其他消息队列对比" aria-label="Permalink to &quot;九、与其他消息队列对比&quot;">​</a></h2><h3 id="_9-1-redis-streams-vs-apache-kafka" tabindex="-1">9.1 Redis Streams vs Apache Kafka <a class="header-anchor" href="#_9-1-redis-streams-vs-apache-kafka" aria-label="Permalink to &quot;9.1 Redis Streams vs Apache Kafka&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Redis Streams</th><th>Apache Kafka</th></tr></thead><tbody><tr><td>部署复杂度</td><td>简单</td><td>复杂</td></tr><tr><td>性能</td><td>极高（内存）</td><td>高（磁盘）</td></tr><tr><td>持久化</td><td>可选（RDB/AOF）</td><td>必须</td></tr><tr><td>消费者组</td><td>支持</td><td>支持</td></tr><tr><td>分区</td><td>不支持</td><td>支持</td></tr><tr><td>消息保留</td><td>基于长度/时间</td><td>基于时间</td></tr><tr><td>生态系统</td><td>有限</td><td>丰富</td></tr><tr><td>适用场景</td><td>实时、轻量级</td><td>大数据、流处理</td></tr></tbody></table><h3 id="_9-2-redis-streams-vs-rabbitmq" tabindex="-1">9.2 Redis Streams vs RabbitMQ <a class="header-anchor" href="#_9-2-redis-streams-vs-rabbitmq" aria-label="Permalink to &quot;9.2 Redis Streams vs RabbitMQ&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Redis Streams</th><th>RabbitMQ</th></tr></thead><tbody><tr><td>协议</td><td>Redis协议</td><td>AMQP</td></tr><tr><td>消息模型</td><td>日志流</td><td>队列/Exchange</td></tr><tr><td>路由能力</td><td>简单</td><td>强大</td></tr><tr><td>消息确认</td><td>支持</td><td>支持</td></tr><tr><td>优先级队列</td><td>不支持</td><td>支持</td></tr><tr><td>死信队列</td><td>需要自定义</td><td>内置</td></tr><tr><td>管理界面</td><td>需要第三方</td><td>内置</td></tr><tr><td>集群模式</td><td>Redis Cluster</td><td>镜像队列</td></tr></tbody></table><h3 id="_9-3-选择建议" tabindex="-1">9.3 选择建议 <a class="header-anchor" href="#_9-3-选择建议" aria-label="Permalink to &quot;9.3 选择建议&quot;">​</a></h3><ol><li><p><strong>选择Redis Streams当</strong>：</p><ul><li>已使用Redis生态系统</li><li>需要极低延迟</li><li>数据量适中（内存限制）</li><li>简单的消息模式</li></ul></li><li><p><strong>选择其他MQ当</strong>：</p><ul><li>需要复杂路由</li><li>大数据量持久化</li><li>已有相关技术栈</li><li>需要丰富生态系统</li></ul></li></ol><h2 id="十、最佳实践总结" tabindex="-1">十、最佳实践总结 <a class="header-anchor" href="#十、最佳实践总结" aria-label="Permalink to &quot;十、最佳实践总结&quot;">​</a></h2><h3 id="_10-1-设计原则" tabindex="-1">10.1 设计原则 <a class="header-anchor" href="#_10-1-设计原则" aria-label="Permalink to &quot;10.1 设计原则&quot;">​</a></h3><ol><li><p><strong>合理设计消息结构</strong>：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 好：字段少，值简单</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;action&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;login&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1681234567&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 避免：字段多，值复杂</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;user&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;John&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;...&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;action&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;login&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;details&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">}},</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;context&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li><li><p><strong>合理设置Stream长度</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于业务需求</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 100000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> ...</span><span class="__shiki_21nrsd">  # 实时分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> ...</span><span class="__shiki_21nrsd"> # 审计日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">XADD</span><span class="__shiki_mdbnqw"> mystream</span><span class="__shiki_mdbnqw"> MAXLEN</span><span class="__shiki_mdbnqw"> ~</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> ...</span><span class="__shiki_21nrsd">   # 任务队列</span></span></code></pre></div></li></ol><h3 id="_10-2-运维建议" tabindex="-1">10.2 运维建议 <a class="header-anchor" href="#_10-2-运维建议" aria-label="Permalink to &quot;10.2 运维建议&quot;">​</a></h3><ol><li><p><strong>监控关键指标</strong>：</p><ul><li>Stream长度增长</li><li>消费者组延迟</li><li>待处理消息数量</li><li>内存使用情况</li></ul></li><li><p><strong>定期维护</strong>：</p><ul><li>清理空闲消费者</li><li>处理卡住的消息</li><li>调整MAXLEN设置</li><li>备份重要数据</li></ul></li></ol><h3 id="_10-3-性能优化" tabindex="-1">10.3 性能优化 <a class="header-anchor" href="#_10-3-性能优化" aria-label="Permalink to &quot;10.3 性能优化&quot;">​</a></h3><ol><li><strong>批量操作</strong>：尽量使用批量生产和确认</li><li><strong>合理分片</strong>：大数据量时考虑分多个Stream</li><li><strong>优化数据结构</strong>：使用数字类型，简化字段</li><li><strong>调整配置</strong>：根据负载调整Redis配置</li></ol><h3 id="_10-4-容错设计" tabindex="-1">10.4 容错设计 <a class="header-anchor" href="#_10-4-容错设计" aria-label="Permalink to &quot;10.4 容错设计&quot;">​</a></h3><ol><li><p><strong>消费者重试机制</strong>：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> process_with_retry</span><span class="__shiki_140thh">(message, max_retries</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(max_retries):</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            process_message(message)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> max_retries </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                send_to_dead_letter(message, e)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh"> attempt)  </span><span class="__shiki_21nrsd"># 指数退避</span></span></code></pre></div></li><li><p><strong>死信队列</strong>：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> setup_dead_letter_handling</span><span class="__shiki_140thh">(stream_name, group_name):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建死信Stream</span></span>
<span class="line"><span class="__shiki_140thh">    dead_stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">stream_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:dead_letter&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 监控并处理失败消息</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取失败消息</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分析原因并记录</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 可能的处理：重试、报警、人工介入</span></span>
<span class="line"><span class="__shiki_1itgoe">        pass</span></span></code></pre></div></li></ol><h2 id="十一、未来发展趋势" tabindex="-1">十一、未来发展趋势 <a class="header-anchor" href="#十一、未来发展趋势" aria-label="Permalink to &quot;十一、未来发展趋势&quot;">​</a></h2><h3 id="_11-1-redis-7-0-streams增强" tabindex="-1">11.1 Redis 7.0+ Streams增强 <a class="header-anchor" href="#_11-1-redis-7-0-streams增强" aria-label="Permalink to &quot;11.1 Redis 7.0+ Streams增强&quot;">​</a></h3><ol><li><strong>Streams触发器</strong>：基于事件自动触发操作</li><li><strong>增强的监控</strong>：更多内省命令</li><li><strong>性能优化</strong>：更好的内存管理和GC</li></ol><h3 id="_11-2-生态整合" tabindex="-1">11.2 生态整合 <a class="header-anchor" href="#_11-2-生态整合" aria-label="Permalink to &quot;11.2 生态整合&quot;">​</a></h3><ol><li><strong>与Kafka连接器</strong>：更好的流处理集成</li><li><strong>云服务增强</strong>：托管Streams服务</li><li><strong>监控工具</strong>：专门的Streams监控解决方案</li></ol><h2 id="十二、总结" tabindex="-1">十二、总结 <a class="header-anchor" href="#十二、总结" aria-label="Permalink to &quot;十二、总结&quot;">​</a></h2><p>Redis Streams作为Redis 5.0引入的消息队列功能，提供了：</p><h3 id="核心优势" tabindex="-1">核心优势： <a class="header-anchor" href="#核心优势" aria-label="Permalink to &quot;核心优势：&quot;">​</a></h3><ol><li><strong>高性能</strong>：内存操作，极低延迟</li><li><strong>简单易用</strong>：Redis协议，学习成本低</li><li><strong>功能完整</strong>：消费者组、持久化、阻塞读取</li><li><strong>集成方便</strong>：与Redis生态系统无缝集成</li></ol><h3 id="适用场景" tabindex="-1">适用场景： <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景：&quot;">​</a></h3><ol><li><strong>实时事件处理</strong>：用户行为跟踪、实时分析</li><li><strong>任务队列</strong>：异步任务处理、工作流</li><li><strong>审计日志</strong>：操作日志、安全审计</li><li><strong>消息总线</strong>：微服务间通信</li></ol><h3 id="注意事项" tabindex="-1">注意事项： <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项：&quot;">​</a></h3><ol><li><strong>内存限制</strong>：数据量受内存限制</li><li><strong>功能限制</strong>：相比专业MQ功能有限</li><li><strong>运维要求</strong>：需要主动监控和维护</li></ol><p>通过合理的设计和运维，Redis Streams可以成为构建高性能、可靠消息系统的优秀选择。</p>`,155)])])}const r=a(p,[["render",l]]);export{o as __pageData,r as default};
