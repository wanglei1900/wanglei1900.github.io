import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"前端状态管理策略学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/framework/advanced/state-management.md","filePath":"frontend/framework/advanced/state-management.md"}'),p={name:"frontend/framework/advanced/state-management.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="前端状态管理策略学习笔记" tabindex="-1">前端状态管理策略学习笔记 <a class="header-anchor" href="#前端状态管理策略学习笔记" aria-label="Permalink to &quot;前端状态管理策略学习笔记&quot;">​</a></h1><h2 id="状态管理核心概念" tabindex="-1">状态管理核心概念 <a class="header-anchor" href="#状态管理核心概念" aria-label="Permalink to &quot;状态管理核心概念&quot;">​</a></h2><h3 id="为什么需要状态管理" tabindex="-1">为什么需要状态管理？ <a class="header-anchor" href="#为什么需要状态管理" aria-label="Permalink to &quot;为什么需要状态管理？&quot;">​</a></h3><ul><li><strong>组件通信</strong>：跨层级组件数据传递</li><li><strong>数据一致性</strong>：多组件共享同一数据源</li><li><strong>可预测性</strong>：明确状态变更路径</li><li><strong>可维护性</strong>：集中管理业务逻辑</li><li><strong>调试能力</strong>：时间旅行、状态快照</li></ul><h3 id="状态分类" tabindex="-1">状态分类 <a class="header-anchor" href="#状态分类" aria-label="Permalink to &quot;状态分类&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类型</th><th>生命周期</th><th>示例</th><th>管理方案</th></tr></thead><tbody><tr><td><strong>本地状态</strong></td><td>组件内</td><td>表单输入、UI状态</td><td>useState/useReducer</td></tr><tr><td><strong>共享状态</strong></td><td>跨组件</td><td>用户信息、主题设置</td><td>Context/Redux/Zustand</td></tr><tr><td><strong>异步状态</strong></td><td>数据请求</td><td>API响应、加载状态</td><td>SWR/React Query</td></tr><tr><td><strong>URL状态</strong></td><td>页面级别</td><td>路由参数、查询字符串</td><td>React Router</td></tr><tr><td><strong>持久化状态</strong></td><td>长期存储</td><td>用户偏好、认证令牌</td><td>localStorage + 状态库</td></tr></tbody></table><h2 id="主流状态管理方案" tabindex="-1">主流状态管理方案 <a class="header-anchor" href="#主流状态管理方案" aria-label="Permalink to &quot;主流状态管理方案&quot;">​</a></h2><h3 id="_1-react-内置方案" tabindex="-1">1. React 内置方案 <a class="header-anchor" href="#_1-react-内置方案" aria-label="Permalink to &quot;1. React 内置方案&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// useState - 基础状态管理</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setCount</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// useReducer - 复杂状态逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> initialState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { count: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> reducer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  switch</span><span class="__shiki_140thh"> (action.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_mdbnqw"> &#39;increment&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> { count: state.count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">state</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">dispatch</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useReducer</span><span class="__shiki_140thh">(reducer, initialState);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Context API - 跨组件共享</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> ThemeContext</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createContext</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;light&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> App</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">ThemeContext.Provider</span><span class="__shiki_1t8gfj"> value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;dark&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_dzsirb">Toolbar</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">ThemeContext.Provider</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-redux-生态系统" tabindex="-1">2. Redux 生态系统 <a class="header-anchor" href="#_2-redux-生态系统" aria-label="Permalink to &quot;2. Redux 生态系统&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 核心概念</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> initialState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { value: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> counterReducer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> initialState, </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  switch</span><span class="__shiki_140thh"> (action.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_mdbnqw"> &#39;counter/increment&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">state, value: state.value </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> };</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> store</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> configureStore</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  reducer: {</span></span>
<span class="line"><span class="__shiki_140thh">    counter: counterReducer</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// React-Redux 连接</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useSelector, useDispatch } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;react-redux&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> Counter</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useSelector</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> state.counter.value);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> dispatch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useDispatch</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">button</span><span class="__shiki_1t8gfj"> onClick</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> dispatch</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">())}&gt;{count}&lt;/</span><span class="__shiki_17hn0y">button</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 现代Redux工具包（RTK）</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { createSlice } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@reduxjs/toolkit&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> counterSlice</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createSlice</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&#39;counter&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  initialState: { value: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  reducers: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    increment</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> { state.value </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">increment</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> counterSlice.actions;</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> counterSlice.reducer;</span></span></code></pre></div><h3 id="_3-轻量级解决方案" tabindex="-1">3. 轻量级解决方案 <a class="header-anchor" href="#_3-轻量级解决方案" aria-label="Permalink to &quot;3. 轻量级解决方案&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Zustand</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;zustand&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> useStore</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> create</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">set</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">  bears: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  increasePopulation</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({ bears: state.bears </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> })),</span></span>
<span class="line"><span class="__shiki_140thh">}));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> BearCounter</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> bears</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useStore</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> state.bears);</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">h1</span><span class="__shiki_140thh">&gt;{bears} bears around here&lt;/</span><span class="__shiki_17hn0y">h1</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Jotai (原子状态)</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { atom, useAtom } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;jotai&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> countAtom</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> atom</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> Counter</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setCount</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useAtom</span><span class="__shiki_140thh">(countAtom);</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">button</span><span class="__shiki_1t8gfj"> onClick</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> setCount</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">c</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)}&gt;{count}&lt;/</span><span class="__shiki_17hn0y">button</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Recoil (Facebook)</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { atom, useRecoilState } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;recoil&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> textState</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> atom</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  key: </span><span class="__shiki_mdbnqw">&#39;textState&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 唯一ID</span></span>
<span class="line"><span class="__shiki_140thh">  default: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> TextInput</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">text</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setText</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useRecoilState</span><span class="__shiki_140thh">(textState);</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">input</span><span class="__shiki_1t8gfj"> value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{text} </span><span class="__shiki_1t8gfj">onChange</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setText</span><span class="__shiki_140thh">(e.target.value)} /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-异步状态管理" tabindex="-1">4. 异步状态管理 <a class="header-anchor" href="#_4-异步状态管理" aria-label="Permalink to &quot;4. 异步状态管理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// React Query</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useQuery, useMutation } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;react-query&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">isLoading</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;userData&#39;</span><span class="__shiki_140thh">, fetchUser);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> mutation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useMutation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">newUser</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> axios.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/users&#39;</span><span class="__shiki_140thh">, newUser), {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    onSuccess</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 处理成功</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (isLoading) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;Loading...&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;{data.name}&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// SWR (Stale-While-Revalidate)</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> useSWR </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;swr&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> Profile</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useSWR</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/user&#39;</span><span class="__shiki_140thh">, fetcher);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (error) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;failed to load&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">data) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;loading...&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;hello {data.name}!&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="状态管理方案比较" tabindex="-1">状态管理方案比较 <a class="header-anchor" href="#状态管理方案比较" aria-label="Permalink to &quot;状态管理方案比较&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方案</th><th>包大小</th><th>学习曲线</th><th>性能</th><th>适用场景</th><th>特点</th></tr></thead><tbody><tr><td><strong>useState/Context</strong></td><td>0kB</td><td>低</td><td>中等</td><td>小型应用</td><td>内置方案，无需额外依赖</td></tr><tr><td><strong>Redux + RTK</strong></td><td>~10kB</td><td>中高</td><td>高</td><td>大型复杂应用</td><td>强约束、强工具链、强生态</td></tr><tr><td><strong>MobX</strong></td><td>~16kB</td><td>中</td><td>高</td><td>响应式需求</td><td>响应式编程、简洁语法</td></tr><tr><td><strong>Zustand</strong></td><td>~1.5kB</td><td>低</td><td>高</td><td>中小型应用</td><td>极简API、高性能</td></tr><tr><td><strong>Jotai</strong></td><td>~3kB</td><td>中低</td><td>高</td><td>原子状态需求</td><td>原子模型、灵活组合</td></tr><tr><td><strong>Recoil</strong></td><td>~40kB</td><td>中</td><td>高</td><td>大型React应用</td><td>Facebook出品、实验性</td></tr><tr><td><strong>React Query</strong></td><td>~12kB</td><td>中</td><td>高</td><td>数据请求管理</td><td>专注于异步状态</td></tr></tbody></table><h2 id="状态管理最佳实践" tabindex="-1">状态管理最佳实践 <a class="header-anchor" href="#状态管理最佳实践" aria-label="Permalink to &quot;状态管理最佳实践&quot;">​</a></h2><h3 id="_1-状态结构设计原则" tabindex="-1">1. 状态结构设计原则 <a class="header-anchor" href="#_1-状态结构设计原则" aria-label="Permalink to &quot;1. 状态结构设计原则&quot;">​</a></h3><ul><li><strong>单一数据源</strong>：全局状态集中管理</li><li><strong>状态最小化</strong>：只存储必要数据</li><li><strong>扁平化结构</strong>：避免深层嵌套</li><li><strong>不可变性</strong>：确保状态可预测</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 不良结构</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  user</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    profile</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      address</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        city</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;New York&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化结构</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">  user</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    addressId</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">101</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_1t8gfj">  addresses</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    101</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_140thh">      city: </span><span class="__shiki_mdbnqw">&#39;New York&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-性能优化策略" tabindex="-1">2. 性能优化策略 <a class="header-anchor" href="#_2-性能优化策略" aria-label="Permalink to &quot;2. 性能优化策略&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 避免不必要的重渲染</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> UserList</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 错误：整个组件在状态变化时都会重渲染</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useSelector</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> state.users);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 正确：使用精细订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> userCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useSelector</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> state.users.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用React.memo</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> MemoUserItem</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> React.</span><span class="__shiki_1t8gfj">memo</span><span class="__shiki_140thh">(({ </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;{user.name}&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 状态选择器优化</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> selectUserNames</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useCallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> state.users.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">u</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> u.name), []);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> userNames</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useSelector</span><span class="__shiki_140thh">(selectUserNames);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-状态持久化方案" tabindex="-1">3. 状态持久化方案 <a class="header-anchor" href="#_3-状态持久化方案" aria-label="Permalink to &quot;3. 状态持久化方案&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Redux持久化示例</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { persistStore, persistReducer } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;redux-persist&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> storage </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;redux-persist/lib/storage&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> persistConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  key: </span><span class="__shiki_mdbnqw">&#39;root&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  storage,</span></span>
<span class="line"><span class="__shiki_140thh">  whitelist: [</span><span class="__shiki_mdbnqw">&#39;auth&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_21nrsd">// 只持久化auth状态</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> persistedReducer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> persistReducer</span><span class="__shiki_140thh">(persistConfig, rootReducer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Zustand持久化</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;zustand&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { persist } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;zustand/middleware&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> useAuthStore</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> create</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">  set</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">    token: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setToken</span><span class="__shiki_140thh">: </span><span class="__shiki_1jdh33">token</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh">({ token })</span></span>
<span class="line"><span class="__shiki_140thh">  }),</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_mdbnqw">&#39;auth-storage&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// localStorage key</span></span>
<span class="line"><span class="__shiki_1t8gfj">    getStorage</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> localStorage,</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">));</span></span></code></pre></div><h3 id="_4-状态分形架构" tabindex="-1">4. 状态分形架构 <a class="header-anchor" href="#_4-状态分形架构" aria-label="Permalink to &quot;4. 状态分形架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">src/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── features/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── auth/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── authSlice.js      // Redux slice</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── authApi.js        // API请求</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   ├── LoginForm.js      // UI组件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   │   └── index.js          // 模块出口</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── cart/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── products/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── app/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── store.js              // 全局状态配置</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── rootReducer.js        // 组合reducer</span></span>
<span class="line"><span class="__shiki_wvjl67">└── shared/</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── hooks/                // 自定义hook</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── utils/                // 工具函数</span></span></code></pre></div><h2 id="状态管理高级模式" tabindex="-1">状态管理高级模式 <a class="header-anchor" href="#状态管理高级模式" aria-label="Permalink to &quot;状态管理高级模式&quot;">​</a></h2><h3 id="_1-状态机模式-xstate" tabindex="-1">1. 状态机模式 (XState) <a class="header-anchor" href="#_1-状态机模式-xstate" aria-label="Permalink to &quot;1. 状态机模式 (XState)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { createMachine, interpret } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;xstate&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> toggleMachine</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createMachine</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  id: </span><span class="__shiki_mdbnqw">&#39;toggle&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  initial: </span><span class="__shiki_mdbnqw">&#39;inactive&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  states: {</span></span>
<span class="line"><span class="__shiki_140thh">    inactive: { on: { TOGGLE: </span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_140thh">    active: { on: { TOGGLE: </span><span class="__shiki_mdbnqw">&#39;inactive&#39;</span><span class="__shiki_140thh"> } }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> toggleService</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> interpret</span><span class="__shiki_140thh">(toggleMachine)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">onTransition</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">state</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(state.value))</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">toggleService.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;TOGGLE&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// &#39;active&#39;</span></span>
<span class="line"><span class="__shiki_140thh">toggleService.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;TOGGLE&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// &#39;inactive&#39;</span></span></code></pre></div><h3 id="_2-原子状态衍生-jotai" tabindex="-1">2. 原子状态衍生 (Jotai) <a class="header-anchor" href="#_2-原子状态衍生-jotai" aria-label="Permalink to &quot;2. 原子状态衍生 (Jotai)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { atom, useAtom } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;jotai&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> baseAtom</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> atom</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> doubledAtom</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> atom</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">get</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> get</span><span class="__shiki_140thh">(baseAtom) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> tripledAtom</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> atom</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">get</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> get</span><span class="__shiki_140thh">(baseAtom) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> Multiplier</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">base</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setBase</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useAtom</span><span class="__shiki_140thh">(baseAtom);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">doubled</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useAtom</span><span class="__shiki_140thh">(doubledAtom);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">tripled</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useAtom</span><span class="__shiki_140thh">(tripledAtom);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">input</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">        type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;number&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">        value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{base} </span></span>
<span class="line"><span class="__shiki_1t8gfj">        onChange</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setBase</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Number</span><span class="__shiki_140thh">(e.target.value))} </span></span>
<span class="line"><span class="__shiki_140thh">      /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">p</span><span class="__shiki_140thh">&gt;Base: {base}&lt;/</span><span class="__shiki_17hn0y">p</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">p</span><span class="__shiki_140thh">&gt;Doubled: {doubled}&lt;/</span><span class="__shiki_17hn0y">p</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">p</span><span class="__shiki_140thh">&gt;Tripled: {tripled}&lt;/</span><span class="__shiki_17hn0y">p</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-响应式状态-mobx" tabindex="-1">3. 响应式状态 (MobX) <a class="header-anchor" href="#_3-响应式状态-mobx" aria-label="Permalink to &quot;3. 响应式状态 (MobX)&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { makeAutoObservable } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;mobx&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { observer } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;mobx-react-lite&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CounterStore</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  count</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    makeAutoObservable</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  increment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> store</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CounterStore</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> Counter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> observer</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">button</span><span class="__shiki_1t8gfj"> onClick</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> store.</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">()}&gt;+&lt;/</span><span class="__shiki_17hn0y">button</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;Count: {store.count}&lt;/</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">));</span></span></code></pre></div><h2 id="状态管理选择策略" tabindex="-1">状态管理选择策略 <a class="header-anchor" href="#状态管理选择策略" aria-label="Permalink to &quot;状态管理选择策略&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">  A[项目需求分析] --&gt; B{应用规模}</span></span>
<span class="line"><span class="__shiki_140thh">  B --&gt;|小型应用| C[内置方案 useState/Context]</span></span>
<span class="line"><span class="__shiki_140thh">  B --&gt;|中型应用| D[轻量库 Zustand/Jotai]</span></span>
<span class="line"><span class="__shiki_140thh">  B --&gt;|大型应用| E[Redux/MobX]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  A --&gt; F{数据复杂度}</span></span>
<span class="line"><span class="__shiki_140thh">  F --&gt;|简单异步| G[React Query/SWR]</span></span>
<span class="line"><span class="__shiki_140thh">  F --&gt;|复杂异步| H[Redux + RTK Query]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  A --&gt; I{团队熟悉度}</span></span>
<span class="line"><span class="__shiki_140thh">  I --&gt;|熟悉Redux| J[Redux Toolkit]</span></span>
<span class="line"><span class="__shiki_140thh">  I --&gt;|新团队| K[Zustand/React Query]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  A --&gt; L{特殊需求}</span></span>
<span class="line"><span class="__shiki_140thh">  L --&gt;|状态机| M[XState]</span></span>
<span class="line"><span class="__shiki_140thh">  L --&gt;|原子状态| N[Jotai/Recoil]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  J --&gt; O[最终决策]</span></span>
<span class="line"><span class="__shiki_140thh">  K --&gt; O</span></span>
<span class="line"><span class="__shiki_140thh">  M --&gt; O</span></span>
<span class="line"><span class="__shiki_140thh">  N --&gt; O</span></span></code></pre></div><h2 id="未来趋势" tabindex="-1">未来趋势 <a class="header-anchor" href="#未来趋势" aria-label="Permalink to &quot;未来趋势&quot;">​</a></h2><h3 id="_1-服务端状态优先" tabindex="-1">1. 服务端状态优先 <a class="header-anchor" href="#_1-服务端状态优先" aria-label="Permalink to &quot;1. 服务端状态优先&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// React Query + Hydration</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> App</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> queryClient</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> QueryClient</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">QueryClientProvider</span><span class="__shiki_1t8gfj"> client</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{queryClient}&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_dzsirb">Hydrate</span><span class="__shiki_1t8gfj"> state</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{pageProps.dehydratedState}&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_dzsirb">Component</span><span class="__shiki_140thh"> {</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">pageProps} /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;/</span><span class="__shiki_dzsirb">Hydrate</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">QueryClientProvider</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Next.js 服务端预取</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> getServerSideProps</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> queryClient</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> QueryClient</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryClient.</span><span class="__shiki_1t8gfj">prefetchQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;posts&#39;</span><span class="__shiki_140thh">, fetchPosts);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    props: {</span></span>
<span class="line"><span class="__shiki_140thh">      dehydratedState: </span><span class="__shiki_1t8gfj">dehydrate</span><span class="__shiki_140thh">(queryClient),</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-状态与ui分离" tabindex="-1">2. 状态与UI分离 <a class="header-anchor" href="#_2-状态与ui分离" aria-label="Permalink to &quot;2. 状态与UI分离&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用自定义Hook管理状态</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> useUserProfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">user</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setUser</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">loading</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setLoading</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  useEffect</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fetchUser</span><span class="__shiki_140thh">(userId).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setUser</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setLoading</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }, [userId]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> { user, loading };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// UI组件只负责展示</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh">({ </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh"> }) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">user</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">loading</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useUserProfile</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (loading) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_dzsirb">Spinner</span><span class="__shiki_140thh"> /&gt;;</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_dzsirb">ProfileCard</span><span class="__shiki_1t8gfj"> user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{user} /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-状态描述语言" tabindex="-1">3. 状态描述语言 <a class="header-anchor" href="#_3-状态描述语言" aria-label="Permalink to &quot;3. 状态描述语言&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用状态描述定义状态行为</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> authStateDescriptor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  states: {</span></span>
<span class="line"><span class="__shiki_140thh">    anonymous: {</span></span>
<span class="line"><span class="__shiki_140thh">      actions: [</span><span class="__shiki_mdbnqw">&#39;showLogin&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      transitions: {</span></span>
<span class="line"><span class="__shiki_140thh">        login: </span><span class="__shiki_mdbnqw">&#39;authenticating&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    authenticating: {</span></span>
<span class="line"><span class="__shiki_140thh">      actions: [</span><span class="__shiki_mdbnqw">&#39;showLoader&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      transitions: {</span></span>
<span class="line"><span class="__shiki_140thh">        success: </span><span class="__shiki_mdbnqw">&#39;authenticated&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        failure: </span><span class="__shiki_mdbnqw">&#39;anonymous&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    authenticated: {</span></span>
<span class="line"><span class="__shiki_140thh">      actions: [</span><span class="__shiki_mdbnqw">&#39;showUser&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      transitions: {</span></span>
<span class="line"><span class="__shiki_140thh">        logout: </span><span class="__shiki_mdbnqw">&#39;anonymous&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 状态机自动生成</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> authMachine</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createMachine</span><span class="__shiki_140thh">(authStateDescriptor);</span></span></code></pre></div><h2 id="常见问题解决方案" tabindex="-1">常见问题解决方案 <a class="header-anchor" href="#常见问题解决方案" aria-label="Permalink to &quot;常见问题解决方案&quot;">​</a></h2><h3 id="_1-状态管理过重" tabindex="-1">1. 状态管理过重 <a class="header-anchor" href="#_1-状态管理过重" aria-label="Permalink to &quot;1. 状态管理过重&quot;">​</a></h3><p><strong>问题</strong>：小型项目使用Redux导致过度工程化<br><strong>解决</strong>：</p><ul><li>优先使用useState/useReducer</li><li>使用Context处理简单共享状态</li><li>仅在必要时引入状态库</li></ul><h3 id="_2-状态同步问题" tabindex="-1">2. 状态同步问题 <a class="header-anchor" href="#_2-状态同步问题" aria-label="Permalink to &quot;2. 状态同步问题&quot;">​</a></h3><p><strong>问题</strong>：多个组件修改同一状态导致不一致<br><strong>解决</strong>：</p><ul><li>使用单一数据源原则</li><li>通过中间件实现原子操作</li><li>使用状态机确保状态转换有效性</li></ul><h3 id="_3-性能瓶颈" tabindex="-1">3. 性能瓶颈 <a class="header-anchor" href="#_3-性能瓶颈" aria-label="Permalink to &quot;3. 性能瓶颈&quot;">​</a></h3><p><strong>问题</strong>：全局状态变更导致全应用重渲染<br><strong>解决</strong>：</p><ul><li>精细化状态订阅（Zustand/Jotai）</li><li>使用选择器函数（Redux useSelector）</li><li>状态分片隔离（Recoil原子设计）</li></ul><blockquote><p><strong>最佳实践总结</strong>：现代前端状态管理应遵循 <strong>&quot;合适工具解决合适问题&quot;</strong> 原则。小型项目优先使用React内置方案，中型项目选择Zustand/Jotai等轻量库，大型复杂应用采用Redux/MobX。异步状态管理交给React Query/SWR，将<strong>服务器状态</strong>与<strong>客户端状态</strong>分离管理。同时关注状态设计而非状态库选择，保持状态最小化、扁平化和可预测性，才是状态管理的核心要义。</p></blockquote>`,54)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
