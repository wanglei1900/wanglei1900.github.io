import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"渐进式交付：详细完整的学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/strategies/progressive.md","filePath":"devops/deployment/strategies/progressive.md"}'),p={name:"devops/deployment/strategies/progressive.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="渐进式交付-详细完整的学习笔记" tabindex="-1">渐进式交付：详细完整的学习笔记 <a class="header-anchor" href="#渐进式交付-详细完整的学习笔记" aria-label="Permalink to &quot;渐进式交付：详细完整的学习笔记&quot;">​</a></h1><h2 id="一、渐进式交付基础概念" tabindex="-1">一、渐进式交付基础概念 <a class="header-anchor" href="#一、渐进式交付基础概念" aria-label="Permalink to &quot;一、渐进式交付基础概念&quot;">​</a></h2><h3 id="_1-1-核心定义" tabindex="-1">1.1 核心定义 <a class="header-anchor" href="#_1-1-核心定义" aria-label="Permalink to &quot;1.1 核心定义&quot;">​</a></h3><p><strong>渐进式交付</strong>（Progressive Delivery）是一种高级部署策略，它通过可控、可观察、可自动化的方式，逐步向用户发布新功能。它结合了功能开关、流量控制、实时监控和自动化决策，使团队能够以最小的风险发布软件。</p><h3 id="_1-2-演进路径" tabindex="-1">1.2 演进路径 <a class="header-anchor" href="#_1-2-演进路径" aria-label="Permalink to &quot;1.2 演进路径&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">传统部署 → 蓝绿部署 → 金丝雀发布 → 渐进式交付</span></span>
<span class="line"><span class="__shiki_wvjl67">（高风险）    （中风险）    （低风险）    （可控风险）</span></span></code></pre></div><h3 id="_1-3-核心组件" tabindex="-1">1.3 核心组件 <a class="header-anchor" href="#_1-3-核心组件" aria-label="Permalink to &quot;1.3 核心组件&quot;">​</a></h3><ol><li><strong>功能开关</strong>：运行时控制功能启用/禁用</li><li><strong>流量控制</strong>：精确控制哪些用户看到新功能</li><li><strong>实时监控</strong>：收集用户行为和应用性能数据</li><li><strong>自动化决策</strong>：基于指标自动决定发布进度</li><li><strong>回滚机制</strong>：检测问题时的自动回滚能力</li></ol><h2 id="二、渐进式交付架构模式" tabindex="-1">二、渐进式交付架构模式 <a class="header-anchor" href="#二、渐进式交付架构模式" aria-label="Permalink to &quot;二、渐进式交付架构模式&quot;">​</a></h2><h3 id="_2-1-分层架构图" tabindex="-1">2.1 分层架构图 <a class="header-anchor" href="#_2-1-分层架构图" aria-label="Permalink to &quot;2.1 分层架构图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          监控与观测层                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 指标收集 │  │ 日志聚合 │  │ 分布式追踪 │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────┘  └─────────┘  └─────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          控制与决策层                        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │功能开关 │  │流量路由 │  │自动化决策│  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │管理平台 │  │控制器   │  │引擎     │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────┘  └─────────┘  └─────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          执行层                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 服务网格 │  │API网关  │  │CDN/边缘 │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ (Istio) │  │ (Envoy) │  │计算     │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────┘  └─────────┘  └─────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span>
<span class="line"><span class="__shiki_wvjl67">                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          应用层                              │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ 微服务A │  │ 微服务B │  │ 微服务C │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ v1.2.0  │  │ v2.0.0  │  │ v1.5.0  │  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────┘  └─────────┘  └─────────┘  │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_2-2-核心工作流" tabindex="-1">2.2 核心工作流 <a class="header-anchor" href="#_2-2-核心工作流" aria-label="Permalink to &quot;2.2 核心工作流&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[开发完成新功能] --&gt; B[部署到生产环境]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{启用功能开关&lt;br&gt;默认禁用状态}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[内部测试验证]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E{是否通过?}</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt;|否| F[修复问题]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; C</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt;|是| G[向1%用户启用]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[实时监控指标]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I{指标是否达标?}</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|否| J[自动或手动回滚]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|是| K[扩大发布范围]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; L[逐步增加用户比例]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; M{达到100%?}</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt;|否| H</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt;|是| N[完成发布&lt;br&gt;移除功能开关]</span></span></code></pre></div><h2 id="三、核心技术实现" tabindex="-1">三、核心技术实现 <a class="header-anchor" href="#三、核心技术实现" aria-label="Permalink to &quot;三、核心技术实现&quot;">​</a></h2><h3 id="_3-1-功能开关-feature-flags-toggles-实现" tabindex="-1">3.1 功能开关（Feature Flags/Toggles）实现 <a class="header-anchor" href="#_3-1-功能开关-feature-flags-toggles-实现" aria-label="Permalink to &quot;3.1 功能开关（Feature Flags/Toggles）实现&quot;">​</a></h3><h4 id="_3-1-1-功能开关架构" tabindex="-1">3.1.1 功能开关架构 <a class="header-anchor" href="#_3-1-1-功能开关架构" aria-label="Permalink to &quot;3.1.1 功能开关架构&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 功能开关核心接口定义</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> FeatureFlag</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  description</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  enabled</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> boolean</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 目标规则</span></span>
<span class="line"><span class="__shiki_1jdh33">  targetingRules</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> TargetingRule</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 百分比发布</span></span>
<span class="line"><span class="__shiki_1jdh33">  rolloutPercentage</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 变量配置</span></span>
<span class="line"><span class="__shiki_1jdh33">  variations</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Variation</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 审计信息</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  updatedAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdBy</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> TargetingRule</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  attribute</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 用户属性：userId, email, country, etc.</span></span>
<span class="line"><span class="__shiki_1jdh33">  operator</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;EQUALS&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_mdbnqw"> &#39;CONTAINS&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_mdbnqw"> &#39;GREATER_THAN&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_mdbnqw"> &#39;IN&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  value</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Variation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  value</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  weight</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 流量分配权重</span></span>
<span class="line"><span class="__shiki_1jdh33">  payload</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_1t8gfj"> Record</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">any</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-1-2-功能开关管理平台" tabindex="-1">3.1.2 功能开关管理平台 <a class="header-anchor" href="#_3-1-2-功能开关管理平台" aria-label="Permalink to &quot;3.1.2 功能开关管理平台&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 功能开关服务实现</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> redis</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Dict, List, Optional, Any</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> dataclasses </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dataclass, asdict</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> enum </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Enum</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hashlib</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TargetingOperator</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    EQUALS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;equals&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    CONTAINS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;contains&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    STARTS_WITH</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;starts_with&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    ENDS_WITH</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;ends_with&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    GREATER_THAN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;greater_than&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    LESS_THAN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;less_than&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    IN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;in&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    NOT_IN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;not_in&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TargetingRule</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    attribute: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    operator: TargetingOperator</span></span>
<span class="line"><span class="__shiki_140thh">    value: Any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> evaluate</span><span class="__shiki_140thh">(self, context: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, Any]) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;评估规则是否匹配&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.attribute </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> context:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        context_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context[</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.attribute]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">EQUALS</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.value</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">CONTAINS</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> context_value</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">STARTS_WITH</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value.startswith(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.value)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">ENDS_WITH</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value.endswith(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.value)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">GREATER_THAN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.value</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">LESS_THAN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.value</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">IN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.value</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operator </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> TargetingOperator.</span><span class="__shiki_dzsirb">NOT_IN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> context_value </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.value</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> FeatureFlagService</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, redis_client: redis.Redis):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis_client</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cache_ttl </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_21nrsd">  # 5分钟缓存</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_feature_flag</span><span class="__shiki_140thh">(self, flag_key: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, user_context: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, Any]) -&gt; Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, Any]:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        获取功能开关状态和配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 1. 从缓存获取功能开关配置</span></span>
<span class="line"><span class="__shiki_140thh">        flag_config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._get_flag_config(flag_key)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> flag_config:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;variation&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 2. 检查全局启用状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> flag_config.get(</span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;variation&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 3. 应用目标规则</span></span>
<span class="line"><span class="__shiki_140thh">        targeting_rules </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> flag_config.get(</span><span class="__shiki_mdbnqw">&quot;targeting_rules&quot;</span><span class="__shiki_140thh">, [])</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> rule </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> targeting_rules:</span></span>
<span class="line"><span class="__shiki_140thh">            targeting_rule </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TargetingRule(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">rule)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> targeting_rule.evaluate(user_context):</span></span>
<span class="line"><span class="__shiki_140thh">                variation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._select_variation(flag_config, user_context)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;variation&quot;</span><span class="__shiki_140thh">: variation,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;payload&quot;</span><span class="__shiki_140thh">: flag_config.get(</span><span class="__shiki_mdbnqw">&quot;variations&quot;</span><span class="__shiki_140thh">, {}).get(variation, {})</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 4. 百分比发布（如果没匹配到规则）</span></span>
<span class="line"><span class="__shiki_140thh">        rollout_percentage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> flag_config.get(</span><span class="__shiki_mdbnqw">&quot;rollout_percentage&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> rollout_percentage </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            user_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._hash_user_id(user_context.get(</span><span class="__shiki_mdbnqw">&quot;user_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (user_hash </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> rollout_percentage:</span></span>
<span class="line"><span class="__shiki_140thh">                variation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._select_variation(flag_config, user_context)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;variation&quot;</span><span class="__shiki_140thh">: variation,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;payload&quot;</span><span class="__shiki_140thh">: flag_config.get(</span><span class="__shiki_mdbnqw">&quot;variations&quot;</span><span class="__shiki_140thh">, {}).get(variation, {})</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;variation&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _hash_user_id</span><span class="__shiki_140thh">(self, user_id: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成用户ID的哈希值用于百分比发布&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> user_id:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> int</span><span class="__shiki_140thh">(hashlib.md5(user_id.encode()).hexdigest()[:</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">], </span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _select_variation</span><span class="__shiki_140thh">(self, flag_config: Dict, user_context: Dict) -&gt; </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;选择变量（用于A/B测试）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        variations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> flag_config.get(</span><span class="__shiki_mdbnqw">&quot;variations&quot;</span><span class="__shiki_140thh">, {})</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> variations:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &quot;control&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基于用户ID哈希的稳定分配</span></span>
<span class="line"><span class="__shiki_140thh">        user_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._hash_user_id(user_context.get(</span><span class="__shiki_mdbnqw">&quot;user_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        total_weight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(v.get(</span><span class="__shiki_mdbnqw">&quot;weight&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> v </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> variations.values())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> total_weight </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(variations.keys())[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        target_weight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user_hash </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> total_weight</span></span>
<span class="line"><span class="__shiki_140thh">        current_weight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> var_name, var_config </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> variations.items():</span></span>
<span class="line"><span class="__shiki_140thh">            current_weight </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> var_config.get(</span><span class="__shiki_mdbnqw">&quot;weight&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> current_weight </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> target_weight:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> var_name</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(variations.keys())[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _get_flag_config</span><span class="__shiki_140thh">(self, flag_key: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; Optional[Dict]:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取功能开关配置（带缓存）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;feature_flag:</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">flag_key</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 尝试从缓存读取</span></span>
<span class="line"><span class="__shiki_140thh">        cached </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.redis.get(cache_key)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> cached:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> json.loads(cached)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 从数据库读取</span></span>
<span class="line"><span class="__shiki_140thh">        flag_config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._load_from_database(flag_key)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> flag_config:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 写入缓存</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.redis.setex(cache_key, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.cache_ttl, json.dumps(flag_config))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> flag_config</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _load_from_database</span><span class="__shiki_140thh">(self, flag_key: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; Optional[Dict]:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;从数据库加载配置（示例）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 实际实现中会从数据库读取</span></span>
<span class="line"><span class="__shiki_140thh">        flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;new_checkout_flow&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;enabled&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;description&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;新版结账流程&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;rollout_percentage&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 10%用户</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;targeting_rules&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;attribute&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;country&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;operator&quot;</span><span class="__shiki_140thh">: TargetingOperator.</span><span class="__shiki_dzsirb">IN</span><span class="__shiki_140thh">.value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;value&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;US&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;UK&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;CA&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;attribute&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user_type&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;operator&quot;</span><span class="__shiki_140thh">: TargetingOperator.</span><span class="__shiki_dzsirb">EQUALS</span><span class="__shiki_140thh">.value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;value&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;premium&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;variations&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;control&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;weight&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;payload&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;flow_type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;old&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;treatment&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;weight&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;payload&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;flow_type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;new&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> flags.get(flag_key)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;__main__&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    redis_client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redis.Redis(</span><span class="__shiki_1jdh33">host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    feature_service </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> FeatureFlagService(redis_client)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    user_context </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;user_id&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;country&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;US&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;user_type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;premium&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;email&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;user@example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    flag_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> feature_service.get_feature_flag(</span><span class="__shiki_mdbnqw">&quot;new_checkout_flow&quot;</span><span class="__shiki_140thh">, user_context)</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;功能开关状态: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">flag_status</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_3-1-3-客户端sdk集成" tabindex="-1">3.1.3 客户端SDK集成 <a class="header-anchor" href="#_3-1-3-客户端sdk集成" aria-label="Permalink to &quot;3.1.3 客户端SDK集成&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 前端功能开关SDK</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> FeatureFlagClient</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.apiUrl </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.apiUrl </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;https://feature-flags.example.com&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.pollingInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.pollingInterval </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 30秒</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.context </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.context </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.listeners </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_init</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> _init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化加载所有功能开关</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_fetchFlags</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 开始轮询更新</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_startPolling</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听上下文变化</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_setupContextListener</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> _fetchFlags</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">apiUrl</span><span class="__shiki_mdbnqw">}/api/v1/flags/evaluate\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        headers: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          context: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.context,</span></span>
<span class="line"><span class="__shiki_140thh">          flags: Array.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.flags.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 更新本地缓存</span></span>
<span class="line"><span class="__shiki_140thh">      Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(data.flags).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(([</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> oldValue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.flags.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(key, value);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 触发变更事件</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(oldValue) </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(value)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_notifyListeners</span><span class="__shiki_140thh">(key, value);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Failed to fetch feature flags:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  isEnabled</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">defaultValue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> flag</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(flagKey);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> flag?.enabled </span><span class="__shiki_1itgoe">??</span><span class="__shiki_140thh"> defaultValue;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getVariation</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">defaultVariation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> flag</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(flagKey);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> flag?.variation </span><span class="__shiki_1itgoe">??</span><span class="__shiki_140thh"> defaultVariation;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getPayload</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> flag</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(flagKey);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> flag?.payload </span><span class="__shiki_1itgoe">??</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  updateContext</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">newContext</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.context </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.context, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">newContext };</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_fetchFlags</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 立即更新</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  addListener</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">listener</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.listeners.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(listener);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.listeners.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(listener);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  _notifyListeners</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">flagValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.listeners.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">listener</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        listener</span><span class="__shiki_140thh">(flagKey, flagValue);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Feature flag listener error:&#39;</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  _startPolling</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._pollingTimer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">_fetchFlags</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.pollingInterval);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  _setupContextListener</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听用户身份变化等事件</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> window </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &#39;undefined&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 示例：监听登录状态变化</span></span>
<span class="line"><span class="__shiki_140thh">      window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user-login&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateContext</span><span class="__shiki_140thh">({ user_id: event.detail.userId });</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      window.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user-logout&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateContext</span><span class="__shiki_140thh">({ user_id: </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  destroy</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._pollingTimer) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      clearInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._pollingTimer);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.listeners.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// React Hook集成示例</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> React, { createContext, useContext, useEffect, useState } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;react&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> FeatureFlagContext</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createContext</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> FeatureFlagProvider</span><span class="__shiki_140thh">({ </span><span class="__shiki_1jdh33">children</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh"> }) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">flags</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setFlags</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  useEffect</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1t8gfj"> updateFlags</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setFlags</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">prev</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(prev).</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(key, value));</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始获取所有标志</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> initialFlags</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ... 初始化逻辑</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监听变化</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> unsubscribe</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> client?.</span><span class="__shiki_1t8gfj">addListener</span><span class="__shiki_140thh">(updateFlags);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      unsubscribe</span><span class="__shiki_140thh">?.();</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }, [client]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    isEnabled</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(flagKey)?.enabled </span><span class="__shiki_1itgoe">??</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    getVariation</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(flagKey)?.variation,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    getPayload</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> flags.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(flagKey)?.payload,</span></span>
<span class="line"><span class="__shiki_140thh">    updateContext: client?.updateContext.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(client)</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">FeatureFlagContext.Provider</span><span class="__shiki_1t8gfj"> value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{value}&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      {children}</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">FeatureFlagContext.Provider</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> useFeatureFlag</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">flagKey</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> context</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> useContext</span><span class="__shiki_140thh">(FeatureFlagContext);</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">context) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;useFeatureFlag must be used within FeatureFlagProvider&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    isEnabled: context.</span><span class="__shiki_1t8gfj">isEnabled</span><span class="__shiki_140thh">(flagKey),</span></span>
<span class="line"><span class="__shiki_140thh">    variation: context.</span><span class="__shiki_1t8gfj">getVariation</span><span class="__shiki_140thh">(flagKey),</span></span>
<span class="line"><span class="__shiki_140thh">    payload: context.</span><span class="__shiki_1t8gfj">getPayload</span><span class="__shiki_140thh">(flagKey)</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在组件中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> CheckoutPage</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">isEnabled</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">variation</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">payload</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useFeatureFlag</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;new_checkout_flow&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (isEnabled </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> variation </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;treatment&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_dzsirb">NewCheckoutFlow</span><span class="__shiki_1t8gfj"> config</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{payload} /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> &lt;</span><span class="__shiki_dzsirb">OldCheckoutFlow</span><span class="__shiki_140thh"> /&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-服务网格流量控制" tabindex="-1">3.2 服务网格流量控制 <a class="header-anchor" href="#_3-2-服务网格流量控制" aria-label="Permalink to &quot;3.2 服务网格流量控制&quot;">​</a></h3><h4 id="_3-2-1-istio流量管理配置" tabindex="-1">3.2.1 Istio流量管理配置 <a class="header-anchor" href="#_3-2-1-istio流量管理配置" aria-label="Permalink to &quot;3.2.1 Istio流量管理配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Istio VirtualService - 精确流量控制</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.istio.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VirtualService</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">checkout.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  http</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于header的流量路由</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        x-user-type</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">premium</span></span>
<span class="line"><span class="__shiki_17hn0y">      queryParams</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        beta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于cookie的流量路由</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">headers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        cookie</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          regex</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;.*beta_tester=true.*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于百分比的渐进式流量</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">route</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">        subset</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span></code></pre></div><h4 id="_3-2-2-智能流量路由" tabindex="-1">3.2.2 智能流量路由 <a class="header-anchor" href="#_3-2-2-智能流量路由" aria-label="Permalink to &quot;3.2.2 智能流量路由&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Argo Rollouts - 渐进式交付配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">argoproj.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Rollout</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout:v2.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/ready</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    canary</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 渐进式步骤</span></span>
<span class="line"><span class="__shiki_17hn0y">      steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤1: 暂停分析</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">pause</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span><span class="__shiki_21nrsd">  # 等待5分钟收集指标</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤2: 手动批准</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">pause</span><span class="__shiki_140thh">: {}  </span><span class="__shiki_21nrsd"># 无限期暂停，等待手动批准</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤3: 自动分析</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          templates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">success-rate-check</span></span>
<span class="line"><span class="__shiki_17hn0y">          args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">service-name</span></span>
<span class="line"><span class="__shiki_17hn0y">            value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-service</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤4: 完成发布</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 分析模板定义</span></span>
<span class="line"><span class="__shiki_17hn0y">      analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        templates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">success-rate-check</span></span>
<span class="line"><span class="__shiki_17hn0y">          templateSpec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">success-rate</span></span>
<span class="line"><span class="__shiki_17hn0y">              interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">60s</span></span>
<span class="line"><span class="__shiki_17hn0y">              successCondition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">result[0] &gt; 0.99</span><span class="__shiki_21nrsd">  # 成功率&gt;99%</span></span>
<span class="line"><span class="__shiki_17hn0y">              failureLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">              provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  query</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(http_requests_total{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      destination_service=&quot;checkout-service&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      response_code!~&quot;5..&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }[60s]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    /</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(http_requests_total{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      destination_service=&quot;checkout-service&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }[60s]))</span></span></code></pre></div><h3 id="_3-3-监控与可观测性" tabindex="-1">3.3 监控与可观测性 <a class="header-anchor" href="#_3-3-监控与可观测性" aria-label="Permalink to &quot;3.3 监控与可观测性&quot;">​</a></h3><h4 id="_3-3-1-业务指标监控" tabindex="-1">3.3.1 业务指标监控 <a class="header-anchor" href="#_3-3-1-业务指标监控" aria-label="Permalink to &quot;3.3.1 业务指标监控&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus业务指标规则</span></span>
<span class="line"><span class="__shiki_17hn0y">groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">business-metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 转化率监控</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">business:checkout:conversion_rate</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sum(rate(business_checkout_completed_total[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">      /</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sum(rate(business_checkout_started_total[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 平均订单价值（AOV）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">business:checkout:average_order_value</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sum(rate(business_order_value_total[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">      /</span></span>
<span class="line"><span class="__shiki_mdbnqw">      sum(rate(business_orders_completed_total[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 用户参与度</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">record</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">business:user:engagement_score</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sum(rate(user_page_views_total[5m])) * 0.3</span></span>
<span class="line"><span class="__shiki_mdbnqw">        + sum(rate(user_clicks_total[5m])) * 0.4</span></span>
<span class="line"><span class="__shiki_mdbnqw">        + sum(rate(user_sessions_total[5m])) * 0.3</span></span>
<span class="line"><span class="__shiki_mdbnqw">      )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 渐进式交付告警规则</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">progressive-delivery-alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">FeatureFlagPerformanceDegradation</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        avg(rate(http_request_duration_seconds_sum{feature_flag=&quot;new_checkout&quot;}[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        / avg(rate(http_request_duration_seconds_count{feature_flag=&quot;new_checkout&quot;}[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">      )</span></span>
<span class="line"><span class="__shiki_mdbnqw">      /</span></span>
<span class="line"><span class="__shiki_mdbnqw">      (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        avg(rate(http_request_duration_seconds_sum{feature_flag=&quot;old_checkout&quot;}[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">        / avg(rate(http_request_duration_seconds_count{feature_flag=&quot;old_checkout&quot;}[5m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ) &gt; 1.5  # 新版本延迟比旧版本高50%</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;新功能性能下降&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;功能 &#39;new_checkout&#39; 的响应时间比旧版本高50%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">BusinessMetricsDegradation</span></span>
<span class="line"><span class="__shiki_17hn0y">    expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        avg_over_time(business:checkout:conversion_rate{feature=&quot;new_checkout&quot;}[10m])</span></span>
<span class="line"><span class="__shiki_mdbnqw">        /</span></span>
<span class="line"><span class="__shiki_mdbnqw">        avg_over_time(business:checkout:conversion_rate{feature=&quot;old_checkout&quot;}[10m])</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ) &lt; 0.8  # 转化率下降超过20%</span></span>
<span class="line"><span class="__shiki_17hn0y">    for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">    labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;业务指标下降&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;新功能导致转化率下降超过20%&quot;</span></span></code></pre></div><h4 id="_3-3-2-实验分析框架" tabindex="-1">3.3.2 实验分析框架 <a class="header-anchor" href="#_3-3-2-实验分析框架" aria-label="Permalink to &quot;3.3.2 实验分析框架&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># A/B测试统计分析</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> numpy </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> np</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> pandas </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> pd</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> scipy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> stats</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Dict, List, Tuple</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime, timedelta</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ExperimentAnalyzer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;A/B测试实验结果分析器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, metrics_data: Dict):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metrics_data</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.confidence_level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.95</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> analyze_conversion_rate</span><span class="__shiki_140thh">(self, control_data: List[</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">], treatment_data: List[</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">]) -&gt; Dict:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        分析转化率差异</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        control_conversions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(control_data)</span></span>
<span class="line"><span class="__shiki_140thh">        control_total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(control_data)</span></span>
<span class="line"><span class="__shiki_140thh">        treatment_conversions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(treatment_data)</span></span>
<span class="line"><span class="__shiki_140thh">        treatment_total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(treatment_data)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算转化率</span></span>
<span class="line"><span class="__shiki_140thh">        control_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> control_conversions </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> control_total </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> control_total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        treatment_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> treatment_conversions </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> treatment_total </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> treatment_total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算提升</span></span>
<span class="line"><span class="__shiki_140thh">        lift </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (treatment_rate </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> control_rate) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> control_rate </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> control_rate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算统计显著性</span></span>
<span class="line"><span class="__shiki_140thh">        z_score, p_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._calculate_z_test(</span></span>
<span class="line"><span class="__shiki_140thh">            control_conversions, control_total,</span></span>
<span class="line"><span class="__shiki_140thh">            treatment_conversions, treatment_total</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算置信区间</span></span>
<span class="line"><span class="__shiki_140thh">        ci_lower, ci_upper </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._calculate_conversion_ci(</span></span>
<span class="line"><span class="__shiki_140thh">            treatment_rate, treatment_total,</span></span>
<span class="line"><span class="__shiki_140thh">            control_rate, control_total</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算统计功效</span></span>
<span class="line"><span class="__shiki_140thh">        power </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._calculate_statistical_power(</span></span>
<span class="line"><span class="__shiki_140thh">            control_rate, treatment_rate,</span></span>
<span class="line"><span class="__shiki_140thh">            control_total, treatment_total</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算所需样本量</span></span>
<span class="line"><span class="__shiki_140thh">        required_sample </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._calculate_required_sample_size(</span></span>
<span class="line"><span class="__shiki_140thh">            control_rate, </span></span>
<span class="line"><span class="__shiki_1jdh33">            min_detectable_effect</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 5%最小可检测效果</span></span>
<span class="line"><span class="__shiki_1jdh33">            power</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.8</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;control&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;conversions&quot;</span><span class="__shiki_140thh">: control_conversions,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;total&quot;</span><span class="__shiki_140thh">: control_total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;rate&quot;</span><span class="__shiki_140thh">: control_rate</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;treatment&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;conversions&quot;</span><span class="__shiki_140thh">: treatment_conversions,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;total&quot;</span><span class="__shiki_140thh">: treatment_total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;rate&quot;</span><span class="__shiki_140thh">: treatment_rate</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;results&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;lift&quot;</span><span class="__shiki_140thh">: lift,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;lift_percentage&quot;</span><span class="__shiki_140thh">: lift </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;z_score&quot;</span><span class="__shiki_140thh">: z_score,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;p_value&quot;</span><span class="__shiki_140thh">: p_value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;significant&quot;</span><span class="__shiki_140thh">: p_value </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.confidence_level),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;confidence_interval&quot;</span><span class="__shiki_140thh">: (ci_lower, ci_upper),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;statistical_power&quot;</span><span class="__shiki_140thh">: power,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;required_sample_size&quot;</span><span class="__shiki_140thh">: required_sample,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;recommendation&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._get_recommendation(p_value, lift)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> analyze_revenue</span><span class="__shiki_140thh">(self, control_data: List[</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">], treatment_data: List[</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">]) -&gt; Dict:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        分析收入/订单价值差异</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        control_mean </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.mean(control_data)</span></span>
<span class="line"><span class="__shiki_140thh">        control_std </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.std(control_data, </span><span class="__shiki_1jdh33">ddof</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        treatment_mean </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.mean(treatment_data)</span></span>
<span class="line"><span class="__shiki_140thh">        treatment_std </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.std(treatment_data, </span><span class="__shiki_1jdh33">ddof</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 执行t检验</span></span>
<span class="line"><span class="__shiki_140thh">        t_stat, p_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.ttest_ind(control_data, treatment_data, </span><span class="__shiki_1jdh33">equal_var</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算提升</span></span>
<span class="line"><span class="__shiki_140thh">        lift </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (treatment_mean </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> control_mean) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> control_mean </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> control_mean </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算置信区间</span></span>
<span class="line"><span class="__shiki_140thh">        ci_lower, ci_upper </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.t.interval(</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.confidence_level,</span></span>
<span class="line"><span class="__shiki_dzsirb">            len</span><span class="__shiki_140thh">(treatment_data) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            loc</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">treatment_mean,</span></span>
<span class="line"><span class="__shiki_1jdh33">            scale</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">stats.sem(treatment_data)</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;control&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;mean&quot;</span><span class="__shiki_140thh">: control_mean,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;std&quot;</span><span class="__shiki_140thh">: control_std,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;count&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(control_data)</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;treatment&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;mean&quot;</span><span class="__shiki_140thh">: treatment_mean,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;std&quot;</span><span class="__shiki_140thh">: treatment_std,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;count&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(treatment_data)</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;results&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;lift&quot;</span><span class="__shiki_140thh">: lift,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;t_statistic&quot;</span><span class="__shiki_140thh">: t_stat,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;p_value&quot;</span><span class="__shiki_140thh">: p_value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;significant&quot;</span><span class="__shiki_140thh">: p_value </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.confidence_level),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;confidence_interval&quot;</span><span class="__shiki_140thh">: (ci_lower, ci_upper)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> analyze_sequential_data</span><span class="__shiki_140thh">(self, daily_data: Dict) -&gt; pd.DataFrame:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        分析时间序列数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        df </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pd.DataFrame(daily_data)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算累积指标</span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;cumulative_conversions_control&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;conversions_control&#39;</span><span class="__shiki_140thh">].cumsum()</span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;cumulative_total_control&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;total_control&#39;</span><span class="__shiki_140thh">].cumsum()</span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;cumulative_rate_control&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;cumulative_conversions_control&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;cumulative_total_control&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;cumulative_conversions_treatment&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;conversions_treatment&#39;</span><span class="__shiki_140thh">].cumsum()</span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;cumulative_total_treatment&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;total_treatment&#39;</span><span class="__shiki_140thh">].cumsum()</span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;cumulative_rate_treatment&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;cumulative_conversions_treatment&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;cumulative_total_treatment&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算每天的统计显著性</span></span>
<span class="line"><span class="__shiki_140thh">        p_values </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> idx </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(df)):</span></span>
<span class="line"><span class="__shiki_140thh">            control_conversions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df.loc[idx, </span><span class="__shiki_mdbnqw">&#39;cumulative_conversions_control&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            control_total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df.loc[idx, </span><span class="__shiki_mdbnqw">&#39;cumulative_total_control&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            treatment_conversions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df.loc[idx, </span><span class="__shiki_mdbnqw">&#39;cumulative_conversions_treatment&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            treatment_total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df.loc[idx, </span><span class="__shiki_mdbnqw">&#39;cumulative_total_treatment&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            _, p_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._calculate_z_test(</span></span>
<span class="line"><span class="__shiki_140thh">                control_conversions, control_total,</span></span>
<span class="line"><span class="__shiki_140thh">                treatment_conversions, treatment_total</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            p_values.append(p_value)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;p_value&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_values</span></span>
<span class="line"><span class="__shiki_140thh">        df[</span><span class="__shiki_mdbnqw">&#39;significant&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> df[</span><span class="__shiki_mdbnqw">&#39;p_value&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.confidence_level)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> df</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _calculate_z_test</span><span class="__shiki_140thh">(self, x1, n1, x2, n2):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算两个比例的Z检验&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        p1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> x1 </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> n1 </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> n1 </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        p2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> x2 </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> n2 </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> n2 </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 合并比例</span></span>
<span class="line"><span class="__shiki_140thh">        p </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (x1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> x2) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n2) </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n2) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 标准误差</span></span>
<span class="line"><span class="__shiki_140thh">        se </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.sqrt(p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> p) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">n2))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Z分数</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> se </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            z </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (p2 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> p1) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> se</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            z </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # P值（双尾检验）</span></span>
<span class="line"><span class="__shiki_140thh">        p_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> stats.norm.cdf(</span><span class="__shiki_dzsirb">abs</span><span class="__shiki_140thh">(z)))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> z, p_value</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _calculate_conversion_ci</span><span class="__shiki_140thh">(self, p, n, baseline_p</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算转化率的置信区间&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 标准误差</span></span>
<span class="line"><span class="__shiki_140thh">        se </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.sqrt(p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> p) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> n)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Z分数（95%置信度）</span></span>
<span class="line"><span class="__shiki_140thh">        z </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.norm.ppf((</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.confidence_level) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        margin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> z </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> se</span></span>
<span class="line"><span class="__shiki_140thh">        ci_lower </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, p </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> margin)</span></span>
<span class="line"><span class="__shiki_140thh">        ci_upper </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, p </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> margin)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ci_lower, ci_upper</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _calculate_statistical_power</span><span class="__shiki_140thh">(self, p1, p2, n1, n2, alpha</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算统计功效&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 效果大小</span></span>
<span class="line"><span class="__shiki_140thh">        effect_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> abs</span><span class="__shiki_140thh">(p2 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> p1)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 合并标准差</span></span>
<span class="line"><span class="__shiki_140thh">        pooled_p </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (p1 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> p2 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> n2) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n2)</span></span>
<span class="line"><span class="__shiki_140thh">        pooled_se </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.sqrt(pooled_p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> pooled_p) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">n2))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> pooled_se </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 标准化效果大小</span></span>
<span class="line"><span class="__shiki_140thh">        standardized_effect </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> effect_size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> pooled_se</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算Z分数</span></span>
<span class="line"><span class="__shiki_140thh">        z_alpha </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.norm.ppf(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> alpha</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        z_beta </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> standardized_effect </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> np.sqrt(n1 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> n2 </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (n1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> n2)) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> z_alpha</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 统计功效</span></span>
<span class="line"><span class="__shiki_140thh">        power </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.norm.cdf(z_beta)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> power</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _calculate_required_sample_size</span><span class="__shiki_140thh">(self, baseline_rate, min_detectable_effect</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">, power</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.8</span><span class="__shiki_140thh">, alpha</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;计算所需样本量&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Z分数</span></span>
<span class="line"><span class="__shiki_140thh">        z_alpha </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.norm.ppf(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> alpha</span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        z_beta </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats.norm.ppf(power)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 标准差</span></span>
<span class="line"><span class="__shiki_140thh">        p1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> baseline_rate</span></span>
<span class="line"><span class="__shiki_140thh">        p2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> baseline_rate </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> min_detectable_effect)</span></span>
<span class="line"><span class="__shiki_140thh">        pooled_p </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (p1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> p2) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 所需样本量（每组）</span></span>
<span class="line"><span class="__shiki_140thh">        n </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ((z_alpha </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> np.sqrt(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> pooled_p </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> pooled_p)) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">              z_beta </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> np.sqrt(p1 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> p1) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> p2 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> p2))) </span><span class="__shiki_1itgoe">**</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (p2 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> p1) </span><span class="__shiki_1itgoe">**</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> int</span><span class="__shiki_140thh">(np.ceil(n))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _get_recommendation</span><span class="__shiki_140thh">(self, p_value: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">, lift: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;基于结果给出建议&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> p_value </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> lift </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 提升超过10%</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;STRONGLY_RECOMMEND&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            elif</span><span class="__shiki_140thh"> lift </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 提升5-10%</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;RECOMMEND&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            elif</span><span class="__shiki_140thh"> lift </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.02</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 提升2-5%</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;CONSIDER&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            elif</span><span class="__shiki_140thh"> lift </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 提升小于2%</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;MAYBE&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 负向提升</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;REJECT&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> lift </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;NEED_MORE_DATA&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_mdbnqw"> &quot;INCONCLUSIVE&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;__main__&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 模拟数据</span></span>
<span class="line"><span class="__shiki_140thh">    analyzer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ExperimentAnalyzer({})</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 转化率分析</span></span>
<span class="line"><span class="__shiki_140thh">    control_conversions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.random.binomial(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 10%转化率</span></span>
<span class="line"><span class="__shiki_140thh">    treatment_conversions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.random.binomial(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.12</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 12%转化率</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> analyzer.analyze_conversion_rate(</span></span>
<span class="line"><span class="__shiki_140thh">        control_conversions.tolist(),</span></span>
<span class="line"><span class="__shiki_140thh">        treatment_conversions.tolist()</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(json.dumps(result, </span><span class="__shiki_1jdh33">indent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">))</span></span></code></pre></div><h2 id="四、渐进式交付模式" tabindex="-1">四、渐进式交付模式 <a class="header-anchor" href="#四、渐进式交付模式" aria-label="Permalink to &quot;四、渐进式交付模式&quot;">​</a></h2><h3 id="_4-1-渐进式交付模式矩阵" tabindex="-1">4.1 渐进式交付模式矩阵 <a class="header-anchor" href="#_4-1-渐进式交付模式矩阵" aria-label="Permalink to &quot;4.1 渐进式交付模式矩阵&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">progressive_delivery_patterns</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  percentage_based_rollout</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;基于百分比的逐步发布&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">新功能逐步上线</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">风险较低的功能</span></span>
<span class="line"><span class="__shiki_17hn0y">    implementation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">功能开关配置百分比</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">负载均衡器权重调整</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">服务网格流量路由</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  targeted_rollout</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;基于目标的精确发布&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">内部测试</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">Beta测试</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">地域性发布</span></span>
<span class="line"><span class="__shiki_17hn0y">    targeting_dimensions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">用户ID/邮箱</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">地理位置</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">用户角色/计划</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">设备类型</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">行为特征</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  canary_release</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;金丝雀发布&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">高风险变更</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基础架构升级</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">性能敏感功能</span></span>
<span class="line"><span class="__shiki_17hn0y">    implementation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">将少量流量路由到新版本</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">监控关键指标</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基于指标自动决策</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  a_b_testing</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;A/B测试&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">UI/UX优化</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">定价实验</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">营销活动</span></span>
<span class="line"><span class="__shiki_17hn0y">    variations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">控制组（A）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">实验组（B）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">多变量测试（MVT）</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">转化率</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">收入/订单价值</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">用户参与度</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  feature_flags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;功能开关&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">功能权限控制</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">紧急问题修复</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">功能灰度发布</span></span>
<span class="line"><span class="__shiki_17hn0y">    types</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">释放开关（Release Toggles）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">实验开关（Experiment Toggles）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">运维开关（Ops Toggles）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">权限开关（Permission Toggles&quot;)</span></span></code></pre></div><h3 id="_4-2-渐进式交付编排器" tabindex="-1">4.2 渐进式交付编排器 <a class="header-anchor" href="#_4-2-渐进式交付编排器" aria-label="Permalink to &quot;4.2 渐进式交付编排器&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 渐进式交付编排器</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> asyncio</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Dict, List, Optional, Any</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> dataclasses </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">logging.basicConfig(</span><span class="__shiki_1jdh33">level</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">logging.</span><span class="__shiki_dzsirb">INFO</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logging.getLogger(</span><span class="__shiki_dzsirb">__name__</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RolloutStep</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_dzsirb">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_21nrsd">  # percentage, targeting, pause, analysis</span></span>
<span class="line"><span class="__shiki_140thh">    config: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, Any]</span></span>
<span class="line"><span class="__shiki_140thh">    duration_minutes: Optional[</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    requires_approval: </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RolloutPhase</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    steps: List[RolloutStep]</span></span>
<span class="line"><span class="__shiki_140thh">    entry_criteria: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, Any]</span></span>
<span class="line"><span class="__shiki_140thh">    exit_criteria: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, Any]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ProgressiveDeliveryOrchestrator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, config: Dict):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.current_phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.current_step </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.metrics_client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MetricsClient()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.feature_flag_client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> FeatureFlagClient()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.approval_client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ApprovalClient()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> execute_rollout</span><span class="__shiki_140thh">(self, rollout_plan: Dict):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行渐进式发布计划&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;开始执行发布计划: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">rollout_plan[</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        phases </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rollout_plan.get(</span><span class="__shiki_mdbnqw">&#39;phases&#39;</span><span class="__shiki_140thh">, [])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> phase_config </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> phases:</span></span>
<span class="line"><span class="__shiki_140thh">            phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> RolloutPhase(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">phase_config)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查进入条件</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._check_entry_criteria(phase.entry_criteria):</span></span>
<span class="line"><span class="__shiki_140thh">                logger.warning(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;阶段 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">phase.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 进入条件不满足，跳过&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;进入阶段: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">phase.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.current_phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> phase.name</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> step_config </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> phase.steps:</span></span>
<span class="line"><span class="__shiki_140thh">                step </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> RolloutStep(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">step_config)</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.current_step </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.name</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;执行步骤: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">step.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">step.type</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 执行步骤</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> step.type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;percentage&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._execute_percentage_step(step)</span></span>
<span class="line"><span class="__shiki_1itgoe">                elif</span><span class="__shiki_140thh"> step.type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;targeting&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._execute_targeting_step(step)</span></span>
<span class="line"><span class="__shiki_1itgoe">                elif</span><span class="__shiki_140thh"> step.type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;pause&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._execute_pause_step(step)</span></span>
<span class="line"><span class="__shiki_1itgoe">                elif</span><span class="__shiki_140thh"> step.type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;analysis&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._execute_analysis_step(step)</span></span>
<span class="line"><span class="__shiki_1itgoe">                elif</span><span class="__shiki_140thh"> step.type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;approval&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._execute_approval_step(step)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 检查退出条件</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._check_exit_criteria(phase.exit_criteria):</span></span>
<span class="line"><span class="__shiki_140thh">                    logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;阶段 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">phase.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 退出条件满足，进入下一阶段&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    break</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 步骤间等待</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> step.duration_minutes:</span></span>
<span class="line"><span class="__shiki_140thh">                    logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;步骤等待 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">step.duration_minutes</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 分钟&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    await</span><span class="__shiki_140thh"> asyncio.sleep(step.duration_minutes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_mdbnqw">&quot;发布计划执行完成&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _execute_percentage_step</span><span class="__shiki_140thh">(self, step: RolloutStep):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行百分比发布步骤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        percentage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;percentage&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        feature_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;feature_key&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;设置功能 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">feature_key</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 发布百分比为 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">percentage</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">%&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 更新功能开关配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.feature_flag_client.update_rollout_percentage(</span></span>
<span class="line"><span class="__shiki_140thh">            feature_key, percentage</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 验证更新</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._verify_percentage_update(feature_key, percentage)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _execute_targeting_step</span><span class="__shiki_140thh">(self, step: RolloutStep):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行目标发布步骤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        targeting_rules </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;rules&#39;</span><span class="__shiki_140thh">, [])</span></span>
<span class="line"><span class="__shiki_140thh">        feature_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;feature_key&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;更新功能 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">feature_key</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 的目标规则&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 更新目标规则</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.feature_flag_client.update_targeting_rules(</span></span>
<span class="line"><span class="__shiki_140thh">            feature_key, targeting_rules</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _execute_pause_step</span><span class="__shiki_140thh">(self, step: RolloutStep):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行暂停步骤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.duration_minutes </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;duration_minutes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;暂停 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">duration</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 分钟，监控指标&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 在暂停期间监控指标</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._monitor_during_pause(duration)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _execute_analysis_step</span><span class="__shiki_140thh">(self, step: RolloutStep):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行分析步骤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;metrics&#39;</span><span class="__shiki_140thh">, [])</span></span>
<span class="line"><span class="__shiki_140thh">        thresholds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;thresholds&#39;</span><span class="__shiki_140thh">, {})</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_mdbnqw">&quot;执行自动化分析&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        analysis_results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> metric_config </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> metrics:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._analyze_metric(metric_config, thresholds)</span></span>
<span class="line"><span class="__shiki_140thh">            analysis_results.append(result)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基于分析结果决策</span></span>
<span class="line"><span class="__shiki_140thh">        decision </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._make_decision_based_on_analysis(analysis_results)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> decision </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;continue&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            logger.info(</span><span class="__shiki_mdbnqw">&quot;分析通过，继续发布&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> decision </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;pause&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            logger.warning(</span><span class="__shiki_mdbnqw">&quot;分析发现问题，暂停发布&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_140thh"> RolloutPausedException(</span><span class="__shiki_mdbnqw">&quot;分析发现问题&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> decision </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;rollback&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            logger.error(</span><span class="__shiki_mdbnqw">&quot;分析发现严重问题，触发回滚&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_140thh"> RolloutFailedException(</span><span class="__shiki_mdbnqw">&quot;严重问题，需要回滚&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _execute_approval_step</span><span class="__shiki_140thh">(self, step: RolloutStep):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行审批步骤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        approvers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;approvers&#39;</span><span class="__shiki_140thh">, [])</span></span>
<span class="line"><span class="__shiki_140thh">        timeout_minutes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> step.config.get(</span><span class="__shiki_mdbnqw">&#39;timeout_minutes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;等待审批，审批人: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">approvers</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 发送审批请求</span></span>
<span class="line"><span class="__shiki_140thh">        approval_request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.approval_client.request_approval(</span></span>
<span class="line"><span class="__shiki_1jdh33">            rollout_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_phase,</span></span>
<span class="line"><span class="__shiki_1jdh33">            step_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_step,</span></span>
<span class="line"><span class="__shiki_1jdh33">            approvers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">approvers,</span></span>
<span class="line"><span class="__shiki_1jdh33">            timeout_minutes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">timeout_minutes</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 等待审批结果</span></span>
<span class="line"><span class="__shiki_140thh">        approved </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.approval_client.wait_for_approval(</span></span>
<span class="line"><span class="__shiki_140thh">            approval_request.id, timeout_minutes</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> approved:</span></span>
<span class="line"><span class="__shiki_140thh">            logger.warning(</span><span class="__shiki_mdbnqw">&quot;审批未通过，暂停发布&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_140thh"> RolloutPausedException(</span><span class="__shiki_mdbnqw">&quot;审批未通过&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        logger.info(</span><span class="__shiki_mdbnqw">&quot;审批通过，继续发布&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _analyze_metric</span><span class="__shiki_140thh">(self, metric_config: Dict, thresholds: Dict) -&gt; Dict:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;分析单个指标&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        metric_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metric_config[</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metric_config[</span><span class="__shiki_mdbnqw">&#39;query&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        time_range </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metric_config.get(</span><span class="__shiki_mdbnqw">&#39;time_range&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;5m&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取指标数据</span></span>
<span class="line"><span class="__shiki_140thh">        data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.metrics_client.query_prometheus(query, time_range)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算指标值</span></span>
<span class="line"><span class="__shiki_140thh">        metric_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._calculate_metric_value(data, metric_config)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取阈值</span></span>
<span class="line"><span class="__shiki_140thh">        min_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> thresholds.get(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">metric_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">_min&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        max_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> thresholds.get(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">metric_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">_max&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查是否超出阈值</span></span>
<span class="line"><span class="__shiki_140thh">        is_healthy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> min_threshold </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> metric_value </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> min_threshold:</span></span>
<span class="line"><span class="__shiki_140thh">            is_healthy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> max_threshold </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> metric_value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> max_threshold:</span></span>
<span class="line"><span class="__shiki_140thh">            is_healthy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;metric&#39;</span><span class="__shiki_140thh">: metric_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;value&#39;</span><span class="__shiki_140thh">: metric_value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;thresholds&#39;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&#39;min&#39;</span><span class="__shiki_140thh">: min_threshold, </span><span class="__shiki_mdbnqw">&#39;max&#39;</span><span class="__shiki_140thh">: max_threshold},</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;is_healthy&#39;</span><span class="__shiki_140thh">: is_healthy</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _make_decision_based_on_analysis</span><span class="__shiki_140thh">(self, analysis_results: List[Dict]) -&gt; </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;基于分析结果做出决策&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        healthy_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> for</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> analysis_results </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> r[</span><span class="__shiki_mdbnqw">&#39;is_healthy&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        total_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(analysis_results)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> healthy_count </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> total_count:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;continue&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> healthy_count </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> total_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 70%指标健康</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;pause&#39;</span><span class="__shiki_21nrsd">  # 暂停并调查</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;rollback&#39;</span><span class="__shiki_21nrsd">  # 多数指标不健康，回滚</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _monitor_during_pause</span><span class="__shiki_140thh">(self, duration_minutes: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;在暂停期间监控&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        check_interval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_21nrsd">  # 每30秒检查一次</span></span>
<span class="line"><span class="__shiki_140thh">        total_checks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> duration_minutes </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> //</span><span class="__shiki_140thh"> check_interval</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(total_checks):</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查关键指标</span></span>
<span class="line"><span class="__shiki_140thh">            critical_metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;error_rate&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;latency_p95&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;throughput&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> critical_metrics:</span></span>
<span class="line"><span class="__shiki_140thh">                value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.metrics_client.get_current_metric(metric)</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 如果有指标异常，立即停止</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._is_metric_critical(metric, value):</span></span>
<span class="line"><span class="__shiki_140thh">                    logger.error(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;监控发现严重问题: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">metric</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> = </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">value</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    raise</span><span class="__shiki_140thh"> RolloutFailedException(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">metric</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> 异常: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">value</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            await</span><span class="__shiki_140thh"> asyncio.sleep(check_interval)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _is_metric_critical</span><span class="__shiki_140thh">(self, metric: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, value: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;判断指标是否达到临界值&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        thresholds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;error_rate&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.05</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 错误率超过5%</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;latency_p95&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># P95延迟超过1秒</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;throughput&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd"># 吞吐量下降超过50%</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> thresholds:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> metric </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;throughput&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> thresholds[metric]</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> thresholds[metric]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义渐进式发布计划</span></span>
<span class="line"><span class="__shiki_140thh">    rollout_plan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;new-checkout-flow-v2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;description&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;新版结账流程渐进式发布&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;phases&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;internal-testing&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;entry_criteria&quot;</span><span class="__shiki_140thh">: {},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;exit_criteria&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;duration_minutes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;steps&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;enable-internal&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;targeting&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;config&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;feature_key&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;new_checkout&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;rules&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                                {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &quot;attribute&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &quot;operator&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ends_with&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &quot;value&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;@company.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                                }</span></span>
<span class="line"><span class="__shiki_140thh">                            ]</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;pause-and-monitor&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;pause&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;duration_minutes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;percentage-rollout&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;entry_criteria&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;previous_phase&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;internal-testing&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;exit_criteria&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;percentage&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;steps&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1-percent&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;percentage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;config&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;feature_key&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;new_checkout&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;percentage&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;duration_minutes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;analyze-1-percent&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;analysis&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;config&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;metrics&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                                {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;error_rate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &quot;query&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rate(http_requests_total{status=~&#39;5..&#39;}[5m])&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &quot;time_range&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                                }</span></span>
<span class="line"><span class="__shiki_140thh">                            ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;thresholds&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &quot;error_rate_max&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.01</span></span>
<span class="line"><span class="__shiki_140thh">                            }</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5-percent&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;type&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;percentage&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;config&quot;</span><span class="__shiki_140thh">: {</span><span class="__shiki_mdbnqw">&quot;feature_key&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;new_checkout&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;percentage&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;duration_minutes&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # ... 更多步骤</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    orchestrator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ProgressiveDeliveryOrchestrator({})</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> orchestrator.execute_rollout(rollout_plan)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;渐进式发布成功完成&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_140thh"> RolloutFailedException </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;发布失败: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 触发自动回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_140thh"> RolloutPausedException </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;发布暂停: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 等待人工干预</span></span></code></pre></div><h2 id="五、渐进式交付最佳实践" tabindex="-1">五、渐进式交付最佳实践 <a class="header-anchor" href="#五、渐进式交付最佳实践" aria-label="Permalink to &quot;五、渐进式交付最佳实践&quot;">​</a></h2><h3 id="_5-1-渐进式交付成熟度模型" tabindex="-1">5.1 渐进式交付成熟度模型 <a class="header-anchor" href="#_5-1-渐进式交付成熟度模型" aria-label="Permalink to &quot;5.1 渐进式交付成熟度模型&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">maturity_levels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  level_1_basic</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;基础级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">手动部署</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基本的健康检查</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">手动回滚</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署成功率</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_2bbn9v"> 90%</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 平均恢复时间: &lt; 4小时</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  level_2_standardized</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;标准化&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">自动化部署流水线</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">蓝绿部署</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基本的监控</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">功能开关</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署频率</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">每周多次</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署失败率</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&lt; 5%</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">平均恢复时间</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&lt; 1小时</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  level_3_advanced</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;高级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">金丝雀发布</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">自动化测试</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">全面的监控</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">基于指标的发布</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署频率</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">每日多次</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署失败率</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&lt; 1%</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">平均恢复时间</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&lt; 15分钟</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  level_4_progressive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;渐进式&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">渐进式交付</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">功能开关管理平台</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">A/B测试</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">自动化决策</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">实时业务指标</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署频率</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">按需</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">部署失败率</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&lt; 0.1%</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">平均恢复时间</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&lt; 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">功能发布成功率</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_2bbn9v"> 99%</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  level_5_autonomous:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    name: &quot;自治&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    capabilities:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 机器学习驱动的发布</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 预测性分析</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 完全自动化决策</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 自我修复</span></span>
<span class="line"><span class="__shiki_mdbnqw">    metrics:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 零停机发布</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 预测准确率: &gt; 95%</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - 用户影响率: 0%</span></span></code></pre></div><h3 id="_5-2-渐进式交付检查清单" tabindex="-1">5.2 渐进式交付检查清单 <a class="header-anchor" href="#_5-2-渐进式交付检查清单" aria-label="Permalink to &quot;5.2 渐进式交付检查清单&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># 渐进式交付实施检查清单</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 1. 基础设施准备</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 服务网格（Istio/Linkerd）部署和配置</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 功能开关管理平台就绪</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 监控和告警系统就绪</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 分布式追踪系统就绪</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 日志聚合系统就绪</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 2. 应用开发要求</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 应用支持功能开关</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 应用暴露健康检查端点</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 应用生成业务指标</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 应用支持多版本共存</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 数据库变更前向兼容</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 3. 发布流程定义</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 定义渐进式发布阶段</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 确定关键业务指标</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 设置自动决策规则</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 定义回滚策略</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 准备紧急预案</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 4. 团队协作流程</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 开发团队熟悉功能开关</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 运维团队熟悉监控系统</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 产品团队熟悉A/B测试流程</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 建立发布评审委员会</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 定义发布沟通机制</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 5. 安全与合规</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 功能开关权限控制</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 数据隐私保护</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 合规性检查</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 审计日志记录</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> [ ] 数据保留策略</span></span></code></pre></div><h3 id="_5-3-渐进式交付度量指标" tabindex="-1">5.3 渐进式交付度量指标 <a class="header-anchor" href="#_5-3-渐进式交付度量指标" aria-label="Permalink to &quot;5.3 渐进式交付度量指标&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">key_metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  deployment_metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;发布频率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;单位时间内的发布次数&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;每日多次&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;count(deployments) / time_period&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;发布成功率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;成功完成的发布比例&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&gt; 99%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;successful_deployments / total_deployments&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;平均恢复时间（MTTR）&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;从发现问题到恢复的平均时间&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&lt; 5分钟&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sum(recovery_time) / incidents&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  quality_metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;用户影响率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;受发布问题影响的用户比例&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&lt; 0.1%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;affected_users / total_users&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;错误检测时间&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;从问题发生到检测到的时间&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&lt; 1分钟&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;detection_time - incident_start_time&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;自动回滚率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;自动回滚占所有回滚的比例&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&gt; 90%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;auto_rollbacks / total_rollbacks&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  business_metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;功能采用率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;用户使用新功能的比率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;根据功能目标&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;users_using_feature / eligible_users&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;业务指标提升&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;发布带来的业务指标变化&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;正向提升&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;post_release_metric - pre_release_metric&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;实验成功率&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;A/B测试成功的比例&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      target</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&gt; 30%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      calculation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;successful_experiments / total_experiments&quot;</span></span></code></pre></div><h2 id="六、工具生态系统" tabindex="-1">六、工具生态系统 <a class="header-anchor" href="#六、工具生态系统" aria-label="Permalink to &quot;六、工具生态系统&quot;">​</a></h2><h3 id="_6-1-渐进式交付工具矩阵" tabindex="-1">6.1 渐进式交付工具矩阵 <a class="header-anchor" href="#_6-1-渐进式交付工具矩阵" aria-label="Permalink to &quot;6.1 渐进式交付工具矩阵&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">tools_ecosystem</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  feature_flag_management</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    commercial</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">LaunchDarkly</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;全功能平台，支持复杂的目标规则和实验&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Split.io</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;功能开关和实验平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Optimizely</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;A/B测试和个性化平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Flagsmith</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;开源和商业版都可用&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    open_source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Unleash</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;最流行的开源功能开关平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Flipper</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Ruby社区流行的功能开关gem&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Togglz</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Java功能开关库&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">Flagr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Uber开源的A/B测试和功能开关平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  service_mesh</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Istio</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;最流行的服务网格，强大的流量管理功能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Linkerd</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;轻量级服务网格，专注于简单性和性能&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Consul Connect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;HashiCorp的服务网格解决方案&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">AWS App Mesh</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;AWS的服务网格服务&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  progressive_delivery_platforms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Argo Rollouts</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Kubernetes原生渐进式交付控制器&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Flagger</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;基于服务网格的渐进式交付工具&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Spinnaker</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;多云持续交付平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Harness</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;现代软件交付平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  monitoring_and_observability</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Prometheus + Grafana</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;指标监控和可视化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Datadog</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;全栈可观测性平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">New Relic</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;应用性能监控&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Lightstep</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;分布式追踪和监控&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Honeycomb</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;事件驱动的可观测性&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  experiment_analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Google Optimize</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;A/B测试和个性化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Statsig</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;功能开关和实验平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Eppo</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;企业级实验平台&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">Planout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Facebook开源的A/B测试框架&quot;</span></span></code></pre></div><h3 id="_6-2-集成示例-argo-rollouts-flagger-prometheus" tabindex="-1">6.2 集成示例：Argo Rollouts + Flagger + Prometheus <a class="header-anchor" href="#_6-2-集成示例-argo-rollouts-flagger-prometheus" aria-label="Permalink to &quot;6.2 集成示例：Argo Rollouts + Flagger + Prometheus&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 完整渐进式交付配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">argoproj.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Rollout</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ecommerce-checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout:v2.1.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">FEATURE_FLAG_API_URL</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;http://feature-flags.unleash.svc.cluster.local:4242&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">FEATURE_FLAG_API_TOKEN</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            secretKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">unleash-api-token</span></span>
<span class="line"><span class="__shiki_17hn0y">              key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">token</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    canary</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      canaryService</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-canary</span></span>
<span class="line"><span class="__shiki_17hn0y">      stableService</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-primary</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">pause</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          templates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-analysis</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          templates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-analysis</span></span>
<span class="line"><span class="__shiki_17hn0y">          args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">latency-threshold</span></span>
<span class="line"><span class="__shiki_17hn0y">            value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          templates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">business-metrics-analysis</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">setWeight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      analysis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        templates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary-analysis</span></span>
<span class="line"><span class="__shiki_17hn0y">          templateSpec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">error-rate</span></span>
<span class="line"><span class="__shiki_17hn0y">              interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">              successCondition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">result[0] &lt;= 0.01</span></span>
<span class="line"><span class="__shiki_17hn0y">              failureLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">              provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  query</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(http_requests_total{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      destination_service=&quot;checkout&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      response_code=~&quot;5..&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }[30s]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    /</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(http_requests_total{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      destination_service=&quot;checkout&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    }[30s]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">latency</span></span>
<span class="line"><span class="__shiki_17hn0y">              interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">              successCondition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">result[0] &lt;= 1000</span></span>
<span class="line"><span class="__shiki_17hn0y">              provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  query</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    histogram_quantile(0.95,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      rate(http_request_duration_seconds_bucket{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        destination_service=&quot;checkout&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      }[30s])</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">templateName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">business-metrics-analysis</span></span>
<span class="line"><span class="__shiki_17hn0y">          templateSpec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">conversion-rate</span></span>
<span class="line"><span class="__shiki_17hn0y">              interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">              successCondition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">result[0] &gt;= 0.15</span></span>
<span class="line"><span class="__shiki_17hn0y">              failureCondition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">result[0] &lt; 0.12</span></span>
<span class="line"><span class="__shiki_17hn0y">              provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  query</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(business_checkout_completed_total[2m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    /</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(business_checkout_started_total[2m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">revenue-per-user</span></span>
<span class="line"><span class="__shiki_17hn0y">              interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">              successCondition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">result[0] &gt;= 50</span></span>
<span class="line"><span class="__shiki_17hn0y">              provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                prometheus</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                  query</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(business_order_value_total[2m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    /</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    sum(rate(business_active_users_total[2m]))</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      trafficRouting</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        istio</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          virtualService</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-vs</span></span>
<span class="line"><span class="__shiki_17hn0y">            routes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">primary</span></span>
<span class="line"><span class="__shiki_17hn0y">          destinationRule</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout-dr</span></span>
<span class="line"><span class="__shiki_17hn0y">            canarySubsetName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">canary</span></span>
<span class="line"><span class="__shiki_17hn0y">            stableSubsetName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">primary</span></span></code></pre></div><h2 id="七、挑战与解决方案" tabindex="-1">七、挑战与解决方案 <a class="header-anchor" href="#七、挑战与解决方案" aria-label="Permalink to &quot;七、挑战与解决方案&quot;">​</a></h2><h3 id="_7-1-常见挑战及应对策略" tabindex="-1">7.1 常见挑战及应对策略 <a class="header-anchor" href="#_7-1-常见挑战及应对策略" aria-label="Permalink to &quot;7.1 常见挑战及应对策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">challenges_and_solutions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  data_consistency</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    challenge</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;多个版本同时运行时数据模式兼容性问题&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    solutions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;使用前向兼容的数据库迁移&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;实现数据双写和回填机制&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;使用事件溯源模式&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;实施API版本管理&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  stateful_applications</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    challenge</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;有状态应用难以支持多个版本并行运行&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    solutions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;将会话状态外部化（Redis等）&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;使用粘性会话和版本感知路由&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;实施数据迁移窗口&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;采用蓝绿部署替代渐进式交付&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  testing_complexity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    challenge</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;多个功能开关组合导致测试矩阵爆炸&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    solutions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;实施功能开关的测试策略&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;使用配置测试工具&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;实施集成测试自动化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;采用契约测试&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  organizational_change</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    challenge</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;团队需要改变工作方式和思维模式&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    solutions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;渐进式采用，从简单开始&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;建立内部专家和冠军&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;提供培训和支持&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;调整考核和激励指标&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  cost_and_complexity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    challenge</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;工具和基础设施增加成本和复杂度&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    solutions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;从开源工具开始&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;云托管服务降低运维成本&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;逐步引入，避免大爆炸式变革&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;投资自动化降低长期成本&quot;</span></span></code></pre></div><h3 id="_7-2-渐进式交付反模式" tabindex="-1">7.2 渐进式交付反模式 <a class="header-anchor" href="#_7-2-渐进式交付反模式" aria-label="Permalink to &quot;7.2 渐进式交付反模式&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_19pls7"># 渐进式交付反模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 1. 功能开关蔓延</span></span>
<span class="line"><span class="__shiki_28tyc3">**现象**</span><span class="__shiki_140thh">: 功能开关数量失控，难以管理</span></span>
<span class="line"><span class="__shiki_28tyc3">**后果**</span><span class="__shiki_140thh">: 技术债务增加，测试复杂度爆炸</span></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 定期清理过期的功能开关</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 建立功能开关生命周期管理</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 使用功能开关分类和标签</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 2. 监控过载</span></span>
<span class="line"><span class="__shiki_28tyc3">**现象**</span><span class="__shiki_140thh">: 监控指标过多，难以识别关键信号</span></span>
<span class="line"><span class="__shiki_28tyc3">**后果**</span><span class="__shiki_140thh">: 警报疲劳，真正的问题被忽略</span></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 专注于关键业务指标</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 建立指标层次结构</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 实施智能警报聚合</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 3. 自动化迷信</span></span>
<span class="line"><span class="__shiki_28tyc3">**现象**</span><span class="__shiki_140thh">: 过度依赖自动化，缺乏人工监督</span></span>
<span class="line"><span class="__shiki_28tyc3">**后果**</span><span class="__shiki_140thh">: 自动化错误被放大，缺乏上下文判断</span></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 保持人工监督和审批点</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 实施逐步增加自动化的策略</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 建立人工干预流程</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 4. 实验偏见</span></span>
<span class="line"><span class="__shiki_28tyc3">**现象**</span><span class="__shiki_140thh">: A/B测试结果被错误解读或操纵</span></span>
<span class="line"><span class="__shiki_28tyc3">**后果**</span><span class="__shiki_140thh">: 错误的业务决策，资源浪费</span></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 使用正确的统计方法</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 预先注册实验假设</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 实施盲法分析</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_19pls7">## 5. 复杂性隐藏</span></span>
<span class="line"><span class="__shiki_28tyc3">**现象**</span><span class="__shiki_140thh">: 渐进式交付隐藏了系统复杂性</span></span>
<span class="line"><span class="__shiki_28tyc3">**后果**</span><span class="__shiki_140thh">: 系统难以理解和维护</span></span>
<span class="line"><span class="__shiki_28tyc3">**解决方案**</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 保持系统设计简单</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 文档化所有功能和开关</span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 定期进行架构评审</span></span></code></pre></div><h2 id="八、未来趋势" tabindex="-1">八、未来趋势 <a class="header-anchor" href="#八、未来趋势" aria-label="Permalink to &quot;八、未来趋势&quot;">​</a></h2><h3 id="_8-1-新兴技术趋势" tabindex="-1">8.1 新兴技术趋势 <a class="header-anchor" href="#_8-1-新兴技术趋势" aria-label="Permalink to &quot;8.1 新兴技术趋势&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">future_trends</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  ai_driven_releases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;AI驱动的智能发布决策&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    technologies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;机器学习模型预测发布风险&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;自然语言处理分析用户反馈&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;强化学习优化发布策略&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  predictive_rollbacks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;预测性回滚和故障预防&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;基于模式识别的异常检测&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;预测性指标分析&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;自动故障预测和预防&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  personalized_delivery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;个性化功能交付&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    innovations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;基于用户行为的实时个性化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;上下文感知的功能发布&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;多变量个性化实验&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  edge_computing_integration</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;边缘计算与渐进式交付集成&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;地理特定的功能发布&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;低延迟个性化&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;离线功能管理&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  blockchain_for_auditability</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;区块链技术用于发布审计&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    benefits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;不可变的发布记录&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;透明的决策过程&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;合规性证明&quot;</span></span></code></pre></div><h2 id="九、总结" tabindex="-1">九、总结 <a class="header-anchor" href="#九、总结" aria-label="Permalink to &quot;九、总结&quot;">​</a></h2><p>渐进式交付代表了软件部署演进的最高阶段，它通过将功能发布从一次性事件转变为持续、可控、可观察的过程，从根本上改变了软件交付的方式。</p><h3 id="核心价值主张" tabindex="-1">核心价值主张： <a class="header-anchor" href="#核心价值主张" aria-label="Permalink to &quot;核心价值主张：&quot;">​</a></h3><ol><li><strong>风险降低</strong>：通过逐步发布，将潜在问题的影响范围最小化</li><li><strong>快速反馈</strong>：实时收集用户反馈和性能数据，指导发布决策</li><li><strong>业务价值验证</strong>：通过A/B测试验证功能的实际业务价值</li><li><strong>运营灵活性</strong>：无需重新部署即可控制功能可用性</li></ol><h3 id="成功关键因素" tabindex="-1">成功关键因素： <a class="header-anchor" href="#成功关键因素" aria-label="Permalink to &quot;成功关键因素：&quot;">​</a></h3><ul><li><strong>文化转变</strong>：从&quot;发布完成&quot;到&quot;持续交付价值&quot;的思维转变</li><li><strong>技术基础</strong>：强大的基础设施和工具支持</li><li><strong>数据驱动</strong>：基于数据的决策文化</li><li><strong>团队协作</strong>：跨职能团队的紧密合作</li></ul><h3 id="实施建议" tabindex="-1">实施建议： <a class="header-anchor" href="#实施建议" aria-label="Permalink to &quot;实施建议：&quot;">​</a></h3><ol><li><strong>从小处开始</strong>：从单个功能或服务开始实施</li><li><strong>投资基础设施</strong>：先建立可靠的基础设施</li><li><strong>渐进式采用</strong>：逐步增加复杂性和自动化程度</li><li><strong>持续改进</strong>：定期回顾和优化交付流程</li></ol><p>渐进式交付不仅是技术实践，更是组织能力的体现。它要求技术、流程和文化的协同进化，但一旦成功实施，将为组织带来显著的竞争优势和业务价值。</p>`,65)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
