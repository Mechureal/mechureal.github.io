import { getCollection, type CollectionEntry } from 'astro:content';
export type Lang = 'ko' | 'en';
export type Post = CollectionEntry<'devlog'>;
export const languages: Lang[] = ['ko', 'en'];
export const postUrl = (post: Post) => `/${post.data.lang}/devlog/${post.data.slug}/`;
export const formatDate = (date: Date, lang: Lang) => new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
export async function publishedPosts() {
  return (await getCollection('devlog', ({ data }) => !data.draft && data.date <= new Date()))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.slug.localeCompare(b.data.slug));
}
