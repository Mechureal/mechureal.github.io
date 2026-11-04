import rss from '@astrojs/rss';
import { languages, publishedPosts, postUrl, type Lang } from '../../lib/content';
import type { APIContext } from 'astro';
export function getStaticPaths() { return languages.map(lang => ({ params: { lang } })); }
export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  return rss({ title: 'Mechureal Devlog', description: lang === 'ko' ? 'Mechureal 공식 개발 일지' : 'Official development notes from Mechureal', site: context.site!, items: (await publishedPosts()).filter(p => p.data.lang === lang).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: postUrl(post), categories: post.data.tags })), customData: `<language>${lang}</language>` });
}
