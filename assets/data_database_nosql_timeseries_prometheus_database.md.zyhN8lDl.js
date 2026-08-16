import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Prometheus存储格式与压缩机制详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/timeseries/prometheus/database.md","filePath":"data/database/nosql/timeseries/prometheus/database.md"}'),p={name:"data/database/nosql/timeseries/prometheus/database.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="prometheus存储格式与压缩机制详解" tabindex="-1">Prometheus存储格式与压缩机制详解 <a class="header-anchor" href="#prometheus存储格式与压缩机制详解" aria-label="Permalink to &quot;Prometheus存储格式与压缩机制详解&quot;">​</a></h1><h2 id="一、prometheus存储架构概览" tabindex="-1">一、Prometheus存储架构概览 <a class="header-anchor" href="#一、prometheus存储架构概览" aria-label="Permalink to &quot;一、Prometheus存储架构概览&quot;">​</a></h2><h3 id="_1-1-整体存储架构" tabindex="-1">1.1 整体存储架构 <a class="header-anchor" href="#_1-1-整体存储架构" aria-label="Permalink to &quot;1.1 整体存储架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      Prometheus Server                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  Head Block │  │   TSDB      │  │      WAL           │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  (内存)     │◄─┤  (磁盘)     │◄─┤ (预写日志)          │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────┘  └─────────────┘  └────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  Block      │  │  Block      │  │  Block             │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  0-2h       │  │  2-4h       │  │  4-6h              │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────┘  └─────────────┘  └────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-数据流向" tabindex="-1">1.2 数据流向 <a class="header-anchor" href="#_1-2-数据流向" aria-label="Permalink to &quot;1.2 数据流向&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">采集数据 → WAL日志 → Head Block → 压缩 → TSDB Block → 合并 → 长期存储</span></span>
<span class="line"><span class="__shiki_wvjl67">   ↓          ↓          ↓          ↓          ↓          ↓</span></span>
<span class="line"><span class="__shiki_wvjl67"> 抓取     持久化保证    内存存储    2h触发    只读块     多块合并</span></span></code></pre></div><h2 id="二、wal-write-ahead-log-预写日志" tabindex="-1">二、WAL（Write-Ahead Log）预写日志 <a class="header-anchor" href="#二、wal-write-ahead-log-预写日志" aria-label="Permalink to &quot;二、WAL（Write-Ahead Log）预写日志&quot;">​</a></h2><h3 id="_2-1-wal架构设计" tabindex="-1">2.1 WAL架构设计 <a class="header-anchor" href="#_2-1-wal架构设计" aria-label="Permalink to &quot;2.1 WAL架构设计&quot;">​</a></h3><h4 id="_2-2-1-wal目录结构" tabindex="-1">2.2.1 WAL目录结构 <a class="header-anchor" href="#_2-2-1-wal目录结构" aria-label="Permalink to &quot;2.2.1 WAL目录结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">data/wal/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 00000000</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 00000001</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 00000002</span></span>
<span class="line"><span class="__shiki_wvjl67">├── checkpoint.00000000</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── 00000000</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 00000001</span></span>
<span class="line"><span class="__shiki_wvjl67">└── checkpoint.00000003</span></span></code></pre></div><h4 id="_2-2-2-wal文件格式" tabindex="-1">2.2.2 WAL文件格式 <a class="header-anchor" href="#_2-2-2-wal文件格式" aria-label="Permalink to &quot;2.2.2 WAL文件格式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// WAL记录结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Record</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Type      </span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">      // 记录类型</span></span>
<span class="line"><span class="__shiki_140thh">    CRC32     </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">    // 校验和</span></span>
<span class="line"><span class="__shiki_140thh">    Length    </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">    // 数据长度</span></span>
<span class="line"><span class="__shiki_140thh">    Data      []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">    // 实际数据</span></span>
<span class="line"><span class="__shiki_140thh">    Padding   []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">    // 填充（对齐128字节）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 记录类型枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    RecordSeries</span><span class="__shiki_1itgoe">     =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  // 序列定义</span></span>
<span class="line"><span class="__shiki_dzsirb">    RecordSamples</span><span class="__shiki_1itgoe">    =</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_21nrsd">  // 样本数据</span></span>
<span class="line"><span class="__shiki_dzsirb">    RecordTombstones</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd">  // 墓碑记录</span></span>
<span class="line"><span class="__shiki_dzsirb">    RecordExemplar</span><span class="__shiki_1itgoe">   =</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_21nrsd">  // 示例记录</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_2-2-3-wal记录详细格式" tabindex="-1">2.2.3 WAL记录详细格式 <a class="header-anchor" href="#_2-2-3-wal记录详细格式" aria-label="Permalink to &quot;2.2.3 WAL记录详细格式&quot;">​</a></h4><h5 id="序列记录-recordseries" tabindex="-1">序列记录（RecordSeries） <a class="header-anchor" href="#序列记录-recordseries" aria-label="Permalink to &quot;序列记录（RecordSeries）&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">+--------+--------+--------+----------------+</span></span>
<span class="line"><span class="__shiki_wvjl67">| Type=1 | CRC32  | Length | Series Data    |</span></span>
<span class="line"><span class="__shiki_wvjl67">+--------+--------+--------+----------------+</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">Series Data:</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬─────────────┬─────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Series Count│   Ref ID    │ Labels (重复)           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (变长编码)  │ (变长编码)  │                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────┴─────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">Labels:</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬─────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Name Len    │  Value Len  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (变长编码)  │ (变长编码)  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Name        │ Value       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (字符串)    │ (字符串)    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────┘</span></span></code></pre></div><h5 id="样本记录-recordsamples" tabindex="-1">样本记录（RecordSamples） <a class="header-anchor" href="#样本记录-recordsamples" aria-label="Permalink to &quot;样本记录（RecordSamples）&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">+--------+--------+--------+----------------+</span></span>
<span class="line"><span class="__shiki_wvjl67">| Type=2 | CRC32  | Length | Samples Data   |</span></span>
<span class="line"><span class="__shiki_wvjl67">+--------+--------+--------+----------------+</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">Samples Data:</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬─────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Series Ref  │   Timestamp   │   Value     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ (变长编码)  │ (int64毫秒)   │ (float64)   │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────────────────────┘</span></span></code></pre></div><h3 id="_2-3-wal性能优化" tabindex="-1">2.3 WAL性能优化 <a class="header-anchor" href="#_2-3-wal性能优化" aria-label="Permalink to &quot;2.3 WAL性能优化&quot;">​</a></h3><h4 id="_2-3-1-批量写入" tabindex="-1">2.3.1 批量写入 <a class="header-anchor" href="#_2-3-1-批量写入" aria-label="Permalink to &quot;2.3.1 批量写入&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Prometheus实际实现中的批量优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> walWriter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    buf     []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">      // 缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">    records []</span><span class="__shiki_1t8gfj">Record</span><span class="__shiki_21nrsd">    // 批量记录</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量写入流程</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">w </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">walWriter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">writeBatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">records</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">Record</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 序列化所有记录到缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, rec </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> records {</span></span>
<span class="line"><span class="__shiki_140thh">        w.buf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(w.buf, rec.</span><span class="__shiki_1t8gfj">marshal</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 一次性写入文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> w.file.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(w.buf); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 可选同步（每隔N个segment同步一次）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> w.</span><span class="__shiki_1t8gfj">shouldSync</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> w.file.</span><span class="__shiki_1t8gfj">Sync</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-3-2-分段管理" tabindex="-1">2.3.2 分段管理 <a class="header-anchor" href="#_2-3-2-分段管理" aria-label="Permalink to &quot;2.3.2 分段管理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// WAL分段策略</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    segmentSize</span><span class="__shiki_1itgoe">   =</span><span class="__shiki_dzsirb"> 128</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  // 128MB一个段</span></span>
<span class="line"><span class="__shiki_dzsirb">    checkpointInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd">           // 每100个段创建一个检查点</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> walSegment</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    number    </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">        // 段编号</span></span>
<span class="line"><span class="__shiki_140thh">    size      </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">      // 当前大小</span></span>
<span class="line"><span class="__shiki_140thh">    file      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">File</span><span class="__shiki_21nrsd">   // 文件句柄</span></span>
<span class="line"><span class="__shiki_140thh">    isActive  </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">       // 是否活跃</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-wal恢复机制" tabindex="-1">2.4 WAL恢复机制 <a class="header-anchor" href="#_2-4-wal恢复机制" aria-label="Permalink to &quot;2.4 WAL恢复机制&quot;">​</a></h3><h4 id="_2-4-1-崩溃恢复流程" tabindex="-1">2.4.1 崩溃恢复流程 <a class="header-anchor" href="#_2-4-1-崩溃恢复流程" aria-label="Permalink to &quot;2.4.1 崩溃恢复流程&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> recoverFromWAL</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">walDir</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Head</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 找到最新的检查点</span></span>
<span class="line"><span class="__shiki_140thh">    checkpoint </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> findLatestCheckpoint</span><span class="__shiki_140thh">(walDir)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 从检查点恢复</span></span>
<span class="line"><span class="__shiki_140thh">    head, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> loadCheckpoint</span><span class="__shiki_140thh">(checkpoint)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 重放检查点之后的WAL记录</span></span>
<span class="line"><span class="__shiki_140thh">    segments </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> listWALSegmentsAfter</span><span class="__shiki_140thh">(checkpoint)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, seg </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> segments {</span></span>
<span class="line"><span class="__shiki_140thh">        records </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> readSegment</span><span class="__shiki_140thh">(seg)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, rec </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> records {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> rec.Type {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> RecordSeries:</span></span>
<span class="line"><span class="__shiki_140thh">                head.</span><span class="__shiki_1t8gfj">createSeries</span><span class="__shiki_140thh">(rec.Data)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> RecordSamples:</span></span>
<span class="line"><span class="__shiki_140thh">                head.</span><span class="__shiki_1t8gfj">appendSamples</span><span class="__shiki_140thh">(rec.Data)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> RecordTombstones:</span></span>
<span class="line"><span class="__shiki_140thh">                head.</span><span class="__shiki_1t8gfj">deleteSeries</span><span class="__shiki_140thh">(rec.Data)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> head, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、head-block内存管理" tabindex="-1">三、Head Block内存管理 <a class="header-anchor" href="#三、head-block内存管理" aria-label="Permalink to &quot;三、Head Block内存管理&quot;">​</a></h2><h3 id="_3-1-head内存数据结构" tabindex="-1">3.1 Head内存数据结构 <a class="header-anchor" href="#_3-1-head内存数据结构" aria-label="Permalink to &quot;3.1 Head内存数据结构&quot;">​</a></h3><h4 id="_3-1-1-核心数据结构" tabindex="-1">3.1.1 核心数据结构 <a class="header-anchor" href="#_3-1-1-核心数据结构" aria-label="Permalink to &quot;3.1.1 核心数据结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Head结构定义</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Head</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 序列管理</span></span>
<span class="line"><span class="__shiki_140thh">    series </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">stripeSeries</span><span class="__shiki_21nrsd">  // 分片序列存储</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内存块管理</span></span>
<span class="line"><span class="__shiki_140thh">    headChunks </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">memChunk</span><span class="__shiki_21nrsd">  // 当前活跃chunk</span></span>
<span class="line"><span class="__shiki_140thh">    mmapChunks []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">mmappedChunk</span><span class="__shiki_21nrsd">  // 已mmap的chunk</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 索引</span></span>
<span class="line"><span class="__shiki_140thh">    postings </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">index</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Postings</span><span class="__shiki_21nrsd">  // 倒排索引</span></span>
<span class="line"><span class="__shiki_140thh">    symbols  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">symbols</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Symbols</span><span class="__shiki_21nrsd"> // 符号表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 统计信息</span></span>
<span class="line"><span class="__shiki_140thh">    stats </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">HeadStats</span></span>
<span class="line"><span class="__shiki_140thh">    minTime, maxTime </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">  // 时间范围</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分片序列存储（减少锁竞争）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> stripeSeries</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    shards []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">seriesShard</span></span>
<span class="line"><span class="__shiki_140thh">    hash   </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Labels</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> seriesShard</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">    series </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">memSeries</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-内存序列结构" tabindex="-1">3.1.2 内存序列结构 <a class="header-anchor" href="#_3-1-2-内存序列结构" aria-label="Permalink to &quot;3.1.2 内存序列结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 内存中的序列表示</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> memSeries</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ref          </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">        // 序列引用ID</span></span>
<span class="line"><span class="__shiki_140thh">    labels       </span><span class="__shiki_1t8gfj">labels</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Labels</span><span class="__shiki_21nrsd"> // 标签集</span></span>
<span class="line"><span class="__shiki_140thh">    lsetHash     </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">        // 标签哈希值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 数据存储</span></span>
<span class="line"><span class="__shiki_140thh">    chunks       []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">memChunk</span><span class="__shiki_21nrsd">   // chunk列表</span></span>
<span class="line"><span class="__shiki_140thh">    headChunk    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">memChunk</span><span class="__shiki_21nrsd">     // 当前活跃chunk</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 元数据</span></span>
<span class="line"><span class="__shiki_140thh">    lastValue    </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">       // 最后一个值</span></span>
<span class="line"><span class="__shiki_140thh">    lastTime     </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">         // 最后一个时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    chunkRange   </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">         // chunk时间范围</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-内存chunk管理" tabindex="-1">3.2 内存Chunk管理 <a class="header-anchor" href="#_3-2-内存chunk管理" aria-label="Permalink to &quot;3.2 内存Chunk管理&quot;">​</a></h3><h4 id="_3-2-1-memchunk结构" tabindex="-1">3.2.1 MemChunk结构 <a class="header-anchor" href="#_3-2-1-memchunk结构" aria-label="Permalink to &quot;3.2.1 MemChunk结构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> memChunk</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    chunk            </span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Chunk</span><span class="__shiki_21nrsd">  // 底层编码chunk</span></span>
<span class="line"><span class="__shiki_140thh">    minTime, maxTime </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">           // 时间范围</span></span>
<span class="line"><span class="__shiki_140thh">    numSamples       </span><span class="__shiki_1itgoe">uint16</span><span class="__shiki_21nrsd">          // 样本数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 编码相关</span></span>
<span class="line"><span class="__shiki_140thh">    encoding         </span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Encoding</span><span class="__shiki_21nrsd">  // 编码类型</span></span>
<span class="line"><span class="__shiki_140thh">    bytes            []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">             // 原始字节</span></span>
<span class="line"><span class="__shiki_140thh">    appender         </span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Appender</span><span class="__shiki_21nrsd">  // 追加器</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-chunk切换策略" tabindex="-1">3.2.2 Chunk切换策略 <a class="header-anchor" href="#_3-2-2-chunk切换策略" aria-label="Permalink to &quot;3.2.2 Chunk切换策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">memSeries</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">append</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">v</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否需要创建新chunk</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> s.headChunk </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">       s.headChunk.numSamples </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> samplesPerChunk </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">       t</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">s.headChunk.minTime </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> chunkRange {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">cutNewChunk</span><span class="__shiki_140thh">(t); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 追加数据到当前chunk</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> s.headChunk.appender.</span><span class="__shiki_1t8gfj">Append</span><span class="__shiki_140thh">(t, v)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 配置参数</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    samplesPerChunk</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 120</span><span class="__shiki_21nrsd">      // 每个chunk最大样本数</span></span>
<span class="line"><span class="__shiki_dzsirb">    chunkRange</span><span class="__shiki_1itgoe">      =</span><span class="__shiki_dzsirb"> 3600000</span><span class="__shiki_21nrsd">  // 每个chunk最大时间范围（1小时）</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-3-内存压缩策略" tabindex="-1">3.3 内存压缩策略 <a class="header-anchor" href="#_3-3-内存压缩策略" aria-label="Permalink to &quot;3.3 内存压缩策略&quot;">​</a></h3><h4 id="_3-3-1-内存到磁盘的转换" tabindex="-1">3.3.1 内存到磁盘的转换 <a class="header-anchor" href="#_3-3-1-内存到磁盘的转换" aria-label="Permalink to &quot;3.3.1 内存到磁盘的转换&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">h </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Head</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">compact</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 关闭当前Head Block</span></span>
<span class="line"><span class="__shiki_140thh">    h.</span><span class="__shiki_1t8gfj">mmapCurrentChunks</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建新的Block</span></span>
<span class="line"><span class="__shiki_140thh">    blockDir </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> createBlockDir</span><span class="__shiki_140thh">(h.minTime, h.maxTime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 写入chunks</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, series </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> h.series {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, chunk </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> series.chunks {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            writeChunkToBlock</span><span class="__shiki_140thh">(blockDir, series.ref, chunk)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 构建索引</span></span>
<span class="line"><span class="__shiki_1t8gfj">    buildIndex</span><span class="__shiki_140thh">(blockDir, h.series, h.postings, h.symbols)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 清理内存</span></span>
<span class="line"><span class="__shiki_140thh">    h.</span><span class="__shiki_1t8gfj">reset</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、tsdb-block磁盘格式" tabindex="-1">四、TSDB Block磁盘格式 <a class="header-anchor" href="#四、tsdb-block磁盘格式" aria-label="Permalink to &quot;四、TSDB Block磁盘格式&quot;">​</a></h2><h3 id="_4-1-block目录结构" tabindex="-1">4.1 Block目录结构 <a class="header-anchor" href="#_4-1-block目录结构" aria-label="Permalink to &quot;4.1 Block目录结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">01FT8X9C0YNG4C6X9JH6R7ABCD/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── meta.json                 # 元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">├── index                     # 索引文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── chunks                    # chunk目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── 000001               # chunk文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── tombstones               # 墓碑文件</span></span>
<span class="line"><span class="__shiki_wvjl67">└── symbols                  # 符号表（v1格式）</span></span></code></pre></div><h3 id="_4-2-meta-json元数据" tabindex="-1">4.2 Meta.json元数据 <a class="header-anchor" href="#_4-2-meta-json元数据" aria-label="Permalink to &quot;4.2 Meta.json元数据&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;ulid&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;01FT8X9C0YNG4C6X9JH6R7ABCD&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;minTime&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1641020400000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;maxTime&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1641027600000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;stats&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;numSamples&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1500000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;numSeries&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;numChunks&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">12500</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;compaction&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;level&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;sources&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;01FT8X9C0YNG4C6X9JH6R7ABCD&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;parents&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_dzsirb">                &quot;ulid&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;01FT8X9BJ5XZ4C6X9JH6R7WXYZ&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                &quot;minTime&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1641020400000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                &quot;maxTime&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1641024000000</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;version&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;thanos&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;labels&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;replica&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prometheus-01&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-index索引文件格式" tabindex="-1">4.3 Index索引文件格式 <a class="header-anchor" href="#_4-3-index索引文件格式" aria-label="Permalink to &quot;4.3 Index索引文件格式&quot;">​</a></h3><h4 id="_4-3-1-索引文件结构" tabindex="-1">4.3.1 索引文件结构 <a class="header-anchor" href="#_4-3-1-索引文件结构" aria-label="Permalink to &quot;4.3.1 索引文件结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│        Magic Number         │ 4字节: 0xBAAAD700</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│        Version              │ 1字节: 2</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│     Table of Contents       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ┌─────────────────┐    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Symbol Table    │──┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Series          │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Label Index 1   │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Label Index 2   │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Postings 1      │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Postings 2      │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Label Index Off │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     ├─────────────────┤  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     │ Postings Off    │  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│     └─────────────────┘  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤◀┘</span></span>
<span class="line"><span class="__shiki_wvjl67">│       Symbol Table          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│         Series              │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│       Label Index 1         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│       Postings 1            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│       Label Index 2         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│       Postings 2            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│    Label Offset Table       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   Postings Offset Table     │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Footer             │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────┘</span></span></code></pre></div><h4 id="_4-3-2-符号表-symbol-table" tabindex="-1">4.3.2 符号表（Symbol Table） <a class="header-anchor" href="#_4-3-2-符号表-symbol-table" aria-label="Permalink to &quot;4.3.2 符号表（Symbol Table）&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 符号表格式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> symbolTable</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    symbols []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_21nrsd">           // 符号数组</span></span>
<span class="line"><span class="__shiki_140thh">    offsets </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">  // 符号-&gt;偏移量</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在文件中存储为</span></span>
<span class="line"><span class="__shiki_21nrsd">    // [count][symbol1_len][symbol1][symbol2_len][symbol2]...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例：存储标签&quot;job&quot;和值&quot;prometheus&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">// 符号表内容：[&quot;job&quot;, &quot;prometheus&quot;]</span></span>
<span class="line"><span class="__shiki_21nrsd">// 内存中映射：job -&gt; 0, prometheus -&gt; 1</span></span></code></pre></div><h4 id="_4-3-3-序列存储格式" tabindex="-1">4.3.3 序列存储格式 <a class="header-anchor" href="#_4-3-3-序列存储格式" aria-label="Permalink to &quot;4.3.3 序列存储格式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 序列条目格式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> seriesEntry</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    labels       []</span><span class="__shiki_1t8gfj">label</span><span class="__shiki_21nrsd">      // 标签引用</span></span>
<span class="line"><span class="__shiki_140thh">    chunks       []</span><span class="__shiki_1t8gfj">chunkMeta</span><span class="__shiki_21nrsd">  // chunk元数据</span></span>
<span class="line"><span class="__shiki_140thh">    lsetHash     </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">       // 标签哈希</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在文件中存储为</span></span>
<span class="line"><span class="__shiki_21nrsd">// [len][label_ref1][label_ref2]...[chunk_count][chunk_meta1]...</span></span></code></pre></div><h4 id="_4-3-4-倒排索引-postings" tabindex="-1">4.3.4 倒排索引（Postings） <a class="header-anchor" href="#_4-3-4-倒排索引-postings" aria-label="Permalink to &quot;4.3.4 倒排索引（Postings）&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 倒排索引格式</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> postings</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    labelName   </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">    // 标签名符号引用</span></span>
<span class="line"><span class="__shiki_140thh">    labelValue  </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">    // 标签值符号引用</span></span>
<span class="line"><span class="__shiki_140thh">    seriesRefs  []</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">  // 序列引用列表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用Roaring Bitmaps优化存储</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对于密集ID使用位图，稀疏ID使用数组</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-4-chunk文件格式" tabindex="-1">4.4 Chunk文件格式 <a class="header-anchor" href="#_4-4-chunk文件格式" aria-label="Permalink to &quot;4.4 Chunk文件格式&quot;">​</a></h3><h4 id="_4-4-1-chunk目录结构" tabindex="-1">4.4.1 Chunk目录结构 <a class="header-anchor" href="#_4-4-1-chunk目录结构" aria-label="Permalink to &quot;4.4.1 Chunk目录结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">chunks/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 000001  # chunk文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── 000002</span></span>
<span class="line"><span class="__shiki_wvjl67">└── 000003</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67"># 每个文件包含多个chunk，格式：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────┬─────────┬─────────┬─────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Chunk 1 │ Chunk 2 │ ...     │ Chunk N │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────┴─────────┴─────────┴─────────┘</span></span></code></pre></div><h4 id="_4-4-2-chunk元数据" tabindex="-1">4.4.2 Chunk元数据 <a class="header-anchor" href="#_4-4-2-chunk元数据" aria-label="Permalink to &quot;4.4.2 Chunk元数据&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> chunkMeta</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ref        </span><span class="__shiki_1t8gfj">chunks</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ChunkRef</span><span class="__shiki_21nrsd">  // chunk引用 (文件ID&lt;&lt;32|偏移量)</span></span>
<span class="line"><span class="__shiki_140thh">    minTime    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">            // 最小时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    maxTime    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">            // 最大时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    encoding   </span><span class="__shiki_1t8gfj">chunkenc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Encoding</span><span class="__shiki_21nrsd"> // 编码类型</span></span>
<span class="line"><span class="__shiki_140thh">    size       </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">           // chunk大小</span></span>
<span class="line"><span class="__shiki_140thh">    crc32      </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">           // CRC32校验和</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-4-3-chunk数据编码" tabindex="-1">4.4.3 Chunk数据编码 <a class="header-anchor" href="#_4-4-3-chunk数据编码" aria-label="Permalink to &quot;4.4.3 Chunk数据编码&quot;">​</a></h4><h5 id="xor编码格式-最常用" tabindex="-1">XOR编码格式（最常用） <a class="header-anchor" href="#xor编码格式-最常用" aria-label="Permalink to &quot;XOR编码格式（最常用）&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Header (1字节)                                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ├─ 编码类型 (4 bits): XOR                               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └─ 控制位 (4 bits)                                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 第一个样本                                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ├─ 时间戳 delta (变长编码)                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └─ 值 (float64)                                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 后续样本 (重复)                                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ├─ 时间戳 delta (变长编码)                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ├─ 值 XOR (变长编码)                                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ └─ 前导零/尾随零计数 (可选)                             │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h5 id="变长编码实现" tabindex="-1">变长编码实现 <a class="header-anchor" href="#变长编码实现" aria-label="Permalink to &quot;变长编码实现&quot;">​</a></h5><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// XOR编码的核心：异或计算</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> xorEncode</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">prev</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">curr</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    prevBits </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> math.</span><span class="__shiki_1t8gfj">Float64bits</span><span class="__shiki_140thh">(prev)</span></span>
<span class="line"><span class="__shiki_140thh">    currBits </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> math.</span><span class="__shiki_1t8gfj">Float64bits</span><span class="__shiki_140thh">(curr)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> prevBits </span><span class="__shiki_1itgoe">^</span><span class="__shiki_140thh"> currBits</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 前导零和尾随零计算</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> leadingZeros</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">x</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bits.</span><span class="__shiki_1t8gfj">LeadingZeros64</span><span class="__shiki_140thh">(x)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> trailingZeros</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">x</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bits.</span><span class="__shiki_1t8gfj">TrailingZeros64</span><span class="__shiki_140thh">(x)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、压缩算法详解" tabindex="-1">五、压缩算法详解 <a class="header-anchor" href="#五、压缩算法详解" aria-label="Permalink to &quot;五、压缩算法详解&quot;">​</a></h2><h3 id="_5-1-垂直压缩-chunk内压缩" tabindex="-1">5.1 垂直压缩（Chunk内压缩） <a class="header-anchor" href="#_5-1-垂直压缩-chunk内压缩" aria-label="Permalink to &quot;5.1 垂直压缩（Chunk内压缩）&quot;">​</a></h3><h4 id="_5-1-1-xor浮点数压缩算法" tabindex="-1">5.1.1 XOR浮点数压缩算法 <a class="header-anchor" href="#_5-1-1-xor浮点数压缩算法" aria-label="Permalink to &quot;5.1.1 XOR浮点数压缩算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// XOR压缩详细实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> XORChunk</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    bstream </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">bstream</span><span class="__shiki_21nrsd">          // 位流</span></span>
<span class="line"><span class="__shiki_140thh">    t0      </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">             // 基准时间</span></span>
<span class="line"><span class="__shiki_140thh">    v0      </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">           // 基准值</span></span>
<span class="line"><span class="__shiki_140thh">    tDelta  </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">            // 时间增量</span></span>
<span class="line"><span class="__shiki_140thh">    num     </span><span class="__shiki_1itgoe">uint16</span><span class="__shiki_21nrsd">            // 样本数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">XORChunk</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">encode</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">v</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> c.num </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 第一个样本：存储原始值</span></span>
<span class="line"><span class="__shiki_140thh">        c.t0 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> t</span></span>
<span class="line"><span class="__shiki_140thh">        c.v0 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v</span></span>
<span class="line"><span class="__shiki_140thh">        c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(math.</span><span class="__shiki_1t8gfj">Float64bits</span><span class="__shiki_140thh">(v), </span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> c.num </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 第二个样本：存储时间增量和XOR值</span></span>
<span class="line"><span class="__shiki_140thh">        c.tDelta </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">(t </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> c.t0)</span></span>
<span class="line"><span class="__shiki_140thh">        c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(c.tDelta, </span><span class="__shiki_dzsirb">14</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 14位足够存储2小时内的增量</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        xor </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> xorEncode</span><span class="__shiki_140thh">(c.v0, v)</span></span>
<span class="line"><span class="__shiki_140thh">        c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(xor, </span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 后续样本：使用前一个值计算XOR</span></span>
<span class="line"><span class="__shiki_140thh">        tDelta </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">(t </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> c.prevTime)</span></span>
<span class="line"><span class="__shiki_140thh">        dod </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">(tDelta </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> c.tDelta)  </span><span class="__shiki_21nrsd">// 增量的增量</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 编码时间增量的增量</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBit</span><span class="__shiki_140thh">(zero)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">63</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 64</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">0x</span><span class="__shiki_dzsirb">02</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// &#39;10&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(dod), </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">0x</span><span class="__shiki_dzsirb">06</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// &#39;110&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(dod), </span><span class="__shiki_dzsirb">14</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 编码值</span></span>
<span class="line"><span class="__shiki_140thh">        xor </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> xorEncode</span><span class="__shiki_140thh">(c.prevValue, v)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> xor </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBit</span><span class="__shiki_140thh">(zero)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            leading </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> leadingZeros</span><span class="__shiki_140thh">(xor)</span></span>
<span class="line"><span class="__shiki_140thh">            trailing </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> trailingZeros</span><span class="__shiki_140thh">(xor)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 控制位：1(有数据) + 前导零数 + 有效位长</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBit</span><span class="__shiki_140thh">(one)</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(leading), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">64</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">leading</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">trailing), </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            c.bstream.</span><span class="__shiki_1t8gfj">writeBits</span><span class="__shiki_140thh">(xor</span><span class="__shiki_1itgoe">&gt;&gt;</span><span class="__shiki_140thh">trailing, </span><span class="__shiki_dzsirb">64</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">leading</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">trailing)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    c.prevTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> t</span></span>
<span class="line"><span class="__shiki_140thh">    c.prevValue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v</span></span>
<span class="line"><span class="__shiki_140thh">    c.num</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-变长整数压缩" tabindex="-1">5.1.2 变长整数压缩 <a class="header-anchor" href="#_5-1-2-变长整数压缩" aria-label="Permalink to &quot;5.1.2 变长整数压缩&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Varint编码</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeVarint</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">x</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1itgoe"> 0x</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(x)</span><span class="__shiki_1itgoe">|0x</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        x </span><span class="__shiki_1itgoe">&gt;&gt;=</span><span class="__shiki_dzsirb"> 7</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(x))</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> b</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Delta-of-Delta时间戳压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> encodeTimestamp</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">prevT</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">prevDelta</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    delta </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> t </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> prevT</span></span>
<span class="line"><span class="__shiki_140thh">    dod </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> delta </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> prevDelta</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 单字节0</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">63</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 64</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">0x</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 前缀&#39;10&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> encodeVarint</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(dod</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">63</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">255</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 256</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">0x</span><span class="__shiki_dzsirb">C0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 前缀&#39;110&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> encodeVarint</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(dod</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">2047</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> dod </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 2048</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">0x</span><span class="__shiki_dzsirb">E0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 前缀&#39;1110&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> encodeVarint</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(dod</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">2047</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">0x</span><span class="__shiki_dzsirb">F0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 前缀&#39;1111&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> encodeVarint</span><span class="__shiki_140thh">(b, </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">(dod))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> b, delta</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-水平压缩-block合并" tabindex="-1">5.2 水平压缩（Block合并） <a class="header-anchor" href="#_5-2-水平压缩-block合并" aria-label="Permalink to &quot;5.2 水平压缩（Block合并）&quot;">​</a></h3><h4 id="_5-2-1-压缩级别策略" tabindex="-1">5.2.1 压缩级别策略 <a class="header-anchor" href="#_5-2-1-压缩级别策略" aria-label="Permalink to &quot;5.2.1 压缩级别策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    CompactionLevel0</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> iota</span><span class="__shiki_21nrsd">  // 原始数据</span></span>
<span class="line"><span class="__shiki_dzsirb">    CompactionLevel1</span><span class="__shiki_21nrsd">         // 2小时块</span></span>
<span class="line"><span class="__shiki_dzsirb">    CompactionLevel2</span><span class="__shiki_21nrsd">         // 6-8小时块</span></span>
<span class="line"><span class="__shiki_dzsirb">    CompactionLevel3</span><span class="__shiki_21nrsd">         // 1-2天块</span></span>
<span class="line"><span class="__shiki_dzsirb">    CompactionLevel4</span><span class="__shiki_21nrsd">         // 1-2周块</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 压缩策略配置</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> compactionStrategy</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    minTimeRange    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">    // 最小时间范围</span></span>
<span class="line"><span class="__shiki_140thh">    maxTimeRange    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">    // 最大时间范围</span></span>
<span class="line"><span class="__shiki_140thh">    maxSeriesPerBlock </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">    // 每块最大序列数</span></span>
<span class="line"><span class="__shiki_140thh">    targetChunkSize  </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">   // 目标chunk大小</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-块合并算法" tabindex="-1">5.2.2 块合并算法 <a class="header-anchor" href="#_5-2-2-块合并算法" aria-label="Permalink to &quot;5.2.2 块合并算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> compactBlocks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">src</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">dest</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 打开所有源块</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        readers []</span><span class="__shiki_1t8gfj">BlockReader</span></span>
<span class="line"><span class="__shiki_140thh">        seriesIterators []</span><span class="__shiki_1t8gfj">SeriesIterator</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, dir </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> src {</span></span>
<span class="line"><span class="__shiki_140thh">        reader, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> OpenBlock</span><span class="__shiki_140thh">(dir)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        readers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(readers, reader)</span></span>
<span class="line"><span class="__shiki_140thh">        seriesIterators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(seriesIterators, reader.</span><span class="__shiki_1t8gfj">Series</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 合并序列</span></span>
<span class="line"><span class="__shiki_140thh">    mergedSeries </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewMergedSeries</span><span class="__shiki_140thh">(seriesIterators</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 创建新块</span></span>
<span class="line"><span class="__shiki_140thh">    chunkWriter </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewChunkWriter</span><span class="__shiki_140thh">(dest)</span></span>
<span class="line"><span class="__shiki_140thh">    indexWriter </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> NewIndexWriter</span><span class="__shiki_140thh">(dest)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> mergedSeries.</span><span class="__shiki_1t8gfj">Next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        series </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> mergedSeries.</span><span class="__shiki_1t8gfj">At</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 合并chunk（可能跨多个块）</span></span>
<span class="line"><span class="__shiki_140thh">        mergedChunks </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> mergeChunks</span><span class="__shiki_140thh">(series.</span><span class="__shiki_1t8gfj">Chunks</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 写入新块</span></span>
<span class="line"><span class="__shiki_140thh">        ref </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> chunkWriter.</span><span class="__shiki_1t8gfj">WriteChunks</span><span class="__shiki_140thh">(mergedChunks)</span></span>
<span class="line"><span class="__shiki_140thh">        indexWriter.</span><span class="__shiki_1t8gfj">AddSeries</span><span class="__shiki_140thh">(series.</span><span class="__shiki_1t8gfj">Labels</span><span class="__shiki_140thh">(), ref, mergedChunks)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 完成写入</span></span>
<span class="line"><span class="__shiki_140thh">    chunkWriter.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    indexWriter.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-3-chunk合并策略" tabindex="-1">5.2.3 Chunk合并策略 <a class="header-anchor" href="#_5-2-3-chunk合并策略" aria-label="Permalink to &quot;5.2.3 Chunk合并策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> mergeChunks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">chunks</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">chunks</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Meta</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">chunks</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Meta</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> merged []</span><span class="__shiki_1t8gfj">chunks</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Meta</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> current </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">chunks</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Meta</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, chunk </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> chunks {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> current </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">chunk</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否可以合并</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> canMergeChunks</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">current, chunk) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 合并chunk</span></span>
<span class="line"><span class="__shiki_1itgoe">            *</span><span class="__shiki_140thh">current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mergeTwoChunks</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">current, chunk)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 保存当前chunk，开始新的</span></span>
<span class="line"><span class="__shiki_140thh">            merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(merged, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">current)</span></span>
<span class="line"><span class="__shiki_140thh">            current </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh">chunk</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> current </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(merged, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">current)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> merged</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> canMergeChunks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_1t8gfj"> chunks</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Meta</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查时间连续性</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> b.MinTime </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.MaxTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> chunkMergeGap {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查总样本数</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> a.NumSamples </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> b.NumSamples </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> maxSamplesPerChunk {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查时间范围</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> b.MaxTime </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.MinTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> maxChunkTimeRange {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-多级压缩策略" tabindex="-1">5.3 多级压缩策略 <a class="header-anchor" href="#_5-3-多级压缩策略" aria-label="Permalink to &quot;5.3 多级压缩策略&quot;">​</a></h3><h4 id="_5-3-1-时间分层压缩-tiered-compaction" tabindex="-1">5.3.1 时间分层压缩（Tiered Compaction） <a class="header-anchor" href="#_5-3-1-时间分层压缩-tiered-compaction" aria-label="Permalink to &quot;5.3.1 时间分层压缩（Tiered Compaction）&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">时间线: 0────2h────4h────6h────8h────1d────2d────1w────2w</span></span>
<span class="line"><span class="__shiki_wvjl67">Level 0: [■■] [■■] [■■] [■■]                    (2h块)</span></span>
<span class="line"><span class="__shiki_wvjl67">Level 1:       [■■■■■■■■]                       (8h块)</span></span>
<span class="line"><span class="__shiki_wvjl67">Level 2:             [■■■■■■■■■■■■■■■■]         (2d块)</span></span>
<span class="line"><span class="__shiki_wvjl67">Level 3:                         [■■■■■■■■■■■■■■■■■■■■] (2w块)</span></span></code></pre></div><h4 id="_5-3-2-压缩调度算法" tabindex="-1">5.3.2 压缩调度算法 <a class="header-anchor" href="#_5-3-2-压缩调度算法" aria-label="Permalink to &quot;5.3.2 压缩调度算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Compactor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    dir     </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    metrics </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">compactionMetrics</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 压缩队列</span></span>
<span class="line"><span class="__shiki_140thh">    levels []</span><span class="__shiki_1t8gfj">compactionLevel</span></span>
<span class="line"><span class="__shiki_140thh">    queue  </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> compactionJob</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> compactionJob</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    level   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    blocks  []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    dest    </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Compactor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> job </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">c.queue:</span></span>
<span class="line"><span class="__shiki_140thh">            c.</span><span class="__shiki_1t8gfj">executeCompaction</span><span class="__shiki_140thh">(job)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">time.</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(compactionCheckInterval):</span></span>
<span class="line"><span class="__shiki_140thh">            c.</span><span class="__shiki_1t8gfj">scheduleCompactions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Compactor</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">scheduleCompactions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查每个级别</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> level </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> c.levels {</span></span>
<span class="line"><span class="__shiki_140thh">        blocks </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">findBlocksForCompaction</span><span class="__shiki_140thh">(level)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(blocks) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            c.queue </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_1t8gfj"> compactionJob</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                level:  level,</span></span>
<span class="line"><span class="__shiki_140thh">                blocks: blocks,</span></span>
<span class="line"><span class="__shiki_140thh">                dest:   </span><span class="__shiki_1t8gfj">generateULID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、性能优化技术" tabindex="-1">六、性能优化技术 <a class="header-anchor" href="#六、性能优化技术" aria-label="Permalink to &quot;六、性能优化技术&quot;">​</a></h2><h3 id="_6-1-内存映射-mmap" tabindex="-1">6.1 内存映射（mmap） <a class="header-anchor" href="#_6-1-内存映射-mmap" aria-label="Permalink to &quot;6.1 内存映射（mmap）&quot;">​</a></h3><h4 id="_6-1-1-mmap实现" tabindex="-1">6.1.1 mmap实现 <a class="header-anchor" href="#_6-1-1-mmap实现" aria-label="Permalink to &quot;6.1.1 mmap实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> mmappedChunk</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    file     </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">File</span></span>
<span class="line"><span class="__shiki_140thh">    data     []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_21nrsd">          // mmap映射的内存</span></span>
<span class="line"><span class="__shiki_140thh">    refCount </span><span class="__shiki_1itgoe">int32</span><span class="__shiki_21nrsd">           // 引用计数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 元数据</span></span>
<span class="line"><span class="__shiki_140thh">    minTime, maxTime </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    numSamples       </span><span class="__shiki_1itgoe">uint16</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> mapChunkFile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">filename</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">mmappedChunk</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 打开文件</span></span>
<span class="line"><span class="__shiki_140thh">    f, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(filename)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取文件大小</span></span>
<span class="line"><span class="__shiki_140thh">    stat, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> f.</span><span class="__shiki_1t8gfj">Stat</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        f.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行mmap</span></span>
<span class="line"><span class="__shiki_140thh">    data, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> syscall.</span><span class="__shiki_1t8gfj">Mmap</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">(f.</span><span class="__shiki_1t8gfj">Fd</span><span class="__shiki_140thh">()), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">(stat.</span><span class="__shiki_1t8gfj">Size</span><span class="__shiki_140thh">()), </span></span>
<span class="line"><span class="__shiki_140thh">        syscall.PROT_READ, syscall.MAP_SHARED)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        f.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">mmappedChunk</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        file:     f,</span></span>
<span class="line"><span class="__shiki_140thh">        data:     data,</span></span>
<span class="line"><span class="__shiki_140thh">        refCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-引用计数管理" tabindex="-1">6.1.2 引用计数管理 <a class="header-anchor" href="#_6-1-2-引用计数管理" aria-label="Permalink to &quot;6.1.2 引用计数管理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">mmappedChunk</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">acquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    atomic.</span><span class="__shiki_1t8gfj">AddInt32</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">c.refCount, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">mmappedChunk</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">release</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> atomic.</span><span class="__shiki_1t8gfj">AddInt32</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">c.refCount, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 释放资源</span></span>
<span class="line"><span class="__shiki_140thh">        syscall.</span><span class="__shiki_1t8gfj">Munmap</span><span class="__shiki_140thh">(c.data)</span></span>
<span class="line"><span class="__shiki_140thh">        c.file.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-查询优化索引" tabindex="-1">6.2 查询优化索引 <a class="header-anchor" href="#_6-2-查询优化索引" aria-label="Permalink to &quot;6.2 查询优化索引&quot;">​</a></h3><h4 id="_6-2-1-布隆过滤器优化" tabindex="-1">6.2.1 布隆过滤器优化 <a class="header-anchor" href="#_6-2-1-布隆过滤器优化" aria-label="Permalink to &quot;6.2.1 布隆过滤器优化&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 为常用标签对添加布隆过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> bloomFilter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    bits     []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    k        </span><span class="__shiki_1itgoe">uint</span><span class="__shiki_21nrsd">      // 哈希函数数量</span></span>
<span class="line"><span class="__shiki_140thh">    m        </span><span class="__shiki_1itgoe">uint</span><span class="__shiki_21nrsd">      // 位数组大小</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">bf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">bloomFilter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">labelPair</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> uint</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">); i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> bf.k; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        hash </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bf.</span><span class="__shiki_1t8gfj">hash</span><span class="__shiki_140thh">(labelPair, i)</span></span>
<span class="line"><span class="__shiki_140thh">        bf.bits[hash</span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh">bf.m] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">bf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">bloomFilter</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">test</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">labelPair</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> uint</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">); i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> bf.k; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        hash </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bf.</span><span class="__shiki_1t8gfj">hash</span><span class="__shiki_140thh">(labelPair, i)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> bf.bits[hash</span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh">bf.m] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-2-2-查询缓存" tabindex="-1">6.2.2 查询缓存 <a class="header-anchor" href="#_6-2-2-查询缓存" aria-label="Permalink to &quot;6.2.2 查询缓存&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> queryCache</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    cache </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">cachedResult</span></span>
<span class="line"><span class="__shiki_140thh">    lru   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">list</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">List</span></span>
<span class="line"><span class="__shiki_140thh">    size  </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    mu    </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> cachedResult</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    key    </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">    result []</span><span class="__shiki_1t8gfj">promql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Series</span></span>
<span class="line"><span class="__shiki_140thh">    expiry </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    elem   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">list</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Element</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">qc </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">queryCache</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">mint</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">maxt</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) ([]</span><span class="__shiki_1t8gfj">promql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Series</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> qc.</span><span class="__shiki_1t8gfj">hash</span><span class="__shiki_140thh">(query, mint, maxt)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    qc.mu.</span><span class="__shiki_1t8gfj">RLock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> qc.mu.</span><span class="__shiki_1t8gfj">RUnlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> entry, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> qc.cache[key]; ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Before</span><span class="__shiki_140thh">(entry.expiry) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新LRU</span></span>
<span class="line"><span class="__shiki_140thh">            qc.lru.</span><span class="__shiki_1t8gfj">MoveToFront</span><span class="__shiki_140thh">(entry.elem)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> entry.result, </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、实际配置与调优" tabindex="-1">七、实际配置与调优 <a class="header-anchor" href="#七、实际配置与调优" aria-label="Permalink to &quot;七、实际配置与调优&quot;">​</a></h2><h3 id="_7-1-存储配置参数" tabindex="-1">7.1 存储配置参数 <a class="header-anchor" href="#_7-1-存储配置参数" aria-label="Permalink to &quot;7.1 存储配置参数&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># prometheus.yml配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tsdb</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 存储路径</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/prometheus/data</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 保留策略</span></span>
<span class="line"><span class="__shiki_17hn0y">    retention</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      time</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15d</span><span class="__shiki_21nrsd">            # 保留时间</span></span>
<span class="line"><span class="__shiki_17hn0y">      size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100GB</span><span class="__shiki_21nrsd">          # 最大存储大小</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WAL配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    wal</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      segment-size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128MB</span><span class="__shiki_21nrsd">  # WAL段大小</span></span>
<span class="line"><span class="__shiki_17hn0y">      flush-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span><span class="__shiki_21nrsd">   # 刷新间隔</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Head Block配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    head-chunks-write-buffer-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4194304</span><span class="__shiki_21nrsd">  # 4MB</span></span>
<span class="line"><span class="__shiki_17hn0y">    stripe-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">16384</span><span class="__shiki_21nrsd">                     # 分片大小</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 压缩配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    compaction</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2h</span><span class="__shiki_21nrsd">         # 压缩间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-block-chunks</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000000</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-block-duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2h</span></span></code></pre></div><h3 id="_7-2-性能调优建议" tabindex="-1">7.2 性能调优建议 <a class="header-anchor" href="#_7-2-性能调优建议" aria-label="Permalink to &quot;7.2 性能调优建议&quot;">​</a></h3><h4 id="_7-2-1-硬件配置" tabindex="-1">7.2.1 硬件配置 <a class="header-anchor" href="#_7-2-1-硬件配置" aria-label="Permalink to &quot;7.2.1 硬件配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">推荐配置</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  CPU</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">8+ 核心</span></span>
<span class="line"><span class="__shiki_17hn0y">  内存</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">32GB+ (每100万序列约2-3GB)</span></span>
<span class="line"><span class="__shiki_17hn0y">  磁盘</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SSD, 保留空间的3倍以上</span></span>
<span class="line"><span class="__shiki_17hn0y">  网络</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10GbE</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">监控指标</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">process_resident_memory_bytes</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">prometheus_tsdb_head_series</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">prometheus_tsdb_wal_fsync_duration_seconds</span></span></code></pre></div><h4 id="_7-2-2-操作系统优化" tabindex="-1">7.2.2 操作系统优化 <a class="header-anchor" href="#_7-2-2-操作系统优化" aria-label="Permalink to &quot;7.2.2 操作系统优化&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Linux内核参数优化</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> vm.overcommit_memory=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> vm.swappiness=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_mdbnqw"> fs.file-max=</span><span class="__shiki_dzsirb">1000000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 磁盘调度器</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> deadline</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/block/sda/queue/scheduler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文件系统优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用XFS或ext4 with noatime,nodiratime</span></span>
<span class="line"><span class="__shiki_1t8gfj">mount</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> noatime,nodiratime,data=writeback</span><span class="__shiki_mdbnqw"> /dev/sdb1</span><span class="__shiki_mdbnqw"> /prometheus</span></span></code></pre></div><h2 id="八、故障恢复与维护" tabindex="-1">八、故障恢复与维护 <a class="header-anchor" href="#八、故障恢复与维护" aria-label="Permalink to &quot;八、故障恢复与维护&quot;">​</a></h2><h3 id="_8-1-数据损坏恢复" tabindex="-1">8.1 数据损坏恢复 <a class="header-anchor" href="#_8-1-数据损坏恢复" aria-label="Permalink to &quot;8.1 数据损坏恢复&quot;">​</a></h3><h4 id="_8-1-1-损坏检测" tabindex="-1">8.1.1 损坏检测 <a class="header-anchor" href="#_8-1-1-损坏检测" aria-label="Permalink to &quot;8.1.1 损坏检测&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查块完整性</span></span>
<span class="line"><span class="__shiki_1t8gfj">promtool</span><span class="__shiki_mdbnqw"> check</span><span class="__shiki_mdbnqw"> tsdb</span><span class="__shiki_mdbnqw"> /prometheus/data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查WAL完整性</span></span>
<span class="line"><span class="__shiki_1t8gfj">promtool</span><span class="__shiki_mdbnqw"> check</span><span class="__shiki_mdbnqw"> wal</span><span class="__shiki_mdbnqw"> /prometheus/data/wal</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出示例：</span></span>
<span class="line"><span class="__shiki_1t8gfj">Checking</span><span class="__shiki_mdbnqw"> /prometheus/data</span></span>
<span class="line"><span class="__shiki_1t8gfj">SUCCESS:</span><span class="__shiki_dzsirb"> 25</span><span class="__shiki_mdbnqw"> blocks</span><span class="__shiki_mdbnqw"> found</span></span>
<span class="line"><span class="__shiki_1t8gfj">Block:</span><span class="__shiki_mdbnqw"> ULID:01FT8X9C0YNG4C6X9JH6R7ABCD,</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">       MinTime:2022-01-01</span><span class="__shiki_mdbnqw"> 00:00:00</span><span class="__shiki_mdbnqw"> +0000</span><span class="__shiki_mdbnqw"> UTC,</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">       MaxTime:2022-01-01</span><span class="__shiki_mdbnqw"> 02:00:00</span><span class="__shiki_mdbnqw"> +0000</span><span class="__shiki_mdbnqw"> UTC</span></span></code></pre></div><h4 id="_8-1-2-修复工具" tabindex="-1">8.1.2 修复工具 <a class="header-anchor" href="#_8-1-2-修复工具" aria-label="Permalink to &quot;8.1.2 修复工具&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 块修复工具示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> repairBlock</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">blockDir</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证元数据</span></span>
<span class="line"><span class="__shiki_140thh">    meta, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> readMeta</span><span class="__shiki_140thh">(blockDir)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 重建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> rebuildIndex</span><span class="__shiki_140thh">(blockDir); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 验证chunk完整性</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> verifyChunks</span><span class="__shiki_140thh">(blockDir); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 移除损坏的chunk</span></span>
<span class="line"><span class="__shiki_1t8gfj">        removeCorruptedChunks</span><span class="__shiki_140thh">(blockDir)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 更新元数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> updateMeta</span><span class="__shiki_140thh">(blockDir, meta)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-监控与告警" tabindex="-1">8.2 监控与告警 <a class="header-anchor" href="#_8-2-监控与告警" aria-label="Permalink to &quot;8.2 监控与告警&quot;">​</a></h3><h4 id="_8-2-1-关键监控指标" tabindex="-1">8.2.1 关键监控指标 <a class="header-anchor" href="#_8-2-1-关键监控指标" aria-label="Permalink to &quot;8.2.1 关键监控指标&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh"># 存储健康度</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_tsdb_head_series</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_tsdb_head_chunks</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_tsdb_wal_corruptions_total</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 性能指标</span></span>
<span class="line"><span class="__shiki_140thh">rate(prometheus_tsdb_compactions_total[5m])</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_tsdb_compaction_duration_seconds</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_tsdb_wal_fsync_duration_seconds</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh"># 容量规划</span></span>
<span class="line"><span class="__shiki_140thh">predict_linear(prometheus_tsdb_storage_blocks_bytes[6h], </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">24</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_8-2-2-告警规则示例" tabindex="-1">8.2.2 告警规则示例 <a class="header-anchor" href="#_8-2-2-告警规则示例" aria-label="Permalink to &quot;8.2.2 告警规则示例&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tsdb.rules</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TSDBHeadSeriesTooHigh</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">prometheus_tsdb_head_series &gt; 10000000</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TSDBWALCorruptions</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">increase(prometheus_tsdb_wal_corruptions_total[5m]) &gt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TSDBNearRetentionLimit</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          (prometheus_tsdb_storage_blocks_bytes </span></span>
<span class="line"><span class="__shiki_mdbnqw">          / ignoring(instance) </span></span>
<span class="line"><span class="__shiki_mdbnqw">          group_left </span></span>
<span class="line"><span class="__shiki_mdbnqw">          node_filesystem_size_bytes{mountpoint=&quot;/prometheus&quot;}) &gt; 0.8</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15m</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="关键要点回顾" tabindex="-1">关键要点回顾 <a class="header-anchor" href="#关键要点回顾" aria-label="Permalink to &quot;关键要点回顾&quot;">​</a></h3><ol><li><strong>WAL机制</strong>：确保数据持久性，使用分段和检查点优化</li><li><strong>内存管理</strong>：Head Block作为写入缓冲区，定期压缩到磁盘</li><li><strong>存储格式</strong>：精心设计的Block格式支持高效查询</li><li><strong>压缩算法</strong>：XOR编码实现高压缩比，适合时序数据特点</li><li><strong>多级压缩</strong>：时间分层压缩平衡查询性能与存储效率</li><li><strong>性能优化</strong>：mmap、缓存、布隆过滤器等提升查询速度</li></ol><h3 id="最佳实践建议" tabindex="-1">最佳实践建议 <a class="header-anchor" href="#最佳实践建议" aria-label="Permalink to &quot;最佳实践建议&quot;">​</a></h3><ol><li><strong>容量规划</strong>：预留3倍磁盘空间用于压缩和WAL</li><li><strong>监控告警</strong>：密切关注Head Series数量和WAL错误</li><li><strong>定期维护</strong>：使用promtool检查数据完整性</li><li><strong>版本升级</strong>：注意存储格式兼容性</li><li><strong>灾难恢复</strong>：定期备份重要块的元数据</li></ol><p>通过深入理解Prometheus的存储格式与压缩机制，可以更好地进行容量规划、性能调优和故障排除，确保监控系统的稳定性和可靠性。</p>`,117)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
