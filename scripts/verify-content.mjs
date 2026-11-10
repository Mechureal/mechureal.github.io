// Build disposable fixtures to exercise pagination, translation fallback, MDX and publication gates.
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
const fixtureDir = 'src/content/devlog/qa-fixtures';
assert.equal(existsSync(fixtureDir), false, 'Do not overwrite an existing fixture directory');
mkdirSync(fixtureDir);
mkdirSync('.qa', { recursive: true });
try {
  for (let i = 0; i < 9; i++) {
    const extra = i === 7 ? 'draft: true' : i === 8 ? 'draft: false' : 'draft: false';
    writeFileSync(`${fixtureDir}/fixture-${i}.mdx`, `---\ntitle: "Fixture ${i}"\ndescription: "QA fixture"\ndate: ${i === 8 ? '2999-01-01' : `2020-01-0${i + 1}`}\nauthor: Mechureal\nlang: ko\nslug: fixture-${i}\ntranslationKey: fixture-${i}\ntags: [qa-fixture]\n${extra}\n---\n\n## MDX fixture\n\n<strong>MDX_OK</strong>\n\n\`\`\`ts\nconst verified = true;\n\`\`\`\n`);
  }
  const build = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', '.qa/fixture-dist'], { encoding: 'utf8', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
  writeFileSync('.qa/fixtures-build.log', (build.stdout || '') + (build.stderr || ''));
  assert.equal(build.status, 0, build.stderr || build.stdout);
  const get = path => load(readFileSync(`.qa/fixture-dist/${path}/index.html`, 'utf8'));
  assert.equal(get('ko/devlog')('.post-card').length, 6);
  const secondPageCount = get('ko/devlog/page/2')('.post-card').length;
  assert.ok(secondPageCount > 0 && secondPageCount <= 6);
  assert.equal(get('ko/devlog/tag/qa-fixture')('.post-card').length, 6);
  assert.equal(get('ko/devlog/tag/qa-fixture/page/2')('.post-card').length, 1);
  const article = get('ko/devlog/fixture-0');
  assert.equal(article('.language').attr('href'), '/en/devlog/');
  assert.equal(article('link[hreflang="en"]').length, 0);
  assert.equal(article('.prose strong').text(), 'MDX_OK');
  assert.ok(article('pre.astro-code').length);
  for (const slug of ['fixture-7', 'fixture-8']) {
    assert.equal(existsSync(`.qa/fixture-dist/ko/devlog/${slug}`), false);
    for (const path of ['ko/rss.xml', 'sitemap.xml', 'sitemap-0.xml']) assert.ok(!readFileSync(`.qa/fixture-dist/${path}`, 'utf8').includes(slug));
  }
  console.log('PASS: multi-page lists, tag pagination, missing translation, MDX, syntax highlighting, drafts and future dates');
} finally {
  // Only the exact directory created above is removed; never any user content.
  rmSync(fixtureDir, { recursive: true });
}
