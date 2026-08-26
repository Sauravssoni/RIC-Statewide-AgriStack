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
assert.ok(!/openstreetmap|leaflet/i.test(cc),'Command centre must not use a world/OSM basemap');
assert.ok(cc.includes('41 current districts')||cc.includes('41-District')||cc.includes('41 DISTRICTS'),'Current Rajasthan 41-district context missing');

const farmer=checkHtml('farmer/index.html',['records','schemes','offlineReceipt','syncReceipt','consentModal','queueState','runScheme','installBtn']);
assert.ok(farmer.includes('serviceWorker.register'),'Farmer PWA service worker registration missing');
assert.ok(farmer.includes('/api/offline-sync'),'Farmer PWA must use acknowledged offline sync API');
assert.ok(farmer.includes('/api/scheme-check'),'Farmer PWA must use deterministic scheme API');
for(const file of ['farmer/sw.js','farmer/manifest.webmanifest','farmer/icon-192.png','farmer/icon-512.png']) assert.ok(fs.existsSync(file),`${file} missing`);
const manifest=JSON.parse(fs.readFileSync('farmer/manifest.webmanifest','utf8'));
assert.ok(manifest.icons?.some(x=>x.sizes==='192x192'),'192 PWA icon missing');
assert.ok(manifest.icons?.some(x=>x.sizes==='512x512'),'512 PWA icon missing');

for(const api of ['health','state-overview','districts','care','consent','scheme-check','offline-sync']){
  const code=fs.readFileSync(`api/${api}.js`,'utf8');
  new Function('module','exports','require',code);
}
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.rewrites.find(x=>x.source==='/')?.destination,'/command-centre/','Production root must route to v4 command centre');
assert.equal(vercel.rewrites.find(x=>x.source==='/kisan')?.destination,'/farmer/','Kisan shortcut missing');
console.log('RAJ-AGRISETU X v4 smoke gate: PASS');
