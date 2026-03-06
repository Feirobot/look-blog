# 🔗 GitHub 连接指南

## ✅ 已完成

- [x] Git 仓库已初始化
- [x] 首次提交完成（51 个文件）
- [x] .gitignore 已配置
- [x] 用户信息已设置（Fei X <fei@syncplay.cn>）

---

## 📋 推送到 GitHub 步骤

### 1️⃣ 创建 GitHub 仓库

**方式 A: 网页创建**
1. 访问 https://github.com/new
2. 仓库名：`look-blog` 或 `syncplay-blog`
3. 可见性：Public 或 Private
4. **不要** 勾选 "Add a README"、".gitignore"、"license"
5. 点击 "Create repository"

**方式 B: GitHub CLI**
```bash
gh repo create look-blog --private --source=. --remote=origin --push
```

---

### 2️⃣ 关联远程仓库

创建仓库后，GitHub 会显示推送命令：

```bash
# 添加远程仓库（替换 <username> 为你的 GitHub 用户名）
git remote add origin https://github.com/<username>/look-blog.git

# 或者使用 SSH（推荐）
git remote add origin git@github.com:<username>/look-blog.git

# 推送代码
git push -u origin main
```

---

### 3️⃣ 配置 SSH 密钥（推荐）

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "fei@syncplay.cn"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 复制公钥到 GitHub:
# Settings → SSH and GPG keys → New SSH key
```

---

## 🔄 日常开发流程

### 提交更改
```bash
cd /home/node/.openclaw/workspace/blog

# 查看修改
git status

# 添加文件
git add .

# 提交
git commit -m "feat: 添加新功能"

# 推送
git push
```

### 拉取更新
```bash
git pull origin main
```

### 查看历史
```bash
git log --oneline
```

---

## 🚀 GitHub Pages 部署（可选）

如果不想用 Docker，可以直接用 GitHub Pages：

### 方法 1: GitHub Actions（推荐）

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 方法 2: 手动推送 gh-pages 分支

```bash
# 安装 gh-pages
npm install -D gh-pages

# 添加到 package.json scripts
# "deploy": "gh-pages -d dist"

# 构建并部署
npm run build
npm run deploy
```

---

## 📊 项目结构

```
blog/
├── .git/                 # Git 仓库
├── .github/              # GitHub 配置（可选）
│   └── workflows/
│       └── deploy.yml    # CI/CD 工作流
├── src/                  # 源代码
├── public/               # 静态资源
├── dist/                 # 构建输出（不提交）
├── node_modules/         # 依赖（不提交）
└── 配置文件...
```

---

## 🔐 敏感信息保护

**不要提交到 Git**:
- `.env` 文件
- SSL 证书
- 密码、密钥
- 数据库配置

**使用 GitHub Secrets**:
```bash
# 在 GitHub 仓库设置中添加
Settings → Secrets and variables → Actions
```

---

## 📝 推荐的提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

示例：
```bash
git commit -m "feat: 添加文章评论功能"
git commit -m "fix: 修复移动端导航栏显示问题"
git commit -m "docs: 更新部署文档"
```

---

## ✅ 检查清单

- [ ] GitHub 仓库已创建
- [ ] 远程仓库已关联
- [ ] SSH 密钥已配置（可选）
- [ ] 代码已推送
- [ ] GitHub Actions 已配置（可选）
- [ ] 分支保护规则已设置（推荐）

---

**需要我帮你创建 GitHub Actions 工作流吗？** 🚀
