import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"如何封装一个通用的echarts组件","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/core/javascript/library/echarts.md","filePath":"frontend/core/javascript/library/echarts.md"}'),p={name:"frontend/core/javascript/library/echarts.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="如何封装一个通用的echarts组件" tabindex="-1">如何封装一个通用的echarts组件 <a class="header-anchor" href="#如何封装一个通用的echarts组件" aria-label="Permalink to &quot;如何封装一个通用的echarts组件&quot;">​</a></h1><h2 id="_1-图表大屏自适应的解决方案" tabindex="-1">1 图表大屏自适应的解决方案 <a class="header-anchor" href="#_1-图表大屏自适应的解决方案" aria-label="Permalink to &quot;1 图表大屏自适应的解决方案&quot;">​</a></h2><h3 id="_1-1-通过window-onresize-api-监听页面视口大小改变时-自适应变化-echarts-resize" tabindex="-1">1.1 通过window.onresize api 监听页面视口大小改变时，自适应变化（echarts.resize()） <a class="header-anchor" href="#_1-1-通过window-onresize-api-监听页面视口大小改变时-自适应变化-echarts-resize" aria-label="Permalink to &quot;1.1 通过window.onresize api 监听页面视口大小改变时，自适应变化（echarts.resize()）&quot;">​</a></h3><h4 id="vue2-组件代码" tabindex="-1">vue2 组件代码 <a class="header-anchor" href="#vue2-组件代码" aria-label="Permalink to &quot;vue2 组件代码&quot;">​</a></h4><p>要求实现功能</p><ol><li>echarts图表要能自适应大小，并且能够岁窗口自适应resize</li><li>大屏首页有很echarts图标且要不停切换，需防止内存泄漏</li><li>接口定时刷新返回数据时，需要自动更新echarts</li><li>需要绑定自定义的echarts图表的X轴和标题的点击事件</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;myChart&quot;</span><span class="__shiki_2bbn9v"> :class=&quot;className&quot;</span><span class="__shiki_2bbn9v"> :style=&quot;{</span><span class="__shiki_2bbn9v"> height:</span><span class="__shiki_2bbn9v"> height,</span><span class="__shiki_2bbn9v"> width:</span><span class="__shiki_1t8gfj"> width</span><span class="__shiki_2bbn9v"> }&quot;</span><span class="__shiki_2bbn9v"> :option=&quot;option&quot;/&gt;</span></span>
<span class="line"><span class="__shiki_2bbn9v">&lt;/template&gt;</span></span>
<span class="line"><span class="__shiki_2bbn9v">&lt;script&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">import</span><span class="__shiki_2bbn9v"> *</span><span class="__shiki_1t8gfj"> as</span><span class="__shiki_1t8gfj"> echarts</span><span class="__shiki_1t8gfj"> from</span><span class="__shiki_mdbnqw"> &quot;echarts&quot;</span><span class="__shiki_2bbn9v">;</span></span>
<span class="line"><span class="__shiki_21nrsd">// 缩放作防抖</span></span>
<span class="line"><span class="__shiki_1t8gfj">import</span><span class="__shiki_140thh"> { debounce } </span><span class="__shiki_1t8gfj">from</span><span class="__shiki_mdbnqw"> &quot;@/utils&quot;</span><span class="__shiki_2bbn9v">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">export</span><span class="__shiki_1t8gfj"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  props: {</span></span>
<span class="line"><span class="__shiki_140thh">    className: {</span></span>
<span class="line"><span class="__shiki_140thh">      type: String,</span></span>
<span class="line"><span class="__shiki_140thh">      default: </span><span class="__shiki_mdbnqw">&quot;chart&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    width: {</span></span>
<span class="line"><span class="__shiki_140thh">      type: String,</span></span>
<span class="line"><span class="__shiki_140thh">      default: </span><span class="__shiki_mdbnqw">&quot;100%&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    height: {</span></span>
<span class="line"><span class="__shiki_140thh">      type: String,</span></span>
<span class="line"><span class="__shiki_140thh">      default: </span><span class="__shiki_mdbnqw">&quot;100%&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 图标样式和数据</span></span>
<span class="line"><span class="__shiki_140thh">    option: {</span></span>
<span class="line"><span class="__shiki_140thh">      type: Object,</span></span>
<span class="line"><span class="__shiki_140thh">      required: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      default</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({}),</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  data</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    return {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      chart</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  mounted</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成echart实例</span></span>
<span class="line"><span class="__shiki_140thh">    this.initChart();</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 给窗口缩放resize加防抖</span></span>
<span class="line"><span class="__shiki_140thh">    this.__resizeHandler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> debounce</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.chart) </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.chart.</span><span class="__shiki_1t8gfj">resize</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 绑定窗口缩放resize事件</span></span>
<span class="line"><span class="__shiki_140thh">    window.addEventListener(</span><span class="__shiki_mdbnqw">&quot;resize&quot;</span><span class="__shiki_140thh">, this.__resizeHandler);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // * 绑定echarts X轴，标题的点击事件（当X轴或者标题是动态生成时，绑定在mounted无效）</span></span>
<span class="line"><span class="__shiki_21nrsd">    // this.chart.on(&#39;click&#39;,&#39;xAxis&#39;,this.getDepartmentByxAxis)</span></span>
<span class="line"><span class="__shiki_21nrsd">    // this.chart.on(&#39;click&#39;,&#39;title&#39;,this.getDepartmentByTitle)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeDestroy</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 销毁echart，防止内存泄露</span></span>
<span class="line"><span class="__shiki_1t8gfj">    if</span><span class="__shiki_140thh"> (!this.chart) return;</span></span>
<span class="line"><span class="__shiki_140thh">    window.removeEventListener(</span><span class="__shiki_mdbnqw">&quot;resize&quot;</span><span class="__shiki_140thh">, this.__resizeHandler);</span></span>
<span class="line"><span class="__shiki_140thh">    this.chart.off(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    this.$off()</span></span>
<span class="line"><span class="__shiki_140thh">    this.chart.dispose();</span></span>
<span class="line"><span class="__shiki_140thh">    this.chart = null;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  methods: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    initChart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.chart </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">)  </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.chart.</span><span class="__shiki_1t8gfj">dispose</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.chart </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> echarts.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.$refs.myChart);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 因为有时候X轴是动态生成的，所以当绑定事件必须写在这里，否在单击未绑定在相应的位置</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.chart.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw">&#39;xAxis&#39;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.getDepartmentByxAxis)</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.chart.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.getDepartmentByTitle)</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.chart.</span><span class="__shiki_1t8gfj">setOption</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.option,</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">//设置为true时不会合并数据，而是重新刷新数据</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1t8gfj">    getDepartmentByxAxis</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">params</span><span class="__shiki_140thh">){</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">$emit</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;departmentByAxis&#39;</span><span class="__shiki_140thh">,params.value) </span><span class="__shiki_21nrsd">// 通过X坐标，通知父组件部门的名字</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1t8gfj">    getDepartmentByTitle</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">params</span><span class="__shiki_140thh">){</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">$emit</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;departmenByTitle&#39;</span><span class="__shiki_140thh">,params?.event?.target?.style?.text) </span><span class="__shiki_21nrsd">// 通过title，通知父组件部门的名字</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  watch:{</span></span>
<span class="line"><span class="__shiki_140thh">    option:{</span></span>
<span class="line"><span class="__shiki_140thh">      deep:</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      handler</span><span class="__shiki_140thh">(){</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">initChart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">script</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><br><h4 id="vue3-组件代码" tabindex="-1">vue3 组件代码 <a class="header-anchor" href="#vue3-组件代码" aria-label="Permalink to &quot;vue3 组件代码&quot;">​</a></h4><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">  &lt;</span><span class="__shiki_140thh">div ref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;myChartsRef&quot;</span><span class="__shiki_140thh"> :class</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;className&quot;</span><span class="__shiki_140thh"> :style</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;{ height: height, width: width }&quot;</span><span class="__shiki_140thh"> :option</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;option&quot;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">template</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">script setup lang</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ts&#39;</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { ref, watch, onMounted, onBeforeUnmount } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;vue&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { ECharts, EChartsOption, init } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;echarts&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定义props</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Props</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  className</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> string</span></span>
<span class="line"><span class="__shiki_1jdh33">  width</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> string</span></span>
<span class="line"><span class="__shiki_1jdh33">  height</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> string</span></span>
<span class="line"><span class="__shiki_1jdh33">  option</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> EChartsOption</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> props</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> withDefaults</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">defineProps</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Props</span><span class="__shiki_140thh">&gt;(), {</span></span>
<span class="line"><span class="__shiki_140thh">  className: </span><span class="__shiki_mdbnqw">&#39;chart&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  width: </span><span class="__shiki_mdbnqw">&#39;100%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  height: </span><span class="__shiki_mdbnqw">&#39;100%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  option</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({})</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> myChartsRef</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">HTMLDivElement</span><span class="__shiki_140thh">&gt;()</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> myChart</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ECharts</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> timer</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> initChart</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> void</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (myChart </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> undefined</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    myChart.</span><span class="__shiki_1t8gfj">dispose</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  myChart </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">(myChartsRef.value </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1t8gfj"> HTMLDivElement</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  myChart?.</span><span class="__shiki_1t8gfj">setOption</span><span class="__shiki_140thh">(props.option, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> resizeChart</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> void</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  timer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (myChart) {</span></span>
<span class="line"><span class="__shiki_140thh">      myChart.</span><span class="__shiki_1t8gfj">resize</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">onMounted</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  initChart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;resize&#39;</span><span class="__shiki_140thh">, resizeChart)</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">onBeforeUnmount</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  window.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;resize&#39;</span><span class="__shiki_140thh">, resizeChart)</span></span>
<span class="line"><span class="__shiki_1t8gfj">  clearTimeout</span><span class="__shiki_140thh">(timer)</span></span>
<span class="line"><span class="__shiki_140thh">  timer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">watch</span><span class="__shiki_140thh">(props.option, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  initChart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}, {</span></span>
<span class="line"><span class="__shiki_140thh">  deep: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">script</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><br><h3 id="_1-2-通过resizeobserver-api-监听组装echarts容器的大小-自适应变化-echarts-resize" tabindex="-1">1.2 通过ResizeObserver api 监听组装echarts容器的大小，自适应变化（echarts.resize()） <a class="header-anchor" href="#_1-2-通过resizeobserver-api-监听组装echarts容器的大小-自适应变化-echarts-resize" aria-label="Permalink to &quot;1.2 通过ResizeObserver api 监听组装echarts容器的大小，自适应变化（echarts.resize()）&quot;">​</a></h3><h4 id="vue2-组件代码-1" tabindex="-1">vue2 组件代码 <a class="header-anchor" href="#vue2-组件代码-1" aria-label="Permalink to &quot;vue2 组件代码&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;myChart&quot;</span><span class="__shiki_1t8gfj"> :class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;className&quot;</span><span class="__shiki_1t8gfj"> :style</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;{ height: height, width: width }&quot;</span><span class="__shiki_1t8gfj"> :option</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;option&quot;</span><span class="__shiki_2bbn9v"> /</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { debounce } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/core/util/util&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  props: {</span></span>
<span class="line"><span class="__shiki_140thh">    className: { type: String, default: </span><span class="__shiki_mdbnqw">&quot;chart&quot;</span><span class="__shiki_140thh">, },</span></span>
<span class="line"><span class="__shiki_140thh">    width: { type: String, default: </span><span class="__shiki_mdbnqw">&quot;100%&quot;</span><span class="__shiki_140thh">, },</span></span>
<span class="line"><span class="__shiki_140thh">    height: { type: String, default: </span><span class="__shiki_mdbnqw">&quot;100%&quot;</span><span class="__shiki_140thh">, },</span></span>
<span class="line"><span class="__shiki_140thh">    option: { type: Object, required: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">default</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({}), }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  data</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      instance: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      resizeObserver: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  mounted</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">initChart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeDestroy</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.instance) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disposeChart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disposeResizeObserver</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.resizeObserver </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  methods: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化Chart</span></span>
<span class="line"><span class="__shiki_1t8gfj">    initChart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.instance) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disposeChart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">disposeResizeObserver</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> window.echarts.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.$refs.myChart)</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">initResizeObserver</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">loadChart</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加载表格</span></span>
<span class="line"><span class="__shiki_1t8gfj">    loadChart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.instance?.</span><span class="__shiki_1t8gfj">setOption</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.option, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">//设置为true时不会合并数据，而是重新刷新数据</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.resizeObserver </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.instance?.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;finished&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">loadResizeObserver</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 销毁Chart</span></span>
<span class="line"><span class="__shiki_1t8gfj">    disposeChart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.instance?.</span><span class="__shiki_1t8gfj">dispose</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化ResizeObserver</span></span>
<span class="line"><span class="__shiki_1t8gfj">    initResizeObserver</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.instance) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> __resizeHandler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> debounce</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.instance?.</span><span class="__shiki_1t8gfj">resize</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.resizeObserver </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ResizeObserver</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">entries</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">observer</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        __resizeHandler</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开启监视ResizeObserver</span></span>
<span class="line"><span class="__shiki_1t8gfj">    loadResizeObserver</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.resizeObserver?.</span><span class="__shiki_1t8gfj">observe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.$refs.myChart);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 销毁ResizeObserver</span></span>
<span class="line"><span class="__shiki_1t8gfj">    disposeResizeObserver</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.resizeObserver?.</span><span class="__shiki_1t8gfj">unobserve</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.$refs.myChart);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.resizeObserver?.</span><span class="__shiki_1t8gfj">disconnect</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  watch: {</span></span>
<span class="line"><span class="__shiki_140thh">    option: {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // immediate:true,</span></span>
<span class="line"><span class="__shiki_140thh">      deep: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      handler</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">loadChart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><br><h4 id="react-组件代码" tabindex="-1">react 组件代码 <a class="header-anchor" href="#react-组件代码" aria-label="Permalink to &quot;react 组件代码&quot;">​</a></h4><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* eslint-disable @typescript-eslint/no-unused-vars */</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useCallback, useEffect, useRef } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;react&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { ECElementEvent } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;echarts/core&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> echarts, { ECOption } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;./config&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> useResizeObserver </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/hooks/useResizeObserver&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Props</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  option</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ECOption</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  renderer</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_mdbnqw"> &quot;canvas&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_mdbnqw"> &quot;svg&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  theme</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> object</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  width</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  height</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  onClick</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ECElementEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> ReactEcharts</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> React</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">FC</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Props</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ({ </span><span class="__shiki_1jdh33">option</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">renderer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;canvas&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">theme</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">width</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;100%&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">height</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;100%&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">onClick</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 挂载echarts的DOM</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> echartsRef</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useRef</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">HTMLDivElement</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">  // echarts 实例对象</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> echartsInstance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useRef</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">echarts</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">EChartsType</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 缓存onResize 函数以免引起useResizeObserver重复创建</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> onResize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useCallback</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    echartsInstance.current?.</span><span class="__shiki_1t8gfj">resize</span><span class="__shiki_140thh">({ animation: { duration: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, delay: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_140thh">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 监听容器变化并触发echarts的resize</span></span>
<span class="line"><span class="__shiki_1t8gfj">  useResizeObserver</span><span class="__shiki_140thh">(echartsRef, onResize, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 图标点击事件</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> handleClick</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ECElementEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (onClick) </span><span class="__shiki_1t8gfj">onClick</span><span class="__shiki_140thh">(event);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 初始化 echarts</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> initChart</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (echartsInstance.current) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    echartsInstance.current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> echarts.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">(echartsRef.current, theme, { renderer });</span></span>
<span class="line"><span class="__shiki_140thh">    echartsInstance.current.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;click&quot;</span><span class="__shiki_140thh">, handleClick);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 绘制 echarts</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> drawChart</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    echartsInstance.current?.</span><span class="__shiki_1t8gfj">setOption</span><span class="__shiki_140thh">(option, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 设置为true时不会合并数据，而是重新刷新数据</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 销毁Chart</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> disposeChart</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    echartsInstance.current?.</span><span class="__shiki_1t8gfj">dispose</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    echartsInstance.current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 初次加载</span></span>
<span class="line"><span class="__shiki_1t8gfj">  useEffect</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    initChart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      disposeChart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }, []);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 每次option变化</span></span>
<span class="line"><span class="__shiki_1t8gfj">  useEffect</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    drawChart</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }, [option]);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1t8gfj">div</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">={</span><span class="__shiki_1jdh33">echartsRef</span><span class="__shiki_140thh">} </span><span class="__shiki_1t8gfj">style</span><span class="__shiki_140thh">={{ </span><span class="__shiki_1jdh33">width</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">height</span><span class="__shiki_140thh"> }} /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> ReactEcharts;</span></span></code></pre></div><br><h3 id="_1-3-两种自适应方案的比较" tabindex="-1">1.3 两种自适应方案的比较 <a class="header-anchor" href="#_1-3-两种自适应方案的比较" aria-label="Permalink to &quot;1.3 两种自适应方案的比较&quot;">​</a></h3><ul><li>window.onresize 兼容性好，但是只能根据视口改变才能自适应。假如当组装echarts的容器大小改变但是页面视口并没有改变是无法自适应的。比如后台管理页面，侧边栏伸缩展开时。比如父组件大小是卡片可以拉拽调整大小</li><li>ResizeObserver 是有兼容性问题。他能够监听指定父容器的大小来进行自适应。也有其他补充方法可以解决兼容性问题。</li></ul><h2 id="_2-echarts-事件与行为交互" tabindex="-1">2 echarts 事件与行为交互 <a class="header-anchor" href="#_2-echarts-事件与行为交互" aria-label="Permalink to &quot;2 echarts 事件与行为交互&quot;">​</a></h2><h3 id="_2-1-前置知识" tabindex="-1">2.1 前置知识 <a class="header-anchor" href="#_2-1-前置知识" aria-label="Permalink to &quot;2.1 前置知识&quot;">​</a></h3><ol><li>用户直接与图表内容的交互（鼠标）</li><li>用户直接与图表组件的的交互（鼠标）</li><li>代码层面控制与图表的交互，外部区域的事件统一触发图表区域的事件或者自动执行图表行为</li><li>区分事件与行为，所有事件名称均小写</li><li>绑定事件通过实例的 on 和 off 方法，代码触发用 dispatchAction</li><li>需要更进阶的交互需要访问底层 zrender 图形元素，通过 getZr 方法</li></ol><br><h3 id="_2-2-echarts-事件与行为" tabindex="-1">2.2 echarts 事件与行为 <a class="header-anchor" href="#_2-2-echarts-事件与行为" aria-label="Permalink to &quot;2.2 echarts 事件与行为&quot;">​</a></h3><p><a href="https://echarts.apache.org/handbook/zh/concepts/event" target="_blank" rel="noreferrer">echarts 文档 📚 事件与行为</a></p><ul><li><p><a href="https://echarts.apache.org/handbook/zh/concepts/event#%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%A4%84%E7%90%86" target="_blank" rel="noreferrer">echarts 文档 📚 鼠标事件的处理</a></p></li><li><p><a href="https://echarts.apache.org/handbook/zh/concepts/event#%E7%BB%84%E4%BB%B6%E4%BA%A4%E4%BA%92%E7%9A%84%E8%A1%8C%E4%B8%BA%E4%BA%8B%E4%BB%B6" target="_blank" rel="noreferrer">echarts 文档 📚 组件交互的行为事件</a></p></li><li><p><a href="https://echarts.apache.org/handbook/zh/concepts/event#%E4%BB%A3%E7%A0%81%E8%A7%A6%E5%8F%91-echarts-%E4%B8%AD%E7%BB%84%E4%BB%B6%E7%9A%84%E8%A1%8C%E4%B8%BA" target="_blank" rel="noreferrer">echarts 文档 📚 代码触发 ECharts 中组件的行为</a></p></li><li><p><a href="https://echarts.apache.org/handbook/zh/concepts/event#%E7%9B%91%E5%90%AC%E2%80%9C%E7%A9%BA%E7%99%BD%E5%A4%84%E2%80%9D%E7%9A%84%E4%BA%8B%E4%BB%B6" target="_blank" rel="noreferrer">echarts 文档 📚 监听“空白处”的事件</a></p></li></ul><br><h3 id="_2-3-echarts-实例绑定事件-on" tabindex="-1">2.3 echarts 实例绑定事件 on <a class="header-anchor" href="#_2-3-echarts-实例绑定事件-on" aria-label="Permalink to &quot;2.3 echarts 实例绑定事件 on&quot;">​</a></h3><p><a href="https://echarts.apache.org/zh/api.html#echartsInstance.on" target="_blank" rel="noreferrer">echarts 文档 📚 on 绑定</a></p><br><h3 id="_2-4-echarts-实例解绑事件-off" tabindex="-1">2.4 echarts 实例解绑事件 off <a class="header-anchor" href="#_2-4-echarts-实例解绑事件-off" aria-label="Permalink to &quot;2.4 echarts 实例解绑事件 off&quot;">​</a></h3><p><a href="https://echarts.apache.org/zh/api.html#echartsInstance.off" target="_blank" rel="noreferrer">echarts 文档 📚 off 解绑</a></p><br><h3 id="_2-5-echarts-代码触发-dispatchaction" tabindex="-1">2.5 echarts 代码触发 dispatchAction <a class="header-anchor" href="#_2-5-echarts-代码触发-dispatchaction" aria-label="Permalink to &quot;2.5 echarts 代码触发 dispatchAction&quot;">​</a></h3><p><a href="https://echarts.apache.org/zh/api.html#echartsInstance.dispatchAction" target="_blank" rel="noreferrer">echarts 文档 📚 dispatchAction 触发</a></p><br><h3 id="_2-6-echarts-事件名称-events" tabindex="-1">2.6 echarts 事件名称 events <a class="header-anchor" href="#_2-6-echarts-事件名称-events" aria-label="Permalink to &quot;2.6 echarts 事件名称 events&quot;">​</a></h3><p><a href="https://echarts.apache.org/zh/api.html#events" target="_blank" rel="noreferrer">echarts 文档 📚 events 事件名称</a></p><br><h3 id="_2-7-echarts-进阶-zrender-事件" tabindex="-1">2.7 echarts 进阶 zrender 事件 <a class="header-anchor" href="#_2-7-echarts-进阶-zrender-事件" aria-label="Permalink to &quot;2.7 echarts 进阶 zrender 事件&quot;">​</a></h3><br><h2 id="_3-遇到的问题" tabindex="-1">3 遇到的问题 <a class="header-anchor" href="#_3-遇到的问题" aria-label="Permalink to &quot;3 遇到的问题&quot;">​</a></h2><ul><li>2023.1.14 <ul><li><strong>PS：当涉及到页面需要切换显示多个echarts，vue里需使用v-if进行切换而不是v-show，否则会出现加载时图表缩成一团的bug</strong></li></ul></li><li>2023.3.27 <ul><li><strong>PS：flex布局下echarts的缩放会出现问题，例如出现在一行多列的弹性盒中，需要单独给flex-item子项设置一个最小宽度或高度</strong></li></ul></li><li>2023.6.21 <ul><li><strong>PS：【Echarts】图表大屏自适应的升级解决方案，请滑到底部</strong></li></ul></li></ul>`,44)])])}const d=a(p,[["render",h]]);export{o as __pageData,d as default};
