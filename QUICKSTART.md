# 快速开始指南

## 🚀 5 分钟启动博客

### 1️⃣ 安装依赖

```bash
cd blog
pnpm install
```

### 2️⃣ 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:4321 查看博客

### 3️⃣ 创建第一篇文章

在 `src/content/posts/` 创建新文件，例如 `2024-03-06-my-first-post.md`:

```markdown
---
title: "我的第一篇文章"
description: "这是文章简介"
pubDate: 2024-03-06
tags: [生活]
categories: [生活]
draft: false
---

# 文章标题

开始写作吧！
```

保存后刷新浏览器即可看到新文章。

---

## 📝 常用命令

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 生成搜索索引（构建后）
npx pagefind --site dist
```

---

## 🎨 自定义

### 修改站点信息
编辑 `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
});
```

### 修改个人信息
- 关于页面：`src/pages/about.astro`
- 页脚链接：`src/components/Footer.astro`

### 修改主题颜色
编辑 `tailwind.config.mjs` 中的 `colors.primary`

---

## 📦 部署

### GitHub Pages
```bash
pnpm build
# 将 dist 目录推送到 gh-pages 分支
```

### Vercel
```bash
pnpm i -g vercel
vercel
```

### Netlify
- Build command: `pnpm build`
- Publish directory: `dist`

---

## ❓ 常见问题

**Q: 图片不显示？**
A: 将图片放在 `public/images/` 目录，然后在 Markdown 中使用 `/images/xxx.jpg`

**Q: 如何添加封面图？**
A: 在文章 frontmatter 中添加 `cover: "/images/covers/xxx.jpg"`

**Q: 搜索不工作？**
A: 需要先构建项目：`pnpm build && npx pagefind --site dist`

**Q: 如何修改 Logo？**
A: 编辑 `src/components/Header.astro` 中的 emoji 或替换为图片

---

## 📚 更多文档

- [README.md](README.md) - 完整项目说明
- [Astro 文档](https://docs.astro.build/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

Happy Blogging! 🎉
