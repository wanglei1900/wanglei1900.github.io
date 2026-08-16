import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"☄️ eslint终极规范 爱彼迎 eslint-config-airbnb","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/engineering/quality/airbnb.md","filePath":"frontend/engineering/quality/airbnb.md"}'),_={name:"frontend/engineering/quality/airbnb.md"};function t(h,s,l,c,e,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="☄️-eslint终极规范-爱彼迎-eslint-config-airbnb" tabindex="-1">☄️ eslint终极规范 爱彼迎 eslint-config-airbnb <a class="header-anchor" href="#☄️-eslint终极规范-爱彼迎-eslint-config-airbnb" aria-label="Permalink to &quot;☄️ eslint终极规范 爱彼迎 eslint-config-airbnb&quot;">​</a></h1><p>eslint 的配置项过多，针对js、ts、vue、jsx、tsx等等不同的规则，小公司或者个人项目可以使用成熟的eslint社区规范，如airbnb、standard、goole等。</p><p>这里我们介绍社区使用最多的airbnb 规范。</p><h2 id="📜-一、项目介绍" tabindex="-1">📜 一、项目介绍 <a class="header-anchor" href="#📜-一、项目介绍" aria-label="Permalink to &quot;📜 一、项目介绍&quot;">​</a></h2><p>项目中使用到了 react18 + router6 + reudxtoolkit + vite4 + typescript</p><h2 id="📋-二、-开发依赖" tabindex="-1">📋 二、 开发依赖 <a class="header-anchor" href="#📋-二、-开发依赖" aria-label="Permalink to &quot;📋 二、 开发依赖&quot;">​</a></h2><p>除了常规的依赖，还需要一些依赖以支持对typescript 的支持</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">&quot;devDependencies&quot;</span><span class="__shiki_140thh">:{</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^8.50.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-config-airbnb&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^19.0.4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-config-airbnb-typescript&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^17.1.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-config-prettier&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^9.0.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-import-resolver-typescript&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^3.6.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-plugin-import&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^2.28.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-plugin-jsx-a11y&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^6.7.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-plugin-prettier&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^5.0.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-plugin-react&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^7.33.2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">	&quot;eslint-plugin-react-hooks&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^4.6.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="🔖-三、-eslintrc-cjs-文件配置" tabindex="-1">🔖 三、 .eslintrc.cjs 文件配置 <a class="header-anchor" href="#🔖-三、-eslintrc-cjs-文件配置" aria-label="Permalink to &quot;🔖 三、 .eslintrc.cjs 文件配置&quot;">​</a></h2><p>思路：总体是在airbnb的基础上去掉了一些过于严格的规则，增加一些自身需要的配置（如导入排序）</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// @see: https://zh-hans.eslint.org</span></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 设置为true表示该配置文件是根配置文件，ESLint将停止在父目录中查找其他配置文件。</span></span>
<span class="line"><span class="__shiki_140thh">  root: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 指定脚本运行的环境，可以是浏览器、Node.js或ES6等。这些环境会提供一组预定义的全局变量。</span></span>
<span class="line"><span class="__shiki_140thh">  env: {</span></span>
<span class="line"><span class="__shiki_140thh">    browser: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    node: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    es6: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  /* 配置一些特定的设置，例如React的版本和import配置 */</span></span>
<span class="line"><span class="__shiki_140thh">  settings: {</span></span>
<span class="line"><span class="__shiki_140thh">    react: {</span></span>
<span class="line"><span class="__shiki_140thh">      version: </span><span class="__shiki_mdbnqw">&quot;detect&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;import/parsers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;@typescript-eslint/parser&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;.ts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;.tsx&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  /* 告诉 ESLint 使用您安装的 @typescript-eslint/parser 包来解析源文件。必填的。 */</span></span>
<span class="line"><span class="__shiki_140thh">  parser: </span><span class="__shiki_mdbnqw">&quot;@typescript-eslint/parser&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  /* 配置解析器的选项，例如指定ECMAScript版本、源代码类型和JSX的pragma。 */</span></span>
<span class="line"><span class="__shiki_140thh">  parserOptions: {</span></span>
<span class="line"><span class="__shiki_140thh">    ecmaVersion: </span><span class="__shiki_mdbnqw">&quot;latest&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sourceType: </span><span class="__shiki_mdbnqw">&quot;module&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    jsxPragma: </span><span class="__shiki_mdbnqw">&quot;React&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    ecmaFeatures: {</span></span>
<span class="line"><span class="__shiki_140thh">      jsx: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    project: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tsconfigRootDir: __dirname</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  /*  指定要使用的插件，这里使用了React、TypeScript、Prettier插件。 */</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span><span class="__shiki_mdbnqw">&quot;react&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;@typescript-eslint&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;prettier&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_21nrsd">  /*  扩展现有的规则集，这里使用了一些推荐的规则集 */</span></span>
<span class="line"><span class="__shiki_140thh">  extends: [</span></span>
<span class="line"><span class="__shiki_21nrsd">    // &quot;plugin:@typescript-eslint/stylistic&quot;,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // &quot;plugin:@typescript-eslint/stylistic-type-checked&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;eslint:recommended&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;airbnb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;airbnb-typescript&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;plugin:@typescript-eslint/recommended-type-checked&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;plugin:react/jsx-runtime&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;plugin:react-hooks/recommended&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;plugin:prettier/recommended&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_21nrsd">  /* 配置具体的规则 */</span></span>
<span class="line"><span class="__shiki_140thh">  rules: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // react (https://github.com/jsx-eslint/eslint-plugin-react)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;react-hooks/rules-of-hooks&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 设置为&quot;error&quot;，确保在组件或自定义钩子中调用Hooks。</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;react-hooks/exhaustive-deps&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 设置为&quot;off&quot;，不需要对useEffect和useCallback的依赖项进行详尽检查。</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;react/function-component-definition&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, { namedComponents: </span><span class="__shiki_mdbnqw">&quot;arrow-function&quot;</span><span class="__shiki_140thh">, unnamedComponents: </span><span class="__shiki_mdbnqw">&quot;arrow-function&quot;</span><span class="__shiki_140thh"> }], </span><span class="__shiki_21nrsd">// 强制箭头函数定义</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;react/prop-types&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;react/require-default-props&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;warn&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// props默认值</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;@typescript-eslint/no-floating-promises&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 禁用必须处理Promise</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;@typescript-eslint/no-explicit-any&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 设置为&quot;off&quot;，允许使用any类型。</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;@typescript-eslint/restrict-template-expressions&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;no-plusplus&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, { allowForLoopAfterthoughts: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }],</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;jsx-a11y/anchor-is-valid&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;jsx-a11y/click-events-have-key-events&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;jsx-a11y/no-static-element-interactions&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;consistent-return&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;react/jsx-props-no-spreading&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;no-nested-ternary&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;no-param-reassign&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, { props: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, ignorePropertyModificationsFor: [</span><span class="__shiki_mdbnqw">&quot;state&quot;</span><span class="__shiki_140thh">] }],</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;no-restricted-syntax&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // eslint-plugin-import (https://github.com/import-js/eslint-plugin-import)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;import/no-extraneous-dependencies&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;import/no-mutable-exports&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;import/extensions&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;off&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 禁用eslint-plugin-import 的后文件名后缀检查</span></span>
<span class="line"><span class="__shiki_21nrsd">    // &quot;import/no-unresolved&quot;: &quot;error&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;import/no-cycle&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 禁止循环依赖</span></span>
<span class="line"><span class="__shiki_21nrsd">    // import自动排序</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;import/order&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;error&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        groups: [</span><span class="__shiki_mdbnqw">&quot;builtin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;external&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;internal&quot;</span><span class="__shiki_140thh">, [</span><span class="__shiki_mdbnqw">&quot;parent&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sibling&quot;</span><span class="__shiki_140thh">]],</span></span>
<span class="line"><span class="__shiki_140thh">        pathGroups: [</span></span>
<span class="line"><span class="__shiki_140thh">          {</span></span>
<span class="line"><span class="__shiki_140thh">            pattern: </span><span class="__shiki_mdbnqw">&quot;react&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            group: </span><span class="__shiki_mdbnqw">&quot;external&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            position: </span><span class="__shiki_mdbnqw">&quot;before&quot;</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_140thh">        pathGroupsExcludedImportTypes: [</span><span class="__shiki_mdbnqw">&quot;react&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;newlines-between&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;always&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        alphabetize: {</span></span>
<span class="line"><span class="__shiki_140thh">          order: </span><span class="__shiki_mdbnqw">&quot;asc&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          caseInsensitive: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 忽略</span></span>
<span class="line"><span class="__shiki_140thh">  overrides: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      files: [</span><span class="__shiki_mdbnqw">&quot;*.js&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;*.cjs&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      extends: [</span><span class="__shiki_mdbnqw">&quot;plugin:@typescript-eslint/disable-type-checked&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><p>导入排序效果如图 按群组自动分类，字母生序排列，一清二楚。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useEffect } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;react&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { App </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> AppProvider, ConfigProvider, theme } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;antd&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> enUS </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;antd/locale/en_US&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> zhCN </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;antd/locale/zh_CN&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dayjs </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;dayjs&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { I18nextProvider } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;react-i18next&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { shallowEqual } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;react-redux&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { RefreshProvider } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/contexts/Refresh&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> i18n </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/languages&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { useAppDispatch, useAppSelector } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/redux/hook&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { LanguageType } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/redux/interface&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { setGlobalState } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/redux/reducer/globalSlice&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> RouterProvider </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/routers&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { getBrowserLang } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@/utils&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;dayjs/locale/zh-cn&quot;</span><span class="__shiki_140thh">;</span></span></code></pre></div><p>vscode配置项setting.json 别忘了配置保存后自动排序</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在保存文件时，针对样式文件使用 stylelint 进行自动修复 和 导入自动排序。</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;editor.codeActionsOnSave&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;source.fixAll.stylelint&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;source.organizeImports&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">},</span></span></code></pre></div>`,15)])])}const q=a(_,[["render",t]]);export{r as __pageData,q as default};
