import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"GraphQL 错误处理完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/api/graphql/error-handling.md","filePath":"backend/api/graphql/error-handling.md"}'),p={name:"backend/api/graphql/error-handling.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="graphql-错误处理完整学习笔记" tabindex="-1">GraphQL 错误处理完整学习笔记 <a class="header-anchor" href="#graphql-错误处理完整学习笔记" aria-label="Permalink to &quot;GraphQL 错误处理完整学习笔记&quot;">​</a></h1><h2 id="_1-graphql-错误处理基础" tabindex="-1">1. GraphQL 错误处理基础 <a class="header-anchor" href="#_1-graphql-错误处理基础" aria-label="Permalink to &quot;1. GraphQL 错误处理基础&quot;">​</a></h2><h3 id="_1-1-graphql-错误响应格式" tabindex="-1">1.1 GraphQL 错误响应格式 <a class="header-anchor" href="#_1-1-graphql-错误响应格式" aria-label="Permalink to &quot;1.1 GraphQL 错误响应格式&quot;">​</a></h3><h4 id="标准错误响应结构" tabindex="-1">标准错误响应结构 <a class="header-anchor" href="#标准错误响应结构" aria-label="Permalink to &quot;标准错误响应结构&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;data&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;user&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">null</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;errors&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;message&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;User not found&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;path&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;locations&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;line&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;column&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ],</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;extensions&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;code&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NOT_FOUND&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;timestamp&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-10-05T10:00:00Z&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-2-错误分类" tabindex="-1">1.2 错误分类 <a class="header-anchor" href="#_1-2-错误分类" aria-label="Permalink to &quot;1.2 错误分类&quot;">​</a></h3><h4 id="graphql-错误类型" tabindex="-1">GraphQL 错误类型 <a class="header-anchor" href="#graphql-错误类型" aria-label="Permalink to &quot;GraphQL 错误类型&quot;">​</a></h4><ul><li><strong>语法错误</strong> (Syntax Error)</li><li><strong>验证错误</strong> (Validation Error)</li><li><strong>执行错误</strong> (Execution Error)</li><li><strong>解析器错误</strong> (Resolver Error)</li><li><strong>业务逻辑错误</strong> (Business Logic Error)</li></ul><h2 id="_2-基础错误处理" tabindex="-1">2. 基础错误处理 <a class="header-anchor" href="#_2-基础错误处理" aria-label="Permalink to &quot;2. 基础错误处理&quot;">​</a></h2><h3 id="_2-1-抛出基础错误" tabindex="-1">2.1 抛出基础错误 <a class="header-anchor" href="#_2-1-抛出基础错误" aria-label="Permalink to &quot;2.1 抛出基础错误&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Query: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    user</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh"> }, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> findUserById</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`User with ID \${</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">} not found\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_2-2-使用-graphql-错误类" tabindex="-1">2.2 使用 GraphQL 错误类 <a class="header-anchor" href="#_2-2-使用-graphql-错误类" aria-label="Permalink to &quot;2.2 使用 GraphQL 错误类&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">GraphQLError</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graphql&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuthenticationError</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> GraphQLError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">(message, {</span></span>
<span class="line"><span class="__shiki_140thh">      extensions: {</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;UNAUTHENTICATED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        http: { status: </span><span class="__shiki_dzsirb">401</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ValidationError</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> GraphQLError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">field</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">(message, {</span></span>
<span class="line"><span class="__shiki_140thh">      extensions: {</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;VALIDATION_ERROR&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        field,</span></span>
<span class="line"><span class="__shiki_140thh">        http: { status: </span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-apollo-server-错误处理" tabindex="-1">3. Apollo Server 错误处理 <a class="header-anchor" href="#_3-apollo-server-错误处理" aria-label="Permalink to &quot;3. Apollo Server 错误处理&quot;">​</a></h2><h3 id="_3-1-apollo-错误类" tabindex="-1">3.1 Apollo 错误类 <a class="header-anchor" href="#_3-1-apollo-错误类" aria-label="Permalink to &quot;3.1 Apollo 错误类&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">ApolloError</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">UserInputError</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">AuthenticationError</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">ForbiddenError</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Mutation: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createPost</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh"> }, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 认证错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">context.user) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AuthenticationError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Authentication required&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 权限错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">context.user.isAdmin) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ForbiddenError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient permissions&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 输入验证错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">input.title </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> input.title.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserInputError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Invalid input&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">          invalidArgs: [</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">          details: </span><span class="__shiki_mdbnqw">&#39;Title must be at least 3 characters long&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 自定义业务错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">isDuplicatePost</span><span class="__shiki_140thh">(input.title)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Post with this title already exists&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DUPLICATE_POST&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1t8gfj"> createPost</span><span class="__shiki_140thh">(input);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-2-格式化错误响应" tabindex="-1">3.2 格式化错误响应 <a class="header-anchor" href="#_3-2-格式化错误响应" aria-label="Permalink to &quot;3.2 格式化错误响应&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">ApolloServer</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">formatError</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-errors&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> CustomError</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./CustomError&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">  resolvers,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  formatError</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录错误日志</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;GraphQL Error:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生产环境隐藏内部错误详情</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.extensions?.code </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;INTERNAL_SERVER_ERROR&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          message: </span><span class="__shiki_mdbnqw">&#39;Internal server error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          extensions: {</span></span>
<span class="line"><span class="__shiki_140thh">            code: </span><span class="__shiki_mdbnqw">&#39;INTERNAL_SERVER_ERROR&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 返回标准化错误格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">      path: error.path,</span></span>
<span class="line"><span class="__shiki_140thh">      locations: error.locations,</span></span>
<span class="line"><span class="__shiki_140thh">      extensions: error.extensions</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  context</span><span class="__shiki_140thh">: ({ </span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 全局错误处理上下文</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      req,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      handleError</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">code</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;INTERNAL_ERROR&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloError</span><span class="__shiki_140thh">(error.message, code);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="_4-高级错误处理模式" tabindex="-1">4. 高级错误处理模式 <a class="header-anchor" href="#_4-高级错误处理模式" aria-label="Permalink to &quot;4. 高级错误处理模式&quot;">​</a></h2><h3 id="_4-1-错误包装器" tabindex="-1">4.1 错误包装器 <a class="header-anchor" href="#_4-1-错误包装器" aria-label="Permalink to &quot;4.1 错误包装器&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> withErrorHandling</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">resolver</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> resolver</span><span class="__shiki_140thh">(parent, args, context, info);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 分类处理不同类型的错误</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;ValidationError&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserInputError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Validation failed&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">          invalidArgs: Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(error.errors),</span></span>
<span class="line"><span class="__shiki_140thh">          details: error.message</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (error.code </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;SQLITE_CONSTRAINT&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Database constraint violation&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;CONSTRAINT_VIOLATION&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录未知错误</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Unhandled error in resolver:&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        resolver: info.fieldName,</span></span>
<span class="line"><span class="__shiki_140thh">        error: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">        stack: error.stack</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Internal server error&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;INTERNAL_SERVER_ERROR&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用错误包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Query: {</span></span>
<span class="line"><span class="__shiki_140thh">    user: </span><span class="__shiki_1t8gfj">withErrorHandling</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">parent</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getUserById</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_4-2-领域特定错误" tabindex="-1">4.2 领域特定错误 <a class="header-anchor" href="#_4-2-领域特定错误" aria-label="Permalink to &quot;4.2 领域特定错误&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// errors/domainErrors.js</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DomainError</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> ApolloError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">code</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">properties</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">(message, code, properties);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserNotFoundError</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> DomainError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`User \${</span><span class="__shiki_140thh">userId</span><span class="__shiki_mdbnqw">} not found\`</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;USER_NOT_FOUND&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      userId,</span></span>
<span class="line"><span class="__shiki_140thh">      http: { status: </span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> InsufficientBalanceError</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> DomainError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">required</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">available</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient balance&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;INSUFFICIENT_BALANCE&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      userId,</span></span>
<span class="line"><span class="__shiki_140thh">      required,</span></span>
<span class="line"><span class="__shiki_140thh">      available,</span></span>
<span class="line"><span class="__shiki_140thh">      http: { status: </span><span class="__shiki_dzsirb">400</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ProductOutOfStockError</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> DomainError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">productId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Product out of stock&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PRODUCT_OUT_OF_STOCK&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      productId,</span></span>
<span class="line"><span class="__shiki_140thh">      http: { status: </span><span class="__shiki_dzsirb">409</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  DomainError,</span></span>
<span class="line"><span class="__shiki_140thh">  UserNotFoundError,</span></span>
<span class="line"><span class="__shiki_140thh">  InsufficientBalanceError,</span></span>
<span class="line"><span class="__shiki_140thh">  ProductOutOfStockError</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_5-schema-级别的错误处理" tabindex="-1">5. Schema 级别的错误处理 <a class="header-anchor" href="#_5-schema-级别的错误处理" aria-label="Permalink to &quot;5. Schema 级别的错误处理&quot;">​</a></h2><h3 id="_5-1-联合类型错误模式" tabindex="-1">5.1 联合类型错误模式 <a class="header-anchor" href="#_5-1-联合类型错误模式" aria-label="Permalink to &quot;5.1 联合类型错误模式&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义可预期的错误类型</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_dzsirb"> Error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> UserNotFoundError</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  userId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> ValidationError</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> Error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  fields</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 成功和错误的联合类型</span></span>
<span class="line"><span class="__shiki_1itgoe">union</span><span class="__shiki_dzsirb"> CreateUserResult</span><span class="__shiki_140thh"> = </span><span class="__shiki_dzsirb">User</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">UserNotFoundError</span><span class="__shiki_140thh"> | </span><span class="__shiki_dzsirb">ValidationError</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">CreateUserResult</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询示例</span></span>
<span class="line"><span class="__shiki_1itgoe">mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: { </span><span class="__shiki_mdbnqw">email</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh"> }) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_dzsirb"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      id</span></span>
<span class="line"><span class="__shiki_1jdh33">      email</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_dzsirb"> UserNotFoundError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      message</span></span>
<span class="line"><span class="__shiki_1jdh33">      code</span></span>
<span class="line"><span class="__shiki_1jdh33">      userId</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_dzsirb"> ValidationError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      message</span></span>
<span class="line"><span class="__shiki_1jdh33">      code</span></span>
<span class="line"><span class="__shiki_1jdh33">      fields</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-包装响应模式" tabindex="-1">5.2 包装响应模式 <a class="header-anchor" href="#_5-2-包装响应模式" aria-label="Permalink to &quot;5.2 包装响应模式&quot;">​</a></h3><div class="language-graphql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">graphql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 通用响应包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_dzsirb"> MutationResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  success</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> UserMutationResponse</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_dzsirb"> MutationResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  code</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  success</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">Boolean</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  user</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">User</span></span>
<span class="line"><span class="__shiki_1jdh33">  errors</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">FieldError</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> FieldError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  field</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  message</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">String</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_dzsirb"> Mutation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">UserMutationResponse</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_1jdh33">  updateUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">ID</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">UserInput</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">): </span><span class="__shiki_dzsirb">UserMutationResponse</span><span class="__shiki_1itgoe">!</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-解析器实现模式" tabindex="-1">6. 解析器实现模式 <a class="header-anchor" href="#_6-解析器实现模式" aria-label="Permalink to &quot;6. 解析器实现模式&quot;">​</a></h2><h3 id="_6-1-联合类型解析器" tabindex="-1">6.1 联合类型解析器 <a class="header-anchor" href="#_6-1-联合类型解析器" aria-label="Permalink to &quot;6.1 联合类型解析器&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  CreateUserResult: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    __resolveType</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">obj</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (obj.email) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;User&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (obj.userId) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;UserNotFoundError&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (obj.fields) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;ValidationError&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  Mutation: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createUser</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">_</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 验证输入</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> validationErrors</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> validateUserInput</span><span class="__shiki_140thh">(input);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (validationErrors.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          __typename: </span><span class="__shiki_mdbnqw">&#39;ValidationError&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          message: </span><span class="__shiki_mdbnqw">&#39;Input validation failed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          code: </span><span class="__shiki_mdbnqw">&#39;VALIDATION_ERROR&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          fields: validationErrors</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查用户是否存在</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> existingUser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> findUserByEmail</span><span class="__shiki_140thh">(input.email);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (existingUser) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          __typename: </span><span class="__shiki_mdbnqw">&#39;ValidationError&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">          message: </span><span class="__shiki_mdbnqw">&#39;User already exists&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          code: </span><span class="__shiki_mdbnqw">&#39;DUPLICATE_USER&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          fields: [</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">(input);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          __typename: </span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">          ...</span><span class="__shiki_140thh">user</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          __typename: </span><span class="__shiki_mdbnqw">&#39;UserNotFoundError&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          message: </span><span class="__shiki_mdbnqw">&#39;Failed to create user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          code: </span><span class="__shiki_mdbnqw">&#39;CREATION_FAILED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          userId: </span><span class="__shiki_mdbnqw">&#39;unknown&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_6-2-响应包装器解析器" tabindex="-1">6.2 响应包装器解析器 <a class="header-anchor" href="#_6-2-响应包装器解析器" aria-label="Permalink to &quot;6.2 响应包装器解析器&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> resolvers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Mutation: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    createUser</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">_</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;200&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        success: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        message: </span><span class="__shiki_mdbnqw">&#39;User created successfully&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        user: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        errors: []</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 输入验证</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> validationResult</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> validateUserInput</span><span class="__shiki_140thh">(input);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">validationResult.isValid) {</span></span>
<span class="line"><span class="__shiki_140thh">          response.code </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;400&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          response.success </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          response.message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Validation failed&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          response.errors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> validationResult.errors;</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建用户</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">(input);</span></span>
<span class="line"><span class="__shiki_140thh">        response.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        response.code </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;500&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        response.success </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        response.message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Internal server error&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录详细错误日志</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Create user error:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_7-全局错误处理中间件" tabindex="-1">7. 全局错误处理中间件 <a class="header-anchor" href="#_7-全局错误处理中间件" aria-label="Permalink to &quot;7. 全局错误处理中间件&quot;">​</a></h2><h3 id="_7-1-express-中间件集成" tabindex="-1">7.1 Express 中间件集成 <a class="header-anchor" href="#_7-1-express-中间件集成" aria-label="Permalink to &quot;7.1 Express 中间件集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> errorMiddleware</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">app</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 捕获未处理的 Promise 拒绝</span></span>
<span class="line"><span class="__shiki_140thh">  process.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;unhandledRejection&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">reason</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">promise</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Unhandled Rejection at:&#39;</span><span class="__shiki_140thh">, promise, </span><span class="__shiki_mdbnqw">&#39;reason:&#39;</span><span class="__shiki_140thh">, reason);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  process.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;uncaughtException&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Uncaught Exception:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    process.</span><span class="__shiki_1t8gfj">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // GraphQL 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">  app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/graphql&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalSend</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> res.send;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> parsed</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (parsed.errors) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 记录 GraphQL 错误</span></span>
<span class="line"><span class="__shiki_140thh">          parsed.errors.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            logGraphQLError</span><span class="__shiki_140thh">(error, req);</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 生产环境过滤敏感信息</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            parsed.errors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parsed.errors.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(sanitizeError);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        originalSend.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(parsed));</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (e) {</span></span>
<span class="line"><span class="__shiki_140thh">        originalSend.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, data);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 404 处理</span></span>
<span class="line"><span class="__shiki_140thh">  app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      errors: [{</span></span>
<span class="line"><span class="__shiki_140thh">        message: </span><span class="__shiki_mdbnqw">&#39;Route not found&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        path: req.originalUrl</span></span>
<span class="line"><span class="__shiki_140thh">      }]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 全局错误处理</span></span>
<span class="line"><span class="__shiki_140thh">  app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Global error handler:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      errors: [{</span></span>
<span class="line"><span class="__shiki_140thh">        message: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;development&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">          ?</span><span class="__shiki_140thh"> error.message </span></span>
<span class="line"><span class="__shiki_1itgoe">          :</span><span class="__shiki_mdbnqw"> &#39;Internal server error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        code: </span><span class="__shiki_mdbnqw">&#39;INTERNAL_SERVER_ERROR&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> logGraphQLError</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> logEntry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">    path: error.path,</span></span>
<span class="line"><span class="__shiki_140thh">    code: error.extensions?.code,</span></span>
<span class="line"><span class="__shiki_140thh">    operationName: req.body?.operationName,</span></span>
<span class="line"><span class="__shiki_140thh">    userAgent: req.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;User-Agent&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ip: req.ip</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;GraphQL Error Log:&#39;</span><span class="__shiki_140thh">, logEntry);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> sanitizeError</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> sanitized</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">error };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 移除敏感信息</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (sanitized.extensions?.exception) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    delete</span><span class="__shiki_140thh"> sanitized.extensions.exception;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (sanitized.stack) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    delete</span><span class="__shiki_140thh"> sanitized.stack;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> sanitized;</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_8-客户端错误处理" tabindex="-1">8. 客户端错误处理 <a class="header-anchor" href="#_8-客户端错误处理" aria-label="Permalink to &quot;8. 客户端错误处理&quot;">​</a></h2><h3 id="_8-1-apollo-client-错误处理" tabindex="-1">8.1 Apollo Client 错误处理 <a class="header-anchor" href="#_8-1-apollo-client-错误处理" aria-label="Permalink to &quot;8.1 Apollo Client 错误处理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { ApolloClient, InMemoryCache, from } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@apollo/client&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { onError } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@apollo/client/link/error&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 错误链接</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> errorLink</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> onError</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">graphQLErrors</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">networkError</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (graphQLErrors) {</span></span>
<span class="line"><span class="__shiki_140thh">    graphQLErrors.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">locations</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">path</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">extensions</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        \`[GraphQL error]: Message: \${</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}, Path: \${</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">}, Code: \${</span><span class="__shiki_140thh">extensions</span><span class="__shiki_mdbnqw">?.</span><span class="__shiki_140thh">code</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 处理特定错误码</span></span>
<span class="line"><span class="__shiki_1itgoe">      switch</span><span class="__shiki_140thh"> (extensions?.code) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;UNAUTHENTICATED&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 重定向到登录页</span></span>
<span class="line"><span class="__shiki_140thh">          window.location.href </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;/login&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;FORBIDDEN&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 显示权限不足提示</span></span>
<span class="line"><span class="__shiki_1t8gfj">          showNotification</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Insufficient permissions&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;VALIDATION_ERROR&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 处理验证错误</span></span>
<span class="line"><span class="__shiki_1t8gfj">          handleValidationErrors</span><span class="__shiki_140thh">(extensions.invalidArgs);</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 显示通用错误提示</span></span>
<span class="line"><span class="__shiki_1t8gfj">          showNotification</span><span class="__shiki_140thh">(message, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (networkError) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[Network error]: \${</span><span class="__shiki_140thh">networkError</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    showNotification</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Network error occurred&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> client</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloClient</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  link: </span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">([errorLink, httpLink]),</span></span>
<span class="line"><span class="__shiki_140thh">  cache: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> InMemoryCache</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">  defaultOptions: {</span></span>
<span class="line"><span class="__shiki_140thh">    watchQuery: {</span></span>
<span class="line"><span class="__shiki_140thh">      errorPolicy: </span><span class="__shiki_mdbnqw">&#39;all&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    query: {</span></span>
<span class="line"><span class="__shiki_140thh">      errorPolicy: </span><span class="__shiki_mdbnqw">&#39;all&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    mutate: {</span></span>
<span class="line"><span class="__shiki_140thh">      errorPolicy: </span><span class="__shiki_mdbnqw">&#39;all&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_8-2-react-hook-错误处理" tabindex="-1">8.2 React Hook 错误处理 <a class="header-anchor" href="#_8-2-react-hook-错误处理" aria-label="Permalink to &quot;8.2 React Hook 错误处理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useQuery, useMutation } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@apollo/client&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useState } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;react&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1t8gfj"> useUserQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">errors</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setErrors</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">([]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">loading</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">refetch</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">GET_USER</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    variables: { userId },</span></span>
<span class="line"><span class="__shiki_1t8gfj">    onError</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> formattedErrors</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> error.graphQLErrors.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        message: err.message,</span></span>
<span class="line"><span class="__shiki_140thh">        code: err.extensions?.code,</span></span>
<span class="line"><span class="__shiki_140thh">        path: err.path</span></span>
<span class="line"><span class="__shiki_140thh">      }));</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setErrors</span><span class="__shiki_140thh">(formattedErrors);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1t8gfj">    onCompleted</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setErrors</span><span class="__shiki_140thh">([]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> clearErrors</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> setErrors</span><span class="__shiki_140thh">([]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    user: data?.user,</span></span>
<span class="line"><span class="__shiki_140thh">    loading,</span></span>
<span class="line"><span class="__shiki_140thh">    errors,</span></span>
<span class="line"><span class="__shiki_140thh">    refetch,</span></span>
<span class="line"><span class="__shiki_140thh">    clearErrors</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1t8gfj"> useCreateUserMutation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">errors</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setErrors</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">([]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">createUser</span><span class="__shiki_140thh">, { </span><span class="__shiki_dzsirb">loading</span><span class="__shiki_140thh"> }] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useMutation</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">CREATE_USER</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    onError</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> formattedErrors</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> error.graphQLErrors.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        message: err.message,</span></span>
<span class="line"><span class="__shiki_140thh">        code: err.extensions?.code,</span></span>
<span class="line"><span class="__shiki_140thh">        field: err.extensions?.field</span></span>
<span class="line"><span class="__shiki_140thh">      }));</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setErrors</span><span class="__shiki_140thh">(formattedErrors);</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1t8gfj">    onCompleted</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setErrors</span><span class="__shiki_140thh">([]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">input</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">({ variables: { input } });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (result.errors) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(result.errors[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    createUser: execute,</span></span>
<span class="line"><span class="__shiki_140thh">    loading,</span></span>
<span class="line"><span class="__shiki_140thh">    errors,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    clearErrors</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> setErrors</span><span class="__shiki_140thh">([])</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_9-测试错误处理" tabindex="-1">9. 测试错误处理 <a class="header-anchor" href="#_9-测试错误处理" aria-label="Permalink to &quot;9. 测试错误处理&quot;">​</a></h2><h3 id="_9-1-错误处理测试用例" tabindex="-1">9.1 错误处理测试用例 <a class="header-anchor" href="#_9-1-错误处理测试用例" aria-label="Permalink to &quot;9.1 错误处理测试用例&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">createTestClient</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server-testing&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">ApolloServer</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;apollo-server&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">typeDefs</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">resolvers</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./schema&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;GraphQL Error Handling&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> server;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    server </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ApolloServer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      typeDefs,</span></span>
<span class="line"><span class="__shiki_140thh">      resolvers,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      formatError</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">        message: error.message,</span></span>
<span class="line"><span class="__shiki_140thh">        code: error.extensions?.code</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should return NOT_FOUND error for non-existent user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">query</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> createTestClient</span><span class="__shiki_140thh">(server);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> GET_USER</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      query GetUser($id: ID!) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        user(id: $id) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          id</span></span>
<span class="line"><span class="__shiki_mdbnqw">          name</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> query</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      query: </span><span class="__shiki_dzsirb">GET_USER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      variables: { id: </span><span class="__shiki_mdbnqw">&#39;non-existent&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.errors).</span><span class="__shiki_1t8gfj">toBeDefined</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.errors[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].extensions.code).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;NOT_FOUND&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.data.user).</span><span class="__shiki_1t8gfj">toBeNull</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should return VALIDATION_ERROR for invalid input&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">mutate</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> createTestClient</span><span class="__shiki_140thh">(server);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> CREATE_USER</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      mutation CreateUser($input: UserInput!) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        createUser(input: $input) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ... on User {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            id</span></span>
<span class="line"><span class="__shiki_mdbnqw">            email</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ... on ValidationError {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            message</span></span>
<span class="line"><span class="__shiki_mdbnqw">            code</span></span>
<span class="line"><span class="__shiki_mdbnqw">            fields</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> mutate</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      mutation: </span><span class="__shiki_dzsirb">CREATE_USER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      variables: {</span></span>
<span class="line"><span class="__shiki_140thh">        input: { email: </span><span class="__shiki_mdbnqw">&#39;invalid-email&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.data.createUser.__typename).</span><span class="__shiki_1t8gfj">toBe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ValidationError&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(result.data.createUser.fields).</span><span class="__shiki_1t8gfj">toContain</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="_10-监控和日志" tabindex="-1">10. 监控和日志 <a class="header-anchor" href="#_10-监控和日志" aria-label="Permalink to &quot;10. 监控和日志&quot;">​</a></h2><h3 id="_10-1-错误监控集成" tabindex="-1">10.1 错误监控集成 <a class="header-anchor" href="#_10-1-错误监控集成" aria-label="Permalink to &quot;10.1 错误监控集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> Sentry</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@sentry/node&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">Severity</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@sentry/node&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> initializeErrorMonitoring</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  Sentry.</span><span class="__shiki_1t8gfj">init</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    dsn: process.env.</span><span class="__shiki_dzsirb">SENTRY_DSN</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    environment: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    integrations: [</span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_140thh"> Sentry.Integrations.</span><span class="__shiki_1t8gfj">GraphQL</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> errorMonitoringPlugin</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  requestDidStart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      didEncounterErrors</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">ctx.operation) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> err</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> ctx.errors) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 只记录服务器错误，不记录客户端错误</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (err.originalError </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1t8gfj"> isServerError</span><span class="__shiki_140thh">(err.originalError)) {</span></span>
<span class="line"><span class="__shiki_140thh">            Sentry.</span><span class="__shiki_1t8gfj">withScope</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">scope</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">              scope.</span><span class="__shiki_1t8gfj">setTag</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;kind&#39;</span><span class="__shiki_140thh">, ctx.operation.operation);</span></span>
<span class="line"><span class="__shiki_140thh">              scope.</span><span class="__shiki_1t8gfj">setExtra</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;query&#39;</span><span class="__shiki_140thh">, ctx.request.query);</span></span>
<span class="line"><span class="__shiki_140thh">              scope.</span><span class="__shiki_1t8gfj">setExtra</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;variables&#39;</span><span class="__shiki_140thh">, ctx.request.variables);</span></span>
<span class="line"><span class="__shiki_140thh">              </span></span>
<span class="line"><span class="__shiki_1itgoe">              if</span><span class="__shiki_140thh"> (err.path) {</span></span>
<span class="line"><span class="__shiki_140thh">                scope.</span><span class="__shiki_1t8gfj">addBreadcrumb</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                  category: </span><span class="__shiki_mdbnqw">&#39;query-path&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                  message: err.path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39; &gt; &#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                  level: Severity.Error</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">              </span></span>
<span class="line"><span class="__shiki_140thh">              Sentry.</span><span class="__shiki_1t8gfj">captureException</span><span class="__shiki_140thh">(err.originalError);</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> isServerError</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> clientErrorCodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;VALIDATION_ERROR&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;USER_INPUT_ERROR&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;UNAUTHENTICATED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;FORBIDDEN&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  ];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">clientErrorCodes.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(error.extensions?.code);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_11-最佳实践总结" tabindex="-1">11. 最佳实践总结 <a class="header-anchor" href="#_11-最佳实践总结" aria-label="Permalink to &quot;11. 最佳实践总结&quot;">​</a></h2><h3 id="_11-1-错误处理检查清单" tabindex="-1">11.1 错误处理检查清单 <a class="header-anchor" href="#_11-1-错误处理检查清单" aria-label="Permalink to &quot;11.1 错误处理检查清单&quot;">​</a></h3><ul><li>[ ] 使用标准化的错误格式</li><li>[ ] 实现适当的错误分类和代码</li><li>[ ] 在生产环境中过滤敏感信息</li><li>[ ] 为可预期的错误使用联合类型</li><li>[ ] 实现全局错误处理中间件</li><li>[ ] 添加全面的错误日志记录</li><li>[ ] 集成错误监控和报警</li><li>[ ] 编写错误处理测试用例</li><li>[ ] 提供客户端友好的错误信息</li><li>[ ] 实现适当的错误重试机制</li></ul><h3 id="_11-2-安全注意事项" tabindex="-1">11.2 安全注意事项 <a class="header-anchor" href="#_11-2-安全注意事项" aria-label="Permalink to &quot;11.2 安全注意事项&quot;">​</a></h3><ul><li>不要向客户端暴露堆栈跟踪</li><li>记录详细的错误日志供内部使用</li><li>验证和清理所有错误消息</li><li>实现适当的速率限制和错误配额</li><li>使用适当的 HTTP 状态码</li></ul><p>这份学习笔记涵盖了 GraphQL 错误处理的各个方面，从基础错误抛出到高级错误处理模式，包括客户端和服务端的完整解决方案。实际应用中需要根据具体业务需求选择合适的错误处理策略。</p>`,53)])])}const d=a(p,[["render",h]]);export{o as __pageData,d as default};
