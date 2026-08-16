import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Go 语言基础语法学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/languages/go/syntax.md","filePath":"backend/languages/go/syntax.md"}'),p={name:"backend/languages/go/syntax.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="go-语言基础语法学习笔记" tabindex="-1">Go 语言基础语法学习笔记 <a class="header-anchor" href="#go-语言基础语法学习笔记" aria-label="Permalink to &quot;Go 语言基础语法学习笔记&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><ul><li><a href="#go-语言基础语法学习笔记">Go 语言基础语法学习笔记</a><ul><li><a href="#目录">目录</a></li><li><a href="#变量声明">变量声明</a></li><li><a href="#数据类型">数据类型</a><ul><li><a href="#基本类型">基本类型</a></li><li><a href="#类型转换">类型转换</a></li></ul></li><li><a href="#运算符">运算符</a></li><li><a href="#控制结构">控制结构</a><ul><li><a href="#条件语句">条件语句</a></li><li><a href="#循环语句">循环语句</a></li></ul></li><li><a href="#函数">函数</a></li><li><a href="#复合数据类型">复合数据类型</a><ul><li><a href="#数组">数组</a></li><li><a href="#切片动态数组">切片（动态数组）</a></li><li><a href="#映射map">映射（Map）</a></li></ul></li><li><a href="#结构体与方法">结构体与方法</a></li><li><a href="#接口">接口</a></li><li><a href="#错误处理">错误处理</a></li><li><a href="#并发编程">并发编程</a><ul><li><a href="#goroutine">Goroutine</a></li><li><a href="#channel">Channel</a></li><li><a href="#同步原语">同步原语</a></li></ul></li></ul></li></ul><hr><h2 id="变量声明" tabindex="-1">变量声明 <a class="header-anchor" href="#变量声明" aria-label="Permalink to &quot;变量声明&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 标准声明</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> value</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 类型推导</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> value</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 简短声明（函数内使用）</span></span>
<span class="line"><span class="__shiki_140thh">name </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> value</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多变量声明</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> a, b, c </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">x, y </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;hello&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 常量声明</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> Pi</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3.14</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    StatusOK</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 200</span></span>
<span class="line"><span class="__shiki_dzsirb">    StatusCreated</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 201</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><hr><h2 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h2><h3 id="基本类型" tabindex="-1">基本类型 <a class="header-anchor" href="#基本类型" aria-label="Permalink to &quot;基本类型&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 布尔型</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> isActive </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数值型</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> num </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 42</span><span class="__shiki_21nrsd">        // 整数</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> pi </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3.14</span><span class="__shiki_21nrsd">   // 浮点数</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">complex64</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">i</span><span class="__shiki_21nrsd">  // 复数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 字符串</span></span>
<span class="line"><span class="__shiki_140thh">str </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> &quot;Hello, 世界&quot;</span><span class="__shiki_21nrsd">    // UTF-8编码</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 字符</span></span>
<span class="line"><span class="__shiki_140thh">runeVar </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">A</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_21nrsd">          // rune类型（int32别名）</span></span></code></pre></div><h3 id="类型转换" tabindex="-1">类型转换 <a class="header-anchor" href="#类型转换" aria-label="Permalink to &quot;类型转换&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 42</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> f </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> u </span><span class="__shiki_1itgoe">uint</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> uint</span><span class="__shiki_140thh">(f)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 类型断言</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> emptyInterface </span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{} </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;hello&quot;</span></span>
<span class="line"><span class="__shiki_140thh">str </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> emptyInterface.(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">)</span></span></code></pre></div><hr><h2 id="运算符" tabindex="-1">运算符 <a class="header-anchor" href="#运算符" aria-label="Permalink to &quot;运算符&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 算术运算符</span></span>
<span class="line"><span class="__shiki_1itgoe">+</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_1itgoe"> %</span><span class="__shiki_1itgoe"> ++</span><span class="__shiki_1itgoe"> --</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 关系运算符</span></span>
<span class="line"><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_1itgoe"> &lt;=</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 逻辑运算符</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1itgoe"> !</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 位运算符</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> ^</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_1itgoe"> &gt;&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 赋值运算符</span></span>
<span class="line"><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> +=</span><span class="__shiki_1itgoe"> -=</span><span class="__shiki_1itgoe"> *=</span><span class="__shiki_1itgoe"> /=</span><span class="__shiki_1itgoe"> %=</span><span class="__shiki_1itgoe"> &lt;&lt;=</span><span class="__shiki_1itgoe"> &gt;&gt;=</span><span class="__shiki_1itgoe"> &amp;=</span><span class="__shiki_1itgoe"> ^=</span><span class="__shiki_1itgoe"> |=</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 地址运算符</span></span>
<span class="line"><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_21nrsd">   // 取地址和解引用</span></span></code></pre></div><hr><h2 id="控制结构" tabindex="-1">控制结构 <a class="header-anchor" href="#控制结构" aria-label="Permalink to &quot;控制结构&quot;">​</a></h2><h3 id="条件语句" tabindex="-1">条件语句 <a class="header-anchor" href="#条件语句" aria-label="Permalink to &quot;条件语句&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// if-else</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// switch</span></span>
<span class="line"><span class="__shiki_1itgoe">switch</span><span class="__shiki_140thh"> day {</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_mdbnqw"> &quot;Mon&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Monday&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_mdbnqw"> &quot;Tue&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Tuesday&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Other day&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// type switch</span></span>
<span class="line"><span class="__shiki_1itgoe">switch</span><span class="__shiki_140thh"> v </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> i.(</span><span class="__shiki_1itgoe">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Integer: </span><span class="__shiki_dzsirb">%v\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, v)</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;String: </span><span class="__shiki_dzsirb">%v\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, v)</span></span>
<span class="line"><span class="__shiki_1itgoe">default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Unknown type</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="循环语句" tabindex="-1">循环语句 <a class="header-anchor" href="#循环语句" aria-label="Permalink to &quot;循环语句&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// for循环</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// while替代</span></span>
<span class="line"><span class="__shiki_140thh">sum </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    sum </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> sum</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 无限循环</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// range循环</span></span>
<span class="line"><span class="__shiki_140thh">arr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> index, value </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> arr {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Index: </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">, Value: </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, index, value)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基本函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">a</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多返回值</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> swap</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">x</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">y</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> y, x</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 命名返回值</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> split</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) (</span><span class="__shiki_1jdh33">x</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">y</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    x </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 9</span></span>
<span class="line"><span class="__shiki_140thh">    y </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> x</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_21nrsd"> // 自动返回x,y</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 变参函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> sum</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">nums</span><span class="__shiki_1itgoe"> ...int</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    total </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, num </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> nums {</span></span>
<span class="line"><span class="__shiki_140thh">        total </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> num</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> total</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 匿名函数</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Anonymous function&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}()</span></span></code></pre></div><hr><h2 id="复合数据类型" tabindex="-1">复合数据类型 <a class="header-anchor" href="#复合数据类型" aria-label="Permalink to &quot;复合数据类型&quot;">​</a></h2><h3 id="数组" tabindex="-1">数组 <a class="header-anchor" href="#数组" aria-label="Permalink to &quot;数组&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 固定长度数组</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> a [</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">b </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;a&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;b&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;c&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多维数组</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> matrix [</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">][</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span></span></code></pre></div><h3 id="切片-动态数组" tabindex="-1">切片（动态数组） <a class="header-anchor" href="#切片-动态数组" aria-label="Permalink to &quot;切片（动态数组）&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建切片</span></span>
<span class="line"><span class="__shiki_140thh">s </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)      </span><span class="__shiki_21nrsd">// 长度5，容量5</span></span>
<span class="line"><span class="__shiki_140thh">s </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">}      </span><span class="__shiki_21nrsd">// 初始化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 切片操作</span></span>
<span class="line"><span class="__shiki_140thh">arr </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">slice </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> arr[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">]        </span><span class="__shiki_21nrsd">// [2,3,4]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 追加元素</span></span>
<span class="line"><span class="__shiki_140thh">s </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(s, </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复制切片</span></span>
<span class="line"><span class="__shiki_1t8gfj">copy</span><span class="__shiki_140thh">(dest, src)</span></span></code></pre></div><h3 id="映射-map" tabindex="-1">映射（Map） <a class="header-anchor" href="#映射-map" aria-label="Permalink to &quot;映射（Map）&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建map</span></span>
<span class="line"><span class="__shiki_140thh">m </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">m </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;Alice&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;Bob&quot;</span><span class="__shiki_140thh">:   </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 操作</span></span>
<span class="line"><span class="__shiki_140thh">m[</span><span class="__shiki_mdbnqw">&quot;Charlie&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 28</span><span class="__shiki_21nrsd">        // 添加/修改</span></span>
<span class="line"><span class="__shiki_140thh">age, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> m[</span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd">// 检查存在</span></span>
<span class="line"><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(m, </span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">)       </span><span class="__shiki_21nrsd">// 删除</span></span></code></pre></div><hr><h2 id="结构体与方法" tabindex="-1">结构体与方法 <a class="header-anchor" href="#结构体与方法" aria-label="Permalink to &quot;结构体与方法&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 定义结构体</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Name </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Age  </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实例化</span></span>
<span class="line"><span class="__shiki_140thh">p </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">p </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh">{Name: </span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">, Age: </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法定义</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">SayHello</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello, I&#39;m </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, p.Name)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 指针接收者方法</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Birthday</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    p.Age</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="接口" tabindex="-1">接口 <a class="header-anchor" href="#接口" aria-label="Permalink to &quot;接口&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 接口定义</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Shape</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Area</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Perimeter</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实现接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Rectangle</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Width, Height </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1t8gfj">Rectangle</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Area</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> r.Width </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> r.Height</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">r </span><span class="__shiki_1t8gfj">Rectangle</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Perimeter</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">(r.Width </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> r.Height)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 空接口</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> any </span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1t8gfj">any</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 42</span></span>
<span class="line"><span class="__shiki_1t8gfj">any</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;hello&quot;</span></span></code></pre></div><hr><h2 id="错误处理" tabindex="-1">错误处理 <a class="header-anchor" href="#错误处理" aria-label="Permalink to &quot;错误处理&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 错误接口</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Error</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建错误</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;something went wrong&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">result, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> someFunction</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理错误</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义错误</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MyError</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Msg </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Code </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MyError</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, e.Code, e.Msg)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="并发编程" tabindex="-1">并发编程 <a class="header-anchor" href="#并发编程" aria-label="Permalink to &quot;并发编程&quot;">​</a></h2><h3 id="goroutine" tabindex="-1">Goroutine <a class="header-anchor" href="#goroutine" aria-label="Permalink to &quot;Goroutine&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启动goroutine</span></span>
<span class="line"><span class="__shiki_1itgoe">go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Running in goroutine&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}()</span></span></code></pre></div><h3 id="channel" tabindex="-1">Channel <a class="header-anchor" href="#channel" aria-label="Permalink to &quot;Channel&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建channel</span></span>
<span class="line"><span class="__shiki_140thh">ch </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 发送数据</span></span>
<span class="line"><span class="__shiki_140thh">ch </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_dzsirb"> 42</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 接收数据</span></span>
<span class="line"><span class="__shiki_140thh">value </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ch</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 带缓冲channel</span></span>
<span class="line"><span class="__shiki_140thh">bufCh </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 关闭channel</span></span>
<span class="line"><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">(ch)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// select语句</span></span>
<span class="line"><span class="__shiki_1itgoe">select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_140thh"> msg </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ch1:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received&quot;</span><span class="__shiki_140thh">, msg)</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_140thh"> ch2 </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_dzsirb"> 42</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Sent 42&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second):</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Timeout&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="同步原语" tabindex="-1">同步原语 <a class="header-anchor" href="#同步原语" aria-label="Permalink to &quot;同步原语&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// WaitGroup</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> wg </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WaitGroup</span></span>
<span class="line"><span class="__shiki_140thh">wg.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> wg.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}()</span></span>
<span class="line"><span class="__shiki_140thh">wg.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Mutex</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> mu </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> counter </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">counter</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span></code></pre></div><hr><blockquote><p><strong>最佳实践提示</strong>:</p><ol><li>使用<code>go fmt</code>保持代码格式统一</li><li>避免全局变量，优先使用局部变量</li><li>错误处理要明确，不要忽略错误</li><li>并发访问共享资源时使用同步机制</li><li>使用接口提高代码灵活性和可测试性</li></ol><p>参考官方文档：<a href="https://go.dev/doc/" target="_blank" rel="noreferrer">https://go.dev/doc/</a></p></blockquote><p><img src="https://example.com/go-learning-path.png" alt="Go语言学习路径" loading="lazy"><em>图：Go语言学习路径建议</em></p>`,52)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
