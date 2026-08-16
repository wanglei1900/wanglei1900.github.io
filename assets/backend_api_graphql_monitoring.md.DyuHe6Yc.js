import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"🚀 GraphQL性能监控全面指南","description":"","frontmatter":{},"headers":[],"relativePath":"backend/api/graphql/monitoring.md","filePath":"backend/api/graphql/monitoring.md"}'),p={name:"backend/api/graphql/monitoring.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="🚀-graphql性能监控全面指南" tabindex="-1">🚀 GraphQL性能监控全面指南 <a class="header-anchor" href="#🚀-graphql性能监控全面指南" aria-label="Permalink to &quot;🚀 GraphQL性能监控全面指南&quot;">​</a></h1><h2 id="一、graphql性能监控基础" tabindex="-1">一、GraphQL性能监控基础 <a class="header-anchor" href="#一、graphql性能监控基础" aria-label="Permalink to &quot;一、GraphQL性能监控基础&quot;">​</a></h2><h3 id="_1-1-为什么graphql性能监控至关重要" tabindex="-1">1.1 为什么GraphQL性能监控至关重要 <a class="header-anchor" href="#_1-1-为什么graphql性能监控至关重要" aria-label="Permalink to &quot;1.1 为什么GraphQL性能监控至关重要&quot;">​</a></h3><p><strong>GraphQL性能挑战</strong>：</p><ul><li><strong>查询复杂度不可预测</strong>：客户端可以自由组合查询字段</li><li><strong>N+1查询问题</strong>：关联字段可能导致大量数据库查询</li><li><strong>解析器性能差异</strong>：不同解析器可能有不同的性能特征</li><li><strong>缓存复杂性</strong>：传统HTTP缓存不直接适用</li></ul><p><strong>监控的价值</strong>：</p><ul><li>识别性能瓶颈</li><li>优化查询模式</li><li>预防生产环境问题</li><li>提升用户体验</li></ul><h3 id="_1-2-graphql性能监控指标分类" tabindex="-1">1.2 GraphQL性能监控指标分类 <a class="header-anchor" href="#_1-2-graphql性能监控指标分类" aria-label="Permalink to &quot;1.2 GraphQL性能监控指标分类&quot;">​</a></h3><table tabindex="0"><thead><tr><th>指标类别</th><th>具体指标</th><th>重要性</th></tr></thead><tbody><tr><td><strong>查询性能</strong></td><td>查询执行时间、解析器执行时间、查询复杂度</td><td>直接影响用户体验</td></tr><tr><td><strong>资源使用</strong></td><td>内存使用、CPU负载、数据库查询次数</td><td>影响系统稳定性</td></tr><tr><td><strong>业务指标</strong></td><td>错误率、请求量、热门查询</td><td>业务健康度评估</td></tr><tr><td><strong>缓存效率</strong></td><td>缓存命中率、缓存大小、缓存失效频率</td><td>系统扩展性</td></tr></tbody></table><h2 id="二、核心性能监控指标" tabindex="-1">二、核心性能监控指标 <a class="header-anchor" href="#二、核心性能监控指标" aria-label="Permalink to &quot;二、核心性能监控指标&quot;">​</a></h2><h3 id="_2-1-查询级别监控" tabindex="-1">2.1 查询级别监控 <a class="header-anchor" href="#_2-1-查询级别监控" aria-label="Permalink to &quot;2.1 查询级别监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// GraphQL查询执行时间监控</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> monitorQueryExecution</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operationName</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> graphql</span><span class="__shiki_140thh">(schema, query, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, context, variables, operationName);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> executionTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录指标</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.query.execution_time&#39;</span><span class="__shiki_140thh">, executionTime);</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.query.total&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> executionTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.query.error_execution_time&#39;</span><span class="__shiki_140thh">, executionTime);</span></span>
<span class="line"><span class="__shiki_140thh">    metrics.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.query.errors&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_2-2-解析器级别监控" tabindex="-1">2.2 解析器级别监控 <a class="header-anchor" href="#_2-2-解析器级别监控" aria-label="Permalink to &quot;2.2 解析器级别监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 解析器性能监控包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> createMonitoredResolver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">resolver</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fieldName</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">typeName</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.hrtime.</span><span class="__shiki_1t8gfj">bigint</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> resolver</span><span class="__shiki_140thh">(parent, args, context, info);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> executionTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(process.hrtime.</span><span class="__shiki_1t8gfj">bigint</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 转毫秒</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录解析器性能指标</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">typeName</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">fieldName</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, executionTime);</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">typeName</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">fieldName</span><span class="__shiki_mdbnqw">}.calls\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> executionTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(process.hrtime.</span><span class="__shiki_1t8gfj">bigint</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">typeName</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">fieldName</span><span class="__shiki_mdbnqw">}.error\`</span><span class="__shiki_140thh">, executionTime);</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">typeName</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">fieldName</span><span class="__shiki_mdbnqw">}.errors\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 应用监控到所有解析器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> monitoredResolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(resolvers).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">typeName</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  monitoredResolvers[typeName] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">  Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(resolvers[typeName]).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fieldName</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    monitoredResolvers[typeName][fieldName] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> createMonitoredResolver</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      resolvers[typeName][fieldName],</span></span>
<span class="line"><span class="__shiki_140thh">      fieldName,</span></span>
<span class="line"><span class="__shiki_140thh">      typeName</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_2-3-查询复杂度计算" tabindex="-1">2.3 查询复杂度计算 <a class="header-anchor" href="#_2-3-查询复杂度计算" aria-label="Permalink to &quot;2.3 查询复杂度计算&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询复杂度分析</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ComplexityAnalyzer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">maxComplexity</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxComplexity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> maxComplexity;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 计算查询复杂度</span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateComplexity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ast</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">schema</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> complexity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> typeInfo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TypeInfo</span><span class="__shiki_140thh">(schema);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    visit</span><span class="__shiki_140thh">(ast, {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      enter</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        typeInfo.</span><span class="__shiki_1t8gfj">enter</span><span class="__shiki_140thh">(node);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (node.kind </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;Field&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> fieldDef</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> typeInfo.</span><span class="__shiki_1t8gfj">getFieldDef</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (fieldDef) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 基本字段复杂度为1</span></span>
<span class="line"><span class="__shiki_1itgoe">            let</span><span class="__shiki_140thh"> fieldComplexity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查参数，列表查询增加复杂度</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (node.arguments) {</span></span>
<span class="line"><span class="__shiki_1itgoe">              const</span><span class="__shiki_dzsirb"> firstArg</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> node.arguments.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">arg</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> arg.name.value </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;first&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">              if</span><span class="__shiki_140thh"> (firstArg </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> firstArg.value.kind </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;IntValue&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                fieldComplexity </span><span class="__shiki_1itgoe">*=</span><span class="__shiki_1t8gfj"> parseInt</span><span class="__shiki_140thh">(firstArg.value.value, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            complexity </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> fieldComplexity;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_1t8gfj">      leave</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        typeInfo.</span><span class="__shiki_1t8gfj">leave</span><span class="__shiki_140thh">(node);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> complexity;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 复杂度验证中间件</span></span>
<span class="line"><span class="__shiki_1t8gfj">  validationRule</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      Field</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> complexity</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateComplexity</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">getDocument</span><span class="__shiki_140thh">(), context.</span><span class="__shiki_1t8gfj">getSchema</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (complexity </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxComplexity) {</span></span>
<span class="line"><span class="__shiki_140thh">          context.</span><span class="__shiki_1t8gfj">reportError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> GraphQLError</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            \`Query too complex: \${</span><span class="__shiki_140thh">complexity</span><span class="__shiki_mdbnqw">}. Maximum allowed complexity: \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">maxComplexity</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            [node]</span></span>
<span class="line"><span class="__shiki_140thh">          ));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用复杂度分析</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> analyzer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ComplexityAnalyzer</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/graphql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">graphqlHTTP</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  schema: schema,</span></span>
<span class="line"><span class="__shiki_140thh">  validationRules: [analyzer.validationRule.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(analyzer)]</span></span>
<span class="line"><span class="__shiki_140thh">}));</span></span></code></pre></div><h2 id="三、监控工具与集成" tabindex="-1">三、监控工具与集成 <a class="header-anchor" href="#三、监控工具与集成" aria-label="Permalink to &quot;三、监控工具与集成&quot;">​</a></h2><h3 id="_3-1-apollo-studio监控" tabindex="-1">3.1 Apollo Studio监控 <a class="header-anchor" href="#_3-1-apollo-studio监控" aria-label="Permalink to &quot;3.1 Apollo Studio监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Apollo Server 监控配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">ApolloServer</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">ApolloServerPluginUsageReporting</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server-core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ApolloServerPluginUsageReporting</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 配置选项</span></span>
<span class="line"><span class="__shiki_140thh">      sendVariableValues: { all: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      sendHeaders: { names: [</span><span class="__shiki_mdbnqw">&#39;user-agent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;authorization&#39;</span><span class="__shiki_140thh">] },</span></span>
<span class="line"><span class="__shiki_140thh">      sendErrors: { unmodified: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 自定义指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">      generateClientInfo</span><span class="__shiki_140thh">: ({ </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        clientName: request.http.headers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;client-name&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        clientVersion: request.http.headers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;client-version&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      }),</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自定义性能监控插件</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      requestDidStart</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">requestContext</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          didResolveOperation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">requestContext</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录查询解析时间</span></span>
<span class="line"><span class="__shiki_140thh">            metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.operation.parse_time&#39;</span><span class="__shiki_140thh">, Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime);</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_1t8gfj">          willSendResponse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">requestContext</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录总执行时间</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> totalTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">            metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.operation.total_time&#39;</span><span class="__shiki_140thh">, totalTime);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录到Apollo Studio</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (requestContext.metrics) {</span></span>
<span class="line"><span class="__shiki_140thh">              requestContext.metrics.operation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> requestContext.operationName;</span></span>
<span class="line"><span class="__shiki_140thh">              requestContext.metrics.duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> totalTime;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_1t8gfj">          executionDidStart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">              willResolveField</span><span class="__shiki_140thh">({ </span><span class="__shiki_1jdh33">source</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh"> }) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">result</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                  const</span><span class="__shiki_dzsirb"> resolveTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">                  metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">info</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">parentType</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}.\${</span><span class="__shiki_140thh">info</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">fieldName</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, resolveTime);</span></span>
<span class="line"><span class="__shiki_140thh">                };</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            };</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_3-2-datadog-statsd集成" tabindex="-1">3.2 DataDog/StatsD集成 <a class="header-anchor" href="#_3-2-datadog-statsd集成" aria-label="Permalink to &quot;3.2 DataDog/StatsD集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// StatsD 监控集成</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> StatsD</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;hot-shots&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dogstatsd</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> StatsD</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// GraphQL 监控中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> graphqlMonitoringMiddleware</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (req.body </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> req.body.query) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原始end方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalEnd</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> res.end;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">end</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">chunk</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">encoding</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> responseTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 发送指标到DataDog</span></span>
<span class="line"><span class="__shiki_140thh">      dogstatsd.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.request.duration&#39;</span><span class="__shiki_140thh">, responseTime);</span></span>
<span class="line"><span class="__shiki_140thh">      dogstatsd.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.request.count&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 根据状态码记录</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (res.statusCode </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        dogstatsd.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql.request.errors&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      originalEnd.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, chunk, encoding);</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 解析器级别监控</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> withDataDogMonitoring</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">resolver</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">resolverName</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> resolver</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">args);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      dogstatsd.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">resolverName</span><span class="__shiki_mdbnqw">}.duration\`</span><span class="__shiki_140thh">, duration);</span></span>
<span class="line"><span class="__shiki_140thh">      dogstatsd.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">resolverName</span><span class="__shiki_mdbnqw">}.success\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      dogstatsd.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">resolverName</span><span class="__shiki_mdbnqw">}.error_duration\`</span><span class="__shiki_140thh">, duration);</span></span>
<span class="line"><span class="__shiki_140thh">      dogstatsd.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`graphql.resolver.\${</span><span class="__shiki_140thh">resolverName</span><span class="__shiki_mdbnqw">}.error\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-3-prometheus-grafana监控栈" tabindex="-1">3.3 Prometheus + Grafana监控栈 <a class="header-anchor" href="#_3-3-prometheus-grafana监控栈" aria-label="Permalink to &quot;3.3 Prometheus + Grafana监控栈&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Prometheus指标收集</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> client</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;prom-client&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> collectDefaultMetrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client.collectDefaultMetrics;</span></span>
<span class="line"><span class="__shiki_1t8gfj">collectDefaultMetrics</span><span class="__shiki_140thh">({ timeout: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建自定义指标</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> graphqlQueryDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Histogram</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;graphql_query_duration_seconds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  help: </span><span class="__shiki_mdbnqw">&#39;GraphQL query execution time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  labelNames: [</span><span class="__shiki_mdbnqw">&#39;operation&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;complexity&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  buckets: [</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> graphqlResolverDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Histogram</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;graphql_resolver_duration_seconds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  help: </span><span class="__shiki_mdbnqw">&#39;GraphQL resolver execution time&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  labelNames: [</span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;field&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  buckets: [</span><span class="__shiki_dzsirb">0.001</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.005</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> graphqlErrorsTotal</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Counter</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;graphql_errors_total&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  help: </span><span class="__shiki_mdbnqw">&#39;Total GraphQL errors&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  labelNames: [</span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;field&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;error_code&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> prometheusMonitoring</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (req.path </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;/graphql&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> req.body </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> req.body.query) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> end</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> graphqlQueryDuration.</span><span class="__shiki_1t8gfj">startTimer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalSend</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> res.send;</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">body</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> responseTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> parsedBody</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(body);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (parsedBody.errors) {</span></span>
<span class="line"><span class="__shiki_140thh">          parsedBody.errors.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            graphqlErrorsTotal.</span><span class="__shiki_1t8gfj">inc</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">              type: error.path </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> error.path[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">              error_code: error.extensions </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> error.extensions.code </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;unknown&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        end</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          operation: req.body.operationName </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;anonymous&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          complexity: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(responseTime </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 简单复杂度估算</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (e) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 解析错误处理</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      originalSend.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, body);</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Express应用中使用</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(prometheusMonitoring);</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/metrics&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">, client.register.contentType);</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">end</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> client.register.</span><span class="__shiki_1t8gfj">metrics</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="四、性能分析与优化" tabindex="-1">四、性能分析与优化 <a class="header-anchor" href="#四、性能分析与优化" aria-label="Permalink to &quot;四、性能分析与优化&quot;">​</a></h2><h3 id="_4-1-查询性能分析" tabindex="-1">4.1 查询性能分析 <a class="header-anchor" href="#_4-1-查询性能分析" aria-label="Permalink to &quot;4.1 查询性能分析&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 深度性能分析工具</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> GraphQLPerformanceAnalyzer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分析查询模式</span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeQueryPatterns</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queries</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> patterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    queries.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> signature</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getQuerySignature</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">patterns[signature]) {</span></span>
<span class="line"><span class="__shiki_140thh">        patterns[signature] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          count: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          totalTime: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          avgTime: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          maxTime: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          minTime: </span><span class="__shiki_dzsirb">Infinity</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      patterns[signature].count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      patterns[signature].totalTime </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> query.duration;</span></span>
<span class="line"><span class="__shiki_140thh">      patterns[signature].avgTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> patterns[signature].totalTime </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> patterns[signature].count;</span></span>
<span class="line"><span class="__shiki_140thh">      patterns[signature].maxTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(patterns[signature].maxTime, query.duration);</span></span>
<span class="line"><span class="__shiki_140thh">      patterns[signature].minTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(patterns[signature].minTime, query.duration);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> patterns;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取查询签名（用于识别相似查询）</span></span>
<span class="line"><span class="__shiki_1t8gfj">  getQuerySignature</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 移除变量值，只保留查询结构</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> signature </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.query</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_21q97f">(?:</span><span class="__shiki_ghujbu">\\&quot;</span><span class="__shiki_21q97f">(?:</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">&quot;</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_dzsirb">]</span><span class="__shiki_1itgoe">|</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_dzsirb">.</span><span class="__shiki_21q97f">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_ghujbu">\\&quot;</span><span class="__shiki_21q97f">)</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">(?:</span><span class="__shiki_ghujbu">\\&#39;</span><span class="__shiki_21q97f">(?:</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">&#39;</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_dzsirb">]</span><span class="__shiki_1itgoe">|</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_dzsirb">.</span><span class="__shiki_21q97f">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_ghujbu">\\&#39;</span><span class="__shiki_21q97f">)</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">g</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&quot;VARIABLE&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">g</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> signature;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 识别N+1查询问题</span></span>
<span class="line"><span class="__shiki_1t8gfj">  detectNPlusOneQueries</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">executionData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> nPlusOnePatterns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> resolverCalls</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> executionData.resolverCalls </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按父级ID分组解析器调用</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> callsByParent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">    resolverCalls.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">call</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> parentKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> call.parentType </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> call.parentId;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">callsByParent[parentKey]) {</span></span>
<span class="line"><span class="__shiki_140thh">        callsByParent[parentKey] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      callsByParent[parentKey].</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(call);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检测重复的解析模式</span></span>
<span class="line"><span class="__shiki_140thh">    Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(callsByParent).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">calls</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (calls.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 阈值可调整</span></span>
<span class="line"><span class="__shiki_140thh">        nPlusOnePatterns.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          pattern: calls[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].fieldName,</span></span>
<span class="line"><span class="__shiki_140thh">          count: calls.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          totalTime: calls.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">call</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> call.duration, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> nPlusOnePatterns;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-dataloader优化监控" tabindex="-1">4.2 DataLoader优化监控 <a class="header-anchor" href="#_4-2-dataloader优化监控" aria-label="Permalink to &quot;4.2 DataLoader优化监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// DataLoader性能监控</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> createMonitoredDataLoader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">batchLoadFn</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">dataLoaderName</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    calls: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    batches: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    cacheHits: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    loadTime: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> batchLoadFnWithMonitoring</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">keys</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    stats.batches</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    stats.calls </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> keys.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> batchLoadFn</span><span class="__shiki_140thh">(keys);</span></span>
<span class="line"><span class="__shiki_140thh">      stats.loadTime </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录指标</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">timing</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`dataloader.\${</span><span class="__shiki_140thh">dataLoaderName</span><span class="__shiki_mdbnqw">}.batch_load_time\`</span><span class="__shiki_140thh">, Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime);</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">histogram</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`dataloader.\${</span><span class="__shiki_140thh">dataLoaderName</span><span class="__shiki_mdbnqw">}.batch_size\`</span><span class="__shiki_140thh">, keys.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`dataloader.\${</span><span class="__shiki_140thh">dataLoaderName</span><span class="__shiki_mdbnqw">}.errors\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> dataLoader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataLoader</span><span class="__shiki_140thh">(batchLoadFnWithMonitoring, {</span></span>
<span class="line"><span class="__shiki_140thh">    cache: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 重写load方法以监控缓存命中</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> originalLoad</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataLoader.load;</span></span>
<span class="line"><span class="__shiki_140thh">  dataLoader.</span><span class="__shiki_1t8gfj">load</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cacheKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (dataLoader._cacheMap </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> dataLoader._cacheMap.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(cacheKey)) {</span></span>
<span class="line"><span class="__shiki_140thh">      stats.cacheHits</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      metrics.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`dataloader.\${</span><span class="__shiki_140thh">dataLoaderName</span><span class="__shiki_mdbnqw">}.cache_hits\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> originalLoad.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, key);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取统计信息的方法</span></span>
<span class="line"><span class="__shiki_140thh">  dataLoader.</span><span class="__shiki_1t8gfj">getStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">stats,</span></span>
<span class="line"><span class="__shiki_140thh">    avgLoadTime: stats.loadTime </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(stats.batches, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    cacheHitRate: stats.cacheHits </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(stats.calls, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> dataLoader;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用监控的DataLoader</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userLoader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createMonitoredDataLoader</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">userIds</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({ _id: { $in: userIds } });</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> userIds.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> user._id.</span><span class="__shiki_1t8gfj">equals</span><span class="__shiki_140thh">(id)) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}, </span><span class="__shiki_mdbnqw">&#39;users&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="五、实时监控与告警" tabindex="-1">五、实时监控与告警 <a class="header-anchor" href="#五、实时监控与告警" aria-label="Permalink to &quot;五、实时监控与告警&quot;">​</a></h2><h3 id="_5-1-健康检查端点" tabindex="-1">5.1 健康检查端点 <a class="header-anchor" href="#_5-1-健康检查端点" aria-label="Permalink to &quot;5.1 健康检查端点&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// GraphQL服务健康检查</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/health&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> health</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_mdbnqw">&#39;healthy&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    uptime: process.</span><span class="__shiki_1t8gfj">uptime</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    checks: {}</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 数据库连接检查</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> database.</span><span class="__shiki_1t8gfj">authenticate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    health.checks.database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { status: </span><span class="__shiki_mdbnqw">&#39;healthy&#39;</span><span class="__shiki_140thh">, responseTime: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() };</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    health.checks.database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { status: </span><span class="__shiki_mdbnqw">&#39;unhealthy&#39;</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">    health.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;unhealthy&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 缓存检查</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> cache.</span><span class="__shiki_1t8gfj">ping</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    health.checks.cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { status: </span><span class="__shiki_mdbnqw">&#39;healthy&#39;</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    health.checks.cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { status: </span><span class="__shiki_mdbnqw">&#39;unhealthy&#39;</span><span class="__shiki_140thh">, error: error.message };</span></span>
<span class="line"><span class="__shiki_140thh">    health.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;unhealthy&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 性能指标检查</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> recentErrors</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getRecentErrorCount</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (recentErrors </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    health.checks.errorRate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { status: </span><span class="__shiki_mdbnqw">&#39;degraded&#39;</span><span class="__shiki_140thh">, recentErrors };</span></span>
<span class="line"><span class="__shiki_140thh">    health.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;degraded&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(health.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;healthy&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">(health);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 详细的性能健康检查</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/health/performance&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> performanceHealth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    queryPerformance: {},</span></span>
<span class="line"><span class="__shiki_140thh">    resolverPerformance: {},</span></span>
<span class="line"><span class="__shiki_140thh">    recommendations: []</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查慢查询</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> slowQueries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getSlowQueries</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 1秒阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (slowQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    performanceHealth.queryPerformance.slowQueries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> slowQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    performanceHealth.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      \`Found \${</span><span class="__shiki_140thh">slowQueries</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} slow queries. Consider optimizing.\`</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查高复杂度查询</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> complexQueries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getHighComplexityQueries</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 复杂度阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (complexQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    performanceHealth.queryPerformance.complexQueries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> complexQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    performanceHealth.recommendations.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      \`Found \${</span><span class="__shiki_140thh">complexQueries</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} high complexity queries. Consider adding query limits.\`</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">(performanceHealth);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_5-2-告警规则配置" tabindex="-1">5.2 告警规则配置 <a class="header-anchor" href="#_5-2-告警规则配置" aria-label="Permalink to &quot;5.2 告警规则配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus告警规则 (alerts.yml)</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">graphql_alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighGraphQLErrorRate</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(graphql_errors_total[5m]) &gt; 0.05</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High GraphQL error rate&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GraphQL error rate is {{ $value }} per second, exceeding 0.05&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SlowGraphQLQueries</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(graphql_query_duration_seconds_bucket[5m])) &gt; 2</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Slow GraphQL queries detected&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;95th percentile query duration is {{ $value }} seconds&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HighResolverLatency</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">histogram_quantile(0.95, rate(graphql_resolver_duration_seconds_bucket[5m])) &gt; 0.5</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High resolver latency detected&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;95th percentile resolver duration is {{ $value }} seconds&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NPlusOneQueryPattern</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rate(graphql_resolver_calls_total[5m]) &gt; 1000</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Possible N+1 query pattern detected&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High rate of resolver calls detected, possible N+1 query pattern&quot;</span></span></code></pre></div><h3 id="_5-3-实时仪表板" tabindex="-1">5.3 实时仪表板 <a class="header-anchor" href="#_5-3-实时仪表板" aria-label="Permalink to &quot;5.3 实时仪表板&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Grafana仪表板配置示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> graphQLDashboard</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  dashboard: {</span></span>
<span class="line"><span class="__shiki_140thh">    title: </span><span class="__shiki_mdbnqw">&quot;GraphQL Performance Dashboard&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    panels: [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_mdbnqw">&quot;Query Response Times&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&quot;graph&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        targets: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_140thh">            expr: </span><span class="__shiki_mdbnqw">&quot;histogram_quantile(0.95, rate(graphql_query_duration_seconds_bucket[5m]))&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            legendFormat: </span><span class="__shiki_mdbnqw">&quot;95th percentile&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_140thh">            expr: </span><span class="__shiki_mdbnqw">&quot;histogram_quantile(0.50, rate(graphql_query_duration_seconds_bucket[5m]))&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            legendFormat: </span><span class="__shiki_mdbnqw">&quot;50th percentile&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_mdbnqw">&quot;Error Rate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&quot;stat&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        targets: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_140thh">            expr: </span><span class="__shiki_mdbnqw">&quot;rate(graphql_errors_total[5m])&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            legendFormat: </span><span class="__shiki_mdbnqw">&quot;Errors per second&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_mdbnqw">&quot;Top Slow Resolvers&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&quot;table&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        targets: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_140thh">            expr: </span><span class="__shiki_mdbnqw">&quot;topk(10, histogram_quantile(0.95, rate(graphql_resolver_duration_seconds_bucket[5m])) by (type, field))&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            format: </span><span class="__shiki_mdbnqw">&quot;table&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_mdbnqw">&quot;Query Complexity Distribution&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&quot;heatmap&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        targets: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_140thh">            expr: </span><span class="__shiki_mdbnqw">&quot;rate(graphql_query_complexity_bucket[5m])&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            format: </span><span class="__shiki_mdbnqw">&quot;heatmap&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="六、生产环境最佳实践" tabindex="-1">六、生产环境最佳实践 <a class="header-anchor" href="#六、生产环境最佳实践" aria-label="Permalink to &quot;六、生产环境最佳实践&quot;">​</a></h2><h3 id="_6-1-监控策略" tabindex="-1">6.1 监控策略 <a class="header-anchor" href="#_6-1-监控策略" aria-label="Permalink to &quot;6.1 监控策略&quot;">​</a></h3><p><strong>分层监控方法</strong>：</p><ol><li><strong>基础设施层</strong>：CPU、内存、网络</li><li><strong>应用层</strong>：查询性能、错误率、解析器性能</li><li><strong>业务层</strong>：用户操作成功率、关键业务流程</li></ol><p><strong>监控数据保留策略</strong>：</p><ul><li>实时数据：保留7天（高精度）</li><li>聚合数据：保留30天（中等精度）</li><li>长期趋势：保留1年（低精度）</li></ul><h3 id="_6-2-性能基准测试" tabindex="-1">6.2 性能基准测试 <a class="header-anchor" href="#_6-2-性能基准测试" aria-label="Permalink to &quot;6.2 性能基准测试&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// GraphQL性能基准测试</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> GraphQLBenchmark</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">schema</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.schema </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> schema;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> runBenchmark</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queries</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">iterations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> queries) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> executionTimes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> iterations; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.hrtime.</span><span class="__shiki_1t8gfj">bigint</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_1t8gfj"> graphql</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.schema,</span></span>
<span class="line"><span class="__shiki_140thh">          query.query,</span></span>
<span class="line"><span class="__shiki_dzsirb">          null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          { </span><span class="__shiki_21nrsd">/* context */</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          query.variables</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> executionTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> Number</span><span class="__shiki_140thh">(process.hrtime.</span><span class="__shiki_1t8gfj">bigint</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        executionTimes.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(executionTime);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      executionTimes.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> b);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        query: query.name,</span></span>
<span class="line"><span class="__shiki_140thh">        p50: executionTimes[Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(iterations </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">)],</span></span>
<span class="line"><span class="__shiki_140thh">        p95: executionTimes[Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(iterations </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.95</span><span class="__shiki_140thh">)],</span></span>
<span class="line"><span class="__shiki_140thh">        p99: executionTimes[Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(iterations </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.99</span><span class="__shiki_140thh">)],</span></span>
<span class="line"><span class="__shiki_140thh">        avg: executionTimes.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> b, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> iterations,</span></span>
<span class="line"><span class="__shiki_140thh">        max: executionTimes[iterations </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        min: executionTimes[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用基准测试</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> benchmark</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> GraphQLBenchmark</span><span class="__shiki_140thh">(schema);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> testQueries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_mdbnqw">&quot;Get user with posts&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      query GetUserWithPosts($userId: ID!) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        user(id: $userId) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          id</span></span>
<span class="line"><span class="__shiki_mdbnqw">          name</span></span>
<span class="line"><span class="__shiki_mdbnqw">          email</span></span>
<span class="line"><span class="__shiki_mdbnqw">          posts {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            id</span></span>
<span class="line"><span class="__shiki_mdbnqw">            title</span></span>
<span class="line"><span class="__shiki_mdbnqw">            content</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    variables: { userId: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> benchmark.</span><span class="__shiki_1t8gfj">runBenchmark</span><span class="__shiki_140thh">(testQueries, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Benchmark results:&#39;</span><span class="__shiki_140thh">, results);</span></span></code></pre></div><h3 id="_6-3-容量规划与扩展" tabindex="-1">6.3 容量规划与扩展 <a class="header-anchor" href="#_6-3-容量规划与扩展" aria-label="Permalink to &quot;6.3 容量规划与扩展&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 容量规划监控</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CapacityPlanner</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 预测资源需求</span></span>
<span class="line"><span class="__shiki_1t8gfj">  predictResourceRequirements</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">currentLoad</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">growthRate</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeFrameMonths</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> predictions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      queriesPerSecond: currentLoad.qps </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> growthRate, timeFrameMonths),</span></span>
<span class="line"><span class="__shiki_140thh">      requiredInstances: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      estimatedCost: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于当前性能数据计算所需实例数</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> queriesPerInstance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 根据实际性能调整</span></span>
<span class="line"><span class="__shiki_140thh">    predictions.requiredInstances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">ceil</span><span class="__shiki_140thh">(predictions.queriesPerSecond </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> queriesPerInstance);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 估算成本（根据云服务商定价）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> instanceCostPerMonth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 美元</span></span>
<span class="line"><span class="__shiki_140thh">    predictions.estimatedCost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> predictions.requiredInstances </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> instanceCostPerMonth;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> predictions;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 识别扩展瓶颈</span></span>
<span class="line"><span class="__shiki_1t8gfj">  identifyScalingBottlenecks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">performanceData</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bottlenecks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (performanceData.database.queryTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 100ms阈值</span></span>
<span class="line"><span class="__shiki_140thh">      bottlenecks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        component: </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        issue: </span><span class="__shiki_mdbnqw">&#39;High query latency&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        recommendation: </span><span class="__shiki_mdbnqw">&#39;Consider database indexing or query optimization&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (performanceData.memory.usage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 80%内存使用率</span></span>
<span class="line"><span class="__shiki_140thh">      bottlenecks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        component: </span><span class="__shiki_mdbnqw">&#39;memory&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        issue: </span><span class="__shiki_mdbnqw">&#39;High memory usage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        recommendation: </span><span class="__shiki_mdbnqw">&#39;Consider increasing memory or optimizing memory usage&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bottlenecks;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>GraphQL性能监控是一个多层次、持续的过程。有效的监控策略应该包括：</p><p><strong>核心要点</strong>：</p><ol><li><strong>分层监控</strong>：从基础设施到业务逻辑的全面监控</li><li><strong>实时告警</strong>：基于关键指标的自动化告警</li><li><strong>性能分析</strong>：深度查询分析和瓶颈识别</li><li><strong>容量规划</strong>：基于数据的资源预测和扩展规划</li></ol><p><strong>工具推荐</strong>：</p><ul><li><strong>APM工具</strong>：Apollo Studio、DataDog、New Relic</li><li><strong>监控栈</strong>：Prometheus + Grafana</li><li><strong>日志分析</strong>：ELK Stack、Splunk</li><li><strong>追踪工具</strong>：Jaeger、Zipkin</li></ul><p>通过实施全面的GraphQL性能监控，你可以确保API的可靠性、性能可预测性，并为持续优化提供数据支持。</p>`,52)])])}const g=a(p,[["render",h]]);export{o as __pageData,g as default};
