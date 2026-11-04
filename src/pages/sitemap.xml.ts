import { languages, publishedPosts, postUrl } from '../lib/content';
import type { APIContext } from 'astro';
// Human-friendly alias. The integration-generated sitemap-index.xml includes every static route.
export async function GET({ site }: APIContext) {
  const paths = languages.flatMap(lang => ['', 'games/', 'games/broke-rider-simulator/', 'about/', 'contact/', 'devlog/', 'announcements/'].map(path => `/${lang}/${path}`));
  paths.push(...(await publishedPosts()).map(postUrl));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${new URL(path, site)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
