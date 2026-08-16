import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"测试策略-单元测试-测试驱动开发完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/testing/unit/tdd.md","filePath":"backend/testing/unit/tdd.md"}'),_={name:"backend/testing/unit/tdd.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="测试策略-单元测试-测试驱动开发完整学习笔记" tabindex="-1">测试策略-单元测试-测试驱动开发完整学习笔记 <a class="header-anchor" href="#测试策略-单元测试-测试驱动开发完整学习笔记" aria-label="Permalink to &quot;测试策略-单元测试-测试驱动开发完整学习笔记&quot;">​</a></h1><h2 id="_1-测试策略" tabindex="-1">1. 测试策略 <a class="header-anchor" href="#_1-测试策略" aria-label="Permalink to &quot;1. 测试策略&quot;">​</a></h2><h3 id="_1-1-测试策略定义与重要性" tabindex="-1">1.1 测试策略定义与重要性 <a class="header-anchor" href="#_1-1-测试策略定义与重要性" aria-label="Permalink to &quot;1.1 测试策略定义与重要性&quot;">​</a></h3><h4 id="_1-1-1-定义" tabindex="-1">1.1.1 定义 <a class="header-anchor" href="#_1-1-1-定义" aria-label="Permalink to &quot;1.1.1 定义&quot;">​</a></h4><p>测试策略是指导测试活动的<strong>高层文档</strong>，定义了测试的<strong>目标、范围、方法、资源和进度</strong>。</p><h4 id="_1-1-2-重要性" tabindex="-1">1.1.2 重要性 <a class="header-anchor" href="#_1-1-2-重要性" aria-label="Permalink to &quot;1.1.2 重要性&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试策略重要性] --&gt; B[提供测试方向]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[资源优化配置]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[风险管理]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[质量保证]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[沟通协调]</span></span></code></pre></div><h3 id="_1-2-测试策略核心要素" tabindex="-1">1.2 测试策略核心要素 <a class="header-anchor" href="#_1-2-测试策略核心要素" aria-label="Permalink to &quot;1.2 测试策略核心要素&quot;">​</a></h3><h4 id="_1-2-1-策略组成" tabindex="-1">1.2.1 策略组成 <a class="header-anchor" href="#_1-2-1-策略组成" aria-label="Permalink to &quot;1.2.1 策略组成&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># 测试策略核心要素</span></span>
<span class="line"><span class="__shiki_1jdh33">1.</span><span class="__shiki_28tyc3"> **测试目标**</span><span class="__shiki_140thh"> - 为什么要测试</span></span>
<span class="line"><span class="__shiki_1jdh33">2.</span><span class="__shiki_28tyc3"> **测试范围**</span><span class="__shiki_140thh"> - 测试什么和不测试什么</span></span>
<span class="line"><span class="__shiki_1jdh33">3.</span><span class="__shiki_28tyc3"> **测试方法**</span><span class="__shiki_140thh"> - 如何测试</span></span>
<span class="line"><span class="__shiki_1jdh33">4.</span><span class="__shiki_28tyc3"> **测试环境**</span><span class="__shiki_140thh"> - 在哪里测试</span></span>
<span class="line"><span class="__shiki_1jdh33">5.</span><span class="__shiki_28tyc3"> **资源计划**</span><span class="__shiki_140thh"> - 谁测试、需要什么</span></span>
<span class="line"><span class="__shiki_1jdh33">6.</span><span class="__shiki_28tyc3"> **进度安排**</span><span class="__shiki_140thh"> - 何时测试</span></span>
<span class="line"><span class="__shiki_1jdh33">7.</span><span class="__shiki_28tyc3"> **风险评估**</span><span class="__shiki_140thh"> - 可能的问题和应对</span></span>
<span class="line"><span class="__shiki_1jdh33">8.</span><span class="__shiki_28tyc3"> **交付物**</span><span class="__shiki_140thh"> - 测试产出物</span></span></code></pre></div><h4 id="_1-2-2-测试级别策略" tabindex="-1">1.2.2 测试级别策略 <a class="header-anchor" href="#_1-2-2-测试级别策略" aria-label="Permalink to &quot;1.2.2 测试级别策略&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试金字塔策略] --&gt; B[单元测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[集成测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[系统测试]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[验收测试]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[大量快速]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[开发者负责]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[隔离测试]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[接口测试]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[组件集成]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[数据流验证]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[端到端测试]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[用户场景]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[环境模拟]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[用户验收]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[业务验证]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E3[发布决策]</span></span></code></pre></div><h3 id="_1-3-测试策略类型" tabindex="-1">1.3 测试策略类型 <a class="header-anchor" href="#_1-3-测试策略类型" aria-label="Permalink to &quot;1.3 测试策略类型&quot;">​</a></h3><h4 id="_1-3-1-策略分类对比" tabindex="-1">1.3.1 策略分类对比 <a class="header-anchor" href="#_1-3-1-策略分类对比" aria-label="Permalink to &quot;1.3.1 策略分类对比&quot;">​</a></h4><table tabindex="0"><thead><tr><th>策略类型</th><th>适用场景</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>分析型策略</strong></td><td>需求明确的项目</td><td>系统化、完整</td><td>前期投入大</td></tr><tr><td><strong>模型型策略</strong></td><td>复杂系统</td><td>可视化、易理解</td><td>建模复杂</td></tr><tr><td><strong>方法型策略</strong></td><td>标准化流程</td><td>一致性高</td><td>灵活性差</td></tr><tr><td><strong>过程兼容策略</strong></td><td>敏捷开发</td><td>适应变化</td><td>文档较少</td></tr><tr><td><strong>反应式策略</strong></td><td>探索性测试</td><td>发现深层问题</td><td>覆盖率难保证</td></tr></tbody></table><h4 id="_1-3-2-敏捷测试策略示例" tabindex="-1">1.3.2 敏捷测试策略示例 <a class="header-anchor" href="#_1-3-2-敏捷测试策略示例" aria-label="Permalink to &quot;1.3.2 敏捷测试策略示例&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 敏捷项目测试策略</span></span>
<span class="line"><span class="__shiki_17hn0y">testing_strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  approach</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;敏捷测试&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  test_levels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    unit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      owner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;开发团队&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      timing</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;每个sprint&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      automation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    integration</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      owner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;开发团队&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_17hn0y">      timing</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;持续集成&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      automation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;80%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    system</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      owner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;QA团队&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      timing</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sprint结束&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      automation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;60%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  quality_gates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;单元测试覆盖率 &gt; 80%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;所有自动化测试通过&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&quot;关键路径手动验证&quot;</span></span></code></pre></div><h2 id="_2-单元测试" tabindex="-1">2. 单元测试 <a class="header-anchor" href="#_2-单元测试" aria-label="Permalink to &quot;2. 单元测试&quot;">​</a></h2><h3 id="_2-1-单元测试基础" tabindex="-1">2.1 单元测试基础 <a class="header-anchor" href="#_2-1-单元测试基础" aria-label="Permalink to &quot;2.1 单元测试基础&quot;">​</a></h3><h4 id="_2-1-1-单元测试定义" tabindex="-1">2.1.1 单元测试定义 <a class="header-anchor" href="#_2-1-1-单元测试定义" aria-label="Permalink to &quot;2.1.1 单元测试定义&quot;">​</a></h4><ul><li><strong>测试对象</strong>：最小的可测试单元（函数、方法、类）</li><li><strong>测试目标</strong>：验证单元逻辑正确性</li><li><strong>测试特点</strong>：快速、隔离、自动化、可重复</li></ul><h4 id="_2-1-2-单元测试价值" tabindex="-1">2.1.2 单元测试价值 <a class="header-anchor" href="#_2-1-2-单元测试价值" aria-label="Permalink to &quot;2.1.2 单元测试价值&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[单元测试价值] --&gt; B[早期缺陷发现]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[设计质量提升]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[重构安全保障]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[文档作用]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[开发效率提升]</span></span></code></pre></div><h3 id="_2-2-单元测试最佳实践" tabindex="-1">2.2 单元测试最佳实践 <a class="header-anchor" href="#_2-2-单元测试最佳实践" aria-label="Permalink to &quot;2.2 单元测试最佳实践&quot;">​</a></h3><h4 id="_2-2-1-first原则" tabindex="-1">2.2.1 FIRST原则 <a class="header-anchor" href="#_2-2-1-first原则" aria-label="Permalink to &quot;2.2.1 FIRST原则&quot;">​</a></h4><ul><li><strong>F</strong>ast - 测试要快速运行</li><li><strong>I</strong>ndependent - 测试之间相互独立</li><li><strong>R</strong>epeatable - 在任何环境可重复</li><li><strong>S</strong>elf-validating - 自动判断结果</li><li><strong>T</strong>imely - 及时编写（TDD）</li></ul><h4 id="_2-2-2-测试命名规范" tabindex="-1">2.2.2 测试命名规范 <a class="header-anchor" href="#_2-2-2-测试命名规范" aria-label="Permalink to &quot;2.2.2 测试命名规范&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 方式1：行为驱动开发风格</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> shouldReturnUser_WhenValidCredentialsProvided</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方式2：Given-When-Then模式  </span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> givenValidUser_whenAuthenticate_thenReturnTrue</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方式3：简单描述性</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> testUserAuthenticationSuccess</span><span class="__shiki_140thh">()</span></span></code></pre></div><h3 id="_2-3-单元测试框架与示例" tabindex="-1">2.3 单元测试框架与示例 <a class="header-anchor" href="#_2-3-单元测试框架与示例" aria-label="Permalink to &quot;2.3 单元测试框架与示例&quot;">​</a></h3><h4 id="_2-3-1-主流测试框架" tabindex="-1">2.3.1 主流测试框架 <a class="header-anchor" href="#_2-3-1-主流测试框架" aria-label="Permalink to &quot;2.3.1 主流测试框架&quot;">​</a></h4><table tabindex="0"><thead><tr><th>语言</th><th>测试框架</th><th>Mock框架</th><th>断言库</th></tr></thead><tbody><tr><td>Java</td><td>JUnit 5</td><td>Mockito</td><td>AssertJ</td></tr><tr><td>Python</td><td>pytest</td><td>unittest.mock</td><td>pytest</td></tr><tr><td>JavaScript</td><td>Jest</td><td>Jest</td><td>Jest</td></tr><tr><td>C#</td><td>xUnit</td><td>Moq</td><td>FluentAssertions</td></tr></tbody></table><h4 id="_2-3-2-junit-5-mockito完整示例" tabindex="-1">2.3.2 JUnit 5 + Mockito完整示例 <a class="header-anchor" href="#_2-3-2-junit-5-mockito完整示例" aria-label="Permalink to &quot;2.3.2 JUnit 5 + Mockito完整示例&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.junit.jupiter.api.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.junit.jupiter.params.ParameterizedTest;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.junit.jupiter.params.provider.CsvSource;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> org.mockito.Mockito.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> org.junit.jupiter.api.Assertions.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserServiceTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EmailService emailService;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserService userService;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BeforeEach</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> setUp</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        userRepository </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(UserRepository.class);</span></span>
<span class="line"><span class="__shiki_140thh">        emailService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(EmailService.class);</span></span>
<span class="line"><span class="__shiki_140thh">        userService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh">(userRepository, emailService);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;成功创建用户&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> shouldCreateUser_WhenValidDataProvided</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Given - 准备测试数据</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;John Doe&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        when</span><span class="__shiki_140thh">(userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(User.class))).</span><span class="__shiki_1t8gfj">thenReturn</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // When - 执行测试操作</span></span>
<span class="line"><span class="__shiki_140thh">        User result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;John Doe&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // Then - 验证结果</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertNotNull</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">, result.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        verify</span><span class="__shiki_140thh">(userRepository).</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(User.class));</span></span>
<span class="line"><span class="__shiki_1t8gfj">        verify</span><span class="__shiki_140thh">(emailService).</span><span class="__shiki_1t8gfj">sendWelcomeEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;john@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ParameterizedTest</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CsvSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;invalid-email, &#39;用户姓名&#39;, &#39;无效的邮箱格式&#39;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&#39;&#39;, &#39;用户姓名&#39;, &#39;邮箱不能为空&#39;&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;test@example.com, &#39;&#39;, &#39;姓名不能为空&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;用户创建参数验证&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> shouldThrowException_WhenInvalidDataProvided</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">expectedMessage</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // When &amp; Then</span></span>
<span class="line"><span class="__shiki_140thh">        ValidationException exception </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> assertThrows</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            ValidationException.class,</span></span>
<span class="line"><span class="__shiki_140thh">            () </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> userService.</span><span class="__shiki_1t8gfj">createUser</span><span class="__shiki_140thh">(email, name)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertEquals</span><span class="__shiki_140thh">(expectedMessage, exception.</span><span class="__shiki_1t8gfj">getMessage</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DisplayName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;邮箱已存在时抛出异常&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> shouldThrowException_WhenEmailAlreadyExists</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Given</span></span>
<span class="line"><span class="__shiki_1t8gfj">        when</span><span class="__shiki_140thh">(userRepository.</span><span class="__shiki_1t8gfj">existsByEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;existing@example.com&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">thenReturn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // When &amp; Then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThrows</span><span class="__shiki_140thh">(DuplicateEmailException.class, () </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            userService.</span><span class="__shiki_1t8gfj">createUser</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;existing@example.com&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Existing User&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-4-测试替身深入理解" tabindex="-1">2.4 测试替身深入理解 <a class="header-anchor" href="#_2-4-测试替身深入理解" aria-label="Permalink to &quot;2.4 测试替身深入理解&quot;">​</a></h3><h4 id="_2-4-1-测试替身类型对比" tabindex="-1">2.4.1 测试替身类型对比 <a class="header-anchor" href="#_2-4-1-测试替身类型对比" aria-label="Permalink to &quot;2.4.1 测试替身类型对比&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[测试替身] --&gt; B[Mock对象]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Stub]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[Spy]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[Fake]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[Dummy]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[验证行为交互]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[提供预设响应]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[记录调用信息]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[简化功能实现]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[填充参数占位]</span></span></code></pre></div><h4 id="_2-4-2-mockito高级用法" tabindex="-1">2.4.2 Mockito高级用法 <a class="header-anchor" href="#_2-4-2-mockito高级用法" aria-label="Permalink to &quot;2.4.2 Mockito高级用法&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OrderServiceTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> testComplexOrderProcessing</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建mock</span></span>
<span class="line"><span class="__shiki_140thh">        PaymentGateway paymentGateway </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(PaymentGateway.class);</span></span>
<span class="line"><span class="__shiki_140thh">        InventoryService inventoryService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(InventoryService.class);</span></span>
<span class="line"><span class="__shiki_140thh">        NotificationService notificationService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mock</span><span class="__shiki_140thh">(NotificationService.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        OrderService orderService </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            paymentGateway, inventoryService, notificationService);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置复杂stub行为</span></span>
<span class="line"><span class="__shiki_1t8gfj">        when</span><span class="__shiki_140thh">(paymentGateway.</span><span class="__shiki_1t8gfj">processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(PaymentRequest.class)))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">thenReturn</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> PaymentResult</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;txn_12345&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        when</span><span class="__shiki_140thh">(inventoryService.</span><span class="__shiki_1t8gfj">reserveItems</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">anyList</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">thenAnswer</span><span class="__shiki_140thh">(invocation </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                List&lt;</span><span class="__shiki_1itgoe">Item</span><span class="__shiki_140thh">&gt; items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> invocation.</span><span class="__shiki_1t8gfj">getArgument</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> items.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(item </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Reservation</span><span class="__shiki_140thh">(item.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 参数捕获</span></span>
<span class="line"><span class="__shiki_140thh">        ArgumentCaptor&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; orderCaptor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ArgumentCaptor.</span><span class="__shiki_1t8gfj">forClass</span><span class="__shiki_140thh">(Order.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行测试</span></span>
<span class="line"><span class="__shiki_140thh">        Order order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">/* ... */</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        OrderResult result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orderService.</span><span class="__shiki_1t8gfj">processOrder</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证复杂交互</span></span>
<span class="line"><span class="__shiki_1t8gfj">        verify</span><span class="__shiki_140thh">(paymentGateway).</span><span class="__shiki_1t8gfj">processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(PaymentRequest.class));</span></span>
<span class="line"><span class="__shiki_1t8gfj">        verify</span><span class="__shiki_140thh">(inventoryService).</span><span class="__shiki_1t8gfj">reserveItems</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">anyList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        verify</span><span class="__shiki_140thh">(notificationService).</span><span class="__shiki_1t8gfj">sendOrderConfirmation</span><span class="__shiki_140thh">(orderCaptor.</span><span class="__shiki_1t8gfj">capture</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证捕获的参数</span></span>
<span class="line"><span class="__shiki_140thh">        Order capturedOrder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orderCaptor.</span><span class="__shiki_1t8gfj">getValue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertEquals</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">(), capturedOrder.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证调用顺序</span></span>
<span class="line"><span class="__shiki_140thh">        InOrder inOrder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> inOrder</span><span class="__shiki_140thh">(paymentGateway, inventoryService, notificationService);</span></span>
<span class="line"><span class="__shiki_140thh">        inOrder.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(paymentGateway).</span><span class="__shiki_1t8gfj">processPayment</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(PaymentRequest.class));</span></span>
<span class="line"><span class="__shiki_140thh">        inOrder.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(inventoryService).</span><span class="__shiki_1t8gfj">reserveItems</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">anyList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        inOrder.</span><span class="__shiki_1t8gfj">verify</span><span class="__shiki_140thh">(notificationService).</span><span class="__shiki_1t8gfj">sendOrderConfirmation</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(Order.class));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-测试驱动开发" tabindex="-1">3. 测试驱动开发 <a class="header-anchor" href="#_3-测试驱动开发" aria-label="Permalink to &quot;3. 测试驱动开发&quot;">​</a></h2><h3 id="_3-1-tdd核心概念" tabindex="-1">3.1 TDD核心概念 <a class="header-anchor" href="#_3-1-tdd核心概念" aria-label="Permalink to &quot;3.1 TDD核心概念&quot;">​</a></h3><h4 id="_3-1-1-tdd定义" tabindex="-1">3.1.1 TDD定义 <a class="header-anchor" href="#_3-1-1-tdd定义" aria-label="Permalink to &quot;3.1.1 TDD定义&quot;">​</a></h4><p>测试驱动开发是一种<strong>软件开发实践</strong>，要求在编写功能代码之前先编写测试代码。</p><h4 id="_3-1-2-tdd三定律" tabindex="-1">3.1.2 TDD三定律 <a class="header-anchor" href="#_3-1-2-tdd三定律" aria-label="Permalink to &quot;3.1.2 TDD三定律&quot;">​</a></h4><ol><li>在编写<strong>失败</strong>的单元测试前，不要编写任何产品代码</li><li>只编写<strong>刚好失败</strong>的测试（编译失败也是失败）</li><li>只编写<strong>刚好通过</strong>当前测试的产品代码</li></ol><h3 id="_3-2-tdd循环-红-绿-重构" tabindex="-1">3.2 TDD循环：红-绿-重构 <a class="header-anchor" href="#_3-2-tdd循环-红-绿-重构" aria-label="Permalink to &quot;3.2 TDD循环：红-绿-重构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[编写失败的测试] --&gt; B[红: 测试失败]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[编写实现代码]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[绿: 测试通过]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E{需要重构?}</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt;|是| F[重构代码]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt;|否| A</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style A fill:#FFB6C1</span></span>
<span class="line"><span class="__shiki_140thh">    style B fill:#FFB6C1</span></span>
<span class="line"><span class="__shiki_140thh">    style C fill:#90EE90</span></span>
<span class="line"><span class="__shiki_140thh">    style D fill:#90EE90</span></span>
<span class="line"><span class="__shiki_140thh">    style F fill:#87CEEB</span></span></code></pre></div><h4 id="_3-2-1-红阶段-red" tabindex="-1">3.2.1 红阶段（Red） <a class="header-anchor" href="#_3-2-1-红阶段-red" aria-label="Permalink to &quot;3.2.1 红阶段（Red）&quot;">​</a></h4><ul><li>编写一个<strong>预期会失败</strong>的测试</li><li>运行测试确认它<strong>确实失败</strong></li><li>失败证明了测试的<strong>有效性</strong></li></ul><h4 id="_3-2-2-绿阶段-green" tabindex="-1">3.2.2 绿阶段（Green） <a class="header-anchor" href="#_3-2-2-绿阶段-green" aria-label="Permalink to &quot;3.2.2 绿阶段（Green）&quot;">​</a></h4><ul><li>编写<strong>最简单</strong>的代码使测试通过</li><li><strong>不要</strong>考虑代码质量或设计</li><li>目标是<strong>快速</strong>让测试变绿</li></ul><h4 id="_3-2-3-重构阶段-refactor" tabindex="-1">3.2.3 重构阶段（Refactor） <a class="header-anchor" href="#_3-2-3-重构阶段-refactor" aria-label="Permalink to &quot;3.2.3 重构阶段（Refactor）&quot;">​</a></h4><ul><li>在测试保护下<strong>改进代码设计</strong></li><li>消除重复，改进结构</li><li>确保测试<strong>始终保持绿色</strong></li></ul><h3 id="_3-3-tdd完整实践示例" tabindex="-1">3.3 TDD完整实践示例 <a class="header-anchor" href="#_3-3-tdd完整实践示例" aria-label="Permalink to &quot;3.3 TDD完整实践示例&quot;">​</a></h3><h4 id="_3-3-1-需求-字符串计算器" tabindex="-1">3.3.1 需求：字符串计算器 <a class="header-anchor" href="#_3-3-1-需求-字符串计算器" aria-label="Permalink to &quot;3.3.1 需求：字符串计算器&quot;">​</a></h4><p>创建一个StringCalculator类，支持逗号分隔的数字相加</p><p><strong>迭代1：空字符串返回0</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 第1步：红 - 编写失败测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> shouldReturnZero_WhenEmptyStringProvided</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    StringCalculator calculator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> StringCalculator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第2步：绿 - 最简单实现</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> StringCalculator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">numbers</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第3步：重构 - 暂无需要</span></span></code></pre></div><p><strong>迭代2：单个数字返回该数字</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 第1步：红 - 新测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> shouldReturnNumber_WhenSingleNumberProvided</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    StringCalculator calculator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> StringCalculator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;5&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第2步：绿 - 扩展实现</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(String numbers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (numbers.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Integer.</span><span class="__shiki_1t8gfj">parseInt</span><span class="__shiki_140thh">(numbers);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第3步：重构 - 提取方法</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(String numbers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">(numbers)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> parseSingleNumber</span><span class="__shiki_140thh">(numbers);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">private</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> isEmpty</span><span class="__shiki_140thh">(String numbers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> numbers.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> parseSingleNumber</span><span class="__shiki_140thh">(String numbers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Integer.</span><span class="__shiki_1t8gfj">parseInt</span><span class="__shiki_140thh">(numbers);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>迭代3：两个逗号分隔数字返回和</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 第1步：红 - 新测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> shouldReturnSum_WhenTwoNumbersProvided</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    StringCalculator calculator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> StringCalculator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">, calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;3,5&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第2步：绿 - 扩展实现</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(String numbers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">(numbers)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (numbers.</span><span class="__shiki_1t8gfj">contains</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;,&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        String</span><span class="__shiki_140thh">[] parts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> numbers.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;,&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Integer.</span><span class="__shiki_1t8gfj">parseInt</span><span class="__shiki_140thh">(parts[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> Integer.</span><span class="__shiki_1t8gfj">parseInt</span><span class="__shiki_140thh">(parts[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> parseSingleNumber</span><span class="__shiki_140thh">(numbers);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第3步：重构 - 改进设计</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(String numbers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">(numbers)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    String</span><span class="__shiki_140thh">[] numberArray </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> numbers.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;,&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (numberArray.length </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> parseNumber</span><span class="__shiki_140thh">(numberArray[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> sumNumbers</span><span class="__shiki_140thh">(numberArray);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> sumNumbers</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">[] numberArray) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (String number </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> numberArray) {</span></span>
<span class="line"><span class="__shiki_140thh">        sum </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_1t8gfj"> parseNumber</span><span class="__shiki_140thh">(number);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> sum;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> parseNumber</span><span class="__shiki_140thh">(String number) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Integer.</span><span class="__shiki_1t8gfj">parseInt</span><span class="__shiki_140thh">(number.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>迭代4：处理多个数字和未知数量</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 继续添加测试和实现，直到完成所有需求...</span></span></code></pre></div><h3 id="_3-4-tdd进阶模式" tabindex="-1">3.4 TDD进阶模式 <a class="header-anchor" href="#_3-4-tdd进阶模式" aria-label="Permalink to &quot;3.4 TDD进阶模式&quot;">​</a></h3><h4 id="_3-4-1-三角测量法" tabindex="-1">3.4.1 三角测量法 <a class="header-anchor" href="#_3-4-1-三角测量法" aria-label="Permalink to &quot;3.4.1 三角测量法&quot;">​</a></h4><p>当不确定通用实现时，编写多个具体示例来推导通用解决方案。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 示例1</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> shouldHandleTwoNumbers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1,2&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 示例2  </span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> shouldHandleThreeNumbers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    assertEquals</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">, calculator.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1,2,3&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 通过两个具体示例，推导出需要处理任意数量数字的通用方案</span></span></code></pre></div><h4 id="_3-4-2-明显实现-vs-伪实现" tabindex="-1">3.4.2 明显实现 vs 伪实现 <a class="header-anchor" href="#_3-4-2-明显实现-vs-伪实现" aria-label="Permalink to &quot;3.4.2 明显实现 vs 伪实现&quot;">​</a></h4><ul><li><strong>明显实现</strong>：当解决方案明确时直接实现</li><li><strong>伪实现</strong>：当解决方案不明确时先用简单方案，通过重构改进</li></ul><h3 id="_3-5-tdd-benefits-和挑战" tabindex="-1">3.5 TDD benefits 和挑战 <a class="header-anchor" href="#_3-5-tdd-benefits-和挑战" aria-label="Permalink to &quot;3.5 TDD benefits 和挑战&quot;">​</a></h3><h4 id="_3-5-1-tdd优势" tabindex="-1">3.5.1 TDD优势 <a class="header-anchor" href="#_3-5-1-tdd优势" aria-label="Permalink to &quot;3.5.1 TDD优势&quot;">​</a></h4><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[TDD优势] --&gt; B[高质量代码]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[更好的设计]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[详尽文档]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[重构信心]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[减少调试时间]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[低缺陷率]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[松耦合]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[高内聚]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[活文档]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[测试保护]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[快速反馈]</span></span></code></pre></div><h4 id="_3-5-2-tdd挑战与应对" tabindex="-1">3.5.2 TDD挑战与应对 <a class="header-anchor" href="#_3-5-2-tdd挑战与应对" aria-label="Permalink to &quot;3.5.2 TDD挑战与应对&quot;">​</a></h4><table tabindex="0"><thead><tr><th>挑战</th><th>应对策略</th></tr></thead><tbody><tr><td><strong>学习曲线陡峭</strong></td><td>从小项目开始，结对编程</td></tr><tr><td><strong>前期速度慢</strong></td><td>关注长期效益，熟练后速度提升</td></tr><tr><td><strong>测试维护成本</strong></td><td>保持测试简洁，遵循FIRST原则</td></tr><tr><td><strong>设计过度工程</strong></td><td>YAGNI原则，只在需要时引入抽象</td></tr><tr><td><strong>团队接受度</strong></td><td>展示价值，逐步推广</td></tr></tbody></table><h3 id="_3-6-tdd与测试策略的结合" tabindex="-1">3.6 TDD与测试策略的结合 <a class="header-anchor" href="#_3-6-tdd与测试策略的结合" aria-label="Permalink to &quot;3.6 TDD与测试策略的结合&quot;">​</a></h3><h4 id="_3-6-1-tdd在测试策略中的位置" tabindex="-1">3.6.1 TDD在测试策略中的位置 <a class="header-anchor" href="#_3-6-1-tdd在测试策略中的位置" aria-label="Permalink to &quot;3.6.1 TDD在测试策略中的位置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 敏捷项目中的TDD策略</span></span>
<span class="line"><span class="__shiki_17hn0y">development_process</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  coding_practice</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    tdd</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      mandatory_for</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;核心业务逻辑&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;关键算法&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;公共组件&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      encouraged_for</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;所有新功能&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      training_provided</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      code_review_focus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;测试覆盖率&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;测试质量&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;重构情况&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  quality_metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    unit_test_coverage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&gt; 85%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    tdd_adoption_rate</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&gt; 70%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    defect_escape_rate</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&lt; 5%&quot;</span></span></code></pre></div><h4 id="_3-6-2-tdd成功度量" tabindex="-1">3.6.2 TDD成功度量 <a class="header-anchor" href="#_3-6-2-tdd成功度量" aria-label="Permalink to &quot;3.6.2 TDD成功度量&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 通过工具监控TDD实践</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> TDDMetrics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试与代码提交时间差</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_140thh"> testCodeTimeGap;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 测试先行率</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> testFirstRate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重构频率</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> refactoringCount;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 红-绿-重构循环时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> cycleTime;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-综合实践-完整的tdd工作流" tabindex="-1">4. 综合实践：完整的TDD工作流 <a class="header-anchor" href="#_4-综合实践-完整的tdd工作流" aria-label="Permalink to &quot;4. 综合实践：完整的TDD工作流&quot;">​</a></h2><h3 id="_4-1-项目级别的tdd实施" tabindex="-1">4.1 项目级别的TDD实施 <a class="header-anchor" href="#_4-1-项目级别的tdd实施" aria-label="Permalink to &quot;4.1 项目级别的TDD实施&quot;">​</a></h3><h4 id="_4-1-1-开发环境配置" tabindex="-1">4.1.1 开发环境配置 <a class="header-anchor" href="#_4-1-1-开发环境配置" aria-label="Permalink to &quot;4.1.1 开发环境配置&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- Maven TDD友好配置 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">build</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">plugins</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">plugin</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">groupId</span><span class="__shiki_140thh">&gt;org.apache.maven.plugins&lt;/</span><span class="__shiki_17hn0y">groupId</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">artifactId</span><span class="__shiki_140thh">&gt;maven-surefire-plugin&lt;/</span><span class="__shiki_17hn0y">artifactId</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">configuration</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;</span><span class="__shiki_17hn0y">includes</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;</span><span class="__shiki_17hn0y">include</span><span class="__shiki_140thh">&gt;**/*Test.java&lt;/</span><span class="__shiki_17hn0y">include</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;/</span><span class="__shiki_17hn0y">includes</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;</span><span class="__shiki_17hn0y">excludes</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;</span><span class="__shiki_17hn0y">exclude</span><span class="__shiki_140thh">&gt;**/*IntegrationTest.java&lt;/</span><span class="__shiki_17hn0y">exclude</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;/</span><span class="__shiki_17hn0y">excludes</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;/</span><span class="__shiki_17hn0y">configuration</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">plugin</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">plugin</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">groupId</span><span class="__shiki_140thh">&gt;org.jacoco&lt;/</span><span class="__shiki_17hn0y">groupId</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">artifactId</span><span class="__shiki_140thh">&gt;jacoco-maven-plugin&lt;/</span><span class="__shiki_17hn0y">artifactId</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;</span><span class="__shiki_17hn0y">executions</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;</span><span class="__shiki_17hn0y">execution</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;</span><span class="__shiki_17hn0y">goals</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                        &lt;</span><span class="__shiki_17hn0y">goal</span><span class="__shiki_140thh">&gt;prepare-agent&lt;/</span><span class="__shiki_17hn0y">goal</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;/</span><span class="__shiki_17hn0y">goals</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;/</span><span class="__shiki_17hn0y">execution</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;</span><span class="__shiki_17hn0y">execution</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;report&lt;/</span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;</span><span class="__shiki_17hn0y">phase</span><span class="__shiki_140thh">&gt;test&lt;/</span><span class="__shiki_17hn0y">phase</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;</span><span class="__shiki_17hn0y">goals</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                        &lt;</span><span class="__shiki_17hn0y">goal</span><span class="__shiki_140thh">&gt;report&lt;/</span><span class="__shiki_17hn0y">goal</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                    &lt;/</span><span class="__shiki_17hn0y">goals</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                &lt;/</span><span class="__shiki_17hn0y">execution</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">            &lt;/</span><span class="__shiki_17hn0y">executions</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_17hn0y">plugin</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">plugins</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">build</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_4-1-2-ide配置与快捷键" tabindex="-1">4.1.2 IDE配置与快捷键 <a class="header-anchor" href="#_4-1-2-ide配置与快捷键" aria-label="Permalink to &quot;4.1.2 IDE配置与快捷键&quot;">​</a></h4><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># IntelliJ IDEA TDD快捷键配置</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Ctrl+Shift+T: 在类和测试间跳转</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Ctrl+Shift+F10: 运行当前测试</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Ctrl+Shift+F9: 重新编译并运行测试</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> Alt+Enter: 快速生成测试方法</span></span></code></pre></div><h3 id="_4-2-tdd与持续集成" tabindex="-1">4.2 TDD与持续集成 <a class="header-anchor" href="#_4-2-tdd与持续集成" aria-label="Permalink to &quot;4.2 TDD与持续集成&quot;">​</a></h3><h4 id="_4-2-1-ci流水线中的tdd" tabindex="-1">4.2.1 CI流水线中的TDD <a class="header-anchor" href="#_4-2-1-ci流水线中的tdd" aria-label="Permalink to &quot;4.2.1 CI流水线中的TDD&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># GitHub Actions TDD流水线</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TDD Pipeline</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">push</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">pull_request</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v2</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run unit tests with TDD cycle</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 快速反馈的测试执行</span></span>
<span class="line"><span class="__shiki_mdbnqw">          mvn test -Dtest=*Test -DfailIfNoTests=true</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Coverage check</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 覆盖率门禁</span></span>
<span class="line"><span class="__shiki_mdbnqw">          mvn jacoco:check</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Mutation testing</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 突变测试验证测试质量</span></span>
<span class="line"><span class="__shiki_mdbnqw">          mvn org.pitest:pitest-maven:mutationCoverage</span></span></code></pre></div><h2 id="_5-总结" tabindex="-1">5. 总结 <a class="header-anchor" href="#_5-总结" aria-label="Permalink to &quot;5. 总结&quot;">​</a></h2><h3 id="_5-1-关键成功因素" tabindex="-1">5.1 关键成功因素 <a class="header-anchor" href="#_5-1-关键成功因素" aria-label="Permalink to &quot;5.1 关键成功因素&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[TDD成功因素] --&gt; B[团队共识]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[持续实践]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[合适工具]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[耐心坚持]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[不断学习]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[理解价值]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[形成习惯]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[IDE支持]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[构建工具]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[克服初期困难]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[改进技巧]</span></span></code></pre></div><h3 id="_5-2-持续改进路径" tabindex="-1">5.2 持续改进路径 <a class="header-anchor" href="#_5-2-持续改进路径" aria-label="Permalink to &quot;5.2 持续改进路径&quot;">​</a></h3><ol><li><strong>初级阶段</strong>：掌握红-绿-重构循环</li><li><strong>中级阶段</strong>：熟练使用测试替身和Mock技术</li><li><strong>高级阶段</strong>：应用设计模式和架构原则</li><li><strong>专家阶段</strong>：指导团队，优化流程，创新实践</li></ol><p>通过系统化的测试策略、高质量的单元测试和严格的测试驱动开发实践，可以显著提升软件质量、开发效率和团队协作水平。</p>`,94)])])}const d=a(_,[["render",h]]);export{o as __pageData,d as default};
