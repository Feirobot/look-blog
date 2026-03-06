# 个人博客

一个使用 Astro 和 Tailwind CSS 构建的现代化个人博客。

## ✨ 特性

- 🚀 **高性能** - 零 JavaScript 输出，Lighthouse 95+ 评分
- 🎨 **美观设计** - 简洁优雅的 UI，支持明暗主题切换
- 📱 **响应式** - 完美适配手机、平板、桌面设备
- 📝 **Markdown 支持** - 使用 Markdown 编写文章，支持代码高亮
- 🔍 **全文搜索** - 集成 Pagefind 全文搜索
- 🏷️ **标签和分类** - 灵活的内容组织方式
- 📰 **RSS 订阅** - 自动生成 RSS 订阅源
- 🔎 **SEO 优化** - 完整的 SEO meta 标签和结构化数据
- ♿ **无障碍** - 遵循 WCAG 标准

## 🛠️ 技术栈

- [Astro 4.x](https://astro.build/) - 静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Pagefind](https://pagefind.app/) - 全文搜索
- [Shiki](https://github.com/shikijs/shiki) - 代码高亮

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 📁 项目结构

```
blog/
├── public/              # 静态资源
├── src/
│   ├── content/         # Markdown 文章
│   │   ├── posts/       # 博客文章
│   │   └── config.ts    # Content Collections 配置
│   ├── components/      # Astro 组件
│   ├── layouts/         # 布局组件
│   ├── pages/           # 页面路由
│   ├── styles/          # CSS 样式
│   └── utils/           # 工具函数
├── astro.config.mjs     # Astro 配置
├── tailwind.config.mjs  # Tailwind 配置
└── package.json
```

## ✍️ 创建新文章

在 `src/content/posts/` 目录创建 Markdown 文件：

```markdown
---
title: "文章标题"
description: "文章简介"
pubDate: 2024-01-15
tags: [astro, web]
categories: [技术]
draft: false
cover: "/images/covers/my-post.jpg"
---

文章正文...
```

## 🎨 自定义配置

### 修改站点信息

编辑 `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

### 修改主题颜色

编辑 `tailwind.config.mjs`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义颜色
      },
    },
  },
}
```

### 修改个人信息

编辑 `src/pages/about.astro` 和 `src/components/Footer.astro`

## 📦 部署

### GitHub Pages

1. 构建项目：`pnpm build`
2. 推送 `dist` 目录到 `gh-pages` 分支
3. 或使用 GitHub Actions 自动部署

### Vercel

```bash
pnpm i -g vercel
vercel
```

### Netlify

连接 GitHub 仓库，设置：

- Build command: `pnpm build`
- Publish directory: `dist`

## 📄 许可证

MIT

## 🙏 致谢

感谢以下开源项目：

- Astro 团队
- Tailwind CSS 团队
- 所有贡献者

---

Built with ❤️ using Astro & Tailwind CSS
