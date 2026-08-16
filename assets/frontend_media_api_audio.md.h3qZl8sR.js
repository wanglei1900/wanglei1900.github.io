import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Web Audio API 高级应用指南","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/media/api/audio.md","filePath":"frontend/media/api/audio.md"}'),p={name:"frontend/media/api/audio.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="web-audio-api-高级应用指南" tabindex="-1">Web Audio API 高级应用指南 <a class="header-anchor" href="#web-audio-api-高级应用指南" aria-label="Permalink to &quot;Web Audio API 高级应用指南&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><ul><li><a href="#核心概念回顾">核心概念回顾</a></li><li><a href="#高级音频处理技术">高级音频处理技术</a></li><li><a href="#音频可视化与响应式设计">音频可视化与响应式设计</a></li><li><a href="#空间音频与3d音效">空间音频与3D音效</a></li><li><a href="#音频合成与采样">音频合成与采样</a></li><li><a href="#性能优化策略">性能优化策略</a></li><li><a href="#实时音频处理">实时音频处理</a></li><li><a href="#应用案例">应用案例</a></li><li><a href="#调试与工具">调试与工具</a></li></ul><hr><h2 id="核心概念回顾" tabindex="-1">核心概念回顾 <a class="header-anchor" href="#核心概念回顾" aria-label="Permalink to &quot;核心概念回顾&quot;">​</a></h2><h3 id="web-audio-api-架构" tabindex="-1">Web Audio API 架构 <a class="header-anchor" href="#web-audio-api-架构" aria-label="Permalink to &quot;Web Audio API 架构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[音频源] --&gt; B[音频处理节点]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[分析节点]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[效果节点]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; E[可视化]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[输出节点]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[扬声器]</span></span></code></pre></div><h3 id="基础组件" tabindex="-1">基础组件 <a class="header-anchor" href="#基础组件" aria-label="Permalink to &quot;基础组件&quot;">​</a></h3><ol><li><strong>AudioContext</strong> - 音频处理的核心容器</li><li><strong>AudioNode</strong> - 音频处理单元（源、处理、目标）</li><li><strong>AudioParam</strong> - 可自动化控制的音频参数</li><li><strong>AudioBuffer</strong> - 内存中的音频数据</li></ol><h3 id="初始化示例" tabindex="-1">初始化示例 <a class="header-anchor" href="#初始化示例" aria-label="Permalink to &quot;初始化示例&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建音频上下文</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> audioCtx</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> (window.AudioContext </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> window.webkitAudioContext)();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建振荡器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> oscillator</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createOscillator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">oscillator.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sine&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">oscillator.frequency.</span><span class="__shiki_1t8gfj">setValueAtTime</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">440</span><span class="__shiki_140thh">, audioCtx.currentTime);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建增益节点</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> gainNode</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createGain</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">gainNode.gain.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 连接节点</span></span>
<span class="line"><span class="__shiki_140thh">oscillator.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(gainNode);</span></span>
<span class="line"><span class="__shiki_140thh">gainNode.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 播放</span></span>
<span class="line"><span class="__shiki_140thh">oscillator.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span></code></pre></div><hr><h2 id="高级音频处理技术" tabindex="-1">高级音频处理技术 <a class="header-anchor" href="#高级音频处理技术" aria-label="Permalink to &quot;高级音频处理技术&quot;">​</a></h2><h3 id="复杂效果链" tabindex="-1">复杂效果链 <a class="header-anchor" href="#复杂效果链" aria-label="Permalink to &quot;复杂效果链&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> createEffectChain</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">audioBuffer</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建源节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBufferSource</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> audioBuffer;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建效果节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> compressor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createDynamicsCompressor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> delay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createDelay</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> filter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBiquadFilter</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> convolver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createConvolver</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> gain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createGain</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加载脉冲响应（混响）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;impulse.wav&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> arrayBuffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">arrayBuffer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    convolver.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">decodeAudioData</span><span class="__shiki_140thh">(arrayBuffer);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置效果参数</span></span>
<span class="line"><span class="__shiki_140thh">    delay.delayTime.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    filter.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;lowpass&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    filter.frequency.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1500</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    gain.gain.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建效果链</span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(compressor);</span></span>
<span class="line"><span class="__shiki_140thh">    compressor.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(delay);</span></span>
<span class="line"><span class="__shiki_140thh">    delay.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(filter);</span></span>
<span class="line"><span class="__shiki_140thh">    filter.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(convolver);</span></span>
<span class="line"><span class="__shiki_140thh">    convolver.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(gain);</span></span>
<span class="line"><span class="__shiki_140thh">    gain.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> source;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="自定义audioworklet处理器" tabindex="-1">自定义AudioWorklet处理器 <a class="header-anchor" href="#自定义audioworklet处理器" aria-label="Permalink to &quot;自定义AudioWorklet处理器&quot;">​</a></h3><p><strong>custom-processor.js</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CustomProcessor</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> AudioWorkletProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> get</span><span class="__shiki_1t8gfj"> parameterDescriptors</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> [{</span></span>
<span class="line"><span class="__shiki_140thh">            name: </span><span class="__shiki_mdbnqw">&#39;distortion&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            defaultValue: </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            minValue: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            maxValue: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">        }];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    process</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">inputs</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">outputs</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parameters</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> input</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> inputs[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> output</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> outputs[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> distortion</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> parameters.distortion[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> channel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; channel </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> input.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; channel</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> input[channel].</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 应用失真效果</span></span>
<span class="line"><span class="__shiki_1itgoe">                let</span><span class="__shiki_140thh"> sample </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> input[channel][i];</span></span>
<span class="line"><span class="__shiki_140thh">                sample </span><span class="__shiki_1itgoe">*=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> distortion </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                output[channel][i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">tanh</span><span class="__shiki_140thh">(sample);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">registerProcessor</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;custom-processor&#39;</span><span class="__shiki_140thh">, CustomProcessor);</span></span></code></pre></div><p><strong>主线程代码</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 注册并创建AudioWorkletNode</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> audioCtx.audioWorklet.</span><span class="__shiki_1t8gfj">addModule</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;custom-processor.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> customNode</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AudioWorkletNode</span><span class="__shiki_140thh">(audioCtx, </span><span class="__shiki_mdbnqw">&#39;custom-processor&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 连接节点</span></span>
<span class="line"><span class="__shiki_140thh">source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(customNode);</span></span>
<span class="line"><span class="__shiki_140thh">customNode.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实时控制参数</span></span>
<span class="line"><span class="__shiki_140thh">customNode.parameters.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;distortion&#39;</span><span class="__shiki_140thh">).value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">;</span></span></code></pre></div><hr><h2 id="音频可视化与响应式设计" tabindex="-1">音频可视化与响应式设计 <a class="header-anchor" href="#音频可视化与响应式设计" aria-label="Permalink to &quot;音频可视化与响应式设计&quot;">​</a></h2><h3 id="高级频谱分析" tabindex="-1">高级频谱分析 <a class="header-anchor" href="#高级频谱分析" aria-label="Permalink to &quot;高级频谱分析&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> setupVisualizer</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analyser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createAnalyser</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    analyser.fftSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(analyser);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bufferLength</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> analyser.frequencyBinCount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dataArray</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(bufferLength);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    function</span><span class="__shiki_1t8gfj"> draw</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        requestAnimationFrame</span><span class="__shiki_140thh">(draw);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取频率数据</span></span>
<span class="line"><span class="__shiki_140thh">        analyser.</span><span class="__shiki_1t8gfj">getByteFrequencyData</span><span class="__shiki_140thh">(dataArray);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取时域数据</span></span>
<span class="line"><span class="__shiki_21nrsd">        // analyser.getByteTimeDomainData(dataArray);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 绘制到Canvas</span></span>
<span class="line"><span class="__shiki_140thh">        canvasCtx.</span><span class="__shiki_1t8gfj">clearRect</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, canvas.width, canvas.height);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建波形或频谱图</span></span>
<span class="line"><span class="__shiki_1t8gfj">        drawSpectrum</span><span class="__shiki_140thh">(dataArray, bufferLength);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    draw</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> drawSpectrum</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dataArray</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">bufferLength</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> barWidth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (canvas.width </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> bufferLength) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2.5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> barHeight;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> bufferLength; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        barHeight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> dataArray[i] </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建颜色渐变</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> hue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> bufferLength </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 360</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        canvasCtx.fillStyle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`hsl(\${</span><span class="__shiki_140thh">hue</span><span class="__shiki_mdbnqw">}, 100%, 50%)\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        canvasCtx.</span><span class="__shiki_1t8gfj">fillRect</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            x,</span></span>
<span class="line"><span class="__shiki_140thh">            canvas.height </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> barHeight,</span></span>
<span class="line"><span class="__shiki_140thh">            barWidth,</span></span>
<span class="line"><span class="__shiki_140thh">            barHeight</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        x </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> barWidth </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="响应式音频参数" tabindex="-1">响应式音频参数 <a class="header-anchor" href="#响应式音频参数" aria-label="Permalink to &quot;响应式音频参数&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 根据设备性能调整质量</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isLowPower</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> navigator.hardwareConcurrency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">analyser.fftSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> isLowPower </span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb"> 512</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 响应屏幕方向变化</span></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;resize&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> isPortrait</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> window.innerHeight </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> window.innerWidth;</span></span>
<span class="line"><span class="__shiki_140thh">    filter.frequency.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> isPortrait </span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 基于网络条件调整缓冲</span></span>
<span class="line"><span class="__shiki_140thh">navigator.connection.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;change&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">effectiveType</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> navigator.connection;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bufferSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> effectiveType </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;4g&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> adjustBufferSize</span><span class="__shiki_140thh">(source.buffer, bufferSize);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><hr><h2 id="空间音频与3d音效" tabindex="-1">空间音频与3D音效 <a class="header-anchor" href="#空间音频与3d音效" aria-label="Permalink to &quot;空间音频与3D音效&quot;">​</a></h2><h3 id="_3d音频定位" tabindex="-1">3D音频定位 <a class="header-anchor" href="#_3d音频定位" aria-label="Permalink to &quot;3D音频定位&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> create3DAudio</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建空间音频节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> panner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createPanner</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    panner.panningModel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;HRTF&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.distanceModel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;inverse&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.refDistance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.maxDistance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.rolloffFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.coneInnerAngle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 360</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.coneOuterAngle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    panner.coneOuterGain </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置初始位置</span></span>
<span class="line"><span class="__shiki_140thh">    panner.</span><span class="__shiki_1t8gfj">setPosition</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接音频源</span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(panner);</span></span>
<span class="line"><span class="__shiki_140thh">    panner.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> panner;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 更新位置（例如基于鼠标移动）</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> updatePosition</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">panner</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">x</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">y</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">z</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    panner.</span><span class="__shiki_1t8gfj">setPosition</span><span class="__shiki_140thh">(x, y, z);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多普勒效应模拟</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> applyDopplerEffect</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">panner</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">velocity</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dopplerFactor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1.5</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 多普勒强度</span></span>
<span class="line"><span class="__shiki_140thh">    panner.</span><span class="__shiki_1t8gfj">setVelocity</span><span class="__shiki_140thh">(velocity.x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> dopplerFactor, </span></span>
<span class="line"><span class="__shiki_140thh">                      velocity.y </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> dopplerFactor, </span></span>
<span class="line"><span class="__shiki_140thh">                      velocity.z </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> dopplerFactor);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="环境混响" tabindex="-1">环境混响 <a class="header-anchor" href="#环境混响" aria-label="Permalink to &quot;环境混响&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> createReverb</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> convolver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createConvolver</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加载脉冲响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cathedral-impulse.wav&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> arrayBuffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">arrayBuffer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    convolver.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">decodeAudioData</span><span class="__shiki_140thh">(arrayBuffer);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> convolver;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 动态调整混响</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> adjustReverb</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">convolver</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">size</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据空间大小调整参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> lowPass</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBiquadFilter</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    lowPass.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;lowpass&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    lowPass.frequency.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    convolver.</span><span class="__shiki_1t8gfj">disconnect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    convolver.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(lowPass);</span></span>
<span class="line"><span class="__shiki_140thh">    lowPass.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="音频合成与采样" tabindex="-1">音频合成与采样 <a class="header-anchor" href="#音频合成与采样" aria-label="Permalink to &quot;音频合成与采样&quot;">​</a></h2><h3 id="高级合成器" tabindex="-1">高级合成器 <a class="header-anchor" href="#高级合成器" aria-label="Permalink to &quot;高级合成器&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Synthesizer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.oscillators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.lfos </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    playNote</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">note</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">velocity</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> osc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createOscillator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> gain</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createGain</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置ADSR包络</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.currentTime;</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">setValueAtTime</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, now);</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">linearRampToValueAtTime</span><span class="__shiki_140thh">(velocity, now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// Attack</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">exponentialRampToValueAtTime</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">, now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// Decay</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">setValueAtTime</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">, now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// Sustain</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用LFO</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> lfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createLFO</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        lfo.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(osc.frequency);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        osc.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sawtooth&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        osc.frequency.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 440</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, (note </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 69</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        osc.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(gain);</span></span>
<span class="line"><span class="__shiki_140thh">        gain.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">        osc.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 存储引用</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.oscillators.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(note, { osc, gain, lfo });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    releaseNote</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">note</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">gain</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.oscillators.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(note);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.currentTime;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Release阶段</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">cancelScheduledValues</span><span class="__shiki_140thh">(now);</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">setValueAtTime</span><span class="__shiki_140thh">(gain.gain.value, now);</span></span>
<span class="line"><span class="__shiki_140thh">        gain.gain.</span><span class="__shiki_1t8gfj">exponentialRampToValueAtTime</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.001</span><span class="__shiki_140thh">, now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 停止振荡器</span></span>
<span class="line"><span class="__shiki_1t8gfj">        setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.oscillators.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(note)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.oscillators.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(note).osc.</span><span class="__shiki_1t8gfj">stop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.oscillators.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(note);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    createLFO</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> lfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createOscillator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> depth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createGain</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        lfo.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sine&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        lfo.frequency.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 低频振荡</span></span>
<span class="line"><span class="__shiki_140thh">        depth.gain.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 调制深度</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        lfo.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(depth);</span></span>
<span class="line"><span class="__shiki_140thh">        lfo.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.lfos.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(lfo, depth);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> depth;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="采样器与切片" tabindex="-1">采样器与切片 <a class="header-anchor" href="#采样器与切片" aria-label="Permalink to &quot;采样器与切片&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Sampler</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.buffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> loadSample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(url);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> arrayBuffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">arrayBuffer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">decodeAudioData</span><span class="__shiki_140thh">(arrayBuffer);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.buffers.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(name, buffer);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    playSample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.buffers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(name);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">buffer) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBufferSource</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buffer;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置播放参数</span></span>
<span class="line"><span class="__shiki_140thh">        source.playbackRate.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rate;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接输出</span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 播放片段</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> actualDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> buffer.duration </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start;</span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, start, actualDuration);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> source;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    createSlicePoints</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">buffer</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">threshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> buffer.</span><span class="__shiki_1t8gfj">getChannelData</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> slicePoints</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> inSlice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> data.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (Math.</span><span class="__shiki_1t8gfj">abs</span><span class="__shiki_140thh">(data[i]) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> threshold) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">inSlice) {</span></span>
<span class="line"><span class="__shiki_140thh">                    slicePoints.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(i </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> buffer.sampleRate);</span></span>
<span class="line"><span class="__shiki_140thh">                    inSlice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                inSlice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> slicePoints;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="性能优化策略" tabindex="-1">性能优化策略 <a class="header-anchor" href="#性能优化策略" aria-label="Permalink to &quot;性能优化策略&quot;">​</a></h2><h3 id="优化技术对比" tabindex="-1">优化技术对比 <a class="header-anchor" href="#优化技术对比" aria-label="Permalink to &quot;优化技术对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>技术</th><th>适用场景</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>AudioWorklet</strong></td><td>实时处理</td><td>高性能，不阻塞主线程</td><td>开发复杂</td></tr><tr><td><strong>OfflineAudioContext</strong></td><td>预处理</td><td>避免实时计算开销</td><td>不能实时处理</td></tr><tr><td><strong>节点复用</strong></td><td>频繁创建/销毁</td><td>减少GC压力</td><td>增加内存占用</td></tr><tr><td><strong>参数自动化</strong></td><td>动画效果</td><td>精确时间控制</td><td>可能增加计算量</td></tr></tbody></table><h3 id="内存管理" tabindex="-1">内存管理 <a class="header-anchor" href="#内存管理" aria-label="Permalink to &quot;内存管理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 释放音频资源</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> releaseAudioResources</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 断开所有节点连接</span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">disconnect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 释放AudioBuffer</span></span>
<span class="line"><span class="__shiki_140thh">    source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 关闭AudioContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (audioCtx.state </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;closed&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        audioCtx.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清除引用</span></span>
<span class="line"><span class="__shiki_140thh">    source </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    audioCtx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用对象池</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sourcePool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> getBufferSource</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (sourcePool.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> sourcePool.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBufferSource</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> releaseBufferSource</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">disconnect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sourcePool.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(source);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="负载监控" tabindex="-1">负载监控 <a class="header-anchor" href="#负载监控" aria-label="Permalink to &quot;负载监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 监控处理负载</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> monitorPerformance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> processor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AudioWorkletNode</span><span class="__shiki_140thh">(audioCtx, </span><span class="__shiki_mdbnqw">&#39;performance-monitor&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    processor.port.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1jdh33"> event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">cpuUsage</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">droppedFrames</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.data;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cpuUsage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            reduceQuality</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (droppedFrames </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            reduceBufferSize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> reduceQuality</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 降低处理质量</span></span>
<span class="line"><span class="__shiki_140thh">    analyser.fftSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh">, analyser.fftSize </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    filter.</span><span class="__shiki_dzsirb">Q</span><span class="__shiki_140thh">.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, filter.</span><span class="__shiki_dzsirb">Q</span><span class="__shiki_140thh">.value </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1.5</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="实时音频处理" tabindex="-1">实时音频处理 <a class="header-anchor" href="#实时音频处理" aria-label="Permalink to &quot;实时音频处理&quot;">​</a></h2><h3 id="流处理与mediastream" tabindex="-1">流处理与MediaStream <a class="header-anchor" href="#流处理与mediastream" aria-label="Permalink to &quot;流处理与MediaStream&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 从麦克风获取输入</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> processMicrophoneInput</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.mediaDevices.</span><span class="__shiki_1t8gfj">getUserMedia</span><span class="__shiki_140thh">({ audio: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createMediaStreamSource</span><span class="__shiki_140thh">(stream);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建处理链</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> processor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createScriptProcessor</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    processor.</span><span class="__shiki_1t8gfj">onaudioprocess</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1jdh33"> event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> input</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.inputBuffer.</span><span class="__shiki_1t8gfj">getChannelData</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> output</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.outputBuffer.</span><span class="__shiki_1t8gfj">getChannelData</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实时处理（例如：实时变声）</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> input.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            output[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> input[i] </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.5</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 简单增益</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(processor);</span></span>
<span class="line"><span class="__shiki_140thh">    processor.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 处理WebRTC流</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> processWebRTCStream</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stream</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createMediaStreamSource</span><span class="__shiki_140thh">(stream);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建降噪节点</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> noiseSuppressor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createNoiseSuppressor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建回声消除</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> echoCanceller</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createEchoCanceller</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接处理链</span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(noiseSuppressor);</span></span>
<span class="line"><span class="__shiki_140thh">    noiseSuppressor.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(echoCanceller);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建输出流</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> destination</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createMediaStreamDestination</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    echoCanceller.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(destination);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> destination.stream;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="实时分析" tabindex="-1">实时分析 <a class="header-anchor" href="#实时分析" aria-label="Permalink to &quot;实时分析&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> setupRealTimeAnalysis</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> analyser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createAnalyser</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    analyser.fftSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2048</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dataArray</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(analyser.frequencyBinCount);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(analyser);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    function</span><span class="__shiki_1t8gfj"> analyze</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        requestAnimationFrame</span><span class="__shiki_140thh">(analyze);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取频率数据</span></span>
<span class="line"><span class="__shiki_140thh">        analyser.</span><span class="__shiki_1t8gfj">getByteFrequencyData</span><span class="__shiki_140thh">(dataArray);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实时节拍检测</span></span>
<span class="line"><span class="__shiki_1t8gfj">        detectBeat</span><span class="__shiki_140thh">(dataArray);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实时音高检测</span></span>
<span class="line"><span class="__shiki_1t8gfj">        detectPitch</span><span class="__shiki_140thh">(dataArray);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    analyze</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> detectBeat</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dataArray</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算能量</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> energy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> dataArray.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        energy </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> dataArray[i] </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 255</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    energy </span><span class="__shiki_1itgoe">/=</span><span class="__shiki_140thh"> dataArray.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 简单节拍检测</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (energy </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> lastBeat </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        triggerBeatEffect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        lastBeat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="应用案例" tabindex="-1">应用案例 <a class="header-anchor" href="#应用案例" aria-label="Permalink to &quot;应用案例&quot;">​</a></h2><h3 id="交互式音乐应用" tabindex="-1">交互式音乐应用 <a class="header-anchor" href="#交互式音乐应用" aria-label="Permalink to &quot;交互式音乐应用&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> InteractiveMusicPlayer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.tracks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.effects </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.currentBeat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> loadTrack</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(url);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> arrayBuffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">arrayBuffer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">decodeAudioData</span><span class="__shiki_140thh">(arrayBuffer);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.tracks.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(name, buffer);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    playTrack</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">bpm</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 120</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.tracks.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(name);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">buffer) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建源节点</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBufferSource</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buffer;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置节拍检测</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupBeatDetection</span><span class="__shiki_140thh">(source, bpm);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接主输出</span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    setupBeatDetection</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">bpm</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> beatInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> bpm </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// ms per beat</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">onended</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.beatInterval);</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.beatInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.currentBeat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.currentBeat </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">onBeat</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.currentBeat);</span></span>
<span class="line"><span class="__shiki_140thh">        }, beatInterval);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    onBeat</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">beatNumber</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 触发视觉效果</span></span>
<span class="line"><span class="__shiki_1t8gfj">        visualizeBeat</span><span class="__shiki_140thh">(beatNumber);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用节奏效果</span></span>
<span class="line"><span class="__shiki_1t8gfj">        applyBeatEffect</span><span class="__shiki_140thh">(beatNumber);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    addEffect</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">effectNode</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.effects.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(name, effectNode);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    applyEffectToTrack</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">trackName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">effectName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.tracks.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(trackName);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> effect</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.effects.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(effectName);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (source </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> effect) {</span></span>
<span class="line"><span class="__shiki_140thh">            source.</span><span class="__shiki_1t8gfj">disconnect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(effect.input);</span></span>
<span class="line"><span class="__shiki_140thh">            effect.output.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="游戏音频系统" tabindex="-1">游戏音频系统 <a class="header-anchor" href="#游戏音频系统" aria-label="Permalink to &quot;游戏音频系统&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> GameAudioEngine</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.sounds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.listenerPosition </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { x: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, y: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, z: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.environment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;indoor&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> loadSound</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(url);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> arrayBuffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">arrayBuffer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">decodeAudioData</span><span class="__shiki_140thh">(arrayBuffer);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.sounds.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(name, buffer);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    playSound</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">position</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sounds.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(name);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">buffer) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> source</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBufferSource</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        source.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buffer;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建3D音效</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> panner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createPanner</span><span class="__shiki_140thh">(position);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用环境效果</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> envEffect</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createEnvironmentEffect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(envEffect);</span></span>
<span class="line"><span class="__shiki_140thh">        envEffect.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(panner);</span></span>
<span class="line"><span class="__shiki_140thh">        panner.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(audioCtx.destination);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        source.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> source;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    createPanner</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">position</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> panner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createPanner</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        panner.panningModel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;HRTF&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        panner.</span><span class="__shiki_1t8gfj">setPosition</span><span class="__shiki_140thh">(position.x, position.y, position.z);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置听众位置</span></span>
<span class="line"><span class="__shiki_140thh">        audioCtx.listener.</span><span class="__shiki_1t8gfj">setPosition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.listenerPosition.x,</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.listenerPosition.y,</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.listenerPosition.z</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> panner;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    createEnvironmentEffect</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> effect</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createGain</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.environment </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;cave&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> convolver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createReverb</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cave-impulse.wav&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            effect.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(convolver);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> convolver;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.environment </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;underwater&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> filter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createBiquadFilter</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            filter.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;lowpass&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            filter.frequency.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 800</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            effect.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(filter);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> filter;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> effect;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    setEnvironment</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">env</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.environment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> env;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="调试与工具" tabindex="-1">调试与工具 <a class="header-anchor" href="#调试与工具" aria-label="Permalink to &quot;调试与工具&quot;">​</a></h2><h3 id="调试技巧" tabindex="-1">调试技巧 <a class="header-anchor" href="#调试技巧" aria-label="Permalink to &quot;调试技巧&quot;">​</a></h3><ol><li><p><strong>上下文状态监控</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;AudioContext state:&#39;</span><span class="__shiki_140thh">, audioCtx.state);</span></span>
<span class="line"><span class="__shiki_140thh">audioCtx.</span><span class="__shiki_1t8gfj">onstatechange</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;State changed to:&#39;</span><span class="__shiki_140thh">, audioCtx.state);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div></li><li><p><strong>节点连接可视化</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> visualizeNodeGraph</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用Chrome开发者工具中的Web Audio Inspector</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 或实现自定义节点图可视化</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li><li><p><strong>实时参数监控</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> monitorParam</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">param</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} value:\`</span><span class="__shiki_140thh">, param.value);</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li></ol><h3 id="开发工具" tabindex="-1">开发工具 <a class="header-anchor" href="#开发工具" aria-label="Permalink to &quot;开发工具&quot;">​</a></h3><ol><li><p><strong>浏览器开发者工具</strong></p><ul><li>Chrome: Web Audio Inspector</li><li>Firefox: Web Audio Editor</li></ul></li><li><p><strong>可视化工具</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Canvas绘制节点图</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> drawNodeGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">nodes</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">canvas</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 实现节点图可视化</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li><li><p><strong>性能分析工具</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Performance API</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> startProfiling</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    performance.</span><span class="__shiki_1t8gfj">mark</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;audio-start&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> endProfiling</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    performance.</span><span class="__shiki_1t8gfj">mark</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;audio-end&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    performance.</span><span class="__shiki_1t8gfj">measure</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;audio-processing&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;audio-start&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;audio-end&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> performance.</span><span class="__shiki_1t8gfj">getEntriesByName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;audio-processing&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].duration;</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Processing time: \${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li></ol><h3 id="兼容性处理" tabindex="-1">兼容性处理 <a class="header-anchor" href="#兼容性处理" aria-label="Permalink to &quot;兼容性处理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 功能检测</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;AudioContext&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    showUnsupportedBrowserMessage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 回退方案</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> createSafeOscillator</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (audioCtx.createOscillator) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> audioCtx.</span><span class="__shiki_1t8gfj">createOscillator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 简单的Web Audio API polyfill</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Oscillator started (simulated)&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_1t8gfj">        connect</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Connected (simulated)&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><blockquote><p><strong>最佳实践总结</strong>：</p><ol><li>优先使用AudioWorklet进行高性能处理</li><li>合理管理音频资源生命周期</li><li>根据设备能力动态调整处理复杂度</li><li>使用空间音频增强沉浸感</li><li>实现实时音频分析驱动视觉效果</li><li>提供兼容性回退方案</li></ol></blockquote><p>通过深入应用Web Audio API的高级功能，可以创建专业级的音频应用，包括交互式音乐应用、游戏音频引擎、专业音频处理器等。不断探索API的新特性和优化技术，将带来更出色的音频体验。</p>`,69)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
