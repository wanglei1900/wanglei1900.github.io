import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"GraphQL 安全实践学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/api/graphql/security.md","filePath":"backend/api/graphql/security.md"}'),p={name:"backend/api/graphql/security.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="graphql-安全实践学习笔记" tabindex="-1">GraphQL 安全实践学习笔记 <a class="header-anchor" href="#graphql-安全实践学习笔记" aria-label="Permalink to &quot;GraphQL 安全实践学习笔记&quot;">​</a></h1><h2 id="_1-graphql-安全概述" tabindex="-1">1. GraphQL 安全概述 <a class="header-anchor" href="#_1-graphql-安全概述" aria-label="Permalink to &quot;1. GraphQL 安全概述&quot;">​</a></h2><h3 id="_1-1-graphql-特有的安全挑战" tabindex="-1">1.1 GraphQL 特有的安全挑战 <a class="header-anchor" href="#_1-1-graphql-特有的安全挑战" aria-label="Permalink to &quot;1.1 GraphQL 特有的安全挑战&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 常见安全问题</span></span>
<span class="line"><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 过度查询（Over</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">fetching）</span></span>
<span class="line"><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 嵌套查询攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 类型系统泄露</span></span>
<span class="line"><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 批量操作风险</span></span>
<span class="line"><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> 内省查询信息泄露</span></span></code></pre></div><h3 id="_1-2-安全防护层次" tabindex="-1">1.2 安全防护层次 <a class="header-anchor" href="#_1-2-安全防护层次" aria-label="Permalink to &quot;1.2 安全防护层次&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│   应用层防护    │ ← 认证、授权、业务逻辑</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   GraphQL层防护  │ ← 查询验证、复杂度限制</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   传输层防护    │ ← HTTPS、CORS</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   基础设施防护   │ ← 防火墙、速率限制</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────┘</span></span></code></pre></div><h2 id="_2-查询层面安全" tabindex="-1">2. 查询层面安全 <a class="header-anchor" href="#_2-查询层面安全" aria-label="Permalink to &quot;2. 查询层面安全&quot;">​</a></h2><h3 id="_2-1-查询深度限制" tabindex="-1">2.1 查询深度限制 <a class="header-anchor" href="#_2-1-查询深度限制" aria-label="Permalink to &quot;2.1 查询深度限制&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 graphql-depth-limit</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> depthLimit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql-depth-limit&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_140thh">  validationRules: [</span><span class="__shiki_1t8gfj">depthLimit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)] </span><span class="__shiki_21nrsd">// 最大深度10层</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 恶意深度查询示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> maliciousQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">query {</span></span>
<span class="line"><span class="__shiki_mdbnqw">  user {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    posts {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      comments {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        user {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          posts {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            comments { # 深度嵌套</span></span>
<span class="line"><span class="__shiki_mdbnqw">              user {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                # ... 继续嵌套</span></span>
<span class="line"><span class="__shiki_mdbnqw">              }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_2-2-查询复杂度限制" tabindex="-1">2.2 查询复杂度限制 <a class="header-anchor" href="#_2-2-查询复杂度限制" aria-label="Permalink to &quot;2.2 查询复杂度限制&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 graphql-query-complexity</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">createComplexityLimitRule</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql-validation-complexity&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> complexityRule</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createComplexityLimitRule</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  onCost</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">cost</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Query cost:&#39;</span><span class="__shiki_140thh">, cost),</span></span>
<span class="line"><span class="__shiki_140thh">  estimators: [</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 字段复杂度估算器</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> args.field.complexity </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在模式中定义复杂度</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> typeDefs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> gql</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  type User {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    id: ID!</span></span>
<span class="line"><span class="__shiki_mdbnqw">    name: String!</span></span>
<span class="line"><span class="__shiki_mdbnqw">    email: String @complexity(value: 5) # 高复杂度字段</span></span>
<span class="line"><span class="__shiki_mdbnqw">    posts: [Post!]! @complexity(value: 10, multipliers: [&quot;first&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  type Query {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    users(first: Int): [User!]! @complexity(value: 1, multipliers: [&quot;first&quot;])</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_2-3-查询代价分析" tabindex="-1">2.3 查询代价分析 <a class="header-anchor" href="#_2-3-查询代价分析" aria-label="Permalink to &quot;2.3 查询代价分析&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义查询代价计算</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryCostAnalyzer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateCost</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">schema</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cost</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      depth: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      breadth: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      complexity: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      estimatedTime: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分析查询结构</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeQuery</span><span class="__shiki_140thh">(query, schema, variables, cost);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> cost;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">schema</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cost</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">currentDepth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    cost.depth </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(cost.depth, currentDepth);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (node.selectionSet) {</span></span>
<span class="line"><span class="__shiki_140thh">      node.selectionSet.selections.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">selection</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        cost.breadth</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        cost.complexity </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getFieldComplexity</span><span class="__shiki_140thh">(selection);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeQuery</span><span class="__shiki_140thh">(selection, schema, variables, cost, currentDepth </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-认证与授权" tabindex="-1">3. 认证与授权 <a class="header-anchor" href="#_3-认证与授权" aria-label="Permalink to &quot;3. 认证与授权&quot;">​</a></h2><h3 id="_3-1-jwt-认证集成" tabindex="-1">3.1 JWT 认证集成 <a class="header-anchor" href="#_3-1-jwt-认证集成" aria-label="Permalink to &quot;3.1 JWT 认证集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 认证中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> authMiddleware</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> ({ </span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> req.headers.authorization </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (token) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> verifyToken</span><span class="__shiki_140thh">(token.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Bearer &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> { user };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AuthenticationError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid token&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Apollo Server 配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_140thh">  context: authMiddleware</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_3-2-基于角色的访问控制-rbac" tabindex="-1">3.2 基于角色的访问控制 (RBAC) <a class="header-anchor" href="#_3-2-基于角色的访问控制-rbac" aria-label="Permalink to &quot;3.2 基于角色的访问控制 (RBAC)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 权限枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> Roles</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  ADMIN: </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  MODERATOR: </span><span class="__shiki_mdbnqw">&#39;moderator&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  USER: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  GUEST: </span><span class="__shiki_mdbnqw">&#39;guest&#39;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 权限装饰器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> requireAuth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">root</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">context.user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AuthenticationError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Authentication required&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1t8gfj"> next</span><span class="__shiki_140thh">(root, args, context, info);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> requireRole</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">root</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">context.user </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> context.user.role </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> role) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ForbiddenError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient permissions&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1t8gfj"> next</span><span class="__shiki_140thh">(root, args, context, info);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Resolver 中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Query: {</span></span>
<span class="line"><span class="__shiki_140thh">    users: </span><span class="__shiki_1t8gfj">requireRole</span><span class="__shiki_140thh">(Roles.</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">)(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    myProfile: </span><span class="__shiki_1t8gfj">requireAuth</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> User.</span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(context.user.id);</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-3-字段级别授权" tabindex="-1">3.3 字段级别授权 <a class="header-anchor" href="#_3-3-字段级别授权" aria-label="Permalink to &quot;3.3 字段级别授权&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 graphql-shield</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">shield</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rule</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">allow</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">deny</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql-shield&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isAuthenticated</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> rule</span><span class="__shiki_140thh">()(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> context.user </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isAdmin</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> rule</span><span class="__shiki_140thh">()(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> context.user?.role </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> Roles.</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isOwner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> rule</span><span class="__shiki_140thh">()(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> context.user </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> parent.userId </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> context.user.id;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 权限规则</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> permissions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> shield</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  Query: {</span></span>
<span class="line"><span class="__shiki_140thh">    users: isAdmin,</span></span>
<span class="line"><span class="__shiki_140thh">    myProfile: isAuthenticated</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  Mutation: {</span></span>
<span class="line"><span class="__shiki_140thh">    createUser: isAdmin,</span></span>
<span class="line"><span class="__shiki_140thh">    updateUser: </span><span class="__shiki_1t8gfj">or</span><span class="__shiki_140thh">(isAdmin, isOwner)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  User: {</span></span>
<span class="line"><span class="__shiki_140thh">    email: isAuthenticated,</span></span>
<span class="line"><span class="__shiki_140thh">    sensitiveData: isAdmin</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}, {</span></span>
<span class="line"><span class="__shiki_140thh">  fallbackRule: allow,</span></span>
<span class="line"><span class="__shiki_140thh">  allowExternalErrors: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="_4-输入验证与清理" tabindex="-1">4. 输入验证与清理 <a class="header-anchor" href="#_4-输入验证与清理" aria-label="Permalink to &quot;4. 输入验证与清理&quot;">​</a></h2><h3 id="_4-1-输入类型验证" tabindex="-1">4.1 输入类型验证 <a class="header-anchor" href="#_4-1-输入类型验证" aria-label="Permalink to &quot;4.1 输入类型验证&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用自定义标量进行验证</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">GraphQLScalarType</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">Kind</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql/language&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> EmailType</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> GraphQLScalarType</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;Email&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  description: </span><span class="__shiki_mdbnqw">&#39;Email custom scalar type&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  serialize</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证邮箱格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">\\s@]</span><span class="__shiki_1itgoe">+</span><span class="__shiki_21q97f">@</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">\\s@]</span><span class="__shiki_1itgoe">+</span><span class="__shiki_ghujbu">\\.</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">\\s@]</span><span class="__shiki_1itgoe">+$</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">test</span><span class="__shiki_140thh">(value)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid email format&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  parseValue</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">serialize</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  parseLiteral</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ast</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (ast.kind </span><span class="__shiki_1itgoe">===</span><span class="__shiki_140thh"> Kind.</span><span class="__shiki_dzsirb">STRING</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">serialize</span><span class="__shiki_140thh">(ast.value);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Email must be a string&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在模式中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> typeDefs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> gql</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  scalar Email</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  input CreateUserInput {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    name: String!</span></span>
<span class="line"><span class="__shiki_mdbnqw">    email: Email!</span></span>
<span class="line"><span class="__shiki_mdbnqw">    password: String!</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_4-2-sql-注入防护" tabindex="-1">4.2 SQL 注入防护 <a class="header-anchor" href="#_4-2-sql-注入防护" aria-label="Permalink to &quot;4.2 SQL 注入防护&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用参数化查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Query: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    users</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">search</span><span class="__shiki_140thh"> }, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 错误方式 - SQL 注入风险</span></span>
<span class="line"><span class="__shiki_21nrsd">      // const query = \`SELECT * FROM users WHERE name LIKE &#39;%\${search}%&#39;\`;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 正确方式 - 参数化查询</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;SELECT * FROM users WHERE name LIKE ?&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> db.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(query, [</span><span class="__shiki_mdbnqw">\`%\${</span><span class="__shiki_140thh">search</span><span class="__shiki_mdbnqw">}%\`</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> users;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// NoSQL 注入防护</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> sanitizeInput</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> input </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;string&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 移除危险字符</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> input.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">[$\\-</span><span class="__shiki_ghujbu">\\\\</span><span class="__shiki_dzsirb">]</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">g</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> input </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;object&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(input).</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">acc</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      acc[</span><span class="__shiki_1t8gfj">sanitizeInput</span><span class="__shiki_140thh">(key)] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> sanitizeInput</span><span class="__shiki_140thh">(input[key]);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> acc;</span></span>
<span class="line"><span class="__shiki_140thh">    }, {});</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> input;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_4-3-xss-防护" tabindex="-1">4.3 XSS 防护 <a class="header-anchor" href="#_4-3-xss-防护" aria-label="Permalink to &quot;4.3 XSS 防护&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 输出转义</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> xss</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;xss&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> xssOptions</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  whiteList: {}, </span><span class="__shiki_21nrsd">// 空白名单，清除所有标签</span></span>
<span class="line"><span class="__shiki_140thh">  stripIgnoreTag: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  stripIgnoreTagBody: [</span><span class="__shiki_mdbnqw">&#39;script&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> sanitizeHTML</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">html</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1t8gfj"> xss</span><span class="__shiki_140thh">(html, xssOptions);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Resolver 中清理输出</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Post: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    content</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">post</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> sanitizeHTML</span><span class="__shiki_140thh">(post.content),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    title</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">post</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> sanitizeHTML</span><span class="__shiki_140thh">(post.title)</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  Mutation: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createPost</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh"> }, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> sanitizedInput</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_140thh">input,</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_1t8gfj">sanitizeHTML</span><span class="__shiki_140thh">(input.title),</span></span>
<span class="line"><span class="__shiki_140thh">        content: </span><span class="__shiki_1t8gfj">sanitizeHTML</span><span class="__shiki_140thh">(input.content)</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> Post.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">(sanitizedInput);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_5-内省查询管理" tabindex="-1">5. 内省查询管理 <a class="header-anchor" href="#_5-内省查询管理" aria-label="Permalink to &quot;5. 内省查询管理&quot;">​</a></h2><h3 id="_5-1-生产环境禁用内省" tabindex="-1">5.1 生产环境禁用内省 <a class="header-anchor" href="#_5-1-生产环境禁用内省" aria-label="Permalink to &quot;5.1 生产环境禁用内省&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Apollo Server 配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_140thh">  introspection: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> !==</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  playground: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> !==</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 手动拦截内省查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> blockIntrospection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">query</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> req.body;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (query </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;__schema&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ForbiddenError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Introspection is disabled in production&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/graphql&#39;</span><span class="__shiki_140thh">, blockIntrospection);</span></span></code></pre></div><h3 id="_5-2-选择性内省" tabindex="-1">5.2 选择性内省 <a class="header-anchor" href="#_5-2-选择性内省" aria-label="Permalink to &quot;5.2 选择性内省&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义内省逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SelectiveIntrospection</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">allowedTypes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> []) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.allowedTypes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> allowedTypes;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  filterSchema</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">schema</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 过滤敏感类型和字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> filteredSchema</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">removeSensitiveTypes</span><span class="__shiki_140thh">(schema);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> filteredSchema;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  removeSensitiveTypes</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">schema</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 实现类型过滤逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> schema;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-速率限制" tabindex="-1">6. 速率限制 <a class="header-anchor" href="#_6-速率限制" aria-label="Permalink to &quot;6. 速率限制&quot;">​</a></h2><h3 id="_6-1-基于-ip-的速率限制" tabindex="-1">6.1 基于 IP 的速率限制 <a class="header-anchor" href="#_6-1-基于-ip-的速率限制" aria-label="Permalink to &quot;6.1 基于 IP 的速率限制&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> rateLimit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;express-rate-limit&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> graphqlLimiter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> rateLimit</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  windowMs: </span><span class="__shiki_dzsirb">15</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 15分钟</span></span>
<span class="line"><span class="__shiki_140thh">  max: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 最多100次请求</span></span>
<span class="line"><span class="__shiki_140thh">  message: </span><span class="__shiki_mdbnqw">&#39;Too many requests from this IP, please try again later.&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  keyGenerator</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> req.ip,</span></span>
<span class="line"><span class="__shiki_140thh">  skipSuccessfulRequests: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/graphql&#39;</span><span class="__shiki_140thh">, graphqlLimiter);</span></span></code></pre></div><h3 id="_6-2-基于用户的速率限制" tabindex="-1">6.2 基于用户的速率限制 <a class="header-anchor" href="#_6-2-基于用户的速率限制" aria-label="Permalink to &quot;6.2 基于用户的速率限制&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserRateLimiter</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.userLimits </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  checkLimit</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">cost</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> windowSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 1分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> maxCost</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 最大成本</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.userLimits.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(userId)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.userLimits.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(userId, { cost: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, resetTime: now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> windowSize });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> userLimit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.userLimits.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否需要重置</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (now </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> userLimit.resetTime) {</span></span>
<span class="line"><span class="__shiki_140thh">      userLimit.cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      userLimit.resetTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> windowSize;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查是否超过限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (userLimit.cost </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> cost </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> maxCost) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Rate limit exceeded&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    userLimit.cost </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> cost;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在解析器中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> rateLimiter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserRateLimiter</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Query: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expensiveQuery</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">rateLimiter.</span><span class="__shiki_1t8gfj">checkLimit</span><span class="__shiki_140thh">(context.user.id, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Rate limit exceeded for expensive query&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 执行昂贵查询</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> expensiveOperation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_7-查询白名单与持久化查询" tabindex="-1">7. 查询白名单与持久化查询 <a class="header-anchor" href="#_7-查询白名单与持久化查询" aria-label="Permalink to &quot;7. 查询白名单与持久化查询&quot;">​</a></h2><h3 id="_7-1-查询白名单" tabindex="-1">7.1 查询白名单 <a class="header-anchor" href="#_7-1-查询白名单" aria-label="Permalink to &quot;7.1 查询白名单&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryWhitelist</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.allowedQueries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  addQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateHash</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.allowedQueries.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(hash, { name, query, variables });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  isAllowed</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateHash</span><span class="__shiki_140thh">(query);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.allowedQueries.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(hash);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateHash</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;crypto&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">createHash</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;md5&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(query)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">digest</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;hex&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用白名单</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> whitelist</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> QueryWhitelist</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">whitelist.</span><span class="__shiki_1t8gfj">addQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;GetUserProfile&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  query GetUserProfile($id: ID!) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    user(id: $id) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      id</span></span>
<span class="line"><span class="__shiki_mdbnqw">      name</span></span>
<span class="line"><span class="__shiki_mdbnqw">      email</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  }</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> validationRules</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">  (</span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_1t8gfj">    OperationDefinition</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">node</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">getSource</span><span class="__shiki_140thh">().body;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">whitelist.</span><span class="__shiki_1t8gfj">isAllowed</span><span class="__shiki_140thh">(query)) {</span></span>
<span class="line"><span class="__shiki_140thh">        context.</span><span class="__shiki_1t8gfj">reportError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> GraphQLError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Query not in whitelist&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">];</span></span></code></pre></div><h3 id="_7-2-apollo-持久化查询" tabindex="-1">7.2 Apollo 持久化查询 <a class="header-anchor" href="#_7-2-apollo-持久化查询" aria-label="Permalink to &quot;7.2 Apollo 持久化查询&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 服务端配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">PersistentQueryLoader</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server-core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> queryLoader</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> PersistentQueryLoader</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从数据库或缓存中获取持久化查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> QueryStore.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> setQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储持久化查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> QueryStore.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(key, query);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [queryLoader]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="_8-错误处理与信息泄露防护" tabindex="-1">8. 错误处理与信息泄露防护 <a class="header-anchor" href="#_8-错误处理与信息泄露防护" aria-label="Permalink to &quot;8. 错误处理与信息泄露防护&quot;">​</a></h2><h3 id="_8-1-安全错误处理" tabindex="-1">8.1 安全错误处理 <a class="header-anchor" href="#_8-1-安全错误处理" aria-label="Permalink to &quot;8.1 安全错误处理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 统一错误格式化</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> formatError</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">message</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">path</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">extensions</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录完整错误（服务端）</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;GraphQL Error:&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    message,</span></span>
<span class="line"><span class="__shiki_140thh">    path,</span></span>
<span class="line"><span class="__shiki_140thh">    code: extensions?.code,</span></span>
<span class="line"><span class="__shiki_140thh">    stack: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;development&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> error.stack </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> undefined</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 返回给客户端的错误</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    message: </span><span class="__shiki_1t8gfj">getClientFriendlyMessage</span><span class="__shiki_140thh">(error),</span></span>
<span class="line"><span class="__shiki_140thh">    code: extensions?.code,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生产环境不返回路径和堆栈</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">(process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;development&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> { path, stack: error.stack })</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> getClientFriendlyMessage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">message</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">extensions</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  switch</span><span class="__shiki_140thh"> (extensions?.code) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_mdbnqw"> &#39;UNAUTHENTICATED&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> &#39;Authentication required&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_mdbnqw"> &#39;FORBIDDEN&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> &#39;Access denied&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_mdbnqw"> &#39;INTERNAL_SERVER_ERROR&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> &#39;An internal error occurred&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> message;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Apollo Server 配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_140thh">  formatError,</span></span>
<span class="line"><span class="__shiki_140thh">  debug: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;development&#39;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_8-2-查询日志与审计" tabindex="-1">8.2 查询日志与审计 <a class="header-anchor" href="#_8-2-查询日志与审计" aria-label="Permalink to &quot;8.2 查询日志与审计&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryAuditor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.logs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  logQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">variables</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">errors</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> []) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> logEntry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      userId: context.user?.id,</span></span>
<span class="line"><span class="__shiki_140thh">      ip: context.req?.ip,</span></span>
<span class="line"><span class="__shiki_140thh">      userAgent: context.req?.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User-Agent&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      query: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sanitizeQuery</span><span class="__shiki_140thh">(query),</span></span>
<span class="line"><span class="__shiki_140thh">      variables: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sanitizeVariables</span><span class="__shiki_140thh">(variables),</span></span>
<span class="line"><span class="__shiki_140thh">      errors: errors.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sanitizeError</span><span class="__shiki_140thh">(err)),</span></span>
<span class="line"><span class="__shiki_140thh">      performance: context.performance</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.logs.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">analyzeForThreats</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  sanitizeQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 移除敏感信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_21q97f">(password</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">token</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">secret)=</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">&amp;]</span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">g</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;$1=***&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeForThreats</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">logEntry</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 威胁检测逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> threats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">detectThreats</span><span class="__shiki_140thh">(logEntry);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (threats.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">alertSecurityTeam</span><span class="__shiki_140thh">(threats, logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-文件上传安全" tabindex="-1">9. 文件上传安全 <a class="header-anchor" href="#_9-文件上传安全" aria-label="Permalink to &quot;9. 文件上传安全&quot;">​</a></h2><h3 id="_9-1-安全文件上传" tabindex="-1">9.1 安全文件上传 <a class="header-anchor" href="#_9-1-安全文件上传" aria-label="Permalink to &quot;9.1 安全文件上传&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> graphqlUpload</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql-upload&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 文件上传配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> uploadConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  maxFileSize: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 10MB</span></span>
<span class="line"><span class="__shiki_140thh">  maxFiles: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  allowedMimeTypes: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;image/jpeg&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;image/png&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;application/pdf&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> validateFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">file</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">filename</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">mimetype</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">encoding</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">createReadStream</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> file;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查文件类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">uploadConfig.allowedMimeTypes.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(mimetype)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`File type \${</span><span class="__shiki_140thh">mimetype</span><span class="__shiki_mdbnqw">} not allowed\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 检查文件大小</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> stream</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createReadStream</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> chunk</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> stream) {</span></span>
<span class="line"><span class="__shiki_140thh">    size </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> chunk.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> uploadConfig.maxFileSize) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;File too large&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { filename, mimetype, encoding, size };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Mutation: {</span></span>
<span class="line"><span class="__shiki_140thh">    uploadFile: </span><span class="__shiki_1t8gfj">requireAuth</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">file</span><span class="__shiki_140thh"> }, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> validatedFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> validateFile</span><span class="__shiki_140thh">(file);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 安全存储文件</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> filePath</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">storeFileSafely</span><span class="__shiki_140thh">(validatedFile);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        url: filePath,</span></span>
<span class="line"><span class="__shiki_140thh">        filename: validatedFile.filename,</span></span>
<span class="line"><span class="__shiki_140thh">        size: validatedFile.size</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_10-安全头与-cors-配置" tabindex="-1">10. 安全头与 CORS 配置 <a class="header-anchor" href="#_10-安全头与-cors-配置" aria-label="Permalink to &quot;10. 安全头与 CORS 配置&quot;">​</a></h2><h3 id="_10-1-安全头设置" tabindex="-1">10.1 安全头设置 <a class="header-anchor" href="#_10-1-安全头设置" aria-label="Permalink to &quot;10.1 安全头设置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> helmet</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;helmet&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">helmet</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  contentSecurityPolicy: {</span></span>
<span class="line"><span class="__shiki_140thh">    directives: {</span></span>
<span class="line"><span class="__shiki_140thh">      defaultSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      scriptSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&#39;unsafe-inline&#39;&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      styleSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&#39;unsafe-inline&#39;&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      imgSrc: [</span><span class="__shiki_mdbnqw">&quot;&#39;self&#39;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;data:&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;https:&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  hsts: {</span></span>
<span class="line"><span class="__shiki_140thh">    maxAge: </span><span class="__shiki_dzsirb">31536000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    includeSubDomains: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    preload: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// CORS 配置</span></span>
<span class="line"><span class="__shiki_140thh">app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/graphql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">cors</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  origin: process.env.</span><span class="__shiki_dzsirb">ALLOWED_ORIGINS</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">  credentials: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  methods: [</span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;OPTIONS&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  allowedHeaders: [</span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Authorization&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;X-Requested-With&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}));</span></span></code></pre></div><h2 id="_11-依赖安全与漏洞扫描" tabindex="-1">11. 依赖安全与漏洞扫描 <a class="header-anchor" href="#_11-依赖安全与漏洞扫描" aria-label="Permalink to &quot;11. 依赖安全与漏洞扫描&quot;">​</a></h2><h3 id="_11-1-安全依赖管理" tabindex="-1">11.1 安全依赖管理 <a class="header-anchor" href="#_11-1-安全依赖管理" aria-label="Permalink to &quot;11.1 安全依赖管理&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;scripts&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;security:audit&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;npm audit --audit-level moderate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;security:fix&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;npm audit fix&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;security:scan&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;npx snyk test &amp;&amp; npx snyk monitor&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_11-2-安全配置检查清单" tabindex="-1">11.2 安全配置检查清单 <a class="header-anchor" href="#_11-2-安全配置检查清单" aria-label="Permalink to &quot;11.2 安全配置检查清单&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SecurityChecklist</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> validateConfig</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> checks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;Introspection disabled in production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        check: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">config.introspection </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;Playground disabled in production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        check: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">config.playground </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;Debug mode disabled in production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        check: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">config.debug </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name: </span><span class="__shiki_mdbnqw">&#39;Query depth limiting enabled&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        check: config.validationRules </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> config.validationRules.</span><span class="__shiki_1t8gfj">some</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">rule</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> rule.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;depthLimit&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> failures</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> checks.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">check</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">check.check);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (failures.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Security configuration issues:&#39;</span><span class="__shiki_140thh">, failures);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> failures.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>这份学习笔记涵盖了 GraphQL API 开发中的关键安全实践，包括查询安全、认证授权、输入验证、速率限制、错误处理等多个方面。通过实施这些安全措施，可以显著提高 GraphQL API 的安全性。</p>`,59)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
