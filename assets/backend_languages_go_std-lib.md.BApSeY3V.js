import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Go 标准库学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/languages/go/std-lib.md","filePath":"backend/languages/go/std-lib.md"}'),p={name:"backend/languages/go/std-lib.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="go-标准库学习笔记" tabindex="-1">Go 标准库学习笔记 <a class="header-anchor" href="#go-标准库学习笔记" aria-label="Permalink to &quot;Go 标准库学习笔记&quot;">​</a></h1><h2 id="核心模块概览" tabindex="-1">核心模块概览 <a class="header-anchor" href="#核心模块概览" aria-label="Permalink to &quot;核心模块概览&quot;">​</a></h2><h3 id="输入-输出处理" tabindex="-1">输入/输出处理 <a class="header-anchor" href="#输入-输出处理" aria-label="Permalink to &quot;输入/输出处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">io</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">bufio</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 文件读写示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> fileIOExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建文件</span></span>
<span class="line"><span class="__shiki_140thh">    file, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test.txt&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        panic</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> file.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写入内容</span></span>
<span class="line"><span class="__shiki_140thh">    writer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewWriter</span><span class="__shiki_140thh">(file)</span></span>
<span class="line"><span class="__shiki_140thh">    writer.</span><span class="__shiki_1t8gfj">WriteString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello, Go Standard Library!</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    writer.</span><span class="__shiki_1t8gfj">Flush</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取内容</span></span>
<span class="line"><span class="__shiki_140thh">    reader </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewReader</span><span class="__shiki_140thh">(file)</span></span>
<span class="line"><span class="__shiki_140thh">    content, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> io.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">(reader)</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(content))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="网络编程" tabindex="-1">网络编程 <a class="header-anchor" href="#网络编程" aria-label="Permalink to &quot;网络编程&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// HTTP服务器示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> httpServerExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    http.</span><span class="__shiki_1t8gfj">HandleFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        w.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello from Go HTTP Server&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_140thh"> http.</span><span class="__shiki_1t8gfj">ListenAndServe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;:8080&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// TCP客户端示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> tcpClientExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">Dial</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tcp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost:8080&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        panic</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    conn.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GET / HTTP/1.0</span><span class="__shiki_dzsirb">\\r\\n\\r\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    response, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> io.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(response))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="并发处理" tabindex="-1">并发处理 <a class="header-anchor" href="#并发处理" aria-label="Permalink to &quot;并发处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> concurrencyExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> wg </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WaitGroup</span></span>
<span class="line"><span class="__shiki_140thh">    wg.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Goroutine 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        defer</span><span class="__shiki_140thh"> wg.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second)</span></span>
<span class="line"><span class="__shiki_140thh">        fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Goroutine 1 completed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Goroutine 2</span></span>
<span class="line"><span class="__shiki_1itgoe">    go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        defer</span><span class="__shiki_140thh"> wg.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Millisecond)</span></span>
<span class="line"><span class="__shiki_140thh">        fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Goroutine 2 completed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    wg.</span><span class="__shiki_1t8gfj">Wait</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;All goroutines completed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="数据处理" tabindex="-1">数据处理 <a class="header-anchor" href="#数据处理" aria-label="Permalink to &quot;数据处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">encoding/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">encoding/xml</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">encoding/base64</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">strings</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Data</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Name </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;name&quot; xml:&quot;name&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Age  </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">    \`json:&quot;age&quot; xml:&quot;age&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> dataProcessingExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // JSON序列化/反序列化</span></span>
<span class="line"><span class="__shiki_140thh">    data </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> Data</span><span class="__shiki_140thh">{Name: </span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">, Age: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    jsonData, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> decodedData </span><span class="__shiki_1t8gfj">Data</span></span>
<span class="line"><span class="__shiki_140thh">    json.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(jsonData, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">decodedData)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // XML处理</span></span>
<span class="line"><span class="__shiki_140thh">    xmlData, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> xml.</span><span class="__shiki_1t8gfj">Marshal</span><span class="__shiki_140thh">(data)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Base64编码</span></span>
<span class="line"><span class="__shiki_140thh">    encoded </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> base64.StdEncoding.</span><span class="__shiki_1t8gfj">EncodeToString</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Go Standard Library&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 字符串处理</span></span>
<span class="line"><span class="__shiki_140thh">    str </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> &quot;go standard library&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    upper </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> strings.</span><span class="__shiki_1t8gfj">ToUpper</span><span class="__shiki_140thh">(str)</span></span>
<span class="line"><span class="__shiki_140thh">    contains </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> strings.</span><span class="__shiki_1t8gfj">Contains</span><span class="__shiki_140thh">(str, </span><span class="__shiki_mdbnqw">&quot;standard&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="关键包详解" tabindex="-1">关键包详解 <a class="header-anchor" href="#关键包详解" aria-label="Permalink to &quot;关键包详解&quot;">​</a></h2><h3 id="os-操作系统交互" tabindex="-1"><code>os</code> - 操作系统交互 <a class="header-anchor" href="#os-操作系统交互" aria-label="Permalink to &quot;\`os\` - 操作系统交互&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 环境变量操作</span></span>
<span class="line"><span class="__shiki_140thh">os.</span><span class="__shiki_1t8gfj">Setenv</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GO_ENV&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">env </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Getenv</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GO_ENV&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 命令行参数</span></span>
<span class="line"><span class="__shiki_140thh">args </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.Args</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 文件操作</span></span>
<span class="line"><span class="__shiki_140thh">fileInfo, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Stat</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;file.txt&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">mode </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fileInfo.</span><span class="__shiki_1t8gfj">Mode</span><span class="__shiki_140thh">()</span></span></code></pre></div><h3 id="time-时间处理" tabindex="-1"><code>time</code> - 时间处理 <a class="header-anchor" href="#time-时间处理" aria-label="Permalink to &quot;\`time\` - 时间处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 获取当前时间</span></span>
<span class="line"><span class="__shiki_140thh">now </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 时间格式化</span></span>
<span class="line"><span class="__shiki_140thh">fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(now.</span><span class="__shiki_1t8gfj">Format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2006-01-02 15:04:05&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定时器</span></span>
<span class="line"><span class="__shiki_140thh">ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> ticker.</span><span class="__shiki_1t8gfj">Stop</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 超时控制</span></span>
<span class="line"><span class="__shiki_1itgoe">select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second):</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Timeout&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_1t8gfj">longRunningOperation</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(result)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="sync-同步原语" tabindex="-1"><code>sync</code> - 同步原语 <a class="header-anchor" href="#sync-同步原语" aria-label="Permalink to &quot;\`sync\` - 同步原语&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    counter </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    mu      </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">    once    </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Once</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> increment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    mu.</span><span class="__shiki_1t8gfj">Lock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    counter</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">    mu.</span><span class="__shiki_1t8gfj">Unlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> initialize</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    once.</span><span class="__shiki_1t8gfj">Do</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Initialized only once&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="context-上下文管理" tabindex="-1"><code>context</code> - 上下文管理 <a class="header-anchor" href="#context-上下文管理" aria-label="Permalink to &quot;\`context\` - 上下文管理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> process</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ctx.</span><span class="__shiki_1t8gfj">Done</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">        fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Operation canceled&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second):</span></span>
<span class="line"><span class="__shiki_140thh">        fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Operation completed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">go</span><span class="__shiki_1t8gfj"> process</span><span class="__shiki_140thh">(ctx)</span></span></code></pre></div><h3 id="testing-单元测试" tabindex="-1"><code>testing</code> - 单元测试 <a class="header-anchor" href="#testing-单元测试" aria-label="Permalink to &quot;\`testing\` - 单元测试&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// math_test.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> math</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestAdd</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    tests </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        a, b, expected </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    }{</span></span>
<span class="line"><span class="__shiki_140thh">        {</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">        {</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">        {</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, test </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> tests {</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> Add</span><span class="__shiki_140thh">(test.a, test.b)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> test.expected {</span></span>
<span class="line"><span class="__shiki_140thh">            t.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Add(</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">) = </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">, expected </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                     test.a, test.b, result, test.expected)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 基准测试</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> BenchmarkAdd</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">B</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> b.N; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="最佳实践与技巧" tabindex="-1">最佳实践与技巧 <a class="header-anchor" href="#最佳实践与技巧" aria-label="Permalink to &quot;最佳实践与技巧&quot;">​</a></h2><ol><li><p><strong>错误处理</strong></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">file, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;file.txt&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理错误，不要忽略</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to open file: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_140thh"> file.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span></code></pre></div></li><li><p><strong>资源管理</strong></p><ul><li>使用 <code>defer</code> 确保资源释放</li><li>对文件、网络连接等资源及时关闭</li></ul></li><li><p><strong>高效I/O</strong></p><ul><li>使用 <code>bufio</code> 进行缓冲I/O操作</li><li>对大文件使用流式处理</li></ul></li><li><p><strong>并发安全</strong></p><ul><li>使用互斥锁保护共享资源</li><li>优先使用通道进行goroutine间通信</li><li>使用 <code>context</code> 管理goroutine生命周期</li></ul></li><li><p><strong>性能优化</strong></p><ul><li>避免不必要的内存分配</li><li>使用 <code>sync.Pool</code> 重用对象</li><li>使用 <code>pprof</code> 进行性能分析</li></ul></li></ol><h2 id="重要更新-go-1-16" tabindex="-1">重要更新 (Go 1.16+) <a class="header-anchor" href="#重要更新-go-1-16" aria-label="Permalink to &quot;重要更新 (Go 1.16+)&quot;">​</a></h2><ol><li><p><strong><code>io/fs</code> 包</strong></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_1t8gfj">io/fs</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 文件系统抽象</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> fsys </span><span class="__shiki_1t8gfj">fs</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">FS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">DirFS</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;.&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">content, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">ReadFile</span><span class="__shiki_140thh">(fsys, </span><span class="__shiki_mdbnqw">&quot;file.txt&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div></li><li><p><strong><code>embed</code> 包</strong></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_1t8gfj">embed</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 嵌入静态资源</span></span>
<span class="line"><span class="__shiki_21nrsd">//go:embed static/*</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> staticFiles </span><span class="__shiki_1t8gfj">embed</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">FS</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在HTTP服务器中使用</span></span>
<span class="line"><span class="__shiki_140thh">http.</span><span class="__shiki_1t8gfj">Handle</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/static/&quot;</span><span class="__shiki_140thh">, http.</span><span class="__shiki_1t8gfj">FileServer</span><span class="__shiki_140thh">(http.</span><span class="__shiki_1t8gfj">FS</span><span class="__shiki_140thh">(staticFiles)))</span></span></code></pre></div></li><li><p><strong><code>io/ioutil</code> 弃用</strong></p><ul><li>使用 <code>os.ReadFile</code> 替代 <code>ioutil.ReadFile</code></li><li>使用 <code>os.WriteFile</code> 替代 <code>ioutil.WriteFile</code></li></ul></li></ol><h2 id="学习资源" tabindex="-1">学习资源 <a class="header-anchor" href="#学习资源" aria-label="Permalink to &quot;学习资源&quot;">​</a></h2><ol><li><a href="https://pkg.go.dev/std" target="_blank" rel="noreferrer">官方标准库文档</a></li><li>推荐书籍： <ul><li>《Go语言标准库》</li><li>《Go程序设计语言》</li></ul></li><li>实战项目： <ul><li>实现一个简单的HTTP服务器</li><li>编写一个并发文件处理工具</li><li>创建命令行应用</li></ul></li></ol><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[Go标准库] --&gt; B[核心模块]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[关键包]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[最佳实践]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[I/O处理]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[网络编程]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[并发处理]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B4[数据处理]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[os]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[time]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[sync]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C4[context]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C5[testing]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[错误处理]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[资源管理]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[高效I/O]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D4[并发安全]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D5[性能优化]</span></span></code></pre></div>`,28)])])}const g=a(p,[["render",h]]);export{d as __pageData,g as default};
