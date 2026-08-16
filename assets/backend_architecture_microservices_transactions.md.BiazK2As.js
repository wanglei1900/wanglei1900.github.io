import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const k=JSON.parse('{"title":"🔄 微服务架构 - 分布式事务 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/architecture/microservices/transactions.md","filePath":"backend/architecture/microservices/transactions.md"}'),_={name:"backend/architecture/microservices/transactions.md"};function t(l,s,h,e,c,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="🔄-微服务架构-分布式事务-完整学习笔记" tabindex="-1">🔄 微服务架构 - 分布式事务 完整学习笔记 <a class="header-anchor" href="#🔄-微服务架构-分布式事务-完整学习笔记" aria-label="Permalink to &quot;🔄 微服务架构 - 分布式事务 完整学习笔记&quot;">​</a></h1><h2 id="_1-分布式事务基础概念" tabindex="-1">1. 分布式事务基础概念 <a class="header-anchor" href="#_1-分布式事务基础概念" aria-label="Permalink to &quot;1. 分布式事务基础概念&quot;">​</a></h2><h3 id="_1-1-事务的acid原则" tabindex="-1">1.1 事务的ACID原则 <a class="header-anchor" href="#_1-1-事务的acid原则" aria-label="Permalink to &quot;1.1 事务的ACID原则&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>描述</th><th>分布式环境挑战</th></tr></thead><tbody><tr><td><strong>原子性</strong> (Atomicity)</td><td>事务的所有操作要么全部完成，要么全部不完成</td><td>网络分区、节点故障</td></tr><tr><td><strong>一致性</strong> (Consistency)</td><td>事务执行前后，数据库从一个一致状态变为另一个一致状态</td><td>数据分散在不同节点</td></tr><tr><td><strong>隔离性</strong> (Isolation)</td><td>并发事务之间相互隔离</td><td>全局锁性能瓶颈</td></tr><tr><td><strong>持久性</strong> (Durability)</td><td>事务提交后，对数据的修改是永久性的</td><td>多节点数据同步</td></tr></tbody></table><h3 id="_1-2-cap理论与base理论" tabindex="-1">1.2 CAP理论与BASE理论 <a class="header-anchor" href="#_1-2-cap理论与base理论" aria-label="Permalink to &quot;1.2 CAP理论与BASE理论&quot;">​</a></h3><h4 id="_1-2-1-cap理论" tabindex="-1">1.2.1 CAP理论 <a class="header-anchor" href="#_1-2-1-cap理论" aria-label="Permalink to &quot;1.2.1 CAP理论&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[CAP理论] --&gt; B[一致性 Consistency]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[可用性 Availability]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[分区容错性 Partition Tolerance]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[所有节点看到的数据是一致的]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F[每个请求都能获得响应]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[系统在网络分区时仍能工作]</span></span></code></pre></div><p><strong>CAP不可兼得</strong>：在网络分区发生时，必须在一致性和可用性之间做出选择。</p><h4 id="_1-2-2-base理论" tabindex="-1">1.2.2 BASE理论 <a class="header-anchor" href="#_1-2-2-base理论" aria-label="Permalink to &quot;1.2.2 BASE理论&quot;">​</a></h4><ul><li><strong>Basically Available</strong>（基本可用）：系统出现故障时，允许损失部分可用性</li><li><strong>Soft state</strong>（软状态）：允许系统存在中间状态</li><li><strong>Eventually consistent</strong>（最终一致性）：经过一段时间后，数据会达到一致状态</li></ul><h2 id="_2-分布式事务解决方案分类" tabindex="-1">2. 分布式事务解决方案分类 <a class="header-anchor" href="#_2-分布式事务解决方案分类" aria-label="Permalink to &quot;2. 分布式事务解决方案分类&quot;">​</a></h2><h3 id="_2-1-强一致性方案" tabindex="-1">2.1 强一致性方案 <a class="header-anchor" href="#_2-1-强一致性方案" aria-label="Permalink to &quot;2.1 强一致性方案&quot;">​</a></h3><ul><li><strong>两阶段提交</strong>（2PC）</li><li><strong>三阶段提交</strong>（3PC）</li></ul><h3 id="_2-2-最终一致性方案" tabindex="-1">2.2 最终一致性方案 <a class="header-anchor" href="#_2-2-最终一致性方案" aria-label="Permalink to &quot;2.2 最终一致性方案&quot;">​</a></h3><ul><li><strong>Saga模式</strong></li><li><strong>TCC模式</strong></li><li><strong>消息事务</strong></li><li><strong>本地消息表</strong></li></ul><h2 id="_3-强一致性分布式事务" tabindex="-1">3. 强一致性分布式事务 <a class="header-anchor" href="#_3-强一致性分布式事务" aria-label="Permalink to &quot;3. 强一致性分布式事务&quot;">​</a></h2><h3 id="_3-1-两阶段提交-2pc" tabindex="-1">3.1 两阶段提交（2PC） <a class="header-anchor" href="#_3-1-两阶段提交-2pc" aria-label="Permalink to &quot;3.1 两阶段提交（2PC）&quot;">​</a></h3><h4 id="_3-1-1-2pc执行流程" tabindex="-1">3.1.1 2PC执行流程 <a class="header-anchor" href="#_3-1-1-2pc执行流程" aria-label="Permalink to &quot;3.1.1 2PC执行流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Coordinator</span></span>
<span class="line"><span class="__shiki_140thh">    participant P1 as Participant1</span></span>
<span class="line"><span class="__shiki_140thh">    participant P2 as Participant2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C: 第一阶段：准备阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P1: 预提交请求</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P2: 预提交请求</span></span>
<span class="line"><span class="__shiki_140thh">    P1--&gt;&gt;C: 预提交成功</span></span>
<span class="line"><span class="__shiki_140thh">    P2--&gt;&gt;C: 预提交成功</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C: 第二阶段：提交阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P1: 提交命令</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P2: 提交命令</span></span>
<span class="line"><span class="__shiki_140thh">    P1--&gt;&gt;C: 提交完成</span></span>
<span class="line"><span class="__shiki_140thh">    P2--&gt;&gt;C: 提交完成</span></span></code></pre></div><h4 id="_3-1-2-2pc详细阶段" tabindex="-1">3.1.2 2PC详细阶段 <a class="header-anchor" href="#_3-1-2-2pc详细阶段" aria-label="Permalink to &quot;3.1.2 2PC详细阶段&quot;">​</a></h4><p><strong>第一阶段：准备阶段</strong></p><ol><li>协调者向所有参与者发送prepare请求</li><li>参与者执行事务操作，写入undo/redo日志</li><li>参与者锁定相关资源</li><li>参与者返回准备结果</li></ol><p><strong>第二阶段：提交阶段</strong></p><ul><li><strong>全部成功</strong>：协调者发送commit，参与者释放锁并提交</li><li><strong>任一失败</strong>：协调者发送rollback，参与者回滚</li></ul><h4 id="_3-1-3-2pc优缺点" tabindex="-1">3.1.3 2PC优缺点 <a class="header-anchor" href="#_3-1-3-2pc优缺点" aria-label="Permalink to &quot;3.1.3 2PC优缺点&quot;">​</a></h4><table tabindex="0"><thead><tr><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>强一致性保证</td><td>同步阻塞问题</td></tr><tr><td>实现相对简单</td><td>单点故障风险</td></tr><tr><td>业界标准</td><td>数据不一致风险（协调者故障）</td></tr><tr><td></td><td>性能开销大</td></tr></tbody></table><h3 id="_3-2-三阶段提交-3pc" tabindex="-1">3.2 三阶段提交（3PC） <a class="header-anchor" href="#_3-2-三阶段提交-3pc" aria-label="Permalink to &quot;3.2 三阶段提交（3PC）&quot;">​</a></h3><h4 id="_3-2-1-3pc执行流程" tabindex="-1">3.2.1 3PC执行流程 <a class="header-anchor" href="#_3-2-1-3pc执行流程" aria-label="Permalink to &quot;3.2.1 3PC执行流程&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Coordinator</span></span>
<span class="line"><span class="__shiki_140thh">    participant P as Participant</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C,P: 第一阶段：CanCommit</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P: CanCommit请求</span></span>
<span class="line"><span class="__shiki_140thh">    P--&gt;&gt;C: 响应（是/否）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C,P: 第二阶段：PreCommit</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P: PreCommit请求</span></span>
<span class="line"><span class="__shiki_140thh">    P--&gt;&gt;C: Ack响应</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C,P: 第三阶段：DoCommit</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;P: DoCommit请求</span></span>
<span class="line"><span class="__shiki_140thh">    P--&gt;&gt;C: 完成响应</span></span></code></pre></div><h4 id="_3-2-2-3pc改进点" tabindex="-1">3.2.2 3PC改进点 <a class="header-anchor" href="#_3-2-2-3pc改进点" aria-label="Permalink to &quot;3.2.2 3PC改进点&quot;">​</a></h4><ul><li><strong>引入超时机制</strong>：参与者在预提交阶段后超时会自动提交</li><li><strong>减少阻塞时间</strong>：将准备阶段拆分为CanCommit和PreCommit</li><li><strong>降低不一致风险</strong>：通过超时机制减少数据不一致窗口期</li></ul><h2 id="_4-最终一致性分布式事务" tabindex="-1">4. 最终一致性分布式事务 <a class="header-anchor" href="#_4-最终一致性分布式事务" aria-label="Permalink to &quot;4. 最终一致性分布式事务&quot;">​</a></h2><h3 id="_4-1-saga模式" tabindex="-1">4.1 Saga模式 <a class="header-anchor" href="#_4-1-saga模式" aria-label="Permalink to &quot;4.1 Saga模式&quot;">​</a></h3><h4 id="_4-1-1-saga核心概念" tabindex="-1">4.1.1 Saga核心概念 <a class="header-anchor" href="#_4-1-1-saga核心概念" aria-label="Permalink to &quot;4.1.1 Saga核心概念&quot;">​</a></h4><ul><li><strong>长事务</strong>：拆分为多个本地短事务</li><li><strong>补偿机制</strong>：每个事务对应一个补偿操作</li><li><strong>执行协调</strong>：通过事件驱动协调各个步骤</li></ul><h4 id="_4-1-2-saga执行方式" tabindex="-1">4.1.2 Saga执行方式 <a class="header-anchor" href="#_4-1-2-saga执行方式" aria-label="Permalink to &quot;4.1.2 Saga执行方式&quot;">​</a></h4><p><strong>协调式Saga</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant O as OrderSaga</span></span>
<span class="line"><span class="__shiki_140thh">    participant OS as OrderService</span></span>
<span class="line"><span class="__shiki_140thh">    participant PS as PaymentService</span></span>
<span class="line"><span class="__shiki_140thh">    participant IS as InventoryService</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    O-&gt;&gt;OS: 创建订单(T1)</span></span>
<span class="line"><span class="__shiki_140thh">    OS--&gt;&gt;O: 订单创建成功</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    O-&gt;&gt;PS: 扣减余额(T2)</span></span>
<span class="line"><span class="__shiki_140thh">    PS--&gt;&gt;O: 扣款成功</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    O-&gt;&gt;IS: 减少库存(T3)</span></span>
<span class="line"><span class="__shiki_140thh">    IS--&gt;&gt;O: 库存不足</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over O: 执行补偿操作</span></span>
<span class="line"><span class="__shiki_140thh">    O-&gt;&gt;PS: 补偿扣款(C2)</span></span>
<span class="line"><span class="__shiki_140thh">    O-&gt;&gt;OS: 补偿订单(C1)</span></span></code></pre></div><p><strong>事件驱动式Saga</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[订单服务] --&gt;|OrderCreated| B[支付服务]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|PaymentCompleted| C[库存服务]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|InventoryReserved| D[完成]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E[库存不足] --&gt;|InventoryFailed| F[支付服务]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt;|PaymentRefunded| G[订单服务]</span></span></code></pre></div><h4 id="_4-1-3-saga补偿设计原则" tabindex="-1">4.1.3 Saga补偿设计原则 <a class="header-anchor" href="#_4-1-3-saga补偿设计原则" aria-label="Permalink to &quot;4.1.3 Saga补偿设计原则&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> SagaStep</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 正向操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> process</span><span class="__shiki_140thh">(T </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> compensate</span><span class="__shiki_140thh">(T </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 补偿操作应该是幂等的</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 补偿操作应该是可交换的（顺序无关）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-tcc模式-try-confirm-cancel" tabindex="-1">4.2 TCC模式（Try-Confirm-Cancel） <a class="header-anchor" href="#_4-2-tcc模式-try-confirm-cancel" aria-label="Permalink to &quot;4.2 TCC模式（Try-Confirm-Cancel）&quot;">​</a></h3><h4 id="_4-2-1-tcc三阶段" tabindex="-1">4.2.1 TCC三阶段 <a class="header-anchor" href="#_4-2-1-tcc三阶段" aria-label="Permalink to &quot;4.2.1 TCC三阶段&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[TCC模式] --&gt; B[Try阶段]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Confirm阶段]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[Cancel阶段]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[资源预留&lt;br/&gt;冻结库存/资金]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F[实际执行&lt;br/&gt;确认操作]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G[取消释放&lt;br/&gt;释放预留资源]</span></span></code></pre></div><h4 id="_4-2-2-tcc详细流程" tabindex="-1">4.2.2 TCC详细流程 <a class="header-anchor" href="#_4-2-2-tcc详细流程" aria-label="Permalink to &quot;4.2.2 TCC详细流程&quot;">​</a></h4><p><strong>Try阶段</strong>：</p><ul><li>检查业务约束</li><li>预留必要资源</li><li>记录事务日志</li></ul><p><strong>Confirm/Cancel阶段</strong>：</p><ul><li>根据Try结果决定提交或回滚</li><li>执行真正的业务操作或补偿</li><li>必须保证幂等性</li></ul><h4 id="_4-2-3-tcc示例-电商下单" tabindex="-1">4.2.3 TCC示例：电商下单 <a class="header-anchor" href="#_4-2-3-tcc示例-电商下单" aria-label="Permalink to &quot;4.2.3 TCC示例：电商下单&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Try操作示例</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> PaymentServiceTCC</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Try: 资金预留</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryDeduct</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, BigDecimal </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查账户余额</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 冻结相应金额</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录冻结日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Confirm: 实际扣款</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> confirmDeduct</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, BigDecimal </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查冻结记录</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实际扣减余额</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新状态为已确认</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Cancel: 释放冻结</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> cancelDeduct</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, BigDecimal </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查冻结记录</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 释放冻结金额</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新状态为已取消</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-本地消息表方案" tabindex="-1">4.3 本地消息表方案 <a class="header-anchor" href="#_4-3-本地消息表方案" aria-label="Permalink to &quot;4.3 本地消息表方案&quot;">​</a></h3><h4 id="_4-3-1-实现原理" tabindex="-1">4.3.1 实现原理 <a class="header-anchor" href="#_4-3-1-实现原理" aria-label="Permalink to &quot;4.3.1 实现原理&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant A as ServiceA</span></span>
<span class="line"><span class="__shiki_140thh">    participant DB as LocalDB</span></span>
<span class="line"><span class="__shiki_140thh">    participant MQ as MessageQueue</span></span>
<span class="line"><span class="__shiki_140thh">    participant B as ServiceB</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;DB: 1. 业务数据+消息写入本地事务</span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;DB: 2. 提交事务</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    loop 消息投递</span></span>
<span class="line"><span class="__shiki_140thh">        A-&gt;&gt;MQ: 3. 发送消息</span></span>
<span class="line"><span class="__shiki_140thh">        MQ-&gt;&gt;B: 4. 消费消息</span></span>
<span class="line"><span class="__shiki_140thh">        B-&gt;&gt;B: 5. 处理业务</span></span>
<span class="line"><span class="__shiki_140thh">        B--&gt;&gt;MQ: 6. 消费确认</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    A-&gt;&gt;DB: 7. 删除或标记已发送</span></span></code></pre></div><h4 id="_4-3-2-消息可靠性保证" tabindex="-1">4.3.2 消息可靠性保证 <a class="header-anchor" href="#_4-3-2-消息可靠性保证" aria-label="Permalink to &quot;4.3.2 消息可靠性保证&quot;">​</a></h4><ul><li><strong>消息持久化</strong>：消息与业务数据在同一个数据库事务中</li><li><strong>重试机制</strong>：失败消息定时重试</li><li><strong>人工干预</strong>：最终无法处理的消息告警人工处理</li></ul><h3 id="_4-4-消息事务方案" tabindex="-1">4.4 消息事务方案 <a class="header-anchor" href="#_4-4-消息事务方案" aria-label="Permalink to &quot;4.4 消息事务方案&quot;">​</a></h3><h4 id="_4-4-1-rocketmq事务消息" tabindex="-1">4.4.1 RocketMQ事务消息 <a class="header-anchor" href="#_4-4-1-rocketmq事务消息" aria-label="Permalink to &quot;4.4.1 RocketMQ事务消息&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderServiceWithTransaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务消息生产者</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createOrder</span><span class="__shiki_140thh">(Order </span><span class="__shiki_1jdh33">order</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        TransactionMQProducer producer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionMQProducer</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order_group&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送半消息</span></span>
<span class="line"><span class="__shiki_140thh">        Message msg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Message</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order_topic&quot;</span><span class="__shiki_140thh">, order.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getBytes</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        SendResult result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> producer.</span><span class="__shiki_1t8gfj">sendMessageInTransaction</span><span class="__shiki_140thh">(msg, order);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 本地事务执行</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> LocalTransactionState </span><span class="__shiki_1t8gfj">executeLocalTransaction</span><span class="__shiki_140thh">(Message </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">, Object </span><span class="__shiki_1jdh33">arg</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 执行本地订单创建</span></span>
<span class="line"><span class="__shiki_140thh">            orderDao.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">((Order) arg);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> LocalTransactionState.COMMIT_MESSAGE;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> LocalTransactionState.ROLLBACK_MESSAGE;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-分布式事务框架对比" tabindex="-1">5. 分布式事务框架对比 <a class="header-anchor" href="#_5-分布式事务框架对比" aria-label="Permalink to &quot;5. 分布式事务框架对比&quot;">​</a></h2><h3 id="_5-1-主流框架特性对比" tabindex="-1">5.1 主流框架特性对比 <a class="header-anchor" href="#_5-1-主流框架特性对比" aria-label="Permalink to &quot;5.1 主流框架特性对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Seata</th><th>ByteTCC</th><th>LCN</th><th>ShardingSphere</th></tr></thead><tbody><tr><td><strong>支持模式</strong></td><td>AT/TCC/Saga/XA</td><td>TCC</td><td>TCC/LCN</td><td>XA/Seata集成</td></tr><tr><td><strong>事务协调器</strong></td><td>独立部署</td><td>内置</td><td>独立TC</td><td>依赖第三方</td></tr><tr><td><strong>性能影响</strong></td><td>中等</td><td>较低</td><td>较低</td><td>依赖模式</td></tr><tr><td><strong>侵入性</strong></td><td>低（AT模式）</td><td>高</td><td>中等</td><td>低</td></tr><tr><td><strong>社区生态</strong></td><td>活跃</td><td>一般</td><td>一般</td><td>活跃</td></tr></tbody></table><h3 id="_5-2-seata架构详解" tabindex="-1">5.2 Seata架构详解 <a class="header-anchor" href="#_5-2-seata架构详解" aria-label="Permalink to &quot;5.2 Seata架构详解&quot;">​</a></h3><h4 id="_5-2-1-seata整体架构" tabindex="-1">5.2.1 Seata整体架构 <a class="header-anchor" href="#_5-2-1-seata整体架构" aria-label="Permalink to &quot;5.2.1 Seata整体架构&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    TM[Transaction Manager] --&gt; TC[Transaction Coordinator]</span></span>
<span class="line"><span class="__shiki_140thh">    RM[Resource Manager] --&gt; TC</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;应用程序&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        TM --&gt; App[业务服务]</span></span>
<span class="line"><span class="__shiki_140thh">        App --&gt; RM</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    subgraph &quot;数据源&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        RM --&gt; DB1[(数据库1)]</span></span>
<span class="line"><span class="__shiki_140thh">        RM --&gt; DB2[(数据库2)]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    TC --&gt; Config[配置中心]</span></span>
<span class="line"><span class="__shiki_140thh">    TC --&gt; Registry[注册中心]</span></span></code></pre></div><h4 id="_5-2-2-seata-at模式原理" tabindex="-1">5.2.2 Seata AT模式原理 <a class="header-anchor" href="#_5-2-2-seata-at模式原理" aria-label="Permalink to &quot;5.2.2 Seata AT模式原理&quot;">​</a></h4><p><strong>第一阶段</strong>：</p><ol><li>解析SQL，生成前后镜像</li><li>执行业务SQL</li><li>保存undo_log和行锁</li></ol><p><strong>第二阶段</strong>：</p><ul><li><strong>提交</strong>：异步删除undo_log</li><li><strong>回滚</strong>：根据undo_log反向补偿</li></ul><h2 id="_6-分布式事务设计模式" tabindex="-1">6. 分布式事务设计模式 <a class="header-anchor" href="#_6-分布式事务设计模式" aria-label="Permalink to &quot;6. 分布式事务设计模式&quot;">​</a></h2><h3 id="_6-1-模式选择决策树" tabindex="-1">6.1 模式选择决策树 <a class="header-anchor" href="#_6-1-模式选择决策树" aria-label="Permalink to &quot;6.1 模式选择决策树&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[选择分布式事务模式] --&gt; B{强一致性要求?}</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|是| C[2PC/3PC/XA]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|否| D{业务复杂度?}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|高, 长事务| E[Saga模式]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|中等, 需要资源预留| F[TCC模式]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|简单, 异步场景| G[消息事务]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; H[金融核心交易]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; I[电商订单流程]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; J[账户资金操作]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; K[日志/通知场景]</span></span></code></pre></div><h3 id="_6-2-混合事务模式" tabindex="-1">6.2 混合事务模式 <a class="header-anchor" href="#_6-2-混合事务模式" aria-label="Permalink to &quot;6.2 混合事务模式&quot;">​</a></h3><h4 id="_6-2-1-saga-tcc混合模式" tabindex="-1">6.2.1 Saga + TCC混合模式 <a class="header-anchor" href="#_6-2-1-saga-tcc混合模式" aria-label="Permalink to &quot;6.2.1 Saga + TCC混合模式&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderProcessSaga</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Saga步骤1: TCC模式支付</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SagaStep</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> reservePayment</span><span class="__shiki_140thh">(OrderContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        paymentService.</span><span class="__shiki_1t8gfj">tryDeduct</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">getUserId</span><span class="__shiki_140thh">(), context.</span><span class="__shiki_1t8gfj">getAmount</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Saga步骤2: 简单库存预留</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SagaStep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">compensation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;compensateInventory&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> reserveInventory</span><span class="__shiki_140thh">(OrderContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        inventoryService.</span><span class="__shiki_1t8gfj">reserve</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">getProductId</span><span class="__shiki_140thh">(), context.</span><span class="__shiki_1t8gfj">getQuantity</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> compensateInventory</span><span class="__shiki_140thh">(OrderContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        inventoryService.</span><span class="__shiki_1t8gfj">cancelReserve</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">getProductId</span><span class="__shiki_140thh">(), context.</span><span class="__shiki_1t8gfj">getQuantity</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-分布式事务最佳实践" tabindex="-1">7. 分布式事务最佳实践 <a class="header-anchor" href="#_7-分布式事务最佳实践" aria-label="Permalink to &quot;7. 分布式事务最佳实践&quot;">​</a></h2><h3 id="_7-1-事务边界设计" tabindex="-1">7.1 事务边界设计 <a class="header-anchor" href="#_7-1-事务边界设计" aria-label="Permalink to &quot;7.1 事务边界设计&quot;">​</a></h3><h4 id="_7-1-1-事务拆分原则" tabindex="-1">7.1.1 事务拆分原则 <a class="header-anchor" href="#_7-1-1-事务拆分原则" aria-label="Permalink to &quot;7.1.1 事务拆分原则&quot;">​</a></h4><ul><li><strong>单一职责</strong>：每个事务只关注一个业务聚合</li><li><strong>最小化锁范围</strong>：减少分布式锁的持有时间</li><li><strong>读写分离</strong>：查询操作避免参与分布式事务</li></ul><h4 id="_7-1-2-长事务拆分策略" tabindex="-1">7.1.2 长事务拆分策略 <a class="header-anchor" href="#_7-1-2-长事务拆分策略" aria-label="Permalink to &quot;7.1.2 长事务拆分策略&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 反模式：一个事务包含所有操作</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processOrder</span><span class="__shiki_140thh">(Order order) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 订单创建、支付、库存、物流都在一个事务中</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化：拆分为多个事务</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processOrder</span><span class="__shiki_140thh">(Order order) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段1：创建订单</span></span>
<span class="line"><span class="__shiki_140thh">    orderService.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段2：支付（独立事务）</span></span>
<span class="line"><span class="__shiki_140thh">    paymentService.</span><span class="__shiki_1t8gfj">process</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段3：库存预留（独立事务）</span></span>
<span class="line"><span class="__shiki_140thh">    inventoryService.</span><span class="__shiki_1t8gfj">reserve</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-幂等性设计" tabindex="-1">7.2 幂等性设计 <a class="header-anchor" href="#_7-2-幂等性设计" aria-label="Permalink to &quot;7.2 幂等性设计&quot;">​</a></h3><h4 id="_7-2-1-幂等性实现方式" tabindex="-1">7.2.1 幂等性实现方式 <a class="header-anchor" href="#_7-2-1-幂等性实现方式" aria-label="Permalink to &quot;7.2.1 幂等性实现方式&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> IdempotentService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 唯一约束</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createWithUniqueKey</span><span class="__shiki_140thh">(BusinessRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            businessDao.</span><span class="__shiki_1t8gfj">insertWithUniqueKey</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (DuplicateKeyException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 已处理过，直接返回</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 状态机</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> updateWithStateMachine</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">newStatus</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> rows </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> businessDao.</span><span class="__shiki_1t8gfj">updateStatus</span><span class="__shiki_140thh">(id, </span><span class="__shiki_mdbnqw">&quot;PROCESSING&quot;</span><span class="__shiki_140thh">, newStatus);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (rows </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> IllegalStateException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;状态转换失败&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 令牌机制</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processWithToken</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">requestId</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">tokenService.</span><span class="__shiki_1t8gfj">validateAndConsume</span><span class="__shiki_140thh">(token)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DuplicateRequestException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;重复请求&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理业务</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-补偿事务设计" tabindex="-1">7.3 补偿事务设计 <a class="header-anchor" href="#_7-3-补偿事务设计" aria-label="Permalink to &quot;7.3 补偿事务设计&quot;">​</a></h3><h4 id="_7-3-1-补偿策略分类" tabindex="-1">7.3.1 补偿策略分类 <a class="header-anchor" href="#_7-3-1-补偿策略分类" aria-label="Permalink to &quot;7.3.1 补偿策略分类&quot;">​</a></h4><table tabindex="0"><thead><tr><th>补偿类型</th><th>适用场景</th><th>实现复杂度</th></tr></thead><tbody><tr><td><strong>正向补偿</strong></td><td>资源预留类操作</td><td>低</td></tr><tr><td><strong>反向补偿</strong></td><td>数据修改类操作</td><td>中</td></tr><tr><td><strong>业务补偿</strong></td><td>涉及外部系统</td><td>高</td></tr><tr><td><strong>人工补偿</strong></td><td>复杂业务场景</td><td>极高</td></tr></tbody></table><h4 id="_7-3-2-补偿事务模板" tabindex="-1">7.3.2 补偿事务模板 <a class="header-anchor" href="#_7-3-2-补偿事务模板" aria-label="Permalink to &quot;7.3.2 补偿事务模板&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CompensableTransaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(TransactionContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">TransactionStep</span><span class="__shiki_140thh">&gt; steps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> buildSteps</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (TransactionStep step </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> steps) {</span></span>
<span class="line"><span class="__shiki_140thh">                step.</span><span class="__shiki_1t8gfj">process</span><span class="__shiki_140thh">(context);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 所有步骤成功，确认事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">            confirmAll</span><span class="__shiki_140thh">(steps, context);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 执行补偿</span></span>
<span class="line"><span class="__shiki_1t8gfj">            compensateAll</span><span class="__shiki_140thh">(steps, context);</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> e;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">TransactionStep</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">buildSteps</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-性能优化与监控" tabindex="-1">8. 性能优化与监控 <a class="header-anchor" href="#_8-性能优化与监控" aria-label="Permalink to &quot;8. 性能优化与监控&quot;">​</a></h2><h3 id="_8-1-性能优化策略" tabindex="-1">8.1 性能优化策略 <a class="header-anchor" href="#_8-1-性能优化策略" aria-label="Permalink to &quot;8.1 性能优化策略&quot;">​</a></h3><h4 id="_8-1-1-降低锁竞争" tabindex="-1">8.1.1 降低锁竞争 <a class="header-anchor" href="#_8-1-1-降低锁竞争" aria-label="Permalink to &quot;8.1.1 降低锁竞争&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 优化前：全表锁</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> account </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化后：行级锁 + 版本控制</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> account </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">version</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> version</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_1itgoe"> version</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> #{currentVersion};</span></span></code></pre></div><h4 id="_8-1-2-异步化处理" tabindex="-1">8.1.2 异步化处理 <a class="header-anchor" href="#_8-1-2-异步化处理" aria-label="Permalink to &quot;8.1.2 异步化处理&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Async</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transactionExecutor&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">TransactionalEventListener</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleAsyncTransaction</span><span class="__shiki_140thh">(TransactionEvent event) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 异步处理非核心业务</span></span>
<span class="line"><span class="__shiki_140thh">    notificationService.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(event);</span></span>
<span class="line"><span class="__shiki_140thh">    analyticsService.</span><span class="__shiki_1t8gfj">record</span><span class="__shiki_140thh">(event);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-监控与告警" tabindex="-1">8.2 监控与告警 <a class="header-anchor" href="#_8-2-监控与告警" aria-label="Permalink to &quot;8.2 监控与告警&quot;">​</a></h3><h4 id="_8-2-1-关键监控指标" tabindex="-1">8.2.1 关键监控指标 <a class="header-anchor" href="#_8-2-1-关键监控指标" aria-label="Permalink to &quot;8.2.1 关键监控指标&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 事务成功率</span></span>
<span class="line"><span class="__shiki_mdbnqw">distributed_transaction_success_rate{service=&quot;order&quot;}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 事务平均耗时  </span></span>
<span class="line"><span class="__shiki_mdbnqw">distributed_transaction_duration_seconds{service=&quot;order&quot;}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 补偿事务数量</span></span>
<span class="line"><span class="__shiki_mdbnqw">distributed_transaction_compensations_total{service=&quot;order&quot;}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 事务超时率</span></span>
<span class="line"><span class="__shiki_mdbnqw">distributed_transaction_timeout_rate{service=&quot;order&quot;}</span></span></code></pre></div><h4 id="_8-2-2-事务追踪" tabindex="-1">8.2.2 事务追踪 <a class="header-anchor" href="#_8-2-2-事务追踪" aria-label="Permalink to &quot;8.2.2 事务追踪&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[网关] --&gt; B[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[支付服务]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[库存服务]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style A fill:#4caf50</span></span>
<span class="line"><span class="__shiki_140thh">    style B fill:#2196f3</span></span>
<span class="line"><span class="__shiki_140thh">    style C fill:#2196f3</span></span>
<span class="line"><span class="__shiki_140thh">    style D fill:#2196f3</span></span></code></pre></div><h2 id="_9-实际场景案例分析" tabindex="-1">9. 实际场景案例分析 <a class="header-anchor" href="#_9-实际场景案例分析" aria-label="Permalink to &quot;9. 实际场景案例分析&quot;">​</a></h2><h3 id="_9-1-电商下单场景" tabindex="-1">9.1 电商下单场景 <a class="header-anchor" href="#_9-1-电商下单场景" aria-label="Permalink to &quot;9.1 电商下单场景&quot;">​</a></h3><h4 id="_9-1-1-业务流程图" tabindex="-1">9.1.1 业务流程图 <a class="header-anchor" href="#_9-1-1-业务流程图" aria-label="Permalink to &quot;9.1.1 业务流程图&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[用户下单] --&gt; B[创建订单]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[扣减库存]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[支付扣款]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[生成物流单]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[通知用户]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|库存不足| G[取消订单]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt;|余额不足| H[释放库存]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; G</span></span></code></pre></div><h4 id="_9-1-2-技术实现方案" tabindex="-1">9.1.2 技术实现方案 <a class="header-anchor" href="#_9-1-2-技术实现方案" aria-label="Permalink to &quot;9.1.2 技术实现方案&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> SagaExecutor sagaExecutor;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createOrder</span><span class="__shiki_140thh">(OrderCreateRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        OrderSaga saga </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> OrderSaga</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">        sagaExecutor.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(saga);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderSaga</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SagaStep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">compensation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;cancelOrder&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createOrder</span><span class="__shiki_140thh">(OrderContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建订单</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SagaStep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">compensation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;restoreInventory&quot;</span><span class="__shiki_140thh">)  </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> reserveInventory</span><span class="__shiki_140thh">(OrderContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 预留库存</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SagaStep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">compensation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;refundPayment&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processPayment</span><span class="__shiki_140thh">(OrderContext </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理支付</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 补偿方法...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-银行转账场景" tabindex="-1">9.2 银行转账场景 <a class="header-anchor" href="#_9-2-银行转账场景" aria-label="Permalink to &quot;9.2 银行转账场景&quot;">​</a></h3><h4 id="_9-2-1-tcc模式实现" tabindex="-1">9.2.1 TCC模式实现 <a class="header-anchor" href="#_9-2-1-tcc模式实现" aria-label="Permalink to &quot;9.2.1 TCC模式实现&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> TransferServiceTCC</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> transfer</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">fromAccount</span><span class="__shiki_140thh">, Long </span><span class="__shiki_1jdh33">toAccount</span><span class="__shiki_140thh">, BigDecimal </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Try阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> fromSuccess </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> accountService.</span><span class="__shiki_1t8gfj">tryDeduct</span><span class="__shiki_140thh">(fromAccount, amount);</span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> toSuccess </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> accountService.</span><span class="__shiki_1t8gfj">tryAdd</span><span class="__shiki_140thh">(toAccount, amount);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (fromSuccess </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> toSuccess) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // Confirm阶段</span></span>
<span class="line"><span class="__shiki_140thh">            accountService.</span><span class="__shiki_1t8gfj">confirmDeduct</span><span class="__shiki_140thh">(fromAccount, amount);</span></span>
<span class="line"><span class="__shiki_140thh">            accountService.</span><span class="__shiki_1t8gfj">confirmAdd</span><span class="__shiki_140thh">(toAccount, amount);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // Cancel阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (fromSuccess) accountService.</span><span class="__shiki_1t8gfj">cancelDeduct</span><span class="__shiki_140thh">(fromAccount, amount);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (toSuccess) accountService.</span><span class="__shiki_1t8gfj">cancelAdd</span><span class="__shiki_140thh">(toAccount, amount);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_10-总结" tabindex="-1">10. 总结 <a class="header-anchor" href="#_10-总结" aria-label="Permalink to &quot;10. 总结&quot;">​</a></h2><p>分布式事务是微服务架构中的核心挑战，选择合适的方案需要综合考虑业务需求、一致性要求、性能影响和系统复杂度。</p><p><strong>关键选择建议</strong>：</p><table tabindex="0"><thead><tr><th>场景</th><th>推荐方案</th><th>理由</th></tr></thead><tbody><tr><td><strong>金融核心交易</strong></td><td>TCC/2PC</td><td>强一致性要求</td></tr><tr><td><strong>电商业务流程</strong></td><td>Saga模式</td><td>长事务，需要补偿</td></tr><tr><td><strong>异步消息场景</strong></td><td>本地消息表</td><td>最终一致性，可靠性高</td></tr><tr><td><strong>简单查询更新</strong></td><td>尽量避免</td><td>重新设计业务逻辑</td></tr></tbody></table><p><strong>成功要素</strong>：</p><ul><li>✅ 合理的业务边界划分</li><li>✅ 完善的补偿机制</li><li>✅ 严格的幂等性保证</li><li>✅ 全面的监控告警</li><li>✅ 充分的故障演练</li></ul><p>记住：<strong>没有完美的分布式事务解决方案，只有最适合业务场景的选择</strong>。在设计时应该优先考虑通过业务设计避免分布式事务，如果无法避免，选择对业务影响最小的方案。</p>`,118)])])}const d=a(_,[["render",t]]);export{k as __pageData,d as default};
