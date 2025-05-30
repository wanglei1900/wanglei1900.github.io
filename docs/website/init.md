## 环境
  - node -v 18以上
  - node -v 18以上

## mermaid集成图表

```mermaid
sequenceDiagram
    participant Local as 本地开发
    participant GitHub as GitHub
    participant Pages as GitHub Pages
    
    Local->>Local: 运行 autoDeploy.bat
    Local->>Local: 仅执行构建(pnpm docs:build)
    Local->>GitHub: 推送代码到 master 分支
    GitHub->>GitHub: 触发 Actions 工作流
    GitHub->>GitHub: 安装依赖/构建项目
    GitHub->>GitHub: 验证构建产物
    GitHub->>Pages: 自动部署到 gh-pages
    Pages-->>用户: 服务更新完成
```

```mermaid
graph LR
    A[本地开发] --> B[运行 autoDeploy.bat]
    B --> C[提交并推送代码]
    C --> D[触发 GitHub Actions]
    D --> E[自动构建]
    E --> F[自动部署到 GitHub Pages]
```



## 时间先

::: timeline 2023-04-24
- 一个非常棒的开源项目 H5-Dooring 目前 star 3.1k
  - 开源地址 https://github.com/MrXujiang/h5-Dooring
  - 基本介绍 http://h5.dooring.cn/doc/zh/guide/
- 《深入浅出webpack》 http://webpack.wuhaolin.cn/
:::

::: timeline 2023-04-23
:::

