import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://mechureal.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith('/404/') })],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
