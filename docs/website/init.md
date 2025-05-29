```flow
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

```flow
graph LR
    A[本地开发] --> B[运行 autoDeploy.bat]
    B --> C[提交并推送代码]
    C --> D[触发 GitHub Actions]
    D --> E[自动构建]
    E --> F[自动部署到 GitHub Pages]
```