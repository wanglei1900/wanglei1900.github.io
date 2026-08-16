import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"🍦 websocket机制","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/network/protocols/websocket.md","filePath":"frontend/network/protocols/websocket.md"}'),p={name:"frontend/network/protocols/websocket.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="websocket机制" tabindex="-1">🍦 websocket机制 <a class="header-anchor" href="#websocket机制" aria-label="Permalink to &quot;:icecream: websocket机制&quot;">​</a></h1><blockquote><p>Web Socket 是通过一个长时连接实现与服务器全双工、双向的通信。</p></blockquote><h2 id="一、定义" tabindex="-1">📣 一、定义 <a class="header-anchor" href="#一、定义" aria-label="Permalink to &quot;:mega: 一、定义&quot;">​</a></h2><p>websocket 使用了自定义协议，不能使用<code>http://或https://</code>，而要使用<code>ws://</code>和<code>wss://</code>。不带s的是不安全的连接，带s的是安全连接。</p><p>为什么要使用自定义协议而非HTTP协议，客户端与服务器之间可以发送非常少的数据，不会对HTTP造成任何负担。使用更小的数据包让WS非常适合带宽和延迟问题比较捉鸡的移动应用。WS得到了所有主流浏览器的支持。</p><p>创建新的WS，必须实例化ws对象并传入提供连接的URL<code>let ws = new WebSocket(&quot;ws://www.example/websocket&quot;)</code>，传入的连接必须是一个绝对的URL。WS不受同源策略影响，因此可以打开到任何站点。如果需要与特定源页面通信，则完全取决于服务器（在握手阶段就可以确定请求来自哪里）。</p><br><h2 id="二、api" tabindex="-1">⚙️ 二、API <a class="header-anchor" href="#二、api" aria-label="Permalink to &quot;:gear:  二、API&quot;">​</a></h2><p>与XHR相似，WS也有一个readyState属性表示当前状态。</p><ul><li>WebSocket.OPENING(0): 连接正在简历</li><li>WebSocket.OPEN(1): 连接正在建立</li><li>WebSocket.CLOSEING(2): 连接正在关闭</li><li>WebSocket.CLOSE(3): 连接已经关闭</li></ul><p>任何时候都可以使用<code>ws.close()</code>关闭WS连接，调用后，WS的readyState立刻变为2，关闭后变为3.</p><br><h2 id="三、发送和接受数据" tabindex="-1">📧 三、发送和接受数据 <a class="header-anchor" href="#三、发送和接受数据" aria-label="Permalink to &quot;:email: 三、发送和接受数据&quot;">​</a></h2><ol><li><p>要向服务器发送数据，使用send()并传入一个<strong>字符串、ArrayBuffer或Bolb</strong></p><p><code>ws.send(&#39;123)</code></p></li><li><p>服务器向客户端发送消息时，WS对象上触发一个message事件，可以通过event.data属性访问到有效载荷,与send发送的数据类似，event.data返回的数据可能也是ArrayBuffer或Bolb。这是由WS对象的binaryType属性决定的，该属性可能是&#39;bolb&#39;或&#39;arraybuffer&#39;</p></li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">ws.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">){</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.data;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><br><h2 id="四、生命周期" tabindex="-1">🔋 四、生命周期 <a class="header-anchor" href="#四、生命周期" aria-label="Permalink to &quot;:battery: 四、生命周期&quot;">​</a></h2><ul><li>open：在连接成功建立时触发</li><li>error：在发生错误时触发。连接无法存续</li><li>close：在连接关闭时触发</li></ul><p>但是WebSocket 不支持DOM Level2 事件监听器，即不能使用addEventListener</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> WebSocket</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ws://www.example/websocket&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">ws.</span><span class="__shiki_1t8gfj">onopen</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(){</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">ws.</span><span class="__shiki_1t8gfj">onerror</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(){</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_21nrsd">// 这三个方法只有onclose方法的event对象有额外信息</span></span>
<span class="line"><span class="__shiki_21nrsd">// 这个对象上有三个额外属性，wasClean、code、reason</span></span>
<span class="line"><span class="__shiki_140thh">ws.</span><span class="__shiki_1t8gfj">onclose</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">){</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>这三个事件只有onclose方法的event对象有额外信息，可以将这些信息显示给用户或记录到日志。</p><p>这个对象上有三个额外属性，wasClean、code、reason</p><p>wasClean是个布尔值，代表连接是不干净的关闭</p><p>code是一个来自服务器的数值状态码</p><p>reason是一个字符串，包含服务器来的信息。</p><br><h2 id="五、心跳" tabindex="-1">💝 五、心跳 <a class="header-anchor" href="#五、心跳" aria-label="Permalink to &quot;:gift_heart: 五、心跳&quot;">​</a></h2><blockquote><p>心跳是为了保证ws通讯不间断的方法简单的说就是医生拿听筒听你的心跳证明你还活着。但是触发方式分为客户端触发和服务端触发。</p></blockquote><ol><li>客户端触发：如果是前端发送心跳，后端需要返回心跳，也就是ping pong的过程会有两次数据传递。</li><li>服务端触发：后端来发送心跳的话，就只需要发送ping，前端不需要回应。</li></ol><p>封装socket.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Socket</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /**</span></span>
<span class="line"><span class="__shiki_21nrsd">     * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 初始化实例属性，保存参数</span></span>
<span class="line"><span class="__shiki_21nrsd">     * </span></span>
<span class="line"><span class="__shiki_21nrsd">     */</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.url;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.callback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.received;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.name </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.pingInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 心跳检测频率</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">._timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.isHeart </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.isHeart;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.isReconnection </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.isReconnection;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1t8gfj">    connect</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> WebSocket</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.url);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 建立连接</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">onopen</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;open&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接成功&quot;</span><span class="__shiki_140thh">, e)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.isHeart) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 心跳</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_heartCheck</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 给后台发送数据</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh">(data </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> undefined</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({type: </span><span class="__shiki_mdbnqw">&#39;init&#39;</span><span class="__shiki_140thh">}))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 接受服务器返回的信息</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.callback </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;function&#39;</span><span class="__shiki_140thh">){</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callback</span><span class="__shiki_140thh">(e.data)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;参数的类型必须为函数&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 关闭连接</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">onclose</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;onclose&#39;</span><span class="__shiki_140thh">,e)</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_closeSocket</span><span class="__shiki_140thh">(e)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 报错</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">onerror</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;onerror&#39;</span><span class="__shiki_140thh">,e)</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_closeSocket</span><span class="__shiki_140thh">(e)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sendMsg</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> msg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(msg)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1t8gfj">    _resetHeart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clearInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.pingInterval)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1t8gfj">    _heartCheck</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.pingInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.ws.readyState </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({type: </span><span class="__shiki_mdbnqw">&#39;ping&#39;</span><span class="__shiki_140thh">}))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._timeout)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1t8gfj">    _closeSocket</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_resetHeart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;close&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;断开，重连&#39;</span><span class="__shiki_140thh">, e)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.isReconnection){</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 重连</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;手动关闭了&#39;</span><span class="__shiki_140thh">, e)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;close&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_resetHeart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>页面调用</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 引入文件</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;./socket.js&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    // 初始化</span></span>
<span class="line"><span class="__shiki_140thh">    const ws = new Socket({</span></span>
<span class="line"><span class="__shiki_140thh">        url: </span><span class="__shiki_mdbnqw">&#39;wss://www.example/websocket&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,			</span><span class="__shiki_21nrsd">// name</span></span>
<span class="line"><span class="__shiki_140thh">        isHeart:</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,			</span><span class="__shiki_21nrsd">// 是否心跳</span></span>
<span class="line"><span class="__shiki_140thh">        isReconnection:</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,		</span><span class="__shiki_21nrsd">// 是否断开重连</span></span>
<span class="line"><span class="__shiki_140thh">        received: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">){</span></span>
<span class="line"><span class="__shiki_21nrsd">        	// 监听服务器返回信息</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;received&quot;</span><span class="__shiki_140thh">,data)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    // 建立连接</span></span>
<span class="line"><span class="__shiki_140thh">    let data = {</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;init&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    ws.connect(data);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    // 发送消息</span></span>
<span class="line"><span class="__shiki_140thh">    let sendData = {</span></span>
<span class="line"><span class="__shiki_140thh">       type: </span><span class="__shiki_mdbnqw">&#39;sendMsg&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    ws.sendMsg(sendData)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    // 手动关闭</span></span>
<span class="line"><span class="__shiki_140thh">    ws.close()</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="六、class封装" tabindex="-1">🛡️ 六、class封装 <a class="header-anchor" href="#六、class封装" aria-label="Permalink to &quot;:shield: 六、class封装&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> WebsocketProps</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  url</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// WebSocket 连接地址</span></span>
<span class="line"><span class="__shiki_1jdh33">  reconnectInterval</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 重连间隔时间（毫秒）</span></span>
<span class="line"><span class="__shiki_1jdh33">  heartBeatInterval</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 心跳间隔时间（毫秒）</span></span>
<span class="line"><span class="__shiki_1jdh33">  isHeartbeatEnabled</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> boolean</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 是否开启心跳</span></span>
<span class="line"><span class="__shiki_1jdh33">  heartMessage</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 心跳消息</span></span>
<span class="line"><span class="__shiki_1jdh33">  maxReconnectAttempts</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 最大重连次数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Websocket</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  url</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  reconnectInterval</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  heartBeatInterval</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  isHeartbeatEnabled</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> boolean</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  heartMessage</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  maxReconnectAttempts</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> reconnectAttempts</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 当前重连尝试次数</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> ws</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> WebSocket</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// WebSocket 对象</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> heartBeatTimer</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> NodeJS</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Timeout</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 心跳定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> reconnectTimer</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> NodeJS</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Timeout</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 重连定时器</span></span>
<span class="line"><span class="__shiki_1t8gfj">  callback</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Function</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_1jdh33">      url</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">      reconnectInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 默认5秒</span></span>
<span class="line"><span class="__shiki_1jdh33">      heartBeatInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 默认10秒</span></span>
<span class="line"><span class="__shiki_1jdh33">      isHeartbeatEnabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">      heartMessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;hello&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">      maxReconnectAttempts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 默认5次</span></span>
<span class="line"><span class="__shiki_140thh">    }</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> WebsocketProps</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    callback</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Function</span></span>
<span class="line"><span class="__shiki_140thh">  ) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> url;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.reconnectInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> reconnectInterval;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.heartBeatInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> heartBeatInterval;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.isHeartbeatEnabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> isHeartbeatEnabled;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.heartMessage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> heartMessage;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxReconnectAttempts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxReconnectAttempts;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.reconnectAttempts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.heartBeatTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.reconnectTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">connectWs</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.callback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> callback;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 连接 Websocket</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1t8gfj"> connectWs</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">closeWs</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stopReconnectWs</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stopHeartBeat</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建 WebSocket 对象</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> WebSocket</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.url);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 打开</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">onopen</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.reconnectAttempts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.isHeartbeatEnabled </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startHeartBeat</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callback</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;open&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;连接成功&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 消息</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> { </span><span class="__shiki_1jdh33">data</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callback</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;message&quot;</span><span class="__shiki_140thh">, event.data);</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 关闭</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">onclose</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stopHeartBeat</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.reconnectAttempts </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxReconnectAttempts) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.reconnectTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.reconnectAttempts</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callback</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;close&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">\`第 \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">reconnectAttempts</span><span class="__shiki_mdbnqw">} 次尝试重连\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">connectWs</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.reconnectInterval);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stopReconnectWs</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callback</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;close&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">\`已达到最大重连次数，停止重连\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 发送消息</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1t8gfj"> sendMessage</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.ws?.readyState </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> WebSocket.</span><span class="__shiki_dzsirb">OPEN</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 开启心跳</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1t8gfj"> startHeartBeat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.heartBeatTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.ws?.readyState </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> WebSocket.</span><span class="__shiki_dzsirb">OPEN</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.heartMessage);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.heartBeatInterval);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 停止心跳</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1t8gfj"> stopHeartBeat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.heartBeatTimer) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      clearInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.heartBeatTimer);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.heartBeatTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 停止重连</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1t8gfj"> stopReconnectWs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.reconnectTimer) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      clearTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.reconnectTimer);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.reconnectTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 关闭连接</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1t8gfj"> closeWs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.ws) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.ws.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 调用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> initWebsocket</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> ws</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Websocket</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    { url: </span><span class="__shiki_mdbnqw">&quot;ws://127.0.0.1&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(type);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(ws);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">initWebsocket</span><span class="__shiki_140thh">();</span></span></code></pre></div>`,35)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
