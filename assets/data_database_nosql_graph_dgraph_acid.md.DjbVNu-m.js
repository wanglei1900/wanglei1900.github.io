import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"NoSQL数据库-图数据库Dgraph-ACID事务支持详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/graph/dgraph/acid.md","filePath":"data/database/nosql/graph/dgraph/acid.md"}'),p={name:"data/database/nosql/graph/dgraph/acid.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="nosql数据库-图数据库dgraph-acid事务支持详细学习笔记" tabindex="-1">NoSQL数据库-图数据库Dgraph-ACID事务支持详细学习笔记 <a class="header-anchor" href="#nosql数据库-图数据库dgraph-acid事务支持详细学习笔记" aria-label="Permalink to &quot;NoSQL数据库-图数据库Dgraph-ACID事务支持详细学习笔记&quot;">​</a></h1><h2 id="一、dgraph事务架构总览" tabindex="-1">一、Dgraph事务架构总览 <a class="header-anchor" href="#一、dgraph事务架构总览" aria-label="Permalink to &quot;一、Dgraph事务架构总览&quot;">​</a></h2><h3 id="_1-1-事务设计哲学" tabindex="-1">1.1 事务设计哲学 <a class="header-anchor" href="#_1-1-事务设计哲学" aria-label="Permalink to &quot;1.1 事务设计哲学&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">核心原则</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">分布式ACID</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">在分布式环境下保证ACID特性</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">快照隔离</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">提供一致性的读视图</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">乐观并发控制</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">减少锁争用，提高吞吐量</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">线性一致性</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">强一致性模型</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">设计目标</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">水平扩展性</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">事务处理能力随集群扩展而增加</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">低延迟</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">最小化事务开销</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">高吞吐</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">支持高并发事务处理</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">容错性</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">节点故障不影响已提交事务</span></span></code></pre></div><h3 id="_1-2-事务架构层次" tabindex="-1">1.2 事务架构层次 <a class="header-anchor" href="#_1-2-事务架构层次" aria-label="Permalink to &quot;1.2 事务架构层次&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           客户端接口层                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (gRPC/HTTP, 事务API, 重试逻辑)        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           分布式事务协调器               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (事务管理, 冲突检测, 两阶段提交)        │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           MVCC存储引擎                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (版本管理, 快照隔离, 垃圾回收)          │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           分布式共识层                   │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  (Raft协议, 预写日志, 持久化)           │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span></code></pre></div><h2 id="二、acid特性实现详解" tabindex="-1">二、ACID特性实现详解 <a class="header-anchor" href="#二、acid特性实现详解" aria-label="Permalink to &quot;二、ACID特性实现详解&quot;">​</a></h2><h3 id="_2-1-原子性-atomicity-实现" tabindex="-1">2.1 原子性(Atomicity)实现 <a class="header-anchor" href="#_2-1-原子性-atomicity-实现" aria-label="Permalink to &quot;2.1 原子性(Atomicity)实现&quot;">​</a></h3><h4 id="_2-1-1-两阶段提交协议-2pc" tabindex="-1">2.1.1 两阶段提交协议(2PC) <a class="header-anchor" href="#_2-1-1-两阶段提交协议-2pc" aria-label="Permalink to &quot;2.1.1 两阶段提交协议(2PC)&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant CO as Coordinator(Alpha)</span></span>
<span class="line"><span class="__shiki_140thh">    participant P1 as Participant1(Alpha)</span></span>
<span class="line"><span class="__shiki_140thh">    participant P2 as Participant2(Alpha)</span></span>
<span class="line"><span class="__shiki_140thh">    participant Z as Zero(Oracle)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;CO: 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;Z: 获取开始时间戳(StartTS)</span></span>
<span class="line"><span class="__shiki_140thh">    Z--&gt;&gt;CO: 返回StartTS</span></span>
<span class="line"><span class="__shiki_140thh">    CO--&gt;&gt;C: 返回事务上下文</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;CO: 发送修改操作</span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;P1: 执行操作(不提交)</span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;P2: 执行操作(不提交)</span></span>
<span class="line"><span class="__shiki_140thh">    P1--&gt;&gt;CO: 操作成功，准备提交</span></span>
<span class="line"><span class="__shiki_140thh">    P2--&gt;&gt;CO: 操作成功，准备提交</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;CO: 提交请求</span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;Z: 获取提交时间戳(CommitTS)</span></span>
<span class="line"><span class="__shiki_140thh">    Z--&gt;&gt;CO: 返回CommitTS</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;P1: 准备阶段(Prepare)</span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;P2: 准备阶段(Prepare)</span></span>
<span class="line"><span class="__shiki_140thh">    P1--&gt;&gt;CO: 投票提交(Vote Yes)</span></span>
<span class="line"><span class="__shiki_140thh">    P2--&gt;&gt;CO: 投票提交(Vote Yes)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;P1: 提交阶段(Commit)</span></span>
<span class="line"><span class="__shiki_140thh">    CO-&gt;&gt;P2: 提交阶段(Commit)</span></span>
<span class="line"><span class="__shiki_140thh">    P1--&gt;&gt;CO: 提交确认</span></span>
<span class="line"><span class="__shiki_140thh">    P2--&gt;&gt;CO: 提交确认</span></span>
<span class="line"><span class="__shiki_140thh">    CO--&gt;&gt;C: 事务提交成功</span></span></code></pre></div><h4 id="_2-1-2-事务状态机" tabindex="-1">2.1.2 事务状态机 <a class="header-anchor" href="#_2-1-2-事务状态机" aria-label="Permalink to &quot;2.1.2 事务状态机&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TransactionState</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    TransactionActive</span><span class="__shiki_1t8gfj"> TransactionState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> iota</span><span class="__shiki_21nrsd">  // 活跃状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    TransactionPreparing</span><span class="__shiki_21nrsd">                       // 准备中</span></span>
<span class="line"><span class="__shiki_dzsirb">    TransactionCommitted</span><span class="__shiki_21nrsd">                       // 已提交</span></span>
<span class="line"><span class="__shiki_dzsirb">    TransactionAborted</span><span class="__shiki_21nrsd">                         // 已中止</span></span>
<span class="line"><span class="__shiki_dzsirb">    TransactionRolledBack</span><span class="__shiki_21nrsd">                      // 已回滚</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Transaction</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID           </span><span class="__shiki_1itgoe">string</span><span class="__shiki_21nrsd">             // 事务ID</span></span>
<span class="line"><span class="__shiki_140thh">    StartTS      </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">             // 开始时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    CommitTS     </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">             // 提交时间戳(未提交时为0)</span></span>
<span class="line"><span class="__shiki_140thh">    State        </span><span class="__shiki_1t8gfj">TransactionState</span><span class="__shiki_21nrsd">   // 当前状态</span></span>
<span class="line"><span class="__shiki_140thh">    Participants []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AlphaNode</span><span class="__shiki_21nrsd">       // 参与节点</span></span>
<span class="line"><span class="__shiki_140thh">    WriteSet     []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_21nrsd">        // 写集合</span></span>
<span class="line"><span class="__shiki_140thh">    ReadSet      []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ReadOperation</span><span class="__shiki_21nrsd">   // 读集合</span></span>
<span class="line"><span class="__shiki_140thh">    Coordinator  </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AlphaNode</span><span class="__shiki_21nrsd">         // 协调者</span></span>
<span class="line"><span class="__shiki_140thh">    Timeout      </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">      // 超时时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原子性保证</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Commit</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        tx.State </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> TransactionPreparing</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 阶段1: 准备</span></span>
<span class="line"><span class="__shiki_140thh">        prepared, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> tx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">prepareAllParticipants</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> err</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">abort</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 阶段2: 提交</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> prepared {</span></span>
<span class="line"><span class="__shiki_140thh">            err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">commitAllParticipants</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 部分提交失败，需要恢复</span></span>
<span class="line"><span class="__shiki_140thh">                tx.</span><span class="__shiki_1t8gfj">recoverPartialCommit</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            tx.State </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TransactionCommitted</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Rollback</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        tx.State </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TransactionRolledBack</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">rollbackAllParticipants</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-一致性-consistency-实现" tabindex="-1">2.2 一致性(Consistency)实现 <a class="header-anchor" href="#_2-2-一致性-consistency-实现" aria-label="Permalink to &quot;2.2 一致性(Consistency)实现&quot;">​</a></h3><h4 id="_2-2-1-模式-schema-约束" tabindex="-1">2.2.1 模式(Schema)约束 <a class="header-anchor" href="#_2-2-1-模式-schema-约束" aria-label="Permalink to &quot;2.2.1 模式(Schema)约束&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 模式定义与验证</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Schema</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Predicates </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PredicateSchema</span></span>
<span class="line"><span class="__shiki_140thh">    Types      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TypeDefinition</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证数据一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> ValidateMutation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">mutation</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">nquad</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> mutation</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Set</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查谓词是否存在</span></span>
<span class="line"><span class="__shiki_140thh">            pred, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Predicates</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">nquad</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Predicate</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 自动推断或报错</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">AutoCreatePredicates</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    pred </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">InferPredicateSchema</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">nquad</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> ErrPredicateNotFound</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 验证数据类型</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">pred.</span><span class="__shiki_1t8gfj">IsValidValue</span><span class="__shiki_140thh">(nquad.Value) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> ErrInvalidDataType</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 验证唯一性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> pred.Unique </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">Exists</span><span class="__shiki_140thh">(nquad) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> ErrDuplicateValue</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 验证反向边一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> pred.Reverse </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                s.</span><span class="__shiki_1t8gfj">ValidateReverseEdge</span><span class="__shiki_140thh">(nquad)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 唯一性约束实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UniqueIndex</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Predicate </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Index     </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}]</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd"> // 值-&gt;UID映射</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CheckUnique</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh">{}, </span><span class="__shiki_1jdh33">uid</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        existingUID, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> idx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Index</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> exists</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1t8gfj"> existingUID</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_1t8gfj"> uid</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> ErrUniqueConstraintViolated</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-2-引用完整性" tabindex="-1">2.2.2 引用完整性 <a class="header-anchor" href="#_2-2-2-引用完整性" aria-label="Permalink to &quot;2.2.2 引用完整性&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 引用完整性检查</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ReferentialIntegrity</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 外键约束</span></span>
<span class="line"><span class="__shiki_140thh">    ForeignKeys </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ForeignKeyConstraint</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查外键约束</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CheckForeignKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sourceUID</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">predicate</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetUID</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        constraint, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> fk</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ForeignKeys</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">predicate</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查目标是否存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">targetExists</span><span class="__shiki_140thh">(targetUID, constraint.TargetType) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrReferentialIntegrityViolated</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 级联操作处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> constraint.OnDelete </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> Cascade {</span></span>
<span class="line"><span class="__shiki_140thh">            fk.</span><span class="__shiki_1t8gfj">RegisterCascadeDelete</span><span class="__shiki_140thh">(sourceUID, predicate, targetUID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 反向边自动维护</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ReverseEdgeManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CreateReverseEdge</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sourceUID</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">predicate</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">targetUID</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">NQuad</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">NQuad</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Subject:   targetUID,</span></span>
<span class="line"><span class="__shiki_140thh">            Predicate: </span><span class="__shiki_1t8gfj">getReversePredicate</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">predicate</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            ObjectId:  sourceUID,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> DeleteReverseEdge</span><span class="__shiki_140thh">(sourceUID </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">, predicate </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, targetUID </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">NQuad {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">NQuad</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Subject:   targetUID,</span></span>
<span class="line"><span class="__shiki_140thh">            Predicate: </span><span class="__shiki_1t8gfj">getReversePredicate</span><span class="__shiki_140thh">(predicate),</span></span>
<span class="line"><span class="__shiki_140thh">            ObjectId:  sourceUID,</span></span>
<span class="line"><span class="__shiki_140thh">            IsDelete:  </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-隔离性-isolation-实现" tabindex="-1">2.3 隔离性(Isolation)实现 <a class="header-anchor" href="#_2-3-隔离性-isolation-实现" aria-label="Permalink to &quot;2.3 隔离性(Isolation)实现&quot;">​</a></h3><h4 id="_2-3-1-快照隔离-snapshot-isolation" tabindex="-1">2.3.1 快照隔离(Snapshot Isolation) <a class="header-anchor" href="#_2-3-1-快照隔离-snapshot-isolation" aria-label="Permalink to &quot;2.3.1 快照隔离(Snapshot Isolation)&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// MVCC版本管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> VersionManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Versions </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">VersionList</span><span class="__shiki_21nrsd"> // 键-&gt;版本链表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取快照</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> GetSnapshot</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">readTS</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Snapshot</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            ReadTS: readTS,</span></span>
<span class="line"><span class="__shiki_140thh">            Data:   </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Version</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 读取数据(快照读)</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Read</span><span class="__shiki_140thh">(key Key, readTS </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Version, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        versionList </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> vm.Versions[key]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> versionList </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrKeyNotFound</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 找到小于等于readTS的最新提交版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(versionList.Versions) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            version </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> versionList.Versions[i]</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> version.CommitTS </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> readTS </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">               (version.StartTS </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> version.StartTS </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> readTS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> version, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrKeyNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 版本数据结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Version</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Value     []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    StartTS   </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">    // 0表示已提交版本</span></span>
<span class="line"><span class="__shiki_140thh">    CommitTS  </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">    IsDeleted </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    Prev      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Version</span><span class="__shiki_21nrsd">  // 前一个版本</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> VersionList</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Versions []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Version</span></span>
<span class="line"><span class="__shiki_140thh">    Lock     </span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">RWMutex</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-3-2-写-写冲突检测" tabindex="-1">2.3.2 写-写冲突检测 <a class="header-anchor" href="#_2-3-2-写-写冲突检测" aria-label="Permalink to &quot;2.3.2 写-写冲突检测&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 乐观并发控制(OCC)</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> OptimisticConcurrencyControl</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务冲突检测</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> DetectConflict</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">tx2</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查写-写冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">write1</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> tx1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">write2</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> tx2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> write1</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_1t8gfj"> write2</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查读-写冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, read </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> tx1.ReadSet {</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, write </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> tx2.WriteSet {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> read.Key </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> write.Key {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于时间戳的冲突解决</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> ResolveConflict</span><span class="__shiki_140thh">(tx1, tx2 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 较早开始的事务优先</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> tx1.StartTS </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> tx2.StartTS {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> tx2 </span><span class="__shiki_21nrsd">// 中止tx2</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> tx1 </span><span class="__shiki_21nrsd">// 中止tx1</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-3-3-隔离级别实现" tabindex="-1">2.3.3 隔离级别实现 <a class="header-anchor" href="#_2-3-3-隔离级别实现" aria-label="Permalink to &quot;2.3.3 隔离级别实现&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 不同隔离级别的实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> IsolationLevel</span><span class="__shiki_1itgoe"> int</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    ReadUncommitted</span><span class="__shiki_1t8gfj"> IsolationLevel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> iota</span><span class="__shiki_21nrsd">  // 读未提交(不提供)</span></span>
<span class="line"><span class="__shiki_dzsirb">    ReadCommitted</span><span class="__shiki_21nrsd">                          // 读已提交</span></span>
<span class="line"><span class="__shiki_dzsirb">    SnapshotIsolation</span><span class="__shiki_21nrsd">                      // 快照隔离(默认)</span></span>
<span class="line"><span class="__shiki_dzsirb">    Serializable</span><span class="__shiki_21nrsd">                           // 可串行化(严格)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> IsolationManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Level </span><span class="__shiki_1t8gfj">IsolationLevel</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> BeginTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">level</span><span class="__shiki_1t8gfj"> IsolationLevel</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        tx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            StartTS: </span><span class="__shiki_1t8gfj">GetTimestamp</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            Level:   level,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> level {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> ReadCommitted:</span></span>
<span class="line"><span class="__shiki_140thh">            tx.ReadConsistency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Linearizable</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> SnapshotIsolation:</span></span>
<span class="line"><span class="__shiki_140thh">            tx.Snapshot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> GetSnapshot</span><span class="__shiki_140thh">(tx.StartTS)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> Serializable:</span></span>
<span class="line"><span class="__shiki_140thh">            tx.UsePessimisticLocks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> tx</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 串行化检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CheckSerializability</span><span class="__shiki_140thh">(txs []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建优先图</span></span>
<span class="line"><span class="__shiki_140thh">        graph </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> BuildPrecedenceGraph</span><span class="__shiki_140thh">(txs)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查环(有环则不可串行化)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">graph.</span><span class="__shiki_1t8gfj">HasCycle</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-持久性-durability-实现" tabindex="-1">2.4 持久性(Durability)实现 <a class="header-anchor" href="#_2-4-持久性-durability-实现" aria-label="Permalink to &quot;2.4 持久性(Durability)实现&quot;">​</a></h3><h4 id="_2-4-1-预写日志-wal" tabindex="-1">2.4.1 预写日志(WAL) <a class="header-anchor" href="#_2-4-1-预写日志-wal" aria-label="Permalink to &quot;2.4.1 预写日志(WAL)&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// WAL条目结构</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WALEntry</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    LSN        </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">            // 日志序列号</span></span>
<span class="line"><span class="__shiki_140thh">    Timestamp  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    TransactionID </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Operation  </span><span class="__shiki_1t8gfj">OperationType</span><span class="__shiki_21nrsd">     // INSERT, UPDATE, DELETE</span></span>
<span class="line"><span class="__shiki_140thh">    Key        []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    Value      []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    PrevLSN    </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">           // 前一个日志记录</span></span>
<span class="line"><span class="__shiki_140thh">    CRC32      </span><span class="__shiki_1itgoe">uint32</span><span class="__shiki_21nrsd">           // 校验和</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重做(Redo)和撤销(Undo)信息</span></span>
<span class="line"><span class="__shiki_140thh">    RedoData   []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">    UndoData   []</span><span class="__shiki_1itgoe">byte</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// WAL管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WALManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    LogFile    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">File</span></span>
<span class="line"><span class="__shiki_140thh">    Buffer     []</span><span class="__shiki_1t8gfj">WALEntry</span></span>
<span class="line"><span class="__shiki_140thh">    CurrentLSN </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">    FlushInterval </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> WriteEntry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">entry</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">WALEntry</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 写入缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">        wm.Buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">wm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">entry</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 定期刷盘</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">wm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1t8gfj"> wm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BufferSize</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">           time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">wm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">LastFlush</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> wm.FlushInterval {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> wm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Flush</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Flush</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 确保日志在事务提交前持久化</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wm.LogFile.</span><span class="__shiki_1t8gfj">Sync</span><span class="__shiki_140thh">(); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 清空缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">        wm.Buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> wm.Buffer[:</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        wm.LastFlush </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 恢复机制</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Recover</span><span class="__shiki_140thh">(crashPoint </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分析阶段：找到最后一个检查点</span></span>
<span class="line"><span class="__shiki_140thh">        checkpoint </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wm.</span><span class="__shiki_1t8gfj">FindLastCheckpoint</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 重做阶段：重做检查点之后的所有操作</span></span>
<span class="line"><span class="__shiki_140thh">        wm.</span><span class="__shiki_1t8gfj">Redo</span><span class="__shiki_140thh">(checkpoint.LSN)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 撤销阶段：撤销未提交事务</span></span>
<span class="line"><span class="__shiki_140thh">        wm.</span><span class="__shiki_1t8gfj">UndoUncommittedTransactions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-4-2-raft共识与复制" tabindex="-1">2.4.2 Raft共识与复制 <a class="header-anchor" href="#_2-4-2-raft共识与复制" aria-label="Permalink to &quot;2.4.2 Raft共识与复制&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Raft日志复制</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RaftLog</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Entries []</span><span class="__shiki_1t8gfj">RaftEntry</span></span>
<span class="line"><span class="__shiki_140thh">    CommitIndex </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">    LastApplied </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> AppendEntry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">entry</span><span class="__shiki_1t8gfj"> RaftEntry</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 领导者复制到大多数节点</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> err</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1t8gfj"> rl</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">replicateToMajority</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">entry</span><span class="__shiki_140thh">); </span><span class="__shiki_1t8gfj">err</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 提交条目</span></span>
<span class="line"><span class="__shiki_140thh">        rl.CommitIndex</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 应用到状态机</span></span>
<span class="line"><span class="__shiki_140thh">        rl.</span><span class="__shiki_1t8gfj">applyToStateMachine</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数据持久化策略</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DurabilityManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    SyncMode   </span><span class="__shiki_1t8gfj">SyncMode</span><span class="__shiki_21nrsd">  // 同步模式</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> EnsureDurability</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_1t8gfj"> dm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">SyncMode</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> StrictSync:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 严格模式：提交前等待所有副本确认</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> dm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForAllReplicas</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> MajoritySync:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 多数模式：等待大多数副本确认</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> dm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForMajority</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> AsyncSync:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 异步模式：不等待确认</span></span>
<span class="line"><span class="__shiki_1itgoe">            go</span><span class="__shiki_1t8gfj"> dm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">replicateAsync</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、分布式事务协调" tabindex="-1">三、分布式事务协调 <a class="header-anchor" href="#三、分布式事务协调" aria-label="Permalink to &quot;三、分布式事务协调&quot;">​</a></h2><h3 id="_3-1-时间戳oracle服务" tabindex="-1">3.1 时间戳Oracle服务 <a class="header-anchor" href="#_3-1-时间戳oracle服务" aria-label="Permalink to &quot;3.1 时间戳Oracle服务&quot;">​</a></h3><h4 id="_3-1-1-oracle架构" tabindex="-1">3.1.1 Oracle架构 <a class="header-anchor" href="#_3-1-1-oracle架构" aria-label="Permalink to &quot;3.1.1 Oracle架构&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Zero节点上的Oracle服务</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Oracle</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    CurrentTS   </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">           // 当前时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    MaxAssigned </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">           // 最大已分配时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    LeaseHolder </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd"> // 租约持有者映射</span></span>
<span class="line"><span class="__shiki_140thh">    PendingCommits </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd"> // 待提交事务</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分配开始时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> GetStartTimestamp</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        ts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> atomic</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">AddUint64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">o</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CurrentTS</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        o.</span><span class="__shiki_1t8gfj">registerLease</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">ts</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> ts</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分配提交时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> GetCommitTimestamp</span><span class="__shiki_140thh">(startTS </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查事务是否活跃</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">o.</span><span class="__shiki_1t8gfj">isTransactionActive</span><span class="__shiki_140thh">(startTS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, ErrTransactionNotActive</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 获取提交时间戳(保证&gt;所有已分配的开始时间戳)</span></span>
<span class="line"><span class="__shiki_140thh">        commitTS </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> atomic.</span><span class="__shiki_1t8gfj">AddUint64</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">o.CurrentTS, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录待提交</span></span>
<span class="line"><span class="__shiki_140thh">        o.PendingCommits[commitTS] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">{startTS}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> commitTS, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 水印推进</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> AdvanceWatermark</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 找到所有已提交事务的最小开始时间戳</span></span>
<span class="line"><span class="__shiki_140thh">        minStartTS </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1t8gfj">findMinCommittedStartTS</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 推进水印</span></span>
<span class="line"><span class="__shiki_140thh">        o.Watermark </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> minStartTS</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 清理旧版本数据</span></span>
<span class="line"><span class="__shiki_140thh">        o.</span><span class="__shiki_1t8gfj">garbageCollectOldVersions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> o.Watermark</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-租约管理" tabindex="-1">3.1.2 租约管理 <a class="header-anchor" href="#_3-1-2-租约管理" aria-label="Permalink to &quot;3.1.2 租约管理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> LeaseManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Leases      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_21nrsd">  // 时间戳-&gt;租约</span></span>
<span class="line"><span class="__shiki_140thh">    Timeout     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 租约结构</span></span>
<span class="line"><span class="__shiki_1itgoe">    type</span><span class="__shiki_1t8gfj"> Lease</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        Timestamp </span><span class="__shiki_1itgoe">uint64</span></span>
<span class="line"><span class="__shiki_140thh">        Holder    </span><span class="__shiki_1itgoe">string</span><span class="__shiki_21nrsd">    // 节点标识</span></span>
<span class="line"><span class="__shiki_140thh">        Expires   </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">        Renewed   </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分配租约</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> AssignLease</span><span class="__shiki_140thh">(timestamp </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">, holder </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Lease {</span></span>
<span class="line"><span class="__shiki_140thh">        lease </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Lease</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Timestamp: timestamp,</span></span>
<span class="line"><span class="__shiki_140thh">            Holder:    holder,</span></span>
<span class="line"><span class="__shiki_140thh">            Expires:   time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(lm.Timeout),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        lm.Leases[timestamp] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lease</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 定期续约检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> lm.</span><span class="__shiki_1t8gfj">monitorLease</span><span class="__shiki_140thh">(lease)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> lease</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 租约有效性检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> IsValidLease</span><span class="__shiki_140thh">(timestamp </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">, holder </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        lease, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> lm.Leases[timestamp]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">exists {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> lease.Holder </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> holder {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">After</span><span class="__shiki_140thh">(lease.Expires) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            delete</span><span class="__shiki_140thh">(lm.Leases, timestamp)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-事务冲突管理" tabindex="-1">3.2 事务冲突管理 <a class="header-anchor" href="#_3-2-事务冲突管理" aria-label="Permalink to &quot;3.2 事务冲突管理&quot;">​</a></h3><h4 id="_3-2-1-冲突检测算法" tabindex="-1">3.2.1 冲突检测算法 <a class="header-anchor" href="#_3-2-1-冲突检测算法" aria-label="Permalink to &quot;3.2.1 冲突检测算法&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于时间戳的冲突检测</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TimestampConflictDetector</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ReadTimestamps  </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">  // 键-&gt;读取时间戳列表</span></span>
<span class="line"><span class="__shiki_140thh">    WriteTimestamps </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">  // 键-&gt;写入时间戳列表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CheckReadWriteConflict</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">read</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> tx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ReadSet</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            writes, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> cd</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">WriteTimestamps</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Key</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查是否有写操作在读取之后发生</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, writeTS </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> writes {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> writeTS </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> tx.StartTS </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> writeTS </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> tx.CommitTS {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_21nrsd">  // 冲突</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CheckWriteWriteConflict</span><span class="__shiki_140thh">(tx1, tx2 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查写集合重叠</span></span>
<span class="line"><span class="__shiki_140thh">        keys1 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx1.</span><span class="__shiki_1t8gfj">GetWriteKeys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        keys2 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx2.</span><span class="__shiki_1t8gfj">GetWriteKeys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, key1 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> keys1 {</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, key2 </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> keys2 {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> key1 </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> key2 {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 检查时间戳顺序</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> tx1.CommitTS </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> tx2.StartTS </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> tx1.StartTS </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> tx2.CommitTS {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 冲突解决策略</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ConflictResolver</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Strategies []</span><span class="__shiki_1t8gfj">ConflictResolutionStrategy</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Resolve</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">conflicts</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">Conflict</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Resolution</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">strategy</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> cr</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Strategies</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> resolution</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1t8gfj"> strategy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Resolve</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">conflicts</span><span class="__shiki_140thh">); </span><span class="__shiki_1t8gfj">resolution</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1t8gfj"> resolution</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 默认策略：中止较晚的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">AbortLaterTransaction</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 重试机制</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TransactionRetryManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    MaxRetries   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Backoff      </span><span class="__shiki_1t8gfj">BackoffStrategy</span></span>
<span class="line"><span class="__shiki_140thh">    ConflictRate </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> ExecuteWithRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txFunc</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> i</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; </span><span class="__shiki_1t8gfj">i</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1t8gfj"> trm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MaxRetries</span><span class="__shiki_140thh">; </span><span class="__shiki_1t8gfj">i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> txFunc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> err</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查是否可重试错误</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">trm.</span><span class="__shiki_1t8gfj">isRetryableError</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 指数退避</span></span>
<span class="line"><span class="__shiki_140thh">            delay </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> trm.Backoff.</span><span class="__shiki_1t8gfj">NextDelay</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_140thh">            time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(delay)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 动态调整策略</span></span>
<span class="line"><span class="__shiki_140thh">            trm.</span><span class="__shiki_1t8gfj">adjustStrategyBasedOnConflictRate</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrMaxRetriesExceeded</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、高级事务特性" tabindex="-1">四、高级事务特性 <a class="header-anchor" href="#四、高级事务特性" aria-label="Permalink to &quot;四、高级事务特性&quot;">​</a></h2><h3 id="_4-1-嵌套事务支持" tabindex="-1">4.1 嵌套事务支持 <a class="header-anchor" href="#_4-1-嵌套事务支持" aria-label="Permalink to &quot;4.1 嵌套事务支持&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 嵌套事务实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> NestedTransaction</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Parent      </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">NestedTransaction</span></span>
<span class="line"><span class="__shiki_140thh">    Children    []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">NestedTransaction</span></span>
<span class="line"><span class="__shiki_140thh">    Savepoints  []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Savepoint</span></span>
<span class="line"><span class="__shiki_140thh">    Operations  []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Operation</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> BeginNested</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">NestedTransaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        child </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">NestedTransaction</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Parent:   nt,</span></span>
<span class="line"><span class="__shiki_140thh">            Level:    nt.Level </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            StartTS:  </span><span class="__shiki_1t8gfj">GetTimestamp</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        nt.Children </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(nt.Children, child)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> child</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> CreateSavepoint</span><span class="__shiki_140thh">(name </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Savepoint {</span></span>
<span class="line"><span class="__shiki_140thh">        savepoint </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">Savepoint</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Name:       name,</span></span>
<span class="line"><span class="__shiki_140thh">            Timestamp:  </span><span class="__shiki_1t8gfj">GetTimestamp</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            Operations: nt.Operations[:],</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        nt.Savepoints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(nt.Savepoints, savepoint)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> savepoint</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> RollbackToSavepoint</span><span class="__shiki_140thh">(name </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(nt.Savepoints) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> nt.Savepoints[i].Name </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> name {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 回滚到保存点</span></span>
<span class="line"><span class="__shiki_140thh">                nt.Operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> nt.Savepoints[i].Operations</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 删除后续保存点</span></span>
<span class="line"><span class="__shiki_140thh">                nt.Savepoints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> nt.Savepoints[:i</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ErrSavepointNotFound</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 保存点管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SavepointManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Savepoints </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SavepointState</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> RollbackToSavepoint</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">savepointName</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        state, exists </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> sm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Savepoints</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">savepointName</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> ErrSavepointNotFound</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 撤销保存点之后的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(tx.Operations) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> state.OperationIndex; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            sm.</span><span class="__shiki_1t8gfj">undoOperation</span><span class="__shiki_140thh">(tx.Operations[i])</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 恢复事务状态</span></span>
<span class="line"><span class="__shiki_140thh">        tx.Operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.Operations[:state.OperationIndex]</span></span>
<span class="line"><span class="__shiki_140thh">        tx.WriteSet </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.WriteSet[:state.WriteSetIndex]</span></span>
<span class="line"><span class="__shiki_140thh">        tx.ReadSet </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.ReadSet[:state.ReadSetIndex]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-分布式死锁检测" tabindex="-1">4.2 分布式死锁检测 <a class="header-anchor" href="#_4-2-分布式死锁检测" aria-label="Permalink to &quot;4.2 分布式死锁检测&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 等待图检测死锁</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> WaitForGraph</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Nodes </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TransactionNode</span></span>
<span class="line"><span class="__shiki_140thh">    Edges </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">][]</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">  // 事务ID -&gt; 等待的事务ID</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> AddWait</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">waitForTxID</span><span class="__shiki_1itgoe"> uint64</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        wfg</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Edges</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">txID</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">wfg</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Edges</span><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">txID</span><span class="__shiki_140thh">], </span><span class="__shiki_1t8gfj">waitForTxID</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检测环</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> wfg</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HasCycle</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            wfg.</span><span class="__shiki_1t8gfj">resolveDeadlock</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> HasCycle</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        visited </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        recStack </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> txID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> wfg.Nodes {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">visited[txID] {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> wfg.</span><span class="__shiki_1t8gfj">detectCycleDFS</span><span class="__shiki_140thh">(txID, visited, recStack) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> resolveDeadlock</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 找到死锁环</span></span>
<span class="line"><span class="__shiki_140thh">        cycle </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wfg.</span><span class="__shiki_1t8gfj">findCycle</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 选择牺牲者(基于代价)</span></span>
<span class="line"><span class="__shiki_140thh">        victim </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> wfg.</span><span class="__shiki_1t8gfj">chooseVictim</span><span class="__shiki_140thh">(cycle)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 中止牺牲者事务</span></span>
<span class="line"><span class="__shiki_140thh">        wfg.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">(victim)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 移除相关边</span></span>
<span class="line"><span class="__shiki_140thh">        wfg.</span><span class="__shiki_1t8gfj">removeEdgesForTransaction</span><span class="__shiki_140thh">(victim)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 死锁预防策略</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> DeadlockPrevention</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    TimeoutBased </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    WaitDie      </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    WoundWait    </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Prevent</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">resource</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Resource</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> dp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TimeoutBased</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> dp</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">timeoutPrevention</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">resource</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> dp.WaitDie {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> dp.</span><span class="__shiki_1t8gfj">waitDieProtocol</span><span class="__shiki_140thh">(tx, resource)</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> dp.WoundWait {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> dp.</span><span class="__shiki_1t8gfj">woundWaitProtocol</span><span class="__shiki_140thh">(tx, resource)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Wait-Die协议</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> waitDieProtocol</span><span class="__shiki_140thh">(tx </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction, resource </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Resource) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        holder </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> resource.</span><span class="__shiki_1t8gfj">GetHolder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> holder </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 资源可用</span></span>
<span class="line"><span class="__shiki_140thh">            resource.</span><span class="__shiki_1t8gfj">Acquire</span><span class="__shiki_140thh">(tx)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> tx.StartTS </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> holder.StartTS {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 较老的事务等待</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrWait</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 较新的事务中止</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ErrDie</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-混合事务分析-hybrid-transactional-analytical-processing-htap" tabindex="-1">4.3 混合事务分析(Hybrid Transactional/Analytical Processing, HTAP) <a class="header-anchor" href="#_4-3-混合事务分析-hybrid-transactional-analytical-processing-htap" aria-label="Permalink to &quot;4.3 混合事务分析(Hybrid Transactional/Analytical Processing, HTAP)&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// HTAP事务处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> HTAPProcessor</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    OLTPEngine </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">OLTPEngine</span><span class="__shiki_21nrsd">  // 联机事务处理</span></span>
<span class="line"><span class="__shiki_140thh">    OLAPEngine </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">OLAPEngine</span><span class="__shiki_21nrsd">  // 联机分析处理</span></span>
<span class="line"><span class="__shiki_140thh">    DataSync   </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DataSyncManager</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> ProcessTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. OLTP处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> err</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1t8gfj"> ht</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">OLTPEngine</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Process</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">); </span><span class="__shiki_1t8gfj">err</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 异步复制到OLAP</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> ht.DataSync.</span><span class="__shiki_1t8gfj">ReplicateToOLAP</span><span class="__shiki_140thh">(tx)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 维护一致性视图</span></span>
<span class="line"><span class="__shiki_140thh">        ht.</span><span class="__shiki_1t8gfj">maintainConsistentViews</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多版本并发控制优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MVCCOptimizer</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    VersionRetentionPolicy </span><span class="__shiki_1t8gfj">RetentionPolicy</span></span>
<span class="line"><span class="__shiki_140thh">    GarbageCollector       </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">GCManager</span></span>
<span class="line"><span class="__shiki_140thh">    SnapshotManager       </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">SnapshotManager</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> OptimizeForHTAP</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 为OLTP保持少量版本</span></span>
<span class="line"><span class="__shiki_140thh">        mvo.VersionRetentionPolicy.OLTPVersions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 为OLAP保持更多版本</span></span>
<span class="line"><span class="__shiki_140thh">        mvo.VersionRetentionPolicy.OLAPVersions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 定期创建分析快照</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_1t8gfj"> mvo</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createAnalyticalSnapshots</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 优化垃圾回收</span></span>
<span class="line"><span class="__shiki_140thh">        mvo.GarbageCollector.</span><span class="__shiki_1t8gfj">OptimizeForMixedWorkload</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、事务api与使用模式" tabindex="-1">五、事务API与使用模式 <a class="header-anchor" href="#五、事务api与使用模式" aria-label="Permalink to &quot;五、事务API与使用模式&quot;">​</a></h2><h3 id="_5-1-客户端事务api" tabindex="-1">5.1 客户端事务API <a class="header-anchor" href="#_5-1-客户端事务api" aria-label="Permalink to &quot;5.1 客户端事务API&quot;">​</a></h3><h4 id="_5-1-1-go客户端示例" tabindex="-1">5.1.1 Go客户端示例 <a class="header-anchor" href="#_5-1-1-go客户端示例" aria-label="Permalink to &quot;5.1.1 Go客户端示例&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基本事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> BasicTransactionExample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">dgo</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Dgraph</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建事务</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">NewTxn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Discard</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            user(func: eq(email, &quot;alice@example.com&quot;)) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                uid</span></span>
<span class="line"><span class="__shiki_mdbnqw">                name</span></span>
<span class="line"><span class="__shiki_mdbnqw">                balance</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析结果并执行更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        User []</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            UID     </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;uid&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">            Name    </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;name&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">            Balance </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">    \`json:&quot;balance&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_mdbnqw">\`json:&quot;user&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(resp.Json, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">user); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(user.User) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user not found&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    uid </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> user.User[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].UID</span></span>
<span class="line"><span class="__shiki_140thh">    newBalance </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> user.User[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].Balance </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行修改</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Mutate</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">api</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        SetNquads: []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &lt;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&gt; &lt;balance&gt; &quot;</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot; .</span></span>
<span class="line"><span class="__shiki_mdbnqw">        \`</span><span class="__shiki_140thh">, uid, newBalance)),</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 条件更新事务</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> ConditionalUpdateExample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">dgo</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Dgraph</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">NewTxn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Discard</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用Upsert进行条件更新</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        query {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            user as var(func: eq(email, &quot;alice@example.com&quot;))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            balance as var(func: uid(user)) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                current_balance: balance</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    mutation </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">api</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Cond: </span><span class="__shiki_mdbnqw">\`@if(eq(len(user), 1) AND gt(val(balance), 100))\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        SetNquads: []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">            uid(user) &lt;balance&gt; &quot;val(balance) - 100&quot; .</span></span>
<span class="line"><span class="__shiki_mdbnqw">            uid(user) &lt;last_transaction&gt; &quot;2024-01-15&quot; .</span></span>
<span class="line"><span class="__shiki_mdbnqw">        \`</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Do</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">api</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Query:      query,</span></span>
<span class="line"><span class="__shiki_140thh">        Mutations:  []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">api</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">{mutation},</span></span>
<span class="line"><span class="__shiki_140thh">        CommitNow:  </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-1-2-事务选项配置" tabindex="-1">5.1.2 事务选项配置 <a class="header-anchor" href="#_5-1-2-事务选项配置" aria-label="Permalink to &quot;5.1.2 事务选项配置&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务配置选项</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TransactionOptions</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 隔离级别</span></span>
<span class="line"><span class="__shiki_140thh">    IsolationLevel   </span><span class="__shiki_1t8gfj">IsolationLevel</span></span>
<span class="line"><span class="__shiki_140thh">    ReadTimestamp    </span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_21nrsd">    // 指定读时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    ReadOnly         </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">      // 只读事务</span></span>
<span class="line"><span class="__shiki_140thh">    BestEffort       </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">      // 最佳努力模式</span></span>
<span class="line"><span class="__shiki_140thh">    Linearizable     </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_21nrsd">      // 线性一致读</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 超时和重试</span></span>
<span class="line"><span class="__shiki_140thh">    Timeout          </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    MaxRetries       </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    RetryDelay       </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 冲突处理</span></span>
<span class="line"><span class="__shiki_140thh">    ConflictStrategy </span><span class="__shiki_1t8gfj">ConflictStrategy</span></span>
<span class="line"><span class="__shiki_140thh">    Priority         </span><span class="__shiki_1itgoe">int</span><span class="__shiki_21nrsd">       // 事务优先级</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 调试</span></span>
<span class="line"><span class="__shiki_140thh">    Trace            </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    Explain          </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义事务</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> CustomTransactionExample</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">dgo</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Dgraph</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">opts</span><span class="__shiki_1t8gfj"> TransactionOptions</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">NewTxnWithOptions</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">dgo</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TxnOptions</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        ReadOnly:       opts.ReadOnly,</span></span>
<span class="line"><span class="__shiki_140thh">        BestEffort:     opts.BestEffort,</span></span>
<span class="line"><span class="__shiki_140thh">        Linearizable:   opts.Linearizable,</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置超时上下文</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), opts.Timeout)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> lastErr </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> opts.MaxRetries; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> executeTransactionLogic</span><span class="__shiki_140thh">(ctx, txn)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">opts.ReadOnly {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否可重试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">isRetryableError</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        lastErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 等待重试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> opts.MaxRetries</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(opts.RetryDelay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_140thh">i)) </span><span class="__shiki_21nrsd">// 指数退避</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;transaction failed after </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> retries: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, opts.MaxRetries, lastErr)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-事务监控与诊断" tabindex="-1">5.2 事务监控与诊断 <a class="header-anchor" href="#_5-2-事务监控与诊断" aria-label="Permalink to &quot;5.2 事务监控与诊断&quot;">​</a></h3><h4 id="_5-2-1-事务指标监控" tabindex="-1">5.2.1 事务指标监控 <a class="header-anchor" href="#_5-2-1-事务指标监控" aria-label="Permalink to &quot;5.2.1 事务指标监控&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务性能指标</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TransactionMetrics</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 吞吐量指标</span></span>
<span class="line"><span class="__shiki_140thh">    Throughput </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        TPS         </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 每秒事务数</span></span>
<span class="line"><span class="__shiki_140thh">        QPS         </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 每秒查询数</span></span>
<span class="line"><span class="__shiki_140thh">        MPS         </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 每秒修改数</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 延迟指标</span></span>
<span class="line"><span class="__shiki_140thh">    Latency </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        AvgLatency     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">  // 平均延迟</span></span>
<span class="line"><span class="__shiki_140thh">        P50Latency     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">  // 50分位延迟</span></span>
<span class="line"><span class="__shiki_140thh">        P95Latency     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">  // 95分位延迟</span></span>
<span class="line"><span class="__shiki_140thh">        P99Latency     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_21nrsd">  // 99分位延迟</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 冲突指标</span></span>
<span class="line"><span class="__shiki_140thh">    ConflictRate     </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 冲突率</span></span>
<span class="line"><span class="__shiki_140thh">    AbortRate        </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 中止率</span></span>
<span class="line"><span class="__shiki_140thh">    RetryRate        </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 重试率</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 资源使用</span></span>
<span class="line"><span class="__shiki_140thh">    ResourceUsage </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        CPUUsage       </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // CPU使用率</span></span>
<span class="line"><span class="__shiki_140thh">        MemoryUsage    </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 内存使用率</span></span>
<span class="line"><span class="__shiki_140thh">        DiskIO         </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 磁盘IO</span></span>
<span class="line"><span class="__shiki_140thh">        NetworkIO      </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_21nrsd">   // 网络IO</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务分布</span></span>
<span class="line"><span class="__shiki_140thh">    TransactionDistribution </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        ReadOnly       </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">     // 只读事务数</span></span>
<span class="line"><span class="__shiki_140thh">        ReadWrite      </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">     // 读写事务数</span></span>
<span class="line"><span class="__shiki_140thh">        Distributed    </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">     // 分布式事务数</span></span>
<span class="line"><span class="__shiki_140thh">        Local          </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_21nrsd">     // 本地事务数</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控数据收集器</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MetricsCollector</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Metrics        </span><span class="__shiki_1t8gfj">TransactionMetrics</span></span>
<span class="line"><span class="__shiki_140thh">    WindowSize     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    LastUpdate     </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Collect</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        mc.Metrics.Throughput.TPS</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> tx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Type</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_1t8gfj"> ReadWrite</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            mc.Metrics.TransactionDistribution.ReadWrite</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            mc.Metrics.TransactionDistribution.ReadOnly</span><span class="__shiki_1itgoe">++</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录延迟</span></span>
<span class="line"><span class="__shiki_140thh">        latency </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(tx.StartTime)</span></span>
<span class="line"><span class="__shiki_140thh">        mc.</span><span class="__shiki_1t8gfj">updateLatencyMetrics</span><span class="__shiki_140thh">(latency)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> tx.HasConflict {</span></span>
<span class="line"><span class="__shiki_140thh">            mc.Metrics.ConflictRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                float64</span><span class="__shiki_140thh">(mc.Metrics.ConflictCount) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(mc.Metrics.TotalTransactions)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 定期报告</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(mc.LastUpdate) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> mc.ReportInterval {</span></span>
<span class="line"><span class="__shiki_140thh">            mc.</span><span class="__shiki_1t8gfj">reportMetrics</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            mc.LastUpdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_5-2-2-事务追踪与调试" tabindex="-1">5.2.2 事务追踪与调试 <a class="header-anchor" href="#_5-2-2-事务追踪与调试" aria-label="Permalink to &quot;5.2.2 事务追踪与调试&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分布式事务追踪</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TransactionTracer</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    TraceID      </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Spans        []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TraceSpan</span></span>
<span class="line"><span class="__shiki_140thh">    Logs         []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TraceLog</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> StartSpan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">attributes</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TraceSpan</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        span </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">TraceSpan</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            ID:         </span><span class="__shiki_1t8gfj">generateSpanID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            Name:       name,</span></span>
<span class="line"><span class="__shiki_140thh">            StartTime:  time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            Attributes: attributes,</span></span>
<span class="line"><span class="__shiki_140thh">            ParentID:   tt.</span><span class="__shiki_1t8gfj">getCurrentSpanID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        tt.Spans </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(tt.Spans, span)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> span</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> AddLog</span><span class="__shiki_140thh">(level LogLevel, message </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, fields </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}) {</span></span>
<span class="line"><span class="__shiki_140thh">        log </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">TraceLog</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Timestamp: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            Level:     level,</span></span>
<span class="line"><span class="__shiki_140thh">            Message:   message,</span></span>
<span class="line"><span class="__shiki_140thh">            Fields:    fields,</span></span>
<span class="line"><span class="__shiki_140thh">            SpanID:    tt.</span><span class="__shiki_1t8gfj">getCurrentSpanID</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        tt.Logs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(tt.Logs, log)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成Jaeger兼容的追踪数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> ExportJaegerTrace</span><span class="__shiki_140thh">() []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 转换追踪数据为Jaeger格式</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> convertToJaegerFormat</span><span class="__shiki_140thh">(tt)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务调试工具</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TransactionDebugger</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> DiagnoseSlowTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">txID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DiagnosisReport</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        report </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">DiagnosisReport</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            TransactionID: txID,</span></span>
<span class="line"><span class="__shiki_140thh">            Timestamp:     time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分析事务步骤</span></span>
<span class="line"><span class="__shiki_140thh">        steps </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">getTransactionSteps</span><span class="__shiki_140thh">(txID)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, step </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> steps {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_140thh"> step.Type {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;Query&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                report.QueryAnalysis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">analyzeQuery</span><span class="__shiki_140thh">(step.Query)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;Mutation&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                report.MutationAnalysis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">analyzeMutation</span><span class="__shiki_140thh">(step.Mutation)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;Wait&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                report.WaitAnalysis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">analyzeWait</span><span class="__shiki_140thh">(step.WaitReason)</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &quot;Conflict&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                report.ConflictAnalysis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">analyzeConflict</span><span class="__shiki_140thh">(step.ConflictDetails)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 提供优化建议</span></span>
<span class="line"><span class="__shiki_140thh">        report.Recommendations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> td.</span><span class="__shiki_1t8gfj">generateRecommendations</span><span class="__shiki_140thh">(report)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> report</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、性能优化与调优" tabindex="-1">六、性能优化与调优 <a class="header-anchor" href="#六、性能优化与调优" aria-label="Permalink to &quot;六、性能优化与调优&quot;">​</a></h2><h3 id="_6-1-事务性能优化" tabindex="-1">6.1 事务性能优化 <a class="header-anchor" href="#_6-1-事务性能优化" aria-label="Permalink to &quot;6.1 事务性能优化&quot;">​</a></h3><h4 id="_6-1-1-写优化策略" tabindex="-1">6.1.1 写优化策略 <a class="header-anchor" href="#_6-1-1-写优化策略" aria-label="Permalink to &quot;6.1.1 写优化策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量写优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BatchWriter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    BatchSize    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    FlushSize    </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    Buffer       []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Mutation</span></span>
<span class="line"><span class="__shiki_140thh">    WriteQueue   </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Mutation</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Write</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">mutation</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        bw.Buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">bw</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">mutation</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">bw</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Buffer</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_1t8gfj"> bw</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BatchSize</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> bw</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Flush</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Flush</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(bw.Buffer) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 合并多个修改为单个事务</span></span>
<span class="line"><span class="__shiki_140thh">        merged </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bw.</span><span class="__shiki_1t8gfj">mergeMutations</span><span class="__shiki_140thh">(bw.Buffer)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用单个事务提交</span></span>
<span class="line"><span class="__shiki_140thh">        txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">NewTxn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        defer</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Discard</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Mutate</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), merged)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        bw.Buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> bw.Buffer[:</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 异步提交优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> AsyncCommitter</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Queue       </span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Transaction</span></span>
<span class="line"><span class="__shiki_140thh">    Workers     </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    BatchWindow </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> i</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; </span><span class="__shiki_1t8gfj">i</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1t8gfj"> ac</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Workers</span><span class="__shiki_140thh">; </span><span class="__shiki_1t8gfj">i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            go</span><span class="__shiki_1t8gfj"> ac</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">worker</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">i</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> worker</span><span class="__shiki_140thh">(id </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> batch []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Transaction</span></span>
<span class="line"><span class="__shiki_140thh">        ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(ac.BatchWindow)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            select</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> tx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ac.Queue:</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(batch, tx)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> ac.BatchSize {</span></span>
<span class="line"><span class="__shiki_140thh">                    ac.</span><span class="__shiki_1t8gfj">commitBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                    batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch[:</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_1itgoe"> &lt;-</span><span class="__shiki_140thh">ticker.C:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    ac.</span><span class="__shiki_1t8gfj">commitBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                    batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch[:</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> commitBatch</span><span class="__shiki_140thh">(batch []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用两阶段提交优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ac.</span><span class="__shiki_1t8gfj">twoPhaseCommitBatch</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_6-1-2-读优化策略" tabindex="-1">6.1.2 读优化策略 <a class="header-anchor" href="#_6-1-2-读优化策略" aria-label="Permalink to &quot;6.1.2 读优化策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 只读副本优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ReadReplicaOptimizer</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Replicas      []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AlphaNode</span></span>
<span class="line"><span class="__shiki_140thh">    LoadBalancer  </span><span class="__shiki_1t8gfj">LoadBalancer</span></span>
<span class="line"><span class="__shiki_140thh">    Consistency   </span><span class="__shiki_1t8gfj">ReadConsistency</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> RouteRead</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">AlphaNode</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据一致性要求选择节点</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_1t8gfj"> rro</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Consistency</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> Strong:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 强一致：读主节点</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> rro</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getLeader</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> Eventual:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 最终一致：选择最近的副本</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> rro</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">selectNearestReplica</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_140thh"> Staleness:</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 允许一定程度的过时</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1t8gfj"> rro</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">selectStaleReplica</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">maxStaleness</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, ErrNoAvailableNode</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询缓存优化</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> QueryCache</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Cache        </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LRUCache</span></span>
<span class="line"><span class="__shiki_140thh">    MaxSize      </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    TTL          </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_1itgoe"> map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">QueryResult</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> qc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateCacheKey</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">variables</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> entry</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1t8gfj"> qc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">key</span><span class="__shiki_140thh">); </span><span class="__shiki_1t8gfj">exists</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">entry</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Timestamp</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1t8gfj"> qc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TTL</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1t8gfj"> entry</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Result</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            qc.Cache.</span><span class="__shiki_1t8gfj">Remove</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">(query </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, variables </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, result </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">QueryResult) {</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> qc.</span><span class="__shiki_1t8gfj">generateCacheKey</span><span class="__shiki_140thh">(query, variables)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        entry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">CacheEntry</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Key:       key,</span></span>
<span class="line"><span class="__shiki_140thh">            Result:    result,</span></span>
<span class="line"><span class="__shiki_140thh">            Timestamp: time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        qc.Cache.</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(key, entry)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-事务配置调优" tabindex="-1">6.2 事务配置调优 <a class="header-anchor" href="#_6-2-事务配置调优" aria-label="Permalink to &quot;6.2 事务配置调优&quot;">​</a></h3><h4 id="_6-2-1-关键配置参数" tabindex="-1">6.2.1 关键配置参数 <a class="header-anchor" href="#_6-2-1-关键配置参数" aria-label="Permalink to &quot;6.2.1 关键配置参数&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Alpha节点配置</span></span>
<span class="line"><span class="__shiki_17hn0y">alpha_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 事务相关配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  transaction</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_retries</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">                    # 最大重试次数</span></span>
<span class="line"><span class="__shiki_17hn0y">    conflict_retry_delay</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10ms&quot;</span><span class="__shiki_21nrsd">       # 冲突重试延迟</span></span>
<span class="line"><span class="__shiki_17hn0y">    timestamp_slack_ms</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_21nrsd">           # 时间戳松弛时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # MVCC配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  mvcc</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_versions</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_21nrsd">                    # 最大版本数</span></span>
<span class="line"><span class="__shiki_17hn0y">    garbage_collection_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5m&quot;</span><span class="__shiki_21nrsd">  # GC间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">    snapshot_retention</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24h&quot;</span><span class="__shiki_21nrsd">          # 快照保留时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 内存配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    size_mb</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10240</span><span class="__shiki_21nrsd">                     # 缓存大小</span></span>
<span class="line"><span class="__shiki_17hn0y">    percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_21nrsd">                     # 内存百分比</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # WAL配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  wal</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    sync_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span><span class="__shiki_21nrsd">                # 同步间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_entries</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd">                 # 最大条目数</span></span>
<span class="line"><span class="__shiki_17hn0y">    compression</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">                  # 是否压缩</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Zero节点配置</span></span>
<span class="line"><span class="__shiki_17hn0y">zero_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # Oracle配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  oracle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    update_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1s&quot;</span><span class="__shiki_21nrsd">              # 更新时间间隔</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_pending</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_21nrsd">                  # 最大待处理事务</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 租约配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  lease</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span><span class="__shiki_21nrsd">                    # 租约时长</span></span>
<span class="line"><span class="__shiki_17hn0y">    renew_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span><span class="__shiki_21nrsd">               # 续约间隔</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 网络配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  network</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span><span class="__shiki_21nrsd">                     # 超时时间</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_retries</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_21nrsd">                     # 最大重试次数</span></span></code></pre></div><h4 id="_6-2-2-动态调优策略" tabindex="-1">6.2.2 动态调优策略 <a class="header-anchor" href="#_6-2-2-动态调优策略" aria-label="Permalink to &quot;6.2.2 动态调优策略&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自适应配置管理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> AdaptiveConfigManager</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    CurrentConfig    </span><span class="__shiki_1t8gfj">Config</span></span>
<span class="line"><span class="__shiki_140thh">    PerformanceStats </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">PerformanceStatistics</span></span>
<span class="line"><span class="__shiki_140thh">    Rules            []</span><span class="__shiki_1t8gfj">AdaptationRule</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> MonitorAndAdjust</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        ticker </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">NewTicker</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">acm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MonitoringInterval</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> ticker</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">C</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 收集性能指标</span></span>
<span class="line"><span class="__shiki_140thh">            stats </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> acm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectPerformanceStats</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 评估当前配置</span></span>
<span class="line"><span class="__shiki_140thh">            score </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> acm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">evaluateConfig</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 根据规则调整配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">rule</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> acm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Rules</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> rule</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Condition</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">stats</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    newConfig </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> rule</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Action</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">acm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CurrentConfig</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 应用新配置</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_1t8gfj"> acm</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">applyConfig</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">newConfig</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        acm.CurrentConfig </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> newConfig</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录配置变更</span></span>
<span class="line"><span class="__shiki_140thh">            acm.</span><span class="__shiki_1t8gfj">logConfigChanges</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自适应规则示例</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> AdaptationRule</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Name        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Condition   </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stats</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">PerformanceStatistics</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">    Action      </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_1t8gfj"> Config</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Config</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> Rules </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">AdaptationRule</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">        Name: </span><span class="__shiki_mdbnqw">&quot;IncreaseCacheOnHighMissRate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Condition: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stats</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">PerformanceStatistics</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> stats.CacheMissRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> stats.MemoryUsage </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.7</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        Action: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_1t8gfj"> Config</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Config</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            config.Cache.SizeMB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> min</span><span class="__shiki_140thh">(config.Cache.SizeMB </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.5</span><span class="__shiki_140thh">, MaxCacheSize)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">        Name: </span><span class="__shiki_mdbnqw">&quot;ReduceRetriesOnLowConflict&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        Condition: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">stats</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">PerformanceStatistics</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> stats.ConflictRate </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> stats.MaxRetries </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        Action: </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_1t8gfj"> Config</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Config</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            config.Transaction.MaxRetries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, config.Transaction.MaxRetries </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、故障恢复与容错" tabindex="-1">七、故障恢复与容错 <a class="header-anchor" href="#七、故障恢复与容错" aria-label="Permalink to &quot;七、故障恢复与容错&quot;">​</a></h2><h3 id="_7-1-事务恢复机制" tabindex="-1">7.1 事务恢复机制 <a class="header-anchor" href="#_7-1-事务恢复机制" aria-label="Permalink to &quot;7.1 事务恢复机制&quot;">​</a></h3><h4 id="_7-1-1-崩溃恢复协议" tabindex="-1">7.1.1 崩溃恢复协议 <a class="header-anchor" href="#_7-1-1-崩溃恢复协议" aria-label="Permalink to &quot;7.1.1 崩溃恢复协议&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ARIES恢复算法实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ARIESRecovery</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    LogManager    </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">LogManager</span></span>
<span class="line"><span class="__shiki_140thh">    TransactionTable </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">TransactionState</span></span>
<span class="line"><span class="__shiki_140thh">    DirtyPageTable </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">uint64</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">DirtyPageInfo</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Recover</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 阶段1: 分析阶段</span></span>
<span class="line"><span class="__shiki_140thh">        ar.</span><span class="__shiki_1t8gfj">analysisPhase</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 阶段2: 重做阶段</span></span>
<span class="line"><span class="__shiki_140thh">        ar.</span><span class="__shiki_1t8gfj">redoPhase</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 阶段3: 撤销阶段</span></span>
<span class="line"><span class="__shiki_140thh">        ar.</span><span class="__shiki_1t8gfj">undoPhase</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> analysisPhase</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 找到最后一个检查点</span></span>
<span class="line"><span class="__shiki_140thh">        checkpoint </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ar.</span><span class="__shiki_1t8gfj">findLastCheckpoint</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 重建事务表和脏页表</span></span>
<span class="line"><span class="__shiki_140thh">        ar.</span><span class="__shiki_1t8gfj">rebuildTablesFromLog</span><span class="__shiki_140thh">(checkpoint.LSN)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> redoPhase</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从检查点开始重做</span></span>
<span class="line"><span class="__shiki_140thh">        startLSN </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ar.LastCheckpoint.LSN</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> lsn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> startLSN; lsn </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> ar.LogManager.MaxLSN; lsn</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            logRecord </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ar.LogManager.</span><span class="__shiki_1t8gfj">GetRecord</span><span class="__shiki_140thh">(lsn)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ar.</span><span class="__shiki_1t8gfj">needsRedo</span><span class="__shiki_140thh">(logRecord) {</span></span>
<span class="line"><span class="__shiki_140thh">                ar.</span><span class="__shiki_1t8gfj">redoLogRecord</span><span class="__shiki_140thh">(logRecord)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> undoPhase</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 撤销未提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, txState </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> ar.TransactionTable {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> txState.Status </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> TransactionCommitted {</span></span>
<span class="line"><span class="__shiki_140thh">                ar.</span><span class="__shiki_1t8gfj">undoTransaction</span><span class="__shiki_140thh">(txState)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-1-2-分布式事务恢复" tabindex="-1">7.1.2 分布式事务恢复 <a class="header-anchor" href="#_7-1-2-分布式事务恢复" aria-label="Permalink to &quot;7.1.2 分布式事务恢复&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 两阶段提交恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> TwoPhaseCommitRecovery</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> RecoverIncompleteTransactions</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查询所有未完成的事务</span></span>
<span class="line"><span class="__shiki_140thh">        incomplete </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> tpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">queryIncompleteTransactions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> incomplete</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            switch</span><span class="__shiki_1t8gfj"> tx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">State</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> TransactionPreparing:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 询问所有参与者状态</span></span>
<span class="line"><span class="__shiki_140thh">                votes </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> tpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectVotes</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> allVotedYes</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">votes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    tpc.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">tx</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    tpc.</span><span class="__shiki_1t8gfj">abortTransaction</span><span class="__shiki_140thh">(tx)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> TransactionCommitting:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 事务正在提交，完成提交</span></span>
<span class="line"><span class="__shiki_140thh">                tpc.</span><span class="__shiki_1t8gfj">finalizeCommit</span><span class="__shiki_140thh">(tx)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_140thh"> TransactionAborting:</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 事务正在中止，完成中止</span></span>
<span class="line"><span class="__shiki_140thh">                tpc.</span><span class="__shiki_1t8gfj">finalizeAbort</span><span class="__shiki_140thh">(tx)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> queryIncompleteTransactions</span><span class="__shiki_140thh">() []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">Transaction {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从所有节点收集未完成事务</span></span>
<span class="line"><span class="__shiki_1itgoe">        var</span><span class="__shiki_140thh"> incomplete []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Transaction</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, node </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> tpc.Nodes {</span></span>
<span class="line"><span class="__shiki_140thh">            nodeIncomplete </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> node.</span><span class="__shiki_1t8gfj">GetIncompleteTransactions</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            incomplete </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(incomplete, nodeIncomplete</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> deduplicateTransactions</span><span class="__shiki_140thh">(incomplete)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-容错与高可用" tabindex="-1">7.2 容错与高可用 <a class="header-anchor" href="#_7-2-容错与高可用" aria-label="Permalink to &quot;7.2 容错与高可用&quot;">​</a></h3><h4 id="_7-2-1-副本故障处理" tabindex="-1">7.2.1 副本故障处理 <a class="header-anchor" href="#_7-2-1-副本故障处理" aria-label="Permalink to &quot;7.2.1 副本故障处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Raft容错处理</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RaftFaultTolerance</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> HandleNodeFailure</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">failedNodeID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 检测故障</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">rft</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isNodeReallyFailed</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">failedNodeID</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 重新选举领导者(如果需要)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> rft.</span><span class="__shiki_1t8gfj">isLeader</span><span class="__shiki_140thh">(failedNodeID) {</span></span>
<span class="line"><span class="__shiki_140thh">            rft.</span><span class="__shiki_1t8gfj">initiateLeaderElection</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 重新分配分片</span></span>
<span class="line"><span class="__shiki_140thh">        rft.</span><span class="__shiki_1t8gfj">reassignTablets</span><span class="__shiki_140thh">(failedNodeID)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 恢复副本</span></span>
<span class="line"><span class="__shiki_140thh">        rft.</span><span class="__shiki_1t8gfj">recoverReplicas</span><span class="__shiki_140thh">(failedNodeID)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> recoverReplicas</span><span class="__shiki_140thh">(failedNodeID </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 找到受影响的分片</span></span>
<span class="line"><span class="__shiki_140thh">        affectedTablets </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rft.</span><span class="__shiki_1t8gfj">findAffectedTablets</span><span class="__shiki_140thh">(failedNodeID)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, tablet </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> affectedTablets {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 从其他副本恢复数据</span></span>
<span class="line"><span class="__shiki_140thh">            sourceReplica </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> rft.</span><span class="__shiki_1t8gfj">findHealthyReplica</span><span class="__shiki_140thh">(tablet)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 复制数据到新节点</span></span>
<span class="line"><span class="__shiki_140thh">            rft.</span><span class="__shiki_1t8gfj">replicateTablet</span><span class="__shiki_140thh">(tablet, sourceReplica)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新成员信息</span></span>
<span class="line"><span class="__shiki_140thh">            rft.</span><span class="__shiki_1t8gfj">updateMembership</span><span class="__shiki_140thh">(tablet, failedNodeID)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_7-2-2-脑裂处理" tabindex="-1">7.2.2 脑裂处理 <a class="header-anchor" href="#_7-2-2-脑裂处理" aria-label="Permalink to &quot;7.2.2 脑裂处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 网络分区恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> NetworkPartitionHandler</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> HandleSplitBrain</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">partitionedNodes</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 检测多数派</span></span>
<span class="line"><span class="__shiki_140thh">        majority </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> nph</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">determineMajority</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 少数派中止写操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> _</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">node</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> partitionedNodes</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">nph</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">isInMajority</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">node</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                nph.</span><span class="__shiki_1t8gfj">demoteNodeToReadOnly</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">node</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 解决冲突</span></span>
<span class="line"><span class="__shiki_140thh">        conflicts </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> nph.</span><span class="__shiki_1t8gfj">detectConflictingWrites</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        nph.</span><span class="__shiki_1t8gfj">resolveConflicts</span><span class="__shiki_140thh">(conflicts, majority)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 网络恢复后的合并</span></span>
<span class="line"><span class="__shiki_1itgoe">        go</span><span class="__shiki_140thh"> nph.</span><span class="__shiki_1t8gfj">monitorNetworkRecovery</span><span class="__shiki_140thh">(partitionedNodes)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> resolveConflicts</span><span class="__shiki_140thh">(conflicts []</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">WriteConflict, majority []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, conflict </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> conflicts {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 使用时间戳解决冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> conflict.Timestamp1 </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> conflict.Timestamp2 {</span></span>
<span class="line"><span class="__shiki_140thh">                nph.</span><span class="__shiki_1t8gfj">acceptWrite</span><span class="__shiki_140thh">(conflict.Write1)</span></span>
<span class="line"><span class="__shiki_140thh">                nph.</span><span class="__shiki_1t8gfj">rejectWrite</span><span class="__shiki_140thh">(conflict.Write2)</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                nph.</span><span class="__shiki_1t8gfj">acceptWrite</span><span class="__shiki_140thh">(conflict.Write2)</span></span>
<span class="line"><span class="__shiki_140thh">                nph.</span><span class="__shiki_1t8gfj">rejectWrite</span><span class="__shiki_140thh">(conflict.Write1)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、最佳实践与用例" tabindex="-1">八、最佳实践与用例 <a class="header-anchor" href="#八、最佳实践与用例" aria-label="Permalink to &quot;八、最佳实践与用例&quot;">​</a></h2><h3 id="_8-1-事务设计模式" tabindex="-1">8.1 事务设计模式 <a class="header-anchor" href="#_8-1-事务设计模式" aria-label="Permalink to &quot;8.1 事务设计模式&quot;">​</a></h3><h4 id="_8-1-1-补偿事务模式" tabindex="-1">8.1.1 补偿事务模式 <a class="header-anchor" href="#_8-1-1-补偿事务模式" aria-label="Permalink to &quot;8.1.1 补偿事务模式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Saga模式实现</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SagaCoordinator</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Steps       []</span><span class="__shiki_1t8gfj">SagaStep</span></span>
<span class="line"><span class="__shiki_140thh">    Compensations </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">CompensationFunc</span></span>
<span class="line"><span class="__shiki_140thh">    State       </span><span class="__shiki_1t8gfj">SagaState</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> Execute</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        completedSteps </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">SagaStep</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_1t8gfj"> i</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">step</span><span class="__shiki_1itgoe"> :=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_1t8gfj"> sc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Steps</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> step</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Execute</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1t8gfj"> err</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 执行失败，开始补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_1t8gfj"> sc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">completedSteps</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            completedSteps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(completedSteps, step)</span></span>
<span class="line"><span class="__shiki_140thh">            sc.State.CurrentStep </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i</span></span>
<span class="line"><span class="__shiki_140thh">            sc.State.CompletedSteps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> completedSteps</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        sc.State.Status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SagaCompleted</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_1t8gfj"> compensate</span><span class="__shiki_140thh">(steps []SagaStep) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 逆序执行补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(steps) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            step </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> steps[i]</span></span>
<span class="line"><span class="__shiki_140thh">            compensation </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sc.Compensations[step.Name]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> compensation</span><span class="__shiki_140thh">(step); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 补偿失败，需要人工干预</span></span>
<span class="line"><span class="__shiki_140thh">                sc.State.Status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SagaCompensationFailed</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        sc.State.Status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SagaCompensated</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 业务用例：订单处理</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> ProcessOrderSaga</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">order</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    saga </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">SagaCoordinator</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Steps: []</span><span class="__shiki_1t8gfj">SagaStep</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            {Name: </span><span class="__shiki_mdbnqw">&quot;ReserveInventory&quot;</span><span class="__shiki_140thh">, Execute: reserveInventory},</span></span>
<span class="line"><span class="__shiki_140thh">            {Name: </span><span class="__shiki_mdbnqw">&quot;ProcessPayment&quot;</span><span class="__shiki_140thh">, Execute: processPayment},</span></span>
<span class="line"><span class="__shiki_140thh">            {Name: </span><span class="__shiki_mdbnqw">&quot;ScheduleShipping&quot;</span><span class="__shiki_140thh">, Execute: scheduleShipping},</span></span>
<span class="line"><span class="__shiki_140thh">            {Name: </span><span class="__shiki_mdbnqw">&quot;SendNotification&quot;</span><span class="__shiki_140thh">, Execute: sendNotification},</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        Compensations: </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1t8gfj">CompensationFunc</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;ReserveInventory&quot;</span><span class="__shiki_140thh">: releaseInventory,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;ProcessPayment&quot;</span><span class="__shiki_140thh">:   refundPayment,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;ScheduleShipping&quot;</span><span class="__shiki_140thh">: cancelShipping,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SendNotification&quot;</span><span class="__shiki_140thh">: sendCancellationNotice,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> saga.</span><span class="__shiki_1t8gfj">Execute</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_8-1-2-乐观锁模式" tabindex="-1">8.1.2 乐观锁模式 <a class="header-anchor" href="#_8-1-2-乐观锁模式" aria-label="Permalink to &quot;8.1.2 乐观锁模式&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 版本控制乐观锁</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> VersionedEntity</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ID        </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Data      </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    Version   </span><span class="__shiki_1itgoe">int64</span></span>
<span class="line"><span class="__shiki_140thh">    UpdatedAt </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> UpdateWithOptimisticLock</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">entityID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">updateFunc</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">VersionedEntity</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> retry </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; retry </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxRetries; retry</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 读取当前版本</span></span>
<span class="line"><span class="__shiki_140thh">        entity, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> loadEntity</span><span class="__shiki_140thh">(entityID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 应用修改</span></span>
<span class="line"><span class="__shiki_140thh">        originalVersion </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> entity.Version</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> updateFunc</span><span class="__shiki_140thh">(entity); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 尝试更新</span></span>
<span class="line"><span class="__shiki_140thh">        success, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> updateEntityWithVersion</span><span class="__shiki_140thh">(entityID, entity, originalVersion)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> success {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 版本冲突，重试</span></span>
<span class="line"><span class="__shiki_140thh">        time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">backoffDelay</span><span class="__shiki_140thh">(retry))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ErrMaxRetriesExceeded</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> updateEntityWithVersion</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">entityID</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">entity</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">VersionedEntity</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">expectedVersion</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    txn </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">NewTxn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Discard</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查版本</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        query {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            entity(func: uid(</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">)) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                current_version: version</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">, entityID)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), query)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        Entity []</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            CurrentVersion </span><span class="__shiki_1itgoe">int64</span><span class="__shiki_mdbnqw"> \`json:&quot;current_version&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_mdbnqw">\`json:&quot;entity&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> json.</span><span class="__shiki_1t8gfj">Unmarshal</span><span class="__shiki_140thh">(resp.Json, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">result); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(result.Entity) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> result.Entity[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].CurrentVersion </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> expectedVersion {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新数据</span></span>
<span class="line"><span class="__shiki_140thh">    entity.Version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> expectedVersion </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    entity.UpdatedAt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行更新</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Mutate</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_1t8gfj">createMutation</span><span class="__shiki_140thh">(entity))</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> txn.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-性能监控实践" tabindex="-1">8.2 性能监控实践 <a class="header-anchor" href="#_8-2-性能监控实践" aria-label="Permalink to &quot;8.2 性能监控实践&quot;">​</a></h3><h4 id="_8-2-1-监控仪表板配置" tabindex="-1">8.2.1 监控仪表板配置 <a class="header-anchor" href="#_8-2-1-监控仪表板配置" aria-label="Permalink to &quot;8.2.1 监控仪表板配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus监控配置</span></span>
<span class="line"><span class="__shiki_17hn0y">scrape_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">job_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dgraph&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    static_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">targets</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;alpha1:8080&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;alpha2:8080&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;zero1:5080&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 事务相关指标</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics_path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/debug/prometheus_metrics&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 关键事务指标</span></span>
<span class="line"><span class="__shiki_17hn0y">    metric_relabel_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">source_labels</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">__name__</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dgraph_transaction_.*&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">keep</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Grafana仪表板配置</span></span>
<span class="line"><span class="__shiki_17hn0y">dashboards</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Dgraph事务监控&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    panels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;事务吞吐量&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;graph&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;rate(dgraph_transaction_start_total[5m])&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;事务开始速率&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;rate(dgraph_transaction_commit_total[5m])&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;事务提交速率&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;rate(dgraph_transaction_abort_total[5m])&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;事务中止速率&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;事务延迟&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;graph&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;histogram_quantile(0.95, rate(dgraph_transaction_duration_seconds_bucket[5m]))&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;P95延迟&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;histogram_quantile(0.99, rate(dgraph_transaction_duration_seconds_bucket[5m]))&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;P99延迟&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;冲突和重试&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;graph&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;rate(dgraph_transaction_conflict_total[5m])&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;冲突速率&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;rate(dgraph_transaction_retry_total[5m])&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;重试速率&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dgraph_transaction_conflict_total / dgraph_transaction_start_total&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            legend</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;冲突率&#39;</span></span></code></pre></div><h4 id="_8-2-2-告警规则配置" tabindex="-1">8.2.2 告警规则配置 <a class="header-anchor" href="#_8-2-2-告警规则配置" aria-label="Permalink to &quot;8.2.2 告警规则配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus告警规则</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dgraph_transaction_alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighTransactionAbortRate</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(dgraph_transaction_abort_total[5m]) / rate(dgraph_transaction_start_total[5m]) &gt; 0.1</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高事务中止率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;过去5分钟事务中止率超过10%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighTransactionLatency</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(dgraph_transaction_duration_seconds_bucket[5m])) &gt; 1</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高事务延迟&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;P95事务延迟超过1秒&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighConflictRate</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(dgraph_transaction_conflict_total[5m]) / rate(dgraph_transaction_start_total[5m]) &gt; 0.05</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高事务冲突率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;过去5分钟事务冲突率超过5%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TransactionTimeoutRateHigh</span></span>
<span class="line"><span class="__shiki_17hn0y">        expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(dgraph_transaction_timeout_total[5m]) / rate(dgraph_transaction_start_total[5m]) &gt; 0.02</span></span>
<span class="line"><span class="__shiki_17hn0y">        for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高事务超时率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;过去5分钟事务超时率超过2%&quot;</span></span></code></pre></div><hr><p><strong>总结</strong>: Dgraph的ACID事务支持是其作为生产级图数据库的核心特性。通过分布式两阶段提交、MVCC快照隔离、乐观并发控制等技术，Dgraph在保证强一致性的同时，实现了高吞吐和低延迟。理解Dgraph事务的内部机制、配置调优和最佳实践，对于构建可靠、高性能的图数据库应用至关重要。在实际应用中，需要根据具体业务场景选择合适的事务模式，并建立完善的监控和告警机制，确保系统的稳定性和可靠性。</p>`,91)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
