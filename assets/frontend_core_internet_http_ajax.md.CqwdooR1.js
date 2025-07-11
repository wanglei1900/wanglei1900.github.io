import{_ as n,c as a,o as p,a7 as e}from"./chunks/framework.Dtft01Yp.js";const m=JSON.parse('{"title":"XMLHttpRequest  XHR","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/core/internet/http/ajax.md","filePath":"frontend/core/internet/http/ajax.md","lastUpdated":1751966758000}'),l={name:"frontend/core/internet/http/ajax.md"};function r(i,s,t,c,b,o){return p(),a("div",null,s[0]||(s[0]=[e(`<p>Asynchronous Javascript And XML， a（async异步）j（JavaScript）a（and）x（XML：与json同级语言格式） <strong>ajax</strong> 作为前端必修课，<strong>页面无刷新获取数据</strong>。是一种创建动态网页（即前后端交互）的技术。</p><blockquote><p>原理：浏览器底部抛出 <strong>XMLHttpRequest</strong>（简写<strong>XHR</strong>） 接口，<strong>XHR</strong>是用于对象和服务器的交互。</p><blockquote><p><strong>ajax</strong>请求函数本质上是对<strong>XHR</strong>封装，<strong>axios</strong>则是用<strong>promise</strong>对<strong>ajax</strong>的封装库。axios仍是学习重点。</p></blockquote></blockquote><p><strong>打开Chrome浏览器里Network选项卡里的Fetch/Xhr一栏即为ajax请求。</strong></p><br><br><br><hr><h1 id="xmlhttprequest-xhr" tabindex="-1">XMLHttpRequest XHR <a class="header-anchor" href="#xmlhttprequest-xhr" aria-label="Permalink to &quot;XMLHttpRequest  XHR&quot;">​</a></h1><h2 id="xmlhttprequest-属性" tabindex="-1">XMLHttpRequest 属性 <a class="header-anchor" href="#xmlhttprequest-属性" aria-label="Permalink to &quot;XMLHttpRequest 属性&quot;">​</a></h2><p>XMLHttpRequest.onreadystatechange： 监控事件，当 xhr.readyState 属性发生改变触发 XMLHttpRequest.readyState： xhr的状态0-4共五个状态码，请求响应过程的当前活动阶段 XMLHttpRequest.onload=callback： 请成功并完成时触发，进入callback内代表readyState已经为4 XMLHttpRequest.status： 响应的http状态 XMLHttpRequest.response： 返回响应体 XMLHttpRequest.responseType ： 指定响应体格式 XMLHttpRequest.responseType ： 设置超时时间</p><p><em>XMLHttpRequest 对象的 readyState 属性，表示请求响应过程的当前活动阶段： 0： 未初始化，创建了XMLHttpRequest对象，但未调用open()方法 1： 启动，已经调用open()方法，但未调用send()方法 2： 发送，已经调用send()方法，但未接收到响应 3： 接收，已经接收到部分响应数据 4： 完成，已经接收到全部响应数据，并且可以在客户端使用</em></p><br><h2 id="xmlhttprequest-方法" tabindex="-1">XMLHttpRequest 方法 <a class="header-anchor" href="#xmlhttprequest-方法" aria-label="Permalink to &quot;XMLHttpRequest 方法&quot;">​</a></h2><p>XMLHttpRequest.open(method, url, async)： 打开要发送请求的地址，参数：请求方式、请求的url地址、请求是否异步的布尔值（默认true） XMLHttpRequest.send(requsetBody)： 发送请求（体） XMLHttpRequest.setRequestHeader(key, value)： 设置请求头 XMLHttpRequest.getResponseHeader(key)： 获取响应头 XMLHttpRequest.abort()： 请求发出，立刻终止</p><br><br><br><hr><h1 id="ajax" tabindex="-1">ajax <a class="header-anchor" href="#ajax" aria-label="Permalink to &quot;ajax&quot;">​</a></h1><h2 id="手写一个ajax-没用promise" tabindex="-1">手写一个ajax，没用promise <a class="header-anchor" href="#手写一个ajax-没用promise" aria-label="Permalink to &quot;手写一个ajax，没用promise&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    // 1.实例化xhr对象</span></span>
<span class="line"><span>    const xhr = new XMLHttpRequest();</span></span>
<span class="line"><span>    // 监控 xhr.readyState</span></span>
<span class="line"><span>    xhr.onreadystatechange = () =&gt; {    // xhr实例出来的那一刻为0</span></span>
<span class="line"><span>        if (xhr.readyState === 4) {     // xhr有五种状态0,1,2,3,4，其中4为完全接收状态</span></span>
<span class="line"><span>            if (xhr.status &gt; 200 &amp;&amp; xhr.status &lt; 300) {</span></span>
<span class="line"><span>                // 2.指定发送请求的url地址：method、url带query参数、true开启异步</span></span>
<span class="line"><span>                xhr.open(&#39;GET&#39;, &#39;http://localhost:8080/testrequest?name=paul&amp;age=18&#39;,false)</span></span>
<span class="line"><span>                // 3.发送请求</span></span>
<span class="line"><span>                xhr.send()</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><br><br><br><hr><h1 id="★axios" tabindex="-1">★axios <a class="header-anchor" href="#★axios" aria-label="Permalink to &quot;★axios&quot;">​</a></h1><blockquote><p>axios 是一个基于promise 的 http 库，可以用于浏览器和 nodejs 中</p></blockquote><h2 id="用promise封装ajax-无状态" tabindex="-1">用promise封装ajax，无状态 <a class="header-anchor" href="#用promise封装ajax-无状态" aria-label="Permalink to &quot;用promise封装ajax，无状态&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 用promise封装一个axios请函数，传入参数config（对象包含1.请求路径2.请求方式3.）</span></span>
<span class="line"><span>function axios(config) {</span></span>
<span class="line"><span>    // 调用axios方法，将返回一个promise实例</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        // 解构出config参数里的url、method、data</span></span>
<span class="line"><span>        const { url = &#39;&#39;, method = &#39;GET&#39;, data = {} } = config</span></span>
<span class="line"><span>        // Xhr实例化</span></span>
<span class="line"><span>        const xhr = new XMLHttpRequest()</span></span>
<span class="line"><span>        // 指定要发送的请求（注意参数）</span></span>
<span class="line"><span>        xhr.open(method, url, true)</span></span>
<span class="line"><span>        // 请求完成时要执行的函数</span></span>
<span class="line"><span>        xhr.onload = function () {</span></span>
<span class="line"><span>            // 判断状态码</span></span>
<span class="line"><span>            if (xhr.status &gt;= 200 &amp;&amp; xhr.status &lt; 300) {</span></span>
<span class="line"><span>                resolve(xhr.responseText)       // 返回成功的promise，</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                reject(new Error(&#39;faile&#39;))      // 返回失败的promise</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 发送请求</span></span>
<span class="line"><span>        xhr.send()</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>ps：只要进入xhr.onload回调里，即代表xhr.onreadystatechange ===4,已经完成响应。</p><br><h2 id="一、axios配置" tabindex="-1">一、axios配置 <a class="header-anchor" href="#一、axios配置" aria-label="Permalink to &quot;一、axios配置&quot;">​</a></h2><blockquote><p>axios有三种形式的配置，全局配置，实例配置，请求配置。</p><blockquote><p>优先级：请求配置 &gt; 实例配置 &gt; 全局配置</p></blockquote></blockquote><h3 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// axios全局默认值</span></span>
<span class="line"><span>axios.defaults.baseURL = &#39;http://localhost:8080&#39;;</span></span>
<span class="line"><span>axios.defaults.timeout = 1000 ;</span></span>
<span class="line"><span>axios.defaults.headers.common[&#39;Authorization&#39;] = AUTH_TOKEN;</span></span>
<span class="line"><span>axios.defaults.headers.post[&#39;Content-Type&#39;] = &#39;application/x-www-form-urlencoded&#39;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="实例配置" tabindex="-1">实例配置 <a class="header-anchor" href="#实例配置" aria-label="Permalink to &quot;实例配置&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// axios实例配置（new axios出来的实例）</span></span>
<span class="line"><span>let request = axios.create({</span></span>
<span class="line"><span>    baseURL:&#39;http://localhost/api/&#39;,      // URL基础路径</span></span>
<span class="line"><span>    url: &#39;/user&#39;,      // 在baseURL路径后拼接完整url地址</span></span>
<span class="line"><span>    method: &#39;GET&#39;,      // 请求方式（默认get），get，post，put，patch,delete</span></span>
<span class="line"><span>    params: { delay: 3000 },      // 参数用于GET请求，把数据拼接在URL的查询字符串中。配置url参数，虽然叫params配置但是携带的是query参数。</span></span>
<span class="line"><span>    data: { c: 2, d: 3 },      //  参数放在请求体中（json参数），只使用于PUT,POST,PATCH</span></span>
<span class="line"><span>    data: \`e=4&amp;f=6\`,      // 置请求主体（urlencode编码），只使用于PUT,POST,PATCH</span></span>
<span class="line"><span>    timeout:2000,      // 请求超时毫秒</span></span>
<span class="line"><span>    headers:{&#39;Content-Type&#39;: &#39;application/json;charset=UTF-8&#39;},      // 自定义情头头</span></span>
<span class="line"><span>    responseType:&#39;json&#39;      // 指定响应格式（默认json），老项目可能用xml</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="请求配置" tabindex="-1">请求配置 <a class="header-anchor" href="#请求配置" aria-label="Permalink to &quot;请求配置&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// axios请求配置</span></span>
<span class="line"><span>instance.get(&#39;/longRequest&#39;, {    //// 为已知需要花费很长时间的请求覆写超时设置</span></span>
<span class="line"><span>  timeout: 5000</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><br><br><h2 id="二、axios拦截器" tabindex="-1">二、axios拦截器 <a class="header-anchor" href="#二、axios拦截器" aria-label="Permalink to &quot;二、axios拦截器&quot;">​</a></h2><blockquote><p>axios拦截器分为请求拦截器和响应拦截器。</p><blockquote><p>拦截器的作用，在发起请求前做些什么，在响应回来前做些什么。</p></blockquote></blockquote><p><strong>在发起请求或响应被 then 或 catch 处理前拦截它们</strong><code> axios.get().then().catch(err=&gt;{})</code></p><h3 id="axios请求拦截器" tabindex="-1">axios请求拦截器 <a class="header-anchor" href="#axios请求拦截器" aria-label="Permalink to &quot;axios请求拦截器&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情</span></span>
<span class="line"><span>// 此处为通过携带token字段控制登录状态</span></span>
<span class="line"><span>axios.interceptors.request.use((config) =&gt; {</span></span>
<span class="line"><span>    // config:配置对象，对象里面有一个属性很重要，headers请求头</span></span>
<span class="line"><span>    // 在发送请求之前做些什么，给拦截器设置过滤</span></span>
<span class="line"><span>    if (condition) {</span></span>
<span class="line"><span>        config.headers.token = &#39;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 将axios的config配置返回出去，不然起不到过滤作用</span></span>
<span class="line"><span>    return config</span></span>
<span class="line"><span>}, function (error) {</span></span>
<span class="line"><span>    // 对请求错误做些什么</span></span>
<span class="line"><span>    return Promise.reject(error)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><br><h3 id="axios响应拦截器" tabindex="-1">axios响应拦截器 <a class="header-anchor" href="#axios响应拦截器" aria-label="Permalink to &quot;axios响应拦截器&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 响应拦截器：在请求返回之前，响应拦截器可以检测到</span></span>
<span class="line"><span>axios.interceptors.response.use((response) =&gt; {</span></span>
<span class="line"><span>    // 拦截成功做些什么,返回成功的数据数据</span></span>
<span class="line"><span>    if (condition) {</span></span>
<span class="line"><span>        // axios发送请求的数据返回都是双层data，这里利用响应拦截器自动脱掉一层data</span></span>
<span class="line"><span>        return response.data</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}, function (error) {</span></span>
<span class="line"><span>    // 对请求错误做些什么</span></span>
<span class="line"><span>    return Promise.reject(error)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><br><h2 id="三、axios-二次封装写法-转载自https-www-jianshu-com-p-d6796986e2ab" tabindex="-1">三、axios 二次封装写法 (转载自<a href="https://www.jianshu.com/p/d6796986e2ab" target="_blank" rel="noreferrer">https://www.jianshu.com/p/d6796986e2ab</a>) <a class="header-anchor" href="#三、axios-二次封装写法-转载自https-www-jianshu-com-p-d6796986e2ab" aria-label="Permalink to &quot;三、axios 二次封装写法  (转载自https://www.jianshu.com/p/d6796986e2ab)&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// request.js</span></span>
<span class="line"><span>import axios from &#39;axios&#39;;</span></span>
<span class="line"><span>import NProgress from &#39;nprogress&#39;;</span></span>
<span class="line"><span>import { notification, message } from &#39;antd&#39;;</span></span>
<span class="line"><span>import { routerRedux } from &#39;dva/router&#39;;</span></span>
<span class="line"><span>import store from &#39;../index&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 一、功能：</span></span>
<span class="line"><span> * 1. 统一拦截http错误请求码；</span></span>
<span class="line"><span> * 2. 统一拦截业务错误代码；</span></span>
<span class="line"><span> * 3. 统一设置请求前缀</span></span>
<span class="line"><span> * |-- 每个 http 加前缀 baseURL = /api/v1，从配置文件中获取 apiPrefix</span></span>
<span class="line"><span> * 4. 配置异步请求过渡状态：显示蓝色加载条表示正在请求中，避免给用户页面假死的不好体验。</span></span>
<span class="line"><span> * |-- 使用 NProgress 工具库。</span></span>
<span class="line"><span> * </span></span>
<span class="line"><span> * 二、引包：</span></span>
<span class="line"><span> * |-- axios：http 请求工具库</span></span>
<span class="line"><span> * |-- NProgress：异步请求过度条，在浏览器主体部分顶部显示蓝色小条</span></span>
<span class="line"><span> * |-- notification：Antd组件 &gt; 处理错误响应码提示信息</span></span>
<span class="line"><span> * |-- routerRedux：dva/router对象，用于路由跳转，错误响应码跳转相应页面</span></span>
<span class="line"><span> * |-- store：dva中对象，使用里面的 dispatch 对象，用于触发路由跳转</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 设置全局参数，如响应超市时间，请求前缀等。</span></span>
<span class="line"><span>axios.defaults.timeout = 5000</span></span>
<span class="line"><span>axios.defaults.baseURL = &#39;/api/v1&#39;;</span></span>
<span class="line"><span>axios.defaults.withCredentials = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 状态码错误信息</span></span>
<span class="line"><span>const codeMessage = {</span></span>
<span class="line"><span>    200: &#39;服务器成功返回请求的数据。&#39;,</span></span>
<span class="line"><span>    201: &#39;新建或修改数据成功。&#39;,</span></span>
<span class="line"><span>    202: &#39;一个请求已经进入后台排队（异步任务）。&#39;,</span></span>
<span class="line"><span>    204: &#39;删除数据成功。&#39;,</span></span>
<span class="line"><span>    400: &#39;发出的请求有错误，服务器没有进行新建或修改数据的操作。&#39;,</span></span>
<span class="line"><span>    401: &#39;用户没有权限（令牌、用户名、密码错误）。&#39;,</span></span>
<span class="line"><span>    403: &#39;用户得到授权，但是访问是被禁止的。&#39;,</span></span>
<span class="line"><span>    404: &#39;发出的请求针对的是不存在的记录，服务器没有进行操作。&#39;,</span></span>
<span class="line"><span>    406: &#39;请求的格式不可得。&#39;,</span></span>
<span class="line"><span>    410: &#39;请求的资源被永久删除，且不会再得到的。&#39;,</span></span>
<span class="line"><span>    422: &#39;当创建一个对象时，发生一个验证错误。&#39;,</span></span>
<span class="line"><span>    500: &#39;服务器发生错误，请检查服务器。&#39;,</span></span>
<span class="line"><span>    502: &#39;网关错误。&#39;,</span></span>
<span class="line"><span>    503: &#39;服务不可用，服务器暂时过载或维护。&#39;,</span></span>
<span class="line"><span>    504: &#39;网关超时。&#39;,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 添加一个请求拦截器，用于设置请求过渡状态</span></span>
<span class="line"><span>axios.interceptors.request.use((config) =&gt; {</span></span>
<span class="line"><span>    // 请求开始，蓝色过渡滚动条开始出现</span></span>
<span class="line"><span>    NProgress.start();</span></span>
<span class="line"><span>    return config;</span></span>
<span class="line"><span>}, (error) =&gt; {</span></span>
<span class="line"><span>    return Promise.reject(error);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 添加一个返回拦截器</span></span>
<span class="line"><span>axios.interceptors.response.use((response) =&gt; {</span></span>
<span class="line"><span>    // 请求结束，蓝色过渡滚动条消失</span></span>
<span class="line"><span>    NProgress.done();</span></span>
<span class="line"><span>    return response;</span></span>
<span class="line"><span>}, (error) =&gt; {</span></span>
<span class="line"><span>    // 请求结束，蓝色过渡滚动条消失</span></span>
<span class="line"><span>    // 即使出现异常，也要调用关闭方法，否则一直处于加载状态很奇怪</span></span>
<span class="line"><span>    NProgress.done();</span></span>
<span class="line"><span>    return Promise.reject(error);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function request(opt) {</span></span>
<span class="line"><span>    // 调用 axios api，统一拦截</span></span>
<span class="line"><span>    return axios(opt)</span></span>
<span class="line"><span>        .then((response) =&gt; {</span></span>
<span class="line"><span>            // &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt; 请求成功 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span></span>
<span class="line"><span>            console.log(\`【\${opt.method} \${opt.url}】请求成功，响应数据：%o\`, response)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 打印业务错误提示</span></span>
<span class="line"><span>            if (response.data &amp;&amp; response.data.code != &#39;0000&#39;) {</span></span>
<span class="line"><span>                message.error(response.data.message);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return { ...response.data };</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>        .catch((error) =&gt; {</span></span>
<span class="line"><span>            // &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt; 请求失败 &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span></span>
<span class="line"><span>            // 请求配置发生的错误</span></span>
<span class="line"><span>            if (!error.response) {</span></span>
<span class="line"><span>                return console.log(&#39;Error&#39;, error.message);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 响应时状态码处理 </span></span>
<span class="line"><span>            const status = error.response.status;</span></span>
<span class="line"><span>            const errortext = codeMessage[status] || error.response.statusText;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            notification.error({</span></span>
<span class="line"><span>                message: \`请求错误 \${status}\`,</span></span>
<span class="line"><span>                description: errortext,</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 存在请求，但是服务器的返回一个状态码，它们都在2xx之外</span></span>
<span class="line"><span>            const { dispatch } = store;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if (status === 401) {</span></span>
<span class="line"><span>                dispatch(routerRedux.push(&#39;/user/login&#39;));</span></span>
<span class="line"><span>            } else if (status === 403) {</span></span>
<span class="line"><span>                dispatch(routerRedux.push(&#39;/exception/403&#39;));</span></span>
<span class="line"><span>            } else if (status &lt;= 504 &amp;&amp; status &gt;= 500) {</span></span>
<span class="line"><span>                dispatch(routerRedux.push(&#39;/exception/500&#39;));</span></span>
<span class="line"><span>            } else if (status &gt;= 404 &amp;&amp; status &lt; 422) {</span></span>
<span class="line"><span>                dispatch(routerRedux.push(&#39;/exception/404&#39;));</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 开发时使用，上线时删除</span></span>
<span class="line"><span>            console.log(\`【\${opt.method} \${opt.url}】请求失败，响应数据：%o\`, error.response);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return { code: status, message: errortext };</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br></div></div><h3 id="接口api函数统一管理" tabindex="-1">接口api函数统一管理 <a class="header-anchor" href="#接口api函数统一管理" aria-label="Permalink to &quot;接口api函数统一管理&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 发请求：axios发请求返回结果是Promise对象</span></span>
<span class="line"><span>// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求，当前者个函数只需要把服务器返回的结果返回即可</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 无参数</span></span>
<span class="line"><span>export const reqA = () =&gt; requests({</span></span>
<span class="line"><span>    url: &#39;/a&#39;,</span></span>
<span class="line"><span>    method: &#39;GET&#39;,</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 若无接口，可以使用mock模拟数据。无参数</span></span>
<span class="line"><span>export const reqB = () =&gt; mockRequest({</span></span>
<span class="line"><span>    url: &#39;/b&#39;,</span></span>
<span class="line"><span>    method: &#39;GET&#39;</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 请求参数:params参数：,模板字符串手动拼入路径</span></span>
<span class="line"><span>export const reqC = (id) =&gt; requests({</span></span>
<span class="line"><span>    url: \`/d/\${id}\`,</span></span>
<span class="line"><span>    method: &#39;GET&#39;</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 请求参数：query参数，会写入路径</span></span>
<span class="line"><span>// 这里的params是指形参的意思(你可以写作任意)，aioxs规定params配置项必须为对象，**所以这里params实际为是query参数**</span></span>
<span class="line"><span>// 若params:{name:paul}，则最终请求的路径为 http://localhost/c?name=paul</span></span>
<span class="line"><span>export const reqD = (params) =&gt; requests({</span></span>
<span class="line"><span>    url: &#39;/c&#39;,</span></span>
<span class="line"><span>    method: &#39;POST&#39;,</span></span>
<span class="line"><span>    params</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 请求主体发送数据：data</span></span>
<span class="line"><span>// 给服务器传递参数params（这里的params是指形参的意思，aioxs规定data为对象）</span></span>
<span class="line"><span>export const reqE = (params) =&gt; requests({</span></span>
<span class="line"><span>    url: &#39;/e&#39;,</span></span>
<span class="line"><span>    method: &#39;POST&#39;,</span></span>
<span class="line"><span>    data: params</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 混合带参，很奇怪。 1.请求参数：params参数  2.请求体参数data</span></span>
<span class="line"><span>export const reqF = (params, data) =&gt; requests({</span></span>
<span class="line"><span>    url: \`/f/\${params}\`,</span></span>
<span class="line"><span>    method: &#39;POST&#39;,</span></span>
<span class="line"><span>    data</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div>`,54)]))}const d=n(l,[["render",r]]);export{m as __pageData,d as default};
