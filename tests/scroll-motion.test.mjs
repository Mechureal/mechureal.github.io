import test from 'node:test';
import assert from 'node:assert/strict';
import { cityMotion } from '../src/lib/scroll-motion.ts';

test('city layers move continuously while the hero scrolls out of view', () => {
 for (const height of [320, 603, 836]) {
  const header=64;
  const start=cityMotion(header,height,header);
  assert.deepEqual(start,{far:0,middle:0,near:-0,rider:-0,title:1});
  let last={far:0,middle:0,near:0,rider:0};
  for (let scroll=1;scroll<=height;scroll++) {
   const frame=cityMotion(header-scroll,height,header);
   assert.equal(frame.rider,frame.near,'rider and road must stay aligned while scrolling');
   // Every visible layer keeps moving upward with the document; none pins the scene.
   for (const layer of ['far','middle','near','rider']) {
    const screenY=-scroll+frame[layer];
    assert.ok(screenY<last[layer]);
    assert.ok(last[layer]-screenY<1.3);
    last[layer]=screenY;
   }
  }
  const end=cityMotion(header-height,height,header);
  assert.ok(end.far>end.middle && end.middle>0 && end.near<0 && end.rider===end.near);
  assert.ok(Math.abs(end.title-.2)<1e-10);
  assert.deepEqual(cityMotion(header-height-500,height,header),end);
  assert.deepEqual(cityMotion(header+500,height,header),start);
  const middle=cityMotion(header-height/2,height,header);
  assert.ok(Math.abs(middle.far-end.far/2)<1e-10);
  assert.ok(middle.far-middle.middle >= height*.16);
  assert.ok(middle.middle-middle.near >= height*.25);
 }
});
