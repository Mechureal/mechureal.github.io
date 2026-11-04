import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { load } from 'cheerio';
const root = process.env.TEST_DIST || 'dist';
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]); }
const output = files(root);
const html = output.filter(p => p.endsWith('.html'));
const read = path => readFileSync(path, 'utf8');
test('both languages have all required pages and three home articles', () => {
  for (const lang of ['ko', 'en']) {
    for (const route of ['', 'games/', 'games/broke-rider-simulator/', 'about/', 'contact/', 'devlog/']) {
      const $ = load(read(join(root, lang, route, 'index.html')));
      assert.equal($('html').attr('lang'), lang);
      assert.equal($('h1').length, 1);
      assert.ok($('meta[name="description"]').attr('content'));
      assert.ok($('meta[property="og:image"]').attr('content')?.endsWith('/images/social.png'));
      assert.equal($('link[rel="canonical"]').attr('href'), `https://mechureal.github.io/${lang}/${route}`);
      assert.equal($(`link[hreflang="${lang === 'ko' ? 'en' : 'ko'}"]`).length, 1);
    }
    assert.equal(load(read(join(root, lang, 'index.html')))('.post-card').length, 3);
  }
});
test('every generated local link, image, stylesheet, and anchor resolves', () => {
  for (const file of html) {
    const $ = load(read(file));
    for (const el of $('[href], [src]').toArray()) {
      const target = $(el).attr('href') || $(el).attr('src');
      if (!target || /^(https?:|data:|mailto:)/.test(target)) continue;
      const [path, hash] = target.split('#');
      const actual = path ? join(root, path, extname(path) ? '' : 'index.html') : file;
      assert.ok(existsSync(actual), `${file}: missing ${target}`);
      if (hash && actual.endsWith('.html')) assert.ok(load(read(actual))(`[id="${hash}"]`).length, `${file}: missing anchor ${target}`);
    }
    for (const el of $('img').toArray()) assert.notEqual($(el).attr('alt'), undefined, `${file}: image needs alt`);
  }
});
test('drafts, personal identities, email addresses, and tracking are absent from output', () => {
  const forbidden = [new RegExp(['sunwoo', 'j'].join('-'), 'i'), /DRAFT_SENTINEL|draft-template|googletagmanager|google-analytics/i, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i];
  for (const file of output.filter(p => /\.(html|xml|css|js|svg|txt)$/.test(p))) for (const pattern of forbidden) assert.doesNotMatch(read(file), pattern, file);
  assert.equal(output.some(p => /draft-template|template[\\/]index/.test(p)), false);
});
test('RSS, sitemap, article author, translations and neighbors are consistent', () => {
  const sitemap = load(read(join(root, 'sitemap.xml')), { xmlMode: true });
  for (const lang of ['ko', 'en']) {
    const feed = load(read(join(root, lang, 'rss.xml')), { xmlMode: true });
    assert.equal(feed('language').text(), lang);
    assert.ok(feed('item').length >= 3);
    const dates = feed('item pubDate').toArray().map(el => Date.parse(feed(el).text()));
    assert.deepEqual(dates, [...dates].sort((a,b) => b-a));
    for (const el of feed('item link').toArray()) {
      const url = feed(el).text();
      assert.ok(sitemap('loc').toArray().some(loc => sitemap(loc).text() === url));
      const $ = load(read(join(root, new URL(url).pathname, 'index.html')));
      assert.equal($('meta[name="author"]').attr('content'), 'Mechureal');
      assert.ok($('.article-navigation a').length);
      assert.ok($('.language').attr('href')?.startsWith(`/${lang === 'ko' ? 'en' : 'ko'}/devlog/`));
    }
  }
  assert.match(read(join(root, 'robots.txt')), /Sitemap: https:\/\/mechureal.github.io\/sitemap-index.xml/);
});
