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
test('the root redirects to the Korean homepage without rendering an intermediate message', () => {
  const $ = load(read(join(root, 'index.html')));
  assert.equal($('meta[http-equiv="refresh"]').attr('content'), '0;url=/ko/');
  assert.match($('html').attr('style'), /background:\s*#171c2c/);
  assert.equal($('body').html().trim(), '');
});
test('the built site exposes the Team Mechureal web app and its install icons', () => {
  const manifestPath = '/site.webmanifest';
  const appName = 'Team Mechureal';
  const appleIcon = '/images/app-icons/icon-180.png';
  for (const route of ['', 'ko', 'en']) {
    const $ = load(read(join(root, route, 'index.html')));
    assert.equal($('link[rel="manifest"]').attr('href'), manifestPath);
    assert.equal($('meta[name="apple-mobile-web-app-title"]').attr('content'), appName);
    assert.equal($('link[rel="apple-touch-icon"]').attr('href'), appleIcon);
  }

  const manifest = JSON.parse(read(join(root, manifestPath)));
  assert.equal(manifest.name, appName);
  assert.equal(manifest.short_name, appName);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.start_url, '/ko/');

  const icons = [...manifest.icons, { src: appleIcon, sizes: '180x180' }];
  for (const size of ['192x192', '512x512']) {
    assert.ok(icons.some(icon => icon.sizes === size && (!icon.purpose || icon.purpose === 'any')));
  }
  for (const { src, sizes } of icons) {
    const png = readFileSync(join(root, src));
    assert.equal(png.subarray(12, 16).toString('ascii'), 'IHDR', src);
    assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, sizes, src);
  }
});
test('both languages have all required pages and three home articles', () => {
  for (const lang of ['ko', 'en']) {
    for (const route of ['', 'games/', 'games/broke-rider-simulator/', 'about/', 'contact/', 'devlog/', 'announcements/']) {
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
test('drafts, personal identities, unapproved email addresses, and tracking are absent from output', () => {
  const forbidden = [new RegExp(['sunwoo', 'j'].join('-'), 'i'), /DRAFT_SENTINEL|draft-template|googletagmanager|google-analytics/i, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i];
  for (const file of output.filter(p => /\.(html|xml|css|js|svg|txt)$/.test(p))) for (const pattern of forbidden) assert.doesNotMatch(read(file).replaceAll("team.mechureal@gmail.com", ""), pattern, file);
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
      if (!url.includes('hello-mechureal')) assert.ok($('.article-navigation a').length);
      assert.ok($('.language').attr('href')?.startsWith(`/${lang === 'ko' ? 'en' : 'ko'}/devlog/`));
    }
  }
  assert.match(read(join(root, 'robots.txt')), /Sitemap: https:\/\/mechureal.github.io\/sitemap-index.xml/);
});

test('announcements are separated from the devlog while old article URLs remain usable', () => {
  for (const lang of ['ko', 'en']) {
    const announcements = load(read(join(root, lang, 'announcements', 'index.html')));
    const devlog = load(read(join(root, lang, 'devlog', 'index.html')));
    assert.equal(announcements('a[href$="/devlog/hello-mechureal/"]').length > 0, true);
    assert.equal(devlog('a[href$="/devlog/hello-mechureal/"]').length, 0);
    const article = load(read(join(root, lang, 'devlog', 'hello-mechureal', 'index.html')));
    assert.ok(article('a[href$="/announcements/"]').length);
  }
});