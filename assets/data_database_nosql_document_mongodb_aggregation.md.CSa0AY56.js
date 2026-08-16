import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"MongoDB聚合框架与MapReduce全面解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/document/mongodb/aggregation.md","filePath":"data/database/nosql/document/mongodb/aggregation.md"}'),_={name:"data/database/nosql/document/mongodb/aggregation.md"};function h(l,s,c,t,e,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="mongodb聚合框架与mapreduce全面解析" tabindex="-1">MongoDB聚合框架与MapReduce全面解析 <a class="header-anchor" href="#mongodb聚合框架与mapreduce全面解析" aria-label="Permalink to &quot;MongoDB聚合框架与MapReduce全面解析&quot;">​</a></h1><h2 id="_1-概览-两种数据处理方式的对比" tabindex="-1">1. 概览：两种数据处理方式的对比 <a class="header-anchor" href="#_1-概览-两种数据处理方式的对比" aria-label="Permalink to &quot;1. 概览：两种数据处理方式的对比&quot;">​</a></h2><p>MongoDB提供了两种核心的数据处理与分析方法：<strong>聚合框架</strong>和<strong>MapReduce</strong>。两者各有特点，适用于不同的场景。</p><h3 id="_1-1-技术对比概览" tabindex="-1">1.1 技术对比概览 <a class="header-anchor" href="#_1-1-技术对比概览" aria-label="Permalink to &quot;1.1 技术对比概览&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性维度</th><th>聚合框架 (Aggregation Pipeline)</th><th>MapReduce</th></tr></thead><tbody><tr><td><strong>学习曲线</strong></td><td>较平缓，类似流水线操作</td><td>较陡峭，需要理解函数式编程</td></tr><tr><td><strong>执行性能</strong></td><td>通常更快，多数操作在C++层优化</td><td>较慢，JavaScript解释执行</td></tr><tr><td><strong>灵活性</strong></td><td>高，丰富的操作符组合</td><td>极高，可编写任意复杂逻辑</td></tr><tr><td><strong>实时性</strong></td><td>适合实时分析</td><td>适合批处理任务</td></tr><tr><td><strong>资源消耗</strong></td><td>相对较低</td><td>内存和CPU消耗较高</td></tr><tr><td><strong>使用场景</strong></td><td>大多数数据聚合需求</td><td>复杂自定义算法、机器学习预处理</td></tr></tbody></table><h3 id="_1-2-选择建议" tabindex="-1">1.2 选择建议 <a class="header-anchor" href="#_1-2-选择建议" aria-label="Permalink to &quot;1.2 选择建议&quot;">​</a></h3><ul><li><strong>90%场景</strong>：优先使用聚合框架</li><li><strong>特定场景</strong>：当需要复杂自定义逻辑或现有操作符无法满足需求时使用MapReduce</li></ul><h2 id="_2-聚合框架详解" tabindex="-1">2. 聚合框架详解 <a class="header-anchor" href="#_2-聚合框架详解" aria-label="Permalink to &quot;2. 聚合框架详解&quot;">​</a></h2><h3 id="_2-1-聚合管道基础" tabindex="-1">2.1 聚合管道基础 <a class="header-anchor" href="#_2-1-聚合管道基础" aria-label="Permalink to &quot;2.1 聚合管道基础&quot;">​</a></h3><p>聚合管道是一个由<strong>阶段（Stages）</strong> 构成的数据处理流水线，每个阶段对输入的文档流进行特定转换。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基本聚合管道语法</span></span>
<span class="line"><span class="__shiki_140thh">db.collection.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $stage1: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $stage2: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $stage3: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">], {</span></span>
<span class="line"><span class="__shiki_140thh">  options: value  </span><span class="__shiki_21nrsd">// 可选参数</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h3 id="_2-2-核心管道操作符分类" tabindex="-1">2.2 核心管道操作符分类 <a class="header-anchor" href="#_2-2-核心管道操作符分类" aria-label="Permalink to &quot;2.2 核心管道操作符分类&quot;">​</a></h3><h4 id="_2-2-1-数据筛选阶段" tabindex="-1">2.2.1 数据筛选阶段 <a class="header-anchor" href="#_2-2-1-数据筛选阶段" aria-label="Permalink to &quot;2.2.1 数据筛选阶段&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// $match: 文档筛选，类似find()</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$match</span><span class="__shiki_140thh">: { </span></span>
<span class="line"><span class="__shiki_1t8gfj">  status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;A&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1t8gfj">  quantity</span><span class="__shiki_140thh">: { </span><span class="__shiki_1t8gfj">$gt</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> } </span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $sample: 随机抽样</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$sample</span><span class="__shiki_140thh">: { </span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $limit 和 $skip: 分页控制</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$skip</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh"> },    </span><span class="__shiki_21nrsd">// 跳过前50个文档</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh"> }    </span><span class="__shiki_21nrsd">// 限制返回20个文档</span></span></code></pre></div><h4 id="_2-2-2-文档转换阶段" tabindex="-1">2.2.2 文档转换阶段 <a class="header-anchor" href="#_2-2-2-文档转换阶段" aria-label="Permalink to &quot;2.2.2 文档转换阶段&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// $project: 字段投影与重塑</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$project</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,                     </span><span class="__shiki_21nrsd">// 排除_id字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  item</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,                    </span><span class="__shiki_21nrsd">// 包含item字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  total</span><span class="__shiki_140thh">: {                    </span><span class="__shiki_21nrsd">// 计算字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $multiply</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;$price&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$quantity&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  category</span><span class="__shiki_140thh">: {                 </span><span class="__shiki_21nrsd">// 条件逻辑</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $cond</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh">: { $gte: [</span><span class="__shiki_mdbnqw">&quot;$quantity&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_1t8gfj">      then</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Bulk&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      else</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Retail&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $addFields: 添加新字段（不删除现有字段）</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$addFields</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  totalPrice</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $add</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;$price&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$fee&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$tax&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $set / $unset: 字段管理（MongoDB 4.2+）</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$set</span><span class="__shiki_140thh">: { </span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;processed&quot;</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$unset</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;tempField&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;debugInfo&quot;</span><span class="__shiki_140thh">] }</span></span></code></pre></div><h4 id="_2-2-3-分组与汇总阶段" tabindex="-1">2.2.3 分组与汇总阶段 <a class="header-anchor" href="#_2-2-3-分组与汇总阶段" aria-label="Permalink to &quot;2.2.3 分组与汇总阶段&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// $group: 数据分组聚合</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$group</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  _id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$category&quot;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 按category分组</span></span>
<span class="line"><span class="__shiki_1t8gfj">  totalQuantity</span><span class="__shiki_140thh">: {            </span><span class="__shiki_21nrsd">// 汇总数量</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $sum</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$quantity&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  averagePrice</span><span class="__shiki_140thh">: {             </span><span class="__shiki_21nrsd">// 计算均价</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $avg</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  maxPrice</span><span class="__shiki_140thh">: {                 </span><span class="__shiki_21nrsd">// 最高价</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $max</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  minPrice</span><span class="__shiki_140thh">: {                 </span><span class="__shiki_21nrsd">// 最低价</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $min</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  items</span><span class="__shiki_140thh">: {                    </span><span class="__shiki_21nrsd">// 添加到数组</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $push</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$item&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      price</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  firstOrder</span><span class="__shiki_140thh">: {               </span><span class="__shiki_21nrsd">// 第一个订单</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $first</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$orderDate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span></code></pre></div><h4 id="_2-2-4-数组处理阶段" tabindex="-1">2.2.4 数组处理阶段 <a class="header-anchor" href="#_2-2-4-数组处理阶段" aria-label="Permalink to &quot;2.2.4 数组处理阶段&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// $unwind: 展开数组字段</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$unwind</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$tags&quot;</span><span class="__shiki_140thh">,              </span><span class="__shiki_21nrsd">// 要展开的数组字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  includeArrayIndex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;idx&quot;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">// 可选的索引字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  preserveNullAndEmptyArrays</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  // 处理空数组</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $lookup: 关联查询（类似SQL JOIN）</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$lookup</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 关联集合</span></span>
<span class="line"><span class="__shiki_1t8gfj">  localField</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;item&quot;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">// 本地字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  foreignField</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sku&quot;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 外部字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  as</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;inventory_docs&quot;</span><span class="__shiki_21nrsd">        // 输出字段名</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MongoDB 3.6+ 支持更复杂的$lookup</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$lookup</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;warehouses&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh">: { </span><span class="__shiki_1jdh33">order_item</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$item&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">order_qty</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$ordered&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  pipeline</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    { </span><span class="__shiki_1jdh33">$match</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">      { </span><span class="__shiki_1jdh33">$expr</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        { </span><span class="__shiki_1jdh33">$and</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">          { </span><span class="__shiki_1jdh33">$eq</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;$stock_item&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$$order_item&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_140thh">          { </span><span class="__shiki_1jdh33">$gte</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;$instock&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$$order_qty&quot;</span><span class="__shiki_140thh">] }</span></span>
<span class="line"><span class="__shiki_140thh">        ]}</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    { </span><span class="__shiki_1jdh33">$project</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> { </span><span class="__shiki_1jdh33">stock_data</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  as</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;stockinfo&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span></code></pre></div><h4 id="_2-2-5-结果处理阶段" tabindex="-1">2.2.5 结果处理阶段 <a class="header-anchor" href="#_2-2-5-结果处理阶段" aria-label="Permalink to &quot;2.2.5 结果处理阶段&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// $sort: 结果排序</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$sort</span><span class="__shiki_140thh">: { </span></span>
<span class="line"><span class="__shiki_1t8gfj">  totalQuantity</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 降序</span></span>
<span class="line"><span class="__shiki_1t8gfj">  category</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">                 // 升序</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $bucket: 数据分桶</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$bucket</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  groupBy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 分组字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  boundaries</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh">],  </span><span class="__shiki_21nrsd">// 边界值</span></span>
<span class="line"><span class="__shiki_1itgoe">  default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Other&quot;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 默认桶</span></span>
<span class="line"><span class="__shiki_1t8gfj">  output</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    count</span><span class="__shiki_140thh">: { </span><span class="__shiki_1t8gfj">$sum</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_1t8gfj">    items</span><span class="__shiki_140thh">: { </span><span class="__shiki_1t8gfj">$push</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$item&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// $facet: 多维度分析（并行执行多个子管道）</span></span>
<span class="line"><span class="__shiki_140thh">{ </span><span class="__shiki_1t8gfj">$facet</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;priceAnalysis&quot;</span><span class="__shiki_140thh">: [          </span><span class="__shiki_21nrsd">// 价格分析维度</span></span>
<span class="line"><span class="__shiki_140thh">    { $bucket: {</span></span>
<span class="line"><span class="__shiki_140thh">        groupBy: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        boundaries: [</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">150</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        default: </span><span class="__shiki_mdbnqw">&quot;Above200&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }}</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;categoryStats&quot;</span><span class="__shiki_140thh">: [          </span><span class="__shiki_21nrsd">// 类别统计维度</span></span>
<span class="line"><span class="__shiki_140thh">    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">        _id: </span><span class="__shiki_mdbnqw">&quot;$category&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        avgPrice: { $avg: </span><span class="__shiki_mdbnqw">&quot;$price&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    }}</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;topItems&quot;</span><span class="__shiki_140thh">: [               </span><span class="__shiki_21nrsd">// 热门商品维度</span></span>
<span class="line"><span class="__shiki_140thh">    { $sortByCount: </span><span class="__shiki_mdbnqw">&quot;$item&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { $limit: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}}</span></span></code></pre></div><h3 id="_2-3-聚合表达式与操作符" tabindex="-1">2.3 聚合表达式与操作符 <a class="header-anchor" href="#_2-3-聚合表达式与操作符" aria-label="Permalink to &quot;2.3 聚合表达式与操作符&quot;">​</a></h3><h4 id="_2-3-1-算术表达式操作符" tabindex="-1">2.3.1 算术表达式操作符 <a class="header-anchor" href="#_2-3-1-算术表达式操作符" aria-label="Permalink to &quot;2.3.1 算术表达式操作符&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基本算术运算</span></span>
<span class="line"><span class="__shiki_1t8gfj">total</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  $add</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;$price&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$tax&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$shipping&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">discounted</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  $multiply</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;$price&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    { $subtract: [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$discountRate&quot;</span><span class="__shiki_140thh">] }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 更多算术操作符</span></span>
<span class="line"><span class="__shiki_140thh">$abs, $ceil, $floor, $round, $sqrt,</span></span>
<span class="line"><span class="__shiki_140thh">$ln, $log10, $exp, $pow, $trunc</span></span></code></pre></div><h4 id="_2-3-2-字符串表达式操作符" tabindex="-1">2.3.2 字符串表达式操作符 <a class="header-anchor" href="#_2-3-2-字符串表达式操作符" aria-label="Permalink to &quot;2.3.2 字符串表达式操作符&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 字符串处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">fullName</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  $concat</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;$firstName&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot; &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$lastName&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">initials</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  $concat</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    { $substrCP: [</span><span class="__shiki_mdbnqw">&quot;$firstName&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_140thh">    { $substrCP: [</span><span class="__shiki_mdbnqw">&quot;$lastName&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">] }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 更多字符串操作符</span></span>
<span class="line"><span class="__shiki_140thh">$toLower, $toUpper, $trim, $ltrim, $rtrim,</span></span>
<span class="line"><span class="__shiki_140thh">$strLenCP, $substrCP, $split, $indexOfBytes</span></span></code></pre></div><h4 id="_2-3-3-日期表达式操作符" tabindex="-1">2.3.3 日期表达式操作符 <a class="header-anchor" href="#_2-3-3-日期表达式操作符" aria-label="Permalink to &quot;2.3.3 日期表达式操作符&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 日期提取与运算</span></span>
<span class="line"><span class="__shiki_1t8gfj">yearMonth</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  $dateToString</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    format</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;%Y-%m&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    date</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$orderDate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">ageInDays</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  $divide</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    { $subtract: [</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&quot;$birthDate&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_dzsirb">    1000</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_21nrsd">  // 毫秒转天数</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 更多日期操作符</span></span>
<span class="line"><span class="__shiki_140thh">$year, $month, $dayOfMonth, $dayOfWeek,</span></span>
<span class="line"><span class="__shiki_140thh">$hour, $minute, $second, $millisecond,</span></span>
<span class="line"><span class="__shiki_140thh">$dateAdd, $dateSubtract, $dateDiff</span></span></code></pre></div><h3 id="_2-4-聚合管道优化策略" tabindex="-1">2.4 聚合管道优化策略 <a class="header-anchor" href="#_2-4-聚合管道优化策略" aria-label="Permalink to &quot;2.4 聚合管道优化策略&quot;">​</a></h3><h4 id="_2-4-1-管道顺序优化" tabindex="-1">2.4.1 管道顺序优化 <a class="header-anchor" href="#_2-4-1-管道顺序优化" aria-label="Permalink to &quot;2.4.1 管道顺序优化&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 优化前（低效）</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $project: { item: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $match: { price: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } } },  </span><span class="__shiki_21nrsd">// 应该在project前</span></span>
<span class="line"><span class="__shiki_140thh">  { $sort: { price: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化后（高效）</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $match: { price: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } } },  </span><span class="__shiki_21nrsd">// 先筛选减少数据量</span></span>
<span class="line"><span class="__shiki_140thh">  { $project: { item: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },  </span><span class="__shiki_21nrsd">// 减少字段</span></span>
<span class="line"><span class="__shiki_140thh">  { $sort: { price: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }              </span><span class="__shiki_21nrsd">// 最后排序</span></span>
<span class="line"><span class="__shiki_140thh">])</span></span></code></pre></div><h4 id="_2-4-2-索引利用策略" tabindex="-1">2.4.2 索引利用策略 <a class="header-anchor" href="#_2-4-2-索引利用策略" aria-label="Permalink to &quot;2.4.2 索引利用策略&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 索引设计建议</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">  category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">  price: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  orderDate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 管道阶段索引使用情况</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">    category: </span><span class="__shiki_mdbnqw">&quot;Electronics&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 可以使用索引</span></span>
<span class="line"><span class="__shiki_140thh">    orderDate: { </span></span>
<span class="line"><span class="__shiki_140thh">      $gte: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }},</span></span>
<span class="line"><span class="__shiki_140thh">  { $sort: { price: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },   </span><span class="__shiki_21nrsd">// 如果数据已筛选，可能内存排序</span></span>
<span class="line"><span class="__shiki_140thh">  { $group: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } }         </span><span class="__shiki_21nrsd">// 分组操作通常无法使用索引</span></span>
<span class="line"><span class="__shiki_140thh">], { explain: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })         </span><span class="__shiki_21nrsd">// 查看执行计划</span></span></code></pre></div><h4 id="_2-4-3-内存管理" tabindex="-1">2.4.3 内存管理 <a class="header-anchor" href="#_2-4-3-内存管理" aria-label="Permalink to &quot;2.4.3 内存管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 允许使用磁盘临时文件</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $group: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $sort: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">], {</span></span>
<span class="line"><span class="__shiki_140thh">  allowDiskUse: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">// 允许磁盘使用</span></span>
<span class="line"><span class="__shiki_140thh">  maxTimeMS: </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">// 5分钟超时</span></span>
<span class="line"><span class="__shiki_140thh">  hint: { category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }       </span><span class="__shiki_21nrsd">// 强制使用索引</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控聚合内存使用</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">currentOp</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;command.aggregate&quot;</span><span class="__shiki_140thh">: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h2 id="_3-mapreduce详解" tabindex="-1">3. MapReduce详解 <a class="header-anchor" href="#_3-mapreduce详解" aria-label="Permalink to &quot;3. MapReduce详解&quot;">​</a></h2><h3 id="_3-1-mapreduce基础模型" tabindex="-1">3.1 MapReduce基础模型 <a class="header-anchor" href="#_3-1-mapreduce基础模型" aria-label="Permalink to &quot;3.1 MapReduce基础模型&quot;">​</a></h3><p>MapReduce是一种<strong>分布式计算模型</strong>，将大数据集的处理分解为两个主要阶段：</p><ol><li><strong>Map阶段</strong>：处理输入文档，发射键值对</li><li><strong>Reduce阶段</strong>：处理相同键的值，生成汇总结果</li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MapReduce基本语法</span></span>
<span class="line"><span class="__shiki_140thh">db.collection.</span><span class="__shiki_1t8gfj">mapReduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">  function</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/* map函数 */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_1itgoe">  function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">/* reduce函数 */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    out: </span><span class="__shiki_mdbnqw">&quot;output_collection&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query: { </span><span class="__shiki_21nrsd">/* 筛选条件 */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    sort: { </span><span class="__shiki_21nrsd">/* 排序条件 */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    limit: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    finalize</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reducedValue</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">/* 后处理 */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    scope: { </span><span class="__shiki_21nrsd">/* 全局变量 */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    verbose: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    jsMode: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  // 是否在JS引擎中执行</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-2-map函数设计" tabindex="-1">3.2 Map函数设计 <a class="header-anchor" href="#_3-2-map函数设计" aria-label="Permalink to &quot;3.2 Map函数设计&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例：按分类统计销售</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_1t8gfj"> mapFunction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // this指向当前文档</span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.category;</span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    count: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    total: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">    items: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.item]</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 发射键值对</span></span>
<span class="line"><span class="__shiki_1t8gfj">  emit</span><span class="__shiki_140thh">(key, value);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 可以多次emit（一对多映射）</span></span>
<span class="line"><span class="__shiki_dzsirb">  this</span><span class="__shiki_140thh">.tags.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tag</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    emit</span><span class="__shiki_140thh">(tag, { count: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, tag: tag });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-3-reduce函数设计" tabindex="-1">3.3 Reduce函数设计 <a class="header-anchor" href="#_3-3-reduce函数设计" aria-label="Permalink to &quot;3.3 Reduce函数设计&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 对应的reduce函数</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_1t8gfj"> reduceFunction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">    count: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    total: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    items: [] </span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 聚合所有值</span></span>
<span class="line"><span class="__shiki_140thh">  values.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    result.count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> value.count;</span></span>
<span class="line"><span class="__shiki_140thh">    result.total </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> value.total;</span></span>
<span class="line"><span class="__shiki_140thh">    result.items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.items.</span><span class="__shiki_1t8gfj">concat</span><span class="__shiki_140thh">(value.items);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 返回与map输出结构一致的对象</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 注意：reduce函数必须满足幂等性</span></span>
<span class="line"><span class="__shiki_21nrsd">// reduce函数的输出应该与输入结构相同</span></span></code></pre></div><h3 id="_3-4-finalize函数与高级特性" tabindex="-1">3.4 Finalize函数与高级特性 <a class="header-anchor" href="#_3-4-finalize函数与高级特性" aria-label="Permalink to &quot;3.4 Finalize函数与高级特性&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// finalize函数：后处理</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_1t8gfj"> finalizeFunction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reducedValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 计算平均值</span></span>
<span class="line"><span class="__shiki_140thh">  reducedValue.average </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    reducedValue.total </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> reducedValue.count;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 去重</span></span>
<span class="line"><span class="__shiki_140thh">  reducedValue.uniqueItems </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    Array.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">(reducedValue.items));</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 移除不需要的字段</span></span>
<span class="line"><span class="__shiki_1itgoe">  delete</span><span class="__shiki_140thh"> reducedValue.items;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> reducedValue;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 执行MapReduce</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">mapReduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  mapFunction,</span></span>
<span class="line"><span class="__shiki_140thh">  reduceFunction,</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    out: { </span></span>
<span class="line"><span class="__shiki_140thh">      replace: </span><span class="__shiki_mdbnqw">&quot;sales_summary&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 输出方式</span></span>
<span class="line"><span class="__shiki_140thh">      db: </span><span class="__shiki_mdbnqw">&quot;analytics_db&quot;</span><span class="__shiki_21nrsd">         // 输出到其他数据库</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    query: { status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    sort: { category: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    finalize: finalizeFunction,</span></span>
<span class="line"><span class="__shiki_140thh">    scope: { </span></span>
<span class="line"><span class="__shiki_140thh">      discountRate: </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 全局变量</span></span>
<span class="line"><span class="__shiki_140thh">      currency: </span><span class="__shiki_mdbnqw">&quot;USD&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    jsMode: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">// 使用JS引擎</span></span>
<span class="line"><span class="__shiki_140thh">    verbose: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">               // 显示详细统计</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_3-5-mapreduce执行流程" tabindex="-1">3.5 MapReduce执行流程 <a class="header-anchor" href="#_3-5-mapreduce执行流程" aria-label="Permalink to &quot;3.5 MapReduce执行流程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[输入集合] --&gt; B[查询筛选]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[排序排序]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[Map阶段&lt;br/&gt;每个文档执行map函数]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[分组相同键]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[Reduce阶段&lt;br/&gt;聚合每组值]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[Finalize阶段&lt;br/&gt;后处理]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H{输出选项}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[内联输出&lt;br/&gt;直接返回结果]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; J[集合输出&lt;br/&gt;保存到新集合]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; K[合并输出&lt;br/&gt;merge/ reduce]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; L[结果集合]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; M[内存结果]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; N[更新现有集合]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; O[后续查询]</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt; P[应用程序]</span></span>
<span class="line"><span class="__shiki_140thh">    N --&gt; Q[增量聚合]</span></span></code></pre></div><h3 id="_3-6-mapreduce优化技巧" tabindex="-1">3.6 MapReduce优化技巧 <a class="header-anchor" href="#_3-6-mapreduce优化技巧" aria-label="Permalink to &quot;3.6 MapReduce优化技巧&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用查询筛选减少数据量</span></span>
<span class="line"><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">: { </span></span>
<span class="line"><span class="__shiki_1t8gfj">  timestamp</span><span class="__shiki_140thh">: { </span></span>
<span class="line"><span class="__shiki_1t8gfj">    $gte</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    $lt</span><span class="__shiki_140thh">: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-02-01&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 利用排序优化分组</span></span>
<span class="line"><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">: { </span><span class="__shiki_1t8gfj">category</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 适当使用limit</span></span>
<span class="line"><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">  // 仅处理前10000条</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 启用jsMode（小数据集）</span></span>
<span class="line"><span class="__shiki_1t8gfj">jsMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  // 减少BSON与JS的转换</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 5. 增量MapReduce策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">out</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  reduce</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;monthly_summary&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 增量聚合</span></span>
<span class="line"><span class="__shiki_1t8gfj">  nonAtomic</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">            // 原子性保证</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 6. 并行执行多个MapReduce</span></span>
<span class="line"><span class="__shiki_21nrsd">// 使用分片键分割数据集</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> shardKeys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;shard1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;shard2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;shard3&quot;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">shardKeys.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">shard</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">  db.collection.</span><span class="__shiki_1t8gfj">mapReduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    mapFunction,</span></span>
<span class="line"><span class="__shiki_140thh">    reduceFunction,</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      query: { shardKey: shard },</span></span>
<span class="line"><span class="__shiki_140thh">      out: { merge: </span><span class="__shiki_mdbnqw">&quot;combined_results&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="_4-实战案例对比" tabindex="-1">4. 实战案例对比 <a class="header-anchor" href="#_4-实战案例对比" aria-label="Permalink to &quot;4. 实战案例对比&quot;">​</a></h2><h3 id="_4-1-案例-电商销售分析" tabindex="-1">4.1 案例：电商销售分析 <a class="header-anchor" href="#_4-1-案例-电商销售分析" aria-label="Permalink to &quot;4.1 案例：电商销售分析&quot;">​</a></h3><h4 id="_4-1-1-使用聚合框架" tabindex="-1">4.1.1 使用聚合框架 <a class="header-anchor" href="#_4-1-1-使用聚合框架" aria-label="Permalink to &quot;4.1.1 使用聚合框架&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 目标：按类别统计月销售额，找出Top 10商品</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阶段1：筛选已完成订单</span></span>
<span class="line"><span class="__shiki_140thh">  { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    orderDate: { </span></span>
<span class="line"><span class="__shiki_140thh">      $gte: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      $lt: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2024-01-01&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }},</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阶段2：展开订单项</span></span>
<span class="line"><span class="__shiki_140thh">  { $unwind: </span><span class="__shiki_mdbnqw">&quot;$items&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阶段3：计算每项总价</span></span>
<span class="line"><span class="__shiki_140thh">  { $project: {</span></span>
<span class="line"><span class="__shiki_140thh">    category: </span><span class="__shiki_mdbnqw">&quot;$items.category&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    productId: </span><span class="__shiki_mdbnqw">&quot;$items.productId&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    productName: </span><span class="__shiki_mdbnqw">&quot;$items.name&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    month: { $month: </span><span class="__shiki_mdbnqw">&quot;$orderDate&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    total: { </span></span>
<span class="line"><span class="__shiki_140thh">      $multiply: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;$items.price&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;$items.quantity&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }},</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阶段4：按类别和月份分组</span></span>
<span class="line"><span class="__shiki_140thh">  { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">    _id: {</span></span>
<span class="line"><span class="__shiki_140thh">      category: </span><span class="__shiki_mdbnqw">&quot;$category&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      month: </span><span class="__shiki_mdbnqw">&quot;$month&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    monthlyRevenue: { $sum: </span><span class="__shiki_mdbnqw">&quot;$total&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    topProducts: {</span></span>
<span class="line"><span class="__shiki_140thh">      $push: {</span></span>
<span class="line"><span class="__shiki_140thh">        productId: </span><span class="__shiki_mdbnqw">&quot;$productId&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&quot;$productName&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        revenue: </span><span class="__shiki_mdbnqw">&quot;$total&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }},</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阶段5：按收入排序</span></span>
<span class="line"><span class="__shiki_140thh">  { $sort: { monthlyRevenue: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阶段6：限制输出</span></span>
<span class="line"><span class="__shiki_140thh">  { $limit: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">]);</span></span></code></pre></div><h4 id="_4-1-2-使用mapreduce" tabindex="-1">4.1.2 使用MapReduce <a class="header-anchor" href="#_4-1-2-使用mapreduce" aria-label="Permalink to &quot;4.1.2 使用MapReduce&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 同样的需求使用MapReduce实现</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_1t8gfj"> mapFunction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &quot;completed&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> year </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderDate.</span><span class="__shiki_1t8gfj">getFullYear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (year </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> 2023</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> month </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderDate.</span><span class="__shiki_1t8gfj">getMonth</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  this</span><span class="__shiki_140thh">.items.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      category: item.category,</span></span>
<span class="line"><span class="__shiki_140thh">      month: month</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      revenue: item.price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">      productCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      productInfo: [{</span></span>
<span class="line"><span class="__shiki_140thh">        id: item.productId,</span></span>
<span class="line"><span class="__shiki_140thh">        name: item.name,</span></span>
<span class="line"><span class="__shiki_140thh">        revenue: item.price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> item.quantity</span></span>
<span class="line"><span class="__shiki_140thh">      }]</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    emit</span><span class="__shiki_140thh">(key, value);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_1t8gfj"> reduceFunction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    revenue: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    productCount: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    productInfo: []</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  values.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    result.revenue </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> value.revenue;</span></span>
<span class="line"><span class="__shiki_140thh">    result.productCount </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> value.productCount;</span></span>
<span class="line"><span class="__shiki_140thh">    result.productInfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.productInfo.</span><span class="__shiki_1t8gfj">concat</span><span class="__shiki_140thh">(value.productInfo);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_1t8gfj"> finalizeFunction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reducedValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 找出Top 10商品</span></span>
<span class="line"><span class="__shiki_140thh">  reducedValue.productInfo.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> b.revenue </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.revenue;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  reducedValue.topProducts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    reducedValue.productInfo.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  delete</span><span class="__shiki_140thh"> reducedValue.productInfo;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> reducedValue;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">mapReduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  mapFunction,</span></span>
<span class="line"><span class="__shiki_140thh">  reduceFunction,</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    out: </span><span class="__shiki_mdbnqw">&quot;sales_analysis_2023&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    finalize: finalizeFunction,</span></span>
<span class="line"><span class="__shiki_140thh">    query: { </span></span>
<span class="line"><span class="__shiki_140thh">      status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      orderDate: {</span></span>
<span class="line"><span class="__shiki_140thh">        $gte: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2023-01-01&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        $lt: </span><span class="__shiki_1t8gfj">ISODate</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;2024-01-01&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_4-2-性能对比分析" tabindex="-1">4.2 性能对比分析 <a class="header-anchor" href="#_4-2-性能对比分析" aria-label="Permalink to &quot;4.2 性能对比分析&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 性能测试代码示例</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> testPerformance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> start, end;</span></span>
<span class="line"><span class="__shiki_1itgoe">  var</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试聚合框架</span></span>
<span class="line"><span class="__shiki_140thh">  start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  db.orders.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">    { $match: { status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">        _id: </span><span class="__shiki_mdbnqw">&quot;$category&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        total: { $sum: </span><span class="__shiki_mdbnqw">&quot;$amount&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    }}</span></span>
<span class="line"><span class="__shiki_140thh">  ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  results.aggregation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> end </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试MapReduce</span></span>
<span class="line"><span class="__shiki_140thh">  start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  db.orders.</span><span class="__shiki_1t8gfj">mapReduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    function</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      emit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.category, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.amount);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> Array.</span><span class="__shiki_1t8gfj">sum</span><span class="__shiki_140thh">(values);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      out: { inline: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      query: { status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  results.mapReduce </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> end </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 典型结果：聚合框架比MapReduce快5-10倍</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-选择指南与最佳实践" tabindex="-1">5. 选择指南与最佳实践 <a class="header-anchor" href="#_5-选择指南与最佳实践" aria-label="Permalink to &quot;5. 选择指南与最佳实践&quot;">​</a></h2><h3 id="_5-1-何时选择聚合框架" tabindex="-1">5.1 何时选择聚合框架 <a class="header-anchor" href="#_5-1-何时选择聚合框架" aria-label="Permalink to &quot;5.1 何时选择聚合框架&quot;">​</a></h3><ol><li><strong>实时数据分析</strong>：需要快速响应的业务查询</li><li><strong>数据转换任务</strong>：ETL管道中的数据处理</li><li><strong>常规报表生成</strong>：每日/每周统计报表</li><li><strong>简单到中等复杂度</strong>：大多数业务分析需求</li><li><strong>性能敏感场景</strong>：需要最佳执行效率</li></ol><h3 id="_5-2-何时选择mapreduce" tabindex="-1">5.2 何时选择MapReduce <a class="header-anchor" href="#_5-2-何时选择mapreduce" aria-label="Permalink to &quot;5.2 何时选择MapReduce&quot;">​</a></h3><ol><li><strong>复杂自定义逻辑</strong>：现有聚合操作符无法实现</li><li><strong>机器学习预处理</strong>：特征工程、数据清洗</li><li><strong>文本分析</strong>：词频统计、情感分析</li><li><strong>图算法</strong>：社交网络分析、推荐系统</li><li><strong>遗留系统迁移</strong>：从Hadoop MapReduce迁移</li></ol><h3 id="_5-3-混合使用策略" tabindex="-1">5.3 混合使用策略 <a class="header-anchor" href="#_5-3-混合使用策略" aria-label="Permalink to &quot;5.3 混合使用策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例：聚合框架预处理 + MapReduce复杂计算</span></span>
<span class="line"><span class="__shiki_140thh">db.collection.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $match: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $project: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $group: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $out: </span><span class="__shiki_mdbnqw">&quot;preprocessed_data&quot;</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 输出到临时集合</span></span>
<span class="line"><span class="__shiki_140thh">]);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 对预处理后的数据使用MapReduce</span></span>
<span class="line"><span class="__shiki_140thh">db.preprocessed_data.</span><span class="__shiki_1t8gfj">mapReduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  complexMapFunction,</span></span>
<span class="line"><span class="__shiki_140thh">  complexReduceFunction,</span></span>
<span class="line"><span class="__shiki_140thh">  { out: </span><span class="__shiki_mdbnqw">&quot;final_results&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 清理临时数据</span></span>
<span class="line"><span class="__shiki_140thh">db.preprocessed_data.</span><span class="__shiki_1t8gfj">drop</span><span class="__shiki_140thh">();</span></span></code></pre></div><h3 id="_5-4-监控与调优" tabindex="-1">5.4 监控与调优 <a class="header-anchor" href="#_5-4-监控与调优" aria-label="Permalink to &quot;5.4 监控与调优&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 监控聚合操作</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">currentOp</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;active&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;command.aggregate&quot;</span><span class="__shiki_140thh">: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查看慢查询日志</span></span>
<span class="line"><span class="__shiki_140thh">db.system.profile.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  op: </span><span class="__shiki_mdbnqw">&quot;command&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;command.aggregate&quot;</span><span class="__shiki_140thh">: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  millis: { $gt: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 超过1秒的操作</span></span>
<span class="line"><span class="__shiki_140thh">}).</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ ts: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }).</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用explain分析执行计划</span></span>
<span class="line"><span class="__shiki_140thh">db.orders.</span><span class="__shiki_1t8gfj">explain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;executionStats&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">  { $match: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">  { $group: { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">]);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 关键监控指标：</span></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 执行时间</span></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 内存使用情况</span></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 文档处理数量</span></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 是否使用索引</span></span>
<span class="line"><span class="__shiki_21nrsd">// 5. 是否触发磁盘使用</span></span></code></pre></div><h2 id="_6-总结" tabindex="-1">6. 总结 <a class="header-anchor" href="#_6-总结" aria-label="Permalink to &quot;6. 总结&quot;">​</a></h2><h3 id="_6-1-核心要点回顾" tabindex="-1">6.1 核心要点回顾 <a class="header-anchor" href="#_6-1-核心要点回顾" aria-label="Permalink to &quot;6.1 核心要点回顾&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方面</th><th>聚合框架</th><th>MapReduce</th></tr></thead><tbody><tr><td><strong>学习成本</strong></td><td>低，声明式语法</td><td>高，需要编程思维</td></tr><tr><td><strong>性能</strong></td><td>通常更优，C++优化</td><td>较慢，JS解释执行</td></tr><tr><td><strong>灵活性</strong></td><td>中等，受限于操作符</td><td>极高，可编写任意逻辑</td></tr><tr><td><strong>适用场景</strong></td><td>实时分析、报表、ETL</td><td>复杂算法、批处理</td></tr><tr><td><strong>维护性</strong></td><td>容易，管道可视化</td><td>较难，代码逻辑复杂</td></tr></tbody></table><h3 id="_6-2-演进趋势" tabindex="-1">6.2 演进趋势 <a class="header-anchor" href="#_6-2-演进趋势" aria-label="Permalink to &quot;6.2 演进趋势&quot;">​</a></h3><ol><li><strong>聚合框架不断增强</strong>：MongoDB每个版本都添加新的聚合操作符</li><li><strong>MapReduce逐渐边缘化</strong>：但仍然在特定场景有价值</li><li><strong>混合架构兴起</strong>：使用聚合框架预处理，复杂逻辑用其他系统处理</li></ol><h3 id="_6-3-实践建议" tabindex="-1">6.3 实践建议 <a class="header-anchor" href="#_6-3-实践建议" aria-label="Permalink to &quot;6.3 实践建议&quot;">​</a></h3><ol><li><strong>默认选择聚合框架</strong>，满足80%以上需求</li><li><strong>合理设计管道顺序</strong>，尽早筛选和减少数据量</li><li><strong>为聚合操作创建合适索引</strong></li><li><strong>监控资源使用</strong>，避免内存溢出</li><li><strong>定期优化复杂查询</strong>，使用explain分析执行计划</li><li><strong>考虑数据规模增长</strong>，设计可扩展的分析流程</li></ol><p>通过深入理解聚合框架和MapReduce的机制与特点，您可以根据具体业务需求选择最合适的工具，构建高效、可靠的数据处理流程。</p>`,76)])])}const r=a(_,[["render",h]]);export{d as __pageData,r as default};
