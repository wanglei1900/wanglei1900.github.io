import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"测试策略、单元测试与测试替身完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/testing/unit/parameterized.md","filePath":"backend/testing/unit/parameterized.md"}'),p={name:"backend/testing/unit/parameterized.md"};function h(l,s,t,e,c,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="测试策略、单元测试与测试替身完整学习笔记" tabindex="-1">测试策略、单元测试与测试替身完整学习笔记 <a class="header-anchor" href="#测试策略、单元测试与测试替身完整学习笔记" aria-label="Permalink to &quot;测试策略、单元测试与测试替身完整学习笔记&quot;">​</a></h1><h2 id="_1-测试策略" tabindex="-1">1. 测试策略 <a class="header-anchor" href="#_1-测试策略" aria-label="Permalink to &quot;1. 测试策略&quot;">​</a></h2><h3 id="_1-1-测试策略定义" tabindex="-1">1.1 测试策略定义 <a class="header-anchor" href="#_1-1-测试策略定义" aria-label="Permalink to &quot;1.1 测试策略定义&quot;">​</a></h3><p>测试策略是指导整个测试过程的<strong>高层次文档</strong>，定义了测试的目标、范围、方法和资源配置。</p><h3 id="_1-2-测试策略关键要素" tabindex="-1">1.2 测试策略关键要素 <a class="header-anchor" href="#_1-2-测试策略关键要素" aria-label="Permalink to &quot;1.2 测试策略关键要素&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试策略] --&gt; B[测试目标]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[测试范围]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[测试方法]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[资源分配]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[风险管理]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; G[准入准出标准]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[功能验证]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[质量保证]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[风险降低]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[测试类型]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[测试技术]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[测试级别]</span></span></code></pre></div><h4 id="_1-2-1-测试目标" tabindex="-1">1.2.1 测试目标 <a class="header-anchor" href="#_1-2-1-测试目标" aria-label="Permalink to &quot;1.2.1 测试目标&quot;">​</a></h4><ul><li>验证软件满足需求规格</li><li>发现缺陷</li><li>评估软件质量</li><li>提供质量信心</li></ul><h4 id="_1-2-2-测试范围" tabindex="-1">1.2.2 测试范围 <a class="header-anchor" href="#_1-2-2-测试范围" aria-label="Permalink to &quot;1.2.2 测试范围&quot;">​</a></h4><ul><li>功能测试范围</li><li>非功能测试范围（性能、安全、可用性）</li><li>排除范围（明确不测试的部分）</li></ul><h4 id="_1-2-3-测试级别" tabindex="-1">1.2.3 测试级别 <a class="header-anchor" href="#_1-2-3-测试级别" aria-label="Permalink to &quot;1.2.3 测试级别&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[单元测试] --&gt; B[集成测试]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[系统测试]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[验收测试]</span></span></code></pre></div><h3 id="_1-3-测试策略类型" tabindex="-1">1.3 测试策略类型 <a class="header-anchor" href="#_1-3-测试策略类型" aria-label="Permalink to &quot;1.3 测试策略类型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>策略类型</th><th>描述</th><th>适用场景</th></tr></thead><tbody><tr><td>分析型策略</td><td>基于需求规格的系统分析</td><td>需求明确的项目</td></tr><tr><td>模型型策略</td><td>基于业务流程或系统模型</td><td>复杂业务流程</td></tr><tr><td>方法型策略</td><td>使用预定义测试方法</td><td>标准化项目</td></tr><tr><td>合规型策略</td><td>满足特定标准/法规</td><td>医疗、金融等行业</td></tr><tr><td>反应型策略</td><td>基于实际运行情况调整</td><td>敏捷、探索性测试</td></tr></tbody></table><h2 id="_2-单元测试" tabindex="-1">2. 单元测试 <a class="header-anchor" href="#_2-单元测试" aria-label="Permalink to &quot;2. 单元测试&quot;">​</a></h2><h3 id="_2-1-单元测试定义" tabindex="-1">2.1 单元测试定义 <a class="header-anchor" href="#_2-1-单元测试定义" aria-label="Permalink to &quot;2.1 单元测试定义&quot;">​</a></h3><p>单元测试是针对<strong>软件最小可测试单元</strong>（通常是函数/方法）的测试。</p><h3 id="_2-2-单元测试特征" tabindex="-1">2.2 单元测试特征 <a class="header-anchor" href="#_2-2-单元测试特征" aria-label="Permalink to &quot;2.2 单元测试特征&quot;">​</a></h3><ul><li><strong>隔离性</strong>：每个测试独立运行</li><li><strong>快速性</strong>：执行速度快</li><li><strong>可重复</strong>：结果一致</li><li><strong>自动化</strong>：无需人工干预</li></ul><h3 id="_2-3-单元测试生命周期" tabindex="-1">2.3 单元测试生命周期 <a class="header-anchor" href="#_2-3-单元测试生命周期" aria-label="Permalink to &quot;2.3 单元测试生命周期&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant T as 测试用例</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as 测试套件</span></span>
<span class="line"><span class="__shiki_140thh">    participant R as 测试运行器</span></span>
<span class="line"><span class="__shiki_140thh">    participant F as 被测代码</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;T: 初始化测试数据</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;F: 调用被测方法</span></span>
<span class="line"><span class="__shiki_140thh">    F-&gt;&gt;F: 执行代码逻辑</span></span>
<span class="line"><span class="__shiki_140thh">    F-&gt;&gt;T: 返回结果</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;T: 验证结果</span></span>
<span class="line"><span class="__shiki_140thh">    T-&gt;&gt;S: 报告测试结果</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;R: 汇总所有测试</span></span>
<span class="line"><span class="__shiki_140thh">    R-&gt;&gt;R: 生成测试报告</span></span></code></pre></div><h3 id="_2-4-单元测试结构-aaa模式" tabindex="-1">2.4 单元测试结构（AAA模式） <a class="header-anchor" href="#_2-4-单元测试结构-aaa模式" aria-label="Permalink to &quot;2.4 单元测试结构（AAA模式）&quot;">​</a></h3><h4 id="_2-4-1-arrange-准备" tabindex="-1">2.4.1 Arrange（准备） <a class="header-anchor" href="#_2-4-1-arrange-准备" aria-label="Permalink to &quot;2.4.1 Arrange（准备）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 准备测试数据和对象</span></span>
<span class="line"><span class="__shiki_140thh">UserService userService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">User testUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john_doe&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_2-4-2-act-执行" tabindex="-1">2.4.2 Act（执行） <a class="header-anchor" href="#_2-4-2-act-执行" aria-label="Permalink to &quot;2.4.2 Act（执行）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 执行被测方法</span></span>
<span class="line"><span class="__shiki_1itgoe">boolean</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">registerUser</span><span class="__shiki_140thh">(testUser);</span></span></code></pre></div><h4 id="_2-4-3-assert-断言" tabindex="-1">2.4.3 Assert（断言） <a class="header-anchor" href="#_2-4-3-assert-断言" aria-label="Permalink to &quot;2.4.3 Assert（断言）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 验证结果</span></span>
<span class="line"><span class="__shiki_1t8gfj">assertTrue</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_1t8gfj">assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, userService.</span><span class="__shiki_1t8gfj">getUserCount</span><span class="__shiki_140thh">());</span></span></code></pre></div><h3 id="_2-5-优秀单元测试的特征-first原则" tabindex="-1">2.5 优秀单元测试的特征（FIRST原则） <a class="header-anchor" href="#_2-5-优秀单元测试的特征-first原则" aria-label="Permalink to &quot;2.5 优秀单元测试的特征（FIRST原则）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>原则</th><th>描述</th><th>示例</th></tr></thead><tbody><tr><td><strong>F</strong>ast</td><td>快速执行</td><td>单个测试 &lt; 100ms</td></tr><tr><td><strong>I</strong>ndependent</td><td>相互独立</td><td>不依赖其他测试状态</td></tr><tr><td><strong>R</strong>epeatable</td><td>可重复</td><td>在任何环境结果一致</td></tr><tr><td><strong>S</strong>elf-validating</td><td>自验证</td><td>自动判断通过/失败</td></tr><tr><td><strong>T</strong>imely</td><td>及时编写</td><td>测试先行或同步编写</td></tr></tbody></table><h3 id="_2-6-单元测试代码示例" tabindex="-1">2.6 单元测试代码示例 <a class="header-anchor" href="#_2-6-单元测试代码示例" aria-label="Permalink to &quot;2.6 单元测试代码示例&quot;">​</a></h3><h4 id="java-junit-5-assertj" tabindex="-1">Java (JUnit 5 + AssertJ) <a class="header-anchor" href="#java-junit-5-assertj" aria-label="Permalink to &quot;Java (JUnit 5 + AssertJ)&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.junit.jupiter.api.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> org.assertj.core.api.Assertions.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CalculatorTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Calculator calculator;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BeforeEach</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> setUp</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        calculator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Calculator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;两个正数相加应返回正确和&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> add_TwoPositiveNumbers_ReturnsCorrectSum</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Arrange</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Act</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(a, b);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Assert</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(result).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;除以零应抛出异常&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> divide_ByZero_ThrowsException</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Arrange</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> numerator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> denominator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Act &amp; Assert</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThatThrownBy</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> calculator.</span><span class="__shiki_1t8gfj">divide</span><span class="__shiki_140thh">(numerator, denominator))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">isInstanceOf</span><span class="__shiki_140thh">(ArithmeticException.class)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">hasMessage</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Division by zero is not allowed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Nested</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;当测试边界情况时&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> BoundaryCases</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;最大值加一应溢出&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        void</span><span class="__shiki_1t8gfj"> add_MaxValuePlusOne_Overflows</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // Arrange</span></span>
<span class="line"><span class="__shiki_1itgoe">            int</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Integer.MAX_VALUE;</span></span>
<span class="line"><span class="__shiki_1itgoe">            int</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // Act</span></span>
<span class="line"><span class="__shiki_1itgoe">            int</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(a, b);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // Assert</span></span>
<span class="line"><span class="__shiki_1t8gfj">            assertThat</span><span class="__shiki_140thh">(result).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(Integer.MIN_VALUE);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="python-pytest" tabindex="-1">Python (pytest) <a class="header-anchor" href="#python-pytest" aria-label="Permalink to &quot;Python (pytest)&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> pytest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TestCalculator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @pytest.fixture</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> calculator</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Calculator()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_add_two_positive_numbers</span><span class="__shiki_140thh">(self, calculator):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Arrange</span></span>
<span class="line"><span class="__shiki_140thh">        a, b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Act</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> calculator.add(a, b)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Assert</span></span>
<span class="line"><span class="__shiki_1itgoe">        assert</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 8</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_divide_by_zero_raises_exception</span><span class="__shiki_140thh">(self, calculator):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Arrange</span></span>
<span class="line"><span class="__shiki_140thh">        numerator, denominator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Act &amp; Assert</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> pytest.raises(</span><span class="__shiki_dzsirb">ValueError</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">match</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;Division by zero&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            calculator.divide(numerator, denominator)</span></span></code></pre></div><h2 id="_3-测试替身-test-doubles" tabindex="-1">3. 测试替身 (Test Doubles) <a class="header-anchor" href="#_3-测试替身-test-doubles" aria-label="Permalink to &quot;3. 测试替身 (Test Doubles)&quot;">​</a></h2><h3 id="_3-1-测试替身概念" tabindex="-1">3.1 测试替身概念 <a class="header-anchor" href="#_3-1-测试替身概念" aria-label="Permalink to &quot;3.1 测试替身概念&quot;">​</a></h3><p>测试替身是在测试中<strong>替代真实组件</strong>的对象，用于控制和隔离被测系统。</p><h3 id="_3-2-测试替身类型对比" tabindex="-1">3.2 测试替身类型对比 <a class="header-anchor" href="#_3-2-测试替身类型对比" aria-label="Permalink to &quot;3.2 测试替身类型对比&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试替身] --&gt; B[Dummy]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Stub]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[Spy]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[Mock]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[Fake]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[占位对象]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[提供预设响应]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[记录调用信息]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[验证行为]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[简化功能实现]</span></span></code></pre></div><h3 id="_3-3-详细类型说明" tabindex="-1">3.3 详细类型说明 <a class="header-anchor" href="#_3-3-详细类型说明" aria-label="Permalink to &quot;3.3 详细类型说明&quot;">​</a></h3><h4 id="_3-3-1-dummy-虚拟对象" tabindex="-1">3.3.1 Dummy（虚拟对象） <a class="header-anchor" href="#_3-3-1-dummy-虚拟对象" aria-label="Permalink to &quot;3.3.1 Dummy（虚拟对象）&quot;">​</a></h4><ul><li><strong>用途</strong>：仅用于填充参数，不被实际使用</li><li><strong>特点</strong>：最简单的测试替身</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Java 示例</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderServiceTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> createOrder_WithDummyCustomer_CreatesOrder</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Arrange - 使用虚拟客户对象</span></span>
<span class="line"><span class="__shiki_140thh">        Customer dummyCustomer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 或者 new Customer()</span></span>
<span class="line"><span class="__shiki_140thh">        OrderService orderService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Act</span></span>
<span class="line"><span class="__shiki_140thh">        Order order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orderService.</span><span class="__shiki_1t8gfj">createOrder</span><span class="__shiki_140thh">(dummyCustomer, Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;item1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;item2&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Assert</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertNotNull</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-stub-桩" tabindex="-1">3.3.2 Stub（桩） <a class="header-anchor" href="#_3-3-2-stub-桩" aria-label="Permalink to &quot;3.3.2 Stub（桩）&quot;">​</a></h4><ul><li><strong>用途</strong>：提供预设的固定响应</li><li><strong>特点</strong>：不验证调用，只提供数据</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Java 示例 - 用户仓库桩</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserRepositoryStub</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> User predefinedUser;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> UserRepositoryStub</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.predefinedUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> predefinedUser; </span><span class="__shiki_21nrsd">// 总是返回预设用户</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> save</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 空实现 - 桩通常不实现所有方法</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用桩的测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> getUser_WithExistingUserId_ReturnsUser</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Arrange</span></span>
<span class="line"><span class="__shiki_140thh">    User expectedUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;John Doe&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    UserRepository userRepository </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserRepositoryStub</span><span class="__shiki_140thh">(expectedUser);</span></span>
<span class="line"><span class="__shiki_140thh">    UserService userService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh">(userRepository);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Act</span></span>
<span class="line"><span class="__shiki_140thh">    User result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">getUser</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;123&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Assert</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(expectedUser, result);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-3-spy-间谍" tabindex="-1">3.3.3 Spy（间谍） <a class="header-anchor" href="#_3-3-3-spy-间谍" aria-label="Permalink to &quot;3.3.3 Spy（间谍）&quot;">​</a></h4><ul><li><strong>用途</strong>：记录调用信息的桩</li><li><strong>特点</strong>：既提供预设响应，又记录调用历史</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Java 示例 - 邮件服务间谍</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> EmailServiceSpy</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> EmailService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; sentEmails </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> sendCallCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> sendEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">to</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">subject</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">body</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        sendCallCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        String emailInfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> String.</span><span class="__shiki_1t8gfj">format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;To: %s, Subject: %s&quot;</span><span class="__shiki_140thh">, to, subject);</span></span>
<span class="line"><span class="__shiki_140thh">        sentEmails.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(emailInfo);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 预设响应</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> getSendCallCount</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> sendCallCount;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getSentEmails</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;(sentEmails);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> wasEmailSentTo</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> sentEmails.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">anyMatch</span><span class="__shiki_140thh">(e </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> e.</span><span class="__shiki_1t8gfj">contains</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;To: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> email));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用间谍的测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> notifyUsers_SendsEmailsToAllUsers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Arrange</span></span>
<span class="line"><span class="__shiki_140thh">    EmailServiceSpy emailSpy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> EmailServiceSpy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    NotificationService notificationService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> NotificationService</span><span class="__shiki_140thh">(emailSpy);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Arrays.</span><span class="__shiki_1t8gfj">asList</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user1@example.com&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user2@example.com&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Act</span></span>
<span class="line"><span class="__shiki_140thh">    notificationService.</span><span class="__shiki_1t8gfj">notifyUsers</span><span class="__shiki_140thh">(users, </span><span class="__shiki_mdbnqw">&quot;Test Subject&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Test Body&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Assert</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, emailSpy.</span><span class="__shiki_1t8gfj">getSendCallCount</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertTrue</span><span class="__shiki_140thh">(emailSpy.</span><span class="__shiki_1t8gfj">wasEmailSentTo</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user1@example.com&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertTrue</span><span class="__shiki_140thh">(emailSpy.</span><span class="__shiki_1t8gfj">wasEmailSentTo</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user2@example.com&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-4-mock-模拟对象" tabindex="-1">3.3.4 Mock（模拟对象） <a class="header-anchor" href="#_3-3-4-mock-模拟对象" aria-label="Permalink to &quot;3.3.4 Mock（模拟对象）&quot;">​</a></h4><ul><li><strong>用途</strong>：验证对象间的交互</li><li><strong>特点</strong>：设置期望，验证行为</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Java 示例 - 使用 Mockito</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> org.mockito.Mockito.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> processOrder_ValidOrder_CallsRepositoryAndNotification</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Arrange</span></span>
<span class="line"><span class="__shiki_140thh">    OrderRepository mockOrderRepo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(OrderRepository.class);</span></span>
<span class="line"><span class="__shiki_140thh">    NotificationService mockNotification </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(NotificationService.class);</span></span>
<span class="line"><span class="__shiki_140thh">    OrderService orderService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh">(mockOrderRepo, mockNotification);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Order testOrder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order123&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100.0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置mock行为</span></span>
<span class="line"><span class="__shiki_1t8gfj">    when</span><span class="__shiki_140thh">(mockOrderRepo.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(Order.class))).</span><span class="__shiki_1t8gfj">thenReturn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    doNothing</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">when</span><span class="__shiki_140thh">(mockNotification).</span><span class="__shiki_1t8gfj">sendOrderConfirmation</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">anyString</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Act</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orderService.</span><span class="__shiki_1t8gfj">processOrder</span><span class="__shiki_140thh">(testOrder);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Assert - 验证交互</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertTrue</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    verify</span><span class="__shiki_140thh">(mockOrderRepo, </span><span class="__shiki_1t8gfj">times</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)).</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(testOrder);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    verify</span><span class="__shiki_140thh">(mockNotification, </span><span class="__shiki_1t8gfj">times</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)).</span><span class="__shiki_1t8gfj">sendOrderConfirmation</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order123&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    verify</span><span class="__shiki_140thh">(mockOrderRepo, </span><span class="__shiki_1t8gfj">never</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(Order.class));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-5-fake-伪造对象" tabindex="-1">3.3.5 Fake（伪造对象） <a class="header-anchor" href="#_3-3-5-fake-伪造对象" aria-label="Permalink to &quot;3.3.5 Fake（伪造对象）&quot;">​</a></h4><ul><li><strong>用途</strong>：提供简化但可工作的实现</li><li><strong>特点</strong>：用于测试的轻量级实现</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Java 示例 - 内存用户仓库</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> InMemoryUserRepository</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> AtomicLong idCounter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AtomicLong</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">findByEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(user </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> email.</span><span class="__shiki_1t8gfj">equals</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">findFirst</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">orElse</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> save</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (user.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">setId</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> idCounter.</span><span class="__shiki_1t8gfj">getAndIncrement</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        users.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">(), user);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> delete</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        users.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;(users.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试辅助方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> clear</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        users.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> size</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用伪造对象的测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> userLifecycle_WithFakeRepository_WorksCorrectly</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Arrange</span></span>
<span class="line"><span class="__shiki_140thh">    InMemoryUserRepository fakeRepo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> InMemoryUserRepository</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    UserService userService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh">(fakeRepo);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    User newUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Test User&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Act &amp; Assert</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建用户</span></span>
<span class="line"><span class="__shiki_140thh">    userService.</span><span class="__shiki_1t8gfj">createUser</span><span class="__shiki_140thh">(newUser);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, fakeRepo.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找用户</span></span>
<span class="line"><span class="__shiki_140thh">    User found </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">findUserByEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertNotNull</span><span class="__shiki_140thh">(found);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertNotNull</span><span class="__shiki_140thh">(found.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 删除用户</span></span>
<span class="line"><span class="__shiki_140thh">    userService.</span><span class="__shiki_1t8gfj">deleteUser</span><span class="__shiki_140thh">(found.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, fakeRepo.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-测试替身选择指南" tabindex="-1">3.4 测试替身选择指南 <a class="header-anchor" href="#_3-4-测试替身选择指南" aria-label="Permalink to &quot;3.4 测试替身选择指南&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[需要测试替身?] --&gt; B{需要什么功能?}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[仅需填充参数]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[需要预设响应]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; E[需要记录调用]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; F[需要验证交互]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; G[需要真实但轻量实现]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[使用Dummy]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[使用Stub]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[使用Spy]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[使用Mock]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; G1[使用Fake]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C1 --&gt; H[完成选择]</span></span>
<span class="line"><span class="__shiki_140thh">    D1 --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    E1 --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    F1 --&gt; H</span></span>
<span class="line"><span class="__shiki_140thh">    G1 --&gt; H</span></span></code></pre></div><h3 id="_3-5-测试替身最佳实践" tabindex="-1">3.5 测试替身最佳实践 <a class="header-anchor" href="#_3-5-测试替身最佳实践" aria-label="Permalink to &quot;3.5 测试替身最佳实践&quot;">​</a></h3><h4 id="_3-5-1-命名约定" tabindex="-1">3.5.1 命名约定 <a class="header-anchor" href="#_3-5-1-命名约定" aria-label="Permalink to &quot;3.5.1 命名约定&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 好的命名</span></span>
<span class="line"><span class="__shiki_140thh">UserRepository userRepositoryStub </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserRepositoryStub</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">EmailService emailServiceMock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(EmailService.class);</span></span>
<span class="line"><span class="__shiki_140thh">OrderService orderServiceSpy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> spy</span><span class="__shiki_140thh">(OrderService.class);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 避免的命名</span></span>
<span class="line"><span class="__shiki_140thh">UserRepository repo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserRepositoryStub</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 不清楚类型</span></span>
<span class="line"><span class="__shiki_140thh">EmailService mock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(EmailService.class);   </span><span class="__shiki_21nrsd">// 无意义名称</span></span></code></pre></div><h4 id="_3-5-2-避免过度使用mock" tabindex="-1">3.5.2 避免过度使用Mock <a class="header-anchor" href="#_3-5-2-避免过度使用mock" aria-label="Permalink to &quot;3.5.2 避免过度使用Mock&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 不好 - 过度mock</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> poorTest_OverMocking</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    UserService mockUserService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(UserService.class);</span></span>
<span class="line"><span class="__shiki_140thh">    OrderService mockOrderService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(OrderService.class);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 太多mock，测试变得复杂</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 好 - 合理使用测试替身</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> goodTest_BalancedApproach</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对慢/不稳定的依赖使用mock</span></span>
<span class="line"><span class="__shiki_140thh">    ExternalPaymentService paymentMock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(ExternalPaymentService.class);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 对数据访问使用fake</span></span>
<span class="line"><span class="__shiki_140thh">    OrderRepository orderFake </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> InMemoryOrderRepository</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 被测服务使用真实对象</span></span>
<span class="line"><span class="__shiki_140thh">    OrderProcessor processor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> OrderProcessor</span><span class="__shiki_140thh">(orderFake, paymentMock);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-测试策略与单元测试的集成" tabindex="-1">4. 测试策略与单元测试的集成 <a class="header-anchor" href="#_4-测试策略与单元测试的集成" aria-label="Permalink to &quot;4. 测试策略与单元测试的集成&quot;">​</a></h2><h3 id="_4-1-测试金字塔" tabindex="-1">4.1 测试金字塔 <a class="header-anchor" href="#_4-1-测试金字塔" aria-label="Permalink to &quot;4.1 测试金字塔&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试金字塔] --&gt; B[少量UI测试&lt;br/&gt;高价值场景]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[更多集成测试&lt;br/&gt;组件交互]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[大量单元测试&lt;br/&gt;快速反馈]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[慢速&lt;br/&gt;脆弱&lt;br/&gt;高成本]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[中等速度&lt;br/&gt;中等成本]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[快速&lt;br/&gt;稳定&lt;br/&gt;低成本]</span></span></code></pre></div><h3 id="_4-2-测试策略实施计划" tabindex="-1">4.2 测试策略实施计划 <a class="header-anchor" href="#_4-2-测试策略实施计划" aria-label="Permalink to &quot;4.2 测试策略实施计划&quot;">​</a></h3><h4 id="_4-2-1-阶段1-建立基础" tabindex="-1">4.2.1 阶段1：建立基础 <a class="header-anchor" href="#_4-2-1-阶段1-建立基础" aria-label="Permalink to &quot;4.2.1 阶段1：建立基础&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 搭建测试框架</span></span>
<span class="line"><span class="__shiki_21nrsd">// pom.xml (Maven)</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">dependencies</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;</span><span class="__shiki_140thh">dependency</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">groupId</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">org.junit.jupiter</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">groupId</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">artifactId</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">junit</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">jupiter</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">artifactId</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">version</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb">5.9</span><span class="__shiki_140thh">.</span><span class="__shiki_2bbn9v">2</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">version</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">scope</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">test</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">scope</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;/</span><span class="__shiki_140thh">dependency</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;</span><span class="__shiki_140thh">dependency</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">groupId</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">org.mockito</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">groupId</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">artifactId</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">mockito</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">core</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">artifactId</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">version</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb">4.11</span><span class="__shiki_140thh">.</span><span class="__shiki_2bbn9v">0</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">version</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">scope</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">test</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">scope</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;/</span><span class="__shiki_140thh">dependency</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">dependencies</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h4 id="_4-2-2-阶段2-制定测试标准" tabindex="-1">4.2.2 阶段2：制定测试标准 <a class="header-anchor" href="#_4-2-2-阶段2-制定测试标准" aria-label="Permalink to &quot;4.2.2 阶段2：制定测试标准&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 测试命名标准</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserRegistrationTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模式: methodName_Scenario_ExpectedResult</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> register_WithValidUser_ReturnsSuccess</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> register_WithDuplicateEmail_ThrowsException</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> register_WithWeakPassword_ReturnsValidationError</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-3-阶段3-持续改进" tabindex="-1">4.2.3 阶段3：持续改进 <a class="header-anchor" href="#_4-2-3-阶段3-持续改进" aria-label="Permalink to &quot;4.2.3 阶段3：持续改进&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 定期审查测试质量</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> TestQualityMetrics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试覆盖率目标</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> LINE_COVERAGE_TARGET </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> BRANCH_COVERAGE_TARGET </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.75</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试执行时间目标</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> UNIT_TEST_TIMEOUT_MS </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-高级主题" tabindex="-1">5. 高级主题 <a class="header-anchor" href="#_5-高级主题" aria-label="Permalink to &quot;5. 高级主题&quot;">​</a></h2><h3 id="_5-1-测试驱动开发-tdd" tabindex="-1">5.1 测试驱动开发 (TDD) <a class="header-anchor" href="#_5-1-测试驱动开发-tdd" aria-label="Permalink to &quot;5.1 测试驱动开发 (TDD)&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[红] --&gt; B[编写失败测试]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[绿]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[编写最少代码通过测试]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[重构]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[改进代码设计]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; A</span></span></code></pre></div><h3 id="_5-2-行为驱动开发-bdd" tabindex="-1">5.2 行为驱动开发 (BDD) <a class="header-anchor" href="#_5-2-行为驱动开发-bdd" aria-label="Permalink to &quot;5.2 行为驱动开发 (BDD)&quot;">​</a></h3><div class="language-gherkin vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gherkin</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">// 功能文件: user_registration.feature</span></span>
<span class="line"><span class="__shiki_1itgoe">Feature</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw"> User Registration</span></span>
<span class="line"><span class="__shiki_140thh">  As a new user</span></span>
<span class="line"><span class="__shiki_140thh">  I want to register an account</span></span>
<span class="line"><span class="__shiki_140thh">  So that I can access the application</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  Scenario</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw"> Successful registration with valid data</span></span>
<span class="line"><span class="__shiki_1itgoe">    Given </span><span class="__shiki_140thh">I am on the registration page</span></span>
<span class="line"><span class="__shiki_1itgoe">    When </span><span class="__shiki_140thh">I enter valid user information</span></span>
<span class="line"><span class="__shiki_1itgoe">    And </span><span class="__shiki_140thh">I submit the registration form</span></span>
<span class="line"><span class="__shiki_1itgoe">    Then </span><span class="__shiki_140thh">I should see a success message</span></span>
<span class="line"><span class="__shiki_1itgoe">    And </span><span class="__shiki_140thh">I should receive a confirmation email</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  Scenario</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw"> Registration fails with duplicate email</span></span>
<span class="line"><span class="__shiki_1itgoe">    Given </span><span class="__shiki_140thh">a user with email </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh"> already exists</span></span>
<span class="line"><span class="__shiki_1itgoe">    When </span><span class="__shiki_140thh">I try to register with email </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Then </span><span class="__shiki_140thh">I should see an error message </span><span class="__shiki_mdbnqw">&quot;Email already exists&quot;</span></span></code></pre></div><h2 id="_6-总结" tabindex="-1">6. 总结 <a class="header-anchor" href="#_6-总结" aria-label="Permalink to &quot;6. 总结&quot;">​</a></h2><h3 id="_6-1-关键要点" tabindex="-1">6.1 关键要点 <a class="header-anchor" href="#_6-1-关键要点" aria-label="Permalink to &quot;6.1 关键要点&quot;">​</a></h3><ol><li><strong>测试策略</strong>提供测试工作的整体方向和框架</li><li><strong>单元测试</strong>确保代码单元的正确性，提供快速反馈</li><li><strong>测试替身</strong>帮助隔离被测代码，提高测试稳定性和速度</li></ol><h3 id="_6-2-成功因素" tabindex="-1">6.2 成功因素 <a class="header-anchor" href="#_6-2-成功因素" aria-label="Permalink to &quot;6.2 成功因素&quot;">​</a></h3><ul><li>选择合适的测试替身类型</li><li>保持测试的独立性和可维护性</li><li>平衡测试覆盖率和测试成本</li><li>将测试作为开发过程的核心部分</li></ul><p>这份学习笔记涵盖了测试策略、单元测试和测试替身的核心概念和实践方法，可以作为学习和实施软件测试的全面参考。</p>`,84)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
