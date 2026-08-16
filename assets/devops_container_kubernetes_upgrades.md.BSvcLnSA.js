import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Kubernetes 集群升级策略 深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/upgrades.md","filePath":"devops/container/kubernetes/upgrades.md"}'),i={name:"devops/container/kubernetes/upgrades.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="kubernetes-集群升级策略-深度解析" tabindex="-1">Kubernetes 集群升级策略 深度解析 <a class="header-anchor" href="#kubernetes-集群升级策略-深度解析" aria-label="Permalink to &quot;Kubernetes 集群升级策略 深度解析&quot;">​</a></h1><h2 id="一、kubernetes-升级基础理论" tabindex="-1">一、Kubernetes 升级基础理论 <a class="header-anchor" href="#一、kubernetes-升级基础理论" aria-label="Permalink to &quot;一、Kubernetes 升级基础理论&quot;">​</a></h2><h3 id="_1-1-升级的重要性与挑战" tabindex="-1">1.1 升级的重要性与挑战 <a class="header-anchor" href="#_1-1-升级的重要性与挑战" aria-label="Permalink to &quot;1.1 升级的重要性与挑战&quot;">​</a></h3><h4 id="升级的必要性" tabindex="-1">升级的必要性： <a class="header-anchor" href="#升级的必要性" aria-label="Permalink to &quot;升级的必要性：&quot;">​</a></h4><ol><li><strong>安全补丁</strong>：修复CVE漏洞和安全隐患</li><li><strong>功能增强</strong>：获取新特性和性能改进</li><li><strong>错误修复</strong>：解决已知问题和稳定性问题</li><li><strong>API演进</strong>：支持新版API，弃用旧API</li><li><strong>生态兼容</strong>：确保与周边工具链兼容</li></ol><h4 id="升级面临的挑战" tabindex="-1">升级面临的挑战： <a class="header-anchor" href="#升级面临的挑战" aria-label="Permalink to &quot;升级面临的挑战：&quot;">​</a></h4><table tabindex="0"><thead><tr><th>挑战类型</th><th>具体表现</th><th>影响程度</th></tr></thead><tbody><tr><td>兼容性</td><td>API版本弃用、功能标志变更</td><td>高</td></tr><tr><td>可用性</td><td>服务中断、数据丢失</td><td>高</td></tr><tr><td>复杂性</td><td>多组件版本依赖、配置迁移</td><td>中</td></tr><tr><td>测试覆盖</td><td>升级路径验证、回滚测试</td><td>中</td></tr><tr><td>时间窗口</td><td>业务低峰期限制、维护窗口</td><td>低</td></tr></tbody></table><h3 id="_1-2-kubernetes-版本支持策略" tabindex="-1">1.2 Kubernetes 版本支持策略 <a class="header-anchor" href="#_1-2-kubernetes-版本支持策略" aria-label="Permalink to &quot;1.2 Kubernetes 版本支持策略&quot;">​</a></h3><h4 id="官方支持策略" tabindex="-1">官方支持策略： <a class="header-anchor" href="#官方支持策略" aria-label="Permalink to &quot;官方支持策略：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">版本生命周期：约12-14个月</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">同时支持：当前版本 + 前两个次版本</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">示例：K8s 1.28 (2023-08发布)</span></span>
<span class="line"><span class="__shiki_wvjl67">    支持：1.28.x, 1.27.x, 1.26.x</span></span>
<span class="line"><span class="__shiki_wvjl67">    淘汰：1.25.x及更早</span></span></code></pre></div><h4 id="版本发布节奏" tabindex="-1">版本发布节奏： <a class="header-anchor" href="#版本发布节奏" aria-label="Permalink to &quot;版本发布节奏：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">每年发布：3-4个次版本 (1.x)</span></span>
<span class="line"><span class="__shiki_wvjl67">补丁发布：每周/每月 (1.x.y)</span></span>
<span class="line"><span class="__shiki_wvjl67">关键补丁：紧急安全修复 (CVE)</span></span></code></pre></div><h2 id="二、升级前准备与评估" tabindex="-1">二、升级前准备与评估 <a class="header-anchor" href="#二、升级前准备与评估" aria-label="Permalink to &quot;二、升级前准备与评估&quot;">​</a></h2><h3 id="_2-1-升级决策框架" tabindex="-1">2.1 升级决策框架 <a class="header-anchor" href="#_2-1-升级决策框架" aria-label="Permalink to &quot;2.1 升级决策框架&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 升级评估清单 (upgrade-checklist.yaml)</span></span>
<span class="line"><span class="__shiki_17hn0y">assessment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  current_state</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    kubernetes_version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.26.3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cluster_size</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      master_nodes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      worker_nodes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">      pods</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1500</span></span>
<span class="line"><span class="__shiki_17hn0y">      services</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">    infrastructure</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      cloud_provider</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;AWS&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      deployment_tool</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kops&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      addons</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;calico&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;metrics-server&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cert-manager&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  target_state</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    kubernetes_version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.27.4&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rolling&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_downtime</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;5 minutes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  compatibility_check</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. API 弃用检查</span></span>
<span class="line"><span class="__shiki_17hn0y">    deprecated_apis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">api</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;extensions/v1beta1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Ingress&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        alternative</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;networking.k8s.io/v1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">api</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rbac.authorization.k8s.io/v1beta1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ClusterRoleBinding&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        alternative</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rbac.authorization.k8s.io/v1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 功能标志检查</span></span>
<span class="line"><span class="__shiki_17hn0y">    feature_gates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      disabled</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;CSIMigrationAWS&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;PodPriority&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      enabled</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;GracefulNodeShutdown&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;IPv6DualStack&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 组件版本兼容性</span></span>
<span class="line"><span class="__shiki_17hn0y">    component_versions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      etcd</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3.5.7&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      coredns</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.9.3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      cni</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.2.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      csi_driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.20.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  risk_assessment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    high_risk_workloads</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;payment-service&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;StatefulSet&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">        storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;persistent&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;redis-cluster&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;StatefulSet&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_17hn0y">        quorum</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    data_criticality</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      level</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;P0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      backup_required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      rpo</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;15 minutes&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      rto</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30 minutes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  rollback_strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    snapshot_required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollback_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30 minutes&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    verification_steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;service_connectivity&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;data_consistency&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;performance_baseline&quot;</span></span></code></pre></div><h3 id="_2-2-升级前健康检查" tabindex="-1">2.2 升级前健康检查 <a class="header-anchor" href="#_2-2-升级前健康检查" aria-label="Permalink to &quot;2.2 升级前健康检查&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># pre-upgrade-health-check.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== Kubernetes 集群升级前健康检查 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 集群整体状态</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. 检查集群状态...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> componentstatuses</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --show-labels</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 节点资源检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. 检查节点资源...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> top</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;Allocated resources:|Allocatable:&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Pod 状态检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. 检查Pod状态...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Running</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Completed</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 关键工作负载检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. 检查关键工作负载...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> deployments,statefulsets,daemonsets</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 存储检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;5. 检查存储状态...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pv,pvc</span><span class="__shiki_dzsirb"> --all-namespaces</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pv</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;Status:|Phase:&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 网络检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;6. 检查网络连通性...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> network-check</span><span class="__shiki_dzsirb"> --image=nicolaka/netshoot</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> https://kubernetes.default.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. API 弃用检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;7. 检查废弃API使用...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_dzsirb"> --raw</span><span class="__shiki_mdbnqw"> /apis</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(extensions/v1beta1|apps/v1beta1|apps/v1beta2)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 配置备份</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;8. 备份关键配置...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">backup_dir</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/tmp/k8s-backup-$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d-%H%M%S)&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $backup_dir</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份所有资源配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> all</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $backup_dir</span><span class="__shiki_mdbnqw">/all-resources.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> configmaps</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $backup_dir</span><span class="__shiki_mdbnqw">/configmaps.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> secrets</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> $backup_dir</span><span class="__shiki_mdbnqw">/secrets.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 9. 创建etcd备份</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;9. 创建etcd备份...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> etcd</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> etcd-</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">hostname</span><span class="__shiki_140thh">) </span><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    etcdctl</span><span class="__shiki_mdbnqw"> snapshot</span><span class="__shiki_mdbnqw"> save</span><span class="__shiki_mdbnqw"> /var/lib/etcd/snapshot.db</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --cacert</span><span class="__shiki_mdbnqw"> /etc/kubernetes/pki/etcd/ca.crt</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --cert</span><span class="__shiki_mdbnqw"> /etc/kubernetes/pki/etcd/server.crt</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --key</span><span class="__shiki_mdbnqw"> /etc/kubernetes/pki/etcd/server.key</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;健康检查完成！备份保存在: </span><span class="__shiki_140thh">$backup_dir</span><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h3 id="_2-3-升级路径规划" tabindex="-1">2.3 升级路径规划 <a class="header-anchor" href="#_2-3-升级路径规划" aria-label="Permalink to &quot;2.3 升级路径规划&quot;">​</a></h3><h4 id="支持的升级路径" tabindex="-1">支持的升级路径： <a class="header-anchor" href="#支持的升级路径" aria-label="Permalink to &quot;支持的升级路径：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">直接升级：1.26 → 1.27 → 1.28</span></span>
<span class="line"><span class="__shiki_wvjl67">跳过升级：1.25 → 1.27 (支持，但需谨慎)</span></span>
<span class="line"><span class="__shiki_wvjl67">不支持：1.24 → 1.28 (必须逐版本升级)</span></span></code></pre></div><h4 id="升级顺序矩阵" tabindex="-1">升级顺序矩阵： <a class="header-anchor" href="#升级顺序矩阵" aria-label="Permalink to &quot;升级顺序矩阵：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">upgrade_sequence</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  phase_1</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;控制平面升级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;备份所有集群状态&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;升级第一个控制平面节点&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      validation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;etcd健康检查&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">&quot;API Server响应&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;升级剩余控制平面节点&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rolling_update&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      max_unavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  phase_2</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;工作节点升级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;surge_upgrade&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  batch_size</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">20%</span></span>
<span class="line"><span class="__shiki_17hn0y">  max_unavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10%</span></span>
<span class="line"><span class="__shiki_17hn0y">  drain_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;15m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  pod_eviction_timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  phase_3</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;插件和组件升级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CoreDNS&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kube-proxy&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CNI插件&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      pre_check</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;网络策略备份&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;CSI驱动&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_17hn0y">      pre_check</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;存储卷快照&quot;</span></span></code></pre></div><h2 id="三、控制平面升级策略" tabindex="-1">三、控制平面升级策略 <a class="header-anchor" href="#三、控制平面升级策略" aria-label="Permalink to &quot;三、控制平面升级策略&quot;">​</a></h2><h3 id="_3-1-高可用控制平面升级" tabindex="-1">3.1 高可用控制平面升级 <a class="header-anchor" href="#_3-1-高可用控制平面升级" aria-label="Permalink to &quot;3.1 高可用控制平面升级&quot;">​</a></h3><h4 id="使用-kubeadm-升级控制平面" tabindex="-1">使用 kubeadm 升级控制平面： <a class="header-anchor" href="#使用-kubeadm-升级控制平面" aria-label="Permalink to &quot;使用 kubeadm 升级控制平面：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># upgrade-control-plane.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">CLUSTER_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;production-cluster&quot;</span></span>
<span class="line"><span class="__shiki_140thh">TARGET_VERSION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;1.27.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">MASTER_NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;master-1&quot;</span><span class="__shiki_mdbnqw"> &quot;master-2&quot;</span><span class="__shiki_mdbnqw"> &quot;master-3&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BACKUP_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/opt/k8s-backup/$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 预检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;执行升级前检查...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubeadm</span><span class="__shiki_mdbnqw"> version</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> version</span><span class="__shiki_dzsirb"> --short</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubelet</span><span class="__shiki_dzsirb"> --version</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 备份etcd</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;备份etcd数据...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $BACKUP_DIR</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">MASTER_NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">  ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_mdbnqw">&quot;sudo kubeadm certs check-expiration&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BACKUP_DIR</span><span class="__shiki_mdbnqw">/certs-</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">.txt&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 升级第一个控制平面节点</span></span>
<span class="line"><span class="__shiki_140thh">FIRST_MASTER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">\${MASTER_NODES[0]}</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;升级第一个控制平面节点: </span><span class="__shiki_140thh">$FIRST_MASTER</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SSH到节点执行升级</span></span>
<span class="line"><span class="__shiki_1t8gfj">ssh</span><span class="__shiki_140thh"> $FIRST_MASTER </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &#39;EOF&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">set -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 升级kubeadm</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get update</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages kubeadm=1.27.4-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 检查升级计划</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo kubeadm upgrade plan</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 应用升级</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo kubeadm upgrade apply v1.27.4 --yes</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 临时暂停调度</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl cordon $FIRST_MASTER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 升级kubelet和kubectl</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages kubelet=1.27.4-00 kubectl=1.27.4-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 重启kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl daemon-reload</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl restart kubelet</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 等待节点就绪</span></span>
<span class="line"><span class="__shiki_mdbnqw">sleep 60</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl wait --for=condition=Ready node/$FIRST_MASTER --timeout=300s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 恢复调度</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl uncordon $FIRST_MASTER</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 验证第一个节点</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证第一个节点升级...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_140thh"> $FIRST_MASTER </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.nodeInfo.kubeletVersion}&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_dzsirb">$?</span><span class="__shiki_1itgoe"> -ne</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;第一个节点升级失败！&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">  exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 升级其他控制平面节点</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">MASTER_NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;升级控制平面节点: </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">set -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 升级kubeadm</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get update</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages kubeadm=1.27.4-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 执行节点升级</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo kubeadm upgrade node</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 升级kubelet和kubectl</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages kubelet=1.27.4-00 kubectl=1.27.4-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 重启kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl daemon-reload</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl restart kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 验证节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> node/</span><span class="__shiki_140thh">$node </span><span class="__shiki_dzsirb">--timeout=300s</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 最终验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;控制平面升级完成！&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> componentstatuses</span></span></code></pre></div><h3 id="_3-2-etcd-升级策略" tabindex="-1">3.2 etcd 升级策略 <a class="header-anchor" href="#_3-2-etcd-升级策略" aria-label="Permalink to &quot;3.2 etcd 升级策略&quot;">​</a></h3><h4 id="独立-etcd-集群升级" tabindex="-1">独立 etcd 集群升级： <a class="header-anchor" href="#独立-etcd-集群升级" aria-label="Permalink to &quot;独立 etcd 集群升级：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># etcd-upgrade-plan.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">upgrade_strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rolling_update&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">etcd_version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3.5.7&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">members</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;etcd-1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    endpoint</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://10.0.1.10:2379&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">    pre_upgrade</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;backup&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;etcdctl snapshot save snapshot.db&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;health_check&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;etcdctl endpoint health&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;etcd-2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    endpoint</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://10.0.1.11:2379&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;etcd-3&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    endpoint</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://10.0.1.12:2379&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. 备份数据</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;创建etcd快照&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ETCDCTL_API=3 etcdctl snapshot save /var/lib/etcd/snapshot.db \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --endpoints=https://10.0.1.10:2379 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --cacert=/etc/kubernetes/pki/etcd/ca.crt \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --cert=/etc/kubernetes/pki/etcd/server.crt \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --key=/etc/kubernetes/pki/etcd/server.key</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. 逐个升级成员</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;升级第一个etcd成员&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    member</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;etcd-1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    actions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;停止etcd服务&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;备份数据目录&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;安装新版本etcd&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;恢复数据&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;启动etcd服务&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;验证成员健康&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. 等待集群稳定</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;检查集群健康&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ETCDCTL_API=3 etcdctl endpoint health \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --endpoints=https://10.0.1.10:2379,https://10.0.1.11:2379,https://10.0.1.12:2379</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 4. 升级剩余成员</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">step</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;升级其他etcd成员&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    max_unavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span></code></pre></div><h3 id="_3-3-云托管控制平面升级" tabindex="-1">3.3 云托管控制平面升级 <a class="header-anchor" href="#_3-3-云托管控制平面升级" aria-label="Permalink to &quot;3.3 云托管控制平面升级&quot;">​</a></h3><h4 id="aws-eks-升级示例" tabindex="-1">AWS EKS 升级示例： <a class="header-anchor" href="#aws-eks-升级示例" aria-label="Permalink to &quot;AWS EKS 升级示例：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># eks-upgrade.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eksctl.io/v1alpha5</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterConfig</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">  region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-west-2</span></span>
<span class="line"><span class="__shiki_17hn0y">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.27&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">managedNodeGroups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ng-1</span></span>
<span class="line"><span class="__shiki_17hn0y">    instanceType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">m5.large</span></span>
<span class="line"><span class="__shiki_17hn0y">    desiredCapacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    minSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    maxSize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 节点组升级配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启动模板配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    launchTemplate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lt-0123456789abcdef</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用eksctl升级集群</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 检查可升级版本</span></span>
<span class="line"><span class="__shiki_mdbnqw">eksctl get cluster --name production-cluster</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 升级控制平面</span></span>
<span class="line"><span class="__shiki_mdbnqw">eksctl upgrade cluster --name production-cluster --version 1.27 --approve</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 升级节点组</span></span>
<span class="line"><span class="__shiki_mdbnqw">eksctl upgrade nodegroup --cluster production-cluster --name ng-1 --kubernetes-version 1.27</span></span></code></pre></div><h4 id="gke-升级示例" tabindex="-1">GKE 升级示例： <a class="header-anchor" href="#gke-升级示例" aria-label="Permalink to &quot;GKE 升级示例：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查可升级版本</span></span>
<span class="line"><span class="__shiki_1t8gfj">gcloud</span><span class="__shiki_mdbnqw"> container</span><span class="__shiki_mdbnqw"> get-server-config</span><span class="__shiki_dzsirb"> --zone</span><span class="__shiki_mdbnqw"> us-central1-a</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建升级计划</span></span>
<span class="line"><span class="__shiki_1t8gfj">gcloud</span><span class="__shiki_mdbnqw"> container</span><span class="__shiki_mdbnqw"> clusters</span><span class="__shiki_mdbnqw"> upgrade</span><span class="__shiki_mdbnqw"> production-cluster</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --master</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cluster-version</span><span class="__shiki_mdbnqw"> 1.27.4-gke.900</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --zone</span><span class="__shiki_mdbnqw"> us-central1-a</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --project</span><span class="__shiki_mdbnqw"> my-project</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --quiet</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 节点池升级（滚动升级）</span></span>
<span class="line"><span class="__shiki_1t8gfj">gcloud</span><span class="__shiki_mdbnqw"> container</span><span class="__shiki_mdbnqw"> clusters</span><span class="__shiki_mdbnqw"> upgrade</span><span class="__shiki_mdbnqw"> production-cluster</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --node-pool</span><span class="__shiki_mdbnqw"> default-pool</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --zone</span><span class="__shiki_mdbnqw"> us-central1-a</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --max-unavailable</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --quiet</span></span></code></pre></div><h2 id="四、工作节点升级策略" tabindex="-1">四、工作节点升级策略 <a class="header-anchor" href="#四、工作节点升级策略" aria-label="Permalink to &quot;四、工作节点升级策略&quot;">​</a></h2><h3 id="_4-1-节点升级工作流" tabindex="-1">4.1 节点升级工作流 <a class="header-anchor" href="#_4-1-节点升级工作流" aria-label="Permalink to &quot;4.1 节点升级工作流&quot;">​</a></h3><h4 id="升级状态机" tabindex="-1">升级状态机： <a class="header-anchor" href="#升级状态机" aria-label="Permalink to &quot;升级状态机：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">开始 → 标记节点不可调度 → 驱逐Pod → 升级组件 → 重启kubelet → 验证节点 → 恢复调度</span></span></code></pre></div><h4 id="详细升级脚本" tabindex="-1">详细升级脚本： <a class="header-anchor" href="#详细升级脚本" aria-label="Permalink to &quot;详细升级脚本：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># rolling-upgrade-worker-nodes.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -euo</span><span class="__shiki_mdbnqw"> pipefail</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置参数</span></span>
<span class="line"><span class="__shiki_140thh">CLUSTER_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;production-cluster&quot;</span></span>
<span class="line"><span class="__shiki_140thh">NODE_POOL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;worker-pool&quot;</span></span>
<span class="line"><span class="__shiki_140thh">TARGET_VERSION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;1.27.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">MAX_UNAVAILABLE_PERCENT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">20</span></span>
<span class="line"><span class="__shiki_140thh">POD_EVICTION_TIMEOUT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;300s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">DRAIN_TIMEOUT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;600s&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 节点标签选择器</span></span>
<span class="line"><span class="__shiki_140thh">NODE_SELECTOR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;node-role.kubernetes.io/worker=&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 开始工作节点滚动升级 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 获取节点列表</span></span>
<span class="line"><span class="__shiki_140thh">NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">($(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --selector=</span><span class="__shiki_140thh">$NODE_SELECTOR</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].metadata.name}&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">TOTAL_NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">\${</span><span class="__shiki_1itgoe">#</span><span class="__shiki_140thh">NODES[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_140thh">]}</span></span>
<span class="line"><span class="__shiki_140thh">MAX_UNAVAILABLE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">TOTAL_NODES</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_mdbnqw"> MAX_UNAVAILABLE_PERCENT</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">MAX_UNAVAILABLE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">MAX_UNAVAILABLE</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_mdbnqw"> ?</span><span class="__shiki_mdbnqw"> MAX_UNAVAILABLE</span><span class="__shiki_mdbnqw"> :</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;集群: </span><span class="__shiki_140thh">$CLUSTER_NAME</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;节点池: </span><span class="__shiki_140thh">$NODE_POOL</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;总节点数: </span><span class="__shiki_140thh">$TOTAL_NODES</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;最大不可用节点: </span><span class="__shiki_140thh">$MAX_UNAVAILABLE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;目标版本: </span><span class="__shiki_140thh">$TARGET_VERSION</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建升级批次</span></span>
<span class="line"><span class="__shiki_1t8gfj">create_upgrade_batches</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> nodes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$@</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> batch_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$MAX_UNAVAILABLE</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> batches</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> ((i</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">\${</span><span class="__shiki_1itgoe">#</span><span class="__shiki_140thh">nodes[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_140thh">]}; i</span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh">batch_size)); </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    batches</span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">nodes</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">i</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">batch_size</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  done</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">batches</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">BATCHES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">create_upgrade_batches</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BATCH_COUNT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$BATCHES</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -w</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;升级批次数: </span><span class="__shiki_140thh">$BATCH_COUNT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 批次升级函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">upgrade_node_batch</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> batch_nodes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$@</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> batch_num</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_dzsirb">  shift</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;=== 升级批次 </span><span class="__shiki_140thh">$batch_num</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">batch_nodes</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">    (</span></span>
<span class="line"><span class="__shiki_dzsirb">      echo</span><span class="__shiki_mdbnqw"> &quot;处理节点: </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 标记节点不可调度</span></span>
<span class="line"><span class="__shiki_dzsirb">      echo</span><span class="__shiki_mdbnqw"> &quot;标记节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 不可调度...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">      kubectl</span><span class="__shiki_mdbnqw"> cordon</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 安全驱逐Pod</span></span>
<span class="line"><span class="__shiki_dzsirb">      echo</span><span class="__shiki_mdbnqw"> &quot;驱逐节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 上的Pod...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> drain</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --ignore-daemonsets</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --delete-emptydir-data</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --force</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --timeout=</span><span class="__shiki_140thh">$DRAIN_TIMEOUT</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --pod-selector=</span><span class="__shiki_mdbnqw">&#39;!node-critical&#39;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --skip-wait-for-delete-timeout=30</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 驱逐成功&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">      else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;警告: 节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 驱逐不完全，继续升级&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">      fi</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # SSH到节点执行升级</span></span>
<span class="line"><span class="__shiki_dzsirb">      echo</span><span class="__shiki_mdbnqw"> &quot;升级节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">      ssh</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> &#39;EOF&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        set -e</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 备份当前配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo cp -r /etc/kubernetes /etc/kubernetes.backup.$(date +%Y%m%d)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 升级kubelet和依赖</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get update</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 升级kubelet、kubeadm、kubectl</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get install -y --allow-change-held-packages \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubelet=$TARGET_VERSION-00 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubeadm=$TARGET_VERSION-00 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubectl=$TARGET_VERSION-00</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 重启kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo systemctl daemon-reload</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo systemctl restart kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 等待kubelet就绪</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sleep 30</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 验证节点</span></span>
<span class="line"><span class="__shiki_dzsirb">      echo</span><span class="__shiki_mdbnqw"> &quot;验证节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> node/&quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> --timeout=300s</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;✓ 节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 升级成功&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 恢复节点调度</span></span>
<span class="line"><span class="__shiki_1t8gfj">        kubectl</span><span class="__shiki_mdbnqw"> uncordon</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查节点上的Pod</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1t8gfj">        kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> spec.nodeName=&quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 节点健康检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">        check_node_health</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">      else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;✗ 节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 升级失败&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录失败并继续</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /tmp/failed_nodes.txt</span></span>
<span class="line"><span class="__shiki_1itgoe">      fi</span></span>
<span class="line"><span class="__shiki_140thh">    ) &amp;</span></span>
<span class="line"><span class="__shiki_1itgoe">  done</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 等待批次完成</span></span>
<span class="line"><span class="__shiki_dzsirb">  wait</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;批次 </span><span class="__shiki_140thh">$batch_num</span><span class="__shiki_mdbnqw"> 完成&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 节点健康检查函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">check_node_health</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> node</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;执行节点健康检查: </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 检查节点状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> node</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;Conditions:|Ready&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 检查核心组件</span></span>
<span class="line"><span class="__shiki_1t8gfj">  ssh</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;systemctl status kubelet --no-pager&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  ssh</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;docker ps | grep -E &#39;pause|kube-proxy&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 网络连通性测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> health-check-&quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --image=busybox</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --restart=Never</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --overrides=</span><span class="__shiki_mdbnqw">&quot;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">spec</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: {</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">nodeSelector</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: {</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}}&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --command</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    sh</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;nc -z kubernetes.default.svc.cluster.local 443 &amp;&amp; echo &#39;API Server连接正常&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_mdbnqw"> health-check-&quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 执行批次升级</span></span>
<span class="line"><span class="__shiki_140thh">batch_num</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">1</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> batch </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $BATCHES; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">  IFS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_mdbnqw"> batch_nodes</span><span class="__shiki_1itgoe"> &lt;&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$batch</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  upgrade_node_batch</span><span class="__shiki_140thh"> $batch_num </span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">batch_nodes</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ((batch_num</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 批次间等待</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> [ $batch_num </span><span class="__shiki_1itgoe">-le</span><span class="__shiki_140thh"> $BATCH_COUNT ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;等待下一批次升级（30秒冷却时间）...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">  fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 升级后验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 升级后验证 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查所有节点版本</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;节点版本检查:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{range .items[*]}{.metadata.name}{&quot;\\t&quot;}{.status.nodeInfo.kubeletVersion}{&quot;\\n&quot;}{end}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查所有Pod状态</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Pod状态检查:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Running</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Completed</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查核心服务</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;核心服务检查:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_mdbnqw"> kubernetes-dashboard</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> k8s-app=kube-dns</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 性能基线测试</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;执行性能基线测试...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> perf-test</span><span class="__shiki_dzsirb"> --image=alpine</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --restart=Never</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  sh</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;time curl -s -o /dev/null https://kubernetes.default.svc.cluster.local&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 工作节点升级完成 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 清理和报告</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_140thh"> /tmp/failed_nodes.txt ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;警告：以下节点升级失败:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  cat</span><span class="__shiki_mdbnqw"> /tmp/failed_nodes.txt</span></span>
<span class="line"><span class="__shiki_dzsirb">  exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;所有节点升级成功！&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span></code></pre></div><h3 id="_4-2-节点升级优化策略" tabindex="-1">4.2 节点升级优化策略 <a class="header-anchor" href="#_4-2-节点升级优化策略" aria-label="Permalink to &quot;4.2 节点升级优化策略&quot;">​</a></h3><h4 id="_1-pod-中断预算-pdb-感知升级" tabindex="-1">1. Pod 中断预算（PDB）感知升级： <a class="header-anchor" href="#_1-pod-中断预算-pdb-感知升级" aria-label="Permalink to &quot;1. Pod 中断预算（PDB）感知升级：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">policy/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PodDisruptionBudget</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical-pdb</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  minAvailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">  # 最少可用Pod数</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 升级时检查PDB</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl drain $NODE --ignore-daemonsets --disable-eviction \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --pod-selector=&#39;app!=critical-app&#39; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --timeout=10m</span></span></code></pre></div><h4 id="_2-优先级驱逐策略" tabindex="-1">2. 优先级驱逐策略： <a class="header-anchor" href="#_2-优先级驱逐策略" aria-label="Permalink to &quot;2. 优先级驱逐策略：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于优先级的驱逐顺序</span></span>
<span class="line"><span class="__shiki_140thh">EVICTION_ORDER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;priorityClassName=low&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;priorityClassName=medium&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;priorityClassName=high&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;priorityClassName=system-node-critical&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> priority </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">EVICTION_ORDER</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> drain</span><span class="__shiki_140thh"> $NODE </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --pod-selector=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$priority</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --timeout=2m</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --ignore-daemonsets</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h4 id="_3-亲和性感知升级" tabindex="-1">3. 亲和性感知升级： <a class="header-anchor" href="#_3-亲和性感知升级" aria-label="Permalink to &quot;3. 亲和性感知升级：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查Pod亲和性，避免同时升级亲和节点</span></span>
<span class="line"><span class="__shiki_140thh">AFFINITY_NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> app=critical-app</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].spec.nodeName}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">UPGRADE_NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_mdbnqw"> upgrade-batch=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].metadata.name}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 确保关键Pod不都在同一批次</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $UPGRADE_NODES; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$AFFINITY_NODES</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;警告：节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 包含关键Pod，跳过此批次&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    continue</span></span>
<span class="line"><span class="__shiki_1itgoe">  fi</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 执行升级</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span></code></pre></div><h2 id="五、插件和组件升级策略" tabindex="-1">五、插件和组件升级策略 <a class="header-anchor" href="#五、插件和组件升级策略" aria-label="Permalink to &quot;五、插件和组件升级策略&quot;">​</a></h2><h3 id="_5-1-coredns-升级" tabindex="-1">5.1 CoreDNS 升级 <a class="header-anchor" href="#_5-1-coredns-升级" aria-label="Permalink to &quot;5.1 CoreDNS 升级&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># coredns-upgrade.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">coredns</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # 确保DNS服务始终可用</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">coredns</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.k8s.io/coredns/coredns:v1.10.1</span></span>
<span class="line"><span class="__shiki_17hn0y">        args</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;-conf&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/etc/coredns/Corefile&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 优雅终止配置</span></span>
<span class="line"><span class="__shiki_17hn0y">        lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          preStop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sleep 10&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 等待查询完成</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/health</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          httpGet</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/ready</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8181</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 升级步骤</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 备份CoreDNS配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl get configmap coredns -n kube-system -o yaml &gt; coredns-backup.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 逐步更新镜像</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl set image deployment/coredns coredns=registry.k8s.io/coredns/coredns:v1.10.1 -n kube-system</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 验证DNS功能</span></span>
<span class="line"><span class="__shiki_mdbnqw">kubectl run dns-test --image=busybox --rm -it --restart=Never -- \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  nslookup kubernetes.default.svc.cluster.local</span></span></code></pre></div><h3 id="_5-2-kube-proxy-升级" tabindex="-1">5.2 kube-proxy 升级 <a class="header-anchor" href="#_5-2-kube-proxy-升级" aria-label="Permalink to &quot;5.2 kube-proxy 升级&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># upgrade-kube-proxy.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">KUBE_PROXY_VERSION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;v1.27.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">NODE_COUNT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --no-headers</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">BATCH_SIZE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">NODE_COUNT</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">))  </span><span class="__shiki_21nrsd"># 25%的节点同时升级</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;升级kube-proxy到版本: </span><span class="__shiki_140thh">$KUBE_PROXY_VERSION</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 备份当前配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> daemonset</span><span class="__shiki_mdbnqw"> kube-proxy</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> kube-proxy-backup.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建新的kube-proxy配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: apps/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: DaemonSet</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: kube-proxy</span></span>
<span class="line"><span class="__shiki_mdbnqw">  namespace: kube-system</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  updateStrategy:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    type: RollingUpdate</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rollingUpdate:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      maxUnavailable: </span><span class="__shiki_140thh">$BATCH_SIZE</span></span>
<span class="line"><span class="__shiki_mdbnqw">  template:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - name: kube-proxy</span></span>
<span class="line"><span class="__shiki_mdbnqw">        image: registry.k8s.io/kube-proxy:</span><span class="__shiki_140thh">$KUBE_PROXY_VERSION</span></span>
<span class="line"><span class="__shiki_mdbnqw">        args:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - --proxy-mode=iptables</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - --metrics-bind-address=0.0.0.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">        - --healthz-bind-address=0.0.0.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">        securityContext:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          privileged: true</span></span>
<span class="line"><span class="__shiki_mdbnqw">        readinessProbe:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          httpGet:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            path: /healthz</span></span>
<span class="line"><span class="__shiki_mdbnqw">            port: 10256</span></span>
<span class="line"><span class="__shiki_mdbnqw">          initialDelaySeconds: 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 监控升级进度</span></span>
<span class="line"><span class="__shiki_1t8gfj">watch</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_mdbnqw"> &#39;kubectl get pods -n kube-system -l k8s-app=kube-proxy | grep -v Running&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 验证kube-proxy功能</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证服务连接...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> proxy-test</span><span class="__shiki_dzsirb"> --image=nginx</span><span class="__shiki_dzsirb"> --port=80</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> expose</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_mdbnqw"> proxy-test</span><span class="__shiki_dzsirb"> --type=NodePort</span><span class="__shiki_dzsirb"> --port=80</span></span>
<span class="line"><span class="__shiki_140thh">SERVICE_IP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_mdbnqw"> proxy-test</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.clusterIP}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> curl-test</span><span class="__shiki_dzsirb"> --image=curlimages/curl</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --restart=Never</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> http://</span><span class="__shiki_140thh">$SERVICE_IP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_mdbnqw"> proxy-test</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_mdbnqw"> proxy-test</span></span></code></pre></div><h3 id="_5-3-cni-插件升级" tabindex="-1">5.3 CNI 插件升级 <a class="header-anchor" href="#_5-3-cni-插件升级" aria-label="Permalink to &quot;5.3 CNI 插件升级&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># calico-upgrade-plan.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;rolling_upgrade_with_dataplane_downtime&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">current_version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3.25.1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">target_version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3.26.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">components</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;calico-node&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;DaemonSet&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">    disruption</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;calico-kube-controllers&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Deployment&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">    disruption</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;low&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;calico-typha&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Deployment&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    upgrade_order</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    disruption</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;high&quot;</span><span class="__shiki_21nrsd">  # 需要特别注意</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">pre_upgrade_steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;备份Calico配置&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl get felixconfigurations.crd.projectcalico.org -o yaml &gt; felix-backup.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl get bgpconfigurations.crd.projectcalico.org -o yaml &gt; bgp-backup.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;检查网络策略&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl get networkpolicies --all-namespaces &gt; networkpolicies-backup.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">upgrade_steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">phase</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;升级Calico清单&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      curl -L https://github.com/projectcalico/calico/releases/download/v3.26.0/tigera-operator.yaml -o calico.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl apply -f calico.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">phase</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;监控升级状态&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      watch -n 5 &#39;kubectl get pods -n calico-system&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">phase</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;验证网络功能&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    commands</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">kubectl run net-test-1 --image=nginx --restart=Never</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">kubectl run net-test-2 --image=busybox --restart=Never --command -- sleep 3600</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">kubectl exec net-test-2 -- wget -q -O- net-test-1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">phase</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;清理测试资源&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl delete pod net-test-1 net-test-2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">rollback_steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;回滚Calico配置&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl apply -f felix-backup.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl apply -f bgp-backup.yaml</span></span></code></pre></div><h2 id="六、版本回滚策略" tabindex="-1">六、版本回滚策略 <a class="header-anchor" href="#六、版本回滚策略" aria-label="Permalink to &quot;六、版本回滚策略&quot;">​</a></h2><h3 id="_6-1-控制平面回滚" tabindex="-1">6.1 控制平面回滚 <a class="header-anchor" href="#_6-1-控制平面回滚" aria-label="Permalink to &quot;6.1 控制平面回滚&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># rollback-control-plane.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">ROLLBACK_VERSION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;1.26.3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">MASTER_NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;master-1&quot;</span><span class="__shiki_mdbnqw"> &quot;master-2&quot;</span><span class="__shiki_mdbnqw"> &quot;master-3&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 控制平面回滚到版本 </span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 检查当前状态</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. 检查当前集群状态...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Running</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 回滚第一个控制平面节点</span></span>
<span class="line"><span class="__shiki_140thh">FIRST_MASTER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">\${MASTER_NODES[0]}</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. 回滚第一个控制平面节点: </span><span class="__shiki_140thh">$FIRST_MASTER</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">ssh</span><span class="__shiki_140thh"> $FIRST_MASTER </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> &#39;EOF&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">set -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 停止kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl stop kubelet</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 降级kubeadm</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages kubeadm=$ROLLBACK_VERSION-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 执行kubeadm回滚</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo kubeadm upgrade rollback</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 降级kubelet和kubectl</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubelet=$ROLLBACK_VERSION-00 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubectl=$ROLLBACK_VERSION-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启动kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl daemon-reload</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl start kubelet</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 等待节点就绪</span></span>
<span class="line"><span class="__shiki_mdbnqw">sleep 60</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 验证第一个节点</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. 验证第一个节点回滚...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> node/</span><span class="__shiki_140thh">$FIRST_MASTER </span><span class="__shiki_dzsirb">--timeout=300s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 回滚其他控制平面节点</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">MASTER_NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;4. 回滚控制平面节点: </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">set -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 停止kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl stop kubelet</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 降级kubeadm</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages kubeadm=</span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 执行节点回滚</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo kubeadm upgrade node</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 降级kubelet和kubectl</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubelet=</span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">-00 </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubectl=</span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启动kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl daemon-reload</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl start kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 验证节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> node/</span><span class="__shiki_140thh">$node </span><span class="__shiki_dzsirb">--timeout=300s</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 恢复etcd（如果需要）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;5. 恢复etcd备份...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ETCD_BACKUP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/opt/k8s-backup/etcd-snapshot.db&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ETCD_BACKUP</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">MASTER_NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl stop kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl stop etcd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 恢复etcd数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">ETCDCTL_API=3 etcdctl snapshot restore </span><span class="__shiki_140thh">$ETCD_BACKUP</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  --data-dir /var/lib/etcd-from-backup</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">sudo mv /var/lib/etcd /var/lib/etcd.old</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo mv /var/lib/etcd-from-backup /var/lib/etcd</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo chown -R etcd:etcd /var/lib/etcd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl start etcd</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl start kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_1itgoe">  done</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 最终验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;6. 回滚完成验证...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> componentstatuses</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> version</span><span class="__shiki_dzsirb"> --short</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 控制平面回滚完成 ===&quot;</span></span></code></pre></div><h3 id="_6-2-工作节点回滚" tabindex="-1">6.2 工作节点回滚 <a class="header-anchor" href="#_6-2-工作节点回滚" aria-label="Permalink to &quot;6.2 工作节点回滚&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># rollback-worker-nodes.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">ROLLBACK_VERSION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;1.26.3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">NODE_SELECTOR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;node-role.kubernetes.io/worker=&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 工作节点回滚到版本 </span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw"> ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取需要回滚的节点</span></span>
<span class="line"><span class="__shiki_140thh">NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">($(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --selector=</span><span class="__shiki_140thh">$NODE_SELECTOR</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].metadata.name}&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">NODES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;回滚节点: </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 标记节点不可调度</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> cordon</span><span class="__shiki_140thh"> $node</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 安全驱逐Pod</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> drain</span><span class="__shiki_140thh"> $node </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --ignore-daemonsets</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --delete-emptydir-data</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --force</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --timeout=600s</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # SSH到节点执行回滚</span></span>
<span class="line"><span class="__shiki_1t8gfj">  ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_1itgoe">&lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">set -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 停止kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl stop kubelet</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 降级kubelet、kubeadm、kubectl</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo apt-get install -y --allow-change-held-packages </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubelet=</span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">-00 </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubeadm=</span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">-00 </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  kubectl=</span><span class="__shiki_140thh">$ROLLBACK_VERSION</span><span class="__shiki_mdbnqw">-00</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 重启kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl daemon-reload</span></span>
<span class="line"><span class="__shiki_mdbnqw">sudo systemctl start kubelet</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 验证节点</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=Ready</span><span class="__shiki_mdbnqw"> node/</span><span class="__shiki_140thh">$node </span><span class="__shiki_dzsirb">--timeout=300s</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 恢复节点调度</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> uncordon</span><span class="__shiki_140thh"> $node</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;节点 </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw"> 回滚完成&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证集群状态</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证集群状态...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Running</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 工作节点回滚完成 ===&quot;</span></span></code></pre></div><h2 id="七、生产环境最佳实践" tabindex="-1">七、生产环境最佳实践 <a class="header-anchor" href="#七、生产环境最佳实践" aria-label="Permalink to &quot;七、生产环境最佳实践&quot;">​</a></h2><h3 id="_7-1-金丝雀升级策略" tabindex="-1">7.1 金丝雀升级策略 <a class="header-anchor" href="#_7-1-金丝雀升级策略" aria-label="Permalink to &quot;7.1 金丝雀升级策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># canary-upgrade-plan.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;canary_upgrade&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">phases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  phase_1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;金丝雀环境升级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    scope</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;canary-cluster&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    nodes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">    workloads</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">20%</span></span>
<span class="line"><span class="__shiki_17hn0y">    validation</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;性能基准测试&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;错误率监控&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;API兼容性测试&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24 hours&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    success_criteria</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;错误率 &lt; 0.1%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;P99延迟 &lt; 200ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;零数据丢失&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  phase_2</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;生产环境增量升级&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    scope</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production-cluster&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    batches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">batch</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;10%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        time_window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;02:00-04:00&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        validation_period</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2 hours&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">batch</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;30%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        time_window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;下一个维护窗口&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        validation_period</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;4 hours&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">batch</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">        nodes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;剩余60%&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        time_window</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;业务低峰期&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        validation_period</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;6 hours&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  phase_3</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;监控和优化&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;7 days&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    metrics</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;集群稳定性&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;资源利用率&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;应用性能&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    alerts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;配置回滚阈值&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;定义SLO违规条件&quot;</span></span></code></pre></div><h3 id="_7-2-蓝绿升级策略" tabindex="-1">7.2 蓝绿升级策略 <a class="header-anchor" href="#_7-2-蓝绿升级策略" aria-label="Permalink to &quot;7.2 蓝绿升级策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># blue-green-upgrade.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置</span></span>
<span class="line"><span class="__shiki_140thh">BLUE_CLUSTER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;k8s-cluster-blue&quot;</span></span>
<span class="line"><span class="__shiki_140thh">GREEN_CLUSTER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;k8s-cluster-green&quot;</span></span>
<span class="line"><span class="__shiki_140thh">LOAD_BALANCER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;production-lb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">TRAFFIC_SPLIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">10</span><span class="__shiki_21nrsd">  # 初始流量百分比</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 蓝绿集群升级 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 创建绿色集群（新版本）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. 创建绿色集群...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> use-context</span><span class="__shiki_140thh"> $GREEN_CLUSTER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 部署新版本集群</span></span>
<span class="line"><span class="__shiki_21nrsd"># ... 集群创建逻辑 ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 数据同步</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. 同步数据...&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 同步配置、密钥、持久化数据等</span></span>
<span class="line"><span class="__shiki_1t8gfj">sync_critical_data</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 同步ConfigMaps</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> configmaps</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> --context</span><span class="__shiki_140thh"> $GREEN_CLUSTER </span><span class="__shiki_mdbnqw">apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 同步Secrets</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> secrets</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> --context</span><span class="__shiki_140thh"> $GREEN_CLUSTER </span><span class="__shiki_mdbnqw">apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 同步有状态应用数据</span></span>
<span class="line"><span class="__shiki_21nrsd">  # ... 数据库复制逻辑 ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 流量切换</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. 逐步切换流量...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> percent </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> 10</span><span class="__shiki_mdbnqw"> 30</span><span class="__shiki_mdbnqw"> 50</span><span class="__shiki_mdbnqw"> 80</span><span class="__shiki_mdbnqw"> 100</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;切换 </span><span class="__shiki_140thh">$percent</span><span class="__shiki_mdbnqw">% 流量到绿色集群&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 更新负载均衡器配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">  update_load_balancer</span><span class="__shiki_140thh"> $LOAD_BALANCER </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --blue-weight=$((</span><span class="__shiki_1t8gfj">100</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> percent</span><span class="__shiki_dzsirb">))</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --green-weight=</span><span class="__shiki_140thh">$percent</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 监控阶段</span></span>
<span class="line"><span class="__shiki_1t8gfj">  sleep</span><span class="__shiki_dzsirb"> 1800</span><span class="__shiki_21nrsd">  # 30分钟监控期</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 检查错误率</span></span>
<span class="line"><span class="__shiki_140thh">  error_rate</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">get_error_rate</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> [ $(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$error_rate</span><span class="__shiki_mdbnqw"> &gt; 0.5&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> bc</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-eq</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;错误率过高: </span><span class="__shiki_140thh">$error_rate</span><span class="__shiki_mdbnqw">%，回滚流量&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    update_load_balancer</span><span class="__shiki_140thh"> $LOAD_BALANCER </span><span class="__shiki_dzsirb">--blue-weight=100</span><span class="__shiki_dzsirb"> --green-weight=0</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">  fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 清理蓝色集群</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. 清理蓝色集群...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CONFIRM_CLEANUP</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;true&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> use-context</span><span class="__shiki_140thh"> $BLUE_CLUSTER</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 备份重要数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">  backup_cluster_state</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 清理集群</span></span>
<span class="line"><span class="__shiki_1t8gfj">  cleanup_cluster</span><span class="__shiki_140thh"> $BLUE_CLUSTER</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 蓝绿升级完成 ===&quot;</span></span></code></pre></div><h3 id="_7-3-监控和告警配置" tabindex="-1">7.3 监控和告警配置 <a class="header-anchor" href="#_7-3-监控和告警配置" aria-label="Permalink to &quot;7.3 监控和告警配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># upgrade-monitoring.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PrometheusRule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">k8s-upgrade-alerts</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  groups</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">upgrade.rules</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">UpgradeNodeFailure</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kube_node_status_condition{condition=&quot;Ready&quot;,status=&quot;false&quot;} == 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">        and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kube_node_labels{label_upgrade_batch=&quot;current&quot;} == 1</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">critical</span></span>
<span class="line"><span class="__shiki_17hn0y">        component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">upgrade</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;节点升级失败&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;节点 {{ $labels.node }} 在升级后未就绪&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PodEvictionTimeout</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        time() - kube_pod_deletion_timestamp &gt; 600</span></span>
<span class="line"><span class="__shiki_mdbnqw">        and</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kube_pod_status_phase{phase=&quot;Running&quot;} == 1</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">upgrade</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Pod驱逐超时&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Pod {{ $labels.pod }} 驱逐已超过10分钟&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">APIDeprecationWarning</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        count by (resource, api_version) (</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kube_resource_usage{resource=~&quot;.*&quot;, api_version=~&quot;v1beta1|v1alpha1&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ) &gt; 0</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">compatibility</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;使用废弃API&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;资源 {{ $labels.resource }} 使用废弃API版本 {{ $labels.api_version }}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">alert</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterVersionMismatch</span></span>
<span class="line"><span class="__shiki_17hn0y">      expr</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        count by (cluster) (</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kube_node_info</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ) - </span></span>
<span class="line"><span class="__shiki_mdbnqw">        count by (cluster) (</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kube_node_info{kubelet_version=~&quot;$target_version&quot;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ) &gt; 3</span></span>
<span class="line"><span class="__shiki_17hn0y">      for</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10m</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        severity</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">warning</span></span>
<span class="line"><span class="__shiki_17hn0y">        component</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">upgrade</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;集群版本不一致&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;超过3个节点未升级到目标版本&quot;</span></span></code></pre></div><h2 id="八、自动化升级工具" tabindex="-1">八、自动化升级工具 <a class="header-anchor" href="#八、自动化升级工具" aria-label="Permalink to &quot;八、自动化升级工具&quot;">​</a></h2><h3 id="_8-1-使用-cluster-api-升级" tabindex="-1">8.1 使用 Cluster API 升级 <a class="header-anchor" href="#_8-1-使用-cluster-api-升级" aria-label="Permalink to &quot;8.1 使用 Cluster API 升级&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># cluster-upgrade.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster.x-k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-cluster</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  topology</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.27.4</span></span>
<span class="line"><span class="__shiki_17hn0y">    controlPlane</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">      machineTemplate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        infrastructureRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">infrastructure.cluster.x-k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">          kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AWSMachineTemplate</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">control-plane-template</span></span>
<span class="line"><span class="__shiki_17hn0y">    workers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      machineDeployments</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default-worker</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">md-0</span></span>
<span class="line"><span class="__shiki_17hn0y">        replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">        machineTemplate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          infrastructureRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">infrastructure.cluster.x-k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">            kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AWSMachineTemplate</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">worker-template</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 滚动升级配置</span></span>
<span class="line"><span class="__shiki_17hn0y">        strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">          rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">            maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">controlplane.cluster.x-k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">KubeadmControlPlane</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-control-plane</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.27.4</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  upgradeAfter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2023-12-01T02:00:00Z&quot;</span><span class="__shiki_21nrsd">  # 计划升级时间</span></span>
<span class="line"><span class="__shiki_17hn0y">  rolloutStrategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">  machineTemplate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    infrastructureRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">infrastructure.cluster.x-k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">      kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">AWSMachineTemplate</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">control-plane-template</span></span></code></pre></div><h3 id="_8-2-使用-argo-cd-进行-gitops-升级" tabindex="-1">8.2 使用 Argo CD 进行 GitOps 升级 <a class="header-anchor" href="#_8-2-使用-argo-cd-进行-gitops-升级" aria-label="Permalink to &quot;8.2 使用 Argo CD 进行 GitOps 升级&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># argo-upgrade-app.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">argoproj.io/v1alpha1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Application</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-upgrade</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">argocd</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  project</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    repoURL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">git@github.com:example/k8s-config.git</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetRevision</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">clusters/production</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用Kustomize进行版本管理</span></span>
<span class="line"><span class="__shiki_17hn0y">    kustomize</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      images</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.k8s.io/kube-apiserver</span></span>
<span class="line"><span class="__shiki_17hn0y">        newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.27.4</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.k8s.io/kube-controller-manager</span></span>
<span class="line"><span class="__shiki_17hn0y">        newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.27.4</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.k8s.io/kube-scheduler</span></span>
<span class="line"><span class="__shiki_17hn0y">        newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.27.4</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.k8s.io/kube-proxy</span></span>
<span class="line"><span class="__shiki_17hn0y">        newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.27.4</span></span>
<span class="line"><span class="__shiki_17hn0y">  destination</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    server</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://kubernetes.default.svc</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">  syncPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    automated</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      prune</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      selfHeal</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      allowEmpty</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    syncOptions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">CreateNamespace=true</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">ApplyOutOfSyncOnly=true</span></span>
<span class="line"><span class="__shiki_17hn0y">    retry</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      limit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">      backoff</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5s</span></span>
<span class="line"><span class="__shiki_17hn0y">        factor</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">        maxDuration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">3m</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 同步窗口</span></span>
<span class="line"><span class="__shiki_17hn0y">  syncWindows</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">allow</span></span>
<span class="line"><span class="__shiki_17hn0y">    schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0 2 * * *&#39;</span><span class="__shiki_21nrsd">  # 每天凌晨2点</span></span>
<span class="line"><span class="__shiki_17hn0y">    duration</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">4h</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kube-system</span></span></code></pre></div><h2 id="九、故障排除和恢复" tabindex="-1">九、故障排除和恢复 <a class="header-anchor" href="#九、故障排除和恢复" aria-label="Permalink to &quot;九、故障排除和恢复&quot;">​</a></h2><h3 id="_9-1-常见升级问题" tabindex="-1">9.1 常见升级问题 <a class="header-anchor" href="#_9-1-常见升级问题" aria-label="Permalink to &quot;9.1 常见升级问题&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>症状</th><th>根本原因</th><th>解决方案</th></tr></thead><tbody><tr><td>etcd 启动失败</td><td>控制平面无法启动</td><td>数据损坏、版本不兼容</td><td>1. 从备份恢复 2. 检查磁盘空间 3. 验证证书</td></tr><tr><td>API Server 不可用</td><td>kubectl命令超时</td><td>资源不足、配置错误</td><td>1. 检查资源限制 2. 验证kube-apiserver配置 3. 检查网络策略</td></tr><tr><td>节点 NotReady</td><td>节点状态持续NotReady</td><td>kubelet配置错误、容器运行时问题</td><td>1. 检查kubelet日志 2. 验证CRI配置 3. 重启kubelet</td></tr><tr><td>Pod 驱逐失败</td><td>Pod卡在Terminating状态</td><td>存储卷挂载问题、Finalizer阻塞</td><td>1. 强制删除 2. 手动清理存储 3. 移除Finalizer</td></tr><tr><td>网络中断</td><td>Pod间网络不通</td><td>CNI插件升级问题、网络策略冲突</td><td>1. 检查CNI Pod状态 2. 验证网络策略 3. 回滚CNI版本</td></tr></tbody></table><h3 id="_9-2-紧急恢复流程" tabindex="-1">9.2 紧急恢复流程 <a class="header-anchor" href="#_9-2-紧急恢复流程" aria-label="Permalink to &quot;9.2 紧急恢复流程&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># emergency-rollback.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 紧急回滚流程 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 停止所有升级操作</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. 停止所有升级操作...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> job/upgrade-operator</span><span class="__shiki_dzsirb"> --ignore-not-found</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> scale</span><span class="__shiki_mdbnqw"> deployment/cluster-autoscaler</span><span class="__shiki_dzsirb"> --replicas=0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 识别问题范围</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. 识别问题范围...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">FAILING_NODES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> --no-headers</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Ready</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $1}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">FAILING_PODS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> --field-selector=status.phase!=Running</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;故障节点: </span><span class="__shiki_140thh">$FAILING_NODES</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;故障Pod数: </span><span class="__shiki_140thh">$FAILING_PODS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 回滚控制平面（如有必要）</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-n</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FAILING_NODES</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;3. 回滚控制平面...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> node </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $FAILING_NODES; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [[ $node </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> master-</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">      echo</span><span class="__shiki_mdbnqw"> &quot;回滚主节点: </span><span class="__shiki_140thh">$node</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">      ssh</span><span class="__shiki_140thh"> $node </span><span class="__shiki_mdbnqw">&quot;sudo kubeadm upgrade rollback --force&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">  done</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 恢复关键服务</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. 恢复关键服务...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">CRITICAL_SERVICES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;kube-dns&quot;</span><span class="__shiki_mdbnqw"> &quot;ingress-nginx&quot;</span><span class="__shiki_mdbnqw"> &quot;cert-manager&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> service </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">CRITICAL_SERVICES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">  echo</span><span class="__shiki_mdbnqw"> &quot;恢复服务: </span><span class="__shiki_140thh">$service</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> rollout</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> deployment/</span><span class="__shiki_140thh">$service </span><span class="__shiki_dzsirb">-n</span><span class="__shiki_mdbnqw"> kube-system</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=available</span><span class="__shiki_mdbnqw"> deployment/</span><span class="__shiki_140thh">$service </span><span class="__shiki_dzsirb">-n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_dzsirb"> --timeout=300s</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 数据完整性检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;5. 检查数据完整性...&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查有状态应用</span></span>
<span class="line"><span class="__shiki_140thh">STATEFUL_APPS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> statefulsets</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].metadata.name}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> app </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $STATEFUL_APPS; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">  ns</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> statefulset</span><span class="__shiki_140thh"> $app </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.metadata.namespace}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  replicas</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> statefulset</span><span class="__shiki_140thh"> $app </span><span class="__shiki_dzsirb">-n</span><span class="__shiki_140thh"> $ns </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.replicas}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  ready</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> statefulset</span><span class="__shiki_140thh"> $app </span><span class="__shiki_dzsirb">-n</span><span class="__shiki_140thh"> $ns </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.status.readyReplicas}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$replicas</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ready</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;警告: </span><span class="__shiki_140thh">$app</span><span class="__shiki_mdbnqw"> 副本数不一致 (期望: </span><span class="__shiki_140thh">$replicas</span><span class="__shiki_mdbnqw">, 就绪: </span><span class="__shiki_140thh">$ready</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 触发数据恢复流程</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_mdbnqw"> annotate</span><span class="__shiki_mdbnqw"> statefulset</span><span class="__shiki_140thh"> $app </span><span class="__shiki_dzsirb">-n</span><span class="__shiki_140thh"> $ns </span><span class="__shiki_mdbnqw">force-recovery=</span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_1itgoe">  fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 通知和报告</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;6. 生成事件报告...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --sort-by=</span><span class="__shiki_mdbnqw">&#39;.lastTimestamp&#39;</span><span class="__shiki_dzsirb"> --all-namespaces</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /tmp/upgrade-failure-events.txt</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /tmp/node-status-after-rollback.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 紧急回滚完成 ===&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;请查看报告文件:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;- /tmp/upgrade-failure-events.txt&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;- /tmp/node-status-after-rollback.txt&quot;</span></span></code></pre></div><h2 id="十、升级后验证" tabindex="-1">十、升级后验证 <a class="header-anchor" href="#十、升级后验证" aria-label="Permalink to &quot;十、升级后验证&quot;">​</a></h2><h3 id="_10-1-全面的升级验证清单" tabindex="-1">10.1 全面的升级验证清单 <a class="header-anchor" href="#_10-1-全面的升级验证清单" aria-label="Permalink to &quot;10.1 全面的升级验证清单&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># post-upgrade-validation.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== Kubernetes 升级后验证 ===&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 版本验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;1. 验证组件版本...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> version</span><span class="__shiki_dzsirb"> --short</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> nodes</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{range .items[*]}{.metadata.name}{&quot;\\t&quot;}{.status.nodeInfo.kubeletVersion}{&quot;\\n&quot;}{end}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 集群健康检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;2. 集群健康检查...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> componentstatuses</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> pods</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> kube-system</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> wide</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> Running</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;有Pod未运行&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. API 可用性测试</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;3. API 可用性测试...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">API_SERVER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> config</span><span class="__shiki_mdbnqw"> view</span><span class="__shiki_dzsirb"> --minify</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.clusters[0].cluster.server}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_140thh"> $API_SERVER</span><span class="__shiki_mdbnqw">/healthz</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_140thh"> $API_SERVER</span><span class="__shiki_mdbnqw">/livez</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_140thh"> $API_SERVER</span><span class="__shiki_mdbnqw">/readyz</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 网络验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;4. 网络连通性验证...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> network-test</span><span class="__shiki_dzsirb"> --image=alpine/socat</span><span class="__shiki_dzsirb"> --restart=Never</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_dzsirb"> --tty</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  sh</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;echo &#39;网络测试成功&#39;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. DNS 验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;5. DNS 解析验证...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> dns-test</span><span class="__shiki_dzsirb"> --image=busybox</span><span class="__shiki_dzsirb"> --restart=Never</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_dzsirb"> --tty</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  sh</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;nslookup kubernetes.default.svc.cluster.local &amp;&amp; nslookup google.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 存储验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;6. 存储功能验证...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_mdbnqw">metadata:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  name: test-pvc</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  accessModes:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - ReadWriteOnce</span></span>
<span class="line"><span class="__shiki_mdbnqw">  resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    requests:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      storage: 1Gi</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> pvc</span><span class="__shiki_mdbnqw"> test-pvc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 工作负载验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;7. 工作负载测试...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> deployment</span><span class="__shiki_mdbnqw"> test-deployment</span><span class="__shiki_dzsirb"> --image=nginx</span><span class="__shiki_dzsirb"> --replicas=3</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=available</span><span class="__shiki_mdbnqw"> deployment/test-deployment</span><span class="__shiki_dzsirb"> --timeout=300s</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> expose</span><span class="__shiki_mdbnqw"> deployment</span><span class="__shiki_mdbnqw"> test-deployment</span><span class="__shiki_dzsirb"> --port=80</span><span class="__shiki_dzsirb"> --type=NodePort</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">SERVICE_IP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> svc</span><span class="__shiki_mdbnqw"> test-deployment</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.spec.clusterIP}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_mdbnqw"> curl-test</span><span class="__shiki_dzsirb"> --image=curlimages/curl</span><span class="__shiki_dzsirb"> --restart=Never</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_dzsirb"> --tty</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> http://</span><span class="__shiki_140thh">$SERVICE_IP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 性能基准测试</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;8. 性能基准测试...&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># API响应时间</span></span>
<span class="line"><span class="__shiki_1itgoe">time</span><span class="__shiki_140thh"> kubectl get pods --all-namespaces </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调度延迟测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> job</span><span class="__shiki_mdbnqw"> test-scheduler</span><span class="__shiki_dzsirb"> --image=busybox</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> sleep</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> wait</span><span class="__shiki_dzsirb"> --for=condition=complete</span><span class="__shiki_mdbnqw"> job/test-scheduler</span><span class="__shiki_dzsirb"> --timeout=60s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 9. 清理测试资源</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;9. 清理测试资源...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> deployment</span><span class="__shiki_mdbnqw"> test-deployment</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> delete</span><span class="__shiki_mdbnqw"> job</span><span class="__shiki_mdbnqw"> test-scheduler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 10. 生成验证报告</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;10. 生成验证报告...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /tmp/upgrade-validation-report-</span><span class="__shiki_1t8gfj">$(date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span><span class="__shiki_1t8gfj">.md</span></span>
<span class="line"><span class="__shiki_mdbnqw"># Kubernetes 升级验证报告</span></span>
<span class="line"><span class="__shiki_mdbnqw">## 基本信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 升级前版本: $(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /tmp/pre-upgrade-version.txt)</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 升级后版本: $(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> version </span><span class="__shiki_dzsirb">--short</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> Server </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $3}&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 升级时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 验证时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 验证结果</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 集群健康: ✓</span></span>
<span class="line"><span class="__shiki_mdbnqw">- API可用性: ✓</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 网络功能: ✓</span></span>
<span class="line"><span class="__shiki_mdbnqw">- DNS解析: ✓</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 存储功能: ✓</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 工作负载: ✓</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 性能指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">- API响应时间: $(time kubectl get nodes </span><span class="__shiki_1itgoe">2&gt;&amp;1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> real </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 节点就绪时间: $(</span><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get nodes </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> jsonpath=&#39;{.items[*].status.conditions[?(@.type==&quot;Ready&quot;)].lastTransitionTime}&#39;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">## 建议</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 监控集群24小时</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 验证所有业务应用</span></span>
<span class="line"><span class="__shiki_mdbnqw">- 更新文档和运行手册</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;=== 升级验证完成 ===&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证报告: /tmp/upgrade-validation-report-$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d).md&quot;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Kubernetes集群升级是一项复杂但必要的运维任务。成功的升级需要：</p><ol><li><strong>充分准备</strong>：详细规划、全面备份、彻底测试</li><li><strong>谨慎执行</strong>：遵循推荐路径、分批升级、实时监控</li><li><strong>完备回滚</strong>：准备回滚方案、快速故障恢复</li><li><strong>持续验证</strong>：升级后全面测试、监控关键指标</li></ol><p>选择升级策略时需考虑：</p><ul><li><strong>滚动升级</strong>：适合大多数生产环境，平衡风险和复杂度</li><li><strong>蓝绿升级</strong>：适合对可用性要求极高的场景</li><li><strong>金丝雀升级</strong>：适合复杂环境的风险控制</li></ul><p>记住：没有完美的升级计划，只有充分的准备和灵活的应对。每次升级都是学习和改进的机会，持续优化升级流程是保障集群长期稳定运行的关键。</p>`,85)])])}const b=a(i,[["render",l]]);export{o as __pageData,b as default};
