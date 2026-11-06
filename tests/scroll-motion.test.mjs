import test from 'node:test';
import assert from 'node:assert/strict';
import { cityMotion } from '../src/lib/scroll-motion.ts';
test('city scene starts aligned, moves at distinct depths, and clamps at its limits', () => {
 for (const viewport of [667, 900]) {
  const header=64, height=viewport*1.55, distance=height-viewport+header;
  const start=cityMotion(header,height,viewport,header);
  assert.deepEqual(start,{far:0,near:0,rider:-0,title:1});
  const end=cityMotion(header-distance,height,viewport,header);
  assert.ok(end.far>end.near && end.near>0 && end.rider<0);
  assert.ok(Math.abs(end.title-.1)<1e-10);
  assert.deepEqual(cityMotion(header-distance-500,height,viewport,header),end);
  assert.deepEqual(cityMotion(header+500,height,viewport,header),start);
  const middle=cityMotion(header-distance/2,height,viewport,header);
  assert.ok(Math.abs(middle.far-end.far/2)<1e-10);
 }
});
