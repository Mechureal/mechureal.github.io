import test from 'node:test';
import assert from 'node:assert/strict';
import { eggProgress, scooterProgress } from '../src/lib/scroll-motion.ts';

test('egg stays closed at entry and opens fully by the end on desktop and mobile', () => {
  for (const [viewport, header] of [[900, 76], [667, 68]]) {
    const height = viewport * 2.3;
    const distance = height - viewport + header;
    assert.equal(eggProgress(header, height, viewport, header), 0);
    assert.equal(eggProgress(header - distance, height, viewport, header), 1);
    assert.equal(eggProgress(header + 500, height, viewport, header), 0);
    assert.equal(eggProgress(header - distance - 500, height, viewport, header), 1);
  }
});

test('scooter crosses the whole viewport and retraces its position when scrolling back', () => {
  for (const viewport of [667, 900]) {
    const height = viewport * 1.4;
    const start = viewport * .2;
    const distance = height - viewport * .6;
    const positions = [0, .25, .5, .75, 1].map(p => scooterProgress(start - p * distance, height, viewport));
    assert.equal(positions[0], 0);
    assert.equal(positions[4], 1);
    positions.forEach((p, i) => assert.ok(Math.abs(p - i / 4) < 1e-10));
    assert.ok(-75 + positions[0] * 220 < -70);
    assert.ok(-75 + positions[4] * 220 > 100);
    assert.ok(Math.abs(scooterProgress(start - distance / 2, height, viewport) - positions[2]) < 1e-10);
  }
});
