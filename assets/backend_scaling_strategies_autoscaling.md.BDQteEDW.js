import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"开发原则-扩展策略-自动扩缩 学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/scaling/strategies/autoscaling.md","filePath":"backend/scaling/strategies/autoscaling.md"}'),_={name:"backend/scaling/strategies/autoscaling.md"};function h(l,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="开发原则-扩展策略-自动扩缩-学习笔记" tabindex="-1">开发原则-扩展策略-自动扩缩 学习笔记 <a class="header-anchor" href="#开发原则-扩展策略-自动扩缩-学习笔记" aria-label="Permalink to &quot;开发原则-扩展策略-自动扩缩 学习笔记&quot;">​</a></h1><h2 id="_1-开发原则" tabindex="-1">1. 开发原则 <a class="header-anchor" href="#_1-开发原则" aria-label="Permalink to &quot;1. 开发原则&quot;">​</a></h2><h3 id="_1-1-solid-原则" tabindex="-1">1.1 SOLID 原则 <a class="header-anchor" href="#_1-1-solid-原则" aria-label="Permalink to &quot;1.1 SOLID 原则&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[SOLID原则] --&gt; B[单一职责原则]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[开闭原则]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[里氏替换原则]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[接口隔离原则]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[依赖倒置原则]</span></span></code></pre></div><h4 id="_1-1-1-单一职责原则-srp" tabindex="-1">1.1.1 单一职责原则 (SRP) <a class="header-anchor" href="#_1-1-1-单一职责原则-srp" aria-label="Permalink to &quot;1.1.1 单一职责原则 (SRP)&quot;">​</a></h4><ul><li>一个类只负责一个功能领域</li><li>降低复杂度，提高可维护性</li><li>示例：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> sendEmail</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> generateReport</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 正确示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EmailService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> sendEmail</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ReportService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> generateReport</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_1-1-2-开闭原则-ocp" tabindex="-1">1.1.2 开闭原则 (OCP) <a class="header-anchor" href="#_1-1-2-开闭原则-ocp" aria-label="Permalink to &quot;1.1.2 开闭原则 (OCP)&quot;">​</a></h4><ul><li>对扩展开放，对修改关闭</li><li>使用抽象和接口实现扩展性</li><li>示例：</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> PaymentProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CreditCardProcessor</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> PaymentProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PayPalProcessor</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> PaymentProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">/*...*/</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-2-dry-原则" tabindex="-1">1.2 DRY 原则 <a class="header-anchor" href="#_1-2-dry-原则" aria-label="Permalink to &quot;1.2 DRY 原则&quot;">​</a></h3><ul><li>Don&#39;t Repeat Yourself</li><li>避免代码重复，提高复用性</li><li>通过抽象和模块化实现</li></ul><h3 id="_1-3-kiss-原则" tabindex="-1">1.3 KISS 原则 <a class="header-anchor" href="#_1-3-kiss-原则" aria-label="Permalink to &quot;1.3 KISS 原则&quot;">​</a></h3><ul><li>Keep It Simple, Stupid</li><li>保持代码简单易懂</li><li>避免过度设计</li></ul><h3 id="_1-4-yagni-原则" tabindex="-1">1.4 YAGNI 原则 <a class="header-anchor" href="#_1-4-yagni-原则" aria-label="Permalink to &quot;1.4 YAGNI 原则&quot;">​</a></h3><ul><li>You Aren&#39;t Gonna Need It</li><li>只实现当前需要的功能</li><li>避免预先过度优化</li></ul><h2 id="_2-扩展策略" tabindex="-1">2. 扩展策略 <a class="header-anchor" href="#_2-扩展策略" aria-label="Permalink to &quot;2. 扩展策略&quot;">​</a></h2><h3 id="_2-1-扩展维度" tabindex="-1">2.1 扩展维度 <a class="header-anchor" href="#_2-1-扩展维度" aria-label="Permalink to &quot;2.1 扩展维度&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[扩展策略] --&gt; B[水平扩展]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[垂直扩展]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[负载均衡]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[分布式系统]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[微服务架构]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; G[增加CPU]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; H[增加内存]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; I[增加存储]</span></span></code></pre></div><h3 id="_2-2-水平扩展-scale-out" tabindex="-1">2.2 水平扩展 (Scale Out) <a class="header-anchor" href="#_2-2-水平扩展-scale-out" aria-label="Permalink to &quot;2.2 水平扩展 (Scale Out)&quot;">​</a></h3><ul><li>增加更多服务器实例</li><li><strong>优点</strong>：理论上无限扩展，高可用性</li><li><strong>缺点</strong>：复杂度高，需要分布式系统设计</li></ul><h3 id="_2-3-垂直扩展-scale-up" tabindex="-1">2.3 垂直扩展 (Scale Up) <a class="header-anchor" href="#_2-3-垂直扩展-scale-up" aria-label="Permalink to &quot;2.3 垂直扩展 (Scale Up)&quot;">​</a></h3><ul><li>增强单个服务器配置</li><li><strong>优点</strong>：实现简单，无需修改代码</li><li><strong>缺点</strong>：存在物理上限，成本高</li></ul><h3 id="_2-4-扩展模式" tabindex="-1">2.4 扩展模式 <a class="header-anchor" href="#_2-4-扩展模式" aria-label="Permalink to &quot;2.4 扩展模式&quot;">​</a></h3><h4 id="_2-4-1-数据库扩展策略" tabindex="-1">2.4.1 数据库扩展策略 <a class="header-anchor" href="#_2-4-1-数据库扩展策略" aria-label="Permalink to &quot;2.4.1 数据库扩展策略&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[数据库扩展] --&gt; B[读写分离]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[分库分表]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[数据分区]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[主从复制]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[多主复制]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; G[垂直分库]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; H[水平分表]</span></span></code></pre></div><h4 id="_2-4-2-缓存策略" tabindex="-1">2.4.2 缓存策略 <a class="header-anchor" href="#_2-4-2-缓存策略" aria-label="Permalink to &quot;2.4.2 缓存策略&quot;">​</a></h4><ul><li>客户端缓存</li><li>CDN缓存</li><li>反向代理缓存</li><li>应用层缓存</li><li>数据库缓存</li></ul><h3 id="_2-5-微服务架构扩展" tabindex="-1">2.5 微服务架构扩展 <a class="header-anchor" href="#_2-5-微服务架构扩展" aria-label="Permalink to &quot;2.5 微服务架构扩展&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 服务发现示例</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> DiscoveryClient discoveryClient;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">ServiceInstance</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getAvailableInstances</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> discoveryClient.</span><span class="__shiki_1t8gfj">getInstances</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user-service&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-测试策略" tabindex="-1">3. 测试策略 <a class="header-anchor" href="#_3-测试策略" aria-label="Permalink to &quot;3. 测试策略&quot;">​</a></h2><h3 id="_3-1-测试金字塔" tabindex="-1">3.1 测试金字塔 <a class="header-anchor" href="#_3-1-测试金字塔" aria-label="Permalink to &quot;3.1 测试金字塔&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试金字塔] --&gt; B[单元测试 70%]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[集成测试 20%]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[端到端测试 10%]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[快速执行]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[高覆盖率]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; G[服务间测试]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; H[数据库集成]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; I[用户场景测试]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; J[系统整体验证]</span></span></code></pre></div><h3 id="_3-2-测试类型详解" tabindex="-1">3.2 测试类型详解 <a class="header-anchor" href="#_3-2-测试类型详解" aria-label="Permalink to &quot;3.2 测试类型详解&quot;">​</a></h3><h4 id="_3-2-1-单元测试" tabindex="-1">3.2.1 单元测试 <a class="header-anchor" href="#_3-2-1-单元测试" aria-label="Permalink to &quot;3.2.1 单元测试&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// JUnit 示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserServiceTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> shouldCreateUserWhenValidInput</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Given</span></span>
<span class="line"><span class="__shiki_140thh">        UserService service </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        UserRequest request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // When</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> service.</span><span class="__shiki_1t8gfj">createUser</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertNotNull</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john&quot;</span><span class="__shiki_140thh">, user.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-集成测试" tabindex="-1">3.2.2 集成测试 <a class="header-anchor" href="#_3-2-2-集成测试" aria-label="Permalink to &quot;3.2.2 集成测试&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">SpringBootTest</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserIntegrationTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> TestRestTemplate restTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> shouldCreateAndRetrieveUser</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建用户</span></span>
<span class="line"><span class="__shiki_140thh">        UserRequest request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        ResponseEntity&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> restTemplate.</span><span class="__shiki_1t8gfj">postForEntity</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/users&quot;</span><span class="__shiki_140thh">, request, User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证响应</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertEquals</span><span class="__shiki_140thh">(HttpStatus.CREATED, response.</span><span class="__shiki_1t8gfj">getStatusCode</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查询用户</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> restTemplate.</span><span class="__shiki_1t8gfj">getForObject</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/users/{id}&quot;</span><span class="__shiki_140thh">, User.class, response.</span><span class="__shiki_1t8gfj">getBody</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertNotNull</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-3-性能测试" tabindex="-1">3.2.3 性能测试 <a class="header-anchor" href="#_3-2-3-性能测试" aria-label="Permalink to &quot;3.2.3 性能测试&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// JMeter 测试计划示例</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> loadTestUserAPI</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟 1000 并发用户</span></span>
<span class="line"><span class="__shiki_140thh">    JMeterUtils.</span><span class="__shiki_1t8gfj">loadJMeterProperties</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;jmeter.properties&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    TestPlan testPlan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> TestPlan</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User API Load Test&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    ThreadGroup threadGroup </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ThreadGroup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    threadGroup.</span><span class="__shiki_1t8gfj">setNumThreads</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    threadGroup.</span><span class="__shiki_1t8gfj">setRampUp</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-监控与日志" tabindex="-1">3.3 监控与日志 <a class="header-anchor" href="#_3-3-监控与日志" aria-label="Permalink to &quot;3.3 监控与日志&quot;">​</a></h3><h4 id="_3-3-1-应用监控" tabindex="-1">3.3.1 应用监控 <a class="header-anchor" href="#_3-3-1-应用监控" aria-label="Permalink to &quot;3.3.1 应用监控&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus 配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">global</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scrape_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">scrape_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">job_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user-service&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    static_configs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">targets</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;localhost:8080&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics_path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/actuator/prometheus&#39;</span></span></code></pre></div><h4 id="_3-3-2-分布式追踪" tabindex="-1">3.3.2 分布式追踪 <a class="header-anchor" href="#_3-3-2-分布式追踪" aria-label="Permalink to &quot;3.3.2 分布式追踪&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">SpringBootApplication</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Application</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Sampler </span><span class="__shiki_1t8gfj">alwaysSampler</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Sampler.ALWAYS_SAMPLE;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">RestController</span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> UserController</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_140thh"> Tracer tracer;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">GetMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/users/{id}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">getUser</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> String </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            Span span </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tracer.</span><span class="__shiki_1t8gfj">nextSpan</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;getUser&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> (Scope scope </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tracer.</span><span class="__shiki_1t8gfj">withSpan</span><span class="__shiki_140thh">(span)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 业务逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                span.</span><span class="__shiki_1t8gfj">finish</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-自动扩缩容" tabindex="-1">4. 自动扩缩容 <a class="header-anchor" href="#_4-自动扩缩容" aria-label="Permalink to &quot;4. 自动扩缩容&quot;">​</a></h2><h3 id="_4-1-自动扩缩容原理" tabindex="-1">4.1 自动扩缩容原理 <a class="header-anchor" href="#_4-1-自动扩缩容原理" aria-label="Permalink to &quot;4.1 自动扩缩容原理&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[自动扩缩容系统] --&gt; B[监控指标收集]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[决策引擎]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[执行器]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[CPU使用率]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[内存使用率]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; G[请求QPS]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; H[自定义指标]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; I[扩缩容策略]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; J[冷却时间]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; K[稳定窗口]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; L[Kubernetes]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; M[Docker Swarm]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; N[云服务API]</span></span></code></pre></div><h3 id="_4-2-kubernetes-hpa-实现" tabindex="-1">4.2 Kubernetes HPA 实现 <a class="header-anchor" href="#_4-2-kubernetes-hpa-实现" aria-label="Permalink to &quot;4.2 Kubernetes HPA 实现&quot;">​</a></h3><h4 id="_4-2-1-hpa-配置" tabindex="-1">4.2.1 HPA 配置 <a class="header-anchor" href="#_4-2-1-hpa-配置" aria-label="Permalink to &quot;4.2.1 HPA 配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">user-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span></code></pre></div><h4 id="_4-2-2-自定义指标-hpa" tabindex="-1">4.2.2 自定义指标 HPA <a class="header-anchor" href="#_4-2-2-自定义指标-hpa" aria-label="Permalink to &quot;4.2.2 自定义指标 HPA&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">custom-metric-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">order-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">orders_per_minute</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;50&quot;</span></span></code></pre></div><h3 id="_4-3-云服务商自动扩缩容" tabindex="-1">4.3 云服务商自动扩缩容 <a class="header-anchor" href="#_4-3-云服务商自动扩缩容" aria-label="Permalink to &quot;4.3 云服务商自动扩缩容&quot;">​</a></h3><h4 id="_4-3-1-aws-auto-scaling" tabindex="-1">4.3.1 AWS Auto Scaling <a class="header-anchor" href="#_4-3-1-aws-auto-scaling" aria-label="Permalink to &quot;4.3.1 AWS Auto Scaling&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># AWS Auto Scaling Group 配置示例</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> boto3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> boto3.client(</span><span class="__shiki_mdbnqw">&#39;autoscaling&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client.create_auto_scaling_group(</span></span>
<span class="line"><span class="__shiki_1jdh33">    AutoScalingGroupName</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;web-server-asg&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    LaunchConfigurationName</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;web-server-lc&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    MinSize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    MaxSize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    DesiredCapacity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    AvailabilityZones</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;us-east-1a&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;us-east-1b&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">    TargetGroupARNs</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-target/1234567890123456&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建扩缩容策略</span></span>
<span class="line"><span class="__shiki_140thh">response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client.put_scaling_policy(</span></span>
<span class="line"><span class="__shiki_1jdh33">    AutoScalingGroupName</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;web-server-asg&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    PolicyName</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;scale-out-cpu&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    PolicyType</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;TargetTrackingScaling&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    TargetTrackingConfiguration</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PredefinedMetricSpecification&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;PredefinedMetricType&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ASGAverageCPUUtilization&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;TargetValue&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70.0</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_4-3-2-基于队列的自动扩缩容" tabindex="-1">4.3.2 基于队列的自动扩缩容 <a class="header-anchor" href="#_4-3-2-基于队列的自动扩缩容" aria-label="Permalink to &quot;4.3.2 基于队列的自动扩缩容&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> boto3</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> scale_based_on_sqs_queue</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    sqs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> boto3.client(</span><span class="__shiki_mdbnqw">&#39;sqs&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    cloudwatch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> boto3.client(</span><span class="__shiki_mdbnqw">&#39;cloudwatch&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取队列中的消息数量</span></span>
<span class="line"><span class="__shiki_140thh">    queue_url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;https://sqs.us-east-1.amazonaws.com/123456789012/my-queue&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sqs.get_queue_attributes(</span></span>
<span class="line"><span class="__shiki_1jdh33">        QueueUrl</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">queue_url,</span></span>
<span class="line"><span class="__shiki_1jdh33">        AttributeNames</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;ApproximateNumberOfMessages&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    message_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> int</span><span class="__shiki_140thh">(response[</span><span class="__shiki_mdbnqw">&#39;Attributes&#39;</span><span class="__shiki_140thh">][</span><span class="__shiki_mdbnqw">&#39;ApproximateNumberOfMessages&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根据消息数量决定扩缩容</span></span>
<span class="line"><span class="__shiki_140thh">    autoscaling </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> boto3.client(</span><span class="__shiki_mdbnqw">&#39;autoscaling&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> message_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 扩容</span></span>
<span class="line"><span class="__shiki_140thh">        autoscaling.set_desired_capacity(</span></span>
<span class="line"><span class="__shiki_1jdh33">            AutoScalingGroupName</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;worker-asg&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            DesiredCapacity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">    elif</span><span class="__shiki_140thh"> message_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缩容</span></span>
<span class="line"><span class="__shiki_140thh">        autoscaling.set_desired_capacity(</span></span>
<span class="line"><span class="__shiki_1jdh33">            AutoScalingGroupName</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;worker-asg&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            DesiredCapacity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span></code></pre></div><h3 id="_4-4-自动扩缩容最佳实践" tabindex="-1">4.4 自动扩缩容最佳实践 <a class="header-anchor" href="#_4-4-自动扩缩容最佳实践" aria-label="Permalink to &quot;4.4 自动扩缩容最佳实践&quot;">​</a></h3><h4 id="_4-4-1-渐进式扩缩容" tabindex="-1">4.4.1 渐进式扩缩容 <a class="header-anchor" href="#_4-4-1-渐进式扩缩容" aria-label="Permalink to &quot;4.4.1 渐进式扩缩容&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes HPA 行为配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">progressive-scaling-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">      selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Max</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">120</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span></code></pre></div><h4 id="_4-4-2-多维度指标" tabindex="-1">4.4.2 多维度指标 <a class="header-anchor" href="#_4-4-2-多维度指标" aria-label="Permalink to &quot;4.4.2 多维度指标&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">multi-metric-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">70</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">memory</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span></code></pre></div><h2 id="_5-完整示例-电商系统扩缩容策略" tabindex="-1">5. 完整示例：电商系统扩缩容策略 <a class="header-anchor" href="#_5-完整示例-电商系统扩缩容策略" aria-label="Permalink to &quot;5. 完整示例：电商系统扩缩容策略&quot;">​</a></h2><h3 id="_5-1-架构设计" tabindex="-1">5.1 架构设计 <a class="header-anchor" href="#_5-1-架构设计" aria-label="Permalink to &quot;5.1 架构设计&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[负载均衡器] --&gt; B[前端服务]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[商品服务]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[订单服务]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[用户服务]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[Redis缓存]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; G[MySQL主库]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; G</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[MySQL从库]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    I[监控系统] --&gt; J[Prometheus]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; K[Grafana]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; L[Alert Manager]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    M[HPA控制器] --&gt; N[Kubernetes集群]</span></span></code></pre></div><h3 id="_5-2-完整配置示例" tabindex="-1">5.2 完整配置示例 <a class="header-anchor" href="#_5-2-完整配置示例" aria-label="Permalink to &quot;5.2 完整配置示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 商品服务 Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        prometheus.io/scrape</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        prometheus.io/port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;8080&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">500m</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">512Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/actuator/health</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/actuator/health</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 商品服务 HPA</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling/v2</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HorizontalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service-hpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  scaleTargetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">product-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  minReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">  maxReplicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">  metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">75</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Resource</span></span>
<span class="line"><span class="__shiki_17hn0y">    resource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">memory</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Utilization</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageUtilization</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">    pods</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      metric</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http_requests_per_second</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AverageValue</span></span>
<span class="line"><span class="__shiki_17hn0y">        averageValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;200&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleUp</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Percent</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">      selectPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Max</span></span>
<span class="line"><span class="__shiki_17hn0y">    scaleDown</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      stabilizationWindowSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">      policies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pods</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">120</span></span></code></pre></div><h3 id="_5-3-监控告警配置" tabindex="-1">5.3 监控告警配置 <a class="header-anchor" href="#_5-3-监控告警配置" aria-label="Permalink to &quot;5.3 监控告警配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus 告警规则</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hpa.alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HPA ScalingFailed</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube_horizontalpodautoscaler_status_condition{condition=&quot;ScalingLimited&quot;, status=&quot;true&quot;} == 1</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HPA {{ $labels.horizontalpodautoscaler }} scaling failed&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HPA {{ $labels.horizontalpodautoscaler }} has been unable to scale for 5 minutes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HPA HighCPU</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">(sum(rate(container_cpu_usage_seconds_total{container!=&quot;POD&quot;,pod=~&quot;product-service.*&quot;}[5m])) by (pod) / sum(container_spec_cpu_quota{container!=&quot;POD&quot;,pod=~&quot;product-service.*&quot;} / 100000) by (pod)) * 100 &gt; 85</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;High CPU usage in product service&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CPU usage is above 85% for pod {{ $labels.pod }}&quot;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本学习笔记涵盖了从开发原则到自动扩缩容的完整知识体系：</p><ol><li><strong>开发原则</strong>：建立良好的代码基础，确保系统可维护性和扩展性</li><li><strong>扩展策略</strong>：设计可扩展的架构，支持水平扩展和垂直扩展</li><li><strong>测试策略</strong>：建立完整的测试体系，确保系统质量和稳定性</li><li><strong>自动扩缩容</strong>：实现基于指标的自动资源管理，提高资源利用率</li></ol><p>这些概念和技术的结合使用，可以构建出既健壮又具有弹性的分布式系统。</p>`,74)])])}const d=a(_,[["render",h]]);export{r as __pageData,d as default};
