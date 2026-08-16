import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"浏览器传感器 API 学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/browser/device/sensors.md","filePath":"frontend/browser/device/sensors.md"}'),p={name:"frontend/browser/device/sensors.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="浏览器传感器-api-学习笔记" tabindex="-1">浏览器传感器 API 学习笔记 <a class="header-anchor" href="#浏览器传感器-api-学习笔记" aria-label="Permalink to &quot;浏览器传感器 API 学习笔记&quot;">​</a></h1><h2 id="一、传感器-api-概述" tabindex="-1">一、传感器 API 概述 <a class="header-anchor" href="#一、传感器-api-概述" aria-label="Permalink to &quot;一、传感器 API 概述&quot;">​</a></h2><h3 id="_1-1-什么是传感器-api" tabindex="-1">1.1 什么是传感器 API <a class="header-anchor" href="#_1-1-什么是传感器-api" aria-label="Permalink to &quot;1.1 什么是传感器 API&quot;">​</a></h3><p>浏览器传感器 API 允许 Web 应用访问设备硬件传感器数据，包括：</p><ul><li><strong>运动传感器</strong>：加速度计、陀螺仪</li><li><strong>方向传感器</strong>：设备朝向</li><li><strong>环境传感器</strong>：光线、温度、湿度</li><li><strong>位置传感器</strong>：GPS（Geolocation API）</li><li><strong>生物传感器</strong>：心率监测（实验性）</li></ul><h3 id="_1-2-核心优势" tabindex="-1">1.2 核心优势 <a class="header-anchor" href="#_1-2-核心优势" aria-label="Permalink to &quot;1.2 核心优势&quot;">​</a></h3><ul><li><strong>硬件访问</strong>：直接与设备传感器交互</li><li><strong>实时数据</strong>：提供连续的数据流</li><li><strong>跨平台</strong>：在移动设备和桌面浏览器上均可使用</li><li><strong>无插件</strong>：原生浏览器支持，无需额外插件</li></ul><h3 id="_1-3-浏览器支持情况" tabindex="-1">1.3 浏览器支持情况 <a class="header-anchor" href="#_1-3-浏览器支持情况" aria-label="Permalink to &quot;1.3 浏览器支持情况&quot;">​</a></h3><table tabindex="0"><thead><tr><th>传感器类型</th><th>Chrome</th><th>Firefox</th><th>Safari</th><th>Edge</th><th>移动端支持</th></tr></thead><tbody><tr><td>DeviceOrientation</td><td>✓ 7+</td><td>✓ 6+</td><td>✓ 4.2+</td><td>✓ 12+</td><td>✓ Android/iOS</td></tr><tr><td>DeviceMotion</td><td>✓ 7+</td><td>✓ 6+</td><td>✓ 4.2+</td><td>✓ 12+</td><td>✓ Android/iOS</td></tr><tr><td>Ambient Light</td><td>✓ 43+</td><td>✓ 62+</td><td>✗</td><td>✓ 79+</td><td>✓ Android</td></tr><tr><td>Geolocation</td><td>✓ 5+</td><td>✓ 3.5+</td><td>✓ 5+</td><td>✓ 12+</td><td>✓ Android/iOS</td></tr><tr><td>Proximity (实验性)</td><td>✓ 61+</td><td>✓ 15+</td><td>✗</td><td>✓ 79+</td><td>✓ Android</td></tr></tbody></table><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 特性检测示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sensorsAvailable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  deviceOrientation: </span><span class="__shiki_mdbnqw">&#39;DeviceOrientationEvent&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window,</span></span>
<span class="line"><span class="__shiki_140thh">  deviceMotion: </span><span class="__shiki_mdbnqw">&#39;DeviceMotionEvent&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window,</span></span>
<span class="line"><span class="__shiki_140thh">  ambientLight: </span><span class="__shiki_mdbnqw">&#39;AmbientLightSensor&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window,</span></span>
<span class="line"><span class="__shiki_140thh">  geolocation: </span><span class="__shiki_mdbnqw">&#39;geolocation&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> navigator,</span></span>
<span class="line"><span class="__shiki_140thh">  proximity: </span><span class="__shiki_mdbnqw">&#39;ProximitySensor&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="二、设备方向与运动-api" tabindex="-1">二、设备方向与运动 API <a class="header-anchor" href="#二、设备方向与运动-api" aria-label="Permalink to &quot;二、设备方向与运动 API&quot;">​</a></h2><h3 id="_2-1-deviceorientation-api-设备方向" tabindex="-1">2.1 DeviceOrientation API（设备方向） <a class="header-anchor" href="#_2-1-deviceorientation-api-设备方向" aria-label="Permalink to &quot;2.1 DeviceOrientation API（设备方向）&quot;">​</a></h3><p>检测设备在三维空间中的朝向</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> setupOrientation</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">window.DeviceOrientationEvent) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;设备不支持方向API&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      alpha: event.alpha, </span><span class="__shiki_21nrsd">// 0-360° 绕Z轴旋转（罗盘方向）</span></span>
<span class="line"><span class="__shiki_140thh">      beta: event.beta,   </span><span class="__shiki_21nrsd">// -180°到180° 绕X轴旋转（前后倾斜）</span></span>
<span class="line"><span class="__shiki_140thh">      gamma: event.gamma, </span><span class="__shiki_21nrsd">// -90°到90° 绕Y轴旋转（左右倾斜）</span></span>
<span class="line"><span class="__shiki_140thh">      absolute: event.absolute </span><span class="__shiki_21nrsd">// 是否绝对方向（相对于地球坐标系）</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    updateUI</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例应用：罗盘</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> updateCompass</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">alpha</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> compass</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;compass&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  compass.style.transform </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`rotate(\${</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">alpha</span><span class="__shiki_mdbnqw">}deg)\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-devicemotion-api-设备运动" tabindex="-1">2.2 DeviceMotion API（设备运动） <a class="header-anchor" href="#_2-2-devicemotion-api-设备运动" aria-label="Permalink to &quot;2.2 DeviceMotion API（设备运动）&quot;">​</a></h3><p>检测设备的加速度和旋转速率</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> setupMotion</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">window.DeviceMotionEvent) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;设备不支持运动API&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;devicemotion&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      acceleration: {</span></span>
<span class="line"><span class="__shiki_140thh">        x: event.acceleration.x, </span><span class="__shiki_21nrsd">// X轴加速度 (m/s²)</span></span>
<span class="line"><span class="__shiki_140thh">        y: event.acceleration.y, </span><span class="__shiki_21nrsd">// Y轴加速度</span></span>
<span class="line"><span class="__shiki_140thh">        z: event.acceleration.z  </span><span class="__shiki_21nrsd">// Z轴加速度</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      accelerationIncludingGravity: {</span></span>
<span class="line"><span class="__shiki_140thh">        x: event.accelerationIncludingGravity.x,</span></span>
<span class="line"><span class="__shiki_140thh">        y: event.accelerationIncludingGravity.y,</span></span>
<span class="line"><span class="__shiki_140thh">        z: event.accelerationIncludingGravity.z</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      rotationRate: {</span></span>
<span class="line"><span class="__shiki_140thh">        alpha: event.rotationRate.alpha, </span><span class="__shiki_21nrsd">// 绕Z轴旋转速度 (deg/s)</span></span>
<span class="line"><span class="__shiki_140thh">        beta: event.rotationRate.beta,   </span><span class="__shiki_21nrsd">// 绕X轴旋转速度</span></span>
<span class="line"><span class="__shiki_140thh">        gamma: event.rotationRate.gamma  </span><span class="__shiki_21nrsd">// 绕Y轴旋转速度</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      interval: event.interval </span><span class="__shiki_21nrsd">// 事件间隔 (ms)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    detectShake</span><span class="__shiki_140thh">(data.acceleration);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例：摇一摇检测</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> lastShakeTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> detectShake</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">acceleration</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> threshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 15</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 加速度阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> lastShakeTime </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 防抖处理</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> totalAcceleration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">abs</span><span class="__shiki_140thh">(acceleration.x) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                           Math.</span><span class="__shiki_1t8gfj">abs</span><span class="__shiki_140thh">(acceleration.y) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                           Math.</span><span class="__shiki_1t8gfj">abs</span><span class="__shiki_140thh">(acceleration.z);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (totalAcceleration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> threshold) {</span></span>
<span class="line"><span class="__shiki_140thh">    lastShakeTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    handleShakeEvent</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、环境传感器-api" tabindex="-1">三、环境传感器 API <a class="header-anchor" href="#三、环境传感器-api" aria-label="Permalink to &quot;三、环境传感器 API&quot;">​</a></h2><h3 id="_3-1-ambient-light-sensor-环境光传感器" tabindex="-1">3.1 Ambient Light Sensor（环境光传感器） <a class="header-anchor" href="#_3-1-ambient-light-sensor-环境光传感器" aria-label="Permalink to &quot;3.1 Ambient Light Sensor（环境光传感器）&quot;">​</a></h3><p>检测环境光照强度（单位：勒克斯 lux）</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> setupLightSensor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;AmbientLightSensor&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window)) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;设备不支持环境光传感器&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sensor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AmbientLightSensor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sensor.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;reading&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> lightLevel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sensor.illuminance;</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> levelDescription;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (lightLevel </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) levelDescription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;黑暗&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (lightLevel </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) levelDescription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;昏暗&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (lightLevel </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) levelDescription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      else</span><span class="__shiki_140thh"> levelDescription </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;明亮&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1t8gfj">      adjustTheme</span><span class="__shiki_140thh">(lightLevel);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sensor.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;光传感器错误:&#39;</span><span class="__shiki_140thh">, event.error);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sensor.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;光传感器初始化失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 根据光线调整主题</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> adjustTheme</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">lightLevel</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> theme</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> lightLevel </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;dark&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;light&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  document.documentElement.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;data-theme&#39;</span><span class="__shiki_140thh">, theme);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-proximity-sensor-接近传感器-实验性" tabindex="-1">3.2 Proximity Sensor（接近传感器 - 实验性） <a class="header-anchor" href="#_3-2-proximity-sensor-接近传感器-实验性" aria-label="Permalink to &quot;3.2 Proximity Sensor（接近传感器 - 实验性）&quot;">​</a></h3><p>检测物体与设备的接近程度（通常用于通话时关闭屏幕）</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> setupProximitySensor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ProximitySensor&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window)) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;设备不支持接近传感器&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sensor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ProximitySensor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sensor.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;reading&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (sensor.near) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 物体靠近（如通话时耳朵贴近）</span></span>
<span class="line"><span class="__shiki_1t8gfj">        screenOff</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 物体离开</span></span>
<span class="line"><span class="__shiki_1t8gfj">        screenOn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sensor.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;接近传感器错误:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、地理定位-api" tabindex="-1">四、地理定位 API <a class="header-anchor" href="#四、地理定位-api" aria-label="Permalink to &quot;四、地理定位 API&quot;">​</a></h2><h3 id="_4-1-基本使用" tabindex="-1">4.1 基本使用 <a class="header-anchor" href="#_4-1-基本使用" aria-label="Permalink to &quot;4.1 基本使用&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> getLocation</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">navigator.geolocation) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;设备不支持地理定位&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    enableHighAccuracy: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 请求高精度位置</span></span>
<span class="line"><span class="__shiki_140thh">    timeout: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 超时时间（毫秒）</span></span>
<span class="line"><span class="__shiki_140thh">    maximumAge: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">             // 不使用缓存位置</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  navigator.geolocation.</span><span class="__shiki_1t8gfj">getCurrentPosition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">position</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> coords</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> position.coords;</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;位置获取成功:&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        latitude: coords.latitude,</span></span>
<span class="line"><span class="__shiki_140thh">        longitude: coords.longitude,</span></span>
<span class="line"><span class="__shiki_140thh">        accuracy: coords.accuracy,</span></span>
<span class="line"><span class="__shiki_140thh">        altitude: coords.altitude,</span></span>
<span class="line"><span class="__shiki_140thh">        speed: coords.speed</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;位置获取失败:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    options</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-持续位置跟踪" tabindex="-1">4.2 持续位置跟踪 <a class="header-anchor" href="#_4-2-持续位置跟踪" aria-label="Permalink to &quot;4.2 持续位置跟踪&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> watchId;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> startTracking</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">  watchId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> navigator.geolocation.</span><span class="__shiki_1t8gfj">watchPosition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">position</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      updatePositionOnMap</span><span class="__shiki_140thh">(position.coords);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;跟踪错误:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    { </span></span>
<span class="line"><span class="__shiki_140thh">      enableHighAccuracy: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maximumAge: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> stopTracking</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (watchId) {</span></span>
<span class="line"><span class="__shiki_140thh">    navigator.geolocation.</span><span class="__shiki_1t8gfj">clearWatch</span><span class="__shiki_140thh">(watchId);</span></span>
<span class="line"><span class="__shiki_140thh">    watchId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、高级传感器应用" tabindex="-1">五、高级传感器应用 <a class="header-anchor" href="#五、高级传感器应用" aria-label="Permalink to &quot;五、高级传感器应用&quot;">​</a></h2><h3 id="_5-1-设备姿态计算-结合方向和运动数据" tabindex="-1">5.1 设备姿态计算（结合方向和运动数据） <a class="header-anchor" href="#_5-1-设备姿态计算-结合方向和运动数据" aria-label="Permalink to &quot;5.1 设备姿态计算（结合方向和运动数据）&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 计算设备姿态（俯仰角、横滚角）</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> calculateDeviceAttitude</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orientation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">motion</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">orientation </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">motion) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用四元数计算姿态（简化版）</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> degToRad</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 180</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> alpha</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> orientation.alpha </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> degToRad;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> beta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> orientation.beta </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> degToRad;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> gamma</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> orientation.gamma </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> degToRad;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 计算旋转矩阵或四元数（实际实现更复杂）</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> pitch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> beta;  </span><span class="__shiki_21nrsd">// 俯仰角</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> roll</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> gamma;  </span><span class="__shiki_21nrsd">// 横滚角</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> yaw</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> alpha;   </span><span class="__shiki_21nrsd">// 偏航角</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { pitch, roll, yaw };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> lastOrientation, lastMotion;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  lastOrientation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (lastMotion) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> attitude</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> calculateDeviceAttitude</span><span class="__shiki_140thh">(lastOrientation, lastMotion);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    updateARView</span><span class="__shiki_140thh">(attitude);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;devicemotion&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  lastMotion </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_5-2-传感器数据可视化" tabindex="-1">5.2 传感器数据可视化 <a class="header-anchor" href="#_5-2-传感器数据可视化" aria-label="Permalink to &quot;5.2 传感器数据可视化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Canvas绘制传感器数据</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> canvas</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sensorCanvas&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> ctx</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> canvas.</span><span class="__shiki_1t8gfj">getContext</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;2d&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> drawSensorData</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">acceleration</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rotation</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 清除画布</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">clearRect</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, canvas.width, canvas.height);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 绘制加速度矢量</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> centerX</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> canvas.width </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> centerY</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> canvas.height </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 加速度向量（缩放因子）</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> scale</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> accelX</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> acceleration.x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> scale;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> accelY</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> acceleration.y </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> scale;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 绘制加速度箭头</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">beginPath</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">moveTo</span><span class="__shiki_140thh">(centerX, centerY);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">lineTo</span><span class="__shiki_140thh">(centerX </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> accelX, centerY </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> accelY);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.strokeStyle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;#ff0000&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.lineWidth </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">stroke</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 绘制箭头头</span></span>
<span class="line"><span class="__shiki_1t8gfj">  drawArrowhead</span><span class="__shiki_140thh">(centerX </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> accelX, centerY </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> accelY, Math.</span><span class="__shiki_1t8gfj">atan2</span><span class="__shiki_140thh">(accelY, accelX));</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加文本标签</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.fillStyle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;#000&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.font </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;14px Arial&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">fillText</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Accel: X:\${</span><span class="__shiki_140thh">acceleration</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">x</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">} Y:\${</span><span class="__shiki_140thh">acceleration</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">y</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">} Z:\${</span><span class="__shiki_140thh">acceleration</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">z</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">fillText</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Rotation: α:\${</span><span class="__shiki_140thh">rotation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">alpha</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">} β:\${</span><span class="__shiki_140thh">rotation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">beta</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">} γ:\${</span><span class="__shiki_140thh">rotation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">gamma</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> drawArrowhead</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">x</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">y</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">angle</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> length</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">translate</span><span class="__shiki_140thh">(x, y);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">rotate</span><span class="__shiki_140thh">(angle);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">beginPath</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">moveTo</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">lineTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">length, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">length</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">lineTo</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">length, length</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">closePath</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.fillStyle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;#ff0000&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">fill</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  ctx.</span><span class="__shiki_1t8gfj">restore</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、安全与隐私考虑" tabindex="-1">六、安全与隐私考虑 <a class="header-anchor" href="#六、安全与隐私考虑" aria-label="Permalink to &quot;六、安全与隐私考虑&quot;">​</a></h2><h3 id="_6-1-权限模型" tabindex="-1">6.1 权限模型 <a class="header-anchor" href="#_6-1-权限模型" aria-label="Permalink to &quot;6.1 权限模型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>传感器类型</th><th>权限要求</th><th>用户提示</th></tr></thead><tbody><tr><td>设备方向</td><td>无</td><td>无</td></tr><tr><td>设备运动</td><td>无</td><td>无</td></tr><tr><td>环境光</td><td>需要用户授权</td><td>是</td></tr><tr><td>地理定位</td><td>需要用户授权</td><td>是</td></tr><tr><td>接近传感器</td><td>需要用户授权</td><td>是</td></tr></tbody></table><h3 id="_6-2-隐私最佳实践" tabindex="-1">6.2 隐私最佳实践 <a class="header-anchor" href="#_6-2-隐私最佳实践" aria-label="Permalink to &quot;6.2 隐私最佳实践&quot;">​</a></h3><ol><li><strong>最小数据原则</strong>：仅请求必要的传感器数据</li><li><strong>透明告知</strong>：明确说明传感器数据用途</li><li><strong>数据本地化</strong>：尽可能在客户端处理数据</li><li><strong>安全传输</strong>：使用HTTPS传输敏感数据</li><li><strong>用户控制</strong>：提供关闭传感器的选项</li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 实现用户控制</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sensorControls</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  orientation: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  motion: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  light: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  location: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> toggleSensor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sensorType</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (sensorControls[sensorType]) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 关闭传感器</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(sensorType) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;orientation&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        window.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, orientationHandler);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;motion&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        window.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;devicemotion&#39;</span><span class="__shiki_140thh">, motionHandler);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;light&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (lightSensor) lightSensor.</span><span class="__shiki_1t8gfj">stop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;location&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stopTracking</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    sensorControls[sensorType] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开启传感器</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(sensorType) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;orientation&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, orientationHandler);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;motion&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;devicemotion&#39;</span><span class="__shiki_140thh">, motionHandler);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;light&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">        setupLightSensor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;location&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">        startTracking</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    sensorControls[sensorType] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、性能优化" tabindex="-1">七、性能优化 <a class="header-anchor" href="#七、性能优化" aria-label="Permalink to &quot;七、性能优化&quot;">​</a></h2><h3 id="_7-1-优化策略" tabindex="-1">7.1 优化策略 <a class="header-anchor" href="#_7-1-优化策略" aria-label="Permalink to &quot;7.1 优化策略&quot;">​</a></h3><table tabindex="0"><thead><tr><th>策略</th><th>实现方式</th><th>效果</th></tr></thead><tbody><tr><td><strong>事件节流</strong></td><td>使用requestAnimationFrame</td><td>减少处理频率</td></tr><tr><td><strong>数据过滤</strong></td><td>低通滤波器</td><td>消除高频噪声</td></tr><tr><td><strong>按需启用</strong></td><td>动态开启/关闭传感器</td><td>节省电量</td></tr><tr><td><strong>Web Workers</strong></td><td>后台处理数据</td><td>避免阻塞UI</td></tr></tbody></table><h3 id="_7-2-使用web-workers处理传感器数据" tabindex="-1">7.2 使用Web Workers处理传感器数据 <a class="header-anchor" href="#_7-2-使用web-workers处理传感器数据" aria-label="Permalink to &quot;7.2 使用Web Workers处理传感器数据&quot;">​</a></h3><p><strong>主线程代码：</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建Worker</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sensorWorker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Worker</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sensor-processor.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 发送数据到Worker</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> sendToWorker</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">  sensorWorker.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 接收处理结果</span></span>
<span class="line"><span class="__shiki_140thh">sensorWorker.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> processedData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> event.data;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  updateUI</span><span class="__shiki_140thh">(processedData);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方向数据处理</span></span>
<span class="line"><span class="__shiki_140thh">window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sendToWorker</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&#39;orientation&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    data: {</span></span>
<span class="line"><span class="__shiki_140thh">      alpha: event.alpha,</span></span>
<span class="line"><span class="__shiki_140thh">      beta: event.beta,</span></span>
<span class="line"><span class="__shiki_140thh">      gamma: event.gamma</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><p><strong>sensor-processor.js (Worker)：</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 卡尔曼滤波器实现（简化版）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> KalmanFilter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">processNoise</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">measurementNoise</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">Q</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> processNoise;   </span><span class="__shiki_21nrsd">// 过程噪声</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">R</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> measurementNoise; </span><span class="__shiki_21nrsd">// 测量噪声</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">P</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;              </span><span class="__shiki_21nrsd">// 估计误差协方差</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">X</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;              </span><span class="__shiki_21nrsd">// 估计值</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">measurement</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 预测</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> X_pred</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">X</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> P_pred</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">P</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">Q</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> K</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> P_pred </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (P_pred </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">R</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">X</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> X_pred </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> K</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> (measurement </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> X_pred);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">P</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> K</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> P_pred;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">X</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 为每个轴创建滤波器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> filters</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  alpha: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> KalmanFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">  beta: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> KalmanFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">  gamma: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> KalmanFilter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 处理消息</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">type</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.data;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;orientation&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用卡尔曼滤波</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> processed</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      alpha: filters.alpha.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(data.alpha),</span></span>
<span class="line"><span class="__shiki_140thh">      beta: filters.beta.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(data.beta),</span></span>
<span class="line"><span class="__shiki_140thh">      gamma: filters.gamma.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(data.gamma),</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送回主线程</span></span>
<span class="line"><span class="__shiki_140thh">    self.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">(processed);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="八、实际应用案例" tabindex="-1">八、实际应用案例 <a class="header-anchor" href="#八、实际应用案例" aria-label="Permalink to &quot;八、实际应用案例&quot;">​</a></h2><h3 id="_8-1-虚拟现实-vr-展示" tabindex="-1">8.1 虚拟现实（VR）展示 <a class="header-anchor" href="#_8-1-虚拟现实-vr-展示" aria-label="Permalink to &quot;8.1 虚拟现实（VR）展示&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> VRViewer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;vr-container&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.isFullscreen </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查设备支持</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">supportsVR</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">showUnsupportedMessage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置事件监听</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupOrientationTracking</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupFullscreenToggle</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  supportsVR</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &#39;DeviceOrientationEvent&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupOrientationTracking</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.isFullscreen) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 应用旋转到3D场景</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rotateScene</span><span class="__shiki_140thh">(event.beta, event.gamma);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  rotateScene</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">beta</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">gamma</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 转换为弧度</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> radBeta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> beta </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 180</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> radGamma</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> gamma </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 180</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 限制角度范围</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> maxAngle</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 60度</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> limitedBeta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">maxAngle, Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(maxAngle, radBeta));</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> limitedGamma</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">maxAngle, Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(maxAngle, radGamma));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用变换</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container.style.transform </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">      \`rotateX(\${</span><span class="__shiki_140thh">limitedBeta</span><span class="__shiki_mdbnqw">}rad) rotateY(\${</span><span class="__shiki_140thh">limitedGamma</span><span class="__shiki_mdbnqw">}rad)\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupFullscreenToggle</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> btn</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;vr-toggle&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    btn.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.isFullscreen) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">enterVR</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">exitVR</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  enterVR</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container.</span><span class="__shiki_1t8gfj">requestFullscreen</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.isFullscreen </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      screen.orientation.</span><span class="__shiki_1t8gfj">lock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;landscape&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }).</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(console.error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  exitVR</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    document.</span><span class="__shiki_1t8gfj">exitFullscreen</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.isFullscreen </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container.style.transform </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-基于位置的游戏" tabindex="-1">8.2 基于位置的游戏 <a class="header-anchor" href="#_8-2-基于位置的游戏" aria-label="Permalink to &quot;8.2 基于位置的游戏&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LocationBasedGame</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.targets </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">      { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, lat: </span><span class="__shiki_dzsirb">37.7749</span><span class="__shiki_140thh">, lng: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">122.4194</span><span class="__shiki_140thh">, name: </span><span class="__shiki_mdbnqw">&quot;金门大桥&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      { id: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, lat: </span><span class="__shiki_dzsirb">37.8199</span><span class="__shiki_140thh">, lng: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">122.4783</span><span class="__shiki_140thh">, name: </span><span class="__shiki_mdbnqw">&quot;阿尔卡特拉斯岛&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    ];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.playerPosition </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.gameInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">navigator.geolocation) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">showUnsupported</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 请求位置权限</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.playerPosition </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getPosition</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startGame</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;位置获取失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getPosition</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      navigator.geolocation.</span><span class="__shiki_1t8gfj">getCurrentPosition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">        position</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> resolve</span><span class="__shiki_140thh">(position.coords),</span></span>
<span class="line"><span class="__shiki_1jdh33">        error</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> reject</span><span class="__shiki_140thh">(error),</span></span>
<span class="line"><span class="__shiki_140thh">        { enableHighAccuracy: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, timeout: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  startGame</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 每10秒更新位置</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.gameInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.playerPosition </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getPosition</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkTargets</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;位置更新失败&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始检查</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkTargets</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  checkTargets</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.targets.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> distance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateDistance</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.playerPosition.latitude,</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.playerPosition.longitude,</span></span>
<span class="line"><span class="__shiki_140thh">        target.lat,</span></span>
<span class="line"><span class="__shiki_140thh">        target.lng</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (distance </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 50米范围内</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectTarget</span><span class="__shiki_140thh">(target);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateDistance</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">lat1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">lon1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">lat2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">lon2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Haversine公式计算距离（米）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> R</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 6371e3</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 地球半径（米）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> φ1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> lat1 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">180</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> φ2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> lat2 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">180</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> Δφ</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (lat2</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">lat1) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">180</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> Δλ</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (lon2</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">lon1) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_dzsirb">PI</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">180</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">sin</span><span class="__shiki_140thh">(Δφ</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">sin</span><span class="__shiki_140thh">(Δφ</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span></span>
<span class="line"><span class="__shiki_140thh">              Math.</span><span class="__shiki_1t8gfj">cos</span><span class="__shiki_140thh">(φ1) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">cos</span><span class="__shiki_140thh">(φ2) </span><span class="__shiki_1itgoe">*</span></span>
<span class="line"><span class="__shiki_140thh">              Math.</span><span class="__shiki_1t8gfj">sin</span><span class="__shiki_140thh">(Δλ</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">sin</span><span class="__shiki_140thh">(Δλ</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">atan2</span><span class="__shiki_140thh">(Math.</span><span class="__shiki_1t8gfj">sqrt</span><span class="__shiki_140thh">(a), Math.</span><span class="__shiki_1t8gfj">sqrt</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">a));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> R</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> c;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  collectTarget</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`已收集目标: \${</span><span class="__shiki_140thh">target</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从目标列表中移除</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.targets </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.targets.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> t.id </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> target.id);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新UI</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateTargetList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查游戏是否结束</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.targets.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">endGame</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  endGame</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    clearInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.gameInterval);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    alert</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;恭喜！你已收集所有目标！&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、调试与测试" tabindex="-1">九、调试与测试 <a class="header-anchor" href="#九、调试与测试" aria-label="Permalink to &quot;九、调试与测试&quot;">​</a></h2><h3 id="_9-1-桌面端模拟传感器" tabindex="-1">9.1 桌面端模拟传感器 <a class="header-anchor" href="#_9-1-桌面端模拟传感器" aria-label="Permalink to &quot;9.1 桌面端模拟传感器&quot;">​</a></h3><ol><li><p><strong>Chrome DevTools 模拟</strong>：</p><ul><li>打开DevTools (Ctrl+Shift+I)</li><li>转到 Sensors 面板</li><li>模拟地理位置、设备方向和触摸</li></ul></li><li><p><strong>Firefox 模拟</strong>：</p><ul><li>打开开发者工具 (F12)</li><li>转到 &quot;Responsive Design Mode&quot;</li><li>使用传感器模拟选项</li></ul></li></ol><h3 id="_9-2-真机调试" tabindex="-1">9.2 真机调试 <a class="header-anchor" href="#_9-2-真机调试" aria-label="Permalink to &quot;9.2 真机调试&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 调试函数</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> logSensorData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">groupCollapsed</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;传感器数据&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 方向数据</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (window.DeviceOrientationEvent) {</span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> logOrientation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;方向:&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        alpha: event.alpha,</span></span>
<span class="line"><span class="__shiki_140thh">        beta: event.beta,</span></span>
<span class="line"><span class="__shiki_140thh">        gamma: event.gamma</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      window.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deviceorientation&#39;</span><span class="__shiki_140thh">, logOrientation);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 运动数据</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (window.DeviceMotionEvent) {</span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;devicemotion&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> logMotion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;运动:&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        acceleration: event.acceleration,</span></span>
<span class="line"><span class="__shiki_140thh">        accelerationIncludingGravity: event.accelerationIncludingGravity,</span></span>
<span class="line"><span class="__shiki_140thh">        rotationRate: event.rotationRate</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      window.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;devicemotion&#39;</span><span class="__shiki_140thh">, logMotion);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">groupEnd</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在需要时调用</span></span>
<span class="line"><span class="__shiki_140thh">document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;debugBtn&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, logSensorData);</span></span></code></pre></div><h2 id="十、未来发展趋势" tabindex="-1">十、未来发展趋势 <a class="header-anchor" href="#十、未来发展趋势" aria-label="Permalink to &quot;十、未来发展趋势&quot;">​</a></h2><h3 id="_10-1-新兴传感器-api" tabindex="-1">10.1 新兴传感器 API <a class="header-anchor" href="#_10-1-新兴传感器-api" aria-label="Permalink to &quot;10.1 新兴传感器 API&quot;">​</a></h3><table tabindex="0"><thead><tr><th>API名称</th><th>描述</th><th>状态</th></tr></thead><tbody><tr><td><strong>Generic Sensor API</strong></td><td>传感器统一接口</td><td>草案</td></tr><tr><td><strong>Magnetometer</strong></td><td>磁力计（指南针）</td><td>实验性</td></tr><tr><td><strong>GravitySensor</strong></td><td>重力传感器</td><td>实验性</td></tr><tr><td><strong>LinearAccelerationSensor</strong></td><td>线性加速度传感器</td><td>实验性</td></tr><tr><td><strong>AbsoluteOrientationSensor</strong></td><td>绝对方向传感器</td><td>实验性</td></tr></tbody></table><h3 id="_10-2-generic-sensor-api-示例" tabindex="-1">10.2 Generic Sensor API 示例 <a class="header-anchor" href="#_10-2-generic-sensor-api-示例" aria-label="Permalink to &quot;10.2 Generic Sensor API 示例&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> setupGenericSensors</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建加速度计</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> accelerometer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Accelerometer</span><span class="__shiki_140thh">({ frequency: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    accelerometer.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;reading&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;加速度:&#39;</span><span class="__shiki_140thh">, accelerometer.x, accelerometer.y, accelerometer.z);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    accelerometer.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建陀螺仪</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> gyroscope</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Gyroscope</span><span class="__shiki_140thh">({ frequency: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    gyroscope.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;reading&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;角速度:&#39;</span><span class="__shiki_140thh">, gyroscope.x, gyroscope.y, gyroscope.z);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    gyroscope.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建环境光传感器</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> lightSensor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AmbientLightSensor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    lightSensor.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;reading&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;光照强度:&#39;</span><span class="__shiki_140thh">, lightSensor.illuminance);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    lightSensor.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;传感器初始化失败:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="关键知识点" tabindex="-1">关键知识点 <a class="header-anchor" href="#关键知识点" aria-label="Permalink to &quot;关键知识点&quot;">​</a></h3><ol><li><p><strong>API分类</strong>：</p><ul><li>方向/运动：<code>DeviceOrientationEvent</code>, <code>DeviceMotionEvent</code></li><li>环境：<code>AmbientLightSensor</code>, <code>ProximitySensor</code></li><li>位置：<code>Geolocation API</code></li><li>通用：<code>Generic Sensor API</code></li></ul></li><li><p><strong>权限模型</strong>：</p><ul><li>方向/运动：无需权限</li><li>环境/位置：需要用户授权</li></ul></li><li><p><strong>最佳实践</strong>：</p><ul><li>按需启用传感器</li><li>数据处理使用Web Workers</li><li>添加节流和滤波</li><li>提供用户控制选项</li></ul></li></ol><h3 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h3><ul><li><strong>游戏开发</strong>：动作控制、AR体验</li><li><strong>健康应用</strong>：步数计数、活动监测</li><li><strong>导航应用</strong>：室内定位、方向指引</li><li><strong>自适应UI</strong>：基于光线调整主题</li><li><strong>教育应用</strong>：物理实验模拟</li></ul><h3 id="学习资源" tabindex="-1">学习资源 <a class="header-anchor" href="#学习资源" aria-label="Permalink to &quot;学习资源&quot;">​</a></h3><ul><li><a href="https://www.w3.org/TR/generic-sensor/" target="_blank" rel="noreferrer">W3C Generic Sensor API</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Sensor_APIs" target="_blank" rel="noreferrer">MDN 传感器文档</a></li><li><a href="https://googlechrome.github.io/samples/" target="_blank" rel="noreferrer">Google 传感器示例</a></li><li><a href="https://caniuse.com/?search=sensor" target="_blank" rel="noreferrer">传感器API兼容性表</a></li></ul><blockquote><p><strong>重要提示</strong>：传感器API仍在快速发展中，部分功能可能不稳定或存在兼容性问题。在生产环境中使用前，务必进行充分的设备测试和优雅降级处理。</p></blockquote>`,71)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
