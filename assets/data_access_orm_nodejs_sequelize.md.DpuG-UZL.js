import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Sequelize 事务管理详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/nodejs/sequelize.md","filePath":"data/access/orm/nodejs/sequelize.md"}'),p={name:"data/access/orm/nodejs/sequelize.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="sequelize-事务管理详细学习笔记" tabindex="-1">Sequelize 事务管理详细学习笔记 <a class="header-anchor" href="#sequelize-事务管理详细学习笔记" aria-label="Permalink to &quot;Sequelize 事务管理详细学习笔记&quot;">​</a></h1><h2 id="一、事务基础概念" tabindex="-1">一、事务基础概念 <a class="header-anchor" href="#一、事务基础概念" aria-label="Permalink to &quot;一、事务基础概念&quot;">​</a></h2><h3 id="_1-1-什么是事务" tabindex="-1">1.1 什么是事务 <a class="header-anchor" href="#_1-1-什么是事务" aria-label="Permalink to &quot;1.1 什么是事务&quot;">​</a></h3><p>事务是数据库操作的基本单元，具有 ACID 特性：</p><ul><li><strong>原子性 (Atomicity)</strong>：事务中的所有操作要么全部成功，要么全部失败</li><li><strong>一致性 (Consistency)</strong>：事务使数据库从一个一致状态转换到另一个一致状态</li><li><strong>隔离性 (Isolation)</strong>：并发事务之间相互隔离，互不干扰</li><li><strong>持久性 (Durability)</strong>：事务提交后，对数据库的修改是永久性的</li></ul><h3 id="_1-2-sequelize-中的事务类型" tabindex="-1">1.2 Sequelize 中的事务类型 <a class="header-anchor" href="#_1-2-sequelize-中的事务类型" aria-label="Permalink to &quot;1.2 Sequelize 中的事务类型&quot;">​</a></h3><p>Sequelize 支持两种事务管理方式：</p><ol><li><strong>非托管事务 (Unmanaged Transactions)</strong>：手动提交/回滚</li><li><strong>托管事务 (Managed Transactions)</strong>：自动提交/回滚</li></ol><h2 id="二、非托管事务-手动控制" tabindex="-1">二、非托管事务 (手动控制) <a class="header-anchor" href="#二、非托管事务-手动控制" aria-label="Permalink to &quot;二、非托管事务 (手动控制)&quot;">​</a></h2><h3 id="_2-1-基本用法" tabindex="-1">2.1 基本用法 <a class="header-anchor" href="#_2-1-基本用法" aria-label="Permalink to &quot;2.1 基本用法&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">Sequelize</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">Transaction</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sequelize&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sequelize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Sequelize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  dialect: </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  logging: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 模型定义</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  username: Sequelize.</span><span class="__shiki_dzsirb">STRING</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  balance: Sequelize.</span><span class="__shiki_1t8gfj">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> TransactionRecord</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;TransactionRecord&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  amount: Sequelize.</span><span class="__shiki_1t8gfj">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">  type: Sequelize.</span><span class="__shiki_dzsirb">STRING</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 基本事务流程</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> transferMoney</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">senderId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">receiverId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 步骤1: 创建事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 步骤2: 在事务中执行操作</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2.1 扣除发送者余额</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sender</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { id: senderId },</span></span>
<span class="line"><span class="__shiki_140thh">      transaction: t  </span><span class="__shiki_21nrsd">// 必须传入事务对象</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">sender) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Sender not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (sender.balance </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> amount) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient balance&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    sender.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> sender.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2.2 增加接收者余额</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> receiver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { id: receiverId },</span></span>
<span class="line"><span class="__shiki_140thh">      transaction: t,</span></span>
<span class="line"><span class="__shiki_140thh">      lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_21nrsd">  // 锁定记录</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">receiver) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Receiver not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    receiver.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> amount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> receiver.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2.3 记录交易</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> TransactionRecord.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      fromUserId: senderId,</span></span>
<span class="line"><span class="__shiki_140thh">      toUserId: receiverId,</span></span>
<span class="line"><span class="__shiki_140thh">      amount: amount,</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;TRANSFER&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 步骤3: 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transfer successful&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, sender: sender, receiver: receiver };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 步骤4: 出错时回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transfer failed:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { </span></span>
<span class="line"><span class="__shiki_140thh">      success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">      senderId, </span></span>
<span class="line"><span class="__shiki_140thh">      receiverId, </span></span>
<span class="line"><span class="__shiki_140thh">      amount </span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-事务选项配置" tabindex="-1">2.2 事务选项配置 <a class="header-anchor" href="#_2-2-事务选项配置" aria-label="Permalink to &quot;2.2 事务选项配置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 带有配置选项的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> createTransactionWithOptions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 隔离级别配置</span></span>
<span class="line"><span class="__shiki_140thh">    isolationLevel: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">READ_COMMITTED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动提交设置（默认为true）</span></span>
<span class="line"><span class="__shiki_140thh">    autocommit: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 类型（仅PostgreSQL支持）</span></span>
<span class="line"><span class="__shiki_140thh">    type: Transaction.</span><span class="__shiki_dzsirb">TYPES</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">DEFERRED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 锁定类型（指定悲观锁）</span></span>
<span class="line"><span class="__shiki_140thh">    lock: {</span></span>
<span class="line"><span class="__shiki_140thh">      level: Transaction.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      of: User  </span><span class="__shiki_21nrsd">// 锁定特定模型</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 日志记录</span></span>
<span class="line"><span class="__shiki_1t8gfj">    logging</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">sql</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[Transaction \${</span><span class="__shiki_140thh">transaction</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}] \${</span><span class="__shiki_140thh">sql</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 超时设置（毫秒）</span></span>
<span class="line"><span class="__shiki_140thh">    timeout: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 只读事务</span></span>
<span class="line"><span class="__shiki_140thh">    readOnly: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动重试设置</span></span>
<span class="line"><span class="__shiki_140thh">    retry: {</span></span>
<span class="line"><span class="__shiki_140thh">      max: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      match: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SQLITE_BUSY&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SequelizeDatabaseError&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> t;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 隔离级别说明</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isolationLevels</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  READ_UNCOMMITTED: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">READ_UNCOMMITTED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  READ_COMMITTED: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">READ_COMMITTED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  REPEATABLE_READ: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">REPEATABLE_READ</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  SERIALIZABLE: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">SERIALIZABLE</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务类型（PostgreSQL）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> transactionTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  DEFERRED: Transaction.</span><span class="__shiki_dzsirb">TYPES</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">DEFERRED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  IMMEDIATE: Transaction.</span><span class="__shiki_dzsirb">TYPES</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">IMMEDIATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  EXCLUSIVE: Transaction.</span><span class="__shiki_dzsirb">TYPES</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">EXCLUSIVE</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 锁定级别</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> lockLevels</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  UPDATE: Transaction.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  SHARE: Transaction.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">SHARE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  KEY_SHARE: Transaction.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">KEY_SHARE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  NO_KEY_UPDATE: Transaction.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">NO_KEY_UPDATE</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_2-3-事务传播和嵌套" tabindex="-1">2.3 事务传播和嵌套 <a class="header-anchor" href="#_2-3-事务传播和嵌套" aria-label="Permalink to &quot;2.3 事务传播和嵌套&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务嵌套（保存点）</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> nestedTransactions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> outerTransaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 外层事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh"> }, { transaction: outerTransaction });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建保存点（嵌套事务）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> innerTransaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      transaction: outerTransaction,</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 可以设置不同的隔离级别</span></span>
<span class="line"><span class="__shiki_140thh">      isolationLevel: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">SERIALIZABLE</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 内层事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh"> }, { transaction: innerTransaction });</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> innerTransaction.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 释放保存点</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (innerError) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> innerTransaction.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 回滚到保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> innerError;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 继续外层事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user3&#39;</span><span class="__shiki_140thh"> }, { transaction: outerTransaction });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> outerTransaction.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> outerTransaction.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务传播模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.transactionStack </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取当前事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  getCurrentTransaction</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      ?</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.transactionStack[</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">      :</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 事务传播：REQUIRED（如果存在则加入，否则新建）</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> required</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">callback</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentTransaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getCurrentTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (currentTransaction) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 使用现有事务</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> callback</span><span class="__shiki_140thh">(currentTransaction);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 创建新事务</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(transaction);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> callback</span><span class="__shiki_140thh">(transaction);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> transaction.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> transaction.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 事务传播：REQUIRES_NEW（总是创建新事务）</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> requiresNew</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">callback</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(options);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(transaction);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> callback</span><span class="__shiki_140thh">(transaction);</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> transaction.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> transaction.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.transactionStack.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 事务传播：NOT_SUPPORTED（在非事务环境中执行）</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> notSupported</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">callback</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentTransaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getCurrentTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 暂挂当前事务</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 注意：Sequelize 不支持真正的暂挂，这里需要特殊处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> callback</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、托管事务-自动控制" tabindex="-1">三、托管事务 (自动控制) <a class="header-anchor" href="#三、托管事务-自动控制" aria-label="Permalink to &quot;三、托管事务 (自动控制)&quot;">​</a></h2><h3 id="_3-1-基本托管事务" tabindex="-1">3.1 基本托管事务 <a class="header-anchor" href="#_3-1-基本托管事务" aria-label="Permalink to &quot;3.1 基本托管事务&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用自动提交/回滚的托管事务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> managedTransactionTransfer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">senderId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">receiverId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 在这个回调函数中，所有操作自动使用事务 t</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 如果抛出异常，事务自动回滚</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 如果正常完成，事务自动提交</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> sender</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: senderId },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">sender) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Sender not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (sender.balance </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> amount) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient balance&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      sender.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount;</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> sender.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> receiver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: receiverId },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">receiver) </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Receiver not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      receiver.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> amount;</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> receiver.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> transactionRecord</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> TransactionRecord.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        fromUserId: senderId,</span></span>
<span class="line"><span class="__shiki_140thh">        toUserId: receiverId,</span></span>
<span class="line"><span class="__shiki_140thh">        amount: amount,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;TRANSFER&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 返回事务结果</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        sender: sender,</span></span>
<span class="line"><span class="__shiki_140thh">        receiver: receiver,</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: transactionRecord</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Managed transaction completed successfully&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, data: result };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Managed transaction failed:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 带选项的托管事务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> managedTransactionWithOptions</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    isolationLevel: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">REPEATABLE_READ</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    deferrable: Transaction.</span><span class="__shiki_dzsirb">TYPES</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">DEFERRED</span></span>
<span class="line"><span class="__shiki_140thh">  }, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">afterCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction committed successfully!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { message: </span><span class="__shiki_mdbnqw">&#39;Transaction completed&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-托管事务中的钩子" tabindex="-1">3.2 托管事务中的钩子 <a class="header-anchor" href="#_3-2-托管事务中的钩子" aria-label="Permalink to &quot;3.2 托管事务中的钩子&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务生命周期钩子</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> transactionWithHooks</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在事务提交前执行</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">beforeCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;About to commit transaction&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在事务提交后执行（无论成功还是失败）</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">afterCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction has been committed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在事务回滚后执行</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">afterRollback</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction has been rolled back&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在事务完成后执行（提交或回滚后）</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">finally</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction finished (committed or rolled back)&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置清理钩子</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">cleanup</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Cleaning up transaction resources&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 业务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user_with_hooks&#39;</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用异步钩子</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> transactionWithAsyncHooks</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 异步 beforeCommit</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">beforeCommit</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Async beforeCommit completed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 异步 afterCommit</span></span>
<span class="line"><span class="__shiki_140thh">    t.</span><span class="__shiki_1t8gfj">afterCommit</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Async afterCommit completed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 可以在这里发送通知、清除缓存等</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;async_user&#39;</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、高级事务模式" tabindex="-1">四、高级事务模式 <a class="header-anchor" href="#四、高级事务模式" aria-label="Permalink to &quot;四、高级事务模式&quot;">​</a></h2><h3 id="_4-1-补偿事务-compensating-transactions" tabindex="-1">4.1 补偿事务 (Compensating Transactions) <a class="header-anchor" href="#_4-1-补偿事务-compensating-transactions" aria-label="Permalink to &quot;4.1 补偿事务 (Compensating Transactions)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 补偿事务模式（Saga模式）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionSaga</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.compensationStack </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 执行事务步骤</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> executeStep</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">compensation</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> action</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (compensation) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.compensationStack.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          name,</span></span>
<span class="line"><span class="__shiki_140thh">          compensation,</span></span>
<span class="line"><span class="__shiki_140thh">          context: result</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 执行失败，开始补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Step \${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 执行补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> compensate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Starting compensation...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 逆序执行补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.compensationStack.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> step</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.compensationStack.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensating step: \${</span><span class="__shiki_140thh">step</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> step.</span><span class="__shiki_1t8gfj">compensation</span><span class="__shiki_140thh">(step.context);</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensation for \${</span><span class="__shiki_140thh">step</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} completed\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (compError) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Failed to compensate step \${</span><span class="__shiki_140thh">step</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, compError);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 补偿失败，记录日志但继续补偿其他步骤</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Compensation completed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用补偿事务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> sagaPatternExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> saga</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionSaga</span><span class="__shiki_140thh">(sequelize);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 步骤1: 创建用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> saga.</span><span class="__shiki_1t8gfj">executeStep</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;create_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          username: </span><span class="__shiki_mdbnqw">&#39;saga_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          email: </span><span class="__shiki_mdbnqw">&#39;saga@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">createdUser</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 补偿：删除创建的用户</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensating: deleting user \${</span><span class="__shiki_140thh">createdUser</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ where: { id: createdUser.id } });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 步骤2: 创建账户</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> saga.</span><span class="__shiki_1t8gfj">executeStep</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;create_account&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          userId: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">          balance: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">createdAccount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 补偿：删除创建的账户</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensating: deleting account \${</span><span class="__shiki_140thh">createdAccount</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ where: { id: createdAccount.id } });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 步骤3: 发送欢迎邮件（可能失败）</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> saga.</span><span class="__shiki_1t8gfj">executeStep</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;send_welcome_email&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模拟邮件发送失败</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Email service unavailable&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 邮件发送的补偿通常是发送道歉邮件</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Compensating: sending apology email&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 这里实际会调用邮件服务</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Saga completed successfully&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, user, account };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Saga failed:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-两阶段提交-two-phase-commit" tabindex="-1">4.2 两阶段提交 (Two-Phase Commit) <a class="header-anchor" href="#_4-2-两阶段提交-two-phase-commit" aria-label="Permalink to &quot;4.2 两阶段提交 (Two-Phase Commit)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 两阶段提交协调器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TwoPhaseCommitCoordinator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.participants </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加参与者</span></span>
<span class="line"><span class="__shiki_1t8gfj">  addParticipant</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">prepareCallback</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">commitCallback</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rollbackCallback</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.participants.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name,</span></span>
<span class="line"><span class="__shiki_140thh">      prepare: prepareCallback,</span></span>
<span class="line"><span class="__shiki_140thh">      commit: commitCallback,</span></span>
<span class="line"><span class="__shiki_140thh">      rollback: rollbackCallback,</span></span>
<span class="line"><span class="__shiki_140thh">      prepared: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 执行两阶段提交</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Starting two-phase commit...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 第一阶段：准备阶段</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Phase 1: Prepare&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> preparedParticipants</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> participant</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.participants) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Preparing participant: \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> participant.</span><span class="__shiki_1t8gfj">prepare</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        participant.prepared </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        preparedParticipants.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(participant);</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Participant \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} prepared successfully\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Participant \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} failed to prepare:\`</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 回滚所有已准备的参与者</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rollbackPrepared</span><span class="__shiki_140thh">(preparedParticipants);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Prepare phase failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 第二阶段：提交阶段</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Phase 2: Commit&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> participant</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> preparedParticipants) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Committing participant: \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> participant.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Participant \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} committed successfully\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Two-phase commit completed successfully&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Commit phase failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 提交失败，需要尝试回滚（可能部分已提交）</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rollbackPrepared</span><span class="__shiki_140thh">(preparedParticipants);</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Commit phase failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 回滚已准备的参与者</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> rollbackPrepared</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">participants</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Rolling back prepared participants...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> participant</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> participants.</span><span class="__shiki_1t8gfj">reverse</span><span class="__shiki_140thh">()) { </span><span class="__shiki_21nrsd">// 逆序回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Rolling back participant: \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> participant.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Participant \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} rolled back successfully\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (rollbackError) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Failed to rollback participant \${</span><span class="__shiki_140thh">participant</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, rollbackError);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 继续尝试回滚其他参与者</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用两阶段提交</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> twoPhaseCommitExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> coordinator</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TwoPhaseCommitCoordinator</span><span class="__shiki_140thh">(sequelize);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加第一个参与者（数据库操作）</span></span>
<span class="line"><span class="__shiki_140thh">  coordinator.</span><span class="__shiki_1t8gfj">addParticipant</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;database_transaction&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 准备阶段：开始事务但不提交</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      global.databaseTransaction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> t; </span><span class="__shiki_21nrsd">// 存储以供后续使用</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;2pc_user&#39;</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Database transaction prepared&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 提交阶段：提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (global.databaseTransaction) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> global.databaseTransaction.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Database transaction committed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 回滚阶段：回滚事务</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (global.databaseTransaction) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> global.databaseTransaction.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Database transaction rolled back&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加第二个参与者（消息队列）</span></span>
<span class="line"><span class="__shiki_140thh">  coordinator.</span><span class="__shiki_1t8gfj">addParticipant</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;message_queue&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 准备阶段：准备消息</span></span>
<span class="line"><span class="__shiki_140thh">      global.messageData </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, action: </span><span class="__shiki_mdbnqw">&#39;create&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Message prepared&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 提交阶段：发送消息</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Sending message:&#39;</span><span class="__shiki_140thh">, global.messageData);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 实际会调用消息队列服务</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 回滚阶段：取消消息</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Canceling message:&#39;</span><span class="__shiki_140thh">, global.messageData);</span></span>
<span class="line"><span class="__shiki_1itgoe">      delete</span><span class="__shiki_140thh"> global.messageData;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加第三个参与者（外部API调用）</span></span>
<span class="line"><span class="__shiki_140thh">  coordinator.</span><span class="__shiki_1t8gfj">addParticipant</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;external_api&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 准备阶段：验证调用</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;External API validated&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 提交阶段：执行API调用</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Calling external API&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 实际会调用外部API</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 回滚阶段：撤销API调用</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Reverting external API call&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 可能需要调用补偿API</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> coordinator.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Result:&#39;</span><span class="__shiki_140thh">, result);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Two-phase commit failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-乐观锁和悲观锁" tabindex="-1">4.3 乐观锁和悲观锁 <a class="header-anchor" href="#_4-3-乐观锁和悲观锁" aria-label="Permalink to &quot;4.3 乐观锁和悲观锁&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 乐观锁实现</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> Product</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Product&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  name: Sequelize.</span><span class="__shiki_dzsirb">STRING</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  stock: Sequelize.</span><span class="__shiki_dzsirb">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  version: {  </span><span class="__shiki_21nrsd">// 版本号字段</span></span>
<span class="line"><span class="__shiki_140thh">    type: Sequelize.</span><span class="__shiki_dzsirb">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    defaultValue: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 乐观锁更新</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> optimisticLockUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">productId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">updateData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> retries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  while</span><span class="__shiki_140thh"> (retries </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxRetries) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取当前数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> product</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Product.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { id: productId }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">product) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Product not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentVersion</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> product.version;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 尝试更新，使用版本号作为乐观锁</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">affectedRows</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Product.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">updateData, version: currentVersion </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          where: {</span></span>
<span class="line"><span class="__shiki_140thh">            id: productId,</span></span>
<span class="line"><span class="__shiki_140thh">            version: currentVersion  </span><span class="__shiki_21nrsd">// 只有版本匹配时才更新</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (affectedRows </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 版本冲突，重试</span></span>
<span class="line"><span class="__shiki_140thh">        retries</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Optimistic lock conflict, retry \${</span><span class="__shiki_140thh">retries</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (retries </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> maxRetries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Maximum retries exceeded due to version conflicts&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">          setTimeout</span><span class="__shiki_140thh">(resolve, Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, retries) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">        continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Update successful with optimistic locking&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Product.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: productId } });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Update failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 悲观锁实现</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> pessimisticLockExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用悲观锁查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> product</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Product.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 行级锁</span></span>
<span class="line"><span class="__shiki_140thh">      transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">product) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Product not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查库存</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (product.stock </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Out of stock&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 减少库存</span></span>
<span class="line"><span class="__shiki_140thh">    product.stock </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> product.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录订单</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> Order.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      productId: product.id,</span></span>
<span class="line"><span class="__shiki_140thh">      quantity: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Purchase completed with pessimistic lock&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> product;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> t.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Purchase failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 死锁处理</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> deadlockHandlingExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 按照固定顺序获取锁，避免死锁</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> product1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Product.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> product2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Product.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          where: { id: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 业务逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        product1.stock </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        product2.stock </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> product1.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> product2.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { product1, product2 };</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction succeeded on attempt&#39;</span><span class="__shiki_140thh">, attempt);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Attempt \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_mdbnqw">} failed:\`</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查是否为死锁错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;SequelizeDatabaseError&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deadlock&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (attempt </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> maxRetries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Max retries exceeded due to deadlocks&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 随机退避</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> backoff</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, attempt) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Deadlock detected, backing off for \${</span><span class="__shiki_140thh">backoff</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, backoff));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 非死锁错误，直接抛出</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、事务监控和调试" tabindex="-1">五、事务监控和调试 <a class="header-anchor" href="#五、事务监控和调试" aria-label="Permalink to &quot;五、事务监控和调试&quot;">​</a></h2><h3 id="_5-1-事务日志和追踪" tabindex="-1">5.1 事务日志和追踪 <a class="header-anchor" href="#_5-1-事务日志和追踪" aria-label="Permalink to &quot;5.1 事务日志和追踪&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务日志记录器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionLogger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.logs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeTransactions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 开始记录事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  startLoggingTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> transaction.id </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateId</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeTransactions.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(transactionId, {</span></span>
<span class="line"><span class="__shiki_140thh">      id: transactionId,</span></span>
<span class="line"><span class="__shiki_140thh">      startTime,</span></span>
<span class="line"><span class="__shiki_140thh">      queries: [],</span></span>
<span class="line"><span class="__shiki_140thh">      status: </span><span class="__shiki_mdbnqw">&#39;active&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加事务事件监听器</span></span>
<span class="line"><span class="__shiki_140thh">    transaction.</span><span class="__shiki_1t8gfj">beforeCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">logTransactionEvent</span><span class="__shiki_140thh">(transactionId, </span><span class="__shiki_mdbnqw">&#39;beforeCommit&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    transaction.</span><span class="__shiki_1t8gfj">afterCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">finalizeTransaction</span><span class="__shiki_140thh">(transactionId, </span><span class="__shiki_mdbnqw">&#39;committed&#39;</span><span class="__shiki_140thh">, duration);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    transaction.</span><span class="__shiki_1t8gfj">afterRollback</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">finalizeTransaction</span><span class="__shiki_140thh">(transactionId, </span><span class="__shiki_mdbnqw">&#39;rolledBack&#39;</span><span class="__shiki_140thh">, duration);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> transaction.connection.query;</span></span>
<span class="line"><span class="__shiki_140thh">    transaction.connection.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sql</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cb</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> queryStartTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> originalQuery.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, sql, values, (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">rows</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> queryDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> queryStartTime;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> logEntry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.activeTransactions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (logEntry) {</span></span>
<span class="line"><span class="__shiki_140thh">          logEntry.queries.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            sql: </span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> sql </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;string&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> sql </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> sql.sql,</span></span>
<span class="line"><span class="__shiki_140thh">            values,</span></span>
<span class="line"><span class="__shiki_140thh">            duration: queryDuration,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            error: err</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        cb</span><span class="__shiki_140thh">(err, rows);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    }.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> transactionId;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成事务ID</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateId</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> \`tx_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录事务事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">  logTransactionEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.activeTransactions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (transaction) {</span></span>
<span class="line"><span class="__shiki_140thh">      transaction.events </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transaction.events </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      transaction.events.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        event,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 完成事务记录</span></span>
<span class="line"><span class="__shiki_1t8gfj">  finalizeTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">duration</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.activeTransactions.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (transaction) {</span></span>
<span class="line"><span class="__shiki_140thh">      transaction.endTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      transaction.duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> duration;</span></span>
<span class="line"><span class="__shiki_140thh">      transaction.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> status;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">transaction,</span></span>
<span class="line"><span class="__shiki_140thh">        archivedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.activeTransactions.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 输出摘要</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">printTransactionSummary</span><span class="__shiki_140thh">(transaction);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 打印事务摘要</span></span>
<span class="line"><span class="__shiki_1t8gfj">  printTransactionSummary</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">=== Transaction Summary ===&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`ID: \${</span><span class="__shiki_140thh">transaction</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Status: \${</span><span class="__shiki_140thh">transaction</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Duration: \${</span><span class="__shiki_140thh">transaction</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Query Count: \${</span><span class="__shiki_140thh">transaction</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">queries</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (transaction.queries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">Queries:&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      transaction.queries.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">index</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw">}. \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms - \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">sql</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}...\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;==========================</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取活动事务统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">  getActiveTransactionsStats</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalActive: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.activeTransactions.size,</span></span>
<span class="line"><span class="__shiki_140thh">      transactions: []</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">tx</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.activeTransactions) {</span></span>
<span class="line"><span class="__shiki_140thh">      stats.transactions.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        id,</span></span>
<span class="line"><span class="__shiki_140thh">        duration: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> tx.startTime,</span></span>
<span class="line"><span class="__shiki_140thh">        queryCount: tx.queries.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> stats;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 查找长时间运行的事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  findLongRunningTransactions</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">thresholdMs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> longRunning</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">tx</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.activeTransactions) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> tx.startTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> thresholdMs) {</span></span>
<span class="line"><span class="__shiki_140thh">        longRunning.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          id,</span></span>
<span class="line"><span class="__shiki_140thh">          duration,</span></span>
<span class="line"><span class="__shiki_140thh">          startTime: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(tx.startTime),</span></span>
<span class="line"><span class="__shiki_140thh">          queryCount: tx.queries.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> longRunning;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用事务日志</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> monitoredTransaction</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> logger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionLogger</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> logger.</span><span class="__shiki_1t8gfj">startLoggingTransaction</span><span class="__shiki_140thh">(t);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction started: \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 业务操作</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;monitored_user&#39;</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 模拟长时间操作</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查监控状态</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> logger.</span><span class="__shiki_1t8gfj">getActiveTransactionsStats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Active transactions:&#39;</span><span class="__shiki_140thh">, stats);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { transactionId, status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-事务性能监控" tabindex="-1">5.2 事务性能监控 <a class="header-anchor" href="#_5-2-事务性能监控" aria-label="Permalink to &quot;5.2 事务性能监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务性能监控器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionPerformanceMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      successfulTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      failedTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      totalDuration: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      slowTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      deadlocks: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retries: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.slowTransactionThreshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 1秒</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.history </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxHistorySize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupMonitoring</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 设置监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupMonitoring</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 拦截事务创建</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalTransaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.transaction;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">options</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">autoCallback</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> isManaged</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> typeof</span><span class="__shiki_140thh"> autoCallback </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;function&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> transactionInstance;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.totalTransactions</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (isManaged) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 托管事务</span></span>
<span class="line"><span class="__shiki_140thh">          transactionInstance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> originalTransaction.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.sequelize, </span></span>
<span class="line"><span class="__shiki_140thh">            options, </span></span>
<span class="line"><span class="__shiki_1itgoe">            async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">              try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> autoCallback</span><span class="__shiki_140thh">(t);</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordSuccess</span><span class="__shiki_140thh">(duration, t);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">              } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordFailure</span><span class="__shiki_140thh">(duration, error, t);</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          );</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 非托管事务</span></span>
<span class="line"><span class="__shiki_140thh">          transactionInstance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> originalTransaction.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.sequelize, options);</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 监听提交和回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> originalCommit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> transactionInstance.commit;</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> originalRollback</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> transactionInstance.rollback;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          transactionInstance.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">              await</span><span class="__shiki_140thh"> originalCommit.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(transactionInstance);</span></span>
<span class="line"><span class="__shiki_dzsirb">              this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordSuccess</span><span class="__shiki_140thh">(duration, transactionInstance);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_dzsirb">              this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordFailure</span><span class="__shiki_140thh">(duration, error, transactionInstance);</span></span>
<span class="line"><span class="__shiki_1itgoe">              throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          };</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          transactionInstance.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> originalRollback.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(transactionInstance);</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordFailure</span><span class="__shiki_140thh">(duration, </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction rolled back&#39;</span><span class="__shiki_140thh">), transactionInstance);</span></span>
<span class="line"><span class="__shiki_140thh">          };</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> transactionInstance;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordFailure</span><span class="__shiki_140thh">(duration, error, transactionInstance);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录成功事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  recordSuccess</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">duration</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics.successfulTransactions</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics.totalDuration </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> duration;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.slowTransactionThreshold) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.slowTransactions</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Slow transaction detected: \${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">addToHistory</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      duration,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      transactionId: transaction?.id</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录失败事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  recordFailure</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">duration</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics.failedTransactions</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deadlock&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metrics.deadlocks</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">addToHistory</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;failure&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      duration,</span></span>
<span class="line"><span class="__shiki_140thh">      error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      transactionId: transaction?.id</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加到历史记录</span></span>
<span class="line"><span class="__shiki_1t8gfj">  addToHistory</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">record</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.history.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(record);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.history.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxHistorySize) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.history.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取性能指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">  getMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> avgDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.successfulTransactions </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">      ?</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.totalDuration </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.successfulTransactions</span></span>
<span class="line"><span class="__shiki_1itgoe">      :</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> successRate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.totalTransactions </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">      ?</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics.successfulTransactions </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metrics.totalTransactions) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">      :</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metrics,</span></span>
<span class="line"><span class="__shiki_140thh">      averageDuration: avgDuration.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      successRate: successRate.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      currentTime: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成性能报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateReport</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">=== Transaction Performance Report ===</span></span>
<span class="line"><span class="__shiki_mdbnqw">Total Transactions: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">totalTransactions</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">Successful: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">successfulTransactions</span><span class="__shiki_mdbnqw">} (\${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">successRate</span><span class="__shiki_mdbnqw">}%)</span></span>
<span class="line"><span class="__shiki_mdbnqw">Failed: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">failedTransactions</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">Average Duration: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">averageDuration</span><span class="__shiki_mdbnqw">}ms</span></span>
<span class="line"><span class="__shiki_mdbnqw">Slow Transactions (&gt;\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">slowTransactionThreshold</span><span class="__shiki_mdbnqw">}ms): \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">slowTransactions</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">Deadlocks: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">deadlocks</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">Retries: \${</span><span class="__shiki_140thh">metrics</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">retries</span><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">=====================================</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 重置指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">  resetMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      successfulTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      failedTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      totalDuration: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      slowTransactions: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      deadlocks: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retries: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用性能监控</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> performanceMonitoredExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> monitor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionPerformanceMonitor</span><span class="__shiki_140thh">(sequelize);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 模拟多个事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> promises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    promises.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">\`user_\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 随机失败</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Random transaction failure&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 随机延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">          setTimeout</span><span class="__shiki_140thh">(resolve, Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(promises);</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (errors) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 部分事务可能失败</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 输出报告</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(monitor.</span><span class="__shiki_1t8gfj">generateReport</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取详细指标</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> monitor.</span><span class="__shiki_1t8gfj">getMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Detailed metrics:&#39;</span><span class="__shiki_140thh">, metrics);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> metrics;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、事务最佳实践" tabindex="-1">六、事务最佳实践 <a class="header-anchor" href="#六、事务最佳实践" aria-label="Permalink to &quot;六、事务最佳实践&quot;">​</a></h2><h3 id="_6-1-事务设计模式" tabindex="-1">6.1 事务设计模式 <a class="header-anchor" href="#_6-1-事务设计模式" aria-label="Permalink to &quot;6.1 事务设计模式&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 资源库模式 (Repository Pattern) 中的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.User </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize.models.User;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.Account </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize.models.Account;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用事务的方法</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> createUserWithAccount</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userData</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">accountData</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> shouldManageTransaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">transaction;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (shouldManageTransaction) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_createUserWithAccount</span><span class="__shiki_140thh">(userData, accountData, t);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_createUserWithAccount</span><span class="__shiki_140thh">(userData, accountData, transaction);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> _createUserWithAccount</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userData</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">accountData</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(userData, { transaction });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建账户</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.Account.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">accountData,</span></span>
<span class="line"><span class="__shiki_140thh">      userId: user.id</span></span>
<span class="line"><span class="__shiki_140thh">    }, { transaction });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { user, account };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量操作事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> bulkCreateUsersWithAccounts</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userAccountPairs</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> pair</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> userAccountPairs) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_createUserWithAccount</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          pair.user, </span></span>
<span class="line"><span class="__shiki_140thh">          pair.account, </span></span>
<span class="line"><span class="__shiki_140thh">          t</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 工作单元模式 (Unit of Work)</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UnitOfWork</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.transaction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 注册操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">  registerCreate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">model</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;create&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      model,</span></span>
<span class="line"><span class="__shiki_140thh">      data</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  registerUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">model</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">where</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;update&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      model,</span></span>
<span class="line"><span class="__shiki_140thh">      data,</span></span>
<span class="line"><span class="__shiki_140thh">      where</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  registerDelete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">model</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">where</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;delete&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      model,</span></span>
<span class="line"><span class="__shiki_140thh">      where</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 执行工作单元</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> commit</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> operation</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.operations) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        let</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> (operation.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &#39;create&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> operation.model.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(operation.data, { transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &#39;update&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> operation.model.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">              operation.data, </span></span>
<span class="line"><span class="__shiki_140thh">              { </span></span>
<span class="line"><span class="__shiki_140thh">                where: operation.where,</span></span>
<span class="line"><span class="__shiki_140thh">                transaction: t </span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">          case</span><span class="__shiki_mdbnqw"> &#39;delete&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> operation.model.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">              where: operation.where,</span></span>
<span class="line"><span class="__shiki_140thh">              transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 清空操作队列</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 回滚（清空操作队列）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  rollback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用工作单元</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> unitOfWorkExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> uow</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UnitOfWork</span><span class="__shiki_140thh">(sequelize);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 注册多个操作</span></span>
<span class="line"><span class="__shiki_140thh">  uow.</span><span class="__shiki_1t8gfj">registerCreate</span><span class="__shiki_140thh">(User, { username: </span><span class="__shiki_mdbnqw">&#39;uow_user1&#39;</span><span class="__shiki_140thh">, email: </span><span class="__shiki_mdbnqw">&#39;uow1@example.com&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  uow.</span><span class="__shiki_1t8gfj">registerCreate</span><span class="__shiki_140thh">(User, { username: </span><span class="__shiki_mdbnqw">&#39;uow_user2&#39;</span><span class="__shiki_140thh">, email: </span><span class="__shiki_mdbnqw">&#39;uow2@example.com&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  uow.</span><span class="__shiki_1t8gfj">registerUpdate</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    Account, </span></span>
<span class="line"><span class="__shiki_140thh">    { balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> }, </span></span>
<span class="line"><span class="__shiki_140thh">    { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  uow.</span><span class="__shiki_1t8gfj">registerDelete</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    Log, </span></span>
<span class="line"><span class="__shiki_140thh">    { createdAt: { [Sequelize.Op.lt]: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) } }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 一次性提交所有操作（在单个事务中）</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> uow.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Unit of Work committed successfully:&#39;</span><span class="__shiki_140thh">, results);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Unit of Work failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    uow.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 规范模式 (Specification Pattern) 与事务</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionSpecification</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.preconditions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.compensations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  addPrecondition</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">check</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">errorMessage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.preconditions.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({ check, errorMessage });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  addOperation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">compensation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.operations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(operation);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (compensation) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.compensations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(compensation);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查前置条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> precondition</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.preconditions) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> precondition.</span><span class="__shiki_1t8gfj">check</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">result) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(precondition.errorMessage);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在事务中执行操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> operationIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> operation</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.operations) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> operation</span><span class="__shiki_140thh">(t);</span></span>
<span class="line"><span class="__shiki_140thh">          results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">          operationIndex</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行补偿操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">compensate</span><span class="__shiki_140thh">(operationIndex, t);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> compensate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">failedIndex</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">transaction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensating after failure at operation \${</span><span class="__shiki_140thh">failedIndex</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 逆序执行补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> failedIndex </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.compensations[i]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.compensations[i](transaction);</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensation \${</span><span class="__shiki_140thh">i</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw">} completed\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (compError) {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Compensation \${</span><span class="__shiki_140thh">i</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw">} failed:\`</span><span class="__shiki_140thh">, compError);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用规范模式</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> specificationPatternExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> spec</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TransactionSpecification</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加前置条件</span></span>
<span class="line"><span class="__shiki_140thh">  spec.</span><span class="__shiki_1t8gfj">addPrecondition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> userCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> userCount </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 限制最大用户数</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Maximum user limit reached&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  spec.</span><span class="__shiki_1t8gfj">addPrecondition</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> balance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">sum</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;balance&#39;</span><span class="__shiki_140thh">, { where: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Insufficient balance&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加操作和补偿</span></span>
<span class="line"><span class="__shiki_140thh">  spec.</span><span class="__shiki_1t8gfj">addOperation</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        username: </span><span class="__shiki_mdbnqw">&#39;spec_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        email: </span><span class="__shiki_mdbnqw">&#39;spec@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { username: </span><span class="__shiki_mdbnqw">&#39;spec_user&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  spec.</span><span class="__shiki_1t8gfj">addOperation</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { balance: Sequelize.</span><span class="__shiki_1t8gfj">literal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;balance - 100&#39;</span><span class="__shiki_140thh">) },</span></span>
<span class="line"><span class="__shiki_140thh">        { </span></span>
<span class="line"><span class="__shiki_140thh">          where: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t </span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { balance: Sequelize.</span><span class="__shiki_1t8gfj">literal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;balance + 100&#39;</span><span class="__shiki_140thh">) },</span></span>
<span class="line"><span class="__shiki_140thh">        { </span></span>
<span class="line"><span class="__shiki_140thh">          where: { userId: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t </span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  spec.</span><span class="__shiki_1t8gfj">addOperation</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 这个操作可能失败</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Random operation failure&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 没有补偿操作</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> spec.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(sequelize);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Specification executed successfully:&#39;</span><span class="__shiki_140thh">, results);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Specification failed:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-事务错误处理策略" tabindex="-1">6.2 事务错误处理策略 <a class="header-anchor" href="#_6-2-事务错误处理策略" aria-label="Permalink to &quot;6.2 事务错误处理策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 通用事务错误处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionErrorHandler</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> executeWithRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      baseDelay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      maxDelay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      shouldRetry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      onRetry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">attempt</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> lastError;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> maxRetries; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> operation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        lastError </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查是否应该重试</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> canRetry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> maxRetries </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1t8gfj"> shouldRetry</span><span class="__shiki_140thh">(error);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">canRetry) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 调用重试回调</span></span>
<span class="line"><span class="__shiki_1t8gfj">        onRetry</span><span class="__shiki_140thh">(error, attempt);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算退避延迟（指数退避 + 随机抖动）</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> delay</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          baseDelay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, attempt </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          maxDelay</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Retry attempt \${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_mdbnqw">} after \${</span><span class="__shiki_140thh">delay</span><span class="__shiki_mdbnqw">}ms due to:\`</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, delay));</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> lastError;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 死锁检测和重试</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> isDeadlockError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;SequelizeDatabaseError&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">           (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deadlock&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Deadlock&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            error.original </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> error.original.code </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;ER_LOCK_DEADLOCK&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> executeWithDeadlockRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">maxRetries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">executeWithRetry</span><span class="__shiki_140thh">(operation, {</span></span>
<span class="line"><span class="__shiki_140thh">      maxRetries,</span></span>
<span class="line"><span class="__shiki_140thh">      shouldRetry: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.isDeadlockError,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      onRetry</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">attempt</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Deadlock detected, retrying (\${</span><span class="__shiki_140thh">attempt</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">maxRetries</span><span class="__shiki_mdbnqw">})\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 超时处理</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> executeWithTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeoutMs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">race</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_1t8gfj">      operation</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">_</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          reject</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Operation timeout after \${</span><span class="__shiki_140thh">timeoutMs</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        }, timeoutMs);</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    ]);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 优雅降级</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> executeWithFallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fallbackOperation</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> operation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Primary operation failed, using fallback:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fallbackOperation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用错误处理策略</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> robustTransactionExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 1. 带重试的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> result1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> TransactionErrorHandler.</span><span class="__shiki_1t8gfj">executeWithDeadlockRetry</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 容易发生死锁的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> user1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> user2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          where: { id: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 业务逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        user1.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        user2.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> user1.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> user2.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { user1, user2 };</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 带超时的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> result2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> TransactionErrorHandler.</span><span class="__shiki_1t8gfj">executeWithTimeout</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 长时间运行的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">3000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_dzsirb">    2000</span><span class="__shiki_21nrsd">  // 2秒超时</span></span>
<span class="line"><span class="__shiki_140thh">  ).</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction timeout:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 带优雅降级的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> result3</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> TransactionErrorHandler.</span><span class="__shiki_1t8gfj">executeWithFallback</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 主要操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 可能失败的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Primary operation failed&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { data: </span><span class="__shiki_mdbnqw">&#39;from primary&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 降级操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 不使用事务的简单操作</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { data: </span><span class="__shiki_mdbnqw">&#39;from fallback&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { result1, result2, result3 };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务监控中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> transactionMonitoringMiddleware</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> originalSend</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> res.send;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> transactionId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 为支持事务的路由添加监控</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (req.path.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成请求ID</span></span>
<span class="line"><span class="__shiki_140thh">    transactionId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`req_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Math</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">36</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">substr</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监控事务开始</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[\${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}] Transaction started: \${</span><span class="__shiki_140thh">req</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">method</span><span class="__shiki_mdbnqw">} \${</span><span class="__shiki_140thh">req</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 拦截响应以记录事务完成</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">body</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> res.statusCode </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> res.statusCode </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;success&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;failure&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[\${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}] Transaction completed:\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        status,</span></span>
<span class="line"><span class="__shiki_140thh">        duration: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        httpStatus: res.statusCode,</span></span>
<span class="line"><span class="__shiki_140thh">        path: req.path,</span></span>
<span class="line"><span class="__shiki_140thh">        method: req.method</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录慢事务</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[\${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">}] Slow transaction detected: \${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> originalSend.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, body);</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、测试事务代码" tabindex="-1">七、测试事务代码 <a class="header-anchor" href="#七、测试事务代码" aria-label="Permalink to &quot;七、测试事务代码&quot;">​</a></h2><h3 id="_7-1-事务单元测试" tabindex="-1">7.1 事务单元测试 <a class="header-anchor" href="#_7-1-事务单元测试" aria-label="Permalink to &quot;7.1 事务单元测试&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用Jest测试事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction Tests&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> User;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> Account;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试前设置</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeAll</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Sequelize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;sqlite::memory:&#39;</span><span class="__shiki_140thh">, { logging: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      username: Sequelize.</span><span class="__shiki_dzsirb">STRING</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      balance: Sequelize.</span><span class="__shiki_1t8gfj">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Account </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Account&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      userId: Sequelize.</span><span class="__shiki_dzsirb">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      balance: Sequelize.</span><span class="__shiki_1t8gfj">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">({ force: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试后清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">  afterAll</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 每个测试前重置数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ where: {} });</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ where: {} });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试1: 成功的事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should commit transaction successfully&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { username: </span><span class="__shiki_mdbnqw">&#39;test_user&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { transaction: t }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { userId: user.id, balance: </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { transaction: t }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { user, account };</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证数据已提交</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> userInDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { username: </span><span class="__shiki_mdbnqw">&#39;test_user&#39;</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(userInDb).</span><span class="__shiki_1t8gfj">toBeTruthy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(userInDb.balance).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> accountInDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { userId: userInDb.id } });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(accountInDb).</span><span class="__shiki_1t8gfj">toBeTruthy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(accountInDb.balance).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.user.id).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(userInDb.id);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.account.id).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(accountInDb.id);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试2: 失败的事务（回滚）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should rollback transaction on error&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> transactionError;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">          { username: </span><span class="__shiki_mdbnqw">&#39;rollback_user&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          { transaction: t }</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 抛出错误，触发回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Intentional error for rollback&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      transactionError </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证事务已回滚（数据不存在）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> userInDb</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { username: </span><span class="__shiki_mdbnqw">&#39;rollback_user&#39;</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(userInDb).</span><span class="__shiki_1t8gfj">toBeNull</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(transactionError.message).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Intentional error for rollback&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试3: 并发事务（死锁测试）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should handle concurrent transactions&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟并发转账（可能产生死锁）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transfer1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> u1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: user1.id },</span></span>
<span class="line"><span class="__shiki_140thh">        lock: t1.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t1</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 添加延迟以增加死锁概率</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> u2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: user2.id },</span></span>
<span class="line"><span class="__shiki_140thh">        lock: t1.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t1</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      u1.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      u2.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> u1.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t1 });</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> u2.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t1 });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transfer2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 反向顺序获取锁（可能导致死锁）</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> u2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: user2.id },</span></span>
<span class="line"><span class="__shiki_140thh">        lock: t2.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t2</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> u1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: user1.id },</span></span>
<span class="line"><span class="__shiki_140thh">        lock: t2.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t2</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      u2.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      u1.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> u2.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t2 });</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> u1.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t2 });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 并行执行，期望至少一个成功，另一个可能因死锁失败</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">allSettled</span><span class="__shiki_140thh">([transfer1, transfer2]);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证至少一个成功</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> successfulTransfers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> results.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> r.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;fulfilled&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(successfulTransfers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toBeGreaterThanOrEqual</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证余额总和不变</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> finalUser1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user1.id } });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> finalUser2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user2.id } });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> totalBalance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(finalUser1.balance) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(finalUser2.balance);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(totalBalance).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 初始总和</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试4: 事务隔离级别</span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should respect transaction isolation levels&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置初始数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;isolation_user&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试可重复读隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> t1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      isolationLevel: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">REPEATABLE_READ</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> t2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      isolationLevel: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">REPEATABLE_READ</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 在事务1中读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> userInT1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { username: </span><span class="__shiki_mdbnqw">&#39;isolation_user&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t1</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 在事务2中更新相同数据</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        { balance: </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        { </span></span>
<span class="line"><span class="__shiki_140thh">          where: { username: </span><span class="__shiki_mdbnqw">&#39;isolation_user&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t2</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> t2.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 在事务1中再次读取（应该看到相同的数据，因为可重复读）</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> userInT1Again</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { username: </span><span class="__shiki_mdbnqw">&#39;isolation_user&#39;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t1</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 验证可重复读：两次读取应该相同</span></span>
<span class="line"><span class="__shiki_1t8gfj">      expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(userInT1.balance)).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(userInT1Again.balance));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> t1.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> t1.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> t2.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 测试5: 事务钩子</span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should execute transaction hooks&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hooks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      beforeCommit: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      afterCommit: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      afterRollback: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">beforeCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          hooks.beforeCommit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">afterCommit</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          hooks.afterCommit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        t.</span><span class="__shiki_1t8gfj">afterRollback</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          hooks.afterRollback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;hook_user&#39;</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 验证提交钩子被调用</span></span>
<span class="line"><span class="__shiki_1t8gfj">      expect</span><span class="__shiki_140thh">(hooks.beforeCommit).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">      expect</span><span class="__shiki_140thh">(hooks.afterCommit).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">      expect</span><span class="__shiki_140thh">(hooks.afterRollback).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 验证回滚钩子被调用</span></span>
<span class="line"><span class="__shiki_1t8gfj">      expect</span><span class="__shiki_140thh">(hooks.afterRollback).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_7-2-事务集成测试" tabindex="-1">7.2 事务集成测试 <a class="header-anchor" href="#_7-2-事务集成测试" aria-label="Permalink to &quot;7.2 事务集成测试&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用SuperTest进行API事务测试</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> request</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;supertest&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> express</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;express&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> app</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> express</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 模拟银行转账API</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/transfer&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">fromUserId</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">toUserId</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">amount</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> req.body;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> fromUser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: fromUserId },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t,</span></span>
<span class="line"><span class="__shiki_140thh">        lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">fromUser) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Sender not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (fromUser.balance </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> amount) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient balance&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> toUser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        where: { id: toUserId },</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t,</span></span>
<span class="line"><span class="__shiki_140thh">        lock: t.</span><span class="__shiki_dzsirb">LOCK</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">UPDATE</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">toUser) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Receiver not found&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 更新余额</span></span>
<span class="line"><span class="__shiki_140thh">      fromUser.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount;</span></span>
<span class="line"><span class="__shiki_140thh">      toUser.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> amount;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> fromUser.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> toUser.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录交易</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> TransactionRecord.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        fromUserId,</span></span>
<span class="line"><span class="__shiki_140thh">        toUserId,</span></span>
<span class="line"><span class="__shiki_140thh">        amount,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;TRANSFER&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        fromUser: { id: fromUser.id, balance: fromUser.balance },</span></span>
<span class="line"><span class="__shiki_140thh">        toUser: { id: toUser.id, balance: toUser.balance }</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, data: result });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">      success: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">      error: error.message </span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 集成测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transfer API Integration Tests&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeAll</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">sync</span><span class="__shiki_140thh">({ force: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ where: {} });</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> TransactionRecord.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ where: {} });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;POST /api/transfer should transfer money successfully&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建测试用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> request</span><span class="__shiki_140thh">(app)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/transfer&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        fromUserId: user1.id,</span></span>
<span class="line"><span class="__shiki_140thh">        toUserId: user2.id,</span></span>
<span class="line"><span class="__shiki_140thh">        amount: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">expect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_21q97f">json</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">expect</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(response.body.success).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(response.body.data.fromUser.balance).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">800</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(response.body.data.toUser.balance).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">700</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证数据库状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> updatedUser1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user1.id } });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> updatedUser2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user2.id } });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(updatedUser1.balance)).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">800</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(updatedUser2.balance)).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">700</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证交易记录</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionRecord</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> TransactionRecord.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { fromUserId: user1.id }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(transactionRecord).</span><span class="__shiki_1t8gfj">toBeTruthy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(transactionRecord.amount)).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;POST /api/transfer should fail with insufficient balance&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> request</span><span class="__shiki_140thh">(app)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/transfer&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        fromUserId: user1.id,</span></span>
<span class="line"><span class="__shiki_140thh">        toUserId: user2.id,</span></span>
<span class="line"><span class="__shiki_140thh">        amount: </span><span class="__shiki_dzsirb">200</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">expect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_21q97f">json</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">expect</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(response.body.success).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(response.body.error).</span><span class="__shiki_1t8gfj">toContain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient balance&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证余额未改变（事务已回滚）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> updatedUser1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user1.id } });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> updatedUser2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user2.id } });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(updatedUser1.balance)).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(updatedUser2.balance)).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;POST /api/transfer should handle concurrent transfers&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> user2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh">, balance: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 并发发送多个转账请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transferRequests</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      transferRequests.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">        request</span><span class="__shiki_140thh">(app)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/transfer&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            fromUserId: user1.id,</span></span>
<span class="line"><span class="__shiki_140thh">            toUserId: user2.id,</span></span>
<span class="line"><span class="__shiki_140thh">            amount: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">          })</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> responses</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(transferRequests);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证所有请求都处理完毕</span></span>
<span class="line"><span class="__shiki_140thh">    responses.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">response</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      expect</span><span class="__shiki_140thh">([</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh">]).</span><span class="__shiki_1t8gfj">toContain</span><span class="__shiki_140thh">(response.status);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证最终余额正确</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> finalUser1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user1.id } });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> finalUser2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: user2.id } });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> totalBalance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(finalUser1.balance) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(finalUser2.balance);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(totalBalance).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 总额不变</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证交易记录数量</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> TransactionRecord.</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { fromUserId: user1.id }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Successfully completed \${</span><span class="__shiki_140thh">transactionCount</span><span class="__shiki_mdbnqw">} transactions\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="八、性能优化和最佳实践" tabindex="-1">八、性能优化和最佳实践 <a class="header-anchor" href="#八、性能优化和最佳实践" aria-label="Permalink to &quot;八、性能优化和最佳实践&quot;">​</a></h2><h3 id="_8-1-事务性能优化" tabindex="-1">8.1 事务性能优化 <a class="header-anchor" href="#_8-1-事务性能优化" aria-label="Permalink to &quot;8.1 事务性能优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 批量操作优化</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OptimizedTransactionManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量插入优化</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> bulkInsertUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 不使用事务：适用于大量数据，但可能部分失败</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (users.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Large dataset, consider batch processing&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">bulkCreate</span><span class="__shiki_140thh">(users, {</span></span>
<span class="line"><span class="__shiki_140thh">        validate: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ignoreDuplicates: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        hooks: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  // 禁用钩子提高性能</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用事务：保证原子性</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">bulkCreate</span><span class="__shiki_140thh">(users, {</span></span>
<span class="line"><span class="__shiki_140thh">        transaction: t,</span></span>
<span class="line"><span class="__shiki_140thh">        validate: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        returning: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  // 不返回插入的数据，提高性能</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量更新优化</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> bulkUpdateUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userUpdates</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> updatePromises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> userUpdates.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">update</span><span class="__shiki_1itgoe"> =&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        User.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(update.data, {</span></span>
<span class="line"><span class="__shiki_140thh">          where: update.where,</span></span>
<span class="line"><span class="__shiki_140thh">          transaction: t,</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 使用原始SQL提高性能</span></span>
<span class="line"><span class="__shiki_21nrsd">          // raw: true</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(updatePromises);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分批次处理大量数据</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> processLargeDatasetInBatches</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">processFn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batches</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> data.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> batchSize) {</span></span>
<span class="line"><span class="__shiki_140thh">      batches.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(data.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(i, i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batchSize));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> batch</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> batches) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> batchResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> processFn</span><span class="__shiki_140thh">(batch, t);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(batchResult);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 批次间暂停，避免资源竞争</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (batches.</span><span class="__shiki_1t8gfj">indexOf</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> batches.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 连接池优化</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> configureConnectionPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Sequelize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    dialect: </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pool: {</span></span>
<span class="line"><span class="__shiki_140thh">      max: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 最大连接数</span></span>
<span class="line"><span class="__shiki_140thh">      min: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 最小连接数</span></span>
<span class="line"><span class="__shiki_140thh">      acquire: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 获取连接超时时间(ms)</span></span>
<span class="line"><span class="__shiki_140thh">      idle: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 连接空闲时间(ms)</span></span>
<span class="line"><span class="__shiki_140thh">      evict: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 驱逐间隔(ms)</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 连接验证</span></span>
<span class="line"><span class="__shiki_1t8gfj">      validate</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">connection</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> connection.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SELECT 1&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">catch</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 连接获取重试</span></span>
<span class="line"><span class="__shiki_140thh">      acquireRetryAttempts: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      acquireRetryInterval: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 事务相关优化</span></span>
<span class="line"><span class="__shiki_140thh">    transactionType: Transaction.</span><span class="__shiki_dzsirb">TYPES</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">DEFERRED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    isolationLevel: Transaction.</span><span class="__shiki_dzsirb">ISOLATION_LEVELS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">READ_COMMITTED</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查询优化</span></span>
<span class="line"><span class="__shiki_140thh">    benchmark: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;development&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    logging: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;development&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> console.log </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接设置</span></span>
<span class="line"><span class="__shiki_140thh">    keepDefaultTimezone: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    timezone: </span><span class="__shiki_mdbnqw">&#39;+08:00&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 类型转换优化</span></span>
<span class="line"><span class="__shiki_140thh">    typeValidation: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // dialectOptions: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    //   decimalNumbers: true</span><span class="__shiki_21nrsd">  // PostgreSQL小数处理</span></span>
<span class="line"><span class="__shiki_21nrsd">    // }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 事务超时和取消</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CancellableTransaction</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sequelize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sequelize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sequelize;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cancellationTokens </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> executeWithCancellation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeoutMs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建取消令牌</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cancellationToken</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      isCancelled: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      cancel</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        cancellationToken.isCancelled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cancellationTokens.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(transactionId, cancellationToken);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置超时</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> timeoutPromise</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">_</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reject</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        cancellationToken.</span><span class="__shiki_1t8gfj">cancel</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        reject</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">} timeout after \${</span><span class="__shiki_140thh">timeoutMs</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      }, timeoutMs);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> transactionPromise</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 定期检查是否取消</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_1t8gfj"> checkCancellation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (cancellationToken.isCancelled) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Transaction \${</span><span class="__shiki_140thh">transactionId</span><span class="__shiki_mdbnqw">} was cancelled\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 在操作中插入取消检查</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> originalQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> t.connection.query;</span></span>
<span class="line"><span class="__shiki_140thh">      t.connection.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sql</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">values</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cb</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        checkCancellation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> originalQuery.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, sql, values, cb);</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> operation</span><span class="__shiki_140thh">(t, checkCancellation);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">race</span><span class="__shiki_140thh">([transactionPromise, timeoutPromise]);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.cancellationTokens.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  cancelTransaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">transactionId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.cancellationTokens.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(transactionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (token) {</span></span>
<span class="line"><span class="__shiki_140thh">      token.</span><span class="__shiki_1t8gfj">cancel</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用可取消事务</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> cancellableTransactionExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> manager</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CancellableTransaction</span><span class="__shiki_140thh">(sequelize);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> transactionId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;tx_&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> manager.</span><span class="__shiki_1t8gfj">executeWithCancellation</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      transactionId,</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">checkCancellation</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 长时间运行的操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          checkCancellation</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 检查是否取消</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({ username: </span><span class="__shiki_mdbnqw">\`user_\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh"> }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> { success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_dzsirb">      5000</span><span class="__shiki_21nrsd">  // 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction completed:&#39;</span><span class="__shiki_140thh">, result);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cancelled&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;timeout&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction was cancelled or timed out:&#39;</span><span class="__shiki_140thh">, error.message);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-最佳实践总结" tabindex="-1">8.2 最佳实践总结 <a class="header-anchor" href="#_8-2-最佳实践总结" aria-label="Permalink to &quot;8.2 最佳实践总结&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 事务最佳实践指南</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionBestPractices</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> getGuidelines</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 1. 事务设计</span></span>
<span class="line"><span class="__shiki_140thh">      design: {</span></span>
<span class="line"><span class="__shiki_140thh">        keepTransactionsShort: </span><span class="__shiki_mdbnqw">&#39;事务应尽可能短，减少锁持有时间&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        singlePurpose: </span><span class="__shiki_mdbnqw">&#39;每个事务应该有单一明确的目的&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        properIsolation: </span><span class="__shiki_mdbnqw">&#39;根据需求选择合适的隔离级别&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        handleRollbacks: </span><span class="__shiki_mdbnqw">&#39;始终处理事务回滚情况&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 2. 性能优化</span></span>
<span class="line"><span class="__shiki_140thh">      performance: {</span></span>
<span class="line"><span class="__shiki_140thh">        batchOperations: </span><span class="__shiki_mdbnqw">&#39;批量操作减少事务数量&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        appropriateIndexes: </span><span class="__shiki_mdbnqw">&#39;为事务中查询的字段建立索引&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        avoidLongRunning: </span><span class="__shiki_mdbnqw">&#39;避免在事务中执行长时间操作&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        connectionPooling: </span><span class="__shiki_mdbnqw">&#39;使用连接池管理数据库连接&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 3. 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">      errorHandling: {</span></span>
<span class="line"><span class="__shiki_140thh">        retryMechanisms: </span><span class="__shiki_mdbnqw">&#39;为可重试错误实现重试机制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        deadlockHandling: </span><span class="__shiki_mdbnqw">&#39;检测并处理死锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        timeoutMechanisms: </span><span class="__shiki_mdbnqw">&#39;为事务设置合理的超时&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        loggingAndMonitoring: </span><span class="__shiki_mdbnqw">&#39;记录事务执行情况和性能指标&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 4. 并发控制</span></span>
<span class="line"><span class="__shiki_140thh">      concurrency: {</span></span>
<span class="line"><span class="__shiki_140thh">        optimisticLocking: </span><span class="__shiki_mdbnqw">&#39;为高并发场景使用乐观锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pessimisticLocking: </span><span class="__shiki_mdbnqw">&#39;为数据一致性要求高的场景使用悲观锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        lockOrdering: </span><span class="__shiki_mdbnqw">&#39;按固定顺序获取锁，避免死锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        lockGranularity: </span><span class="__shiki_mdbnqw">&#39;选择合适粒度的锁（行锁 vs 表锁）&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 5. 测试</span></span>
<span class="line"><span class="__shiki_140thh">      testing: {</span></span>
<span class="line"><span class="__shiki_140thh">        unitTests: </span><span class="__shiki_mdbnqw">&#39;编写事务的单元测试&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        integrationTests: </span><span class="__shiki_mdbnqw">&#39;编写事务的集成测试&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        concurrencyTests: </span><span class="__shiki_mdbnqw">&#39;测试并发事务场景&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        failureTests: </span><span class="__shiki_mdbnqw">&#39;测试事务失败和回滚场景&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 6. 监控</span></span>
<span class="line"><span class="__shiki_140thh">      monitoring: {</span></span>
<span class="line"><span class="__shiki_140thh">        transactionMetrics: </span><span class="__shiki_mdbnqw">&#39;监控事务成功率、平均时间等指标&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        slowTransactionAlerts: </span><span class="__shiki_mdbnqw">&#39;设置慢事务告警&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        deadlockDetection: </span><span class="__shiki_mdbnqw">&#39;监控和报告死锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        resourceUsage: </span><span class="__shiki_mdbnqw">&#39;监控事务对数据库资源的使用&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 事务代码审查清单</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> getCodeReviewChecklist</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;事务是否有明确的开始和结束？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否处理了所有可能的错误情况？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;事务是否包含不必要的操作？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否选择了合适的隔离级别？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否有适当的重试机制？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否考虑了并发访问？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否有适当的日志记录？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;事务执行时间是否合理？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否有适当的测试覆盖？&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;是否考虑了死锁可能性？&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 常见事务反模式</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> getAntiPatterns</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 1. 长事务</span></span>
<span class="line"><span class="__shiki_140thh">      longRunningTransactions: {</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;事务中包含长时间运行的操作&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        impact: </span><span class="__shiki_mdbnqw">&#39;长时间持有锁，降低并发性能&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        solution: </span><span class="__shiki_mdbnqw">&#39;将事务拆分为多个短事务，或将长时间操作移出事务&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 2. 事务中调用外部服务</span></span>
<span class="line"><span class="__shiki_140thh">      externalServiceCalls: {</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;在事务中调用外部API或服务&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        impact: </span><span class="__shiki_mdbnqw">&#39;增加事务时间，外部服务失败导致事务回滚&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        solution: </span><span class="__shiki_mdbnqw">&#39;在事务外调用外部服务，使用补偿事务处理失败&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 3. 嵌套事务滥用</span></span>
<span class="line"><span class="__shiki_140thh">      nestedTransactionOveruse: {</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;过度使用嵌套事务&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        impact: </span><span class="__shiki_mdbnqw">&#39;增加复杂性，可能引起死锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        solution: </span><span class="__shiki_mdbnqw">&#39;使用保存点，或重构为扁平事务&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 4. 缺少错误处理</span></span>
<span class="line"><span class="__shiki_140thh">      missingErrorHandling: {</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;未处理事务中的异常&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        impact: </span><span class="__shiki_mdbnqw">&#39;事务状态不一致，资源泄露&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        solution: </span><span class="__shiki_mdbnqw">&#39;使用try-catch-finally，确保事务正确关闭&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 5. 过度使用悲观锁</span></span>
<span class="line"><span class="__shiki_140thh">      excessivePessimisticLocking: {</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;不必要地使用悲观锁&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        impact: </span><span class="__shiki_mdbnqw">&#39;降低并发性能&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        solution: </span><span class="__shiki_mdbnqw">&#39;考虑使用乐观锁，或减少锁的粒度&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用最佳实践</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> followBestPractices</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> guidelines</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> TransactionBestPractices.</span><span class="__shiki_1t8gfj">getGuidelines</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> checklist</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> TransactionBestPractices.</span><span class="__shiki_1t8gfj">getCodeReviewChecklist</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> antiPatterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> TransactionBestPractices.</span><span class="__shiki_1t8gfj">getAntiPatterns</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Following transaction best practices...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 示例：遵循最佳实践的事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 1. 保持事务短小</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 2. 单一目的：创建用户和账户</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查反模式</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (antiPatterns.longRunningTransactions) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 避免长时间操作</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Avoiding long-running operations in transaction&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 执行操作</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        username: </span><span class="__shiki_mdbnqw">&#39;best_practice_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        email: </span><span class="__shiki_mdbnqw">&#39;best@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> account</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Account.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        userId: user.id,</span></span>
<span class="line"><span class="__shiki_140thh">        balance: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">      }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录日志（不依赖外部服务）</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Created user \${</span><span class="__shiki_140thh">user</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">} with account \${</span><span class="__shiki_140thh">account</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { user, account };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 遵循错误处理最佳实践</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction failed:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 根据错误类型决定是否重试</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;SequelizeDatabaseError&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          error.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;deadlock&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Deadlock detected, should retry&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事务健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> transactionHealthCheck</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> health</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_mdbnqw">&#39;healthy&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    issues: [],</span></span>
<span class="line"><span class="__shiki_140thh">    metrics: {}</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试事务基本功能</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> testUser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        username: </span><span class="__shiki_mdbnqw">&#39;health_check_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        balance: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">      }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> testUser.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">({ transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    health.metrics.basicTransaction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;working&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> isolationLevels</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;READ UNCOMMITTED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;READ COMMITTED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;REPEATABLE READ&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;SERIALIZABLE&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> level</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> isolationLevels) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          isolationLevel: level</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            username: </span><span class="__shiki_mdbnqw">\`test_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            balance: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">          }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        health.metrics[</span><span class="__shiki_mdbnqw">\`isolation_\${</span><span class="__shiki_140thh">level</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;supported&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        health.metrics[</span><span class="__shiki_mdbnqw">\`isolation_\${</span><span class="__shiki_140thh">level</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;unsupported&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        health.issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Isolation level \${</span><span class="__shiki_140thh">level</span><span class="__shiki_mdbnqw">} not supported\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试并发</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> concurrentPromises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      concurrentPromises.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        sequelize.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">t</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            username: </span><span class="__shiki_mdbnqw">\`concurrent_\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            balance: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">          }, { transaction: t });</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(concurrentPromises);</span></span>
<span class="line"><span class="__shiki_140thh">    health.metrics.concurrency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;working&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction health check completed:&#39;</span><span class="__shiki_140thh">, health);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> health;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    health.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;unhealthy&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    health.issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Health check failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Transaction health check failed:&#39;</span><span class="__shiki_140thh">, health);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> health;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Sequelize 的事务管理提供了强大而灵活的功能来确保数据的一致性和完整性。关键要点包括：</p><h3 id="核心概念" tabindex="-1">核心概念： <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念：&quot;">​</a></h3><ol><li><strong>两种事务模式</strong>：非托管事务（手动控制）和托管事务（自动控制）</li><li><strong>隔离级别</strong>：READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE</li><li><strong>锁定机制</strong>：乐观锁和悲观锁</li></ol><h3 id="高级特性" tabindex="-1">高级特性： <a class="header-anchor" href="#高级特性" aria-label="Permalink to &quot;高级特性：&quot;">​</a></h3><ol><li><strong>事务传播</strong>：嵌套事务和保存点</li><li><strong>事务钩子</strong>：beforeCommit, afterCommit, afterRollback 等</li><li><strong>错误处理</strong>：重试机制、死锁处理、超时控制</li><li><strong>监控调试</strong>：事务日志、性能监控、健康检查</li></ol><h3 id="设计模式" tabindex="-1">设计模式： <a class="header-anchor" href="#设计模式" aria-label="Permalink to &quot;设计模式：&quot;">​</a></h3><ol><li><strong>补偿事务/Saga模式</strong>：处理分布式事务</li><li><strong>工作单元模式</strong>：批量操作管理</li><li><strong>资源库模式</strong>：数据访问层抽象</li></ol><h3 id="最佳实践" tabindex="-1">最佳实践： <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践：&quot;">​</a></h3><ol><li><strong>保持事务短小</strong>，减少锁持有时间</li><li><strong>选择合适的隔离级别</strong>，平衡一致性和性能</li><li><strong>实现适当的错误处理</strong>和重试机制</li><li><strong>监控事务性能</strong>，设置告警阈值</li><li><strong>编写全面的测试</strong>，包括并发测试</li></ol><p>通过合理使用 Sequelize 的事务功能，可以构建健壮、高性能的 Node.js 应用程序，确保数据的一致性和系统的可靠性。</p>`,58)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
