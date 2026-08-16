import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"MongoDB事务与ACID支持详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/document/mongodb/transactions.md","filePath":"data/database/nosql/document/mongodb/transactions.md"}'),p={name:"data/database/nosql/document/mongodb/transactions.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="mongodb事务与acid支持详解" tabindex="-1">MongoDB事务与ACID支持详解 <a class="header-anchor" href="#mongodb事务与acid支持详解" aria-label="Permalink to &quot;MongoDB事务与ACID支持详解&quot;">​</a></h1><h2 id="_1-mongodb事务演进历史" tabindex="-1">1. MongoDB事务演进历史 <a class="header-anchor" href="#_1-mongodb事务演进历史" aria-label="Permalink to &quot;1. MongoDB事务演进历史&quot;">​</a></h2><h3 id="_1-1-发展历程" tabindex="-1">1.1 发展历程 <a class="header-anchor" href="#_1-1-发展历程" aria-label="Permalink to &quot;1.1 发展历程&quot;">​</a></h3><p>MongoDB的事务支持经历了一个渐进式的发展过程，反映了其从简单的文档数据库到功能完备的分布式数据库的演变：</p><table tabindex="0"><thead><tr><th>版本</th><th>年份</th><th>事务支持能力</th><th>重要特性</th></tr></thead><tbody><tr><td><strong>4.0</strong></td><td>2018</td><td>副本集多文档事务</td><td>首次支持多文档ACID事务，仅限于副本集部署</td></tr><tr><td><strong>4.2</strong></td><td>2019</td><td>分片集群事务</td><td>扩展事务支持到分片集群（分布式事务）</td></tr><tr><td><strong>4.4</strong></td><td>2020</td><td>事务性能优化</td><td>优化锁管理，减少对oplog的依赖</td></tr><tr><td><strong>5.0</strong></td><td>2021</td><td>默认写多数提交</td><td>提高数据持久性，增强一致性保证</td></tr><tr><td><strong>6.0</strong></td><td>2022</td><td>读写关注增强</td><td>时间点读取，更灵活的隔离级别控制</td></tr></tbody></table><h3 id="_1-2-设计哲学转变" tabindex="-1">1.2 设计哲学转变 <a class="header-anchor" href="#_1-2-设计哲学转变" aria-label="Permalink to &quot;1.2 设计哲学转变&quot;">​</a></h3><p>MongoDB早期设计遵循&quot;文档即事务&quot;的理念，将相关数据嵌入同一文档来避免跨文档事务需求。随着应用复杂度增加，官方逐步引入完整的事务支持，同时保持高性能和水平扩展能力。</p><h2 id="_2-acid特性深度解析" tabindex="-1">2. ACID特性深度解析 <a class="header-anchor" href="#_2-acid特性深度解析" aria-label="Permalink to &quot;2. ACID特性深度解析&quot;">​</a></h2><h3 id="_2-1-原子性-atomicity" tabindex="-1">2.1 原子性（Atomicity） <a class="header-anchor" href="#_2-1-原子性-atomicity" aria-label="Permalink to &quot;2.1 原子性（Atomicity）&quot;">​</a></h3><h4 id="_2-1-1-实现机制" tabindex="-1">2.1.1 实现机制 <a class="header-anchor" href="#_2-1-1-实现机制" aria-label="Permalink to &quot;2.1.1 实现机制&quot;">​</a></h4><p>MongoDB通过以下机制保证操作的原子性：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MongoDB事务中的原子性示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">getMongo</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> orders</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">getDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;shop&quot;</span><span class="__shiki_140thh">).orders;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> inventory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">getDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;shop&quot;</span><span class="__shiki_140thh">).inventory;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 这些操作要么全部成功，要么全部失败</span></span>
<span class="line"><span class="__shiki_140thh">    orders.</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        orderId: </span><span class="__shiki_mdbnqw">&quot;ORD123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        items: [</span><span class="__shiki_mdbnqw">&quot;item1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;item2&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        total: </span><span class="__shiki_dzsirb">150.00</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    inventory.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { sku: </span><span class="__shiki_mdbnqw">&quot;item1&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { $inc: { quantity: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    inventory.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { sku: </span><span class="__shiki_mdbnqw">&quot;item2&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { $inc: { quantity: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提交事务 - 所有更改原子性生效</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 任何错误都会导致事务中止，所有更改回滚</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction failed:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-1-2-原子性保证范围" tabindex="-1">2.1.2 原子性保证范围 <a class="header-anchor" href="#_2-1-2-原子性保证范围" aria-label="Permalink to &quot;2.1.2 原子性保证范围&quot;">​</a></h4><ul><li><strong>单文档操作</strong>：天然原子（自MongoDB诞生起）</li><li><strong>多文档事务</strong>：事务内所有操作作为原子单元（4.0+）</li><li><strong>跨分片事务</strong>：跨多个分片的操作保持原子性（4.2+）</li></ul><h4 id="_2-1-3-底层实现" tabindex="-1">2.1.3 底层实现 <a class="header-anchor" href="#_2-1-3-底层实现" aria-label="Permalink to &quot;2.1.3 底层实现&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">事务原子性实现要点：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 事务ID分配：每个事务获得唯一标识符</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 快照隔离：事务看到一致的数据库快照</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 写操作缓冲：事务中的写操作在提交前不持久化</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 两阶段提交协议：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">准备阶段：所有参与节点预提交</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">提交阶段：所有节点确认提交</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 回滚机制：基于oplog的反向操作</span></span></code></pre></div><h3 id="_2-2-一致性-consistency" tabindex="-1">2.2 一致性（Consistency） <a class="header-anchor" href="#_2-2-一致性-consistency" aria-label="Permalink to &quot;2.2 一致性（Consistency）&quot;">​</a></h3><h4 id="_2-2-1-一致性级别" tabindex="-1">2.2.1 一致性级别 <a class="header-anchor" href="#_2-2-1-一致性级别" aria-label="Permalink to &quot;2.2.1 一致性级别&quot;">​</a></h4><p>MongoDB提供多种一致性保证级别：</p><table tabindex="0"><thead><tr><th>一致性级别</th><th>描述</th><th>适用场景</th></tr></thead><tbody><tr><td><strong>强一致性</strong></td><td>写操作完成后，后续读取都能看到最新数据</td><td>金融交易、库存管理</td></tr><tr><td><strong>最终一致性</strong></td><td>数据最终会一致，但可能存在延迟</td><td>社交网络、内容缓存</td></tr><tr><td><strong>会话一致性</strong></td><td>同一会话内保证读取自己写入的数据</td><td>用户会话管理</td></tr></tbody></table><h4 id="_2-2-2-约束与验证" tabindex="-1">2.2.2 约束与验证 <a class="header-anchor" href="#_2-2-2-约束与验证" aria-label="Permalink to &quot;2.2.2 约束与验证&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用模式验证维护数据一致性</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">createCollection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;products&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">   validator: {</span></span>
<span class="line"><span class="__shiki_140thh">      $jsonSchema: {</span></span>
<span class="line"><span class="__shiki_140thh">         bsonType: </span><span class="__shiki_mdbnqw">&quot;object&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">         required: [</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;category&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">         properties: {</span></span>
<span class="line"><span class="__shiki_140thh">            name: { bsonType: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            price: { </span></span>
<span class="line"><span class="__shiki_140thh">               bsonType: </span><span class="__shiki_mdbnqw">&quot;decimal&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               minimum: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               maximum: </span><span class="__shiki_dzsirb">1000000</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            category: { </span></span>
<span class="line"><span class="__shiki_140thh">               bsonType: </span><span class="__shiki_mdbnqw">&quot;string&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               enum: [</span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;clothing&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;books&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            stock: { </span></span>
<span class="line"><span class="__shiki_140thh">               bsonType: </span><span class="__shiki_mdbnqw">&quot;int&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">               minimum: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">         }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">   },</span></span>
<span class="line"><span class="__shiki_140thh">   validationLevel: </span><span class="__shiki_mdbnqw">&quot;strict&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">   validationAction: </span><span class="__shiki_mdbnqw">&quot;error&quot;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 唯一索引保证数据唯一性</span></span>
<span class="line"><span class="__shiki_140thh">db.products.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span><span class="__shiki_mdbnqw">&quot;sku&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">db.users.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { </span></span>
<span class="line"><span class="__shiki_140thh">   unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">   partialFilterExpression: { email: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_2-3-隔离性-isolation" tabindex="-1">2.3 隔离性（Isolation） <a class="header-anchor" href="#_2-3-隔离性-isolation" aria-label="Permalink to &quot;2.3 隔离性（Isolation）&quot;">​</a></h3><h4 id="_2-3-1-隔离级别实现" tabindex="-1">2.3.1 隔离级别实现 <a class="header-anchor" href="#_2-3-1-隔离级别实现" aria-label="Permalink to &quot;2.3.1 隔离级别实现&quot;">​</a></h4><p>MongoDB主要实现<strong>快照隔离</strong>级别，同时通过读关注(readConcern)和写关注(writeConcern)提供更细粒度的控制：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 不同隔离级别的配置示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">MongoClient</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;mongodb&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> demoIsolationLevels</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> client</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> MongoClient</span><span class="__shiki_140thh">(uri);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 快照隔离 - 默认级别</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        snapshot: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  // 启用快照隔离</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 读未提交（实际上MongoDB不支持真正的读未提交）</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 但可以通过读取主节点获得最新数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> collection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({}).</span><span class="__shiki_1t8gfj">readConcern</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;local&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 读已提交（通过读关注&quot;majority&quot;实现）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 可重复读（通过快照隔离实现）</span></span>
<span class="line"><span class="__shiki_140thh">    session2.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-3-2-并发控制机制" tabindex="-1">2.3.2 并发控制机制 <a class="header-anchor" href="#_2-3-2-并发控制机制" aria-label="Permalink to &quot;2.3.2 并发控制机制&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">并发控制实现：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 乐观并发控制：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">默认机制，依赖版本戳(version stamp)</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">减少锁竞争，提高吞吐量</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">2. 多粒度锁机制：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">全局锁（实例级别）- 已废弃</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">数据库级锁 - 3.0之前</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">集合级锁 - 3.0-3.2</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">文档级锁 - WiredTiger引擎默认（3.2+）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">3. 事务锁管理：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">读锁（共享锁）：事务读取时获取</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">写锁（排他锁）：事务写入时获取</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">锁升级检测：防止死锁</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">4. 死锁处理：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">锁超时机制（默认50ms等待后失败）</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">事务超时（默认60秒）</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">死锁检测与回滚</span></span></code></pre></div><h4 id="_2-3-3-隔离异常与预防" tabindex="-1">2.3.3 隔离异常与预防 <a class="header-anchor" href="#_2-3-3-隔离异常与预防" aria-label="Permalink to &quot;2.3.3 隔离异常与预防&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 防止脏读</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> preventDirtyRead</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 避免脏读</span></span>
<span class="line"><span class="__shiki_140thh">        writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> }       </span><span class="__shiki_21nrsd">// 确保持久化</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在这个事务中，读取的数据来自一致快照</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({}).</span><span class="__shiki_1t8gfj">session</span><span class="__shiki_140thh">(session).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 修改数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { $set: { value: </span><span class="__shiki_mdbnqw">&quot;updated&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        { session }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 其他会话看不到未提交的修改</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 防止不可重复读</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> preventNonRepeatableRead</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 第一次读取</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> firstRead</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;First read:&quot;</span><span class="__shiki_140thh">, firstRead);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟其他事务修改数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> otherTransactionModifiesData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 第二次读取 - 由于快照隔离，结果与第一次相同</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> secondRead</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Second read:&quot;</span><span class="__shiki_140thh">, secondRead); </span><span class="__shiki_21nrsd">// 与firstRead相同</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 防止幻读</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> preventPhantomRead</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 范围查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> initialCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">countDocuments</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { price: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        { session }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Initial count:&quot;</span><span class="__shiki_140thh">, initialCount);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 其他事务插入新文档（price &gt; 100）</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> otherTransactionInsertsNewDocument</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 再次查询 - 由于快照隔离，计数不变</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> finalCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">countDocuments</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { price: { $gt: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">        { session }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Final count:&quot;</span><span class="__shiki_140thh">, finalCount); </span><span class="__shiki_21nrsd">// 与initialCount相同</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-持久性-durability" tabindex="-1">2.4 持久性（Durability） <a class="header-anchor" href="#_2-4-持久性-durability" aria-label="Permalink to &quot;2.4 持久性（Durability）&quot;">​</a></h3><h4 id="_2-4-1-持久性保证机制" tabindex="-1">2.4.1 持久性保证机制 <a class="header-anchor" href="#_2-4-1-持久性保证机制" aria-label="Permalink to &quot;2.4.1 持久性保证机制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 写关注级别决定持久性保证</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> writeConcernOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 弱持久性（性能优先）</span></span>
<span class="line"><span class="__shiki_140thh">    weak: { w: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 只需一个节点确认</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 中等持久性（平衡）</span></span>
<span class="line"><span class="__shiki_140thh">    medium: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh">, j: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 多数节点确认，不等待日志刷新</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 强持久性（数据安全优先）</span></span>
<span class="line"><span class="__shiki_140thh">    strong: { </span></span>
<span class="line"><span class="__shiki_140thh">        w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 多数节点确认</span></span>
<span class="line"><span class="__shiki_140thh">        j: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 等待日志刷新到磁盘</span></span>
<span class="line"><span class="__shiki_140thh">        wtimeout: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_21nrsd">      // 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 自定义持久性</span></span>
<span class="line"><span class="__shiki_140thh">    custom: {</span></span>
<span class="line"><span class="__shiki_140thh">        w: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">// 指定3个节点确认</span></span>
<span class="line"><span class="__shiki_140thh">        j: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        wtimeout: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用强持久性的示例</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> durableWrite</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            writeConcern: writeConcernOptions.strong</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            criticalData: </span><span class="__shiki_mdbnqw">&quot;非常重要，不能丢失&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;数据已安全持久化&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-4-2-日志机制-journaling" tabindex="-1">2.4.2 日志机制（Journaling） <a class="header-anchor" href="#_2-4-2-日志机制-journaling" aria-label="Permalink to &quot;2.4.2 日志机制（Journaling）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">WiredTiger存储引擎日志机制：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 预写日志（Write-Ahead Logging）：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">所有修改先写入日志，再写入数据文件</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">确保崩溃后可以恢复</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">2. 检查点（Checkpointing）：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">定期将内存数据刷新到磁盘</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">默认60秒或2GB日志数据</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">减少恢复时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">3. 日志文件管理：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">日志文件大小：100MB（默认）</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">日志压缩：启用以减少空间占用</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">日志保留：可配置保留策略</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">4. 恢复过程：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">识别最后一个有效检查点</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">重放检查点后的日志记录</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">验证数据一致性</span></span></code></pre></div><h2 id="_3-事务使用指南" tabindex="-1">3. 事务使用指南 <a class="header-anchor" href="#_3-事务使用指南" aria-label="Permalink to &quot;3. 事务使用指南&quot;">​</a></h2><h3 id="_3-1-基础事务api" tabindex="-1">3.1 基础事务API <a class="header-anchor" href="#_3-1-基础事务api" aria-label="Permalink to &quot;3.1 基础事务API&quot;">​</a></h3><h4 id="_3-1-1-会话管理" tabindex="-1">3.1.1 会话管理 <a class="header-anchor" href="#_3-1-1-会话管理" aria-label="Permalink to &quot;3.1.1 会话管理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 创建会话</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    causalConsistency: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 因果一致性</span></span>
<span class="line"><span class="__shiki_140thh">    defaultTransactionOptions: {   </span><span class="__shiki_21nrsd">// 默认事务选项</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxCommitTimeMS: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">    // 提交超时</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 会话生命周期管理</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.sessions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建新事务会话</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> createTransactionSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            causalConsistency: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            ...</span><span class="__shiki_140thh">options</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> sessionId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(sessionId, {</span></span>
<span class="line"><span class="__shiki_140thh">            session,</span></span>
<span class="line"><span class="__shiki_140thh">            startTime: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            status: </span><span class="__shiki_mdbnqw">&#39;active&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { sessionId, session };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> executeTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sessionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transactionFn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> sessionData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(sessionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">sessionData) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Session not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">session</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sessionData;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> transactionFn</span><span class="__shiki_140thh">(session);</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            sessionData.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;committed&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            sessionData.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;aborted&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            sessionData.error </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            sessionData.endTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 可选：清理旧会话</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cleanupOldSessions</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理超过1小时的会话</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cleanupOldSessions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> oneHourAgo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 3600000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">sessionId</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (data.endTime </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> data.endTime.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> oneHourAgo) {</span></span>
<span class="line"><span class="__shiki_140thh">                data.session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.sessions.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(sessionId);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-事务执行模式" tabindex="-1">3.1.2 事务执行模式 <a class="header-anchor" href="#_3-1-2-事务执行模式" aria-label="Permalink to &quot;3.1.2 事务执行模式&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 模式1：回调式事务（推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> callbackStyleTransaction</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> orders</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;shop&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> inventory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;shop&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 插入订单</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> orderResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> orders.</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                orderId: </span><span class="__shiki_mdbnqw">\`ORD-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                items: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { sku: </span><span class="__shiki_mdbnqw">&quot;ITEM001&quot;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                    { sku: </span><span class="__shiki_mdbnqw">&quot;ITEM002&quot;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                total: </span><span class="__shiki_dzsirb">299.98</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                status: </span><span class="__shiki_mdbnqw">&quot;pending&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新库存</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> orderResult.ops[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].items) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> inventory.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    { sku: item.sku },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $inc: { quantity: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { session }</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新订单状态</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> orders.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { _id: orderResult.insertedId },</span></span>
<span class="line"><span class="__shiki_140thh">                { $set: { status: </span><span class="__shiki_mdbnqw">&quot;confirmed&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> orderResult.insertedId;</span></span>
<span class="line"><span class="__shiki_140thh">        }, {</span></span>
<span class="line"><span class="__shiki_140thh">            readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 模式2：手动控制事务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> manualControlTransaction</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;local&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1t8gfj"> operation1</span><span class="__shiki_140thh">(session);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1t8gfj"> operation2</span><span class="__shiki_140thh">(session);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 提交前验证</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_1t8gfj"> validateTransaction</span><span class="__shiki_140thh">(session)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction committed successfully&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Validation failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction failed:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试中止事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (session.</span><span class="__shiki_1t8gfj">inTransaction</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 模式3：重试逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RetryableTransaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">backoffMs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.maxRetries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxRetries;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.backoffMs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> backoffMs;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionFn</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> lastError;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">(options);</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> transactionFn</span><span class="__shiki_140thh">(session);</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction succeeded on attempt \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                lastError </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 如果是可重试错误</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isRetryableError</span><span class="__shiki_140thh">(error)) {</span></span>
<span class="line"><span class="__shiki_140thh">                    console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction attempt \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_mdbnqw">} failed, retrying...\`</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (session.</span><span class="__shiki_1t8gfj">inTransaction</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (abortError) {</span></span>
<span class="line"><span class="__shiki_140thh">                            console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Abort failed:&quot;</span><span class="__shiki_140thh">, abortError.message);</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.backoffMs </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, attempt </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 不可重试错误</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (session.</span><span class="__shiki_1t8gfj">inTransaction</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction failed after \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">} attempts: \${</span><span class="__shiki_140thh">lastError</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    isRetryableError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> retryableCodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            6</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// HostUnreachable</span></span>
<span class="line"><span class="__shiki_dzsirb">            7</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// HostNotFound</span></span>
<span class="line"><span class="__shiki_dzsirb">            89</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">// NetworkTimeout</span></span>
<span class="line"><span class="__shiki_dzsirb">            91</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">// ShutdownInProgress</span></span>
<span class="line"><span class="__shiki_dzsirb">            11600</span><span class="__shiki_21nrsd"> // InterruptedAtShutdown</span></span>
<span class="line"><span class="__shiki_140thh">        ];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> retryableCodes.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(error.code) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">               error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;WriteConflict&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">               error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;LockTimeout&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ms</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, ms));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-高级事务特性" tabindex="-1">3.2 高级事务特性 <a class="header-anchor" href="#_3-2-高级事务特性" aria-label="Permalink to &quot;3.2 高级事务特性&quot;">​</a></h3><h4 id="_3-2-1-多文档事务与跨集合事务" tabindex="-1">3.2.1 多文档事务与跨集合事务 <a class="header-anchor" href="#_3-2-1-多文档事务与跨集合事务" aria-label="Permalink to &quot;3.2.1 多文档事务与跨集合事务&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 跨多个集合的事务示例</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> multiCollectionTransaction</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bank&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 1. 从账户A扣款</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> accounts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> transferResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> accounts.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { accountId: </span><span class="__shiki_mdbnqw">&quot;ACC001&quot;</span><span class="__shiki_140thh">, balance: { $gte: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                { $inc: { balance: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (transferResult.modifiedCount </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Insufficient funds or account not found&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 2. 向账户B存款</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> accounts.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { accountId: </span><span class="__shiki_mdbnqw">&quot;ACC002&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                { $inc: { balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 3. 记录交易历史</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> transactions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> transactions.</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                transactionId: </span><span class="__shiki_mdbnqw">\`TX-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                fromAccount: </span><span class="__shiki_mdbnqw">&quot;ACC001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                toAccount: </span><span class="__shiki_mdbnqw">&quot;ACC002&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                amount: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                currency: </span><span class="__shiki_mdbnqw">&quot;USD&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 4. 更新账户统计</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;account_stats&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> stats.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { accountId: </span><span class="__shiki_mdbnqw">&quot;ACC001&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                { </span></span>
<span class="line"><span class="__shiki_140thh">                    $inc: { </span></span>
<span class="line"><span class="__shiki_140thh">                        transactionCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        totalOutgoing: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    $set: { lastTransaction: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() }</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                { session, upsert: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> stats.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { accountId: </span><span class="__shiki_mdbnqw">&quot;ACC002&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                { </span></span>
<span class="line"><span class="__shiki_140thh">                    $inc: { </span></span>
<span class="line"><span class="__shiki_140thh">                        transactionCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        totalIncoming: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    $set: { lastTransaction: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() }</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                { session, upsert: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Fund transfer completed successfully&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-分片集群事务" tabindex="-1">3.2.2 分片集群事务 <a class="header-anchor" href="#_3-2-2-分片集群事务" aria-label="Permalink to &quot;3.2.2 分片集群事务&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分片集群事务配置与执行</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> shardedClusterTransaction</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置分片集群事务选项</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxCommitTimeMS: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 分片事务可能需要更长时间</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分片事务特定选项</span></span>
<span class="line"><span class="__shiki_140thh">        shardKey: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 如果可能，指定分片键</span></span>
<span class="line"><span class="__shiki_140thh">        enableShardKeyRetries: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  // 允许分片键重试</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 跨分片操作</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> userDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> orderDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> inventoryDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 用户数据可能在一个分片</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;profiles&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ userId: </span><span class="__shiki_mdbnqw">&quot;U12345&quot;</span><span class="__shiki_140thh"> }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User not found&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 订单数据可能在另一个分片</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                orderId: </span><span class="__shiki_mdbnqw">\`ORDER-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                userId: user.userId,</span></span>
<span class="line"><span class="__shiki_140thh">                items: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { productId: </span><span class="__shiki_mdbnqw">&quot;P001&quot;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                    { productId: </span><span class="__shiki_mdbnqw">&quot;P002&quot;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                shippingAddress: user.address,</span></span>
<span class="line"><span class="__shiki_140thh">                totalAmount: </span><span class="__shiki_dzsirb">450.00</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> orderResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> orderDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">(order, { session });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 库存数据可能在第三个分片</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> order.items) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> updateResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> inventoryDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;stock&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        { productId: item.productId, quantity: { $gte: item.quantity } },</span></span>
<span class="line"><span class="__shiki_140thh">                        { $inc: { quantity: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity } },</span></span>
<span class="line"><span class="__shiki_140thh">                        { session }</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (updateResult.modifiedCount </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Insufficient stock for product \${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">productId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新用户订单历史</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> userDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;profiles&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    { userId: user.userId },</span></span>
<span class="line"><span class="__shiki_140thh">                    { </span></span>
<span class="line"><span class="__shiki_140thh">                        $push: { </span></span>
<span class="line"><span class="__shiki_140thh">                            orderHistory: {</span></span>
<span class="line"><span class="__shiki_140thh">                                orderId: orderResult.insertedId,</span></span>
<span class="line"><span class="__shiki_140thh">                                date: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                                amount: order.totalAmount</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        },</span></span>
<span class="line"><span class="__shiki_140thh">                        $inc: { totalOrders: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, totalSpent: order.totalAmount }</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    { session }</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Order \${</span><span class="__shiki_140thh">order</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">} created across sharded cluster\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> orderResult.insertedId;</span></span>
<span class="line"><span class="__shiki_140thh">        }, transactionOptions);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分片事务监控</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> monitorShardedTransactions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查看当前活动事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentOps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">        { $currentOp: {} },</span></span>
<span class="line"><span class="__shiki_140thh">        { $match: { </span><span class="__shiki_mdbnqw">&quot;transaction.parameters.txnNumber&quot;</span><span class="__shiki_140thh">: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } } },</span></span>
<span class="line"><span class="__shiki_140thh">        { $project: {</span></span>
<span class="line"><span class="__shiki_140thh">            sessionId: </span><span class="__shiki_mdbnqw">&quot;$lsid.id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            transactionNumber: </span><span class="__shiki_mdbnqw">&quot;$transaction.parameters.txnNumber&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            shard: </span><span class="__shiki_mdbnqw">&quot;$shard&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            active: </span><span class="__shiki_mdbnqw">&quot;$active&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            secs_running: { $subtract: [</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&quot;$currentOpTime&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_140thh">            op: </span><span class="__shiki_mdbnqw">&quot;$op&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ns: </span><span class="__shiki_mdbnqw">&quot;$ns&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }}</span></span>
<span class="line"><span class="__shiki_140thh">    ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Active transactions in sharded cluster:&quot;</span><span class="__shiki_140thh">, currentOps);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> serverStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ serverStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction statistics:&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        totalTransactions: serverStatus.transactions?.totalStarted </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        currentActive: serverStatus.transactions?.currentActive </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        totalAborted: serverStatus.transactions?.totalAborted </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        totalCommitted: serverStatus.transactions?.totalCommitted </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-3-事务与变更流-change-streams" tabindex="-1">3.2.3 事务与变更流（Change Streams） <a class="header-anchor" href="#_3-2-3-事务与变更流-change-streams" aria-label="Permalink to &quot;3.2.3 事务与变更流（Change Streams）&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务与变更流的集成</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> transactionsWithChangeStreams</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> ordersCollection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开启变更流（监听所有变化）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changeStream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ordersCollection.</span><span class="__shiki_1t8gfj">watch</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">        { $match: { </span><span class="__shiki_mdbnqw">&quot;operationType&quot;</span><span class="__shiki_140thh">: { $in: [</span><span class="__shiki_mdbnqw">&quot;insert&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;update&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;delete&quot;</span><span class="__shiki_140thh">] } } }</span></span>
<span class="line"><span class="__shiki_140thh">    ]);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听变更</span></span>
<span class="line"><span class="__shiki_140thh">    changeStream.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;change&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">change</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Change detected:&quot;</span><span class="__shiki_140thh">, change);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 在事务中处理变更</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> auditLog</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;audit_log&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 记录审计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> auditLog.</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    changeId: change._id,</span></span>
<span class="line"><span class="__shiki_140thh">                    operationType: change.operationType,</span></span>
<span class="line"><span class="__shiki_140thh">                    documentKey: change.documentKey,</span></span>
<span class="line"><span class="__shiki_140thh">                    fullDocument: change.fullDocument,</span></span>
<span class="line"><span class="__shiki_140thh">                    updateDescription: change.updateDescription,</span></span>
<span class="line"><span class="__shiki_140thh">                    timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                    source: </span><span class="__shiki_mdbnqw">&quot;change_stream&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 如果是库存相关变更，更新库存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (change.ns.coll </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;orders&quot;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> change.operationType </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;insert&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    const</span><span class="__shiki_dzsirb"> inventoryStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory_stats&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> change.fullDocument.items) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        await</span><span class="__shiki_140thh"> inventoryStats.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                            { productId: item.productId },</span></span>
<span class="line"><span class="__shiki_140thh">                            {</span></span>
<span class="line"><span class="__shiki_140thh">                                $inc: {</span></span>
<span class="line"><span class="__shiki_140thh">                                    totalSold: item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">                                    totalRevenue: item.price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> item.quantity</span></span>
<span class="line"><span class="__shiki_140thh">                                },</span></span>
<span class="line"><span class="__shiki_140thh">                                $set: { lastSold: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() }</span></span>
<span class="line"><span class="__shiki_140thh">                            },</span></span>
<span class="line"><span class="__shiki_140thh">                            { session, upsert: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                        );</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">    changeStream.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Change stream error:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行一些会触发变更的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> ordersCollection.</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        orderId: </span><span class="__shiki_mdbnqw">&quot;TEST-ORDER&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        items: [</span></span>
<span class="line"><span class="__shiki_140thh">            { productId: </span><span class="__shiki_mdbnqw">&quot;P001&quot;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            { productId: </span><span class="__shiki_mdbnqw">&quot;P002&quot;</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, price: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_140thh">        total: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 等待变更被处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 关闭变更流</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> changeStream.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-事务限制与约束" tabindex="-1">3.3 事务限制与约束 <a class="header-anchor" href="#_3-3-事务限制与约束" aria-label="Permalink to &quot;3.3 事务限制与约束&quot;">​</a></h3><h4 id="_3-3-1-操作限制" tabindex="-1">3.3.1 操作限制 <a class="header-anchor" href="#_3-3-1-操作限制" aria-label="Permalink to &quot;3.3.1 操作限制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务中不允许的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> transactionLimitations</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 允许的操作：</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 1. CRUD操作（增删改查）</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({ value: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { session });</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">({}, { $set: { value: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> } }, { session });</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">deleteOne</span><span class="__shiki_140thh">({}, { session });</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({}, { session }).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 2. 聚合操作（某些阶段有限制）</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                { $match: { value: { $gt: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> } } },</span></span>
<span class="line"><span class="__shiki_140thh">                { $group: { _id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, total: { $sum: </span><span class="__shiki_mdbnqw">&quot;$value&quot;</span><span class="__shiki_140thh"> } } }</span></span>
<span class="line"><span class="__shiki_140thh">            ], { session }).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 不允许的操作：</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 1. 创建集合</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">createCollection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;new_collection&quot;</span><span class="__shiki_140thh">, { session });</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 错误：Cannot create namespace test.new_collection in multi-document transaction</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 2. 创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">({ field: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, { session });</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 错误：Cannot create index in multi-document transaction</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 3. 删除集合</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">drop</span><span class="__shiki_140thh">({ session });</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 错误：Cannot drop collection in multi-document transaction</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 4. 某些聚合阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;data&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                    { $out: </span><span class="__shiki_mdbnqw">&quot;output_collection&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                ], { session }).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 错误：$out stage is not allowed in a transaction</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 5. 分片操作</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">adminCommand</span><span class="__shiki_140thh">({ enableSharding: </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh"> }, { session });</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 错误：Cannot run enableSharding in a transaction</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Expected error for disallowed operation:&quot;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-性能限制" tabindex="-1">3.3.2 性能限制 <a class="header-anchor" href="#_3-3-2-性能限制" aria-label="Permalink to &quot;3.3.2 性能限制&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">事务性能限制：</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. 事务超时：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">默认60秒（可配置）</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">长时间事务会被自动中止</span></span>
<span class="line"><span class="__shiki_140thh">   </span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 内存限制：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">事务操作数限制：16MB写入数据</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">内存使用监控：oplog大小限制</span></span>
<span class="line"><span class="__shiki_140thh">   </span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 锁限制：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">最大锁等待时间：默认50ms</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">锁获取超时会导致事务失败</span></span>
<span class="line"><span class="__shiki_140thh">   </span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 分片事务限制：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">最多参与1000个分片</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">两阶段提交开销较大</span></span>
<span class="line"><span class="__shiki_140thh">   </span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 恢复限制：</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">事务日志保留时间有限</span></span>
<span class="line"><span class="__shiki_140thh">   - </span><span class="__shiki_mdbnqw">长时间宕机可能导致事务丢失</span></span></code></pre></div><h4 id="_3-3-3-配置限制" tabindex="-1">3.3.3 配置限制 <a class="header-anchor" href="#_3-3-3-配置限制" aria-label="Permalink to &quot;3.3.3 配置限制&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务相关配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> transactionConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 时间限制</span></span>
<span class="line"><span class="__shiki_140thh">    transactionLifetimeLimitSeconds: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 事务最大生命周期</span></span>
<span class="line"><span class="__shiki_140thh">    maxTransactionLockRequestTimeoutMillis: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 锁请求超时</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 操作限制</span></span>
<span class="line"><span class="__shiki_140thh">    maxWriteBatchSize: </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 批量写入最大文档数</span></span>
<span class="line"><span class="__shiki_140thh">    maxMessageSizeBytes: </span><span class="__shiki_dzsirb">48000000</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 最大消息大小</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 存储限制</span></span>
<span class="line"><span class="__shiki_140thh">    storageEngine: </span><span class="__shiki_mdbnqw">&quot;wiredTiger&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    wiredTiger: {</span></span>
<span class="line"><span class="__shiki_140thh">        engineConfig: {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 缓存大小（影响事务性能）</span></span>
<span class="line"><span class="__shiki_140thh">            cacheSizeGB: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 日志配置</span></span>
<span class="line"><span class="__shiki_140thh">            journalCompressor: </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查点间隔</span></span>
<span class="line"><span class="__shiki_140thh">            checkpoint: (sync_period</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">60s, log_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">2</span><span class="__shiki_dzsirb">GB</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        collectionConfig: {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 集合配置</span></span>
<span class="line"><span class="__shiki_140thh">            blockCompressor: </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 副本集事务配置</span></span>
<span class="line"><span class="__shiki_140thh">    replication: {</span></span>
<span class="line"><span class="__shiki_140thh">        oplogSizeMB: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// oplog大小（影响事务回滚能力）</span></span>
<span class="line"><span class="__shiki_140thh">        enableMajorityReadConcern: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 分片集群事务配置</span></span>
<span class="line"><span class="__shiki_140thh">    sharding: {</span></span>
<span class="line"><span class="__shiki_140thh">        transactionCommitTimeoutMS: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 提交超时</span></span>
<span class="line"><span class="__shiki_140thh">        enableShardKeyRetries: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  // 分片键重试</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检查事务限制</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> checkTransactionLimits</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取服务器状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ serverStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction limits and usage:&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 内存使用</span></span>
<span class="line"><span class="__shiki_140thh">        memory: {</span></span>
<span class="line"><span class="__shiki_140thh">            resident: status.mem.resident,</span></span>
<span class="line"><span class="__shiki_140thh">            virtual: status.mem.virtual,</span></span>
<span class="line"><span class="__shiki_140thh">            mapped: status.mem.mapped,</span></span>
<span class="line"><span class="__shiki_140thh">            mappedWithJournal: status.mem.mappedWithJournal</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接信息</span></span>
<span class="line"><span class="__shiki_140thh">        connections: {</span></span>
<span class="line"><span class="__shiki_140thh">            current: status.connections.current,</span></span>
<span class="line"><span class="__shiki_140thh">            available: status.connections.available,</span></span>
<span class="line"><span class="__shiki_140thh">            totalCreated: status.connections.totalCreated</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 锁信息</span></span>
<span class="line"><span class="__shiki_140thh">        locks: {</span></span>
<span class="line"><span class="__shiki_140thh">            global: status.locks.Global?.acquireCount,</span></span>
<span class="line"><span class="__shiki_140thh">            database: status.locks.Database?.acquireCount,</span></span>
<span class="line"><span class="__shiki_140thh">            collection: status.locks.Collection?.acquireCount</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 事务统计</span></span>
<span class="line"><span class="__shiki_140thh">        transactions: status.transactions </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {},</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // WiredTiger信息</span></span>
<span class="line"><span class="__shiki_140thh">        wiredTiger: {</span></span>
<span class="line"><span class="__shiki_140thh">            cache: status.wiredTiger.cache,</span></span>
<span class="line"><span class="__shiki_140thh">            transaction: status.wiredTiger.transaction</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否达到限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> warnings</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (status.connections.current </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> status.connections.available </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        warnings.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;High connection usage&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (status.wiredTiger?.cache?.pagesEvicted </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        warnings.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Cache pressure detected&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (status.transactions?.currentActive </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        warnings.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;High active transaction count&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (warnings.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction limit warnings:&quot;</span><span class="__shiki_140thh">, warnings);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-事务最佳实践" tabindex="-1">4. 事务最佳实践 <a class="header-anchor" href="#_4-事务最佳实践" aria-label="Permalink to &quot;4. 事务最佳实践&quot;">​</a></h2><h3 id="_4-1-性能优化策略" tabindex="-1">4.1 性能优化策略 <a class="header-anchor" href="#_4-1-性能优化策略" aria-label="Permalink to &quot;4.1 性能优化策略&quot;">​</a></h3><h4 id="_4-1-1-事务设计优化" tabindex="-1">4.1.1 事务设计优化 <a class="header-anchor" href="#_4-1-1-事务设计优化" aria-label="Permalink to &quot;4.1.1 事务设计优化&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 优化1：减少事务范围</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OptimizedTransaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> processOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 非事务性操作：验证和预处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> validatedData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">validateOrder</span><span class="__shiki_140thh">(orderData);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> calculatedTotals</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateTotals</span><span class="__shiki_140thh">(validatedData);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 仅核心操作在事务中执行</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 最小化事务内操作</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">executeCoreTransaction</span><span class="__shiki_140thh">(validatedData, calculatedTotals, session);</span></span>
<span class="line"><span class="__shiki_140thh">            }, {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 优化事务选项</span></span>
<span class="line"><span class="__shiki_140thh">                maxCommitTimeMS: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;local&quot;</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 使用较低的隔离级别</span></span>
<span class="line"><span class="__shiki_140thh">                writeConcern: { w: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 降低持久性要求以提高性能</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 非事务性后处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendNotifications</span><span class="__shiki_140thh">(orderData);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateCache</span><span class="__shiki_140thh">(orderData);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> executeCoreTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">totals</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;shop&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 批量操作减少网络往返</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> bulkOperations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                updateOne: {</span></span>
<span class="line"><span class="__shiki_140thh">                    filter: { _id: data.userId },</span></span>
<span class="line"><span class="__shiki_140thh">                    update: { $inc: { balance: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">totals.amount } }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                insertOne: {</span></span>
<span class="line"><span class="__shiki_140thh">                    document: {</span></span>
<span class="line"><span class="__shiki_140thh">                        orderId: data.orderId,</span></span>
<span class="line"><span class="__shiki_140thh">                        amount: totals.amount,</span></span>
<span class="line"><span class="__shiki_140thh">                        status: </span><span class="__shiki_mdbnqw">&quot;pending&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        ];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">bulkWrite</span><span class="__shiki_140thh">(bulkOperations, { session });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 并行操作（如果逻辑允许）</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateInventory</span><span class="__shiki_140thh">(data.items, session),</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordTransaction</span><span class="__shiki_140thh">(data, totals, session)</span></span>
<span class="line"><span class="__shiki_140thh">        ]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化2：使用适当的读写关注</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> optimizedTransactionOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读操作优化</span></span>
<span class="line"><span class="__shiki_140thh">    readOptions: {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 场景1：需要最新数据</span></span>
<span class="line"><span class="__shiki_140thh">        strongConsistency: {</span></span>
<span class="line"><span class="__shiki_140thh">            readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;linearizable&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 场景2：可以接受轻微延迟</span></span>
<span class="line"><span class="__shiki_140thh">        eventualConsistency: {</span></span>
<span class="line"><span class="__shiki_140thh">            readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;available&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            readPreference: </span><span class="__shiki_mdbnqw">&quot;nearest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 场景3：分析查询</span></span>
<span class="line"><span class="__shiki_140thh">        analytics: {</span></span>
<span class="line"><span class="__shiki_140thh">            readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            readPreference: </span><span class="__shiki_mdbnqw">&quot;secondary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写操作优化</span></span>
<span class="line"><span class="__shiki_140thh">    writeOptions: {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 场景1：关键数据</span></span>
<span class="line"><span class="__shiki_140thh">        critical: {</span></span>
<span class="line"><span class="__shiki_140thh">            writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh">, j: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, wtimeout: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 场景2：普通数据</span></span>
<span class="line"><span class="__shiki_140thh">        normal: {</span></span>
<span class="line"><span class="__shiki_140thh">            writeConcern: { w: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, j: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 场景3：高性能场景</span></span>
<span class="line"><span class="__shiki_140thh">        performance: {</span></span>
<span class="line"><span class="__shiki_140thh">            writeConcern: { w: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 不等待确认</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_4-1-2-索引优化" tabindex="-1">4.1.2 索引优化 <a class="header-anchor" href="#_4-1-2-索引优化" aria-label="Permalink to &quot;4.1.2 索引优化&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 为事务操作创建合适的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> optimizeIndexesForTransactions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ecommerce&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 分析典型事务查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionPatterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模式1：用户订单查询</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">            collection: </span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            queries: [</span></span>
<span class="line"><span class="__shiki_140thh">                { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 查找用户订单</span></span>
<span class="line"><span class="__shiki_140thh">                { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, createdAt: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 最新订单</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模式2：库存更新</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">            collection: </span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            queries: [</span></span>
<span class="line"><span class="__shiki_140thh">                { productId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, warehouseId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 特定仓库库存</span></span>
<span class="line"><span class="__shiki_140thh">                { productId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, quantity: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 库存检查</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模式3：支付处理</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">            collection: </span><span class="__shiki_mdbnqw">&quot;payments&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            queries: [</span></span>
<span class="line"><span class="__shiki_140thh">                { transactionId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 按事务ID查找</span></span>
<span class="line"><span class="__shiki_140thh">                { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, createdAt: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 用户支付历史</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    ];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 创建复合索引支持事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> pattern</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> transactionPatterns) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> collection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(pattern.collection);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> pattern.queries) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 创建覆盖索引</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> indexName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> collection.</span><span class="__shiki_1t8gfj">createIndex</span><span class="__shiki_140thh">(query, {</span></span>
<span class="line"><span class="__shiki_140thh">                background: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 后台创建</span></span>
<span class="line"><span class="__shiki_140thh">                partialFilterExpression: { status: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } },  </span><span class="__shiki_21nrsd">// 部分索引</span></span>
<span class="line"><span class="__shiki_140thh">                collation: { locale: </span><span class="__shiki_mdbnqw">&quot;en&quot;</span><span class="__shiki_140thh">, strength: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 排序规则</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Created index \${</span><span class="__shiki_140thh">indexName</span><span class="__shiki_mdbnqw">} for \${</span><span class="__shiki_140thh">pattern</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">collection</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 监控索引使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> indexStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ aggregate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, pipeline: [</span></span>
<span class="line"><span class="__shiki_140thh">        { $indexStats: {} },</span></span>
<span class="line"><span class="__shiki_140thh">        { $match: { accesses: { $gt: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> } } },</span></span>
<span class="line"><span class="__shiki_140thh">        { $sort: { accesses: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">    ] });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Most used indexes:&quot;</span><span class="__shiki_140thh">, indexStats);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-错误处理与恢复" tabindex="-1">4.2 错误处理与恢复 <a class="header-anchor" href="#_4-2-错误处理与恢复" aria-label="Permalink to &quot;4.2 错误处理与恢复&quot;">​</a></h3><h4 id="_4-2-1-系统化错误处理" tabindex="-1">4.2.1 系统化错误处理 <a class="header-anchor" href="#_4-2-1-系统化错误处理" aria-label="Permalink to &quot;4.2.1 系统化错误处理&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionErrorHandler</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.retryableErrors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;WriteConflict&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;LockTimeout&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;PrimarySteppedDown&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;NotMaster&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;Interrupted&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;ExceededTimeLimit&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ]);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.fatalErrors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;DuplicateKey&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;ValidationError&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;NamespaceNotFound&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;IllegalOperation&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> executeWithRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionFn</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">            maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            initialDelay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            maxDelay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            backoffFactor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> lastError;</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> initialDelay;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> transactionFn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                lastError </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 检查错误类型</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> errorType</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">classifyError</span><span class="__shiki_140thh">(error);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (errorType </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;fatal&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Fatal error, no retry: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (errorType </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;retryable&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxRetries </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Retryable error (attempt \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">}): \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(delay);</span></span>
<span class="line"><span class="__shiki_140thh">                    delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(delay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> backoffFactor, maxDelay);</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 非重试错误或达到最大重试次数</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction failed after \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw">} attempts: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> lastError;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    classifyError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> errorMessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> error.message </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否为可重试错误</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> retryableError</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.retryableErrors) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (errorMessage.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(retryableError)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &#39;retryable&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否为致命错误</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fatalError</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.fatalErrors) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (errorMessage.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(fatalError)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &#39;fatal&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查错误代码</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (error.code) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 可重试错误代码</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> retryableCodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">89</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">91</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">11600</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">11601</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">11602</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">13435</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">13436</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (retryableCodes.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(error.code)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &#39;retryable&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 致命错误代码</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> fatalCodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">11000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">121</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">16755</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (fatalCodes.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(error.code)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &#39;fatal&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 默认视为非重试错误</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;non-retryable&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ms</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, ms));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务恢复策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> recoverFailedTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Attempting recovery for transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 记录失败信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logFailure</span><span class="__shiki_140thh">(transactionId, error);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 检查事务状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkTransactionStatus</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 根据状态执行恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> (status) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;committed&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">} was already committed\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> { recovered: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, action: </span><span class="__shiki_mdbnqw">&#39;none&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;aborted&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">} was aborted, can retry\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> { recovered: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, action: </span><span class="__shiki_mdbnqw">&#39;retry&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;in-progress&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">} is still in progress, waiting...\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitAndCheck</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recoverFailedTransaction</span><span class="__shiki_140thh">(transactionId, error);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">} status unknown, manual intervention required\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> { recovered: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, action: </span><span class="__shiki_mdbnqw">&#39;manual&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> logFailure</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;system&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_failures&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">            error: {</span></span>
<span class="line"><span class="__shiki_140thh">                message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">                code: error.code,</span></span>
<span class="line"><span class="__shiki_140thh">                stack: error.stack</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            recoveryAttempts: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkTransactionStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 这里需要实现实际的状态检查逻辑</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 可以通过事务ID查询系统集合或使用管理命令</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                txnState: transactionId</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result.state;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> waitAndCheck</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeoutMs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> timeoutMs) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkTransactionStatus</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (status </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;in-progress&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> status;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;timeout&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-事务补偿模式" tabindex="-1">4.2.2 事务补偿模式 <a class="header-anchor" href="#_4-2-2-事务补偿模式" aria-label="Permalink to &quot;4.2.2 事务补偿模式&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Saga模式实现（长事务的替代方案）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OrderSaga</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.orderId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orderId;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.steps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.compensationLog </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 步骤1：预留库存</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">reserveInventory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.steps.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;inventory_reserved&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 步骤2：创建订单</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createOrder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.steps.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order_created&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 步骤3：处理支付</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">processPayment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.steps.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;payment_processed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 步骤4：确认订单</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">confirmOrder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.steps.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order_confirmed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Saga \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">} completed successfully\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Saga \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">} failed at step \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">steps</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 执行补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> reserveInventory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用短事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderItems) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;stock&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        { productId: item.productId, available: { $gte: item.quantity } },</span></span>
<span class="line"><span class="__shiki_140thh">                        { </span></span>
<span class="line"><span class="__shiki_140thh">                            $inc: { </span></span>
<span class="line"><span class="__shiki_140thh">                                available: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">                                reserved: item.quantity</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        },</span></span>
<span class="line"><span class="__shiki_140thh">                        { session }</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (result.modifiedCount </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Insufficient stock for \${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">productId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录补偿操作</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.compensationLog.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            step: </span><span class="__shiki_mdbnqw">&#39;reserveInventory&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">            compensate</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">releaseInventory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> releaseInventory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderItems) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;stock&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        { productId: item.productId },</span></span>
<span class="line"><span class="__shiki_140thh">                        { </span></span>
<span class="line"><span class="__shiki_140thh">                            $inc: { </span></span>
<span class="line"><span class="__shiki_140thh">                                available: item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">                                reserved: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        },</span></span>
<span class="line"><span class="__shiki_140thh">                        { session }</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> createOrder</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    _id: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.orderId,</span></span>
<span class="line"><span class="__shiki_140thh">                    items: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.orderItems,</span></span>
<span class="line"><span class="__shiki_140thh">                    status: </span><span class="__shiki_mdbnqw">&quot;created&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    createdAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.compensationLog.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            step: </span><span class="__shiki_mdbnqw">&#39;createOrder&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">            compensate</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cancelOrder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> cancelOrder</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    { _id: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.orderId },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $set: { status: </span><span class="__shiki_mdbnqw">&quot;cancelled&quot;</span><span class="__shiki_140thh">, cancelledAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { session }</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> processPayment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模拟支付处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> paymentSuccess</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callPaymentGateway</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">paymentSuccess) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Payment failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.compensationLog.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            step: </span><span class="__shiki_mdbnqw">&#39;processPayment&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">            compensate</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">refundPayment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> refundPayment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模拟退款</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Refunding payment for order \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> confirmOrder</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    { _id: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.orderId },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $set: { status: </span><span class="__shiki_mdbnqw">&quot;confirmed&quot;</span><span class="__shiki_140thh">, confirmedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { session }</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> compensate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Starting compensation for saga \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 逆序执行补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.compensationLog.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> compensation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.compensationLog[i];</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Executing compensation for step: \${</span><span class="__shiki_140thh">compensation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">step</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> compensation.</span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensation for \${</span><span class="__shiki_140thh">compensation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">step</span><span class="__shiki_mdbnqw">} completed\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensation failed for \${</span><span class="__shiki_140thh">compensation</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">step</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 记录补偿失败，可能需要人工干预</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logCompensationFailure</span><span class="__shiki_140thh">(compensation.step, error);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensation completed for saga \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> logCompensationFailure</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">step</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;system&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;saga_failures&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            sagaId: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.orderId,</span></span>
<span class="line"><span class="__shiki_140thh">            step,</span></span>
<span class="line"><span class="__shiki_140thh">            error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-监控与诊断" tabindex="-1">5. 监控与诊断 <a class="header-anchor" href="#_5-监控与诊断" aria-label="Permalink to &quot;5. 监控与诊断&quot;">​</a></h2><h3 id="_5-1-事务监控指标" tabindex="-1">5.1 事务监控指标 <a class="header-anchor" href="#_5-1-事务监控指标" aria-label="Permalink to &quot;5.1 事务监控指标&quot;">​</a></h3><h4 id="_5-1-1-关键性能指标" tabindex="-1">5.1.1 关键性能指标 <a class="header-anchor" href="#_5-1-1-关键性能指标" aria-label="Permalink to &quot;5.1.1 关键性能指标&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务监控仪表板</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> collectMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 服务器状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> serverStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ serverStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 当前操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> currentOps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">            { $currentOp: {} },</span></span>
<span class="line"><span class="__shiki_140thh">            { $match: { </span><span class="__shiki_mdbnqw">&quot;transaction.parameters.txnNumber&quot;</span><span class="__shiki_140thh">: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } } }</span></span>
<span class="line"><span class="__shiki_140thh">        ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 数据库统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> dbStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> databases</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">admin</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">listDatabases</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dbInfo</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> databases.databases) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> dbName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dbInfo.name;</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dbName.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">dbName.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;local&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">                dbStats[dbName] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(dbName).</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 自定义指标</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> customMetrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectCustomMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            serverStatus: {</span></span>
<span class="line"><span class="__shiki_140thh">                connections: serverStatus.connections,</span></span>
<span class="line"><span class="__shiki_140thh">                globalLock: serverStatus.globalLock,</span></span>
<span class="line"><span class="__shiki_140thh">                locks: serverStatus.locks,</span></span>
<span class="line"><span class="__shiki_140thh">                transactions: serverStatus.transactions,</span></span>
<span class="line"><span class="__shiki_140thh">                wiredTiger: {</span></span>
<span class="line"><span class="__shiki_140thh">                    cache: serverStatus.wiredTiger?.cache,</span></span>
<span class="line"><span class="__shiki_140thh">                    transaction: serverStatus.wiredTiger?.transaction</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            activeTransactions: {</span></span>
<span class="line"><span class="__shiki_140thh">                count: currentOps.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                operations: currentOps.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">op</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">                    sessionId: op.lsid?.id,</span></span>
<span class="line"><span class="__shiki_140thh">                    transactionNumber: op.transaction?.parameters?.txnNumber,</span></span>
<span class="line"><span class="__shiki_140thh">                    shard: op.shard,</span></span>
<span class="line"><span class="__shiki_140thh">                    active: op.active,</span></span>
<span class="line"><span class="__shiki_140thh">                    secsRunning: op.secs_running,</span></span>
<span class="line"><span class="__shiki_140thh">                    op: op.op,</span></span>
<span class="line"><span class="__shiki_140thh">                    ns: op.ns</span></span>
<span class="line"><span class="__shiki_140thh">                }))</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            databaseStats: dbStats,</span></span>
<span class="line"><span class="__shiki_140thh">            customMetrics</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> collectCustomMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            transactionLatency: {},</span></span>
<span class="line"><span class="__shiki_140thh">            errorRates: {},</span></span>
<span class="line"><span class="__shiki_140thh">            resourceUsage: {}</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算平均事务延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> latencyData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateLatency</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        metrics.transactionLatency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> latencyData;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算错误率</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> errorData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateErrorRates</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        metrics.errorRates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errorData;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 资源使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> resourceData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkResourceUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        metrics.resourceUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> resourceData;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> metrics;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> calculateLatency</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> oneHourAgo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(now.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 3600000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> latencyStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_logs&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">            { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: { $gte: oneHourAgo },</span></span>
<span class="line"><span class="__shiki_140thh">                duration: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            }},</span></span>
<span class="line"><span class="__shiki_140thh">            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                _id: { $dateToString: { format: </span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d %H:00&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_mdbnqw">&quot;$timestamp&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                avgDuration: { $avg: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                minDuration: { $min: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                maxDuration: { $max: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                p95Duration: { $percentile: { </span></span>
<span class="line"><span class="__shiki_140thh">                    input: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    p: [</span><span class="__shiki_dzsirb">0.95</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                }}</span></span>
<span class="line"><span class="__shiki_140thh">            }},</span></span>
<span class="line"><span class="__shiki_140thh">            { $sort: { _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">        ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> latencyStats;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> calculateErrorRates</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> oneHourAgo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(now.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 3600000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> errorStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_logs&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">            { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: { $gte: oneHourAgo }</span></span>
<span class="line"><span class="__shiki_140thh">            }},</span></span>
<span class="line"><span class="__shiki_140thh">            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                _id: { </span></span>
<span class="line"><span class="__shiki_140thh">                    $cond: [{ $ifNull: [</span><span class="__shiki_mdbnqw">&quot;$error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">] }, </span><span class="__shiki_mdbnqw">&quot;failed&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            }},</span></span>
<span class="line"><span class="__shiki_140thh">            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                _id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                total: { $sum: </span><span class="__shiki_mdbnqw">&quot;$count&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                results: { $push: { status: </span><span class="__shiki_mdbnqw">&quot;$_id&quot;</span><span class="__shiki_140thh">, count: </span><span class="__shiki_mdbnqw">&quot;$count&quot;</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">            }},</span></span>
<span class="line"><span class="__shiki_140thh">            { $unwind: </span><span class="__shiki_mdbnqw">&quot;$results&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            { $project: {</span></span>
<span class="line"><span class="__shiki_140thh">                status: </span><span class="__shiki_mdbnqw">&quot;$results.status&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                count: </span><span class="__shiki_mdbnqw">&quot;$results.count&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                percentage: { </span></span>
<span class="line"><span class="__shiki_140thh">                    $multiply: [</span></span>
<span class="line"><span class="__shiki_140thh">                        { $divide: [</span><span class="__shiki_mdbnqw">&quot;$results.count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$total&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_dzsirb">                        100</span></span>
<span class="line"><span class="__shiki_140thh">                    ]</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }}</span></span>
<span class="line"><span class="__shiki_140thh">        ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> errorStats;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkResourceUsage</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取系统资源信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> hostInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ hostInfo: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> top</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ top: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            memory: {</span></span>
<span class="line"><span class="__shiki_140thh">                system: hostInfo.system?.memSizeMB,</span></span>
<span class="line"><span class="__shiki_140thh">                available: hostInfo.system?.memSizeMB </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (hostInfo.system?.memSizeMB </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 估算</span></span>
<span class="line"><span class="__shiki_140thh">                resident: (</span><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ serverStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })).mem.resident</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            cpu: hostInfo.system?.cpuAddrSize </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 64</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            operations: top.totals</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> generateReport</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查警报条件</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> alerts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkAlerts</span><span class="__shiki_140thh">(metrics);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成报告</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> report</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            summary: {</span></span>
<span class="line"><span class="__shiki_140thh">                activeTransactions: metrics.activeTransactions.count,</span></span>
<span class="line"><span class="__shiki_140thh">                avgTransactionDuration: metrics.customMetrics.transactionLatency[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.avgDuration </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                errorRate: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateOverallErrorRate</span><span class="__shiki_140thh">(metrics.customMetrics.errorRates),</span></span>
<span class="line"><span class="__shiki_140thh">                resourceUtilization: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateResourceUtilization</span><span class="__shiki_140thh">(metrics)</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            detailedMetrics: metrics,</span></span>
<span class="line"><span class="__shiki_140thh">            alerts</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 保存报告</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveReport</span><span class="__shiki_140thh">(report);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> report;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    checkAlerts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> alerts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查事务延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> latestLatency</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metrics.customMetrics.transactionLatency[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (latestLatency </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> latestLatency.avgDuration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 1秒阈值</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                level: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_latency&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High transaction latency detected: \${</span><span class="__shiki_140thh">latestLatency</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">avgDuration</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                metric: latestLatency</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查错误率</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> errorRate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateOverallErrorRate</span><span class="__shiki_140thh">(metrics.customMetrics.errorRates);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (errorRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 5%阈值</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                level: </span><span class="__shiki_mdbnqw">&quot;critical&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_error_rate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High transaction error rate: \${</span><span class="__shiki_140thh">errorRate</span><span class="__shiki_mdbnqw">}%\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                metric: { errorRate }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查活动事务数量</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (metrics.activeTransactions.count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                level: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_concurrency&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High number of active transactions: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">activeTransactions</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">count</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                metric: { activeTransactions: metrics.activeTransactions.count }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查内存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> memoryUsage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metrics.serverStatus.wiredTiger?.cache?.bytesCurrentlyInCache </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> maxCache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metrics.serverStatus.wiredTiger?.cache?.maximumBytesConfigured </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cacheUsagePercent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (memoryUsage </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> maxCache) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cacheUsagePercent </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                level: </span><span class="__shiki_mdbnqw">&quot;critical&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_memory_usage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High cache usage: \${</span><span class="__shiki_140thh">cacheUsagePercent</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}%\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                metric: { cacheUsagePercent, memoryUsage, maxCache }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> alerts;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    calculateOverallErrorRate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">errorRates</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">errorRates </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> errorRates.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> failed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> rate</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> errorRates) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (rate.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;failed&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                failed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rate.count;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            total </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> rate.count;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> (failed </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> total) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    calculateResourceUtilization</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cache</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> metrics.serverStatus.wiredTiger?.cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">cache) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> used</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cache.bytesCurrentlyInCache </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cache.maximumBytesConfigured </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (used </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> max) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> saveReport</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">report</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_reports&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">(report);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-实时监控实现" tabindex="-1">5.1.2 实时监控实现 <a class="header-anchor" href="#_5-1-2-实时监控实现" aria-label="Permalink to &quot;5.1.2 实时监控实现&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 实时事务监控</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RealTimeTransactionMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">checkInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.checkInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> checkInterval;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.monitoring </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.subscribers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.monitoring) {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Monitor already running&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.monitoring </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Starting real-time transaction monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.monitorInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectRealTimeMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">notifySubscribers</span><span class="__shiki_140thh">(metrics);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 检查异常</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> anomalies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">detectAnomalies</span><span class="__shiki_140thh">(metrics);</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (anomalies.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handleAnomalies</span><span class="__shiki_140thh">(anomalies);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error collecting real-time metrics:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.checkInterval);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    stop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.monitorInterval) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.monitorInterval);</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.monitorInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.monitoring </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transaction monitoring stopped&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    subscribe</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">callback</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.subscribers.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(callback);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> index</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.subscribers.</span><span class="__shiki_1t8gfj">indexOf</span><span class="__shiki_140thh">(callback);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (index </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.subscribers.</span><span class="__shiki_1t8gfj">splice</span><span class="__shiki_140thh">(index, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifySubscribers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.subscribers.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">callback</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                callback</span><span class="__shiki_140thh">(metrics);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error in subscriber callback:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> collectRealTimeMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 快速收集关键指标</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">serverStatus</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">currentOps</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">            db.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ serverStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">            db.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                { $currentOp: {} },</span></span>
<span class="line"><span class="__shiki_140thh">                { $match: { </span><span class="__shiki_mdbnqw">&quot;transaction.parameters.txnNumber&quot;</span><span class="__shiki_140thh">: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } } },</span></span>
<span class="line"><span class="__shiki_140thh">                { $project: {</span></span>
<span class="line"><span class="__shiki_140thh">                    sessionId: </span><span class="__shiki_mdbnqw">&quot;$lsid.id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    transactionNumber: </span><span class="__shiki_mdbnqw">&quot;$transaction.parameters.txnNumber&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    active: </span><span class="__shiki_mdbnqw">&quot;$active&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    secs_running: { </span></span>
<span class="line"><span class="__shiki_140thh">                        $divide: [</span></span>
<span class="line"><span class="__shiki_140thh">                            { $subtract: [</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&quot;$currentOpTime&quot;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_dzsirb">                            1000</span></span>
<span class="line"><span class="__shiki_140thh">                        ]</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    op: </span><span class="__shiki_mdbnqw">&quot;$op&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    ns: </span><span class="__shiki_mdbnqw">&quot;$ns&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }}</span></span>
<span class="line"><span class="__shiki_140thh">            ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        ]);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算实时统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> activeTransactions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> currentOps;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: now,</span></span>
<span class="line"><span class="__shiki_140thh">            activeTransactionCount: activeTransactions.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 按状态分组</span></span>
<span class="line"><span class="__shiki_140thh">            byStatus: activeTransactions.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">acc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> tx.active </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &quot;active&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &quot;idle&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                acc[status] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (acc[status] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> acc;</span></span>
<span class="line"><span class="__shiki_140thh">            }, {}),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 按运行时间分组</span></span>
<span class="line"><span class="__shiki_140thh">            byDuration: activeTransactions.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">acc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> tx.secs_running </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                let</span><span class="__shiki_140thh"> range;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&lt;1s&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;1-5s&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">) range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;5-30s&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">) range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;30-60s&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_140thh"> range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&gt;60s&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                acc[range] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (acc[range] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> acc;</span></span>
<span class="line"><span class="__shiki_140thh">            }, {}),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 按操作类型分组</span></span>
<span class="line"><span class="__shiki_140thh">            byOperation: activeTransactions.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">acc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> op</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> tx.op </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                acc[op] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (acc[op] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> acc;</span></span>
<span class="line"><span class="__shiki_140thh">            }, {}),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 资源使用</span></span>
<span class="line"><span class="__shiki_140thh">            resources: {</span></span>
<span class="line"><span class="__shiki_140thh">                cache: {</span></span>
<span class="line"><span class="__shiki_140thh">                    used: serverStatus.wiredTiger?.cache?.bytesCurrentlyInCache </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    total: serverStatus.wiredTiger?.cache?.maximumBytesConfigured </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    percentage: serverStatus.wiredTiger?.cache?.maximumBytesConfigured </span></span>
<span class="line"><span class="__shiki_1itgoe">                        ?</span><span class="__shiki_140thh"> (serverStatus.wiredTiger.cache.bytesCurrentlyInCache </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                           serverStatus.wiredTiger.cache.maximumBytesConfigured) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                        :</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                connections: serverStatus.connections </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {},</span></span>
<span class="line"><span class="__shiki_140thh">                locks: serverStatus.locks </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> stats;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> detectAnomalies</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> anomalies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 检测长时间运行的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (metrics.byDuration[</span><span class="__shiki_mdbnqw">&quot;&gt;60s&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            anomalies.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;long_running_transactions&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">byDuration</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_mdbnqw">&quot;&gt;60s&quot;</span><span class="__shiki_mdbnqw">]</span><span class="__shiki_mdbnqw">} transaction(s) running for more than 60 seconds\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                details: metrics.byDuration,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: now</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 检测高并发</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (metrics.activeTransactionCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            anomalies.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_concurrency&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High number of concurrent transactions: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">activeTransactionCount</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                details: { count: metrics.activeTransactionCount },</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: now</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 检测高缓存使用率</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (metrics.resources.cache.percentage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 85</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            anomalies.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_cache_usage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;critical&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High cache usage: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">resources</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">cache</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">percentage</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}%\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                details: metrics.resources.cache,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: now</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 检测连接数过高</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (metrics.resources.connections.current </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            metrics.resources.connections.available </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            anomalies.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;high_connection_usage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                message: </span><span class="__shiki_mdbnqw">\`High connection usage: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">resources</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">connections</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">current</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">resources</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">connections</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">available</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                details: metrics.resources.connections,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: now</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> anomalies;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> handleAnomalies</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">anomalies</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录所有异常</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logAnomalies</span><span class="__shiki_140thh">(anomalies);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 按严重性处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> anomaly</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> anomalies) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> (anomaly.severity) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                case</span><span class="__shiki_mdbnqw"> &quot;critical&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handleCriticalAnomaly</span><span class="__shiki_140thh">(anomaly);</span></span>
<span class="line"><span class="__shiki_1itgoe">                    break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                case</span><span class="__shiki_mdbnqw"> &quot;warning&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handleWarningAnomaly</span><span class="__shiki_140thh">(anomaly);</span></span>
<span class="line"><span class="__shiki_1itgoe">                    break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> logAnomalies</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">anomalies</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> anomaly</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> anomalies) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_anomalies&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">                ...</span><span class="__shiki_140thh">anomaly,</span></span>
<span class="line"><span class="__shiki_140thh">                loggedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> handleCriticalAnomaly</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">anomaly</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`CRITICAL ANOMALY: \${</span><span class="__shiki_140thh">anomaly</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送警报</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendAlert</span><span class="__shiki_140thh">(anomaly);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 尝试自动修复</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (anomaly.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;high_cache_usage&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attemptCacheCleanup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> handleWarningAnomaly</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">anomaly</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`WARNING: \${</span><span class="__shiki_140thh">anomaly</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送通知</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendNotification</span><span class="__shiki_140thh">(anomaly);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> sendAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">anomaly</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实现警报发送逻辑（邮件、短信、Slack等）</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Sending alert for: \${</span><span class="__shiki_140thh">anomaly</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 示例：发送到日志文件</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> alertLog</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            level: </span><span class="__shiki_mdbnqw">&quot;ALERT&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            anomaly</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 这里可以集成外部警报系统</span></span>
<span class="line"><span class="__shiki_21nrsd">        // await externalAlertSystem.send(alertLog);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> sendNotification</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">anomaly</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实现通知发送逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Sending notification for: \${</span><span class="__shiki_140thh">anomaly</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> attemptCacheCleanup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Attempting cache cleanup...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 运行 compact 命令（需要管理员权限）</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> databases</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">admin</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">listDatabases</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dbInfo</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> databases.databases) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> dbName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dbInfo.name;</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dbName.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">dbName.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;local&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                    !</span><span class="__shiki_140thh">dbName.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;config&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compacting database: \${</span><span class="__shiki_140thh">dbName</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        await</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(dbName).</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ compact: </span><span class="__shiki_mdbnqw">&quot;collection_name&quot;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">                    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Failed to compact \${</span><span class="__shiki_140thh">dbName</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Cache cleanup attempted&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Cache cleanup failed:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-事务诊断工具" tabindex="-1">5.2 事务诊断工具 <a class="header-anchor" href="#_5-2-事务诊断工具" aria-label="Permalink to &quot;5.2 事务诊断工具&quot;">​</a></h3><h4 id="_5-2-1-内置诊断命令" tabindex="-1">5.2.1 内置诊断命令 <a class="header-anchor" href="#_5-2-1-内置诊断命令" aria-label="Permalink to &quot;5.2.1 内置诊断命令&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MongoDB事务诊断工具箱</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionDiagnostics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查事务配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkTransactionConfiguration</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 存储引擎配置</span></span>
<span class="line"><span class="__shiki_140thh">            storageEngine: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkStorageEngine</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 副本集配置</span></span>
<span class="line"><span class="__shiki_140thh">            replicaSet: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkReplicaSetConfig</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 分片配置</span></span>
<span class="line"><span class="__shiki_140thh">            sharding: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkShardingConfig</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 服务器参数</span></span>
<span class="line"><span class="__shiki_140thh">            serverParameters: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkServerParameters</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 功能兼容版本</span></span>
<span class="line"><span class="__shiki_140thh">            featureCompatibilityVersion: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkFeatureCompatibility</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> config;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkStorageEngine</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> serverStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ serverStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            name: serverStatus.storageEngine?.name,</span></span>
<span class="line"><span class="__shiki_140thh">            supportsTransactions: serverStatus.storageEngine?.supportsCommittedReads </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            wiredTiger: serverStatus.wiredTiger </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                version: serverStatus.wiredTiger.version,</span></span>
<span class="line"><span class="__shiki_140thh">                cacheSizeGB: (serverStatus.wiredTiger.cache?.maximumBytesConfigured </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                checkpointAge: serverStatus.wiredTiger.cache?.trackedDirtyBytes </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkReplicaSetConfig</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ replSetGetStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                isReplicaSet: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                setName: status.set,</span></span>
<span class="line"><span class="__shiki_140thh">                members: status.members?.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                primary: status.members?.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> m.state </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)?.name,</span></span>
<span class="line"><span class="__shiki_140thh">                writeConcernMajority: status.writeMajorityCount </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                oplogSizeMB: status.members?.[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.optime?.ts </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getOplogSize</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> { isReplicaSet: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> getOplogSize</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> localDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;local&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> oplogStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> localDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;oplog.rs&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">round</span><span class="__shiki_140thh">(oplogStats.size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkShardingConfig</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ listShards: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                isSharded: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                shards: status.shards?.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                balancerEnabled: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isBalancerEnabled</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> { isSharded: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> isBalancerEnabled</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ balancerStatus: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> status.mode </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;full&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkServerParameters</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> parameters</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ getParameter: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 筛选事务相关参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> transactionParams</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(parameters).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (key.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> key.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;writeConcern&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                key.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;readConcern&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> key.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;storage&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">                transactionParams[key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parameters[key];</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> transactionParams;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkFeatureCompatibility</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> adminDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> version</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> adminDb.</span><span class="__shiki_1t8gfj">command</span><span class="__shiki_140thh">({ getParameter: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, featureCompatibilityVersion: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> version.featureCompatibilityVersion?.version </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 分析事务性能</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> analyzeTransactionPerformance</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">timeRangeHours</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> monitoringDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(now.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (timeRangeHours </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> monitoringDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_logs&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">            { $match: { timestamp: { $gte: startTime } } },</span></span>
<span class="line"><span class="__shiki_140thh">            { $facet: {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 总体统计</span></span>
<span class="line"><span class="__shiki_140thh">                overview: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                        _id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        totalTransactions: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        successful: { $sum: { $cond: [{ $ifNull: [</span><span class="__shiki_mdbnqw">&quot;$error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">] }, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">] } },</span></span>
<span class="line"><span class="__shiki_140thh">                        failed: { $sum: { $cond: [{ $ifNull: [</span><span class="__shiki_mdbnqw">&quot;$error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">] }, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] } },</span></span>
<span class="line"><span class="__shiki_140thh">                        avgDuration: { $avg: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        maxDuration: { $max: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        minDuration: { $min: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                    }}</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 按时间分布</span></span>
<span class="line"><span class="__shiki_140thh">                hourlyDistribution: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                        _id: { $dateToString: { format: </span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d %H:00&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_mdbnqw">&quot;$timestamp&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                        count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        avgDuration: { $avg: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        errorCount: { $sum: { $cond: [{ $ifNull: [</span><span class="__shiki_mdbnqw">&quot;$error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">] }, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] } }</span></span>
<span class="line"><span class="__shiki_140thh">                    }},</span></span>
<span class="line"><span class="__shiki_140thh">                    { $sort: { _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 按类型分布</span></span>
<span class="line"><span class="__shiki_140thh">                typeDistribution: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                        _id: </span><span class="__shiki_mdbnqw">&quot;$type&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        avgDuration: { $avg: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        errorRate: { </span></span>
<span class="line"><span class="__shiki_140thh">                            $avg: { </span></span>
<span class="line"><span class="__shiki_140thh">                                $cond: [{ $ifNull: [</span><span class="__shiki_mdbnqw">&quot;$error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">] }, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span></span>
<span class="line"><span class="__shiki_140thh">                            } </span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }},</span></span>
<span class="line"><span class="__shiki_140thh">                    { $sort: { count: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 错误分析</span></span>
<span class="line"><span class="__shiki_140thh">                errorAnalysis: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { $match: { error: { $exists: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                        _id: </span><span class="__shiki_mdbnqw">&quot;$error.message&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        firstOccurrence: { $min: </span><span class="__shiki_mdbnqw">&quot;$timestamp&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        lastOccurrence: { $max: </span><span class="__shiki_mdbnqw">&quot;$timestamp&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        transactionTypes: { $addToSet: </span><span class="__shiki_mdbnqw">&quot;$type&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                    }},</span></span>
<span class="line"><span class="__shiki_140thh">                    { $sort: { count: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $limit: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 慢事务分析</span></span>
<span class="line"><span class="__shiki_140thh">                slowTransactions: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">                        duration: { $gt: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> },  </span><span class="__shiki_21nrsd">// 超过1秒</span></span>
<span class="line"><span class="__shiki_140thh">                        error: { $exists: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> }  </span><span class="__shiki_21nrsd">// 只考虑成功的</span></span>
<span class="line"><span class="__shiki_140thh">                    }},</span></span>
<span class="line"><span class="__shiki_140thh">                    { $sort: { duration: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $limit: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $project: {</span></span>
<span class="line"><span class="__shiki_140thh">                        transactionId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        type: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        duration: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        timestamp: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        operations: { $slice: [</span><span class="__shiki_mdbnqw">&quot;$operations&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">] }  </span><span class="__shiki_21nrsd">// 只取前5个操作</span></span>
<span class="line"><span class="__shiki_140thh">                    }}</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 并发分析</span></span>
<span class="line"><span class="__shiki_140thh">                concurrencyAnalysis: [</span></span>
<span class="line"><span class="__shiki_140thh">                    { $sort: { timestamp: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                        _id: { $dateToString: { format: </span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d %H:%M&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_mdbnqw">&quot;$timestamp&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                        concurrentTransactions: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                        avgDuration: { $avg: </span><span class="__shiki_mdbnqw">&quot;$duration&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                    }},</span></span>
<span class="line"><span class="__shiki_140thh">                    { $sort: { concurrentTransactions: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                    { $limit: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            }}</span></span>
<span class="line"><span class="__shiki_140thh">        ]).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> analysis[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 诊断特定事务问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> diagnoseTransactionIssue</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> monitoringDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查找事务记录</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> monitoringDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_logs&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ transactionId });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">transaction) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> { error: </span><span class="__shiki_mdbnqw">&quot;Transaction not found in logs&quot;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> diagnosis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">            basicInfo: {</span></span>
<span class="line"><span class="__shiki_140thh">                type: transaction.type,</span></span>
<span class="line"><span class="__shiki_140thh">                startTime: transaction.timestamp,</span></span>
<span class="line"><span class="__shiki_140thh">                duration: transaction.duration,</span></span>
<span class="line"><span class="__shiki_140thh">                status: transaction.error </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &quot;failed&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &quot;success&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                collectionsInvolved: transaction.collections </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 如果失败，分析错误</span></span>
<span class="line"><span class="__shiki_140thh">            errorAnalysis: transaction.error </span><span class="__shiki_1itgoe">?</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeError</span><span class="__shiki_140thh">(transaction.error) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 性能分析</span></span>
<span class="line"><span class="__shiki_140thh">            performanceAnalysis: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeTransactionPerformanceDetails</span><span class="__shiki_140thh">(transaction),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 系统状态分析（事务执行时的系统状态）</span></span>
<span class="line"><span class="__shiki_140thh">            systemState: </span><span class="__shiki_1itgoe">await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeSystemStateAtTime</span><span class="__shiki_140thh">(transaction.timestamp),</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 建议</span></span>
<span class="line"><span class="__shiki_140thh">            recommendations: []</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成建议</span></span>
<span class="line"><span class="__shiki_140thh">        diagnosis.recommendations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateRecommendations</span><span class="__shiki_140thh">(diagnosis);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> diagnosis;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> analyzeError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">            code: error.code,</span></span>
<span class="line"><span class="__shiki_140thh">            type: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">classifyErrorType</span><span class="__shiki_140thh">(error)</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据错误类型提供更多信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> (analysis.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;write_conflict&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;多个事务同时修改相同文档&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.solution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;实现重试逻辑或优化事务设计减少冲突&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;lock_timeout&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;事务等待锁超时&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.solution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;减少事务持续时间或优化索引&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;network&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;网络连接问题&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.solution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;检查网络连接，实现重试机制&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;validation&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;数据验证失败&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.solution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;检查数据格式和验证规则&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;未知错误类型&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                analysis.solution </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;检查应用程序日志和MongoDB日志&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    classifyErrorType</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> message</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> error.message </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;WriteConflict&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &quot;write_conflict&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;LockTimeout&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &quot;lock_timeout&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;network&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;timeout&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &quot;network&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;validation&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;schema&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &quot;validation&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;duplicate&quot;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &quot;duplicate_key&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> analyzeTransactionPerformanceDetails</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">transaction.operations </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> transaction.operations.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> { message: </span><span class="__shiki_mdbnqw">&quot;No detailed operation data available&quot;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> analysis</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            operationCount: transaction.operations.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            operationTypes: {},</span></span>
<span class="line"><span class="__shiki_140thh">            slowestOperations: [],</span></span>
<span class="line"><span class="__shiki_140thh">            indexUsage: { used: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分析操作类型</span></span>
<span class="line"><span class="__shiki_140thh">        transaction.operations.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">op</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            analysis.operationTypes[op.type] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (analysis.operationTypes[op.type] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 找出最慢的操作</span></span>
<span class="line"><span class="__shiki_140thh">        analysis.slowestOperations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transaction.operations</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">op</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> op.duration)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> b.duration </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> a.duration)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查索引使用</span></span>
<span class="line"><span class="__shiki_140thh">        analysis.indexUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transaction.operations.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">acc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">op</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (op.explain </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> op.explain.executionStats) {</span></span>
<span class="line"><span class="__shiki_140thh">                acc.total</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (op.explain.executionStats.executionStages.inputStage?.stage </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;IXSCAN&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    acc.used</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> acc;</span></span>
<span class="line"><span class="__shiki_140thh">        }, { used: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, total: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> analysis;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> analyzeSystemStateAtTime</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">timestamp</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查找该时间点附近的系统状态记录</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> monitoringDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> systemState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> monitoringDb.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;system_metrics&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: {</span></span>
<span class="line"><span class="__shiki_140thh">                    $gte: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(timestamp.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">// 前后1分钟</span></span>
<span class="line"><span class="__shiki_140thh">                    $lte: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(timestamp.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }, {</span></span>
<span class="line"><span class="__shiki_140thh">                sort: { timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">systemState) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> { message: </span><span class="__shiki_mdbnqw">&quot;No system state data available for this time&quot;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: systemState.timestamp,</span></span>
<span class="line"><span class="__shiki_140thh">            cpu: systemState.cpu,</span></span>
<span class="line"><span class="__shiki_140thh">            memory: systemState.memory,</span></span>
<span class="line"><span class="__shiki_140thh">            connections: systemState.connections,</span></span>
<span class="line"><span class="__shiki_140thh">            activeTransactions: systemState.activeTransactions,</span></span>
<span class="line"><span class="__shiki_140thh">            lockPercentage: systemState.lockPercentage</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> generateRecommendations</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">diagnosis</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> recommendations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于错误类型的建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (diagnosis.errorAnalysis) {</span></span>
<span class="line"><span class="__shiki_140thh">            recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;error_resolution&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                priority: </span><span class="__shiki_mdbnqw">&quot;high&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                description: diagnosis.errorAnalysis.solution,</span></span>
<span class="line"><span class="__shiki_140thh">                action: diagnosis.errorAnalysis.solution</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于性能的建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (diagnosis.performanceAnalysis) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> perf</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> diagnosis.performanceAnalysis;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (perf.indexUsage.total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                perf.indexUsage.used </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> perf.indexUsage.total </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    type: </span><span class="__shiki_mdbnqw">&quot;index_optimization&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    priority: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    description: </span><span class="__shiki_mdbnqw">&quot;Low index usage detected. Consider adding missing indexes.&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action: </span><span class="__shiki_mdbnqw">&quot;Review query patterns and create appropriate indexes.&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (perf.slowestOperations.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> avgOpDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> perf.slowestOperations.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">op</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (op.duration </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> perf.slowestOperations.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (avgOpDuration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {  </span><span class="__shiki_21nrsd">// 100ms</span></span>
<span class="line"><span class="__shiki_140thh">                    recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                        type: </span><span class="__shiki_mdbnqw">&quot;query_optimization&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        priority: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        description: </span><span class="__shiki_mdbnqw">&quot;Slow operations detected in transaction.&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        action: </span><span class="__shiki_mdbnqw">&quot;Optimize slow queries, consider adding indexes or restructuring data.&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    });</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于系统状态的建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (diagnosis.systemState </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">diagnosis.systemState.message) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> diagnosis.systemState;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (state.lockPercentage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    type: </span><span class="__shiki_mdbnqw">&quot;concurrency_optimization&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    priority: </span><span class="__shiki_mdbnqw">&quot;high&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    description: </span><span class="__shiki_mdbnqw">&quot;High lock percentage detected during transaction execution.&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action: </span><span class="__shiki_mdbnqw">&quot;Consider reducing transaction size or implementing retry logic with backoff.&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (state.activeTransactions </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    type: </span><span class="__shiki_mdbnqw">&quot;load_management&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    priority: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    description: </span><span class="__shiki_mdbnqw">&quot;High number of concurrent transactions detected.&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action: </span><span class="__shiki_mdbnqw">&quot;Implement connection pooling or rate limiting for transactions.&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 通用最佳实践建议</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            type: </span><span class="__shiki_mdbnqw">&quot;best_practice&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            priority: </span><span class="__shiki_mdbnqw">&quot;low&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            description: </span><span class="__shiki_mdbnqw">&quot;Ensure transactions are kept short to reduce lock contention.&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            action: </span><span class="__shiki_mdbnqw">&quot;Keep transactions under 1 second when possible.&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> recommendations;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 生成诊断报告</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> generateDiagnosticReport</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> report</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            generatedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            summary: {},</span></span>
<span class="line"><span class="__shiki_140thh">            configuration: {},</span></span>
<span class="line"><span class="__shiki_140thh">            performance: {},</span></span>
<span class="line"><span class="__shiki_140thh">            issues: [],</span></span>
<span class="line"><span class="__shiki_140thh">            recommendations: []</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 收集配置信息</span></span>
<span class="line"><span class="__shiki_140thh">        report.configuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkTransactionConfiguration</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分析性能</span></span>
<span class="line"><span class="__shiki_140thh">        report.performance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeTransactionPerformance</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            options.timeRangeHours </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 24</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查已知问题</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkForCommonIssues</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        report.issues </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成摘要</span></span>
<span class="line"><span class="__shiki_140thh">        report.summary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            isConfiguredForTransactions: report.configuration.storageEngine.supportsTransactions,</span></span>
<span class="line"><span class="__shiki_140thh">            transactionSupport: report.configuration.replicaSet.isReplicaSet </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Replica Set&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> report.configuration.sharding.isSharded </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Sharded Cluster&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &quot;Standalone&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            featureCompatibility: report.configuration.featureCompatibilityVersion,</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            performanceMetrics: report.performance.overview </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                totalTransactions: report.performance.overview[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.totalTransactions </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                successRate: report.performance.overview[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    (report.performance.overview[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].successful </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                     report.performance.overview[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].totalTransactions </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &quot;N/A&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                avgDuration: report.performance.overview[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.avgDuration?.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;ms&quot;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &quot;N/A&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            detectedIssues: issues.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 生成总体建议</span></span>
<span class="line"><span class="__shiki_140thh">        report.recommendations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateOverallRecommendations</span><span class="__shiki_140thh">(report);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> report;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> checkForCommonIssues</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkTransactionConfiguration</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查存储引擎</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (config.storageEngine.name </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &quot;wiredTiger&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;storage_engine&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;critical&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                description: </span><span class="__shiki_mdbnqw">&quot;Transactions require WiredTiger storage engine&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                current: config.storageEngine.name,</span></span>
<span class="line"><span class="__shiki_140thh">                required: </span><span class="__shiki_mdbnqw">&quot;wiredTiger&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查副本集配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">config.replicaSet.isReplicaSet </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">config.sharding.isSharded) {</span></span>
<span class="line"><span class="__shiki_140thh">            issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;deployment_mode&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;critical&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                description: </span><span class="__shiki_mdbnqw">&quot;Multi-document transactions require replica set or sharded cluster&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                current: </span><span class="__shiki_mdbnqw">&quot;Standalone&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                required: </span><span class="__shiki_mdbnqw">&quot;Replica Set or Sharded Cluster&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查oplog大小</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (config.replicaSet.oplogSizeMB </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> config.replicaSet.oplogSizeMB </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;oplog_size&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                description: </span><span class="__shiki_mdbnqw">&quot;Small oplog may limit transaction history retention&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                current: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">config</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">replicaSet</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">oplogSizeMB</span><span class="__shiki_mdbnqw">}MB\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                recommended: </span><span class="__shiki_mdbnqw">&quot;At least 1024MB for transaction-heavy workloads&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (config.storageEngine.wiredTiger </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            config.storageEngine.wiredTiger.cacheSizeGB </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;cache_size&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                severity: </span><span class="__shiki_mdbnqw">&quot;warning&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                description: </span><span class="__shiki_mdbnqw">&quot;Small cache size may affect transaction performance&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                current: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">config</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">storageEngine</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">wiredTiger</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">cacheSizeGB</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}GB\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                recommended: </span><span class="__shiki_mdbnqw">&quot;At least 4GB for production workloads&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    generateOverallRecommendations</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">report</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> recommendations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 配置建议</span></span>
<span class="line"><span class="__shiki_140thh">        report.issues.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">issue</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;configuration&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                priority: issue.severity </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;critical&quot;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &quot;high&quot;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &quot;medium&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                description: issue.description,</span></span>
<span class="line"><span class="__shiki_140thh">                action: </span><span class="__shiki_mdbnqw">\`Change \${</span><span class="__shiki_140thh">issue</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">} from \${</span><span class="__shiki_140thh">issue</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">current</span><span class="__shiki_mdbnqw">} to \${</span><span class="__shiki_140thh">issue</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">required</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> issue</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">recommended</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 性能建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (report.performance.overview) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> overview</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> report.performance.overview[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (overview </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> overview.avgDuration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    type: </span><span class="__shiki_mdbnqw">&quot;performance&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    priority: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    description: </span><span class="__shiki_mdbnqw">&quot;High average transaction duration detected&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action: </span><span class="__shiki_mdbnqw">&quot;Optimize transaction logic, add indexes, or split large transactions&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (overview </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> (overview.failed </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> overview.totalTransactions) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    type: </span><span class="__shiki_mdbnqw">&quot;reliability&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    priority: </span><span class="__shiki_mdbnqw">&quot;high&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    description: </span><span class="__shiki_mdbnqw">&quot;High transaction failure rate detected&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    action: </span><span class="__shiki_mdbnqw">&quot;Implement proper error handling and retry logic&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 监控建议</span></span>
<span class="line"><span class="__shiki_140thh">        recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            type: </span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            priority: </span><span class="__shiki_mdbnqw">&quot;low&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            description: </span><span class="__shiki_mdbnqw">&quot;Set up comprehensive transaction monitoring&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            action: </span><span class="__shiki_mdbnqw">&quot;Implement the monitoring system described in this document&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> recommendations;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-实际应用案例" tabindex="-1">6. 实际应用案例 <a class="header-anchor" href="#_6-实际应用案例" aria-label="Permalink to &quot;6. 实际应用案例&quot;">​</a></h2><h3 id="_6-1-金融交易系统" tabindex="-1">6.1 金融交易系统 <a class="header-anchor" href="#_6-1-金融交易系统" aria-label="Permalink to &quot;6.1 金融交易系统&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 银行转账事务实现</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BankTransferService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> MongoClient</span><span class="__shiki_140thh">(process.env.</span><span class="__shiki_dzsirb">MONGODB_URI</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            maxPoolSize: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            minPoolSize: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            maxIdleTimeMS: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            socketTimeoutMS: </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            connectTimeoutMS: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            retryWrites: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            retryReads: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.errorHandler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionErrorHandler</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionMonitor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> initialize</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建必要索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createIndexes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 启动监控</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.monitor.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> createIndexes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bank&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 账户集合索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">createIndexes</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 主查询索引</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { accountNumber: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { customerId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 覆盖查询索引</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { accountNumber: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, lastTransaction: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">        ]);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 交易记录索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">createIndexes</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 主查询索引</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { transactionId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }, unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { fromAccount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { toAccount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 时间序列索引</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 复合索引用于报表</span></span>
<span class="line"><span class="__shiki_140thh">            { key: { type: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, status: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">        ]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> transferFunds</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.errorHandler.</span><span class="__shiki_1t8gfj">executeWithRetry</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">executeTransfer</span><span class="__shiki_140thh">(transferRequest);</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                maxRetries: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                initialDelay: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                maxDelay: </span><span class="__shiki_dzsirb">2000</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> executeTransfer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> transactionId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`TXN-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}-\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> session;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">            session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh">, j: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                maxCommitTimeMS: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bank&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 1. 验证账户和余额</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> fromAccount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { </span></span>
<span class="line"><span class="__shiki_140thh">                    accountNumber: transferRequest.fromAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                    status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    balance: { $gte: transferRequest.amount }</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">fromAccount) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Invalid source account or insufficient funds&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> toAccount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { </span></span>
<span class="line"><span class="__shiki_140thh">                    accountNumber: transferRequest.toAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                    status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">toAccount) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Invalid destination account&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 2. 检查每日限额</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> today</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            today.</span><span class="__shiki_1t8gfj">setHours</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> todayTransactions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">                    fromAccount: transferRequest.fromAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                    timestamp: { $gte: today },</span></span>
<span class="line"><span class="__shiki_140thh">                    status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }},</span></span>
<span class="line"><span class="__shiki_140thh">                { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                    _id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    totalAmount: { $sum: </span><span class="__shiki_mdbnqw">&quot;$amount&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                }}</span></span>
<span class="line"><span class="__shiki_140thh">            ], { session }).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> dailyTotal</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> todayTransactions[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.totalAmount </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (dailyTotal </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> transferRequest.amount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> fromAccount.dailyLimit) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Daily transfer limit exceeded&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 3. 执行转账</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> transferTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 扣款</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { accountNumber: transferRequest.fromAccount },</span></span>
<span class="line"><span class="__shiki_140thh">                { </span></span>
<span class="line"><span class="__shiki_140thh">                    $inc: { balance: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">transferRequest.amount },</span></span>
<span class="line"><span class="__shiki_140thh">                    $set: { lastTransaction: transferTime }</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 存款</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { accountNumber: transferRequest.toAccount },</span></span>
<span class="line"><span class="__shiki_140thh">                { </span></span>
<span class="line"><span class="__shiki_140thh">                    $inc: { balance: transferRequest.amount },</span></span>
<span class="line"><span class="__shiki_140thh">                    $set: { lastTransaction: transferTime }</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 4. 记录交易</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> transactionRecord</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;transfer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                fromAccount: transferRequest.fromAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                toAccount: transferRequest.toAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                amount: transferRequest.amount,</span></span>
<span class="line"><span class="__shiki_140thh">                currency: transferRequest.currency,</span></span>
<span class="line"><span class="__shiki_140thh">                description: transferRequest.description,</span></span>
<span class="line"><span class="__shiki_140thh">                status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: transferTime,</span></span>
<span class="line"><span class="__shiki_140thh">                metadata: {</span></span>
<span class="line"><span class="__shiki_140thh">                    ip: transferRequest.ip,</span></span>
<span class="line"><span class="__shiki_140thh">                    userAgent: transferRequest.userAgent,</span></span>
<span class="line"><span class="__shiki_140thh">                    sessionId: transferRequest.sessionId</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                transactionRecord,</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 5. 更新统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateStatistics</span><span class="__shiki_140thh">(transferRequest, transferTime, session);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录成功日志</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;transfer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                status: </span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                duration,</span></span>
<span class="line"><span class="__shiki_140thh">                operations: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                collections: [</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;statistics&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 发送通知（异步，不在事务中）</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendNotifications</span><span class="__shiki_140thh">(transferRequest, transactionId).</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(console.error);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: transferTime,</span></span>
<span class="line"><span class="__shiki_140thh">                newBalance: fromAccount.balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> transferRequest.amount</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录错误信息</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transfer failed:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (session </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">inTransaction</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (abortError) {</span></span>
<span class="line"><span class="__shiki_140thh">                    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to abort transaction:&quot;</span><span class="__shiki_140thh">, abortError);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录失败日志</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">                type: </span><span class="__shiki_mdbnqw">&quot;transfer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                status: </span><span class="__shiki_mdbnqw">&quot;failed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                duration,</span></span>
<span class="line"><span class="__shiki_140thh">                error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">                operations: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                collections: []</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (session) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> updateStatistics</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timestamp</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bank&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新发送方统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;statistics&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            { </span></span>
<span class="line"><span class="__shiki_140thh">                accountNumber: transferRequest.fromAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                date: { </span></span>
<span class="line"><span class="__shiki_140thh">                    $dateToString: { format: </span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d&quot;</span><span class="__shiki_140thh">, date: timestamp }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                $inc: {</span></span>
<span class="line"><span class="__shiki_140thh">                    transferCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    totalSent: transferRequest.amount,</span></span>
<span class="line"><span class="__shiki_140thh">                    dailySent: transferRequest.amount</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                $setOnInsert: {</span></span>
<span class="line"><span class="__shiki_140thh">                    date: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(timestamp.</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;T&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            { session, upsert: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新接收方统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;statistics&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            { </span></span>
<span class="line"><span class="__shiki_140thh">                accountNumber: transferRequest.toAccount,</span></span>
<span class="line"><span class="__shiki_140thh">                date: { </span></span>
<span class="line"><span class="__shiki_140thh">                    $dateToString: { format: </span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d&quot;</span><span class="__shiki_140thh">, date: timestamp }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                $inc: {</span></span>
<span class="line"><span class="__shiki_140thh">                    receiveCount: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    totalReceived: transferRequest.amount,</span></span>
<span class="line"><span class="__shiki_140thh">                    dailyReceived: transferRequest.amount</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                $setOnInsert: {</span></span>
<span class="line"><span class="__shiki_140thh">                    date: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(timestamp.</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;T&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            { session, upsert: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> logTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">logEntry</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;monitoring&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction_logs&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">                ...</span><span class="__shiki_140thh">logEntry,</span></span>
<span class="line"><span class="__shiki_140thh">                loggedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">            console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Failed to log transaction:&quot;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> sendNotifications</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送邮件通知</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (transferRequest.sendEmailReceipt) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendEmailReceipt</span><span class="__shiki_140thh">(transferRequest, transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送推送通知</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (transferRequest.sendPushNotification) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendPushNotification</span><span class="__shiki_140thh">(transferRequest, transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新实时仪表板</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateRealTimeDashboard</span><span class="__shiki_140thh">(transferRequest, transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> sendEmailReceipt</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实现邮件发送逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Sending email receipt for transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> sendPushNotification</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实现推送通知逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Sending push notification for transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> updateRealTimeDashboard</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transferRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新实时监控仪表板</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Updating dashboard for transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> getTransactionHistory</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accountNumber</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bank&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            $or: [</span></span>
<span class="line"><span class="__shiki_140thh">                { fromAccount: accountNumber },</span></span>
<span class="line"><span class="__shiki_140thh">                { toAccount: accountNumber }</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (options.startDate) {</span></span>
<span class="line"><span class="__shiki_140thh">            query.timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.timestamp </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">            query.timestamp.$gte </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.startDate;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (options.endDate) {</span></span>
<span class="line"><span class="__shiki_140thh">            query.timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.timestamp </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">            query.timestamp.$lte </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.endDate;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (options.type) {</span></span>
<span class="line"><span class="__shiki_140thh">            query.type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.type;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> cursor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(options.limit </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">skip</span><span class="__shiki_140thh">(options.skip </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用事务确保一致的读取</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> cursor.</span><span class="__shiki_1t8gfj">session</span><span class="__shiki_140thh">(session).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> getAccountSummary</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">accountNumber</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bank&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 获取账户信息</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accounts&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    { accountNumber },</span></span>
<span class="line"><span class="__shiki_140thh">                    { session }</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">account) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Account not found&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 获取今日交易统计</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> today</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                today.</span><span class="__shiki_1t8gfj">setHours</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">todayStats</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">recentTransactions</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                    db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                        { $match: { </span></span>
<span class="line"><span class="__shiki_140thh">                            fromAccount: accountNumber,</span></span>
<span class="line"><span class="__shiki_140thh">                            timestamp: { $gte: today },</span></span>
<span class="line"><span class="__shiki_140thh">                            status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        }},</span></span>
<span class="line"><span class="__shiki_140thh">                        { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                            _id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                            count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                            totalAmount: { $sum: </span><span class="__shiki_mdbnqw">&quot;$amount&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                        }}</span></span>
<span class="line"><span class="__shiki_140thh">                    ], { session }).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactions&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        .</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">                            $or: [</span></span>
<span class="line"><span class="__shiki_140thh">                                { fromAccount: accountNumber },</span></span>
<span class="line"><span class="__shiki_140thh">                                { toAccount: accountNumber }</span></span>
<span class="line"><span class="__shiki_140thh">                            ]</span></span>
<span class="line"><span class="__shiki_140thh">                        })</span></span>
<span class="line"><span class="__shiki_140thh">                        .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">                        .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        .</span><span class="__shiki_1t8gfj">session</span><span class="__shiki_140thh">(session)</span></span>
<span class="line"><span class="__shiki_140thh">                        .</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                ]);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    account,</span></span>
<span class="line"><span class="__shiki_140thh">                    today: {</span></span>
<span class="line"><span class="__shiki_140thh">                        transactionCount: todayStats[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.count </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        totalAmount: todayStats[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]?.totalAmount </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    recentTransactions</span></span>
<span class="line"><span class="__shiki_140thh">                };</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-电商订单系统" tabindex="-1">6.2 电商订单系统 <a class="header-anchor" href="#_6-2-电商订单系统" aria-label="Permalink to &quot;6.2 电商订单系统&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 电商订单处理系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ECommerceOrderSystem</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> MongoClient</span><span class="__shiki_140thh">(process.env.</span><span class="__shiki_dzsirb">MONGODB_URI</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            maxPoolSize: </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            minPoolSize: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            maxIdleTimeMS: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            socketTimeoutMS: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            connectTimeoutMS: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            retryWrites: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            retryReads: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            readPreference: </span><span class="__shiki_mdbnqw">&#39;secondaryPreferred&#39;</span><span class="__shiki_21nrsd">  // 读优先从节点</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.orderSagas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// Saga模式管理长事务</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.circuitBreaker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CircuitBreaker</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> placeOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> sagaId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`ORDER-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}-\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用Saga模式处理长事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> saga</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> OrderSaga</span><span class="__shiki_140thh">(sagaId);</span></span>
<span class="line"><span class="__shiki_140thh">        saga.orderItems </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orderData.items;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 存储Saga实例以便后续查询</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.orderSagas.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(sagaId, saga);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> saga.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (result) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 记录成功</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logOrderEvent</span><span class="__shiki_140thh">(sagaId, </span><span class="__shiki_mdbnqw">&#39;order_completed&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                    orderData,</span></span>
<span class="line"><span class="__shiki_140thh">                    completedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 清理（保留一段时间供查询）</span></span>
<span class="line"><span class="__shiki_1t8gfj">                setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">                    this</span><span class="__shiki_140thh">.orderSagas.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(sagaId);</span></span>
<span class="line"><span class="__shiki_140thh">                }, </span><span class="__shiki_dzsirb">24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 24小时后清理</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                success: result,</span></span>
<span class="line"><span class="__shiki_140thh">                orderId: sagaId,</span></span>
<span class="line"><span class="__shiki_140thh">                sagaStatus: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录失败</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logOrderEvent</span><span class="__shiki_140thh">(sagaId, </span><span class="__shiki_mdbnqw">&#39;order_failed&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                orderData,</span></span>
<span class="line"><span class="__shiki_140thh">                error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">                failedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 保留失败的Saga供调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">            setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.orderSagas.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(sagaId);</span></span>
<span class="line"><span class="__shiki_140thh">            }, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 7天后清理</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                orderId: sagaId,</span></span>
<span class="line"><span class="__shiki_140thh">                sagaStatus: </span><span class="__shiki_mdbnqw">&#39;failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">paymentData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用断路器模式保护外部服务调用</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.circuitBreaker.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 这里调用支付网关</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> paymentResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">callPaymentGateway</span><span class="__shiki_140thh">(paymentData);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">paymentResult.success) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Payment failed: \${</span><span class="__shiki_140thh">paymentResult</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录支付成功（使用短事务）</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">withTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ecommerce&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 更新订单状态</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        { _id: orderId },</span></span>
<span class="line"><span class="__shiki_140thh">                        { </span></span>
<span class="line"><span class="__shiki_140thh">                            $set: { </span></span>
<span class="line"><span class="__shiki_140thh">                                paymentStatus: </span><span class="__shiki_mdbnqw">&quot;paid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                paymentId: paymentResult.paymentId,</span></span>
<span class="line"><span class="__shiki_140thh">                                paidAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        },</span></span>
<span class="line"><span class="__shiki_140thh">                        { session }</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 记录支付历史</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;payment_history&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                        orderId,</span></span>
<span class="line"><span class="__shiki_140thh">                        paymentId: paymentResult.paymentId,</span></span>
<span class="line"><span class="__shiki_140thh">                        amount: paymentData.amount,</span></span>
<span class="line"><span class="__shiki_140thh">                        method: paymentData.method,</span></span>
<span class="line"><span class="__shiki_140thh">                        status: </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> paymentResult;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> updateInventory</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用乐观并发控制更新库存</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ecommerce&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 获取当前订单</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ _id: orderId });</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">order) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Order not found&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">startSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                    writeConcern: { w: </span><span class="__shiki_mdbnqw">&quot;majority&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 检查并更新每个商品的库存</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> order.items) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    const</span><span class="__shiki_dzsirb"> product</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;products&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        { _id: item.productId },</span></span>
<span class="line"><span class="__shiki_140thh">                        { session }</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">product) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Product \${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">productId</span><span class="__shiki_mdbnqw">} not found\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (product.stock </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> item.quantity) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Insufficient stock for \${</span><span class="__shiki_140thh">product</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 更新库存（带版本检查）</span></span>
<span class="line"><span class="__shiki_1itgoe">                    const</span><span class="__shiki_dzsirb"> updateResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;products&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                        { </span></span>
<span class="line"><span class="__shiki_140thh">                            _id: item.productId,</span></span>
<span class="line"><span class="__shiki_140thh">                            version: product.version  </span><span class="__shiki_21nrsd">// 乐观锁</span></span>
<span class="line"><span class="__shiki_140thh">                        },</span></span>
<span class="line"><span class="__shiki_140thh">                        { </span></span>
<span class="line"><span class="__shiki_140thh">                            $inc: { </span></span>
<span class="line"><span class="__shiki_140thh">                                stock: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">                                reserved: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity</span></span>
<span class="line"><span class="__shiki_140thh">                            },</span></span>
<span class="line"><span class="__shiki_140thh">                            $set: { </span></span>
<span class="line"><span class="__shiki_140thh">                                lastRestocked: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                                version: product.version </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        },</span></span>
<span class="line"><span class="__shiki_140thh">                        { session }</span></span>
<span class="line"><span class="__shiki_140thh">                    );</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (updateResult.modifiedCount </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 版本冲突，重试</span></span>
<span class="line"><span class="__shiki_1itgoe">                        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Version conflict, retrying&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 记录库存变更</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inventory_logs&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                        productId: item.productId,</span></span>
<span class="line"><span class="__shiki_140thh">                        orderId,</span></span>
<span class="line"><span class="__shiki_140thh">                        change: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">                        newStock: product.stock </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">                        type: </span><span class="__shiki_mdbnqw">&quot;sale&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 更新订单状态</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    { _id: orderId },</span></span>
<span class="line"><span class="__shiki_140thh">                    { </span></span>
<span class="line"><span class="__shiki_140thh">                        $set: { </span></span>
<span class="line"><span class="__shiki_140thh">                            inventoryStatus: </span><span class="__shiki_mdbnqw">&quot;updated&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                            inventoryUpdatedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    { session }</span></span>
<span class="line"><span class="__shiki_140thh">                );</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Inventory updated for order \${</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Version conflict&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxRetries) {</span></span>
<span class="line"><span class="__shiki_140thh">                    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Retry \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">} for order \${</span><span class="__shiki_140thh">orderId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> attempt);  </span><span class="__shiki_21nrsd">// 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">                    continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">endSession</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ms</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, ms));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> logOrderEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">eventType</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ecommerce&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order_events&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">insertOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            orderId,</span></span>
<span class="line"><span class="__shiki_140thh">            eventType,</span></span>
<span class="line"><span class="__shiki_140thh">            data,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            server: process.env.</span><span class="__shiki_dzsirb">SERVER_ID</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &quot;unknown&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> getOrderStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orderId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ecommerce&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用会话确保一致的读取</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                { _id: orderId },</span></span>
<span class="line"><span class="__shiki_140thh">                { session }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">order) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 获取相关事件</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> events</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order_events&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ orderId })</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">({ timestamp: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">session</span><span class="__shiki_140thh">(session)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 获取支付信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> payment</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;payment_history&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ orderId }, { session });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查Saga状态（如果还在处理中）</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> saga</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderSagas.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(orderId);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                order,</span></span>
<span class="line"><span class="__shiki_140thh">                events,</span></span>
<span class="line"><span class="__shiki_140thh">                payment,</span></span>
<span class="line"><span class="__shiki_140thh">                sagaStatus: saga </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &#39;processing&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;completed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量订单处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> processBatchOrders</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">orders</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分批处理以避免过载</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> orders.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> batchSize) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> batch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> orders.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(i, i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batchSize);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 并行处理批次中的订单（有限并发）</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> batchResults</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">allSettled</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                batch.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">order</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">placeOrder</span><span class="__shiki_140thh">(order))</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录结果</span></span>
<span class="line"><span class="__shiki_140thh">            batchResults.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">result</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> batch[index];</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (result.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;fulfilled&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                        orderId: order.orderId,</span></span>
<span class="line"><span class="__shiki_140thh">                        success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        sagaId: result.value.orderId</span></span>
<span class="line"><span class="__shiki_140thh">                    });</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                        orderId: order.orderId,</span></span>
<span class="line"><span class="__shiki_140thh">                        success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                        error: result.reason.message</span></span>
<span class="line"><span class="__shiki_140thh">                    });</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 批次间延迟以避免系统过载</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batchSize </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> orders.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 订单报表生成</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> generateOrderReport</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">startDate</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">endDate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> db</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ecommerce&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.client.</span><span class="__shiki_1t8gfj">withSession</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">session</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 使用事务确保报表的一致性</span></span>
<span class="line"><span class="__shiki_140thh">            session.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                readConcern: { level: </span><span class="__shiki_mdbnqw">&quot;snapshot&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                readPreference: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> report</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">collection</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">                    { $match: {</span></span>
<span class="line"><span class="__shiki_140thh">                        createdAt: { $gte: startDate, $lte: endDate }</span></span>
<span class="line"><span class="__shiki_140thh">                    }},</span></span>
<span class="line"><span class="__shiki_140thh">                    { $facet: {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 总体统计</span></span>
<span class="line"><span class="__shiki_140thh">                        summary: [</span></span>
<span class="line"><span class="__shiki_140thh">                            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                                _id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                totalOrders: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                totalRevenue: { $sum: </span><span class="__shiki_mdbnqw">&quot;$totalAmount&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                avgOrderValue: { $avg: </span><span class="__shiki_mdbnqw">&quot;$totalAmount&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                            }}</span></span>
<span class="line"><span class="__shiki_140thh">                        ],</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 按状态分组</span></span>
<span class="line"><span class="__shiki_140thh">                        byStatus: [</span></span>
<span class="line"><span class="__shiki_140thh">                            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                                _id: </span><span class="__shiki_mdbnqw">&quot;$status&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                count: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                totalRevenue: { $sum: </span><span class="__shiki_mdbnqw">&quot;$totalAmount&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                            }},</span></span>
<span class="line"><span class="__shiki_140thh">                            { $sort: { count: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">                        ],</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 按时间分组（每日）</span></span>
<span class="line"><span class="__shiki_140thh">                        dailyTrend: [</span></span>
<span class="line"><span class="__shiki_140thh">                            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                                _id: { $dateToString: { format: </span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d&quot;</span><span class="__shiki_140thh">, date: </span><span class="__shiki_mdbnqw">&quot;$createdAt&quot;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                                orders: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                revenue: { $sum: </span><span class="__shiki_mdbnqw">&quot;$totalAmount&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                avgOrderValue: { $avg: </span><span class="__shiki_mdbnqw">&quot;$totalAmount&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                            }},</span></span>
<span class="line"><span class="__shiki_140thh">                            { $sort: { _id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">                        ],</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 热门商品</span></span>
<span class="line"><span class="__shiki_140thh">                        topProducts: [</span></span>
<span class="line"><span class="__shiki_140thh">                            { $unwind: </span><span class="__shiki_mdbnqw">&quot;$items&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                                _id: </span><span class="__shiki_mdbnqw">&quot;$items.productId&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                productName: { $first: </span><span class="__shiki_mdbnqw">&quot;$items.name&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                quantitySold: { $sum: </span><span class="__shiki_mdbnqw">&quot;$items.quantity&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                revenue: { $sum: { $multiply: [</span><span class="__shiki_mdbnqw">&quot;$items.price&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;$items.quantity&quot;</span><span class="__shiki_140thh">] } }</span></span>
<span class="line"><span class="__shiki_140thh">                            }},</span></span>
<span class="line"><span class="__shiki_140thh">                            { $sort: { revenue: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                            { $limit: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                        ],</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 客户统计</span></span>
<span class="line"><span class="__shiki_140thh">                        customerStats: [</span></span>
<span class="line"><span class="__shiki_140thh">                            { $group: {</span></span>
<span class="line"><span class="__shiki_140thh">                                _id: </span><span class="__shiki_mdbnqw">&quot;$customerId&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                orderCount: { $sum: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                totalSpent: { $sum: </span><span class="__shiki_mdbnqw">&quot;$totalAmount&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                firstOrder: { $min: </span><span class="__shiki_mdbnqw">&quot;$createdAt&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">                                lastOrder: { $max: </span><span class="__shiki_mdbnqw">&quot;$createdAt&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                            }},</span></span>
<span class="line"><span class="__shiki_140thh">                            { $sort: { totalSpent: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">                            { $limit: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">                        ]</span></span>
<span class="line"><span class="__shiki_140thh">                    }}</span></span>
<span class="line"><span class="__shiki_140thh">                ], { session }).</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> report[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 断路器模式实现</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CircuitBreaker</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">failureThreshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">resetTimeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.failureThreshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> failureThreshold;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.resetTimeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> resetTimeout;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.failureCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.lastFailureTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CLOSED&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// CLOSED, OPEN, HALF_OPEN</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;OPEN&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查是否应该进入半开状态</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.lastFailureTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.resetTimeout) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;HALF_OPEN&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Circuit breaker transitioning to HALF_OPEN&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Circuit breaker is OPEN&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 成功调用，重置断路器</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;HALF_OPEN&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">reset</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.failureCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.failureCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.lastFailureTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.failureCount </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.failureThreshold) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;OPEN&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Circuit breaker OPENED after \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">failureCount</span><span class="__shiki_mdbnqw">} failures\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    reset</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.failureCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.lastFailureTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CLOSED&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Circuit breaker reset to CLOSED&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    getStatus</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            state: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.state,</span></span>
<span class="line"><span class="__shiki_140thh">            failureCount: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.failureCount,</span></span>
<span class="line"><span class="__shiki_140thh">            lastFailureTime: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.lastFailureTime,</span></span>
<span class="line"><span class="__shiki_140thh">            timeSinceLastFailure: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.lastFailureTime </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.lastFailureTime </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-总结与最佳实践" tabindex="-1">7. 总结与最佳实践 <a class="header-anchor" href="#_7-总结与最佳实践" aria-label="Permalink to &quot;7. 总结与最佳实践&quot;">​</a></h2><h3 id="_7-1-核心原则总结" tabindex="-1">7.1 核心原则总结 <a class="header-anchor" href="#_7-1-核心原则总结" aria-label="Permalink to &quot;7.1 核心原则总结&quot;">​</a></h3><ol><li><p><strong>事务设计原则</strong>：</p><ul><li>保持事务简短（理想情况下&lt;1秒）</li><li>最小化事务内操作数量</li><li>尽早失败，快速回滚</li><li>设计幂等操作以便重试</li></ul></li><li><p><strong>性能优化原则</strong>：</p><ul><li>为事务查询创建合适的索引</li><li>使用适当的读写关注级别</li><li>批量操作减少网络往返</li><li>监控和调整缓存大小</li></ul></li><li><p><strong>可靠性原则</strong>：</p><ul><li>实现完善的错误处理和重试逻辑</li><li>使用Saga模式处理长事务</li><li>实施断路器模式保护外部调用</li><li>建立全面的监控和告警</li></ul></li></ol><h3 id="_7-2-部署与配置建议" tabindex="-1">7.2 部署与配置建议 <a class="header-anchor" href="#_7-2-部署与配置建议" aria-label="Permalink to &quot;7.2 部署与配置建议&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 生产环境MongoDB事务配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">systemLog</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  destination</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">file</span></span>
<span class="line"><span class="__shiki_17hn0y">  path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/var/log/mongodb/mongod.log&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  logAppend</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  verbosity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  dbPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/var/lib/mongodb&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  journal</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    commitIntervalMs</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">  # 更频繁的日志提交提高持久性</span></span>
<span class="line"><span class="__shiki_17hn0y">  engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;wiredTiger&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  wiredTiger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    engineConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      cacheSizeGB</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8</span><span class="__shiki_21nrsd">  # 根据内存调整，建议至少4GB</span></span>
<span class="line"><span class="__shiki_17hn0y">      journalCompressor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      checkpoint</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(sync_period=30s)</span><span class="__shiki_21nrsd">  # 更频繁的检查点</span></span>
<span class="line"><span class="__shiki_17hn0y">    collectionConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      blockCompressor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;snappy&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    indexConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      prefixCompression</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">replication</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  oplogSizeMB</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2048</span><span class="__shiki_21nrsd">  # 建议至少1GB，事务密集型应用建议更大</span></span>
<span class="line"><span class="__shiki_17hn0y">  replSetName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rs0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  enableMajorityReadConcern</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">sharding</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  clusterRole</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;shardsvr&quot;</span><span class="__shiki_21nrsd">  # 如果是分片集群</span></span>
<span class="line"><span class="__shiki_17hn0y">  archiveMovedChunks</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 事务相关参数</span></span>
<span class="line"><span class="__shiki_17hn0y">setParameter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 事务超时（毫秒）</span></span>
<span class="line"><span class="__shiki_17hn0y">  transactionLifetimeLimitSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 锁超时（毫秒）</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxTransactionLockRequestTimeoutMillis</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 启用可重试写入</span></span>
<span class="line"><span class="__shiki_17hn0y">  enableRetryableWrites</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 启用可重试读取</span></span>
<span class="line"><span class="__shiki_17hn0y">  retryReads</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 日志详细级别</span></span>
<span class="line"><span class="__shiki_17hn0y">  logComponentVerbosity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    transaction</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">    storage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">    replication</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 操作限制</span></span>
<span class="line"><span class="__shiki_17hn0y">operationProfiling</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">slowOp</span></span>
<span class="line"><span class="__shiki_17hn0y">  slowOpThresholdMs</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">  rateLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span></code></pre></div><h3 id="_7-3-监控检查清单" tabindex="-1">7.3 监控检查清单 <a class="header-anchor" href="#_7-3-监控检查清单" aria-label="Permalink to &quot;7.3 监控检查清单&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务健康检查清单</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> transactionHealthChecklist</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 每日检查项</span></span>
<span class="line"><span class="__shiki_140thh">    daily: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查事务失败率（应&lt;1%）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查平均事务延迟（应&lt;500ms）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查长时间运行的事务（&gt;10s）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查锁等待时间&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查缓存命中率（应&gt;90%）&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查连接池使用率&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查磁盘I/O延迟&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 每周检查项</span></span>
<span class="line"><span class="__shiki_140thh">    weekly: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;分析事务性能趋势&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;审查错误日志和异常模式&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;优化慢查询和索引&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;检查数据碎片化程度&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;验证备份和恢复流程&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;审查安全设置和访问控制&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;更新监控仪表板和告警规则&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 每月检查项</span></span>
<span class="line"><span class="__shiki_140thh">    monthly: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;容量规划和扩展评估&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;性能基准测试&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;灾难恢复演练&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;安全审计和合规性检查&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;软件版本更新评估&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;架构评审和优化&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;团队培训和知识分享&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 警报阈值</span></span>
<span class="line"><span class="__shiki_140thh">    alertThresholds: {</span></span>
<span class="line"><span class="__shiki_140thh">        critical: {</span></span>
<span class="line"><span class="__shiki_140thh">            transactionFailureRate: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 5%</span></span>
<span class="line"><span class="__shiki_140thh">            averageLatency: </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 2秒</span></span>
<span class="line"><span class="__shiki_140thh">            cacheMissRate: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,              </span><span class="__shiki_21nrsd">// 20%</span></span>
<span class="line"><span class="__shiki_140thh">            connectionPoolUsage: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 90%</span></span>
<span class="line"><span class="__shiki_140thh">            diskQueueLength: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        warning: {</span></span>
<span class="line"><span class="__shiki_140thh">            transactionFailureRate: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 1%</span></span>
<span class="line"><span class="__shiki_140thh">            averageLatency: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 1秒</span></span>
<span class="line"><span class="__shiki_140thh">            cacheMissRate: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,              </span><span class="__shiki_21nrsd">// 10%</span></span>
<span class="line"><span class="__shiki_140thh">            connectionPoolUsage: </span><span class="__shiki_dzsirb">75</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 75%</span></span>
<span class="line"><span class="__shiki_140thh">            diskQueueLength: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_7-4-故障排除指南" tabindex="-1">7.4 故障排除指南 <a class="header-anchor" href="#_7-4-故障排除指南" aria-label="Permalink to &quot;7.4 故障排除指南&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># MongoDB事务故障排除指南</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 常见问题及解决方案</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 1. 事务提交失败</span></span>
<span class="line"><span class="__shiki_28tyc3">**症状**</span><span class="__shiki_140thh">：</span><span class="__shiki_dzsirb">\`WriteConflict\`</span><span class="__shiki_140thh"> 或 </span><span class="__shiki_dzsirb">\`Transaction aborted\`</span><span class="__shiki_140thh"> 错误</span></span>
<span class="line"><span class="__shiki_28tyc3">**可能原因**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 过多并发事务修改相同数据</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 事务执行时间过长</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 网络分区或节点故障</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  1.</span><span class="__shiki_140thh"> 实现指数退避重试逻辑</span></span>
<span class="line"><span class="__shiki_1jdh33">  2.</span><span class="__shiki_140thh"> 优化事务设计，减少冲突</span></span>
<span class="line"><span class="__shiki_1jdh33">  3.</span><span class="__shiki_140thh"> 检查网络连接和副本集状态</span></span>
<span class="line"><span class="__shiki_1jdh33">  4.</span><span class="__shiki_140thh"> 考虑使用乐观并发控制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 2. 事务性能差</span></span>
<span class="line"><span class="__shiki_28tyc3">**症状**</span><span class="__shiki_140thh">：高延迟，低吞吐量</span></span>
<span class="line"><span class="__shiki_28tyc3">**可能原因**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 缺少适当索引</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 事务范围过大</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 锁竞争激烈</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 硬件资源不足</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  1.</span><span class="__shiki_140thh"> 分析查询模式，添加缺失索引</span></span>
<span class="line"><span class="__shiki_1jdh33">  2.</span><span class="__shiki_140thh"> 拆分大事务为多个小事务</span></span>
<span class="line"><span class="__shiki_1jdh33">  3.</span><span class="__shiki_140thh"> 使用读偏好从节点分担读负载</span></span>
<span class="line"><span class="__shiki_1jdh33">  4.</span><span class="__shiki_140thh"> 升级硬件或调整配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 3. 内存不足错误</span></span>
<span class="line"><span class="__shiki_28tyc3">**症状**</span><span class="__shiki_140thh">：</span><span class="__shiki_dzsirb">\`OutOfMemory\`</span><span class="__shiki_140thh"> 或 </span><span class="__shiki_dzsirb">\`Too many open files\`</span></span>
<span class="line"><span class="__shiki_28tyc3">**可能原因**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 事务数据量过大</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 缓存配置不合理</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 连接泄漏</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  1.</span><span class="__shiki_140thh"> 增加WiredTiger缓存大小</span></span>
<span class="line"><span class="__shiki_1jdh33">  2.</span><span class="__shiki_140thh"> 优化查询减少内存使用</span></span>
<span class="line"><span class="__shiki_1jdh33">  3.</span><span class="__shiki_140thh"> 检查并修复连接泄漏</span></span>
<span class="line"><span class="__shiki_1jdh33">  4.</span><span class="__shiki_140thh"> 增加系统内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">### 4. 复制延迟问题</span></span>
<span class="line"><span class="__shiki_28tyc3">**症状**</span><span class="__shiki_140thh">：从节点数据落后，读不到最新数据</span></span>
<span class="line"><span class="__shiki_28tyc3">**可能原因**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 网络延迟</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 从节点负载过高</span></span>
<span class="line"><span class="__shiki_1jdh33">  -</span><span class="__shiki_140thh"> 主节点写入压力大</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">  1.</span><span class="__shiki_140thh"> 优化网络配置</span></span>
<span class="line"><span class="__shiki_1jdh33">  2.</span><span class="__shiki_140thh"> 增加从节点或升级硬件</span></span>
<span class="line"><span class="__shiki_1jdh33">  3.</span><span class="__shiki_140thh"> 使用写关注平衡性能和数据安全</span></span>
<span class="line"><span class="__shiki_1jdh33">  4.</span><span class="__shiki_140thh"> 监控并优化主节点性能</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 诊断步骤</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">1.</span><span class="__shiki_28tyc3"> **收集信息**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 错误信息和堆栈跟踪</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> MongoDB日志文件</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 系统资源使用情况</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 事务执行时间和模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">2.</span><span class="__shiki_28tyc3"> **分析原因**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 使用</span><span class="__shiki_dzsirb">\`explain()\`</span><span class="__shiki_140thh">分析查询计划</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 检查当前操作和锁状态</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 分析系统性能指标</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 审查应用程序代码</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">3.</span><span class="__shiki_28tyc3"> **实施修复**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 应用配置更改</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 优化查询和索引</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 调整应用程序逻辑</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 升级硬件或集群规模</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">4.</span><span class="__shiki_28tyc3"> **验证效果**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 监控关键指标改进</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 执行负载测试</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 观察生产环境表现</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 记录问题和解决方案</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 预防措施</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">1.</span><span class="__shiki_28tyc3"> **设计阶段**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 合理设计数据模型</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 规划索引策略</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 设计事务边界</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">2.</span><span class="__shiki_28tyc3"> **开发阶段**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 实现完善的错误处理</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 添加详细的日志记录</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 进行性能测试</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">3.</span><span class="__shiki_28tyc3"> **部署阶段**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 配置适当的监控</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 设置合理的告警</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 准备回滚计划</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">4.</span><span class="__shiki_28tyc3"> **运维阶段**</span><span class="__shiki_140thh">：</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 定期健康检查</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 持续性能优化</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 及时应用补丁</span></span>
<span class="line"><span class="__shiki_1jdh33">   -</span><span class="__shiki_140thh"> 定期备份验证</span></span></code></pre></div><p>通过本指南，您应该能够深入理解MongoDB事务的各个方面，从基本概念到高级特性，从配置优化到故障排除。事务是构建可靠、一致应用程序的关键组件，正确使用和理解MongoDB事务将帮助您构建更健壮的应用程序系统。</p>`,90)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
