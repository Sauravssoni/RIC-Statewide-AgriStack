import fs from 'node:fs';
import assert from 'node:assert/strict';

function html(path,ids=[]){const x=fs.readFileSync(path,'utf8');assert.match(x,/<!doctype html>/i,`${path}: doctype missing`);for(const id of ids)assert.ok(x.includes(`id="${id}"`),`${path}: missing #${id}`);return x}
function js(path){const x=fs.readFileSync(path,'utf8');new Function(x+`\n//# sourceURL=${path}`);return x}

const cc=html('command-centre/index.html',['view-overview','view-districts','view-care','view-consent','view-field','view-integrations','view-governance','view-reports','roleSelect','districtFilter','rolloutRows','careRows','consentReceipt']);
const ccjs=js('command-centre/app.js');
assert.ok(!/openstreetmap|leaflet/i.test(cc+ccjs),'Command centre must not use world/OSM/Leaflet basemap');
assert.ok(/41 districts|41-DISTRICT|41-district/i.test(cc),'Current Rajasthan 41-district context missing');
assert.ok(ccjs.includes("state.role==='field'"),'Field role boundary missing');
assert.ok(ccjs.includes('scopedDistrict'),'District role/filter scoping missing');
assert.ok(cc.includes('CROSS-DEPARTMENT HEALTH'),'Cross-department operating surface missing');
assert.ok(cc.includes('view-governance'),'Governance control plane missing');

const farmer=html('farmer/index.html',['records','schemes','offlineReceipt','syncReceipt','consentModal','queueState','runScheme','installBtn']);
assert.ok(farmer.includes('serviceWorker.register'),'Farmer PWA service worker registration missing');
assert.ok(farmer.includes('/api/offline-sync'),'Acknowledged offline sync API missing');
assert.ok(farmer.includes('/api/scheme-check'),'Deterministic scheme API missing');
for(const f of ['farmer/sw.js','farmer/manifest.webmanifest','farmer/icon-192.png','farmer/icon-512.png'])assert.ok(fs.existsSync(f),`${f} missing`);
const manifest=JSON.parse(fs.readFileSync('farmer/manifest.webmanifest','utf8'));
assert.ok(manifest.icons?.some(x=>x.sizes==='192x192'),'192 PWA icon missing');assert.ok(manifest.icons?.some(x=>x.sizes==='512x512'),'512 PWA icon missing');

for(const api of ['health','state-overview','districts','care','consent','scheme-check','offline-sync'])js(`api/${api}.js`);
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.rewrites.find(x=>x.source==='/')?.destination,'/command-centre/','Production root must route to command centre');
assert.equal(vercel.rewrites.find(x=>x.source==='/kisan')?.destination,'/farmer/','Kisan shortcut missing');
for(const f of ['docs/EVALUATOR_RUNBOOK.md','docs/RELEASE_GATE.md','docs/SUBMISSION_PROOF_MATRIX.md','docs/CROSS_DEPARTMENT_MODEL.md','docs/SECURITY_GOVERNANCE_V4.md'])assert.ok(fs.existsSync(f),`${f} missing`);
console.log('RAJ-AGRISETU X release smoke gate: PASS');
