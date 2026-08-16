import{_ as a,o as n,c as p,a as l}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"📺 了解直播/实时监控 需要掌握的背景知识","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/media/live/protocol.md","filePath":"frontend/media/live/protocol.md"}'),i={name:"frontend/media/live/protocol.md"};function t(h,s,e,_,c,d){return n(),p("div",null,[...s[0]||(s[0]=[l(`<h1 id="📺-了解直播-实时监控-需要掌握的背景知识" tabindex="-1">📺 了解直播/实时监控 需要掌握的背景知识 <a class="header-anchor" href="#📺-了解直播-实时监控-需要掌握的背景知识" aria-label="Permalink to &quot;📺 了解直播/实时监控 需要掌握的背景知识&quot;">​</a></h1><ul><li>🚩 <a href="https://driverzhang.github.io/post/%E7%9B%B4%E6%92%AD%E5%8D%8F%E8%AE%AErtmphlshttp-flv/" target="_blank">直播流(协议)有哪些？</a></li><li>🚩 <a href="https://www.jianshu.com/p/32417d8ee5b6" target="_blank">理解RTMP、HttpFlv和HLS</a></li><li>🚩 <a href="https://blog.csdn.net/daocaokafei/article/details/127098972" target="_blank">什么是RTMP 和 RTSP？</a></li><li>🚩 <a href="https://zhuanlan.zhihu.com/p/151341201" target="_blank">什么是推拉流</a></li></ul><h2 id="✏️-一、简单总结" tabindex="-1">✏️ 一、简单总结 <a class="header-anchor" href="#✏️-一、简单总结" aria-label="Permalink to &quot;✏️ 一、简单总结&quot;">​</a></h2><ol><li>常见的直播流协议有RTSP, RTMP, HLS, HTTPFLV等</li><li>流媒体分为推流端，流媒体服务器和拉流端。记住两端加一服。推流是采集视频信号到服务器，拉流是从服务器接受数据。</li><li>RTMP可以应用在推拉流的双端，WEB网页中需要使用RTMP需要安装插件。优点兼容性好（服务器端）、低延迟，缺点需要网页端不支持并且需要插件。其中监控领域海康大华都是将采集到的RTSP数据需转为RTMP流进行推送。并且现在flv.js库解封包使得RTMP也可以在网页端直接播放了。</li><li>RTSP广泛应用于摄像机、无人机和物流网设备中，优点延迟低，缺点视频播放器和流媒体服务器并未广泛支持，所以通常需要通过ffmpeg库将RTSP流转换为RTMP来进行推流。</li><li>HLS只能使用在拉流端，适用于苹果和PC还有移动端，H5的video标签可以直接对其进行播放。优点兼容性好无需插件，缺点延时较RTMP大。</li><li>HTTP-FLV 本来在H5中需要使用插件，需要Flash支持，兼容性差。有了flv.js出现后则打破了以上问题。直播平台和手机直播使用的比较多。</li></ol><br><h2 id="🎯-二、推拉流的示意图" tabindex="-1">🎯 二、推拉流的示意图 <a class="header-anchor" href="#🎯-二、推拉流的示意图" aria-label="Permalink to &quot;🎯 二、推拉流的示意图&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">---</span></span>
<span class="line"><span class="__shiki_140thh">title: 推拉流的示意图</span></span>
<span class="line"><span class="__shiki_140thh">---</span></span>
<span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">   subgraph 推流端</span></span>
<span class="line"><span class="__shiki_140thh">     A[推流端]</span></span>
<span class="line"><span class="__shiki_140thh">   end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">   subgraph 源站</span></span>
<span class="line"><span class="__shiki_140thh">     B[源站]</span></span>
<span class="line"><span class="__shiki_140thh">   end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">   subgraph CDN网络</span></span>
<span class="line"><span class="__shiki_140thh">     C[CDN节点]</span></span>
<span class="line"><span class="__shiki_140thh">     D[CDN节点]</span></span>
<span class="line"><span class="__shiki_140thh">   end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">   subgraph 播放端集群</span></span>
<span class="line"><span class="__shiki_140thh">     E[4 RTMP拉流播放端]</span></span>
<span class="line"><span class="__shiki_140thh">     F[5 RTMP拉流播放端]</span></span>
<span class="line"><span class="__shiki_140thh">     G[6 HLS拉流播放端]</span></span>
<span class="line"><span class="__shiki_140thh">     H[7 HTTP-FLV拉流播放端]</span></span>
<span class="line"><span class="__shiki_140thh">     I[8 RTMP拉流播放端]</span></span>
<span class="line"><span class="__shiki_140thh">   end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">   A -- 1 上行RTMP推流 --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">   B -- 2 RTMP拉流 --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">   B -- 3 RTMP拉流 --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">   D --&gt; E</span></span>
<span class="line"><span class="__shiki_140thh">   D --&gt; F</span></span>
<span class="line"><span class="__shiki_140thh">   D --&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">   D --&gt; H</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">   classDef push fill:#e6f7ff,stroke:#1890ff,stroke-width:2px</span></span>
<span class="line"><span class="__shiki_140thh">   classDef cdn fill:#f6ffed,stroke:#52c41a,stroke-width:2px</span></span>
<span class="line"><span class="__shiki_140thh">   classDef pull fill:#fff7e6,stroke:#fa8c16,stroke-width:2px</span></span>
<span class="line"><span class="__shiki_140thh">   class A,B push</span></span>
<span class="line"><span class="__shiki_140thh">   class C,D cdn</span></span>
<span class="line"><span class="__shiki_140thh">   class E,F,G,H,I pull</span></span></code></pre></div><br><h2 id="💬-三、推流码构成" tabindex="-1">💬 三、推流码构成 <a class="header-anchor" href="#💬-三、推流码构成" aria-label="Permalink to &quot;💬 三、推流码构成&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">ffmpeg</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> input.mp4</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> copy</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> flv</span><span class="__shiki_mdbnqw"> &quot;rtmp://服务器地址/目录名/节点名?streamkey=密钥内容&quot;</span></span></code></pre></div><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">---</span></span>
<span class="line"><span class="__shiki_140thh">title: 推流码构成</span></span>
<span class="line"><span class="__shiki_140thh">---</span></span>
<span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[RTMP推流码] --&gt; B[URL]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Stream Key]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    %% URL部分</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[协议: rtmp://]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[服务器地址]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[目录名]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; G[节点名]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; H[固定值]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; I[示例: xxx]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; J[示例: xxx]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; K[示例: xxxxx]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    %% Stream Key部分</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; L[密钥内容]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; M[示例: xxxxxx]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    %% 样式定义</span></span>
<span class="line"><span class="__shiki_140thh">    classDef header fill:#2e86c1,stroke:#1b4f72,color:white;</span></span>
<span class="line"><span class="__shiki_140thh">    classDef url fill:#85c1e9,stroke:#3498db;</span></span>
<span class="line"><span class="__shiki_140thh">    classDef key fill:#82e0aa,stroke:#27ae60;</span></span>
<span class="line"><span class="__shiki_140thh">    classDef example fill:#f7f9f9,stroke:#bdc3c7;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    class A header;</span></span>
<span class="line"><span class="__shiki_140thh">    class B,C url;</span></span>
<span class="line"><span class="__shiki_140thh">    class D,E,F,G url;</span></span>
<span class="line"><span class="__shiki_140thh">    class L key;</span></span>
<span class="line"><span class="__shiki_140thh">    class H,I,J,K,M example;</span></span></code></pre></div><br><h2 id="📐-四、视频流传输协议的对比" tabindex="-1">📐 四、视频流传输协议的对比 <a class="header-anchor" href="#📐-四、视频流传输协议的对比" aria-label="Permalink to &quot;📐 四、视频流传输协议的对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>协议</th><th>传输方式</th><th>视频封装格式</th><th>延时</th><th>数据分段</th><th>HTML5播放支持</th></tr></thead><tbody><tr><td><strong>HTTP-FLV/WS-FLV</strong></td><td>HTTP/WebSocket</td><td>FLV</td><td>低</td><td>连续流</td><td>通过flv.js库解封包</td></tr><tr><td><strong>RTSP</strong></td><td>UDP、TCP</td><td>TS、MP4</td><td>低</td><td>数据包、连续流</td><td>不支持</td></tr><tr><td><strong>RTMP</strong></td><td>TCP</td><td>FLV、TGA</td><td>低</td><td>切片文件</td><td>通过flv.js库解封</td></tr><tr><td><strong>HLS</strong></td><td>HTTP</td><td>TS</td><td>高</td><td>切片文件</td><td>支持</td></tr><tr><td><strong>DASH</strong></td><td>HTTP</td><td>MP4、3GP、WebM</td><td>高</td><td>切片文件</td><td>MP4和WebM文件可直接播放</td></tr></tbody></table><br><p>像安防实时监控领域，前端这边涉及到的就是如何从服务器拉流然后展示给客户，重点也就是获取rtsp地址和通道号，具体如何使用不在本篇文章中，像海康、大华等一般都有完整的开发手册供参考。</p>`,16)])])}const k=a(i,[["render",t]]);export{o as __pageData,k as default};
