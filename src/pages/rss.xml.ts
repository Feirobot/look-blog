import rss from '@astrojs/rss';
import { getPublishedPosts } from '../utils/posts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  
  return rss({
    title: '我的博客',
    description: '技术文章与学习笔记',
    site: context.site || 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      pubDate: post.data.pubDate,
      categories: post.data.categories,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
