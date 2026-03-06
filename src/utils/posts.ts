import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * Get all published posts, sorted by date (newest first)
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts
    .filter(({ data }) => !data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getPublishedPosts();
  return posts.filter(({ data }) => data.tags.includes(tag));
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getPublishedPosts();
  return posts.filter(({ data }) => data.categories.includes(category));
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const tags = posts.flatMap(({ data }) => data.tags);
  return [...new Set(tags)].sort();
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const categories = posts.flatMap(({ data }) => data.categories);
  return [...new Set(categories)].sort();
}

/**
 * Get tag counts
 */
export async function getTagCounts(): Promise<Record<string, number>> {
  const posts = await getPublishedPosts();
  const counts: Record<string, number> = {};

  posts.forEach(({ data }) => {
    data.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  return counts;
}

/**
 * Get related posts (by tags)
 */
export async function getRelatedPosts(
  currentPost: CollectionEntry<'posts'>,
  limit: number = 3
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getPublishedPosts();
  const currentTags = currentPost.data.tags;

  const related = posts
    .filter(({ id }) => id !== currentPost.id)
    .filter(({ data }) => data.tags.some((tag) => currentTags.includes(tag)))
    .slice(0, limit);

  return related;
}

/**
 * Get previous and next posts
 */
export async function getAdjacentPosts(
  currentPost: CollectionEntry<'posts'>
): Promise<{ prev?: CollectionEntry<'posts'>; next?: CollectionEntry<'posts'> }> {
  const posts = await getPublishedPosts();
  const currentIndex = posts.findIndex(({ id }) => id === currentPost.id);

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined,
  };
}
