import type { CollectionEntry } from 'astro:content';

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
  author?: string;
  canonicalURL?: string;
}

/**
 * Generate SEO meta tags
 */
export function generateSEO(props: SEOProps, site: string = 'https://example.com') {
  const {
    title,
    description,
    image = '/images/og-default.png',
    type = 'website',
    publishedTime,
    modifiedTime,
    tags,
    author,
    canonicalURL,
  } = props;

  const url = canonicalURL || site;
  const imageUrl = image.startsWith('http') ? image : `${site}${image}`;

  return {
    // Basic meta tags
    title,
    description,

    // Open Graph
    openGraph: {
      type,
      locale: 'zh_CN',
      url,
      title,
      description,
      siteName: '我的博客',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: publishedTime?.toISOString(),
      modifiedTime: modifiedTime?.toISOString(),
      tags,
      authors: author ? [author] : undefined,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: imageUrl,
    },

    // Additional meta
    robots: 'index, follow',
    author: author || 'Fei',
  };
}

/**
 * Generate structured data for articles
 */
export function generateArticleSchema(post: CollectionEntry<'posts'>, site: string = 'https://example.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    image: post.data.cover ? `${site}${post.data.cover}` : undefined,
    datePublished: post.data.pubDate.toISOString(),
    dateModified: post.data.updatedDate?.toISOString(),
    author: {
      '@type': 'Person',
      name: post.data.author || 'Fei',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site}/posts/${post.slug}/`,
    },
    keywords: post.data.tags.join(', '),
    articleSection: post.data.categories[0] || 'General',
  };
}
