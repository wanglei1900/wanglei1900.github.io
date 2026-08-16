import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"裸机/VM部署：Node.js应用日志切割与管理系统全面指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/runtime/nodejs/logrotate.md","filePath":"devops/deployment/runtime/nodejs/logrotate.md"}'),p={name:"devops/deployment/runtime/nodejs/logrotate.md"};function l(h,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="裸机-vm部署-node-js应用日志切割与管理系统全面指南" tabindex="-1">裸机/VM部署：Node.js应用日志切割与管理系统全面指南 <a class="header-anchor" href="#裸机-vm部署-node-js应用日志切割与管理系统全面指南" aria-label="Permalink to &quot;裸机/VM部署：Node.js应用日志切割与管理系统全面指南&quot;">​</a></h1><h2 id="一、日志管理核心问题与需求分析" tabindex="-1">一、日志管理核心问题与需求分析 <a class="header-anchor" href="#一、日志管理核心问题与需求分析" aria-label="Permalink to &quot;一、日志管理核心问题与需求分析&quot;">​</a></h2><h3 id="_1-1-生产环境日志挑战" tabindex="-1">1.1 生产环境日志挑战 <a class="header-anchor" href="#_1-1-生产环境日志挑战" aria-label="Permalink to &quot;1.1 生产环境日志挑战&quot;">​</a></h3><p>在裸机/VM部署环境下，Node.js应用日志管理面临以下核心挑战：</p><table tabindex="0"><thead><tr><th><strong>挑战</strong></th><th><strong>具体表现</strong></th><th><strong>潜在风险</strong></th></tr></thead><tbody><tr><td><strong>磁盘空间占用</strong></td><td>单日日志可达GB级别，未切割文件快速膨胀</td><td>磁盘占满导致服务不可用</td></tr><tr><td><strong>历史查询困难</strong></td><td>单个大文件难以检索特定时间段的日志</td><td>故障排查效率低下</td></tr><tr><td><strong>性能影响</strong></td><td>大文件写入和读取性能下降</td><td>应用响应时间增加</td></tr><tr><td><strong>备份困难</strong></td><td>数十GB的日志文件难以有效备份</td><td>灾难恢复能力受限</td></tr><tr><td><strong>多实例管理</strong></td><td>Cluster模式下多进程日志混合</td><td>问题定位复杂度增加</td></tr></tbody></table><h3 id="_1-2-日志切割的核心目标" tabindex="-1">1.2 日志切割的核心目标 <a class="header-anchor" href="#_1-2-日志切割的核心目标" aria-label="Permalink to &quot;1.2 日志切割的核心目标&quot;">​</a></h3><ol><li><strong>按时间/大小自动分割</strong>：基于时间窗口或文件大小自动创建新文件</li><li><strong>历史清理策略</strong>：自动删除过期日志，释放磁盘空间</li><li><strong>压缩归档</strong>：对历史日志进行压缩，节省存储成本</li><li><strong>权限与安全</strong>：确保日志文件访问权限控制</li><li><strong>无缝集成</strong>：与应用无侵入式集成，不影响业务逻辑</li></ol><h2 id="二、日志切割技术方案全景对比" tabindex="-1">二、日志切割技术方案全景对比 <a class="header-anchor" href="#二、日志切割技术方案全景对比" aria-label="Permalink to &quot;二、日志切割技术方案全景对比&quot;">​</a></h2><h3 id="_2-1-主流方案技术对比" tabindex="-1">2.1 主流方案技术对比 <a class="header-anchor" href="#_2-1-主流方案技术对比" aria-label="Permalink to &quot;2.1 主流方案技术对比&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 各方案功能对比概览</span></span>
<span class="line"><span class="__shiki_1t8gfj">+----------------------+------------+------------+-------------+----------------+-----------+</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> 方案</span><span class="__shiki_1itgoe">                |</span><span class="__shiki_1t8gfj"> 自动切割</span><span class="__shiki_1itgoe">   |</span><span class="__shiki_1t8gfj"> 压缩归档</span><span class="__shiki_1itgoe">   |</span><span class="__shiki_1t8gfj"> 进程重载</span><span class="__shiki_1itgoe">    |</span><span class="__shiki_1t8gfj"> 配置复杂度</span><span class="__shiki_1itgoe">     |</span><span class="__shiki_1t8gfj"> 学习曲线</span><span class="__shiki_1itgoe">  |</span></span>
<span class="line"><span class="__shiki_1t8gfj">+----------------------+------------+------------+-------------+----------------+-----------+</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> logrotate系统工具</span><span class="__shiki_1itgoe">   |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">          |</span><span class="__shiki_1t8gfj"> 中等</span><span class="__shiki_1itgoe">           |</span><span class="__shiki_1t8gfj"> 低</span><span class="__shiki_1itgoe">        |</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> PM2内置日志管理</span><span class="__shiki_1itgoe">     |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">          |</span><span class="__shiki_1t8gfj"> 低</span><span class="__shiki_1itgoe">             |</span><span class="__shiki_1t8gfj"> 极低</span><span class="__shiki_1itgoe">      |</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> 日志库自带轮转</span><span class="__shiki_1itgoe">      |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ⚠️部分支持</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> ❌</span><span class="__shiki_1itgoe">          |</span><span class="__shiki_1t8gfj"> 中等</span><span class="__shiki_1itgoe">           |</span><span class="__shiki_1t8gfj"> 中等</span><span class="__shiki_1itgoe">      |</span></span>
<span class="line"><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> 自定义脚本方案</span><span class="__shiki_1itgoe">      |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ✅</span><span class="__shiki_1itgoe">         |</span><span class="__shiki_1t8gfj"> ⚠️需要开发</span><span class="__shiki_1itgoe">  |</span><span class="__shiki_1t8gfj"> 高</span><span class="__shiki_1itgoe">             |</span><span class="__shiki_1t8gfj"> 高</span><span class="__shiki_1itgoe">        |</span></span>
<span class="line"><span class="__shiki_1t8gfj">+----------------------+------------+------------+-------------+----------------+-----------+</span></span></code></pre></div><h3 id="_2-2-适用场景分析" tabindex="-1">2.2 适用场景分析 <a class="header-anchor" href="#_2-2-适用场景分析" aria-label="Permalink to &quot;2.2 适用场景分析&quot;">​</a></h3><p><strong>logrotate最佳场景</strong>：</p><ul><li>系统级服务部署（systemd管理的服务）</li><li>多语言混合环境统一管理</li><li>需要精细控制切割策略的场景</li></ul><p><strong>PM2内置方案最佳场景</strong>：</p><ul><li>PM2管理的Node.js应用</li><li>快速部署需求</li><li>开发者友好型运维</li></ul><p><strong>日志库集成方案最佳场景</strong>：</p><ul><li>应用需要高级日志特性（结构化、多传输）</li><li>开发环境与生产环境一致性要求</li><li>框架深度集成需求</li></ul><h2 id="三、logrotate方案深度配置" tabindex="-1">三、logrotate方案深度配置 <a class="header-anchor" href="#三、logrotate方案深度配置" aria-label="Permalink to &quot;三、logrotate方案深度配置&quot;">​</a></h2><h3 id="_3-1-logrotate核心工作机制" tabindex="-1">3.1 logrotate核心工作机制 <a class="header-anchor" href="#_3-1-logrotate核心工作机制" aria-label="Permalink to &quot;3.1 logrotate核心工作机制&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># logrotate执行流程</span></span>
<span class="line"><span class="__shiki_1t8gfj">1.</span><span class="__shiki_mdbnqw"> 读取配置文件</span><span class="__shiki_mdbnqw"> /etc/logrotate.conf</span><span class="__shiki_mdbnqw"> 和</span><span class="__shiki_mdbnqw"> /etc/logrotate.d/</span><span class="__shiki_dzsirb">*</span></span>
<span class="line"><span class="__shiki_1t8gfj">2.</span><span class="__shiki_mdbnqw"> 检查日志文件大小或时间条件</span></span>
<span class="line"><span class="__shiki_1t8gfj">3.</span><span class="__shiki_mdbnqw"> 执行预定义操作（重命名、压缩、创建新文件）</span></span>
<span class="line"><span class="__shiki_1t8gfj">4.</span><span class="__shiki_mdbnqw"> 发送信号通知应用程序重新打开日志文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">5.</span><span class="__shiki_mdbnqw"> 清理超过保留策略的旧日志</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看logrotate状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> cat</span><span class="__shiki_mdbnqw"> /var/lib/logrotate/status</span></span></code></pre></div><h3 id="_3-2-完整node-js应用配置模板" tabindex="-1">3.2 完整Node.js应用配置模板 <a class="header-anchor" href="#_3-2-完整node-js应用配置模板" aria-label="Permalink to &quot;3.2 完整Node.js应用配置模板&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/logrotate.d/nodejs-app</span></span>
<span class="line"><span class="__shiki_21nrsd"># Node.js应用生产环境日志切割配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/nodejs/app/*.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基础配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span><span class="__shiki_21nrsd">                      # 按天切割</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingok</span><span class="__shiki_21nrsd">                  # 日志文件不存在时不报错</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifempty</span><span class="__shiki_21nrsd">                 # 空日志文件不切割</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_21nrsd">                  # 保留30份历史日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span><span class="__shiki_21nrsd">                   # 压缩历史日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">    delaycompress</span><span class="__shiki_21nrsd">              # 延迟一天压缩</span></span>
<span class="line"><span class="__shiki_1t8gfj">    dateext</span><span class="__shiki_21nrsd">                    # 使用日期作为后缀</span></span>
<span class="line"><span class="__shiki_1t8gfj">    dateformat</span><span class="__shiki_dzsirb"> -%Y%m%d</span><span class="__shiki_21nrsd">         # 日期格式：-20231101</span></span>
<span class="line"><span class="__shiki_1t8gfj">    create</span><span class="__shiki_dzsirb"> 644</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_21nrsd">   # 创建新文件的权限和属主</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 切割后执行脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 发送信号给Node.js应用重新打开日志文件</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 方式1：通过PID文件（如果应用支持）</span></span>
<span class="line"><span class="__shiki_140thh">        [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_140thh"> /var/run/nodejs-app.pid ] &amp;&amp; </span><span class="__shiki_dzsirb">kill</span><span class="__shiki_dzsirb"> -USR1</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /var/run/nodejs-app.pid</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 方式2：通过进程名（需要pkill）</span></span>
<span class="line"><span class="__shiki_21nrsd">        # pkill -HUP -f &quot;node /var/www/app/server.js&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 方式3：对于PM2管理的应用</span></span>
<span class="line"><span class="__shiki_21nrsd">        # pm2 reload app-name --update-env</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 方式4：对于Cluster模式多进程</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取所有工作进程PID并发送信号</span></span>
<span class="line"><span class="__shiki_21nrsd">        # for pid in $(pgrep -f &quot;cluster-worker&quot;); do</span></span>
<span class="line"><span class="__shiki_21nrsd">        #     kill -USR1 $pid 2&gt;/dev/null || true</span></span>
<span class="line"><span class="__shiki_21nrsd">        # done</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录日志切割操作</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">): Rotated Node.js app logs&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /var/log/logrotate.log</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 高级配置选项</span></span>
<span class="line"><span class="__shiki_1t8gfj">    size</span><span class="__shiki_mdbnqw"> 100M</span><span class="__shiki_21nrsd">                  # 文件达到100M也切割（与daily组合）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    maxage</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_21nrsd">                  # 删除超过60天的日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sharedscripts</span><span class="__shiki_21nrsd">              # 所有日志文件处理完后执行一次脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">    copytruncate</span><span class="__shiki_21nrsd">               # 替代create，复制后清空（兼容性更好）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 监控与告警</span></span>
<span class="line"><span class="__shiki_1t8gfj">    prerotate</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 切割前检查磁盘空间</span></span>
<span class="line"><span class="__shiki_140thh">        DISK_USAGE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">df</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> /var/log</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;NR==2 {print $5}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sed</span><span class="__shiki_mdbnqw"> &#39;s/%//&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ $DISK_USAGE </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;警告：磁盘使用率超过90%&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;磁盘告警&quot;</span><span class="__shiki_mdbnqw"> admin@example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 针对不同类型的日志文件配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/nodejs/app/access.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 7</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    delaycompress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    size</span><span class="__shiki_mdbnqw"> 50M</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 特定于access.log的处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">        pm2</span><span class="__shiki_mdbnqw"> reload</span><span class="__shiki_mdbnqw"> app-name</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/nodejs/app/error.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_21nrsd">                  # 错误日志保留更久</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingok</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifempty</span></span>
<span class="line"><span class="__shiki_1t8gfj">    create</span><span class="__shiki_dzsirb"> 640</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_mdbnqw"> deploy</span><span class="__shiki_21nrsd">   # 错误日志权限更严格</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 错误日志切割后可能需要特殊处理</span></span>
<span class="line"><span class="__shiki_140thh">        [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_140thh"> /var/run/nodejs-app.pid ] &amp;&amp; </span><span class="__shiki_dzsirb">kill</span><span class="__shiki_dzsirb"> -USR2</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /var/run/nodejs-app.pid</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 开发环境差异配置（可放置在应用目录）</span></span>
<span class="line"><span class="__shiki_21nrsd"># ~/app/logrotate-dev.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/nodejs/dev/*.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 7</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingok</span></span>
<span class="line"><span class="__shiki_1t8gfj">    size</span><span class="__shiki_mdbnqw"> 10M</span></span>
<span class="line"><span class="__shiki_1t8gfj">    copytruncate</span><span class="__shiki_21nrsd">              # 开发环境使用更兼容的方案</span></span>
<span class="line"><span class="__shiki_1t8gfj">    nocreate</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-高级配置技巧" tabindex="-1">3.3 高级配置技巧 <a class="header-anchor" href="#_3-3-高级配置技巧" aria-label="Permalink to &quot;3.3 高级配置技巧&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 测试logrotate配置（不实际执行）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> logrotate</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> /etc/logrotate.d/nodejs-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 强制立即执行切割</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> logrotate</span><span class="__shiki_dzsirb"> -vf</span><span class="__shiki_mdbnqw"> /etc/logrotate.d/nodejs-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 调试模式查看详细执行过程</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> logrotate</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> /etc/logrotate.d/nodejs-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 自定义状态文件位置（多应用隔离）</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> logrotate</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> /var/lib/logrotate/nodejs-app.status</span><span class="__shiki_mdbnqw"> /etc/logrotate.d/nodejs-app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 多实例应用日志切割（使用通配符）</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/nodejs/apps/app-*.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sharedscripts</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 查找所有相关进程并发送信号</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> pidfile </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> /var/run/nodejs-app-*.pid</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">            [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$pidfile</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ] &amp;&amp; </span><span class="__shiki_dzsirb">kill</span><span class="__shiki_dzsirb"> -USR1</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$pidfile</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        done</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 基于日志内容的高级切割规则</span></span>
<span class="line"><span class="__shiki_1t8gfj">/var/log/nodejs/app/transaction.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 当日志包含特定标记时切割</span></span>
<span class="line"><span class="__shiki_1t8gfj">    prerotate</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> tail</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;END_OF_BATCH&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;检测到批次结束标记，执行切割&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;未检测到标记，跳过切割&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-监控与告警集成" tabindex="-1">3.4 监控与告警集成 <a class="header-anchor" href="#_3-4-监控与告警集成" aria-label="Permalink to &quot;3.4 监控与告警集成&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># logrotate监控脚本：/usr/local/bin/monitor-logrotate.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 监控logrotate执行状态</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">LOG_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/logrotate-monitor.log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">STATUS_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/lib/logrotate/status&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ALERT_EMAIL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;admin@example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ALERT_THRESHOLD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">90</span><span class="__shiki_21nrsd"> # 磁盘使用率告警阈值%</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 记录监控开始</span></span>
<span class="line"><span class="__shiki_1t8gfj">log_message</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;[$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> &#39;+%Y-%m-%d %H:%M:%S&#39;)] </span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$LOG_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查磁盘空间</span></span>
<span class="line"><span class="__shiki_1t8gfj">check_disk_space</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> usage</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">df</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> /var/log</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;NR==2 {print $5}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> sed</span><span class="__shiki_mdbnqw"> &#39;s/%//&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$usage</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> -ge</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ALERT_THRESHOLD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        log_message</span><span class="__shiki_mdbnqw"> &quot;告警：日志分区使用率 </span><span class="__shiki_140thh">$usage</span><span class="__shiki_mdbnqw">%&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;日志分区使用率已达 </span><span class="__shiki_140thh">$usage</span><span class="__shiki_mdbnqw">%，建议立即清理&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;日志磁盘空间告警&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ALERT_EMAIL</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    log_message</span><span class="__shiki_mdbnqw"> &quot;磁盘空间正常：</span><span class="__shiki_140thh">$usage</span><span class="__shiki_mdbnqw">%&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查logrotate最近执行时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">check_last_run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> last_run</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;^/var/log/nodejs/&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">        head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-z</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$last_run</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        log_message</span><span class="__shiki_mdbnqw"> &quot;警告：未找到logrotate执行记录&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> last_run_ts</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$last_run</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> +%s</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> now_ts</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%s</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> diff_hours</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(( (</span><span class="__shiki_1t8gfj">now_ts</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> last_run_ts</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">/</span><span class="__shiki_dzsirb"> 3600</span><span class="__shiki_140thh"> ))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$diff_hours</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> -gt</span><span class="__shiki_dzsirb"> 48</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        log_message</span><span class="__shiki_mdbnqw"> &quot;告警：logrotate已 </span><span class="__shiki_140thh">$diff_hours</span><span class="__shiki_mdbnqw"> 小时未执行&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;logrotate长时间未执行，请检查配置&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;logrotate执行异常&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ALERT_EMAIL</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    log_message</span><span class="__shiki_mdbnqw"> &quot;logrotate最近执行：</span><span class="__shiki_140thh">$last_run</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_140thh">$diff_hours</span><span class="__shiki_mdbnqw"> 小时前)&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查日志文件大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">check_log_sizes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> large_logs</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_mdbnqw"> /var/log/nodejs/</span><span class="__shiki_dzsirb"> -name</span><span class="__shiki_mdbnqw"> &quot;*.log&quot;</span><span class="__shiki_dzsirb"> -size</span><span class="__shiki_mdbnqw"> +1G</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-n</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$large_logs</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        log_message</span><span class="__shiki_mdbnqw"> &quot;发现大日志文件：&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$large_logs</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> log</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">du</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$log</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> cut</span><span class="__shiki_dzsirb"> -f1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            log_message</span><span class="__shiki_mdbnqw"> &quot;  </span><span class="__shiki_140thh">$log</span><span class="__shiki_mdbnqw"> - </span><span class="__shiki_140thh">$size</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        done</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;发现超过1G的日志文件，建议检查切割配置&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            mail</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;大日志文件告警&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ALERT_EMAIL</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主监控逻辑</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    log_message</span><span class="__shiki_mdbnqw"> &quot;开始日志系统监控检查&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> checks_passed</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> total_checks</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    check_disk_space</span><span class="__shiki_140thh"> &amp;&amp; ((checks_passed</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1t8gfj">    check_last_run</span><span class="__shiki_140thh"> &amp;&amp; ((checks_passed</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1t8gfj">    check_log_sizes</span><span class="__shiki_140thh"> &amp;&amp; ((checks_passed</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    log_message</span><span class="__shiki_mdbnqw"> &quot;监控检查完成：</span><span class="__shiki_140thh">$checks_passed</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$total_checks</span><span class="__shiki_mdbnqw"> 项通过&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$checks_passed</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> -lt</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$total_checks</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span></span>
<span class="line"><span class="__shiki_dzsirb">exit</span><span class="__shiki_dzsirb"> $?</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 添加到cron定时任务</span></span>
<span class="line"><span class="__shiki_21nrsd"># crontab -e 添加以下行：</span></span>
<span class="line"><span class="__shiki_21nrsd"># 0 * * * * /usr/local/bin/monitor-logrotate.sh</span></span></code></pre></div><h2 id="四、pm2内置日志管理方案" tabindex="-1">四、PM2内置日志管理方案 <a class="header-anchor" href="#四、pm2内置日志管理方案" aria-label="Permalink to &quot;四、PM2内置日志管理方案&quot;">​</a></h2><h3 id="_4-1-pm2日志系统架构" tabindex="-1">4.1 PM2日志系统架构 <a class="header-anchor" href="#_4-1-pm2日志系统架构" aria-label="Permalink to &quot;4.1 PM2日志系统架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">PM2日志架构：</span></span>
<span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│              PM2 Daemon                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  App 1  │  │  App 2  │  │  App 3  │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  stdout │  │  stdout │  │  stdout │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  stderr │  │  stderr │  │  stderr │ │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─────────┘  └─────────┘  └─────────┘ │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│           Log Management                │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  • 自动切割 (log-rotate)               │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  • 压缩归档                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  • 时间戳添加                          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│  • 多进程日志分离                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_4-2-完整pm2日志配置" tabindex="-1">4.2 完整PM2日志配置 <a class="header-anchor" href="#_4-2-完整pm2日志配置" aria-label="Permalink to &quot;4.2 完整PM2日志配置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ecosystem.config.js - 生产环境完整日志配置</span></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  apps: [{</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_mdbnqw">&#39;api-server&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    script: </span><span class="__shiki_mdbnqw">&#39;./server.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基础日志配置</span></span>
<span class="line"><span class="__shiki_140thh">    log_date_format: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD HH:mm:ss Z&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    merge_logs: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// Cluster模式时建议false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 文件输出配置</span></span>
<span class="line"><span class="__shiki_140thh">    output: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/api-server-out.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    error: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/api-server-error.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // PM2日志切割配置 (log-rotate模块)</span></span>
<span class="line"><span class="__shiki_140thh">    log_rotate: {</span></span>
<span class="line"><span class="__shiki_140thh">      max_size: </span><span class="__shiki_mdbnqw">&#39;10M&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 单个文件最大10MB</span></span>
<span class="line"><span class="__shiki_140thh">      retain: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,                </span><span class="__shiki_21nrsd">// 保留30个历史文件</span></span>
<span class="line"><span class="__shiki_140thh">      compress: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 压缩历史日志</span></span>
<span class="line"><span class="__shiki_140thh">      dateFormat: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 日期格式</span></span>
<span class="line"><span class="__shiki_140thh">      workerInterval: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 检查间隔(秒)</span></span>
<span class="line"><span class="__shiki_140thh">      rotateInterval: </span><span class="__shiki_mdbnqw">&#39;0 0 * * *&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 定时切割(cron格式)</span></span>
<span class="line"><span class="__shiki_140thh">      rotateModule: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">         // 使用内置rotate模块</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 高级日志配置</span></span>
<span class="line"><span class="__shiki_140thh">    instance_var: </span><span class="__shiki_mdbnqw">&#39;INSTANCE_ID&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// Cluster实例标识</span></span>
<span class="line"><span class="__shiki_140thh">    vizion: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">// 禁用版本控制以减少日志</span></span>
<span class="line"><span class="__shiki_140thh">    autorestart: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_memory_restart: </span><span class="__shiki_mdbnqw">&#39;1G&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 环境特定配置</span></span>
<span class="line"><span class="__shiki_140thh">    env: {</span></span>
<span class="line"><span class="__shiki_140thh">      NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;development&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_LEVEL: </span><span class="__shiki_mdbnqw">&#39;debug&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_TYPE: </span><span class="__shiki_mdbnqw">&#39;json&#39;</span><span class="__shiki_21nrsd">  // 结构化日志</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    env_production: {</span></span>
<span class="line"><span class="__shiki_140thh">      NODE_ENV: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_LEVEL: </span><span class="__shiki_mdbnqw">&#39;warn&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_TYPE: </span><span class="__shiki_mdbnqw">&#39;json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 生产环境日志目录</span></span>
<span class="line"><span class="__shiki_140thh">      output: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/prod/api-server-out.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      error: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/prod/api-server-error.log&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 部署配置中的日志设置</span></span>
<span class="line"><span class="__shiki_140thh">  deploy: {</span></span>
<span class="line"><span class="__shiki_140thh">    production: {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // ... 其他部署配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;post-deploy&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;npm install &amp;&amp; pm2 reload ecosystem.config.js --env production&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      env: {</span></span>
<span class="line"><span class="__shiki_140thh">        LOG_PATH: </span><span class="__shiki_mdbnqw">&#39;/var/log/pm2/prod&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_4-3-pm2日志操作命令全集" tabindex="-1">4.3 PM2日志操作命令全集 <a class="header-anchor" href="#_4-3-pm2日志操作命令全集" aria-label="Permalink to &quot;4.3 PM2日志操作命令全集&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 基础日志查看</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_21nrsd">                          # 查看所有应用实时日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_21nrsd">               # 查看特定应用日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_dzsirb"> --lines</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd">   # 查看最近100行</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_dzsirb"> --err</span><span class="__shiki_21nrsd">         # 只查看错误日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_dzsirb"> --out</span><span class="__shiki_21nrsd">         # 只查看标准输出</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_dzsirb"> --timestamp</span><span class="__shiki_21nrsd">   # 显示时间戳</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 日志文件操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> flush</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_21nrsd">              # 清空内存中的日志缓冲</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> flush</span><span class="__shiki_21nrsd">                         # 清空所有应用日志缓冲</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> reloadLogs</span><span class="__shiki_21nrsd">                    # 重新加载日志配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logrotate</span><span class="__shiki_21nrsd">                     # 手动触发日志切割</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 日志文件管理</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查看日志文件位置</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> show</span><span class="__shiki_mdbnqw"> api-server</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A5</span><span class="__shiki_mdbnqw"> &quot;logs path&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份当前日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> /root/.pm2/logs/api-server-out.log</span><span class="__shiki_mdbnqw"> /backup/api-</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 监控与统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> monit</span><span class="__shiki_21nrsd">                         # 实时监控（包含日志预览）</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> report</span><span class="__shiki_21nrsd">                        # 生成诊断报告</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 日志格式与过滤</span></span>
<span class="line"><span class="__shiki_21nrsd"># JSON格式日志美化查看</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> --json</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> jq</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 过滤包含特定关键字的日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;ERROR|error&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 多实例日志分离（Cluster模式）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 每个实例独立日志文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> start</span><span class="__shiki_mdbnqw"> app.js</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> max</span><span class="__shiki_dzsirb"> --log</span><span class="__shiki_mdbnqw"> &quot;/var/log/pm2/app-</span><span class="__shiki_140thh">$CI</span><span class="__shiki_mdbnqw">.log&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 日志轮转状态检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> l</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查日志文件大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">ls</span><span class="__shiki_dzsirb"> -lh</span><span class="__shiki_mdbnqw"> ~/.pm2/logs/</span></span></code></pre></div><h3 id="_4-4-pm2日志模块高级配置" tabindex="-1">4.4 PM2日志模块高级配置 <a class="header-anchor" href="#_4-4-pm2日志模块高级配置" aria-label="Permalink to &quot;4.4 PM2日志模块高级配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 独立配置PM2的log-rotate模块</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 安装log-rotate模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pm2-logrotate</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 配置log-rotate参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:max_size</span><span class="__shiki_mdbnqw"> 10M</span><span class="__shiki_21nrsd">    # 单个文件最大10M</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:retain</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_21nrsd">       # 保留30个备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:compress</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_21nrsd">   # 压缩备份</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:dateFormat</span><span class="__shiki_mdbnqw"> YYYY-MM-DD_HH-mm</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:rotateInterval</span><span class="__shiki_mdbnqw"> &#39;0 0 * * *&#39;</span><span class="__shiki_21nrsd">  # 每天午夜</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:rotateModule</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:workerInterval</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 查看当前配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> conf</span><span class="__shiki_mdbnqw"> pm2-logrotate</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 手动触发日志轮转</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> trigger</span><span class="__shiki_mdbnqw"> pm2-logrotate</span><span class="__shiki_mdbnqw"> rotate</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 禁用log-rotate模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:max_size</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 自定义轮转脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">pm2</span><span class="__shiki_mdbnqw"> set</span><span class="__shiki_mdbnqw"> pm2-logrotate:postrotate</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 轮转后执行的脚本</span></span>
<span class="line"><span class="__shiki_mdbnqw">  echo &#39;Logs rotated at $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&#39; &gt;&gt; /var/log/pm2-rotate.log</span></span>
<span class="line"><span class="__shiki_mdbnqw">  # 发送通知</span></span>
<span class="line"><span class="__shiki_mdbnqw">  curl -X POST https://hooks.slack.com/... </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    -d &#39;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">text</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">Logs rotated successfully</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 结合logrotate的混合方案</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在/etc/logrotate.d/pm2中添加：</span></span>
<span class="line"><span class="__shiki_1t8gfj">/home/deploy/.pm2/logs/*.log</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    daily</span></span>
<span class="line"><span class="__shiki_1t8gfj">    missingok</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rotate</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1t8gfj">    compress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    delaycompress</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifempty</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sharedscripts</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postrotate</span></span>
<span class="line"><span class="__shiki_1t8gfj">        pm2</span><span class="__shiki_mdbnqw"> reloadLogs</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1t8gfj">    endscript</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、node-js应用层日志切割方案" tabindex="-1">五、Node.js应用层日志切割方案 <a class="header-anchor" href="#五、node-js应用层日志切割方案" aria-label="Permalink to &quot;五、Node.js应用层日志切割方案&quot;">​</a></h2><h3 id="_5-1-winston-dailyrotatefile完整配置" tabindex="-1">5.1 Winston + DailyRotateFile完整配置 <a class="header-anchor" href="#_5-1-winston-dailyrotatefile完整配置" aria-label="Permalink to &quot;5.1 Winston + DailyRotateFile完整配置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// utils/logger.js - 生产级Winston日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> winston</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;winston&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> DailyRotateFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;winston-daily-rotate-file&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;path&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 确保日志目录存在</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> logDir</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">LOG_DIR</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;/var/log/nodejs/app&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">fs.</span><span class="__shiki_1t8gfj">existsSync</span><span class="__shiki_140thh">(logDir)) {</span></span>
<span class="line"><span class="__shiki_140thh">  fs.</span><span class="__shiki_1t8gfj">mkdirSync</span><span class="__shiki_140thh">(logDir, { recursive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> customFormat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> winston.format.</span><span class="__shiki_1t8gfj">combine</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  winston.format.</span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    format: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD HH:mm:ss.SSS&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  }),</span></span>
<span class="line"><span class="__shiki_140thh">  winston.format.</span><span class="__shiki_1t8gfj">errors</span><span class="__shiki_140thh">({ stack: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">  winston.format.</span><span class="__shiki_1t8gfj">splat</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">  winston.format.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">(), </span><span class="__shiki_21nrsd">// 生产环境使用JSON</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 或者使用可读格式（开发环境）</span></span>
<span class="line"><span class="__shiki_21nrsd">  // winston.format.printf(({ timestamp, level, message, ...meta }) =&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">  //   return \`\${timestamp} [\${level.toUpperCase()}] \${message} \${</span></span>
<span class="line"><span class="__shiki_21nrsd">  //     Object.keys(meta).length ? JSON.stringify(meta) : &#39;&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">  //   }\`;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // })</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 日志级别配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> levels</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  error: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  warn: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  info: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  http: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  verbose: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  debug: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  silly: </span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建主logger实例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> logger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> winston.</span><span class="__shiki_1t8gfj">createLogger</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  level: process.env.</span><span class="__shiki_dzsirb">LOG_LEVEL</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;info&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  levels,</span></span>
<span class="line"><span class="__shiki_140thh">  format: customFormat,</span></span>
<span class="line"><span class="__shiki_140thh">  defaultMeta: {</span></span>
<span class="line"><span class="__shiki_140thh">    service: process.env.</span><span class="__shiki_dzsirb">SERVICE_NAME</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;nodejs-app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    hostname: </span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;os&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">hostname</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    pid: process.pid,</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Cluster模式添加实例ID</span></span>
<span class="line"><span class="__shiki_140thh">    instanceId: process.env.</span><span class="__shiki_dzsirb">NODE_APP_INSTANCE</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  transports: [</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 控制台输出（开发环境）</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_140thh"> winston.transports.</span><span class="__shiki_1t8gfj">Console</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      format: winston.format.</span><span class="__shiki_1t8gfj">combine</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        winston.format.</span><span class="__shiki_1t8gfj">colorize</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        winston.format.</span><span class="__shiki_1t8gfj">simple</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      ),</span></span>
<span class="line"><span class="__shiki_140thh">      silent: process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_21nrsd"> // 生产环境关闭控制台</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按天轮转的错误日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> DailyRotateFile</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      level: </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filename: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;error-%DATE%.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      zippedArchive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 自动压缩</span></span>
<span class="line"><span class="__shiki_140thh">      maxSize: </span><span class="__shiki_mdbnqw">&#39;20m&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 单个文件最大20MB</span></span>
<span class="line"><span class="__shiki_140thh">      maxFiles: </span><span class="__shiki_mdbnqw">&#39;90d&#39;</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 保留90天</span></span>
<span class="line"><span class="__shiki_140thh">      format: customFormat,</span></span>
<span class="line"><span class="__shiki_140thh">      auditFile: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;.audit-error.json&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      createSymlink: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      symlinkName: </span><span class="__shiki_mdbnqw">&#39;error-current.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      tailable: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按天轮转的通用日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> DailyRotateFile</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;combined&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filename: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;combined-%DATE%.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      zippedArchive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxSize: </span><span class="__shiki_mdbnqw">&#39;50m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxFiles: </span><span class="__shiki_mdbnqw">&#39;30d&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      format: customFormat,</span></span>
<span class="line"><span class="__shiki_140thh">      auditFile: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;.audit-combined.json&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      createSymlink: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      symlinkName: </span><span class="__shiki_mdbnqw">&#39;combined-current.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      tailable: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // HTTP访问日志（单独文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> DailyRotateFile</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;http&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      level: </span><span class="__shiki_mdbnqw">&#39;http&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filename: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;access-%DATE%.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      zippedArchive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxSize: </span><span class="__shiki_mdbnqw">&#39;100m&#39;</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 访问日志可能较大</span></span>
<span class="line"><span class="__shiki_140thh">      maxFiles: </span><span class="__shiki_mdbnqw">&#39;7d&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 只保留7天</span></span>
<span class="line"><span class="__shiki_140thh">      format: winston.format.</span><span class="__shiki_1t8gfj">combine</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        winston.format.</span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        winston.format.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      ),</span></span>
<span class="line"><span class="__shiki_140thh">      auditFile: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;.audit-access.json&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 审计/安全日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> DailyRotateFile</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;audit&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      level: </span><span class="__shiki_mdbnqw">&#39;info&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      filename: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;audit-%DATE%.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      zippedArchive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxSize: </span><span class="__shiki_mdbnqw">&#39;10m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxFiles: </span><span class="__shiki_mdbnqw">&#39;365d&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 审计日志保留1年</span></span>
<span class="line"><span class="__shiki_140thh">      format: winston.format.</span><span class="__shiki_1t8gfj">combine</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        winston.format.</span><span class="__shiki_1t8gfj">timestamp</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        winston.format.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      ),</span></span>
<span class="line"><span class="__shiki_1t8gfj">      filter</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">info</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> info.message.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;AUDIT:&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 异常处理</span></span>
<span class="line"><span class="__shiki_140thh">  exceptionHandlers: [</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> DailyRotateFile</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      filename: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;exceptions-%DATE%.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      zippedArchive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxSize: </span><span class="__shiki_mdbnqw">&#39;20m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxFiles: </span><span class="__shiki_mdbnqw">&#39;90d&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 未处理Promise拒绝</span></span>
<span class="line"><span class="__shiki_140thh">  rejectionHandlers: [</span></span>
<span class="line"><span class="__shiki_1itgoe">    new</span><span class="__shiki_1t8gfj"> DailyRotateFile</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      filename: path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(logDir, </span><span class="__shiki_mdbnqw">&#39;rejections-%DATE%.log&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      zippedArchive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxSize: </span><span class="__shiki_mdbnqw">&#39;20m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxFiles: </span><span class="__shiki_mdbnqw">&#39;90d&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 退出时刷新所有日志</span></span>
<span class="line"><span class="__shiki_140thh">  exitOnError: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 日志流（用于Morgan等中间件）</span></span>
<span class="line"><span class="__shiki_140thh">logger.stream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  write</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">(message.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义日志方法</span></span>
<span class="line"><span class="__shiki_140thh">logger.</span><span class="__shiki_1t8gfj">audit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">details</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`AUDIT: \${</span><span class="__shiki_140thh">action</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    action,</span></span>
<span class="line"><span class="__shiki_140thh">    userId,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">details,</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    ip: </span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;request-ip&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">getClientIp</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.req)</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 性能日志</span></span>
<span class="line"><span class="__shiki_140thh">logger.</span><span class="__shiki_1t8gfj">performance</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">operation</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">duration</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">meta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`PERF: \${</span><span class="__shiki_140thh">operation</span><span class="__shiki_mdbnqw">} took \${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&#39;performance&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    operation,</span></span>
<span class="line"><span class="__shiki_140thh">    duration,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">meta</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 业务日志辅助方法</span></span>
<span class="line"><span class="__shiki_140thh">logger.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">txId</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">meta</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`TX: \${</span><span class="__shiki_140thh">action</span><span class="__shiki_mdbnqw">} - \${</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&#39;transaction&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    transactionId: txId,</span></span>
<span class="line"><span class="__shiki_140thh">    action,</span></span>
<span class="line"><span class="__shiki_140thh">    status,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">meta</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> logger;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_21nrsd">// const logger = require(&#39;./utils/logger&#39;);</span></span>
<span class="line"><span class="__shiki_21nrsd">// </span></span>
<span class="line"><span class="__shiki_21nrsd">// logger.info(&#39;系统启动&#39;, { port: 3000, env: process.env.NODE_ENV });</span></span>
<span class="line"><span class="__shiki_21nrsd">// logger.error(&#39;数据库连接失败&#39;, { error: err.message, stack: err.stack });</span></span>
<span class="line"><span class="__shiki_21nrsd">// logger.audit(&#39;LOGIN&#39;, user.id, { success: true });</span></span>
<span class="line"><span class="__shiki_21nrsd">// logger.performance(&#39;DB_QUERY&#39;, 150, { query: &#39;SELECT * FROM users&#39; });</span></span></code></pre></div><h3 id="_5-2-日志中间件集成" tabindex="-1">5.2 日志中间件集成 <a class="header-anchor" href="#_5-2-日志中间件集成" aria-label="Permalink to &quot;5.2 日志中间件集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// middleware/logging.js - Express日志中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> morgan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;morgan&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> uuid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;uuid&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> logger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;../utils/logger&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 请求ID中间件（用于追踪）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> requestId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  req.id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> req.headers[</span><span class="__shiki_mdbnqw">&#39;x-request-id&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> uuid.</span><span class="__shiki_1t8gfj">v4</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">setHeader</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;X-Request-ID&#39;</span><span class="__shiki_140thh">, req.id);</span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义Morgan token</span></span>
<span class="line"><span class="__shiki_140thh">morgan.</span><span class="__shiki_1t8gfj">token</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> req.id);</span></span>
<span class="line"><span class="__shiki_140thh">morgan.</span><span class="__shiki_1t8gfj">token</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> req.user </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> req.user.id </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;anonymous&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">morgan.</span><span class="__shiki_1t8gfj">token</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;body&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 安全地记录请求体（排除密码等敏感信息）</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> safeBody</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { </span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">req.body };</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;token&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;creditCard&#39;</span><span class="__shiki_140thh">].</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">field</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (safeBody[field]) safeBody[field] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;***REDACTED***&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_dzsirb"> JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(safeBody);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 生产环境访问日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> productionFormat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;:remote-addr - :user [:date[iso]] &quot;:method :url HTTP/:http-version&quot; :status :res[content-length] &quot;:referrer&quot; &quot;:user-agent&quot; :response-time ms :id&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 开发环境格式（更详细）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> developmentFormat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;:method :url :status :response-time ms - :res[content-length]&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Morgan中间件配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> accessLogMiddleware</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">app</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (process.env.</span><span class="__shiki_dzsirb">NODE_ENV</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">morgan</span><span class="__shiki_140thh">(productionFormat, {</span></span>
<span class="line"><span class="__shiki_140thh">      stream: logger.stream,</span></span>
<span class="line"><span class="__shiki_1t8gfj">      skip</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 跳过健康检查等噪声请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> req.path </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;/health&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> req.path </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;/favicon.ico&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    app.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">morgan</span><span class="__shiki_140thh">(developmentFormat, {</span></span>
<span class="line"><span class="__shiki_140thh">      stream: process.stdout</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 请求日志中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> requestLogger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> start</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录请求开始</span></span>
<span class="line"><span class="__shiki_140thh">  logger.</span><span class="__shiki_1t8gfj">debug</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;请求开始&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    requestId: req.id,</span></span>
<span class="line"><span class="__shiki_140thh">    method: req.method,</span></span>
<span class="line"><span class="__shiki_140thh">    url: req.url,</span></span>
<span class="line"><span class="__shiki_140thh">    ip: req.ip,</span></span>
<span class="line"><span class="__shiki_140thh">    userAgent: req.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;user-agent&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 响应完成时记录</span></span>
<span class="line"><span class="__shiki_140thh">  res.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;finish&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;请求完成&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      requestId: req.id,</span></span>
<span class="line"><span class="__shiki_140thh">      method: req.method,</span></span>
<span class="line"><span class="__shiki_140thh">      url: req.url,</span></span>
<span class="line"><span class="__shiki_140thh">      status: res.statusCode,</span></span>
<span class="line"><span class="__shiki_140thh">      duration,</span></span>
<span class="line"><span class="__shiki_140thh">      contentLength: res.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;content-length&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      user: req.user </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> req.user.id </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;anonymous&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 慢请求警告</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      logger.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;慢请求&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        requestId: req.id,</span></span>
<span class="line"><span class="__shiki_140thh">        url: req.url,</span></span>
<span class="line"><span class="__shiki_140thh">        duration,</span></span>
<span class="line"><span class="__shiki_140thh">        threshold: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 错误请求特殊处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (res.statusCode </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;请求错误&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        requestId: req.id,</span></span>
<span class="line"><span class="__shiki_140thh">        status: res.statusCode,</span></span>
<span class="line"><span class="__shiki_140thh">        url: req.url,</span></span>
<span class="line"><span class="__shiki_140thh">        duration</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 错误日志中间件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1t8gfj"> errorLogger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">res</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">next</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;未处理异常&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    requestId: req.id,</span></span>
<span class="line"><span class="__shiki_140thh">    error: err.message,</span></span>
<span class="line"><span class="__shiki_140thh">    stack: err.stack,</span></span>
<span class="line"><span class="__shiki_140thh">    url: req.url,</span></span>
<span class="line"><span class="__shiki_140thh">    method: req.method,</span></span>
<span class="line"><span class="__shiki_140thh">    ip: req.ip,</span></span>
<span class="line"><span class="__shiki_140thh">    user: req.user </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> req.user.id </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;anonymous&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  next</span><span class="__shiki_140thh">(err);</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  requestId,</span></span>
<span class="line"><span class="__shiki_140thh">  accessLogMiddleware,</span></span>
<span class="line"><span class="__shiki_140thh">  requestLogger,</span></span>
<span class="line"><span class="__shiki_140thh">  errorLogger</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// app.js中使用</span></span>
<span class="line"><span class="__shiki_21nrsd">// const { requestId, accessLogMiddleware, requestLogger, errorLogger } = require(&#39;./middleware/logging&#39;);</span></span>
<span class="line"><span class="__shiki_21nrsd">// </span></span>
<span class="line"><span class="__shiki_21nrsd">// app.use(requestId);</span></span>
<span class="line"><span class="__shiki_21nrsd">// app.use(requestLogger);</span></span>
<span class="line"><span class="__shiki_21nrsd">// accessLogMiddleware(app);</span></span>
<span class="line"><span class="__shiki_21nrsd">//</span><span class="__shiki_21nrsd"> // ... 其他中间件和路由</span></span>
<span class="line"><span class="__shiki_21nrsd">// app.use(errorLogger);</span></span></code></pre></div><h2 id="六、多实例与分布式日志处理" tabindex="-1">六、多实例与分布式日志处理 <a class="header-anchor" href="#六、多实例与分布式日志处理" aria-label="Permalink to &quot;六、多实例与分布式日志处理&quot;">​</a></h2><h3 id="_6-1-cluster模式日志管理" tabindex="-1">6.1 Cluster模式日志管理 <a class="header-anchor" href="#_6-1-cluster模式日志管理" aria-label="Permalink to &quot;6.1 Cluster模式日志管理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// cluster-logger.js - Cluster模式专用日志配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> cluster</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cluster&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> numCPUs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;os&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">cpus</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> logger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./utils/logger&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (cluster.isMaster) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 主进程日志配置</span></span>
<span class="line"><span class="__shiki_140thh">  logger.defaultMeta.role </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;master&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`主进程 \${</span><span class="__shiki_140thh">process</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">pid</span><span class="__shiki_mdbnqw">} 启动\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(numCPUs, </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">); i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      NODE_APP_INSTANCE: i.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_DIR: </span><span class="__shiki_mdbnqw">\`/var/log/nodejs/app/worker-\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 工作进程事件监听</span></span>
<span class="line"><span class="__shiki_140thh">  cluster.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;online&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;工作进程启动&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      workerId: worker.id,</span></span>
<span class="line"><span class="__shiki_140thh">      pid: worker.process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">      instanceId: worker.env.</span><span class="__shiki_dzsirb">NODE_APP_INSTANCE</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  cluster.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;exit&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">code</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">signal</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;工作进程退出&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      workerId: worker.id,</span></span>
<span class="line"><span class="__shiki_140thh">      pid: worker.process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">      code,</span></span>
<span class="line"><span class="__shiki_140thh">      signal,</span></span>
<span class="line"><span class="__shiki_140thh">      instanceId: worker.env.</span><span class="__shiki_dzsirb">NODE_APP_INSTANCE</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动重启</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> newWorker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        NODE_APP_INSTANCE: worker.env.</span><span class="__shiki_dzsirb">NODE_APP_INSTANCE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        LOG_DIR: worker.env.</span><span class="__shiki_dzsirb">LOG_DIR</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;工作进程重启&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        oldPid: worker.process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">        newPid: newWorker.process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">        instanceId: newWorker.env.</span><span class="__shiki_dzsirb">NODE_APP_INSTANCE</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 主进程日志轮转信号处理</span></span>
<span class="line"><span class="__shiki_140thh">  process.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SIGUSR1&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;收到日志轮转信号&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 通知所有工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> id</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> cluster.workers) {</span></span>
<span class="line"><span class="__shiki_140thh">      cluster.workers[id].</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;rotateLogs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 主进程日志文件</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> masterLogger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./utils/logger&#39;</span><span class="__shiki_140thh">)({</span></span>
<span class="line"><span class="__shiki_140thh">    defaultMeta: { role: </span><span class="__shiki_mdbnqw">&#39;master&#39;</span><span class="__shiki_140thh">, pid: process.pid },</span></span>
<span class="line"><span class="__shiki_140thh">    transports: [</span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;winston-daily-rotate-file&#39;</span><span class="__shiki_140thh">))({</span></span>
<span class="line"><span class="__shiki_140thh">        filename: </span><span class="__shiki_mdbnqw">&#39;/var/log/nodejs/app/master-%DATE%.log&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxSize: </span><span class="__shiki_mdbnqw">&#39;10m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxFiles: </span><span class="__shiki_mdbnqw">&#39;30d&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 工作进程配置</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> instanceId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">NODE_APP_INSTANCE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> logDir</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.env.</span><span class="__shiki_dzsirb">LOG_DIR</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 工作进程专用logger</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> workerLogger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./utils/logger&#39;</span><span class="__shiki_140thh">)({</span></span>
<span class="line"><span class="__shiki_140thh">    defaultMeta: {</span></span>
<span class="line"><span class="__shiki_140thh">      role: </span><span class="__shiki_mdbnqw">&#39;worker&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      pid: process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">      instanceId,</span></span>
<span class="line"><span class="__shiki_140thh">      workerId: cluster.worker.id</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    transports: [</span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;winston-daily-rotate-file&#39;</span><span class="__shiki_140thh">))({</span></span>
<span class="line"><span class="__shiki_140thh">        filename: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">logDir</span><span class="__shiki_mdbnqw">}/worker-%DATE%.log\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        datePattern: </span><span class="__shiki_mdbnqw">&#39;YYYY-MM-DD&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxSize: </span><span class="__shiki_mdbnqw">&#39;10m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxFiles: </span><span class="__shiki_mdbnqw">&#39;30d&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 监听主进程消息</span></span>
<span class="line"><span class="__shiki_140thh">  process.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (msg </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;rotateLogs&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      workerLogger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;执行日志轮转&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 重新打开日志文件流</span></span>
<span class="line"><span class="__shiki_140thh">      workerLogger.transports.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">transport</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (transport.close) transport.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (transport.open) transport.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 启动应用</span></span>
<span class="line"><span class="__shiki_1t8gfj">  require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./server.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-多服务器日志聚合" tabindex="-1">6.2 多服务器日志聚合 <a class="header-anchor" href="#_6-2-多服务器日志聚合" aria-label="Permalink to &quot;6.2 多服务器日志聚合&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># log-aggregator.sh - 多服务器日志收集脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 多服务器日志聚合与集中管理</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">CONFIG_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/etc/log-aggregator.conf&quot;</span></span>
<span class="line"><span class="__shiki_140thh">LOG_SERVERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;app-server-1&quot;</span><span class="__shiki_mdbnqw"> &quot;app-server-2&quot;</span><span class="__shiki_mdbnqw"> &quot;app-server-3&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">CENTRAL_LOG_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/centralized&quot;</span></span>
<span class="line"><span class="__shiki_140thh">RETENTION_DAYS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">30</span></span>
<span class="line"><span class="__shiki_140thh">SSH_USER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;deploy&quot;</span></span>
<span class="line"><span class="__shiki_140thh">SSH_KEY</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/home/deploy/.ssh/id_rsa&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 加载配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">load_config</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CONFIG_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        source</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CONFIG_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从远程服务器收集日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">collect_logs_from_server</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> server</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> remote_log_dir</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/nodejs/app&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> local_server_dir</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$local_server_dir</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;从 </span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw"> 收集日志...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用rsync同步日志文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">    rsync</span><span class="__shiki_dzsirb"> -avz</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;ssh -i </span><span class="__shiki_140thh">$SSH_KEY</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --include=</span><span class="__shiki_mdbnqw">&quot;*.log&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --include=</span><span class="__shiki_mdbnqw">&quot;*.gz&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --exclude=</span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;</span><span class="__shiki_140thh">$SSH_USER</span><span class="__shiki_mdbnqw">@</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_140thh">$remote_log_dir</span><span class="__shiki_mdbnqw">/&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;</span><span class="__shiki_140thh">$local_server_dir</span><span class="__shiki_mdbnqw">/&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标记已收集</span></span>
<span class="line"><span class="__shiki_1t8gfj">    touch</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$local_server_dir</span><span class="__shiki_mdbnqw">/.collected_</span><span class="__shiki_140thh">$date</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 处理收集的日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">process_collected_logs</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> server</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> server_dir</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;处理 </span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw"> 的日志...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 合并同一天的日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">    find</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server_dir</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -name</span><span class="__shiki_mdbnqw"> &quot;*.log&quot;</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1itgoe"> while</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> logfile</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> filename</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">basename</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$logfile</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$filename</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -oE</span><span class="__shiki_mdbnqw"> &#39;[0-9]{4}-[0-9]{2}-[0-9]{2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-n</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$date</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> merged_file</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">/merged/</span><span class="__shiki_140thh">$date</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$filename</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> &quot;$(</span><span class="__shiki_1t8gfj">dirname</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$merged_file</span><span class="__shiki_mdbnqw">&quot;)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加服务器标识</span></span>
<span class="line"><span class="__shiki_1t8gfj">            awk</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> server=&quot;</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &#39;{print server &quot;: &quot; $0}&#39;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$logfile</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$merged_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 压缩原始文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">            gzip</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$logfile</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理旧日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">cleanup_old_logs</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;清理超过 </span><span class="__shiki_140thh">$RETENTION_DAYS</span><span class="__shiki_mdbnqw"> 天的日志...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理集中日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">    find</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -name</span><span class="__shiki_mdbnqw"> &quot;*.gz&quot;</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_140thh">$RETENTION_DAYS </span><span class="__shiki_dzsirb">-delete</span></span>
<span class="line"><span class="__shiki_1t8gfj">    find</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -name</span><span class="__shiki_mdbnqw"> &quot;*.log&quot;</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_dzsirb"> -mtime</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_140thh">$RETENTION_DAYS </span><span class="__shiki_dzsirb">-delete</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理空目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">    find</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> d</span><span class="__shiki_dzsirb"> -empty</span><span class="__shiki_dzsirb"> -delete</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生成报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">generate_report</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> report_file</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">/report_$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d).txt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== 日志聚合报告 $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">) ===&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$report_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$report_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> server </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">LOG_SERVERS</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> server_dir</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$CENTRAL_LOG_DIR</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-d</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server_dir</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> file_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server_dir</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> total_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">du</span><span class="__shiki_dzsirb"> -sh</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server_dir</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> cut</span><span class="__shiki_dzsirb"> -f1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;服务器: </span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$report_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  文件数: </span><span class="__shiki_140thh">$file_count</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$report_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  总大小: </span><span class="__shiki_140thh">$total_size</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$report_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$report_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 发送报告（可选）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # mail -s &quot;日志聚合报告&quot; admin@example.com &lt; &quot;$report_file&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    load_config</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;开始日志聚合: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 收集各服务器日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> server </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">LOG_SERVERS</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1t8gfj"> ping</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_dzsirb"> -W</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            collect_logs_from_server</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            process_collected_logs</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;警告: 无法连接服务器 </span><span class="__shiki_140thh">$server</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 后续处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">    cleanup_old_logs</span></span>
<span class="line"><span class="__shiki_1t8gfj">    generate_report</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;日志聚合完成: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定时任务配置（crontab）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 每天凌晨2点执行</span></span>
<span class="line"><span class="__shiki_21nrsd"># 0 2 * * * /usr/local/bin/log-aggregator.sh &gt;&gt; /var/log/log-aggregator.log 2&gt;&amp;1</span></span></code></pre></div><h2 id="七、监控、告警与维护" tabindex="-1">七、监控、告警与维护 <a class="header-anchor" href="#七、监控、告警与维护" aria-label="Permalink to &quot;七、监控、告警与维护&quot;">​</a></h2><h3 id="_7-1-日志系统健康监控" tabindex="-1">7.1 日志系统健康监控 <a class="header-anchor" href="#_7-1-日志系统健康监控" aria-label="Permalink to &quot;7.1 日志系统健康监控&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// monitor/log-monitor.js - 日志系统监控</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;path&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> logger</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;../utils/logger&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LogMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.logDir </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config.logDir </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;/var/log/nodejs/app&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.thresholds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      diskUsage: config.diskThreshold </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 85</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 磁盘使用率%</span></span>
<span class="line"><span class="__shiki_140thh">      fileSize: config.fileSizeThreshold </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 1GB</span></span>
<span class="line"><span class="__shiki_140thh">      errorRate: config.errorRateThreshold </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 5%</span></span>
<span class="line"><span class="__shiki_140thh">      growthRate: config.growthThreshold </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd"> // 100MB/小时</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metricsHistory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxHistorySize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1440</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 24小时（每分钟记录一次）</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 监控磁盘使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkDiskUsage</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> diskusage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;diskusage&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">free</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">total</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> diskusage.</span><span class="__shiki_1t8gfj">check</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> usagePercent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ((total </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> free) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> metric</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;disk_usage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        value: </span><span class="__shiki_1t8gfj">parseFloat</span><span class="__shiki_140thh">(usagePercent),</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        free: free </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// GB</span></span>
<span class="line"><span class="__shiki_140thh">        total: total </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd"> // GB</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordMetric</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (metric.value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.thresholds.diskUsage) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">triggerAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;DISK_USAGE_HIGH&#39;</span><span class="__shiki_140thh">, metric);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;磁盘使用检查失败&#39;</span><span class="__shiki_140thh">, { error: error.message });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 监控日志文件大小</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkLogFileSizes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> files</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">readdirSync</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">f</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> f.</span><span class="__shiki_1t8gfj">endsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.log&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">f</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir, f));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> largeFiles</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> file</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> files) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">statSync</span><span class="__shiki_140thh">(file);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> sizeMB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (stats.size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.thresholds.fileSize) {</span></span>
<span class="line"><span class="__shiki_140thh">          largeFiles.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            file: path.</span><span class="__shiki_1t8gfj">basename</span><span class="__shiki_140thh">(file),</span></span>
<span class="line"><span class="__shiki_140thh">            size: sizeMB.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39; MB&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            mtime: stats.mtime</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录文件增长</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordMetric</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          type: </span><span class="__shiki_mdbnqw">&#39;file_size&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          file: path.</span><span class="__shiki_1t8gfj">basename</span><span class="__shiki_140thh">(file),</span></span>
<span class="line"><span class="__shiki_140thh">          value: stats.size,</span></span>
<span class="line"><span class="__shiki_140thh">          timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;检查日志文件大小失败&#39;</span><span class="__shiki_140thh">, { file, error: error.message });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (largeFiles.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">triggerAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;LARGE_LOG_FILES&#39;</span><span class="__shiki_140thh">, { files: largeFiles });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 监控错误率</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkErrorRate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> today</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;T&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> errorLog</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir, </span><span class="__shiki_mdbnqw">\`error-\${</span><span class="__shiki_140thh">today</span><span class="__shiki_mdbnqw">}.log\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">fs.</span><span class="__shiki_1t8gfj">existsSync</span><span class="__shiki_140thh">(errorLog)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> content</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">readFileSync</span><span class="__shiki_140thh">(errorLog, </span><span class="__shiki_mdbnqw">&#39;utf8&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> lines</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> content.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">line</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> line.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 查找对应的应用日志</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> appLog</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir, </span><span class="__shiki_mdbnqw">\`combined-\${</span><span class="__shiki_140thh">today</span><span class="__shiki_mdbnqw">}.log\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      let</span><span class="__shiki_140thh"> totalLines </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (fs.</span><span class="__shiki_1t8gfj">existsSync</span><span class="__shiki_140thh">(appLog)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> appContent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">readFileSync</span><span class="__shiki_140thh">(appLog, </span><span class="__shiki_mdbnqw">&#39;utf8&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        totalLines </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> appContent.</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">line</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> line.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">()).</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> errorRate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> lines.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(totalLines, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> metric</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;error_rate&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        value: errorRate,</span></span>
<span class="line"><span class="__shiki_140thh">        errorCount: lines.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        totalCount: totalLines,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      };</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">recordMetric</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (errorRate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.thresholds.errorRate) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">triggerAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;HIGH_ERROR_RATE&#39;</span><span class="__shiki_140thh">, metric);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;错误率检查失败&#39;</span><span class="__shiki_140thh">, { error: error.message });</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 记录监控指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">  recordMetric</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metric</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metricsHistory.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保持历史数据大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metricsHistory.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxHistorySize) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.metricsHistory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.metricsHistory.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.maxHistorySize);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 持久化到文件（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> metricsFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir, </span><span class="__shiki_mdbnqw">&#39;.metrics.json&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">existsSync</span><span class="__shiki_140thh">(metricsFile) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">      JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">parse</span><span class="__shiki_140thh">(fs.</span><span class="__shiki_1t8gfj">readFileSync</span><span class="__shiki_140thh">(metricsFile, </span><span class="__shiki_mdbnqw">&#39;utf8&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    currentData.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(metric);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 只保留最近7天的数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sevenDaysAgo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> filteredData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> currentData.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(m.timestamp).</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> sevenDaysAgo</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    fs.</span><span class="__shiki_1t8gfj">writeFileSync</span><span class="__shiki_140thh">(metricsFile, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(filteredData, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 触发告警</span></span>
<span class="line"><span class="__shiki_1t8gfj">  triggerAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> alert</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      type,</span></span>
<span class="line"><span class="__shiki_140thh">      severity: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getAlertSeverity</span><span class="__shiki_140thh">(type),</span></span>
<span class="line"><span class="__shiki_140thh">      data,</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      hostname: </span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;os&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">hostname</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;日志系统告警&#39;</span><span class="__shiki_140thh">, alert);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送外部告警（根据配置）</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendExternalAlert</span><span class="__shiki_140thh">(alert);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  getAlertSeverity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> severityMap</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      DISK_USAGE_HIGH: </span><span class="__shiki_mdbnqw">&#39;CRITICAL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LARGE_LOG_FILES: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      HIGH_ERROR_RATE: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      LOG_ROTATION_FAILED: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> severityMap[type] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;LOW&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  sendExternalAlert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">alert</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送到邮件</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (process.env.</span><span class="__shiki_dzsirb">ALERT_EMAIL</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendEmailAlert</span><span class="__shiki_140thh">(alert);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送到Slack</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (process.env.</span><span class="__shiki_dzsirb">SLACK_WEBHOOK_URL</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendSlackAlert</span><span class="__shiki_140thh">(alert);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送到监控系统</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (process.env.</span><span class="__shiki_dzsirb">METRICS_ENDPOINT</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendMetricsAlert</span><span class="__shiki_140thh">(alert);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成监控报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateReport</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> report</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      summary: {</span></span>
<span class="line"><span class="__shiki_140thh">        totalMetrics: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metricsHistory.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        lastAlert: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metricsHistory</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> m.type </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> m.type.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ALERT&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      metrics: {</span></span>
<span class="line"><span class="__shiki_140thh">        disk_usage: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metricsHistory</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> m.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;disk_usage&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        error_rate: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.metricsHistory</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> m.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;error_rate&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存报告</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> reportFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.logDir, </span><span class="__shiki_mdbnqw">\`report-\${</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_mdbnqw">().</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_mdbnqw">&#39;T&#39;</span><span class="__shiki_mdbnqw">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_mdbnqw">]</span><span class="__shiki_mdbnqw">}.json\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    fs.</span><span class="__shiki_1t8gfj">writeFileSync</span><span class="__shiki_140thh">(reportFile, </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(report, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> report;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 启动监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">  start</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">interval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 默认每分钟检查一次</span></span>
<span class="line"><span class="__shiki_140thh">    logger.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;启动日志系统监控&#39;</span><span class="__shiki_140thh">, { interval });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkDiskUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkLogFileSizes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkErrorRate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 每小时生成一次报告</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getMinutes</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">generateReport</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        logger.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;监控检查失败&#39;</span><span class="__shiki_140thh">, { error: error.message });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }, interval);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> LogMonitor;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_21nrsd">// const LogMonitor = require(&#39;./monitor/log-monitor&#39;);</span></span>
<span class="line"><span class="__shiki_21nrsd">// const monitor = new LogMonitor({</span></span>
<span class="line"><span class="__shiki_21nrsd">//   logDir: &#39;/var/log/nodejs/app&#39;,</span></span>
<span class="line"><span class="__shiki_21nrsd">//   diskThreshold: 80,</span></span>
<span class="line"><span class="__shiki_21nrsd">//   fileSizeThreshold: 1024 * 1024 * 500</span><span class="__shiki_21nrsd"> // 500MB</span></span>
<span class="line"><span class="__shiki_21nrsd">// });</span></span>
<span class="line"><span class="__shiki_21nrsd">// </span></span>
<span class="line"><span class="__shiki_21nrsd">// monitor.start();</span></span></code></pre></div><h2 id="八、最佳实践总结" tabindex="-1">八、最佳实践总结 <a class="header-anchor" href="#八、最佳实践总结" aria-label="Permalink to &quot;八、最佳实践总结&quot;">​</a></h2><h3 id="_8-1-方案选择决策树" tabindex="-1">8.1 方案选择决策树 <a class="header-anchor" href="#_8-1-方案选择决策树" aria-label="Permalink to &quot;8.1 方案选择决策树&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">开始日志切割方案选择</span></span>
<span class="line"><span class="__shiki_wvjl67">         │</span></span>
<span class="line"><span class="__shiki_wvjl67">         ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">   应用使用PM2管理？</span></span>
<span class="line"><span class="__shiki_wvjl67">   ┌─────┴─────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">   │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">  是           否</span></span>
<span class="line"><span class="__shiki_wvjl67">   │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">   ▼           ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">使用PM2      需要高级特性？</span></span>
<span class="line"><span class="__shiki_wvjl67">内置方案    ┌─────┴─────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">           │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">          是           否</span></span>
<span class="line"><span class="__shiki_wvjl67">           │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">           ▼           ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">        Winston +   系统环境？</span></span>
<span class="line"><span class="__shiki_wvjl67">      DailyRotateFile┌─────┴─────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">                     │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">                 Docker环境    裸机/VM</span></span>
<span class="line"><span class="__shiki_wvjl67">                     │           │</span></span>
<span class="line"><span class="__shiki_wvjl67">                     ▼           ▼</span></span>
<span class="line"><span class="__shiki_wvjl67">                容器日志    使用logrotate</span></span>
<span class="line"><span class="__shiki_wvjl67">                    驱动      系统方案</span></span></code></pre></div><h3 id="_8-2-各场景推荐配置" tabindex="-1">8.2 各场景推荐配置 <a class="header-anchor" href="#_8-2-各场景推荐配置" aria-label="Permalink to &quot;8.2 各场景推荐配置&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>场景</strong></th><th><strong>推荐方案</strong></th><th><strong>关键配置</strong></th><th><strong>优势</strong></th></tr></thead><tbody><tr><td><strong>小型项目/快速启动</strong></td><td>PM2内置方案</td><td><code>log_rotate: {max_size: &#39;10M&#39;, retain: 30}</code></td><td>零配置、自动管理</td></tr><tr><td><strong>生产环境单体应用</strong></td><td>logrotate</td><td>每日切割、保留30天、压缩归档</td><td>系统级稳定、资源消耗低</td></tr><tr><td><strong>微服务/多实例</strong></td><td>应用层方案(Winston) + 集中收集</td><td>按实例分离、JSON格式、集中存储</td><td>便于追踪、支持结构化查询</td></tr><tr><td><strong>容器化部署</strong></td><td>容器日志驱动 + 外部收集</td><td>stdout/stderr输出、Fluentd收集</td><td>云原生、弹性扩展</td></tr><tr><td><strong>高合规要求</strong></td><td>多层方案组合</td><td>实时加密、异地备份、防篡改</td><td>满足审计要求、安全性高</td></tr></tbody></table><h3 id="_8-3-性能优化建议" tabindex="-1">8.3 性能优化建议 <a class="header-anchor" href="#_8-3-性能优化建议" aria-label="Permalink to &quot;8.3 性能优化建议&quot;">​</a></h3><ol><li><strong>异步日志写入</strong>：避免同步I/O阻塞事件循环</li><li><strong>批量写入</strong>：积累一定量日志后批量写入磁盘</li><li><strong>内存缓冲</strong>：使用适当大小的内存缓冲区</li><li><strong>分离磁盘</strong>：日志存储使用独立磁盘/分区</li><li><strong>压缩策略</strong>：合理设置压缩时机和级别</li></ol><h3 id="_8-4-安全注意事项" tabindex="-1">8.4 安全注意事项 <a class="header-anchor" href="#_8-4-安全注意事项" aria-label="Permalink to &quot;8.4 安全注意事项&quot;">​</a></h3><ol><li><strong>权限控制</strong>：日志文件设置适当权限（640）</li><li><strong>敏感信息过滤</strong>：自动脱敏密码、token等信息</li><li><strong>访问审计</strong>：记录日志文件访问记录</li><li><strong>加密存储</strong>：高敏感环境考虑加密日志</li><li><strong>安全传输</strong>：远程收集时使用加密通道</li></ol><p>通过实施以上日志切割方案，Node.js应用可以在裸机/VM环境中实现高效、稳定、可维护的日志管理，为系统监控、故障排查和合规审计提供坚实基础。</p>`,58)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
