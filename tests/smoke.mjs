import fs from 'node:fs';
import assert from 'node:assert/strict';

function checkHtml(path, requiredIds=[]){
  const html=fs.readFileSync(path,'utf8');
  assert.match(html,/<!doctype html>/i,`${path}: doctype missing`);
  for(const id of requiredIds) assert.ok(html.includes(`id="${id}"`),`${path}: missing #${id}`);
  const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
  for(const [i,js] of scripts.entries()) new Function(js+`\n//# sourceURL=${path}-inline-${i}.js`);
  return html;
}

const cc=checkHtml('command-centre/index.html',['view-overview','view-districts','view-care','view-consent','view-field','view-integrations','view-reports','rolloutRows','careRows','consentReceipt']);
assert.ok(!cc.includes('openstreetmap'),'Command centre must not use a world/OSM basemap');
assert.ok(cc.includes('41 current districts')||cc.includes('41-District'),'Current Rajasthan 41-district context missing');

const farmer=checkHtml('farmer/index.html',['records','schemes','offlineReceipt','consentModal','queueState']);
assert.ok(farmer.includes('serviceWorker.register'),'Farmer PWA service worker registration missing');
assert.ok(fs.existsSync('farmer/sw.js'),'Service worker missing');
assert.ok(fs.existsSync('farmer/manifest.webmanifest'),'PWA manifest missing');

for(const api of ['health','state-overview','districts','care','consent','scheme-check']){
  const code=fs.readFileSync(`api/${api}.js`,'utf8');
  new Function('module','exports','require',code);
}
console.log('RAJ-AGRISETU X v4 smoke gate: PASS');