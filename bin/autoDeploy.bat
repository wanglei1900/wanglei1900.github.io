call pnpm docs:build
cd docs/.vitepress/dist

git init
git add -A
git commit -m "auto construct blog"

git push -f https://github.com/wanglei1900/wanglei1900.github.io.git master:gh-pages
