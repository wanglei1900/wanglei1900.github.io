import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"前端浏览器与设备硬件对接方案学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/browser/device/hardware-integration.md","filePath":"frontend/browser/device/hardware-integration.md"}'),p={name:"frontend/browser/device/hardware-integration.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="前端浏览器与设备硬件对接方案学习笔记" tabindex="-1">前端浏览器与设备硬件对接方案学习笔记 <a class="header-anchor" href="#前端浏览器与设备硬件对接方案学习笔记" aria-label="Permalink to &quot;前端浏览器与设备硬件对接方案学习笔记&quot;">​</a></h1><h2 id="一、硬件对接概述" tabindex="-1">一、硬件对接概述 <a class="header-anchor" href="#一、硬件对接概述" aria-label="Permalink to &quot;一、硬件对接概述&quot;">​</a></h2><h3 id="_1-1-前端硬件对接的意义" tabindex="-1">1.1 前端硬件对接的意义 <a class="header-anchor" href="#_1-1-前端硬件对接的意义" aria-label="Permalink to &quot;1.1 前端硬件对接的意义&quot;">​</a></h3><p>前端硬件对接使Web应用能够：</p><ul><li>直接访问和控制物理设备</li><li>实现丰富的交互体验（如AR、VR）</li><li>收集实时传感器数据</li><li>扩展传统Web应用的能力边界</li><li>创建物联网(IoT)应用界面</li></ul><h3 id="_1-2-浏览器硬件对接能力矩阵" tabindex="-1">1.2 浏览器硬件对接能力矩阵 <a class="header-anchor" href="#_1-2-浏览器硬件对接能力矩阵" aria-label="Permalink to &quot;1.2 浏览器硬件对接能力矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>硬件类型</th><th>主要API/技术</th><th>支持程度</th><th>典型应用场景</th></tr></thead><tbody><tr><td>媒体设备</td><td>WebRTC, MediaDevices</td><td>⭐⭐⭐⭐⭐</td><td>视频会议、直播</td></tr><tr><td>传感器</td><td>Generic Sensor API</td><td>⭐⭐⭐⭐☆</td><td>运动监测、环境应用</td></tr><tr><td>蓝牙设备</td><td>Web Bluetooth API</td><td>⭐⭐⭐☆☆</td><td>健康监测、智能家居</td></tr><tr><td>USB设备</td><td>WebUSB API</td><td>⭐⭐☆☆☆</td><td>硬件调试、外设控制</td></tr><tr><td>NFC/RFID</td><td>Web NFC API</td><td>⭐☆☆☆☆</td><td>门禁系统、智能标签</td></tr><tr><td>串口设备</td><td>Web Serial API</td><td>⭐⭐☆☆☆</td><td>工业控制、嵌入式系统</td></tr><tr><td>打印设备</td><td>Window.print(), CSS PM</td><td>⭐⭐⭐⭐⭐</td><td>报表打印、票据输出</td></tr><tr><td>GPU加速</td><td>WebGL, WebGPU</td><td>⭐⭐⭐⭐☆</td><td>3D渲染、科学可视化</td></tr></tbody></table><h2 id="二、核心对接技术详解" tabindex="-1">二、核心对接技术详解 <a class="header-anchor" href="#二、核心对接技术详解" aria-label="Permalink to &quot;二、核心对接技术详解&quot;">​</a></h2><h3 id="_2-1-webrtc与媒体设备对接" tabindex="-1">2.1 WebRTC与媒体设备对接 <a class="header-anchor" href="#_2-1-webrtc与媒体设备对接" aria-label="Permalink to &quot;2.1 WebRTC与媒体设备对接&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 获取媒体设备列表</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> getMediaDevices</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> devices</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.mediaDevices.</span><span class="__shiki_1t8gfj">enumerateDevices</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> cameras</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> devices.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">d</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> d.kind </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;videoinput&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> mics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> devices.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">d</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> d.kind </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;audioinput&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { cameras, mics };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 访问摄像头和麦克风</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> startCamera</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">deviceId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> constraints</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    video: { deviceId: deviceId </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> { exact: deviceId } </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    audio: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.mediaDevices.</span><span class="__shiki_1t8gfj">getUserMedia</span><span class="__shiki_140thh">(constraints);</span></span>
<span class="line"><span class="__shiki_140thh">    document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;video&#39;</span><span class="__shiki_140thh">).srcObject </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stream;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (err) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;设备访问失败:&#39;</span><span class="__shiki_140thh">, err);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 屏幕共享</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> shareScreen</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.mediaDevices.</span><span class="__shiki_1t8gfj">getDisplayMedia</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      video: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      audio: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;screen&#39;</span><span class="__shiki_140thh">).srcObject </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stream;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (err) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;屏幕共享失败:&#39;</span><span class="__shiki_140thh">, err);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-web-bluetooth对接方案" tabindex="-1">2.2 Web Bluetooth对接方案 <a class="header-anchor" href="#_2-2-web-bluetooth对接方案" aria-label="Permalink to &quot;2.2 Web Bluetooth对接方案&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 连接蓝牙设备</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> connectToDevice</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> device</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.bluetooth.</span><span class="__shiki_1t8gfj">requestDevice</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      acceptAllDevices: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      optionalServices: [</span><span class="__shiki_mdbnqw">&#39;battery_service&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> device.gatt.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> service</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> server.</span><span class="__shiki_1t8gfj">getPrimaryService</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;battery_service&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> characteristic</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> service.</span><span class="__shiki_1t8gfj">getCharacteristic</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;battery_level&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> characteristic.</span><span class="__shiki_1t8gfj">readValue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batteryLevel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> value.</span><span class="__shiki_1t8gfj">getUint8</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`电池电量: \${</span><span class="__shiki_140thh">batteryLevel</span><span class="__shiki_mdbnqw">}%\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 实时数据监听</span></span>
<span class="line"><span class="__shiki_140thh">    characteristic.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;characteristicvaluechanged&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.target.value;</span></span>
<span class="line"><span class="__shiki_1t8gfj">      updateBatteryLevel</span><span class="__shiki_140thh">(value.</span><span class="__shiki_1t8gfj">getUint8</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> characteristic.</span><span class="__shiki_1t8gfj">startNotifications</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;蓝牙连接失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 向设备发送数据</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> sendCommand</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">characteristic</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">command</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> encoder</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> encoder.</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(command);</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> characteristic.</span><span class="__shiki_1t8gfj">writeValue</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-webusb设备对接" tabindex="-1">2.3 WebUSB设备对接 <a class="header-anchor" href="#_2-3-webusb设备对接" aria-label="Permalink to &quot;2.3 WebUSB设备对接&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 连接USB设备</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> connectUSB</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> device</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.usb.</span><span class="__shiki_1t8gfj">requestDevice</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">      filters: [{ vendorId: </span><span class="__shiki_dzsirb">0x1234</span><span class="__shiki_140thh"> }] </span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">selectConfiguration</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">claimInterface</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">transferIn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">(result.data.buffer);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;接收数据:&#39;</span><span class="__shiki_140thh">, data);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> outputData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Uint8Array</span><span class="__shiki_140thh">([</span><span class="__shiki_dzsirb">0x01</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0x02</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0x03</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">transferOut</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, outputData);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;USB设备错误:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 断开连接</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> disconnectUSB</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">device</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (device.opened) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">releaseInterface</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> device.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-web-serial-api对接串口设备" tabindex="-1">2.4 Web Serial API对接串口设备 <a class="header-anchor" href="#_2-4-web-serial-api对接串口设备" aria-label="Permalink to &quot;2.4 Web Serial API对接串口设备&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 连接串口设备</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> connectSerial</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> port</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.serial.</span><span class="__shiki_1t8gfj">requestPort</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> port.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">({ baudRate: </span><span class="__shiki_dzsirb">9600</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> reader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> port.readable.</span><span class="__shiki_1t8gfj">getReader</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> writer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> port.writable.</span><span class="__shiki_1t8gfj">getWriter</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 持续读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">done</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> reader.</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (done) </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">      processSerialData</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (err) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;串口错误:&#39;</span><span class="__shiki_140thh">, err);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 发送串口命令</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> sendSerialCommand</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">writer</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">command</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> encoder</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TextEncoder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> writer.</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">(encoder.</span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(command));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、传感器对接方案" tabindex="-1">三、传感器对接方案 <a class="header-anchor" href="#三、传感器对接方案" aria-label="Permalink to &quot;三、传感器对接方案&quot;">​</a></h2><h3 id="_3-1-通用传感器api" tabindex="-1">3.1 通用传感器API <a class="header-anchor" href="#_3-1-通用传感器api" aria-label="Permalink to &quot;3.1 通用传感器API&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 加速度计</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> setupAccelerometer</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> accelerometer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Accelerometer</span><span class="__shiki_140thh">({ frequency: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    accelerometer.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;reading&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`加速度: </span></span>
<span class="line"><span class="__shiki_mdbnqw">        X: \${</span><span class="__shiki_140thh">accelerometer</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">x</span><span class="__shiki_mdbnqw">}, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        Y: \${</span><span class="__shiki_140thh">accelerometer</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">y</span><span class="__shiki_mdbnqw">}, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        Z: \${</span><span class="__shiki_140thh">accelerometer</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">z</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    accelerometer.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;加速度计不可用:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 环境光传感器</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> setupLightSensor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;AmbientLightSensor&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> sensor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AmbientLightSensor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      sensor.</span><span class="__shiki_1t8gfj">onreading</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        adjustTheme</span><span class="__shiki_140thh">(sensor.illuminance);</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      sensor.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;光线传感器错误:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 地理位置传感器</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> setupGeolocation</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">  navigator.geolocation.</span><span class="__shiki_1t8gfj">watchPosition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    position</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      updateMap</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        lat: position.coords.latitude,</span></span>
<span class="line"><span class="__shiki_140thh">        lng: position.coords.longitude</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1jdh33">    error</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;定位错误:&#39;</span><span class="__shiki_140thh">, error),</span></span>
<span class="line"><span class="__shiki_140thh">    { enableHighAccuracy: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、打印设备对接方案" tabindex="-1">四、打印设备对接方案 <a class="header-anchor" href="#四、打印设备对接方案" aria-label="Permalink to &quot;四、打印设备对接方案&quot;">​</a></h2><h3 id="_4-1-基本打印功能" tabindex="-1">4.1 基本打印功能 <a class="header-anchor" href="#_4-1-基本打印功能" aria-label="Permalink to &quot;4.1 基本打印功能&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 触发打印</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> printDocument</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">print</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 打印特定区域</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> printElement</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">elementId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> printContent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(elementId).innerHTML;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> originalContent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.body.innerHTML;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  document.body.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> printContent;</span></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">print</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  document.body.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> originalContent;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-高级打印控制-css打印媒体查询" tabindex="-1">4.2 高级打印控制（CSS打印媒体查询） <a class="header-anchor" href="#_4-2-高级打印控制-css打印媒体查询" aria-label="Permalink to &quot;4.2 高级打印控制（CSS打印媒体查询）&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 打印样式 */</span></span>
<span class="line"><span class="__shiki_1itgoe">@media</span><span class="__shiki_dzsirb"> print</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_17hn0y">  body</span><span class="__shiki_17hn0y"> *</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    visibility</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">hidden</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  .print-section</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">.print-section</span><span class="__shiki_17hn0y"> *</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    visibility</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">visible</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  .print-section</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    position</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">absolute</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    left</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    top</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    width</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  .no-print</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    display</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">none</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  /* 分页控制 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  .page-break</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    page-break-after</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">always</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、安全与权限管理" tabindex="-1">五、安全与权限管理 <a class="header-anchor" href="#五、安全与权限管理" aria-label="Permalink to &quot;五、安全与权限管理&quot;">​</a></h2><h3 id="_5-1-权限请求模式" tabindex="-1">5.1 权限请求模式 <a class="header-anchor" href="#_5-1-权限请求模式" aria-label="Permalink to &quot;5.1 权限请求模式&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant User</span></span>
<span class="line"><span class="__shiki_140thh">    participant Browser</span></span>
<span class="line"><span class="__shiki_140thh">    participant Website</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Website-&gt;&gt;Browser: 请求硬件访问权限</span></span>
<span class="line"><span class="__shiki_140thh">    Browser-&gt;&gt;User: 显示权限请求对话框</span></span>
<span class="line"><span class="__shiki_140thh">    User-&gt;&gt;Browser: 允许/拒绝</span></span>
<span class="line"><span class="__shiki_140thh">    Browser-&gt;&gt;Website: 返回权限状态</span></span>
<span class="line"><span class="__shiki_140thh">    alt 允许</span></span>
<span class="line"><span class="__shiki_140thh">        Website-&gt;&gt;Hardware: 访问设备</span></span>
<span class="line"><span class="__shiki_140thh">        Hardware-&gt;&gt;Website: 返回设备数据</span></span>
<span class="line"><span class="__shiki_140thh">    else 拒绝</span></span>
<span class="line"><span class="__shiki_140thh">        Website-&gt;&gt;User: 显示错误信息</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="_5-2-安全最佳实践" tabindex="-1">5.2 安全最佳实践 <a class="header-anchor" href="#_5-2-安全最佳实践" aria-label="Permalink to &quot;5.2 安全最佳实践&quot;">​</a></h3><ol><li><strong>HTTPS强制要求</strong>：所有硬件API必须通过安全连接</li><li><strong>用户手势触发</strong>：首次访问需用户交互（点击、触摸）</li><li><strong>最小权限原则</strong>：仅请求必要的硬件访问权限</li><li><strong>透明告知</strong>：明确说明硬件访问目的</li><li><strong>超时处理</strong>：设置合理的操作超时</li><li><strong>错误处理</strong>：优雅处理权限拒绝和设备错误</li><li><strong>隐私保护</strong>：敏感数据本地处理，避免不必要传输</li></ol><h2 id="六、跨浏览器兼容方案" tabindex="-1">六、跨浏览器兼容方案 <a class="header-anchor" href="#六、跨浏览器兼容方案" aria-label="Permalink to &quot;六、跨浏览器兼容方案&quot;">​</a></h2><h3 id="_6-1-兼容性处理策略" tabindex="-1">6.1 兼容性处理策略 <a class="header-anchor" href="#_6-1-兼容性处理策略" aria-label="Permalink to &quot;6.1 兼容性处理策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 设备API兼容性检测</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> hardwareAPIs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  bluetooth: </span><span class="__shiki_mdbnqw">&#39;bluetooth&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> navigator,</span></span>
<span class="line"><span class="__shiki_140thh">  usb: </span><span class="__shiki_mdbnqw">&#39;usb&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> navigator,</span></span>
<span class="line"><span class="__shiki_140thh">  serial: </span><span class="__shiki_mdbnqw">&#39;serial&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> navigator,</span></span>
<span class="line"><span class="__shiki_140thh">  nfc: </span><span class="__shiki_mdbnqw">&#39;NDEFReader&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window,</span></span>
<span class="line"><span class="__shiki_140thh">  sensors: </span><span class="__shiki_mdbnqw">&#39;Accelerometer&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优雅降级示例</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> getLocation</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (navigator.geolocation) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      navigator.geolocation.</span><span class="__shiki_1t8gfj">getCurrentPosition</span><span class="__shiki_140thh">(resolve, reject);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (window.DeviceOrientationEvent) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用设备方向数据估算位置</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> estimatePositionFromOrientation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 最终回退方案</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> getLocationFromIP</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 功能检测使用</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (hardwareAPIs.bluetooth) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  initBluetoothControls</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  showUnsupportedMessage</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;您的浏览器不支持蓝牙设备连接&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-浏览器支持情况" tabindex="-1">6.2 浏览器支持情况 <a class="header-anchor" href="#_6-2-浏览器支持情况" aria-label="Permalink to &quot;6.2 浏览器支持情况&quot;">​</a></h3><table tabindex="0"><thead><tr><th>API</th><th>Chrome</th><th>Firefox</th><th>Safari</th><th>Edge</th><th>移动设备支持</th></tr></thead><tbody><tr><td>Web Bluetooth</td><td>56+</td><td>部分</td><td>无</td><td>79+</td><td>Android</td></tr><tr><td>WebUSB</td><td>61+</td><td>无</td><td>无</td><td>79+</td><td>Android</td></tr><tr><td>Web Serial</td><td>89+</td><td>无</td><td>无</td><td>89+</td><td>Android</td></tr><tr><td>Web NFC</td><td>89+</td><td>无</td><td>无</td><td>89+</td><td>Android</td></tr><tr><td>Generic Sensors</td><td>67+</td><td>无</td><td>无</td><td>79+</td><td>Android/iOS</td></tr><tr><td>WebRTC</td><td>56+</td><td>52+</td><td>11+</td><td>79+</td><td>全平台</td></tr></tbody></table><h2 id="七、企业级应用架构" tabindex="-1">七、企业级应用架构 <a class="header-anchor" href="#七、企业级应用架构" aria-label="Permalink to &quot;七、企业级应用架构&quot;">​</a></h2><h3 id="_7-1-前端硬件对接架构" tabindex="-1">7.1 前端硬件对接架构 <a class="header-anchor" href="#_7-1-前端硬件对接架构" aria-label="Permalink to &quot;7.1 前端硬件对接架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌──────────────────────┐       ┌──────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│     前端应用层        │       │     硬件设备层        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ┌──────────────────┐ │       │ ┌──────────────────┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ │  用户界面(UI)     │◀───────▶│ 媒体设备(摄像头等) │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └──────────────────┘ │ HTTP  │ └──────────────────┘ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │ WS    │                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ┌──────────────────┐ │ MQTT  │ ┌──────────────────┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ │ 设备管理层        │◀───────▶│ 传感器(运动/环境)  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └──────────────────┘ │       │ └──────────────────┘ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │       │                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ┌──────────────────┐ │       │ ┌──────────────────┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ │ 设备通信层        │◀───────▶│ 连接设备(蓝牙/USB) │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └──────────────────┘ │       │ └──────────────────┘ │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────────┘       └──────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">       ▲                               ▲</span></span>
<span class="line"><span class="__shiki_wvjl67">       │                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">       │                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">┌──────────────────────┐       ┌──────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│     后端服务层        │       │   设备网关/边缘计算   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ┌──────────────────┐ │       │ ┌──────────────────┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ │ 设备状态管理      │◀───────▶│ 设备协议转换        │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └──────────────────┘ │       │ └──────────────────┘ │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────────┘       └──────────────────────┘</span></span></code></pre></div><h3 id="_7-2-性能优化策略" tabindex="-1">7.2 性能优化策略 <a class="header-anchor" href="#_7-2-性能优化策略" aria-label="Permalink to &quot;7.2 性能优化策略&quot;">​</a></h3><ol><li><strong>数据压缩</strong>：对传输的硬件数据进行压缩</li><li><strong>节流采样</strong>：降低高频率传感器数据的采样率</li><li><strong>Web Workers</strong>：在后台线程处理硬件数据</li><li><strong>本地缓存</strong>：缓存静态设备配置数据</li><li><strong>连接池管理</strong>：复用设备连接，减少连接开销</li><li><strong>二进制协议</strong>：使用ArrayBuffer替代JSON传输</li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Web Workers处理传感器数据</span></span>
<span class="line"><span class="__shiki_21nrsd">// main.js</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sensorWorker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Worker</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sensor-processor.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">sensorWorker.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">({ command: </span><span class="__shiki_mdbnqw">&#39;start&#39;</span><span class="__shiki_140thh">, frequency: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    alpha: event.alpha,</span></span>
<span class="line"><span class="__shiki_140thh">    beta: event.beta,</span></span>
<span class="line"><span class="__shiki_140thh">    gamma: event.gamma,</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  sensorWorker.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// sensor-processor.js</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (event.data.command) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    initSensorProcessing</span><span class="__shiki_140thh">(event.data.frequency);</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    processSensorData</span><span class="__shiki_140thh">(event.data);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> processSensorData</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用卡尔曼滤波等算法处理原始数据</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> filtered</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> kalmanFilter</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 发送处理后的数据回主线程</span></span>
<span class="line"><span class="__shiki_140thh">  self.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">(filtered);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、调试与测试方案" tabindex="-1">八、调试与测试方案 <a class="header-anchor" href="#八、调试与测试方案" aria-label="Permalink to &quot;八、调试与测试方案&quot;">​</a></h2><h3 id="_8-1-硬件api调试工具" tabindex="-1">8.1 硬件API调试工具 <a class="header-anchor" href="#_8-1-硬件api调试工具" aria-label="Permalink to &quot;8.1 硬件API调试工具&quot;">​</a></h3><table tabindex="0"><thead><tr><th>工具类型</th><th>推荐工具</th><th>功能特点</th></tr></thead><tbody><tr><td>通用调试</td><td>Chrome DevTools</td><td>模拟传感器、地理位置</td></tr><tr><td>蓝牙调试</td><td>nRF Connect</td><td>BLE设备扫描和通信调试</td></tr><tr><td>USB调试</td><td>USBlyzer</td><td>USB数据包分析</td></tr><tr><td>串口调试</td><td>Serial Port Monitor</td><td>串口数据监控和分析</td></tr><tr><td>网络协议</td><td>Wireshark</td><td>分析WebSocket/MQTT通信</td></tr></tbody></table><h3 id="_8-2-自动化测试策略" tabindex="-1">8.2 自动化测试策略 <a class="header-anchor" href="#_8-2-自动化测试策略" aria-label="Permalink to &quot;8.2 自动化测试策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Jest测试硬件交互</span></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;蓝牙设备管理&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> mockDevice;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeAll</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置蓝牙API模拟</span></span>
<span class="line"><span class="__shiki_140thh">    navigator.bluetooth </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      requestDevice: jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">mockResolvedValue</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;Test Device&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        gatt: {</span></span>
<span class="line"><span class="__shiki_140thh">          connect: jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">mockResolvedValue</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            getPrimaryService: jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">mockResolvedValue</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">              getCharacteristic: jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">mockResolvedValue</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                readValue: jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">mockResolvedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> DataView</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> ArrayBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">              })</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">          })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;成功读取设备数据&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> readBluetoothDevice</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.batteryLevel).</span><span class="__shiki_1t8gfj">toBeDefined</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(navigator.bluetooth.requestDevice).</span><span class="__shiki_1t8gfj">toHaveBeenCalled</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;处理连接错误&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    navigator.bluetooth.requestDevice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">mockRejectedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;连接超时&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">readBluetoothDevice</span><span class="__shiki_140thh">()).rejects.</span><span class="__shiki_1t8gfj">toThrow</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;蓝牙连接失败&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="九、行业应用案例" tabindex="-1">九、行业应用案例 <a class="header-anchor" href="#九、行业应用案例" aria-label="Permalink to &quot;九、行业应用案例&quot;">​</a></h2><h3 id="_9-1-智能工厂监控系统" tabindex="-1">9.1 智能工厂监控系统 <a class="header-anchor" href="#_9-1-智能工厂监控系统" aria-label="Permalink to &quot;9.1 智能工厂监控系统&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[工业传感器] --&gt;|RS485/Modbus| B(边缘网关)</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|Web Serial API| C[浏览器界面]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D{实时监控看板}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; E{设备控制面板}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F{报警管理系统}</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[生产状态可视化]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; H[远程设备控制]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; I[实时报警通知]</span></span></code></pre></div><h3 id="_9-2-医疗健康监测平台" tabindex="-1">9.2 医疗健康监测平台 <a class="header-anchor" href="#_9-2-医疗健康监测平台" aria-label="Permalink to &quot;9.2 医疗健康监测平台&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 连接健康监测设备</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> connectHealthMonitor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> device</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> navigator.bluetooth.</span><span class="__shiki_1t8gfj">requestDevice</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    filters: [{ services: [</span><span class="__shiki_mdbnqw">&#39;heart_rate&#39;</span><span class="__shiki_140thh">] }]</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> device.gatt.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> service</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> server.</span><span class="__shiki_1t8gfj">getPrimaryService</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;heart_rate&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> characteristic</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> service.</span><span class="__shiki_1t8gfj">getCharacteristic</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;heart_rate_measurement&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 持续监测心率</span></span>
<span class="line"><span class="__shiki_140thh">  characteristic.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;characteristicvaluechanged&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.target.value;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> heartRate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> parseHeartRate</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    updateHeartRateDisplay</span><span class="__shiki_140thh">(heartRate);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 异常心率报警</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (heartRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 120</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> heartRate </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      triggerAlarm</span><span class="__shiki_140thh">(heartRate);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> characteristic.</span><span class="__shiki_1t8gfj">startNotifications</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 解析心率数据</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> parseHeartRate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> flags</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> data.</span><span class="__shiki_1t8gfj">getUint8</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> heartRate;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (flags </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_dzsirb"> 0x1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    heartRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.</span><span class="__shiki_1t8gfj">getUint16</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    heartRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data.</span><span class="__shiki_1t8gfj">getUint8</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> heartRate;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、未来发展趋势" tabindex="-1">十、未来发展趋势 <a class="header-anchor" href="#十、未来发展趋势" aria-label="Permalink to &quot;十、未来发展趋势&quot;">​</a></h2><h3 id="_10-1-新兴硬件api" tabindex="-1">10.1 新兴硬件API <a class="header-anchor" href="#_10-1-新兴硬件api" aria-label="Permalink to &quot;10.1 新兴硬件API&quot;">​</a></h3><table tabindex="0"><thead><tr><th>API名称</th><th>功能描述</th><th>状态</th></tr></thead><tbody><tr><td>WebHID</td><td>人机接口设备（键盘、游戏手柄）</td><td>草案阶段</td></tr><tr><td>Web ML</td><td>机器学习硬件加速</td><td>开发中</td></tr><tr><td>WebXR</td><td>增强/虚拟现实设备</td><td>逐步普及</td></tr><tr><td>WebTransport</td><td>新型网络传输协议</td><td>实验阶段</td></tr><tr><td>WebCodecs</td><td>硬件加速编解码</td><td>逐步实现</td></tr></tbody></table><h3 id="_10-2-硬件对接最佳实践演进" tabindex="-1">10.2 硬件对接最佳实践演进 <a class="header-anchor" href="#_10-2-硬件对接最佳实践演进" aria-label="Permalink to &quot;10.2 硬件对接最佳实践演进&quot;">​</a></h3><ol><li><strong>边缘计算融合</strong>：前端直接与边缘计算节点通信</li><li><strong>WebAssembly优化</strong>：高性能处理硬件数据</li><li><strong>统一设备协议</strong>：OPC UA等工业协议Web化</li><li><strong>AI集成</strong>：设备数据的智能分析和预测</li><li><strong>区块链应用</strong>：设备数据的安全存证</li></ol><blockquote><p><strong>总结</strong>：前端硬件对接技术正在快速发展，从简单的媒体设备访问到复杂的工业设备控制，浏览器正成为连接物理世界的重要桥梁。开发者应关注：</p><ul><li><strong>安全模型</strong>：理解并遵循浏览器安全策略</li><li><strong>性能优化</strong>：高效处理硬件数据流</li><li><strong>渐进增强</strong>：提供优雅的回退方案</li><li><strong>用户隐私</strong>：透明化设备数据使用</li><li><strong>新兴标准</strong>：跟进W3C设备API规范演进</li></ul></blockquote>`,56)])])}const d=a(p,[["render",h]]);export{o as __pageData,d as default};
