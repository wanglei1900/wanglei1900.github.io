import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Kubernetes 持久化存储方案 深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/volumes.md","filePath":"devops/container/kubernetes/volumes.md"}'),_={name:"devops/container/kubernetes/volumes.md"};function h(l,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="kubernetes-持久化存储方案-深度解析" tabindex="-1">Kubernetes 持久化存储方案 深度解析 <a class="header-anchor" href="#kubernetes-持久化存储方案-深度解析" aria-label="Permalink to &quot;Kubernetes 持久化存储方案 深度解析&quot;">​</a></h1><h2 id="一、kubernetes-存储基础架构" tabindex="-1">一、Kubernetes 存储基础架构 <a class="header-anchor" href="#一、kubernetes-存储基础架构" aria-label="Permalink to &quot;一、Kubernetes 存储基础架构&quot;">​</a></h2><h3 id="_1-1-存储需求与挑战" tabindex="-1">1.1 存储需求与挑战 <a class="header-anchor" href="#_1-1-存储需求与挑战" aria-label="Permalink to &quot;1.1 存储需求与挑战&quot;">​</a></h3><h4 id="容器存储的四大挑战" tabindex="-1">容器存储的四大挑战： <a class="header-anchor" href="#容器存储的四大挑战" aria-label="Permalink to &quot;容器存储的四大挑战：&quot;">​</a></h4><ol><li><strong>数据持久性</strong>：容器重启/迁移时数据不丢失</li><li><strong>数据共享</strong>：多个容器/应用共享数据</li><li><strong>数据迁移</strong>：Pod调度时数据跟随移动</li><li><strong>存储管理</strong>：自动化供给、扩容、备份</li></ol><h3 id="_1-2-kubernetes-存储架构演进" tabindex="-1">1.2 Kubernetes 存储架构演进 <a class="header-anchor" href="#_1-2-kubernetes-存储架构演进" aria-label="Permalink to &quot;1.2 Kubernetes 存储架构演进&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">容器早期 → Docker Volume → Docker Volume Plugin</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Kubernetes 1.2 → Volume Plugin (in-tree) → FlexVolume</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Kubernetes 1.9 → CSI (Container Storage Interface) 标准化</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">现代架构：PV/PVC + StorageClass + CSI Driver</span></span></code></pre></div><h2 id="二、核心概念与-api-对象" tabindex="-1">二、核心概念与 API 对象 <a class="header-anchor" href="#二、核心概念与-api-对象" aria-label="Permalink to &quot;二、核心概念与 API 对象&quot;">​</a></h2><h3 id="_2-1-存储抽象层次" tabindex="-1">2.1 存储抽象层次 <a class="header-anchor" href="#_2-1-存储抽象层次" aria-label="Permalink to &quot;2.1 存储抽象层次&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">应用层：Pod → Volume Mount</span></span>
<span class="line"><span class="__shiki_wvjl67">抽象层：PersistentVolumeClaim (PVC)</span></span>
<span class="line"><span class="__shiki_wvjl67">实现层：PersistentVolume (PV)</span></span>
<span class="line"><span class="__shiki_wvjl67">驱动层：CSI Driver / In-tree Plugin</span></span>
<span class="line"><span class="__shiki_wvjl67">存储层：物理/云/分布式存储</span></span></code></pre></div><h3 id="_2-2-核心-api-对象详解" tabindex="-1">2.2 核心 API 对象详解 <a class="header-anchor" href="#_2-2-核心-api-对象详解" aria-label="Permalink to &quot;2.2 核心 API 对象详解&quot;">​</a></h3><h4 id="_1-volume-卷-pod级别存储" tabindex="-1">1. Volume（卷） - Pod级别存储 <a class="header-anchor" href="#_1-volume-卷-pod级别存储" aria-label="Permalink to &quot;1. Volume（卷） - Pod级别存储&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage-volume</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 不同类型的卷定义</span></span>
<span class="line"><span class="__shiki_17hn0y">    emptyDir</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或 hostPath, configMap, secret 等</span></span></code></pre></div><h4 id="_2-persistentvolume-pv-集群级别存储资源" tabindex="-1">2. PersistentVolume（PV） - 集群级别存储资源 <a class="header-anchor" href="#_2-persistentvolume-pv-集群级别存储资源" aria-label="Permalink to &quot;2. PersistentVolume（PV） - 集群级别存储资源&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pv-example</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">local</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_21nrsd">     # 单节点读写</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">ReadOnlyMany</span><span class="__shiki_21nrsd">      # 多节点只读</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">ReadWriteMany</span><span class="__shiki_21nrsd">     # 多节点读写</span></span>
<span class="line"><span class="__shiki_17hn0y">  persistentVolumeReclaimPolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    Retain</span><span class="__shiki_21nrsd">             # 保留/Delete/Recycle</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">standard</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 存储后端配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/mnt/data&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DirectoryOrCreate</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 或使用 nfs, cephfs, awsElasticBlockStore 等</span></span></code></pre></div><h4 id="_3-persistentvolumeclaim-pvc-用户存储请求" tabindex="-1">3. PersistentVolumeClaim（PVC） - 用户存储请求 <a class="header-anchor" href="#_3-persistentvolumeclaim-pvc-用户存储请求" aria-label="Permalink to &quot;3. PersistentVolumeClaim（PVC） - 用户存储请求&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pvc-example</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">ReadWriteOnce</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">standard</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 可选，选择特定PV</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">environment</span></span>
<span class="line"><span class="__shiki_17hn0y">      operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">prod</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="_4-storageclass-sc-存储类模板" tabindex="-1">4. StorageClass（SC） - 存储类模板 <a class="header-anchor" href="#_4-storageclass-sc-存储类模板" aria-label="Permalink to &quot;4. StorageClass（SC） - 存储类模板&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fast-ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    storageclass.kubernetes.io/is-default-class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/aws-ebs</span><span class="__shiki_21nrsd">  # 或 CSI驱动</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gp3</span></span>
<span class="line"><span class="__shiki_17hn0y">  iops</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3000&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  throughput</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;125&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  encrypted</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  kmsKeyId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">arn:aws:kms:...</span></span>
<span class="line"><span class="__shiki_17hn0y">reclaimPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Delete</span></span>
<span class="line"><span class="__shiki_17hn0y">allowVolumeExpansion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">volumeBindingMode</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WaitForFirstConsumer</span><span class="__shiki_21nrsd">  # 或 Immediate</span></span>
<span class="line"><span class="__shiki_17hn0y">mountOptions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">discard</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">noatime</span></span></code></pre></div><h3 id="_2-3-访问模式-access-modes" tabindex="-1">2.3 访问模式（Access Modes） <a class="header-anchor" href="#_2-3-访问模式-access-modes" aria-label="Permalink to &quot;2.3 访问模式（Access Modes）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模式</th><th>描述</th><th>典型存储类型</th></tr></thead><tbody><tr><td>ReadWriteOnce (RWO)</td><td>单节点读写</td><td>块存储（EBS, Azure Disk）</td></tr><tr><td>ReadOnlyMany (ROX)</td><td>多节点只读</td><td>文件存储（NFS, CephFS）</td></tr><tr><td>ReadWriteMany (RWX)</td><td>多节点读写</td><td>文件/对象存储</td></tr><tr><td>ReadWriteOncePod (RWOP)</td><td>单Pod读写</td><td>CSI 1.9+ 新特性</td></tr></tbody></table><h3 id="_2-4-回收策略-reclaim-policy" tabindex="-1">2.4 回收策略（Reclaim Policy） <a class="header-anchor" href="#_2-4-回收策略-reclaim-policy" aria-label="Permalink to &quot;2.4 回收策略（Reclaim Policy）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>策略</th><th>行为</th><th>适用场景</th></tr></thead><tbody><tr><td>Retain</td><td>保留PV和数据，手动清理</td><td>重要数据，需要手动管理</td></tr><tr><td>Delete</td><td>自动删除PV和外部存储</td><td>临时数据，测试环境</td></tr><tr><td>Recycle</td><td>废弃（已被Delete替代）</td><td>旧版本</td></tr></tbody></table><h2 id="三、存储供应模式" tabindex="-1">三、存储供应模式 <a class="header-anchor" href="#三、存储供应模式" aria-label="Permalink to &quot;三、存储供应模式&quot;">​</a></h2><h3 id="_3-1-静态供应-static-provisioning" tabindex="-1">3.1 静态供应（Static Provisioning） <a class="header-anchor" href="#_3-1-静态供应-static-provisioning" aria-label="Permalink to &quot;3.1 静态供应（Static Provisioning）&quot;">​</a></h3><p>管理员预先创建PV，用户通过PVC申请</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 步骤1：管理员创建PV</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">static-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/mnt/data&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：用户创建PVC</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">static-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤3：Pod使用PVC</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">static-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">    persistentVolumeClaim</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      claimName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">static-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span></code></pre></div><h3 id="_3-2-动态供应-dynamic-provisioning" tabindex="-1">3.2 动态供应（Dynamic Provisioning） <a class="header-anchor" href="#_3-2-动态供应-dynamic-provisioning" aria-label="Permalink to &quot;3.2 动态供应（Dynamic Provisioning）&quot;">​</a></h3><p>用户创建PVC，StorageClass自动创建PV</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 步骤1：管理员创建StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dynamic-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/aws-ebs</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gp3</span></span>
<span class="line"><span class="__shiki_17hn0y">reclaimPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Delete</span></span>
<span class="line"><span class="__shiki_17hn0y">volumeBindingMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WaitForFirstConsumer</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤2：用户创建PVC</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dynamic-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">5Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dynamic-sc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 步骤3：Pod使用PVC（触发PV创建）</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dynamic-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">    persistentVolumeClaim</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      claimName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dynamic-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_3-3-绑定模式-volume-binding-mode" tabindex="-1">3.3 绑定模式（Volume Binding Mode） <a class="header-anchor" href="#_3-3-绑定模式-volume-binding-mode" aria-label="Permalink to &quot;3.3 绑定模式（Volume Binding Mode）&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模式</th><th>描述</th><th>适用场景</th></tr></thead><tbody><tr><td>Immediate</td><td>PVC创建时立即绑定</td><td>拓扑无关存储</td></tr><tr><td>WaitForFirstConsumer</td><td>首次使用时绑定</td><td>拓扑敏感存储（本地盘）</td></tr></tbody></table><h2 id="四、存储卷类型详解" tabindex="-1">四、存储卷类型详解 <a class="header-anchor" href="#四、存储卷类型详解" aria-label="Permalink to &quot;四、存储卷类型详解&quot;">​</a></h2><h3 id="_4-1-本地存储-local-storage" tabindex="-1">4.1 本地存储（Local Storage） <a class="header-anchor" href="#_4-1-本地存储-local-storage" aria-label="Permalink to &quot;4.1 本地存储（Local Storage）&quot;">​</a></h3><h4 id="_1-emptydir-临时存储" tabindex="-1">1. emptyDir - 临时存储 <a class="header-anchor" href="#_1-emptydir-临时存储" aria-label="Permalink to &quot;1. emptyDir - 临时存储&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">  emptyDir</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    medium</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Memory</span><span class="__shiki_21nrsd">  # 可选：Memory 或 &quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    sizeLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Gi</span><span class="__shiki_21nrsd">  # 可选：限制大小</span></span></code></pre></div><p><strong>特点</strong>：</p><ul><li>Pod生命周期内存在</li><li>节点本地存储（内存或磁盘）</li><li>适合缓存、临时文件</li></ul><h4 id="_2-hostpath-主机路径" tabindex="-1">2. hostPath - 主机路径 <a class="header-anchor" href="#_2-hostpath-主机路径" aria-label="Permalink to &quot;2. hostPath - 主机路径&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">host-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">  hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/lib/data</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DirectoryOrCreate</span><span class="__shiki_21nrsd">  # 类型：</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Directory, DirectoryOrCreate, File, FileOrCreate,</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Socket, CharDevice, BlockDevice</span></span></code></pre></div><p><strong>使用场景</strong>：</p><ul><li>访问节点系统文件（/proc, /sys）</li><li>DaemonSet需要访问主机</li><li>单节点开发测试</li></ul><h4 id="_3-local-本地持久化卷" tabindex="-1">3. local - 本地持久化卷 <a class="header-anchor" href="#_3-local-本地持久化卷" aria-label="Permalink to &quot;3. local - 本地持久化卷&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">local-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  persistentVolumeReclaimPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Retain</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">local-storage</span></span>
<span class="line"><span class="__shiki_17hn0y">  local</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/mnt/disks/ssd1</span></span>
<span class="line"><span class="__shiki_17hn0y">  nodeAffinity</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 重要：指定节点</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      nodeSelectorTerms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span></span>
<span class="line"><span class="__shiki_17hn0y">          operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">          values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">node-1</span></span></code></pre></div><h3 id="_4-2-网络文件存储" tabindex="-1">4.2 网络文件存储 <a class="header-anchor" href="#_4-2-网络文件存储" aria-label="Permalink to &quot;4.2 网络文件存储&quot;">​</a></h3><h4 id="_1-nfs-network-file-system" tabindex="-1">1. NFS（Network File System） <a class="header-anchor" href="#_1-nfs-network-file-system" aria-label="Permalink to &quot;1. NFS（Network File System）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nfs-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteMany</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  nfs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    server</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nfs-server.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/exports/data&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">  mountOptions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">hard</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">nfsvers=4.1</span></span></code></pre></div><h4 id="_2-cephfs" tabindex="-1">2. CephFS <a class="header-anchor" href="#_2-cephfs" aria-label="Permalink to &quot;2. CephFS&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cephfs-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Ti</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteMany</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  cephfs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    monitors</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">10.16.154.78:6789</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">10.16.154.82:6789</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">10.16.154.83:6789</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/some/path&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    user</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">    secretRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ceph-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span></code></pre></div><h3 id="_4-3-块存储" tabindex="-1">4.3 块存储 <a class="header-anchor" href="#_4-3-块存储" aria-label="Permalink to &quot;4.3 块存储&quot;">​</a></h3><h4 id="aws-ebs-elastic-block-store" tabindex="-1">AWS EBS（Elastic Block Store） <a class="header-anchor" href="#aws-ebs-elastic-block-store" aria-label="Permalink to &quot;AWS EBS（Elastic Block Store）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-ebs-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  awsElasticBlockStore</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeID</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">vol-12345678</span></span>
<span class="line"><span class="__shiki_17hn0y">    fsType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ext4</span></span>
<span class="line"><span class="__shiki_17hn0y">    partition</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">  # 可选分区</span></span></code></pre></div><h4 id="azure-disk" tabindex="-1">Azure Disk <a class="header-anchor" href="#azure-disk" aria-label="Permalink to &quot;Azure Disk&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">azure-disk-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  azureDisk</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    diskName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test.vhd</span></span>
<span class="line"><span class="__shiki_17hn0y">    diskURI</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://test.blob.core.windows.net/vhds/test.vhd</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Managed</span><span class="__shiki_21nrsd">  # Managed/Shared/Dedicated</span></span>
<span class="line"><span class="__shiki_17hn0y">    cachingMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ReadWrite</span></span>
<span class="line"><span class="__shiki_17hn0y">    fsType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ext4</span></span></code></pre></div><h4 id="gce-persistent-disk" tabindex="-1">GCE Persistent Disk <a class="header-anchor" href="#gce-persistent-disk" aria-label="Permalink to &quot;GCE Persistent Disk&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolume</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gce-pd-pv</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  capacity</span><span class="__shiki_140thh">: {</span><span class="__shiki_17hn0y">storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  gcePersistentDisk</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    pdName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-data-disk</span></span>
<span class="line"><span class="__shiki_17hn0y">    fsType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ext4</span></span>
<span class="line"><span class="__shiki_17hn0y">    partition</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span></code></pre></div><h3 id="_4-4-配置存储" tabindex="-1">4.4 配置存储 <a class="header-anchor" href="#_4-4-配置存储" aria-label="Permalink to &quot;4.4 配置存储&quot;">​</a></h3><h4 id="_1-configmap" tabindex="-1">1. ConfigMap <a class="header-anchor" href="#_1-configmap" aria-label="Permalink to &quot;1. ConfigMap&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  app.properties</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    server.port=8080</span></span>
<span class="line"><span class="__shiki_mdbnqw">    logging.level=INFO</span></span>
<span class="line"><span class="__shiki_17hn0y">  ui.properties</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    color.good=purple</span></span>
<span class="line"><span class="__shiki_mdbnqw">    color.bad=yellow</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Pod中使用</span></span>
<span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">  configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">    items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application.properties</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ui.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ui.properties</span></span></code></pre></div><h4 id="_2-secret" tabindex="-1">2. Secret <a class="header-anchor" href="#_2-secret" aria-label="Permalink to &quot;2. Secret&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Opaque</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">YWRtaW4=</span><span class="__shiki_21nrsd">  # admin</span></span>
<span class="line"><span class="__shiki_17hn0y">  password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cGFzc3dvcmQ=</span><span class="__shiki_21nrsd">  # password</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Pod中使用</span></span>
<span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">  secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-username</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-password</span></span>
<span class="line"><span class="__shiki_17hn0y">    defaultMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0400</span><span class="__shiki_21nrsd">  # 文件权限</span></span></code></pre></div><h2 id="五、csi-container-storage-interface" tabindex="-1">五、CSI（Container Storage Interface） <a class="header-anchor" href="#五、csi-container-storage-interface" aria-label="Permalink to &quot;五、CSI（Container Storage Interface）&quot;">​</a></h2><h3 id="_5-1-csi-架构设计" tabindex="-1">5.1 CSI 架构设计 <a class="header-anchor" href="#_5-1-csi-架构设计" aria-label="Permalink to &quot;5.1 CSI 架构设计&quot;">​</a></h3><h4 id="csi-组件" tabindex="-1">CSI 组件： <a class="header-anchor" href="#csi-组件" aria-label="Permalink to &quot;CSI 组件：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           Kubernetes Cluster            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  External Provisioner │ External Attacher│</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Kubernetes API Server          │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  Kubelet (Node)      │  CSI Driver Pod  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────────────┐ │  ┌─────────────┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │ Volume Manager  │ │  │ CSI Sidecar │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │     │           │ │  │     │       │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  Volume Plugin  ├─┼──► CSI Node    │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────────────┘ │  │   Service   │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │  └─────────────┘ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │          │        │</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │  ┌───────▼──────┐│</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │  │  存储后端     ││</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │  │ (Storage)    ││</span></span>
<span class="line"><span class="__shiki_wvjl67">│                      │  └──────────────┘│</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_5-2-csi-驱动安装示例" tabindex="-1">5.2 CSI 驱动安装示例 <a class="header-anchor" href="#_5-2-csi-驱动安装示例" aria-label="Permalink to &quot;5.2 CSI 驱动安装示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># CSI Driver 部署示例 (AWS EBS CSI)</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CSIDriver</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  attachRequired</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  podInfoOnMount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumeLifecycleModes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Persistent</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># StorageClass 使用 CSI</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs-csi-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gp3</span></span>
<span class="line"><span class="__shiki_17hn0y">  encrypted</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  kmsKeyId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">arn:aws:kms:...</span></span>
<span class="line"><span class="__shiki_17hn0y">reclaimPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Delete</span></span>
<span class="line"><span class="__shiki_17hn0y">allowVolumeExpansion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">volumeBindingMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WaitForFirstConsumer</span></span></code></pre></div><h3 id="_5-3-主流-csi-驱动对比" tabindex="-1">5.3 主流 CSI 驱动对比 <a class="header-anchor" href="#_5-3-主流-csi-驱动对比" aria-label="Permalink to &quot;5.3 主流 CSI 驱动对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>驱动</th><th>存储类型</th><th>特性</th><th>适用场景</th></tr></thead><tbody><tr><td>AWS EBS CSI</td><td>块存储</td><td>加密、快照、扩容</td><td>AWS EBS</td></tr><tr><td>Azure Disk CSI</td><td>块存储</td><td>托管磁盘、性能层</td><td>Azure</td></tr><tr><td>GCE PD CSI</td><td>块存储</td><td>区域持久盘</td><td>GCP</td></tr><tr><td>Ceph CSI</td><td>块/文件</td><td>RBD/CephFS</td><td>私有云</td></tr><tr><td>Rook CSI</td><td>块/文件/对象</td><td>Ceph集成</td><td>Kubernetes原生</td></tr><tr><td>Longhorn</td><td>块存储</td><td>分布式、精简配置</td><td>混合云</td></tr><tr><td>Portworx</td><td>块存储</td><td>企业级特性</td><td>生产环境</td></tr><tr><td>OpenEBS</td><td>块存储</td><td>容器原生</td><td>开发测试</td></tr></tbody></table><h2 id="六、高级存储特性" tabindex="-1">六、高级存储特性 <a class="header-anchor" href="#六、高级存储特性" aria-label="Permalink to &quot;六、高级存储特性&quot;">​</a></h2><h3 id="_6-1-存储扩容-volume-expansion" tabindex="-1">6.1 存储扩容（Volume Expansion） <a class="header-anchor" href="#_6-1-存储扩容-volume-expansion" aria-label="Permalink to &quot;6.1 存储扩容（Volume Expansion）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. StorageClass 启用扩容</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">expandable-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/aws-ebs</span></span>
<span class="line"><span class="__shiki_17hn0y">allowVolumeExpansion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 关键配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 编辑PVC扩容</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">expandable-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span><span class="__shiki_21nrsd">  # 修改为 20Gi 进行扩容</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">expandable-sc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 文件系统扩容（部分CSI驱动自动处理）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 对于需要手动扩容的情况：</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 进入Pod执行 resize2fs /dev/xvdb</span></span></code></pre></div><h3 id="_6-2-存储快照-volume-snapshots" tabindex="-1">6.2 存储快照（Volume Snapshots） <a class="header-anchor" href="#_6-2-存储快照-volume-snapshots" aria-label="Permalink to &quot;6.2 存储快照（Volume Snapshots）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建 VolumeSnapshotClass</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">snapshot.storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VolumeSnapshotClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">csi-snapclass</span></span>
<span class="line"><span class="__shiki_17hn0y">driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">deletionPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Delete</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 驱动特定参数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 创建 VolumeSnapshot</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">snapshot.storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VolumeSnapshot</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pvc-snapshot</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumeSnapshotClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">csi-snapclass</span></span>
<span class="line"><span class="__shiki_17hn0y">  source</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    persistentVolumeClaimName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">source-pvc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 从快照创建PVC</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">restored-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs-csi-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">  dataSource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pvc-snapshot</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VolumeSnapshot</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">snapshot.storage.k8s.io</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span></span></code></pre></div><h3 id="_6-3-存储克隆-volume-cloning" tabindex="-1">6.3 存储克隆（Volume Cloning） <a class="header-anchor" href="#_6-3-存储克隆-volume-cloning" aria-label="Permalink to &quot;6.3 存储克隆（Volume Cloning）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cloned-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">standard</span></span>
<span class="line"><span class="__shiki_17hn0y">  dataSource</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">source-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">PersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">  accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span></span></code></pre></div><h3 id="_6-4-拓扑感知-topology-awareness" tabindex="-1">6.4 拓扑感知（Topology Awareness） <a class="header-anchor" href="#_6-4-拓扑感知-topology-awareness" aria-label="Permalink to &quot;6.4 拓扑感知（Topology Awareness）&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology-aware-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/aws-ebs</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gp3</span></span>
<span class="line"><span class="__shiki_17hn0y">volumeBindingMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WaitForFirstConsumer</span></span>
<span class="line"><span class="__shiki_17hn0y">allowedTopologies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">matchLabelExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"><span class="__shiki_17hn0y">    values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">us-west-2a</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">us-west-2b</span></span></code></pre></div><h2 id="七、有状态应用存储方案" tabindex="-1">七、有状态应用存储方案 <a class="header-anchor" href="#七、有状态应用存储方案" aria-label="Permalink to &quot;七、有状态应用存储方案&quot;">​</a></h2><h3 id="_7-1-statefulset-存储模式" tabindex="-1">7.1 StatefulSet 存储模式 <a class="header-anchor" href="#_7-1-statefulset-存储模式" aria-label="Permalink to &quot;7.1 StatefulSet 存储模式&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StatefulSet</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql:8.0</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span class="__shiki_17hn0y">          valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            secretKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">              key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/lib/mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">          subPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span><span class="__shiki_21nrsd">  # 子路径挂载</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/mysql/conf.d</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 关键：每个Pod独立的PVC模板</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumeClaimTemplates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">standard</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Gi</span></span></code></pre></div><h3 id="_7-2-有状态应用存储策略" tabindex="-1">7.2 有状态应用存储策略 <a class="header-anchor" href="#_7-2-有状态应用存储策略" aria-label="Permalink to &quot;7.2 有状态应用存储策略&quot;">​</a></h3><h4 id="数据库存储模式" tabindex="-1">数据库存储模式： <a class="header-anchor" href="#数据库存储模式" aria-label="Permalink to &quot;数据库存储模式：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># PostgreSQL StatefulSet 示例</span></span>
<span class="line"><span class="__shiki_17hn0y">volumeClaimTemplates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres-data</span></span>
<span class="line"><span class="__shiki_17hn0y">  spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fast-ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">    resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">    selector</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 绑定特定PV</span></span>
<span class="line"><span class="__shiki_17hn0y">      matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres</span></span>
<span class="line"><span class="__shiki_17hn0y">        role</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">master</span></span></code></pre></div><h4 id="消息队列存储模式" tabindex="-1">消息队列存储模式： <a class="header-anchor" href="#消息队列存储模式" aria-label="Permalink to &quot;消息队列存储模式：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kafka StatefulSet 示例</span></span>
<span class="line"><span class="__shiki_17hn0y">volumeClaimTemplates</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kafka-data</span></span>
<span class="line"><span class="__shiki_17hn0y">  spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">local-ssd</span><span class="__shiki_21nrsd">  # 本地SSD提高性能</span></span>
<span class="line"><span class="__shiki_17hn0y">    resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">200Gi</span></span></code></pre></div><h3 id="_7-3-存储编排最佳实践" tabindex="-1">7.3 存储编排最佳实践 <a class="header-anchor" href="#_7-3-存储编排最佳实践" aria-label="Permalink to &quot;7.3 存储编排最佳实践&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StatefulSet</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zookeeper</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 存储管理注解</span></span>
<span class="line"><span class="__shiki_17hn0y">    backup.velero.io/backup-volumes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data,logs</span></span>
<span class="line"><span class="__shiki_17hn0y">    snapshot.alpha.kubernetes.io/snapshot-class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">csi-snapclass</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podManagementPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Parallel</span><span class="__shiki_21nrsd">  # 或 OrderedReady</span></span>
<span class="line"><span class="__shiki_17hn0y">  updateStrategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      partition</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # 金丝雀更新分区</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 初始化容器进行存储准备</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      initContainers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">init-storage</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">        command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">sh</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">-c</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          chown -R 1000:1000 /data</span></span>
<span class="line"><span class="__shiki_mdbnqw">          chmod -R 755 /data</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span></code></pre></div><h2 id="八、存储安全与加密" tabindex="-1">八、存储安全与加密 <a class="header-anchor" href="#八、存储安全与加密" aria-label="Permalink to &quot;八、存储安全与加密&quot;">​</a></h2><h3 id="_8-1-静态数据加密" tabindex="-1">8.1 静态数据加密 <a class="header-anchor" href="#_8-1-静态数据加密" aria-label="Permalink to &quot;8.1 静态数据加密&quot;">​</a></h3><h4 id="_1-kubernetes-原生加密" tabindex="-1">1. Kubernetes 原生加密 <a class="header-anchor" href="#_1-kubernetes-原生加密" aria-label="Permalink to &quot;1. Kubernetes 原生加密&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">encryption-config</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/encryption-config</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 加密配置</span></span></code></pre></div><h4 id="_2-云平台存储加密" tabindex="-1">2. 云平台存储加密 <a class="header-anchor" href="#_2-云平台存储加密" aria-label="Permalink to &quot;2. 云平台存储加密&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># AWS EBS 加密</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">encrypted-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  encrypted</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  kmsKeyId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Azure Disk 加密</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  skuname</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Premium_LRS</span></span>
<span class="line"><span class="__shiki_17hn0y">  kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Managed</span></span>
<span class="line"><span class="__shiki_17hn0y">  cachingmode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ReadOnly</span></span>
<span class="line"><span class="__shiki_17hn0y">  diskEncryptionSetID</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/subscriptions/{subs-id}/resourceGroups/{rg-name}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSet-name}</span></span></code></pre></div><h3 id="_8-2-存储访问控制" tabindex="-1">8.2 存储访问控制 <a class="header-anchor" href="#_8-2-存储访问控制" aria-label="Permalink to &quot;8.2 存储访问控制&quot;">​</a></h3><h4 id="_1-pod-security-context" tabindex="-1">1. Pod Security Context <a class="header-anchor" href="#_1-pod-security-context" aria-label="Permalink to &quot;1. Pod Security Context&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security-context-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runAsUser</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">    runAsGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3000</span></span>
<span class="line"><span class="__shiki_17hn0y">    fsGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_21nrsd">  # 卷文件系统组</span></span>
<span class="line"><span class="__shiki_17hn0y">    fsGroupChangePolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;OnRootMismatch&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">sec-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      allowPrivilegeEscalation</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnlyRootFilesystem</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        drop</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;ALL&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">    persistentVolumeClaim</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      claimName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mypvc</span></span></code></pre></div><h4 id="_2-selinux-apparmor" tabindex="-1">2. SELinux/AppArmor <a class="header-anchor" href="#_2-selinux-apparmor" aria-label="Permalink to &quot;2. SELinux/AppArmor&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  seLinuxOptions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    level</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;s0:c123,c456&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  appArmorProfile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">runtime/default</span></span></code></pre></div><h2 id="九、存储性能优化" tabindex="-1">九、存储性能优化 <a class="header-anchor" href="#九、存储性能优化" aria-label="Permalink to &quot;九、存储性能优化&quot;">​</a></h2><h3 id="_9-1-性能参数调优" tabindex="-1">9.1 性能参数调优 <a class="header-anchor" href="#_9-1-性能参数调优" aria-label="Permalink to &quot;9.1 性能参数调优&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 高性能 StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">high-performance</span></span>
<span class="line"><span class="__shiki_17hn0y">provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">io2</span><span class="__shiki_21nrsd">  # 或 gp3</span></span>
<span class="line"><span class="__shiki_17hn0y">  iops</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;16000&quot;</span><span class="__shiki_21nrsd">  # 预配置IOPS</span></span>
<span class="line"><span class="__shiki_17hn0y">  throughput</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1000&quot;</span><span class="__shiki_21nrsd">  # MB/s</span></span>
<span class="line"><span class="__shiki_17hn0y">  blockSize</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256k&quot;</span><span class="__shiki_21nrsd">  # 块大小</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 文件系统参数</span></span>
<span class="line"><span class="__shiki_17hn0y">  mkfsarg</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;-O ^has_journal,extent,^uninit_bg&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  mounter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">xfs</span><span class="__shiki_21nrsd">  # 或 ext4</span></span>
<span class="line"><span class="__shiki_17hn0y">mountOptions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">noatime</span><span class="__shiki_21nrsd">      # 不更新访问时间</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">nodiratime</span><span class="__shiki_21nrsd">   # 不更新目录访问时间</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">discard</span><span class="__shiki_21nrsd">      # 启用TRIM</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">nobarrier</span><span class="__shiki_21nrsd">    # 禁用屏障（在某些场景）</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">inode64</span><span class="__shiki_21nrsd">      # XFS：支持大inode</span></span></code></pre></div><h3 id="_9-2-缓存策略" tabindex="-1">9.2 缓存策略 <a class="header-anchor" href="#_9-2-缓存策略" aria-label="Permalink to &quot;9.2 缓存策略&quot;">​</a></h3><h4 id="_1-本地缓存方案" tabindex="-1">1. 本地缓存方案 <a class="header-anchor" href="#_1-本地缓存方案" aria-label="Permalink to &quot;1. 本地缓存方案&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cached-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/cache</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"><span class="__shiki_17hn0y">    emptyDir</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      medium</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Memory</span></span>
<span class="line"><span class="__shiki_17hn0y">      sizeLimit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2Gi</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">data</span></span>
<span class="line"><span class="__shiki_17hn0y">    persistentVolumeClaim</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      claimName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">slow-storage-pvc</span></span></code></pre></div><h4 id="_2-分布式缓存方案" tabindex="-1">2. 分布式缓存方案 <a class="header-anchor" href="#_2-分布式缓存方案" aria-label="Permalink to &quot;2. 分布式缓存方案&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用 Redis 或 Memcached 作为缓存层</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-cache</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-data</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/data</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis-data</span></span>
<span class="line"><span class="__shiki_17hn0y">        emptyDir</span><span class="__shiki_140thh">: {}</span></span></code></pre></div><h2 id="十、备份与灾难恢复" tabindex="-1">十、备份与灾难恢复 <a class="header-anchor" href="#十、备份与灾难恢复" aria-label="Permalink to &quot;十、备份与灾难恢复&quot;">​</a></h2><h3 id="_10-1-velero-备份方案" tabindex="-1">10.1 Velero 备份方案 <a class="header-anchor" href="#_10-1-velero-备份方案" aria-label="Permalink to &quot;10.1 Velero 备份方案&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Velero 备份配置示例</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Backup</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">daily-backup</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  includedNamespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  excludedNamespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">kube-system</span></span>
<span class="line"><span class="__shiki_17hn0y">  includedResources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">persistentvolumes</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">persistentvolumeclaims</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">pods</span></span>
<span class="line"><span class="__shiki_17hn0y">  labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      backup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">720h</span><span class="__shiki_21nrsd">  # 30天</span></span>
<span class="line"><span class="__shiki_17hn0y">  storageLocation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumeSnapshotLocations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">aws-us-west-2</span></span>
<span class="line"><span class="__shiki_17hn0y">  defaultVolumesToRestic</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 定时备份</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Schedule</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">daily</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;@daily&quot;</span><span class="__shiki_21nrsd">  # 或 &quot;0 2 * * *&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">720h</span></span>
<span class="line"><span class="__shiki_17hn0y">    includedNamespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&#39;*&#39;</span></span></code></pre></div><h3 id="_10-2-存储级别备份" tabindex="-1">10.2 存储级别备份 <a class="header-anchor" href="#_10-2-存储级别备份" aria-label="Permalink to &quot;10.2 存储级别备份&quot;">​</a></h3><h4 id="_1-云平台快照策略" tabindex="-1">1. 云平台快照策略 <a class="header-anchor" href="#_1-云平台快照策略" aria-label="Permalink to &quot;1. 云平台快照策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># AWS EBS 自动快照</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">snapshot.storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VolumeSnapshotClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">daily-snapshot</span></span>
<span class="line"><span class="__shiki_17hn0y">driver</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">deletionPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Retain</span></span>
<span class="line"><span class="__shiki_17hn0y">parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tagKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">BackupPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">  tagValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Daily</span></span></code></pre></div><h4 id="_2-应用一致性备份" tabindex="-1">2. 应用一致性备份 <a class="header-anchor" href="#_2-应用一致性备份" aria-label="Permalink to &quot;2. 应用一致性备份&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用 Pre/Post 钩子确保一致性</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">velero.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Backup</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-consistent-backup</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  hooks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql-deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">      includedNamespaces</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">      labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">      pre</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          container</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">/bin/bash</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">-c</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            mysql -u root -p$MYSQL_ROOT_PASSWORD -e &quot;FLUSH TABLES WITH READ LOCK;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            sleep 30</span></span>
<span class="line"><span class="__shiki_17hn0y">          onError</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Fail</span></span>
<span class="line"><span class="__shiki_17hn0y">      post</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          container</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">          command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">/bin/bash</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">-c</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">mysql -u root -p$MYSQL_ROOT_PASSWORD -e &quot;UNLOCK TABLES;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          onError</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Fail</span></span></code></pre></div><h2 id="十一、多集群存储方案" tabindex="-1">十一、多集群存储方案 <a class="header-anchor" href="#十一、多集群存储方案" aria-label="Permalink to &quot;十一、多集群存储方案&quot;">​</a></h2><h3 id="_11-1-跨集群存储同步" tabindex="-1">11.1 跨集群存储同步 <a class="header-anchor" href="#_11-1-跨集群存储同步" aria-label="Permalink to &quot;11.1 跨集群存储同步&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用 Rook Ceph 跨集群存储</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ceph.rook.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CephBlockPool</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cross-cluster-pool</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rook-ceph</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicated</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 跨区配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    failureDomain</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">zone</span></span>
<span class="line"><span class="__shiki_17hn0y">    crushRoot</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cross-cluster-root&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  mirroring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    mode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">image</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 对等集群配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    peers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      secretNames</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">peer-cluster-secret</span></span></code></pre></div><h3 id="_11-2-存储联邦方案" tabindex="-1">11.2 存储联邦方案 <a class="header-anchor" href="#_11-2-存储联邦方案" aria-label="Permalink to &quot;11.2 存储联邦方案&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Kubernetes Federation 存储配置</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">types.kubefed.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">FederatedPersistentVolumeClaim</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">federated-pvc</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  placement</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    clusterSelector</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      accessModes</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ReadWriteOnce</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">10Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">      storageClassName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">federated-sc</span></span>
<span class="line"><span class="__shiki_17hn0y">  overrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">clusterName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cluster-asia</span></span>
<span class="line"><span class="__shiki_17hn0y">    clusterOverrides</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/spec/resources/requests/storage&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">20Gi</span></span></code></pre></div><h2 id="十二、监控与告警" tabindex="-1">十二、监控与告警 <a class="header-anchor" href="#十二、监控与告警" aria-label="Permalink to &quot;十二、监控与告警&quot;">​</a></h2><h3 id="_12-1-存储监控指标" tabindex="-1">12.1 存储监控指标 <a class="header-anchor" href="#_12-1-存储监控指标" aria-label="Permalink to &quot;12.1 存储监控指标&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus Storage Monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring.coreos.com/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceMonitor</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage-monitor</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">csi-driver</span></span>
<span class="line"><span class="__shiki_17hn0y">  endpoints</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">    interval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30s</span></span>
<span class="line"><span class="__shiki_17hn0y">    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespaceSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    any</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关键监控指标</span></span>
<span class="line"><span class="__shiki_21nrsd"># - kubelet_volume_stats_available_bytes</span></span>
<span class="line"><span class="__shiki_21nrsd"># - kubelet_volume_stats_capacity_bytes</span></span>
<span class="line"><span class="__shiki_21nrsd"># - kubelet_volume_stats_used_bytes</span></span>
<span class="line"><span class="__shiki_21nrsd"># - csi_sidecar_operations_seconds</span></span>
<span class="line"><span class="__shiki_21nrsd"># - storage_operation_duration_seconds</span></span></code></pre></div><h3 id="_12-2-存储容量规划" tabindex="-1">12.2 存储容量规划 <a class="header-anchor" href="#_12-2-存储容量规划" aria-label="Permalink to &quot;12.2 存储容量规划&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用 VerticalPodAutoscaler 自动调整存储</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">autoscaling.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">VerticalPodAutoscaler</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage-vpa</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  targetRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;apps/v1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StatefulSet</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql</span></span>
<span class="line"><span class="__shiki_17hn0y">  updatePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    updateMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Auto&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  resourcePolicy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    containerPolicies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      minAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxAllowed</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        storage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100Gi</span></span>
<span class="line"><span class="__shiki_17hn0y">      controlledResources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&quot;storage&quot;</span></span></code></pre></div><h2 id="十三、最佳实践总结" tabindex="-1">十三、最佳实践总结 <a class="header-anchor" href="#十三、最佳实践总结" aria-label="Permalink to &quot;十三、最佳实践总结&quot;">​</a></h2><h3 id="_13-1-存储选择决策树" tabindex="-1">13.1 存储选择决策树 <a class="header-anchor" href="#_13-1-存储选择决策树" aria-label="Permalink to &quot;13.1 存储选择决策树&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">需要持久化存储吗？</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">是 → 数据访问模式？</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        单Pod读写 → 块存储 (RWO) → 本地/云块存储</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        多Pod只读 → 文件存储 (ROX) → NFS/CephFS</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">        多Pod读写 → 文件存储 (RWX) → CephFS/GlusterFS</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">需要高性能？ → 本地SSD/高性能云盘</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">需要高可用？ → 复制存储/跨区存储</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">需要备份？ → 启用快照/定期备份</span></span>
<span class="line"><span class="__shiki_wvjl67">        ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">生产环境？ → 启用加密/监控/告警</span></span></code></pre></div><h3 id="_13-2-配置模板库" tabindex="-1">13.2 配置模板库 <a class="header-anchor" href="#_13-2-配置模板库" aria-label="Permalink to &quot;13.2 配置模板库&quot;">​</a></h3><h4 id="生产级存储配置" tabindex="-1">生产级存储配置： <a class="header-anchor" href="#生产级存储配置" aria-label="Permalink to &quot;生产级存储配置：&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># production-storage.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">storage.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">StorageClass</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-ssd</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    storageclass.kubernetes.io/is-default-class</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Production SSD storage with encryption and snapshots&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    support-tier</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24x7&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  cost-center</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;infra-001&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  provisioner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ebs.csi.aws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  parameters</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gp3</span></span>
<span class="line"><span class="__shiki_17hn0y">    iops</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3000&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    throughput</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;125&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    encrypted</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    kmsKeyId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${KMS_KEY_ARN}</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Environment=Production,BackupPolicy=Daily&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  reclaimPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Retain</span></span>
<span class="line"><span class="__shiki_17hn0y">  allowVolumeExpansion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumeBindingMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">WaitForFirstConsumer</span></span>
<span class="line"><span class="__shiki_17hn0y">  mountOptions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">noatime</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">nodiratime</span></span>
<span class="line"><span class="__shiki_17hn0y">  allowedTopologies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">matchLabelExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">topology.kubernetes.io/zone</span></span>
<span class="line"><span class="__shiki_17hn0y">      values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">\${ZONE_A}</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">\${ZONE_B}</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">\${ZONE_C}</span></span></code></pre></div><h3 id="_13-3-故障排查指南" tabindex="-1">13.3 故障排查指南 <a class="header-anchor" href="#_13-3-故障排查指南" aria-label="Permalink to &quot;13.3 故障排查指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>可能原因</th><th>排查步骤</th></tr></thead><tbody><tr><td>PVC Pending</td><td>1. StorageClass不存在<br>2. 配额不足<br>3. 拓扑限制</td><td><code>kubectl describe pvc</code><br><code>kubectl get storageclass</code><br>检查资源配额</td></tr><tr><td>Pod无法挂载</td><td>1. PVC未绑定<br>2. 节点资源不足<br>3. 驱动问题</td><td><code>kubectl describe pod</code><br>检查节点磁盘<br>检查CSI驱动日志</td></tr><tr><td>性能问题</td><td>1. 存储类型不匹配<br>2. 配置参数错误<br>3. 网络延迟</td><td>检查StorageClass参数<br>监控IOPS/吞吐量<br>测试网络延迟</td></tr><tr><td>数据丢失</td><td>1. 回收策略Delete<br>2. 手动删除PV<br>3. 存储后端故障</td><td>检查PV回收策略<br>确认备份状态<br>联系存储提供商</td></tr></tbody></table><h2 id="十四、新兴趋势" tabindex="-1">十四、新兴趋势 <a class="header-anchor" href="#十四、新兴趋势" aria-label="Permalink to &quot;十四、新兴趋势&quot;">​</a></h2><h3 id="_14-1-容器原生存储" tabindex="-1">14.1 容器原生存储 <a class="header-anchor" href="#_14-1-容器原生存储" aria-label="Permalink to &quot;14.1 容器原生存储&quot;">​</a></h3><ul><li><strong>OpenEBS</strong>：Kubernetes原生存储引擎</li><li><strong>Rook</strong>：云原生存储编排器</li><li><strong>Longhorn</strong>：轻量级分布式块存储</li></ul><h3 id="_14-2-存储即代码" tabindex="-1">14.2 存储即代码 <a class="header-anchor" href="#_14-2-存储即代码" aria-label="Permalink to &quot;14.2 存储即代码&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用 Crossplane 管理存储</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database.aws.crossplane.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RDSInstance</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">crossplane-db</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  forProvider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-west-2</span></span>
<span class="line"><span class="__shiki_17hn0y">    dbInstanceClass</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db.t3.small</span></span>
<span class="line"><span class="__shiki_17hn0y">    masterUsername</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">    engine</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres</span></span>
<span class="line"><span class="__shiki_17hn0y">    engineVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;13&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    skipFinalSnapshotBeforeDeletion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    allocatedStorage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">    storageEncrypted</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  writeConnectionSecretToRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-conn-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">crossplane-system</span></span></code></pre></div><h3 id="_14-3-智能存储" tabindex="-1">14.3 智能存储 <a class="header-anchor" href="#_14-3-智能存储" aria-label="Permalink to &quot;14.3 智能存储&quot;">​</a></h3><ul><li>AI驱动的容量预测</li><li>自动化性能调优</li><li>智能数据分层</li></ul><hr><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Kubernetes持久化存储是一个多层次的复杂系统，从基础的Volume到高级的CSI驱动，再到企业级的存储解决方案。关键要点：</p><ol><li><strong>理解存储需求</strong>：根据应用特点选择合适的存储类型</li><li><strong>遵循最佳实践</strong>：使用StorageClass、PVC进行抽象管理</li><li><strong>确保数据安全</strong>：加密、备份、访问控制缺一不可</li><li><strong>关注性能与成本</strong>：平衡存储性能与成本效益</li><li><strong>建立运维体系</strong>：监控、告警、自动化运维</li></ol><p>随着云原生生态的发展，存储方案也在不断演进，未来将更加智能化、自动化和标准化。</p>`,145)])])}const r=a(_,[["render",h]]);export{o as __pageData,r as default};
