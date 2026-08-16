import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/bigdata/hadoop/columnar.md","filePath":"data/database/bigdata/hadoop/columnar.md"}'),_={name:"data/database/bigdata/hadoop/columnar.md"};function l(h,s,c,t,e,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h2 id="parquet与orc列式存储格式深度解析" tabindex="-1">Parquet与ORC列式存储格式深度解析 <a class="header-anchor" href="#parquet与orc列式存储格式深度解析" aria-label="Permalink to &quot;Parquet与ORC列式存储格式深度解析&quot;">​</a></h2><h3 id="一、列式存储基础原理" tabindex="-1">一、列式存储基础原理 <a class="header-anchor" href="#一、列式存储基础原理" aria-label="Permalink to &quot;一、列式存储基础原理&quot;">​</a></h3><h4 id="_1-1-列式存储-vs-行式存储-根本差异" tabindex="-1">1.1 列式存储 vs 行式存储：根本差异 <a class="header-anchor" href="#_1-1-列式存储-vs-行式存储-根本差异" aria-label="Permalink to &quot;1.1 列式存储 vs 行式存储：根本差异&quot;">​</a></h4><p>在大数据领域，存储格式的选择直接影响着查询性能、存储效率和系统可扩展性。列式存储与传统的行式存储在物理存储布局上存在根本性差异：</p><p><strong>行式存储（Row-based Storage）物理布局：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">行存储文件示例：</span></span>
<span class="line"><span class="__shiki_wvjl67">| 用户ID | 用户名 | 年龄 | 城市 | 注册时间 | 最后登录 |</span></span>
<span class="line"><span class="__shiki_wvjl67">|--------|--------|------|------|----------|----------|</span></span>
<span class="line"><span class="__shiki_wvjl67">| 1001   | Alice  | 28   | 北京 | 2023-01-01|2023-12-01|</span></span>
<span class="line"><span class="__shiki_wvjl67">| 1002   | Bob    | 35   | 上海 | 2022-08-15|2023-11-30|</span></span>
<span class="line"><span class="__shiki_wvjl67">| 1003   | Carol  | 42   | 广州 | 2021-05-20|2023-12-02|</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">物理存储形式（连续存储每行的所有列）：</span></span>
<span class="line"><span class="__shiki_wvjl67">[1001, Alice, 28, 北京, 2023-01-01, 2023-12-01], </span></span>
<span class="line"><span class="__shiki_wvjl67">[1002, Bob, 35, 上海, 2022-08-15, 2023-11-30], </span></span>
<span class="line"><span class="__shiki_wvjl67">[1003, Carol, 42, 广州, 2021-05-20, 2023-12-02], ...</span></span></code></pre></div><p><strong>列式存储（Column-based Storage）物理布局：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">同一文件内，每列数据连续存储：</span></span>
<span class="line"><span class="__shiki_wvjl67">用户ID列：[1001, 1002, 1003, ...]</span></span>
<span class="line"><span class="__shiki_wvjl67">用户名列：[&quot;Alice&quot;, &quot;Bob&quot;, &quot;Carol&quot;, ...]</span></span>
<span class="line"><span class="__shiki_wvjl67">年龄列：[28, 35, 42, ...]</span></span>
<span class="line"><span class="__shiki_wvjl67">城市列：[&quot;北京&quot;, &quot;上海&quot;, &quot;广州&quot;, ...]</span></span>
<span class="line"><span class="__shiki_wvjl67">注册时间列：[2023-01-01, 2022-08-15, 2021-05-20, ...]</span></span>
<span class="line"><span class="__shiki_wvjl67">最后登录列：[2023-12-01, 2023-11-30, 2023-12-02, ...]</span></span></code></pre></div><h4 id="_1-2-列式存储的核心优势" tabindex="-1">1.2 列式存储的核心优势 <a class="header-anchor" href="#_1-2-列式存储的核心优势" aria-label="Permalink to &quot;1.2 列式存储的核心优势&quot;">​</a></h4><p><strong>查询性能优势：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">场景：查询&quot;统计北京用户的平均年龄&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">行式存储处理流程：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 读取整行数据（包括所有列）</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 逐行检查&quot;城市&quot;列是否为&quot;北京&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 对符合条件的行，提取&quot;年龄&quot;列值</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 计算平均值</span></span>
<span class="line"><span class="__shiki_wvjl67">I/O开销：读取所有列的数据，即使只需要2列</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">列式存储处理流程：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 仅读取&quot;城市&quot;列的数据</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 确定哪些行对应&quot;北京&quot;</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 仅读取这些行的&quot;年龄&quot;列数据</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 计算平均值</span></span>
<span class="line"><span class="__shiki_wvjl67">I/O开销：只读取2列的数据，减少70-90%的I/O</span></span></code></pre></div><p><strong>数据压缩优势：</strong></p><ul><li><strong>同质数据类型</strong>：同一列数据通常具有相同数据类型，利于高效压缩</li><li><strong>编码效率高</strong>：可使用列特定的编码技术（如字典编码、游程编码等）</li><li><strong>压缩比更高</strong>：相比行式存储，通常可减少30-70%的存储空间</li></ul><p><strong>适合的分析型查询模式：</strong></p><ol><li><strong>聚合查询</strong>：SUM、AVG、COUNT、MIN、MAX等</li><li><strong>选择性投影</strong>：只查询少数列</li><li><strong>列过滤查询</strong>：WHERE条件基于少数列</li><li><strong>大规模扫描</strong>：扫描全表的部分列</li></ol><h3 id="二、apache-parquet列式存储格式" tabindex="-1">二、Apache Parquet列式存储格式 <a class="header-anchor" href="#二、apache-parquet列式存储格式" aria-label="Permalink to &quot;二、Apache Parquet列式存储格式&quot;">​</a></h3><h4 id="_2-1-parquet架构设计" tabindex="-1">2.1 Parquet架构设计 <a class="header-anchor" href="#_2-1-parquet架构设计" aria-label="Permalink to &quot;2.1 Parquet架构设计&quot;">​</a></h4><p><strong>核心设计原则：</strong></p><ul><li><strong>复杂嵌套数据支持</strong>：基于Google Dremel论文的重复/定义级别编码</li><li><strong>自描述格式</strong>：文件本身包含完整的schema信息</li><li><strong>语言无关性</strong>：支持多种编程语言和计算框架</li></ul><p><strong>Parquet文件物理结构：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    Parquet文件                       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                     文件头                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│        (4字节&quot;PAR1&quot;魔法数字，标识文件格式)           │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                   行组1 (Row Group 1)               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │                列块1.1 (Column Chunk)       │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  ┌─────────────────────────────────────┐  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │           数据页1.1.1 (Data Page)   │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  ┌─────────────────────────────┐  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  │      页头(Page Header)      │  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  ├─────────────────────────────┤  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  │    重复/定义级别(R/D Levels)│  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  ├─────────────────────────────┤  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  │        值(Values)           │  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  └─────────────────────────────┘  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │            ... 更多数据页 ...     │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  ┌─────────────────────────────┐  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  │        字典页(Dictionary    │  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  │          Page，可选)        │  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  │  └─────────────────────────────┘  │  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─────────────────────────────────────┘  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │                 ... 更多列块 ...          │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                   行组2 (Row Group 2)               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    ... 更多行组 ...                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│             文件元数据(File Metadata)               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Schema信息、行组信息、列元数据、键值元数据等 │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│              元数据长度(4字节)                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>行组(Row Group)设计：</strong></p><ul><li>数据水平分割的基本单位</li><li>每个行组独立，可并行处理</li><li>默认大小：128MB-1GB</li><li>包含行组中所有列的列块(Column Chunk)</li></ul><p><strong>列块(Column Chunk)结构：</strong></p><ul><li>包含一个列在行组中的所有数据</li><li>由多个数据页(Data Page)组成</li><li>可能包含一个字典页(Dictionary Page)</li><li>存储列级统计信息（最小值、最大值、空值数等）</li></ul><h4 id="_2-2-parquet编码与压缩技术" tabindex="-1">2.2 Parquet编码与压缩技术 <a class="header-anchor" href="#_2-2-parquet编码与压缩技术" aria-label="Permalink to &quot;2.2 Parquet编码与压缩技术&quot;">​</a></h4><p><strong>编码技术：</strong></p><ol><li><p><strong>字典编码(Dictionary Encoding)</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 原始字符串数据</span></span>
<span class="line"><span class="__shiki_140thh">cities </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;北京&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;上海&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;北京&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;广州&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;上海&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;北京&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 字典编码后</span></span>
<span class="line"><span class="__shiki_140thh">dictionary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;北京&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;上海&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;广州&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">encoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 仅存储整数ID</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 压缩率提升：(6个字符串) vs (6个整数+小字典)</span></span></code></pre></div></li><li><p><strong>游程编码(Run-Length Encoding, RLE)</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 原始布尔值或重复值</span></span>
<span class="line"><span class="__shiki_140thh">flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># RLE编码后</span></span>
<span class="line"><span class="__shiki_21nrsd"># (值, 重复次数)对</span></span>
<span class="line"><span class="__shiki_140thh">encoded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">), (</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">), (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数据量减少：10个值 → 3个对</span></span></code></pre></div></li><li><p><strong>位打包编码(Bit-Packing)</strong></p><ul><li>小范围整数的紧凑存储</li><li>如存储0-31的整数，只需5位而非8位</li></ul></li><li><p><strong>增量编码(Delta Encoding)</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 原始递增时间戳</span></span>
<span class="line"><span class="__shiki_140thh">timestamps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1005</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1012</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1020</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1031</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 增量编码后</span></span>
<span class="line"><span class="__shiki_140thh">base </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">deltas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">11</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 存储差值而非绝对值</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 差值通常更小，压缩效果更好</span></span></code></pre></div></li></ol><p><strong>压缩算法支持：</strong></p><ul><li><strong>Snappy</strong>：快速压缩/解压，中等压缩比（默认选择）</li><li><strong>Gzip</strong>：较高压缩比，较慢速度</li><li><strong>LZO</strong>：快速，压缩比较低</li><li><strong>ZSTD</strong>：新一代，良好压缩比和速度平衡</li><li><strong>Brotli</strong>：极高压缩比，较慢</li></ul><h4 id="_2-3-parquet复杂类型支持" tabindex="-1">2.3 Parquet复杂类型支持 <a class="header-anchor" href="#_2-3-parquet复杂类型支持" aria-label="Permalink to &quot;2.3 Parquet复杂类型支持&quot;">​</a></h4><p><strong>嵌套数据结构表示：</strong></p><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Parquet schema定义示例</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Document</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  required int64 DocId;</span></span>
<span class="line"><span class="__shiki_140thh">  optional group Links {</span></span>
<span class="line"><span class="__shiki_140thh">    repeated int64 Backward;</span></span>
<span class="line"><span class="__shiki_140thh">    repeated int64 Forward;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  repeated group Name {</span></span>
<span class="line"><span class="__shiki_140thh">    repeated group Language {</span></span>
<span class="line"><span class="__shiki_140thh">      required string Code;</span></span>
<span class="line"><span class="__shiki_140thh">      optional string Country;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    optional string Url;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>重复与定义级别(Repetition/Definition Levels)：</strong></p><ul><li><strong>定义级别(Definition Level)</strong>：表示路径中多少可选字段实际存在</li><li><strong>重复级别(Repetition Level)</strong>：表示在嵌套结构中，当前值在哪个重复层级开始</li></ul><p><strong>示例：存储嵌套数组</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// JSON数据示例</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;users&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_dzsirb">&quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">&quot;emails&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;a@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;alice@work.com&quot;</span><span class="__shiki_140thh">]},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_dzsirb">&quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">&quot;emails&quot;</span><span class="__shiki_140thh">: []},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_dzsirb">&quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Carol&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">&quot;emails&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;carol@example.com&quot;</span><span class="__shiki_140thh">]}</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Parquet中的扁平化表示</span></span>
<span class="line"><span class="__shiki_140thh">行号 | name   | emails          | 重复级别 | 定义级别</span></span>
<span class="line"><span class="__shiki_140thh">-----|--------|-----------------|----------|----------</span></span>
<span class="line"><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">    | Alice  | a@example.com   | </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">        | </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">    | Alice  | alice@work.com  | </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">        | </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">    | Bob    | </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">            | </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">        | </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">    | Carol  | carol@example.com| </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">       | </span><span class="__shiki_dzsirb">2</span></span></code></pre></div><h4 id="_2-4-parquet生态系统集成" tabindex="-1">2.4 Parquet生态系统集成 <a class="header-anchor" href="#_2-4-parquet生态系统集成" aria-label="Permalink to &quot;2.4 Parquet生态系统集成&quot;">​</a></h4><p><strong>计算框架支持：</strong></p><ul><li><strong>Apache Spark</strong>：原生支持，最佳性能</li><li><strong>Apache Hive</strong>：通过Hive SerDe支持</li><li><strong>Presto/Trino</strong>：完全兼容</li><li><strong>Apache Flink</strong>：内置连接器</li><li><strong>Apache Impala</strong>：原生支持</li></ul><p><strong>读写API示例：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Apache Spark写入Parquet</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.apache.spark.sql.{SparkSession, SaveMode}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">val spark = SparkSession.builder()</span></span>
<span class="line"><span class="__shiki_140thh">  .appName(&quot;ParquetExample&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">  .getOrCreate()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 从JSON读取数据</span></span>
<span class="line"><span class="__shiki_140thh">val df = spark.read.json(&quot;hdfs:</span><span class="__shiki_21nrsd">//path/to/data.json&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 写入Parquet格式</span></span>
<span class="line"><span class="__shiki_140thh">df.write</span></span>
<span class="line"><span class="__shiki_140thh">  .mode(SaveMode.Overwrite)</span></span>
<span class="line"><span class="__shiki_140thh">  .option(&quot;compression&quot;, &quot;snappy&quot;)  </span><span class="__shiki_21nrsd">// 设置压缩算法</span></span>
<span class="line"><span class="__shiki_140thh">  .option(&quot;parquet.block.size&quot;, </span><span class="__shiki_2bbn9v">256 *</span><span class="__shiki_2bbn9v"> 1024 *</span><span class="__shiki_2bbn9v"> 1024</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 256MB行组</span></span>
<span class="line"><span class="__shiki_140thh">  .parquet(&quot;hdfs:</span><span class="__shiki_21nrsd">//path/to/output.parquet&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 读取Parquet文件</span></span>
<span class="line"><span class="__shiki_140thh">val parquetDF = spark.read.parquet(&quot;hdfs:</span><span class="__shiki_21nrsd">//path/to/output.parquet&quot;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 执行过滤查询（谓词下推优化）</span></span>
<span class="line"><span class="__shiki_140thh">val filteredDF = parquetDF.filter(&quot;age &gt; </span><span class="__shiki_2bbn9v">25</span><span class="__shiki_140thh"> AND city = &#39;北京&#39;&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">filteredDF.show()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 统计信息</span></span>
<span class="line"><span class="__shiki_140thh">println(s&quot;数据量: \${parquetDF.count()}行&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">println(s&quot;文件大小: \${getFileSize(&quot;output.parquet&quot;)}&quot;)</span></span></code></pre></div><h3 id="三、apache-orc列式存储格式" tabindex="-1">三、Apache ORC列式存储格式 <a class="header-anchor" href="#三、apache-orc列式存储格式" aria-label="Permalink to &quot;三、Apache ORC列式存储格式&quot;">​</a></h3><h4 id="_3-1-orc架构设计" tabindex="-1">3.1 ORC架构设计 <a class="header-anchor" href="#_3-1-orc架构设计" aria-label="Permalink to &quot;3.1 ORC架构设计&quot;">​</a></h4><p><strong>ORC文件物理结构：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    ORC文件                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│               Postscript (尾部信息)                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  - 文件尾部长度                                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  - 压缩类型 (none/zlib/snappy)                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  - 压缩块大小                                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  - 文件版本等元数据                                │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Footer (文件脚注)                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 文件级统计信息                              │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 行数、行组(Stripe)数、schema信息            │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ├─────────────────────────────────────────────┤  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 行组(Stripe)信息列表                        │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 每个行组的偏移量、长度、行数               │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 列级统计信息(min/max/count/sum等)         │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ├─────────────────────────────────────────────┤  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 类型信息 (Type Descriptions)                │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 列名、类型、嵌套结构                      │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Stripe 行组 N                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 ... 更多行组 ...                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Stripe 行组 2                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │               Stripe Footer                 │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 流(Stream)位置信息                        │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 行组内统计信息                            │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │                索引数据                     │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 行索引 (Row Index)                        │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 布隆过滤器索引 (可选)                     │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────────────────────────────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │                实际数据                     │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 列数据，按列存储                          │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ - 可能包含字典数据                         │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────────────────────────────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 Stripe 行组 1                     │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>行组(Stripe)设计特点：</strong></p><ul><li>默认大小：64-256MB</li><li>每个行组独立可并行处理</li><li>包含行组内所有列的数据</li><li>存储索引、数据和行组脚注</li></ul><p><strong>ORC的流(Stream)概念：</strong></p><ol><li><strong>数据流(Data Stream)</strong>：存储实际的列值</li><li><strong>长度流(Length Stream)</strong>：存储变长数据的长度</li><li><strong>字典流(Dictionary Stream)</strong>：存储字典编码的字典</li><li><strong>二级流(Secondary Stream)</strong>：其他元数据</li></ol><h4 id="_3-2-orc索引与优化技术" tabindex="-1">3.2 ORC索引与优化技术 <a class="header-anchor" href="#_3-2-orc索引与优化技术" aria-label="Permalink to &quot;3.2 ORC索引与优化技术&quot;">​</a></h4><p><strong>三级索引机制：</strong></p><ol><li><strong>文件级索引</strong>：存储文件级别的统计信息</li><li><strong>行组级索引</strong>：每个行组的统计信息</li><li><strong>行级索引</strong>：每10,000行一个索引条目</li></ol><p><strong>谓词下推(Predicate Pushdown)优化：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查询示例</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> user_id, </span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(amount) </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> transactions </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> transaction_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-12-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> user_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- ORC执行流程优化：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 读取文件脚注，获取每个行组的统计信息</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 跳过不包含&#39;2023-12-01&#39;的行组（基于min/max值）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 在符合条件的行组内，使用布隆过滤器快速定位行</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 仅解码需要的列(user_id, amount, transaction_date)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 执行过滤和聚合</span></span></code></pre></div><p><strong>布隆过滤器(Bloom Filter)：</strong></p><ul><li>可选索引，用于高效判断某值是否不存在</li><li>减少不必要的行组读取</li><li>对高基数列特别有效（如user_id、email等）</li></ul><p><strong>ORC的ACID事务支持（Hive 3.0+）：</strong></p><ul><li>基于底层文件系统的ACID操作</li><li>支持INSERT、UPDATE、DELETE、MERGE</li><li>使用基本(Base)文件、增量(Delta)文件和清单(Manifest)文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">事务目录结构：</span></span>
<span class="line"><span class="__shiki_wvjl67">└── table_path</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── base_0000001  (基础数据)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── delta_0000002_0000002_0000 (增量1)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── delta_0000003_0000003_0000 (增量2)</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── _orc_acid_version (ACID版本标识)</span></span></code></pre></div><h4 id="_3-3-orc数据类型与编码" tabindex="-1">3.3 ORC数据类型与编码 <a class="header-anchor" href="#_3-3-orc数据类型与编码" aria-label="Permalink to &quot;3.3 ORC数据类型与编码&quot;">​</a></h4><p><strong>基本类型编码：</strong></p><ol><li><strong>整数类型</strong>：使用RLE和增量编码</li><li><strong>字符串类型</strong>：字典编码 + 增量编码</li><li><strong>浮点数</strong>：直接存储，可选压缩</li><li><strong>布尔值</strong>：位打包编码</li><li><strong>时间类型</strong>：独立编码年月日时分秒</li></ol><p><strong>复杂类型支持：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- ORC支持的复杂数据类型</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> complex_types</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  id </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  -- 结构体(STRUCT)</span></span>
<span class="line"><span class="__shiki_140thh">  user_info STRUCT</span><span class="__shiki_1itgoe">&lt;name</span><span class="__shiki_140thh">:STRING, age:</span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">address</span><span class="__shiki_140thh">:STRING</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  -- 数组(ARRAY)</span></span>
<span class="line"><span class="__shiki_140thh">  tags </span><span class="__shiki_1itgoe">ARRAY&lt;</span><span class="__shiki_140thh">STRING</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  -- 映射(MAP)</span></span>
<span class="line"><span class="__shiki_140thh">  preferences MAP</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">STRING, STRING</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  -- 联合体(UNIONTYPE)</span></span>
<span class="line"><span class="__shiki_140thh">  contact UNIONTYPE</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">STRING, </span><span class="__shiki_1itgoe">INT</span><span class="__shiki_140thh">, STRUCT</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">email:STRING, phone:STRING</span><span class="__shiki_1itgoe">&gt;&gt;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">STORED </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> ORC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-4-orc生态系统集成" tabindex="-1">3.4 ORC生态系统集成 <a class="header-anchor" href="#_3-4-orc生态系统集成" aria-label="Permalink to &quot;3.4 ORC生态系统集成&quot;">​</a></h4><p><strong>Hive中的ORC使用：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建ORC格式表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_behavior_orc</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  session_id STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  page_url STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  event_type STRING,</span></span>
<span class="line"><span class="__shiki_140thh">  properties MAP</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">STRING, STRING</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">STORED </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> ORC</span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/user/hive/warehouse/user_behavior&#39;</span></span>
<span class="line"><span class="__shiki_140thh">TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.compress&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ZLIB&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- 压缩算法</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.compress.size&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;262144&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">-- 压缩块大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.stripe.size&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;268435456&#39;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">-- 行组大小256MB</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.row.index.stride&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;10000&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 行索引跨度</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.create.index&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">-- 创建索引</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;transactional&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_21nrsd">          -- ACID支持(Hive 3+)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> user_behavior_orc</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> user_behavior_source;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用向量化查询(性能关键)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hive</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">vectorized</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">execution</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">enabled</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">true;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_dzsirb"> hive</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">vectorized</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">execution</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">reduce</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">enabled=</span><span class="__shiki_140thh">true;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用谓词下推的查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> user_id, </span><span class="__shiki_dzsirb">COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> page_views</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> user_behavior_orc</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-12-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> event_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;page_view&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> user_id</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_140thh"> page_views </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="四、parquet与orc深度对比" tabindex="-1">四、Parquet与ORC深度对比 <a class="header-anchor" href="#四、parquet与orc深度对比" aria-label="Permalink to &quot;四、Parquet与ORC深度对比&quot;">​</a></h3><h4 id="_4-1-架构与设计哲学对比" tabindex="-1">4.1 架构与设计哲学对比 <a class="header-anchor" href="#_4-1-架构与设计哲学对比" aria-label="Permalink to &quot;4.1 架构与设计哲学对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>对比维度</strong></th><th><strong>Apache Parquet</strong></th><th><strong>Apache ORC</strong></th></tr></thead><tbody><tr><td><strong>起源</strong></td><td>源于Google Dremel/Treemedic论文，由Twitter和Cloudera贡献</td><td>源于Hive，由Facebook和Hortonworks贡献</td></tr><tr><td><strong>设计目标</strong></td><td>通用列式存储，强调嵌套数据支持</td><td>Hive/Hadoop生态优化，强调查询性能</td></tr><tr><td><strong>核心优势</strong></td><td>复杂嵌套数据结构，多语言支持</td><td>Hive集成度，ACID支持，高级索引</td></tr><tr><td><strong>文件结构</strong></td><td>行组→列块→数据页，更细粒度</td><td>Stripe→Stream，更统一</td></tr><tr><td><strong>元数据位置</strong></td><td>文件尾部</td><td>文件尾部+Postscript</td></tr></tbody></table><h4 id="_4-2-性能特征对比" tabindex="-1">4.2 性能特征对比 <a class="header-anchor" href="#_4-2-性能特征对比" aria-label="Permalink to &quot;4.2 性能特征对比&quot;">​</a></h4><p><strong>压缩率对比测试结果：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">数据集：TPC-DS 1TB，相同数据不同格式存储</span></span>
<span class="line"><span class="__shiki_wvjl67">┌────────────────┬─────────────┬─────────────┬─────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│  存储格式      │ 原始大小    │ 压缩后大小  │ 压缩率      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├────────────────┼─────────────┼─────────────┼─────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 文本(CSV)      │ 1.0 TB      │ 1.0 TB      │ 0%          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Parquet(Snappy)│ 1.0 TB      │ 0.31 TB     │ 69%         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ORC(ZLIB)      │ 1.0 TB      │ 0.29 TB     │ 71%         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Parquet(ZSTD)  │ 1.0 TB      │ 0.25 TB     │ 75%         │</span></span>
<span class="line"><span class="__shiki_wvjl67">└────────────────┴─────────────┴─────────────┴─────────────┘</span></span></code></pre></div><p><strong>查询性能对比（典型分析查询）：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 测试查询1：聚合查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> customer_id, </span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(order_amount), </span><span class="__shiki_dzsirb">AVG</span><span class="__shiki_140thh">(discount)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2023-12-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> customer_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">性能结果（相对时间）：</span></span>
<span class="line"><span class="__shiki_1itgoe">Parquet</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.0x (基准)   </span><span class="__shiki_1itgoe">ORC</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.85x (快15%)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 测试查询2：复杂嵌套查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> user_id, </span></span>
<span class="line"><span class="__shiki_dzsirb">       COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">events</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">view</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> pageviews,</span></span>
<span class="line"><span class="__shiki_dzsirb">       AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">events</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">duration</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_duration</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> user_sessions</span></span>
<span class="line"><span class="__shiki_140thh">LATERAL VIEW EXPLODE(session_events) e </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> events</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;page_view&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> session_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2023-12-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> user_id;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">性能结果（相对时间）：</span></span>
<span class="line"><span class="__shiki_1itgoe">Parquet</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.9x (快10%)   </span><span class="__shiki_1itgoe">ORC</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.0x (基准)</span></span></code></pre></div><h4 id="_4-3-功能特性对比" tabindex="-1">4.3 功能特性对比 <a class="header-anchor" href="#_4-3-功能特性对比" aria-label="Permalink to &quot;4.3 功能特性对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th><strong>功能特性</strong></th><th><strong>Parquet</strong></th><th><strong>ORC</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td><strong>嵌套数据支持</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>Parquet的重复/定义级别更适合深度嵌套结构</td></tr><tr><td><strong>ACID事务</strong></td><td>有限支持</td><td>⭐⭐⭐⭐⭐</td><td>ORC在Hive 3+提供完整ACID支持</td></tr><tr><td><strong>二级索引</strong></td><td>基本统计</td><td>⭐⭐⭐⭐⭐</td><td>ORC支持布隆过滤器等高级索引</td></tr><tr><td><strong>向量化执行</strong></td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>ORC与Hive/Tez向量化引擎深度集成</td></tr><tr><td><strong>模式演化</strong></td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>两者都支持向后兼容的模式变更</td></tr><tr><td><strong>加密与安全</strong></td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>ORC提供列级加密</td></tr><tr><td><strong>多语言支持</strong></td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>Parquet支持更广泛的编程语言</td></tr></tbody></table><h4 id="_4-4-生态系统支持对比" tabindex="-1">4.4 生态系统支持对比 <a class="header-anchor" href="#_4-4-生态系统支持对比" aria-label="Permalink to &quot;4.4 生态系统支持对比&quot;">​</a></h4><p><strong>Parquet生态系统：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">主要支持框架：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 框架        │ 支持程度与特性                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Spark│ ⭐⭐⭐⭐⭐ 原生支持，默认推荐格式           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Hive │ ⭐⭐⭐⭐ 通过SerDe支持                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Presto/Trino│ ⭐⭐⭐⭐⭐ 完全兼容，性能优秀                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Flink│ ⭐⭐⭐⭐ 内置连接器                         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Impala│⭐⭐⭐⭐⭐ 原生支持，性能优化                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Pandas      │ ⭐⭐⭐⭐ 通过PyArrow支持                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Dask        │ ⭐⭐⭐⭐ 分布式读取支持                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Arrow│ ⭐⭐⭐⭐⭐ 内存格式与Parquet无缝转换         │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>ORC生态系统：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">主要支持框架：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────┬─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 框架        │ 支持程度与特性                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────┼─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Hive │ ⭐⭐⭐⭐⭐ 原生支持，深度集成                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Spark│ ⭐⭐⭐⭐ 良好支持，但非默认                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Presto/Trino│ ⭐⭐⭐⭐ 完全支持                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Tez  │ ⭐⭐⭐⭐⭐ 向量化执行优化                    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Pig  │ ⭐⭐⭐⭐ 通过加载器支持                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ MapReduce   │ ⭐⭐⭐⭐ 通过InputFormat支持                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Apache Nifi │ ⭐⭐⭐ 支持读写                             │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────┴─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="五、实践应用指南" tabindex="-1">五、实践应用指南 <a class="header-anchor" href="#五、实践应用指南" aria-label="Permalink to &quot;五、实践应用指南&quot;">​</a></h3><h4 id="_5-1-格式选择决策树" tabindex="-1">5.1 格式选择决策树 <a class="header-anchor" href="#_5-1-格式选择决策树" aria-label="Permalink to &quot;5.1 格式选择决策树&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[开始: 选择存储格式] --&gt; B{主要使用场景?}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[Hive数据仓库]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[Spark数据分析]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[通用数据交换]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F{需要ACID事务?}</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|是| G[选择ORC]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|否| H{查询模式?}</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt;|简单扫描/聚合| G</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt;|复杂嵌套查询| I[选择Parquet]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; J{数据结构?}</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt;|简单扁平表| K{性能优先级?}</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt;|复杂嵌套结构| I</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt;|查询性能| L[考虑ORC]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt;|存储效率/兼容性| I</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; I</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; M[最佳实践: &lt;br/&gt;1. 启用向量化&lt;br/&gt;2. 配置合适Stripe大小&lt;br/&gt;3. 使用ZLIB压缩]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; N[最佳实践: &lt;br/&gt;1. 合理设计行组大小&lt;br/&gt;2. 使用Snappy/ZSTD压缩&lt;br/&gt;3. 利用谓词下推]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; O[最佳实践: &lt;br/&gt;1. 测试两种格式性能&lt;br/&gt;2. 基于实际负载选择]</span></span></code></pre></div><h4 id="_5-2-性能调优参数" tabindex="-1">5.2 性能调优参数 <a class="header-anchor" href="#_5-2-性能调优参数" aria-label="Permalink to &quot;5.2 性能调优参数&quot;">​</a></h4><p><strong>Parquet调优参数：</strong></p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Spark中Parquet调优</span></span>
<span class="line"><span class="__shiki_1itgoe">spark.sql.parquet.filterPushdown</span><span class="__shiki_140thh">=true          </span><span class="__shiki_21nrsd"># 启用谓词下推</span></span>
<span class="line"><span class="__shiki_1itgoe">spark.sql.parquet.mergeSchema</span><span class="__shiki_140thh">=true            </span><span class="__shiki_21nrsd"># 合并模式</span></span>
<span class="line"><span class="__shiki_1itgoe">spark.sql.parquet.compression.codec</span><span class="__shiki_140thh">=snappy    </span><span class="__shiki_21nrsd"># 压缩编解码器</span></span>
<span class="line"><span class="__shiki_1itgoe">spark.sql.parquet.block.size</span><span class="__shiki_140thh">=268435456        </span><span class="__shiki_21nrsd"># 256MB行组大小</span></span>
<span class="line"><span class="__shiki_1itgoe">spark.sql.parquet.enableVectorizedReader</span><span class="__shiki_140thh">=true </span><span class="__shiki_21nrsd"># 启用向量化读取</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Hive中Parquet调优</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">parquet.compression</span><span class="__shiki_140thh">=SNAPPY</span><span class="__shiki_21nrsd">;</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">parquet.block.size</span><span class="__shiki_140thh">=268435456</span><span class="__shiki_21nrsd">;</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">parquet.enable.dictionary</span><span class="__shiki_140thh">=true</span><span class="__shiki_21nrsd">;</span></span></code></pre></div><p><strong>ORC调优参数：</strong></p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Hive中ORC调优</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.exec.orc.default.stripe.size</span><span class="__shiki_140thh">=268435456</span><span class="__shiki_21nrsd">;    # 256MB stripe</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.exec.orc.default.block.size</span><span class="__shiki_140thh">=268435456</span><span class="__shiki_21nrsd">;     # 256MB HDFS块</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.exec.orc.default.compress</span><span class="__shiki_140thh">=ZLIB</span><span class="__shiki_21nrsd">;            # 压缩算法</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.exec.orc.default.row.index.stride</span><span class="__shiki_140thh">=10000</span><span class="__shiki_21nrsd">;   # 索引粒度</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.optimize.index.filter</span><span class="__shiki_140thh">=true</span><span class="__shiki_21nrsd">;               # 索引过滤</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.vectorized.execution.enabled</span><span class="__shiki_140thh">=true</span><span class="__shiki_21nrsd">;        # 向量化执行</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">hive.vectorized.execution.reduce.enabled</span><span class="__shiki_140thh">=true</span><span class="__shiki_21nrsd">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ORC高级配置</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">orc.bloom.filter.columns</span><span class="__shiki_140thh">=user_id,order_id</span><span class="__shiki_21nrsd">;     # 布隆过滤器列</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">orc.bloom.filter.fpp</span><span class="__shiki_140thh">=0.05</span><span class="__shiki_21nrsd">;                     # 误报率</span></span>
<span class="line"><span class="__shiki_140thh">SET </span><span class="__shiki_1itgoe">orc.create.index</span><span class="__shiki_140thh">=true</span><span class="__shiki_21nrsd">;                         # 创建索引</span></span></code></pre></div><h4 id="_5-3-迁移与转换策略" tabindex="-1">5.3 迁移与转换策略 <a class="header-anchor" href="#_5-3-迁移与转换策略" aria-label="Permalink to &quot;5.3 迁移与转换策略&quot;">​</a></h4><p><strong>Parquet与ORC相互转换：</strong></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 方法1: 使用Hive CTAS转换</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> target_table_orc</span></span>
<span class="line"><span class="__shiki_140thh">STORED </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> ORC</span></span>
<span class="line"><span class="__shiki_140thh">TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.compress&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ZLIB&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;orc.stripe.size&#39;</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;268435456&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> source_table_parquet;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 方法2: 使用Spark转换</span></span>
<span class="line"><span class="__shiki_140thh">val df </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> spark</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">read</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">parquet</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hdfs://path/to/parquet&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">df</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">write</span></span>
<span class="line"><span class="__shiki_140thh">  .mode(</span><span class="__shiki_mdbnqw">&quot;overwrite&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1itgoe">option</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;compression&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;zlib&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1itgoe">orc</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hdfs://path/to/orc&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 方法3: 使用Hive外部表转换</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建指向Parquet的外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> EXTERNAL</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> source_ext_parquet (</span></span>
<span class="line"><span class="__shiki_140thh">  ...</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">STORED </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> PARQUET</span></span>
<span class="line"><span class="__shiki_1itgoe">LOCATION</span><span class="__shiki_mdbnqw"> &#39;/path/to/parquet&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建ORC格式目标表并插入</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> target_orc</span><span class="__shiki_140thh"> STORED </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> ORC</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> source_ext_parquet;</span></span></code></pre></div><p><strong>性能对比测试脚本：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 格式性能对比测试脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 准备测试数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">hadoop</span><span class="__shiki_mdbnqw"> fs</span><span class="__shiki_dzsirb"> -rm</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> /test_data</span></span>
<span class="line"><span class="__shiki_1t8gfj">hive</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  CREATE TABLE test_source (id INT, name STRING, value DOUBLE, ts TIMESTAMP)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ROW FORMAT DELIMITED FIELDS TERMINATED BY &#39;,&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  -- 生成1000万行测试数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">  INSERT INTO test_source</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">    posexplode(split(space(9999999), &#39; &#39;)) as (id, dummy),</span></span>
<span class="line"><span class="__shiki_mdbnqw">    concat(&#39;user_&#39;, cast(rand()*1000000 as INT)),</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rand() * 1000,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    from_unixtime(unix_timestamp() - floor(rand()*365*24*3600))</span></span>
<span class="line"><span class="__shiki_mdbnqw">  FROM (SELECT 1) t;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建不同格式的测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> format </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> parquet</span><span class="__shiki_mdbnqw"> orc</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">  hive</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    CREATE TABLE test_\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    STORED AS \${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">^^}  -- PARQUET或ORC</span></span>
<span class="line"><span class="__shiki_mdbnqw">    TBLPROPERTIES (</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">}.compress&#39; = &#39;SNAPPY&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">}.stripe.size&#39; = &#39;268435456&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    AS SELECT * FROM test_source;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    -- 收集统计信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ANALYZE TABLE test_\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">} COMPUTE STATISTICS;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 运行性能测试查询</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> 1</span><span class="__shiki_mdbnqw"> 2</span><span class="__shiki_mdbnqw"> 3</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;=== 测试查询\${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">} ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> format </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> parquet</span><span class="__shiki_mdbnqw"> orc</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">^^}: &quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    time</span><span class="__shiki_140thh"> hive -e </span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SET hive.execution.engine=tez;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SET hive.vectorized.execution.enabled=true;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      -- 查询1: 简单聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">      IF \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}=1 THEN</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT name, COUNT(*), AVG(value)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM test_\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE ts &gt; &#39;2023-01-01&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY name</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT 100;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      -- 查询2: 过滤扫描</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ELSEIF \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}=2 THEN</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT *</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM test_\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE value &gt; 500</span></span>
<span class="line"><span class="__shiki_mdbnqw">          AND ts BETWEEN &#39;2023-01-01&#39; AND &#39;2023-12-31&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT 1000;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      -- 查询3: 复杂聚合</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ELSE</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">          DATE(ts) as day,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          COUNT(DISTINCT name) as unique_users,</span></span>
<span class="line"><span class="__shiki_mdbnqw">          PERCENTILE(value, 0.5) as median_value</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM test_\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE ts &gt; &#39;2022-01-01&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY DATE(ts)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY day</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT 100;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      END IF;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A2</span><span class="__shiki_mdbnqw"> &quot;Time taken&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">  done</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 比较文件大小</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 文件大小比较 ===&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> format </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> parquet</span><span class="__shiki_mdbnqw"> orc</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">  size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">hadoop</span><span class="__shiki_mdbnqw"> fs</span><span class="__shiki_dzsirb"> -du</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> /user/hive/warehouse/test_</span><span class="__shiki_140thh">\${format} </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{sum+=$1} END {print sum}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">format</span><span class="__shiki_mdbnqw">^^}: \${</span><span class="__shiki_140thh">size</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h3 id="六、总结与未来趋势" tabindex="-1">六、总结与未来趋势 <a class="header-anchor" href="#六、总结与未来趋势" aria-label="Permalink to &quot;六、总结与未来趋势&quot;">​</a></h3><h4 id="_6-1-技术总结" tabindex="-1">6.1 技术总结 <a class="header-anchor" href="#_6-1-技术总结" aria-label="Permalink to &quot;6.1 技术总结&quot;">​</a></h4><p><strong>Parquet核心优势总结：</strong></p><ol><li><strong>嵌套数据专家</strong>：对复杂嵌套结构支持最为完善</li><li><strong>生态系统广泛</strong>：跨平台、跨语言支持最好</li><li><strong>云原生友好</strong>：与Arrow等内存格式集成度高</li><li><strong>社区活跃</strong>：持续创新，新功能引入快</li></ol><p><strong>ORC核心优势总结：</strong></p><ol><li><strong>Hive生态深度集成</strong>：与Hive/Tez优化最佳</li><li><strong>查询性能卓越</strong>：索引和向量化执行优化好</li><li><strong>企业级特性</strong>：ACID、加密、细粒度访问控制</li><li><strong>稳定成熟</strong>：生产环境验证广泛</li></ol><h4 id="_6-2-选型建议" tabindex="-1">6.2 选型建议 <a class="header-anchor" href="#_6-2-选型建议" aria-label="Permalink to &quot;6.2 选型建议&quot;">​</a></h4><p><strong>选择Parquet当：</strong></p><ul><li>数据有复杂嵌套结构（JSON、Protocol Buffers等）</li><li>需要在多种计算框架间共享数据</li><li>使用Spark作为主要计算引擎</li><li>需要与Apache Arrow生态系统集成</li><li>作为数据湖的底层存储格式</li></ul><p><strong>选择ORC当：</strong></p><ul><li>Hive是主要查询引擎</li><li>需要ACID事务支持</li><li>查询性能是首要考虑</li><li>已经深度投资于Hadoop生态系统</li><li>需要列级加密等高级安全特性</li></ul><h4 id="_6-3-未来发展趋势" tabindex="-1">6.3 未来发展趋势 <a class="header-anchor" href="#_6-3-未来发展趋势" aria-label="Permalink to &quot;6.3 未来发展趋势&quot;">​</a></h4><p><strong>技术演进方向：</strong></p><ol><li><strong>智能格式</strong>：自适应压缩、自动索引、查询感知存储</li><li><strong>统一标准</strong>：可能出现的跨格式标准或转换层</li><li><strong>云原生优化</strong>：与对象存储深度集成，缓存优化</li><li><strong>计算下推</strong>：更多计算逻辑下推到存储层</li></ol><p><strong>行业应用趋势：</strong></p><ul><li><strong>数据湖仓一体化</strong>：存储格式需要同时支持事务和分析</li><li><strong>实时分析</strong>：列式存储向实时化、流式化演进</li><li><strong>AI/ML集成</strong>：直接支持机器学习数据格式和特征存储</li></ul><p>列式存储格式的选择并非一成不变，最佳实践是根据具体的数据特征、查询模式和生态系统，通过实际测试确定最适合的方案。随着技术发展，Parquet和ORC都在不断演进，未来可能会出现更统一的解决方案。目前，两者都是大数据生态系统中成熟可靠的列式存储选择。</p>`,113)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
