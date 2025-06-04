#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入打包后的dist目录
cd doc_build

git init
git add -A
git commit -m 'deploy'

# 推到远程仓库上
git push -f git@github.com:akira0912/blog.git master

cd -