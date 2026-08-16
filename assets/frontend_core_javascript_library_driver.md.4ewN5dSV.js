import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"driver.js 引导功能","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/core/javascript/library/driver.md","filePath":"frontend/core/javascript/library/driver.md"}'),_={name:"frontend/core/javascript/library/driver.md"};function l(h,s,t,e,c,o){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="driver-js-引导功能" tabindex="-1">driver.js 引导功能 <a class="header-anchor" href="#driver-js-引导功能" aria-label="Permalink to &quot;driver.js 引导功能&quot;">​</a></h1><blockquote><p>Driver.js 是一个强大的，轻量级，使用原生 JavaScript 引擎开发的库，用于在页面聚焦用户的关注点。它支持所有主流浏览器，并且可高度自定义。</p></blockquote><h3 id="一、引入" tabindex="-1">一、引入 <a class="header-anchor" href="#一、引入" aria-label="Permalink to &quot;一、引入&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Driver </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;driver.js&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;driver.js/dist/driver.min.css&quot;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="二、初始化参数" tabindex="-1">二、初始化参数 <a class="header-anchor" href="#二、初始化参数" aria-label="Permalink to &quot;二、初始化参数&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> guide</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> driver</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Driver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Driver</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">          // className来包装驱动程序。js弹出窗口</span></span>
<span class="line"><span class="__shiki_21nrsd">          // className to wrap driver.js popover</span></span>
<span class="line"><span class="__shiki_140thh">          className: </span><span class="__shiki_mdbnqw">&#39;scoped-class&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 更改亮显元素时设置动画</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Animate while changing highlighted element</span></span>
<span class="line"><span class="__shiki_140thh">          animate: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,  </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 背景不透明度（0表示仅弹出窗口，没有覆盖）</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Background opacity (0 means only popovers and without overlay)</span></span>
<span class="line"><span class="__shiki_140thh">          opacity: </span><span class="__shiki_dzsirb">0.75</span><span class="__shiki_140thh">,  </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 元件与边缘周围的距离</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Distance of element from around the edges</span></span>
<span class="line"><span class="__shiki_140thh">          padding: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,    </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 单击覆盖是否应关闭</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Whether clicking on overlay should close or not</span></span>
<span class="line"><span class="__shiki_140thh">          allowClose: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 如果移动到覆盖上的下一步，请单击</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Should it move to next step on overlay click</span></span>
<span class="line"><span class="__shiki_140thh">          overlayClickNext: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 最后一个按钮上的文本</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Text on the final button</span></span>
<span class="line"><span class="__shiki_140thh">          doneBtnText: </span><span class="__shiki_mdbnqw">&#39;Done&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 此步骤关闭按钮上的文本</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Text on the close button for this step</span></span>
<span class="line"><span class="__shiki_140thh">          closeBtnText: </span><span class="__shiki_mdbnqw">&#39;Close&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 此步骤的下一个按钮文本</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Next button text for this step</span></span>
<span class="line"><span class="__shiki_140thh">          nextBtnText: </span><span class="__shiki_mdbnqw">&#39;Next&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 此步骤的上一个按钮文本</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Previous button text for this step</span></span>
<span class="line"><span class="__shiki_140thh">          prevBtnText: </span><span class="__shiki_mdbnqw">&#39;Previous&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 不在页脚中显示控制按钮</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Do not show control buttons in footer</span></span>
<span class="line"><span class="__shiki_140thh">          showButtons: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 允许通过键盘进行控制（退出以关闭，箭头键移动）</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Allow controlling through keyboard (escape to close, arrow keys to move)</span></span>
<span class="line"><span class="__shiki_140thh">          keyboardControl: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 如果可能，我们使用“scrollIntoView（）”，如果需要，请将其选项传递给此处</span></span>
<span class="line"><span class="__shiki_21nrsd">          // We use \`scrollIntoView()\` when possible, pass here the options for it if you want any</span></span>
<span class="line"><span class="__shiki_140thh">          scrollIntoViewOptions: {}, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 当元素将被突出显示时调用</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Called when element is about to be highlighted</span></span>
<span class="line"><span class="__shiki_140thh">          onHighlightStarted: (Element) {}, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 当元素完全突出显示时调用</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Called when element is fully highlighted</span></span>
<span class="line"><span class="__shiki_140thh">          onHighlighted: (Element) {},</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 取消选择元素时调用</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Called when element has been deselected</span></span>
<span class="line"><span class="__shiki_140thh">          onDeselected: (Element) {}, </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 在即将清除覆盖时调用</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Called when overlay is about to be cleared</span></span>
<span class="line"><span class="__shiki_140thh">          onReset: (Element) {},    </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 在任何步骤上移动到下一步骤时调用    </span></span>
<span class="line"><span class="__shiki_21nrsd">          // Called when moving to next step on any step</span></span>
<span class="line"><span class="__shiki_1t8gfj">          onNext</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">Element</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {},      </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 在任何步骤上移动到下一步骤时调用</span></span>
<span class="line"><span class="__shiki_21nrsd">          // Called when moving to next step on any step</span></span>
<span class="line"><span class="__shiki_1t8gfj">          onPrevious</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">Element</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {},  </span></span>
<span class="line"><span class="__shiki_140thh">	});</span></span>
<span class="line"><span class="__shiki_140thh">	driver.</span><span class="__shiki_1t8gfj">defineSteps</span><span class="__shiki_140thh">(steps);</span></span>
<span class="line"><span class="__shiki_140thh">	driver.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="三、步骤参数" tabindex="-1">三、步骤参数 <a class="header-anchor" href="#三、步骤参数" aria-label="Permalink to &quot;三、步骤参数&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> steps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 要突出显示的查询选择器字符串或节点</span></span>
<span class="line"><span class="__shiki_21nrsd">      // Query selector string or Node to be highlighted</span></span>
<span class="line"><span class="__shiki_140thh">      element: </span><span class="__shiki_mdbnqw">&#39;#some-item&#39;</span><span class="__shiki_140thh">,        </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 如果为空或未给出，则不会弹出窗口</span></span>
<span class="line"><span class="__shiki_21nrsd">      // There will be no popover if empty or not given</span></span>
<span class="line"><span class="__shiki_140thh">      popover: {                    </span></span>
<span class="line"><span class="__shiki_21nrsd">       // className to wrap this specific step popover in addition to the general className in Driver options</span></span>
<span class="line"><span class="__shiki_140thh">        className: </span><span class="__shiki_mdbnqw">&#39;popover-class&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 弹出窗口上的标题</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Title on the popover</span></span>
<span class="line"><span class="__shiki_140thh">        title: </span><span class="__shiki_mdbnqw">&#39;Title&#39;</span><span class="__shiki_140thh">,    </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 主要描述内容         </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Body of the popover</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;Description&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 不在页脚中显示控制按钮</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Do not show control buttons in footer</span></span>
<span class="line"><span class="__shiki_140thh">        showButtons: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,   </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 此步骤关闭按钮上的文本      </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Text on the close button for this step</span></span>
<span class="line"><span class="__shiki_140thh">        closeBtnText: </span><span class="__shiki_mdbnqw">&#39;Close&#39;</span><span class="__shiki_140thh">,      </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 此步骤的下一个按钮文本</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Next button text for this step</span></span>
<span class="line"><span class="__shiki_140thh">        nextBtnText: </span><span class="__shiki_mdbnqw">&#39;Next&#39;</span><span class="__shiki_140thh">,    </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 此步骤的上一个按钮文本    </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Previous button text for this step</span></span>
<span class="line"><span class="__shiki_140thh">        prevBtnText: </span><span class="__shiki_mdbnqw">&#39;Previous&#39;</span><span class="__shiki_140thh">,    </span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_1t8gfj">		element</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;#breadcrumb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">		popover</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">			title</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Breadcrumb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">			description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Indicate the current page location&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">			position</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;right&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span></span>
<span class="line"><span class="__shiki_140thh">];</span></span></code></pre></div><h3 id="四、支持的方法" tabindex="-1">四、支持的方法 <a class="header-anchor" href="#四、支持的方法" aria-label="Permalink to &quot;四、支持的方法&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> driver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Driver</span><span class="__shiki_140thh">(driverOptions);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 检查驱动程序是否激活</span></span>
<span class="line"><span class="__shiki_21nrsd">// Checks if the driver is active or not</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isActivated</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> driver.isActivated; </span></span>
<span class="line"><span class="__shiki_21nrsd">// 移至步骤列表中的下一步</span></span>
<span class="line"><span class="__shiki_21nrsd">// Moves to next step in the steps list</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">moveNext</span><span class="__shiki_140thh">();     </span></span>
<span class="line"><span class="__shiki_21nrsd">// 移至步骤列表中的上一步</span></span>
<span class="line"><span class="__shiki_21nrsd">// Moves to previous step in the steps list</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">movePrevious</span><span class="__shiki_140thh">(); </span></span>
<span class="line"><span class="__shiki_21nrsd">// 开始执行定义的步骤</span></span>
<span class="line"><span class="__shiki_21nrsd">// Starts driving through the defined steps</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">(stepNumber </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">);  </span></span>
<span class="line"><span class="__shiki_21nrsd">// 使用查询选择器或步骤定义突出显示元素</span></span>
<span class="line"><span class="__shiki_21nrsd">// highlights the element using query selector or the step definition</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">highlight</span><span class="__shiki_140thh">(string</span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh">stepDefinition); </span></span>
<span class="line"><span class="__shiki_21nrsd">// 重置覆盖并清除屏幕</span></span>
<span class="line"><span class="__shiki_21nrsd">// Resets the overlay and clears the screen</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">reset</span><span class="__shiki_140thh">(); </span></span>
<span class="line"><span class="__shiki_21nrsd">// 检查是否有任何突出显示的元素</span></span>
<span class="line"><span class="__shiki_21nrsd">// Checks if there is any highlighted element</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">hasHighlightedElement</span><span class="__shiki_140thh">(); </span></span>
<span class="line"><span class="__shiki_21nrsd">// 检查是否有下一步要移动</span></span>
<span class="line"><span class="__shiki_21nrsd">// Checks if there is next step to move to</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">hasNextStep</span><span class="__shiki_140thh">(); </span></span>
<span class="line"><span class="__shiki_21nrsd">// 检查是否有上一步要移动到</span></span>
<span class="line"><span class="__shiki_21nrsd">// Checks if there is previous step to move to</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">hasPreviousStep</span><span class="__shiki_140thh">(); </span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 防止当前移动。如果需要，可在“onNext”或“onPrevious”中使用</span></span>
<span class="line"><span class="__shiki_21nrsd">// Prevents the current move. Useful in \`onNext\` or \`onPrevious\` if you want to</span></span>
<span class="line"><span class="__shiki_21nrsd">// 执行一些异步任务并手动转到下一步</span></span>
<span class="line"><span class="__shiki_21nrsd">// perform some asynchronous task and manually move to next step</span></span>
<span class="line"><span class="__shiki_140thh">driver.</span><span class="__shiki_1t8gfj">preventMove</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取屏幕上当前突出显示的元素</span></span>
<span class="line"><span class="__shiki_21nrsd">// Gets the currently highlighted element on screen</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> activeElement</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> driver.</span><span class="__shiki_1t8gfj">getHighlightedElement</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> lastActiveElement</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> driver.</span><span class="__shiki_1t8gfj">getLastHighlightedElement</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">// 获取活动元素的屏幕坐标</span></span>
<span class="line"><span class="__shiki_21nrsd">// Gets screen co-ordinates of the active element</span></span>
<span class="line"><span class="__shiki_140thh">activeElement.</span><span class="__shiki_1t8gfj">getCalculatedPosition</span><span class="__shiki_140thh">(); </span></span>
<span class="line"><span class="__shiki_21nrsd">// 隐藏弹出窗口</span></span>
<span class="line"><span class="__shiki_21nrsd">// Hide the popover</span></span>
<span class="line"><span class="__shiki_140thh">activeElement.</span><span class="__shiki_1t8gfj">hidePopover</span><span class="__shiki_140thh">();  </span></span>
<span class="line"><span class="__shiki_21nrsd">// 显示弹出窗口</span></span>
<span class="line"><span class="__shiki_21nrsd">// Show the popover</span></span>
<span class="line"><span class="__shiki_140thh">activeElement.</span><span class="__shiki_1t8gfj">showPopover</span><span class="__shiki_140thh">();  </span></span>
<span class="line"><span class="__shiki_21nrsd">// 获取此元素后面的DOM元素</span></span>
<span class="line"><span class="__shiki_21nrsd">// Gets the DOM Element behind this element</span></span>
<span class="line"><span class="__shiki_140thh">activeElement.</span><span class="__shiki_1t8gfj">getNode</span><span class="__shiki_140thh">();</span></span></code></pre></div><h3 id="五、简单的示例" tabindex="-1">五、简单的示例 <a class="header-anchor" href="#五、简单的示例" aria-label="Permalink to &quot;五、简单的示例&quot;">​</a></h3><p><code>&lt;el-button @click.prevent.stop=&quot;guide&quot;&gt;打开引导页️&lt;/el-button&gt;</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// guide 为打开引导页的方法</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> guide</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">	const</span><span class="__shiki_dzsirb"> driver</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Driver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Driver</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">		allowClose: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		doneBtnText: </span><span class="__shiki_mdbnqw">&quot;结束&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		closeBtnText: </span><span class="__shiki_mdbnqw">&quot;关闭&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		nextBtnText: </span><span class="__shiki_mdbnqw">&quot;下一步&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		prevBtnText: </span><span class="__shiki_mdbnqw">&quot;上一步&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	});</span></span>
<span class="line"><span class="__shiki_140thh">	driver.</span><span class="__shiki_1t8gfj">defineSteps</span><span class="__shiki_140thh">(steps);</span></span>
<span class="line"><span class="__shiki_140thh">	driver.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> steps</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#collapseIcon&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Collapse Icon&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Open &amp;&amp; Close sidebar&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;right&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#breadcrumb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Breadcrumb&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Indicate the current page location&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;right&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#assemblySize&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Switch Assembly Size&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Switch the system size&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#language&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Switch Language&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Switch the system language&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#searchMenu&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Page Search&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Page search, quick navigation&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#themeSetting&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Setting theme&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Customize settings theme&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#message&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Message Notification&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Can receive company information&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	},</span></span>
<span class="line"><span class="__shiki_140thh">	{</span></span>
<span class="line"><span class="__shiki_140thh">		element: </span><span class="__shiki_mdbnqw">&quot;#fullscreen&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">		popover: {</span></span>
<span class="line"><span class="__shiki_140thh">			title: </span><span class="__shiki_mdbnqw">&quot;Full Screen&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			description: </span><span class="__shiki_mdbnqw">&quot;Full Screen, Exit The Full Screen Page&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">			position: </span><span class="__shiki_mdbnqw">&quot;left&quot;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">];</span></span></code></pre></div>`,13)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
