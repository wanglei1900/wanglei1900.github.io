import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const p="/img/upload/%E5%A4%A7%E6%96%87%E4%BB%B6%E5%88%86%E7%89%87%E4%B8%8A%E4%BC%A0%E7%A4%BA%E4%BE%8B.png",r=JSON.parse('{"title":"大文件分片上传，断点续传，秒传 示例","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/web/upload/vue3-sample.md","filePath":"frontend/web/upload/vue3-sample.md"}'),h={name:"frontend/web/upload/vue3-sample.md"};function l(t,s,c,e,k,o){return n(),_("div",null,[...s[0]||(s[0]=[i('<h1 id="大文件分片上传-断点续传-秒传-示例" tabindex="-1">大文件分片上传，断点续传，秒传 示例 <a class="header-anchor" href="#大文件分片上传-断点续传-秒传-示例" aria-label="Permalink to &quot;大文件分片上传，断点续传，秒传 示例&quot;">​</a></h1><p><img src="'+p+`" alt="大文件分片上传示例" loading="lazy"></p><p><a href="https://github.com/Neveryu/bigfile-upload" target="_blank" rel="noreferrer">开源源码地址传输</a></p><h3 id="_1-html代码" tabindex="-1">1.html代码 <a class="header-anchor" href="#_1-html代码" aria-label="Permalink to &quot;1.html代码&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">	&lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;card content-box&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">		&lt;</span><span class="__shiki_17hn0y">el-upload</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;upload&quot;</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;upload-demo&quot;</span><span class="__shiki_1t8gfj"> action</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">			:limit</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_1t8gfj"> :on-change</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;handleFileChange&quot;</span><span class="__shiki_1t8gfj"> :auto-upload</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;false&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_1t8gfj"> #trigger</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_1t8gfj"> type</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;primary&quot;</span><span class="__shiki_140thh">&gt;选择文件&lt;/</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_1t8gfj"> :disabled</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;uploadDisabled&quot;</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ml-3&quot;</span><span class="__shiki_1t8gfj"> type</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_1t8gfj"> @click</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;handlerUpload&quot;</span><span class="__shiki_140thh">&gt;上传&lt;/</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ml-3&quot;</span><span class="__shiki_1t8gfj"> type</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_1t8gfj"> @click</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;handlePause&quot;</span><span class="__shiki_140thh">&gt;暂停&lt;/</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ml-3&quot;</span><span class="__shiki_1t8gfj"> type</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_1t8gfj"> @click</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;handleResume&quot;</span><span class="__shiki_140thh">&gt;恢复&lt;/</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;ml-3&quot;</span><span class="__shiki_1t8gfj"> type</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_1t8gfj"> @click</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;resetData&quot;</span><span class="__shiki_140thh">&gt;重置&lt;/</span><span class="__shiki_17hn0y">el-button</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_1t8gfj"> #tip</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">br</span><span class="__shiki_140thh"> /&gt;&lt;</span><span class="__shiki_17hn0y">br</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;计算文件hash进度： {{ hashPercentage }}%&lt;/</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">br</span><span class="__shiki_140thh"> /&gt;&lt;</span><span class="__shiki_17hn0y">br</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;上传进度：{{ fakeUploadPercentage }}%&lt;/</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">el-progress</span><span class="__shiki_1t8gfj"> :text-inside</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_1t8gfj"> :stroke-width</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;26&quot;</span><span class="__shiki_1t8gfj"> :percentage</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;fakeUploadPercentage&quot;</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">				&lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;el-upload__tip text-red&quot;</span><span class="__shiki_140thh">&gt;限制一个文件, 新文件将会覆盖原文件&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			&lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">		&lt;/</span><span class="__shiki_17hn0y">el-upload</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">	&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_2-逻辑代码" tabindex="-1">2.逻辑代码 <a class="header-anchor" href="#_2-逻辑代码" aria-label="Permalink to &quot;2.逻辑代码&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">script setup lang</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;ts&quot;</span><span class="__shiki_140thh"> name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;menu222&quot;</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { ElMessage } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;element-plus&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> type</span><span class="__shiki_140thh"> { UploadInstance, UploadProps, UploadRawFile } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;element-plus&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Upload } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/api/interface&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { UploadStatusEnum } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/enums/uploadEnum&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { SIZE } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/config/config&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { bigUploadRequest } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/api/modules/upload&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> upload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">UploadInstance</span><span class="__shiki_140thh">&gt;()</span></span>
<span class="line"><span class="__shiki_21nrsd">// 当前的请求xhr组成的数组</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> requestListArr</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">XMLHttpRequest</span><span class="__shiki_140thh">[]&gt;([])</span></span>
<span class="line"><span class="__shiki_21nrsd">// 组装的filechunk分段文件</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Upload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">data</span><span class="__shiki_140thh">[]&gt;([])</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">&gt;(UploadStatusEnum.wait)</span></span>
<span class="line"><span class="__shiki_21nrsd">// 生成文件hash的进度</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> hashPercentage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">// 显示在页面上的文件上传进度</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fakeUploadPercentage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> ref</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">// 定义上传文件的容器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> container</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> reactive</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Upload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Container</span><span class="__shiki_140thh">&gt;({</span></span>
<span class="line"><span class="__shiki_140thh">	file: {</span></span>
<span class="line"><span class="__shiki_140thh">		name: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		percentage: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		status: UploadStatusEnum.ready,</span></span>
<span class="line"><span class="__shiki_140thh">		size: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		url: </span><span class="__shiki_dzsirb">undefined</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		raw: </span><span class="__shiki_dzsirb">undefined</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		uid: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	hash: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">	worker: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 计算：文件上传的进度</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> uploadPercentage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> computed</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1t8gfj">	get</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">container.file </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">data.value.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">		const</span><span class="__shiki_dzsirb"> loaded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> data.value.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> item.size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> item.percentage).</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">acc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cur</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> acc </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> cur })</span></span>
<span class="line"><span class="__shiki_140thh">		console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;loaded&#39;</span><span class="__shiki_140thh">, loaded);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_1t8gfj"> parseInt</span><span class="__shiki_140thh">((loaded </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> container.file.size</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_1t8gfj">	set</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 计算：上传按钮是否可以点击</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> uploadDisabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> computed</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> disabledStatus</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [UploadStatusEnum.pause, UploadStatusEnum.uploading]</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">container.file </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> disabledStatus.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(status.value))</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// watch uploadPercentage，得到fakeUploadPercentage</span></span>
<span class="line"><span class="__shiki_21nrsd">// 至于为什么要这么做，看【恢复上传】的注释</span></span>
<span class="line"><span class="__shiki_1t8gfj">watch</span><span class="__shiki_140thh">(uploadPercentage, (</span><span class="__shiki_1jdh33">newValue</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (newValue </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> fakeUploadPercentage.value) {</span></span>
<span class="line"><span class="__shiki_140thh">		fakeUploadPercentage.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> newValue</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 选择了文件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> handleFileChange</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> UploadProps</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;onChange&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">uploadFile</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">uploadFiles</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">	resetData</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">uploadFile) </span><span class="__shiki_1itgoe">return</span></span>
<span class="line"><span class="__shiki_140thh">	container.file </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> uploadFile</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 上传</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> handlerUpload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">container.file.raw) </span><span class="__shiki_1itgoe">return</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 点了上传按钮，状态改为上传中...</span></span>
<span class="line"><span class="__shiki_140thh">	status.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UploadStatusEnum.uploading</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 文件分片</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> fileChunkList</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createFileChunk</span><span class="__shiki_140thh">(container.file.raw)</span></span>
<span class="line"><span class="__shiki_140thh">	console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;文件分了多少片：&#39;</span><span class="__shiki_140thh">, fileChunkList.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 通过webworker计算出，文件hash</span></span>
<span class="line"><span class="__shiki_140thh">	container.hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> calculateHash</span><span class="__shiki_140thh">(fileChunkList)</span></span>
<span class="line"><span class="__shiki_140thh">	console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;文件hash是：&#39;</span><span class="__shiki_140thh">, container.hash)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// uploadedList已上传的切片的切片文件名称</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">shouldUpload</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">uploadedList</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> verifyUpload</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">		container.file.name,</span></span>
<span class="line"><span class="__shiki_140thh">		container.hash</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 组装的filechunk数据先置空</span></span>
<span class="line"><span class="__shiki_140thh">	data.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 服务器已经有完整文件了</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">shouldUpload) {</span></span>
<span class="line"><span class="__shiki_140thh">		fakeUploadPercentage.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">		status.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UploadStatusEnum.wait</span></span>
<span class="line"><span class="__shiki_1itgoe">		await</span><span class="__shiki_1t8gfj"> nextTick</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span><span class="__shiki_140thh"> ElMessage.</span><span class="__shiki_1t8gfj">success</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;秒传：上传成功&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">	data.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> fileChunkList.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">file</span><span class="__shiki_140thh"> }, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">		fileHash: container.hash,</span></span>
<span class="line"><span class="__shiki_140thh">		index,</span></span>
<span class="line"><span class="__shiki_140thh">		hash: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">container</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">hash</span><span class="__shiki_mdbnqw">}-\${</span><span class="__shiki_140thh">index</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		chunk: file,</span></span>
<span class="line"><span class="__shiki_140thh">		size: file.size,</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 如果已上传切片数组uploadedList中包含这个切片，则证明这个切片之前已经上传成功了，进度设为100。</span></span>
<span class="line"><span class="__shiki_140thh">		percentage: uploadedList.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(index.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">	}))</span></span>
<span class="line"><span class="__shiki_140thh">	console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;数组&#39;</span><span class="__shiki_140thh">, data);</span></span>
<span class="line"><span class="__shiki_1t8gfj">	uploadChunks</span><span class="__shiki_140thh">(uploadedList)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 暂停</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> handlePause</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	status.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UploadStatusEnum.pause</span></span>
<span class="line"><span class="__shiki_140thh">	requestListArr.value.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">xhr</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> xhr?.</span><span class="__shiki_1t8gfj">abort</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">	requestListArr.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (container.worker) {</span></span>
<span class="line"><span class="__shiki_140thh">		container.worker.onmessage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 重置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> resetData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	hashPercentage.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">	uploadPercentage.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">	fakeUploadPercentage.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">	requestListArr.value.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">xhr</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> xhr?.</span><span class="__shiki_1t8gfj">abort</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">	requestListArr.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (container.worker) {</span></span>
<span class="line"><span class="__shiki_140thh">		container.worker.onmessage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 【恢复上传】</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 上传进度是实时根据所有的上传切片的进度汇总来的</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 只有某个切片完整/全部上传到了服务端，才算这个切片上传完成了</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 如果，一些切片如果只上传了一部分，就被暂停了，那么恢复上传时，这一些切片是需要重新上传的</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 这样就会导致恢复上传时，上传进度倒退的问题（因为上传进度是计算属性，是实时计算切片，汇总而来的）</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> handleResume</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">	status.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UploadStatusEnum.uploading</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">uploadedList</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> verifyUpload</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">		container.file.name,</span></span>
<span class="line"><span class="__shiki_140thh">		container.hash</span></span>
<span class="line"><span class="__shiki_140thh">	)</span></span>
<span class="line"><span class="__shiki_1t8gfj">	uploadChunks</span><span class="__shiki_140thh">(uploadedList)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 生成文件切片</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> file</span><span class="__shiki_21nrsd"> 上传的文件</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> size</span><span class="__shiki_21nrsd">  文件大小</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@return</span><span class="__shiki_1t8gfj"> {*}</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> createFileChunk</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">file</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> UploadRawFile</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> SIZE</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> fileChunkList</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">	let</span><span class="__shiki_140thh"> cur </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">	while</span><span class="__shiki_140thh"> (cur </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> file.size) {</span></span>
<span class="line"><span class="__shiki_140thh">		fileChunkList.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">			file: file.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(cur, cur </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> size),</span></span>
<span class="line"><span class="__shiki_140thh">		})</span></span>
<span class="line"><span class="__shiki_140thh">		cur </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> size</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> fileChunkList</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 根据文件内容生成hash，而不是根据文件名称生成hash。</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 考虑到如果上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞，</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 导致页面假死状态，所以我们使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> fileChunkList</span><span class="__shiki_21nrsd"> 切片数组</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@return</span><span class="__shiki_1t8gfj"> {*}</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> calculateHash</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">fileChunkList</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Upload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">FileChunk</span><span class="__shiki_140thh">[]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">&gt;((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 开启worker</span></span>
<span class="line"><span class="__shiki_140thh">		container.worker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Worker</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/hash.js&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 向worker线程传入参数（注意传入的是对象，使用了解构写法）</span></span>
<span class="line"><span class="__shiki_140thh">		container.worker.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">({ fileChunkList })</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 接受来自worker线程的 加工后的回复</span></span>
<span class="line"><span class="__shiki_140thh">		container.worker.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">			// console.log(&#39;calculateHash_Worker接收的参数&#39;, e);</span></span>
<span class="line"><span class="__shiki_1itgoe">			const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">percentage</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">hash</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> e.data</span></span>
<span class="line"><span class="__shiki_140thh">			hashPercentage.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> percentage.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 若得到哈希值，则resolve返回</span></span>
<span class="line"><span class="__shiki_1itgoe">			if</span><span class="__shiki_140thh"> (hash) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">				resolve</span><span class="__shiki_140thh">(hash)</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// https://blog.51cto.com/u_15091669/2608437  xhr对象POST请求、xhr兼容性、timeout、progress</span></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 上传切片进度的回调函数,用闭包保存每个chunk的进度数据</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> index</span><span class="__shiki_21nrsd"> 切片的索引</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> item</span><span class="__shiki_21nrsd"> 每个切片</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@return</span><span class="__shiki_1t8gfj"> {*}</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> createProgressHandler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Upload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">data</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ProgressEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> (e.lengthComputable) {</span></span>
<span class="line"><span class="__shiki_140thh">			item.percentage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> parseInt</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">((e.loaded </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> e.total) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 验证该文件是否需要上次，文件通过hash生成唯一，改名后也是不需要再上传的，也就相当于妙传</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> filename</span><span class="__shiki_21nrsd"> 文件名</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> fileHash</span><span class="__shiki_21nrsd"> 文件哈希值</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@return</span><span class="__shiki_1t8gfj"> {*}</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> verifyUpload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">filename</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fileHash</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">result</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> bigUploadRequest</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">		url: </span><span class="__shiki_mdbnqw">&#39;http://localhost:9999/verify&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		method: </span><span class="__shiki_mdbnqw">&#39;post&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		headers: { </span><span class="__shiki_mdbnqw">&#39;content-type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">		data: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">			filename,</span></span>
<span class="line"><span class="__shiki_140thh">			fileHash,</span></span>
<span class="line"><span class="__shiki_140thh">		}),</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@description</span><span class="__shiki_21nrsd">: 上传切片，同时过滤已上传的切片</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj"> {*}</span><span class="__shiki_140thh"> uploadedList</span><span class="__shiki_21nrsd"> 已经上传了的切片，这次不用上传了</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@return</span><span class="__shiki_1t8gfj"> {*}</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> uploadChunks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">uploadedList</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> requestList</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> data.value.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">hash</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">uploadedList.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(hash))</span></span>
<span class="line"><span class="__shiki_140thh">		.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">chunk</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">hash</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">			const</span><span class="__shiki_dzsirb"> formData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> FormData</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 切片文件</span></span>
<span class="line"><span class="__shiki_140thh">			formData.</span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;chunk&#39;</span><span class="__shiki_140thh">, chunk)</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 切片文件hash</span></span>
<span class="line"><span class="__shiki_140thh">			formData.</span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;hash&#39;</span><span class="__shiki_140thh">, hash)</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 大文件的文件名</span></span>
<span class="line"><span class="__shiki_140thh">			formData.</span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;filename&#39;</span><span class="__shiki_140thh">, container.file.name)</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 大文件hash</span></span>
<span class="line"><span class="__shiki_140thh">			formData.</span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fileHash&#39;</span><span class="__shiki_140thh">, container.hash)</span></span>
<span class="line"><span class="__shiki_1itgoe">			return</span><span class="__shiki_140thh"> { formData, index }</span></span>
<span class="line"><span class="__shiki_140thh">		})</span></span>
<span class="line"><span class="__shiki_140thh">		.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> ({ </span><span class="__shiki_1jdh33">formData</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">			bigUploadRequest</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">				url: </span><span class="__shiki_mdbnqw">&#39;http://localhost:9999&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">				data: formData,</span></span>
<span class="line"><span class="__shiki_140thh">				onProgress: </span><span class="__shiki_1t8gfj">createProgressHandler</span><span class="__shiki_140thh">(index, data.value[index]),</span></span>
<span class="line"><span class="__shiki_140thh">				requestList: requestListArr.value,</span></span>
<span class="line"><span class="__shiki_140thh">			})</span></span>
<span class="line"><span class="__shiki_140thh">		)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 并发切片</span></span>
<span class="line"><span class="__shiki_1itgoe">	await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(requestList)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">	// 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 切片并发上传完以后，发个请求告诉后端：合并切片</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> (uploadedList.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> requestList.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_140thh"> data.value.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">		mergeRequest</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 发请求通知服务器，合并切片</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> mergeRequest</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	await</span><span class="__shiki_1t8gfj"> bigUploadRequest</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">		url: </span><span class="__shiki_mdbnqw">&#39;http://localhost:9999/merge&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">			&#39;content-type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		},</span></span>
<span class="line"><span class="__shiki_140thh">		data: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">			size: </span><span class="__shiki_dzsirb">SIZE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			fileHash: container.hash,</span></span>
<span class="line"><span class="__shiki_140thh">			filename: container.file.name,</span></span>
<span class="line"><span class="__shiki_140thh">		}),</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_140thh">	ElMessage.</span><span class="__shiki_1t8gfj">success</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;上传成功&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	status.value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UploadStatusEnum.wait</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">script</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h3 id="_3-单独的大文件上传请求" tabindex="-1">3.单独的大文件上传请求 <a class="header-anchor" href="#_3-单独的大文件上传请求" aria-label="Permalink to &quot;3.单独的大文件上传请求&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// @/api/modules/upload</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Upload } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/api/interface/index&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">// * 大文件上传的单独的request</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> bigUploadRequest</span><span class="__shiki_140thh">({ </span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">method</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;post&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">headers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}, </span><span class="__shiki_1jdh33">onProgress</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> e, </span><span class="__shiki_1jdh33">requestList</span><span class="__shiki_140thh"> }</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Upload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">specialRequest</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Upload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">verifyUpload</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">	return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		const</span><span class="__shiki_dzsirb"> xhr</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> XMLHttpRequest</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 一个无符号长整型（unsigned long）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。</span></span>
<span class="line"><span class="__shiki_21nrsd">		// xhr.timeout = 100000</span></span>
<span class="line"><span class="__shiki_140thh">		xhr.upload.onprogress </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> onProgress</span></span>
<span class="line"><span class="__shiki_140thh">		xhr.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">(method, url)</span></span>
<span class="line"><span class="__shiki_140thh">		Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(headers).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span></span>
<span class="line"><span class="__shiki_140thh">			xhr.</span><span class="__shiki_1t8gfj">setRequestHeader</span><span class="__shiki_140thh">(key, headers[key])</span></span>
<span class="line"><span class="__shiki_140thh">		)</span></span>
<span class="line"><span class="__shiki_140thh">		xhr.</span><span class="__shiki_1t8gfj">ontimeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ProgressEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;请求超时&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		xhr.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_21nrsd">		// XMLHttpRequest请求成功完成时触发；</span></span>
<span class="line"><span class="__shiki_140thh">		xhr.</span><span class="__shiki_1t8gfj">onload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ProgressEvent</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">			// 将请求成功的 xhr 从列表中删除</span></span>
<span class="line"><span class="__shiki_1itgoe">			if</span><span class="__shiki_140thh"> (requestList) {</span></span>
<span class="line"><span class="__shiki_1itgoe">				const</span><span class="__shiki_dzsirb"> xhrIndex</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> requestList.</span><span class="__shiki_1t8gfj">findIndex</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">item</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> xhr)</span></span>
<span class="line"><span class="__shiki_140thh">				requestList.</span><span class="__shiki_1t8gfj">splice</span><span class="__shiki_140thh">(xhrIndex, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"><span class="__shiki_1itgoe">			let</span><span class="__shiki_140thh"> target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_1t8gfj">XMLHttpRequest</span><span class="__shiki_140thh">&gt;e.target</span></span>
<span class="line"><span class="__shiki_1itgoe">			let</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(target.response)</span></span>
<span class="line"><span class="__shiki_1t8gfj">			resolve</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">				result</span></span>
<span class="line"><span class="__shiki_140thh">			})</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 当请求结束时触发, 无论请求成功(load)还是失败(abort 或 error)。也可以使用 onloadend 属性。</span></span>
<span class="line"><span class="__shiki_140thh">		xhr.</span><span class="__shiki_1t8gfj">onloadend</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> e</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 暴露当前 xhr 给外部</span></span>
<span class="line"><span class="__shiki_140thh">		requestList?.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(xhr)</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-webworker-帮助切片" tabindex="-1">4 webworker 帮助切片 <a class="header-anchor" href="#_4-webworker-帮助切片" aria-label="Permalink to &quot;4 webworker 帮助切片&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// hash.js</span></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 在 worker 中也是不允许访问 dom 的；</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 但它提供了importScripts函数用于导入外部脚本，通过它导入spark-md5；</span></span>
<span class="line"><span class="__shiki_21nrsd"> * Worker中没有window，Worker中self指向顶层对象。</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">importScripts</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./spark-md5.min.js&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 正因为每个文件的md5是一样的，那么，我们在做文件上传的时候，</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 就只要在前端先获取要上传的文件md5值，</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 并把文件md5传到服务器进行校验，对比之前文件的md5，如果存在相同的md5，</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 我们只要把文件的名字传到服务器关联之前的文件即可，并不需要再次去上传相同的文件。</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@Author</span><span class="__shiki_21nrsd">   Author</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@DateTime</span><span class="__shiki_21nrsd"> 2021-12-31T15:23:48+0800</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@param</span><span class="__shiki_1t8gfj">    {[type]}</span><span class="__shiki_140thh">                 e</span><span class="__shiki_21nrsd"> [description]</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@return</span><span class="__shiki_1t8gfj">   {[type]}</span><span class="__shiki_21nrsd">                   [description]</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_140thh">self.</span><span class="__shiki_1t8gfj">onmessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1jdh33"> e</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">fileChunkList</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> e.data</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> spark</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> self.SparkMD5.</span><span class="__shiki_1t8gfj">ArrayBuffer</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">	let</span><span class="__shiki_140thh"> percentage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">	let</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_1t8gfj"> loadNext</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1jdh33"> index</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">		const</span><span class="__shiki_dzsirb"> reader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> FileReader</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">		reader.</span><span class="__shiki_1t8gfj">readAsArrayBuffer</span><span class="__shiki_140thh">(fileChunkList[index].file)</span></span>
<span class="line"><span class="__shiki_140thh">		reader.</span><span class="__shiki_1t8gfj">onload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1jdh33"> e</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			count</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">			spark.</span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(e.target.result)</span></span>
<span class="line"><span class="__shiki_1itgoe">			if</span><span class="__shiki_140thh"> (count </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> fileChunkList.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">				self.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">					percentage: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					hash: spark.</span><span class="__shiki_1t8gfj">end</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">				})</span></span>
<span class="line"><span class="__shiki_140thh">				self.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">			} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">				percentage </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> fileChunkList.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">				self.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">					percentage</span></span>
<span class="line"><span class="__shiki_140thh">				})</span></span>
<span class="line"><span class="__shiki_1t8gfj">				loadNext</span><span class="__shiki_140thh">(count)</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1t8gfj">	loadNext</span><span class="__shiki_140thh">(count)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 思考：</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 1、有人建议：大文件计算太慢，WebAssembly技术来计算md5可以加快50%的速度</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * 【笔记】</span></span>
<span class="line"><span class="__shiki_21nrsd"> * SparkMD5是MD5算法的一个快速md5实现。这个脚本基于JKM md5库，是目前最快的算法。这最适合在浏览器上使用，因为nodejs版本可能会更快。</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span></code></pre></div>`,11)])])}const d=a(h,[["render",l]]);export{r as __pageData,d as default};
