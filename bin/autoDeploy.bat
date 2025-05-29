@echo off
REM 仅用于快速提交和推送代码，触发GitHub Actions
echo 正在提交所有更改...
git add .
git commit -m "自动提交以触发部署" || echo 无更改可提交
git push origin master

echo 代码已推送，GitHub Actions将自动构建和部署
timeout /t 5