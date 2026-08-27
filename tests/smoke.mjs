import fs from 'node:fs';
import assert from 'node:assert/strict';

function html(path,ids=[]){const x=fs.readFileSync(path,'utf8');assert.match(x,/<!doctype html>/i,`${path}: doctype missing`);for(const id of ids)assert.ok(x.includes(`id="${id}"`),`${path}: missing #${id}`);return x}
function js(path){const x=fs.readFileSync(path,'utf8');new Function(x+`\n//# sourceURL=${path}`);return x}

// Current evaluator surface — this is what /, /dashboard and /command-centre must resolve to.
const mc=html('mission-control/index.html',['view-mission','view-farmgraph','view-care','view-farmer','view-gis','view-integrations','view-rollout','view-evidence','startDemo','demoStage','careApprove','districtRanking','integrationGrid']);
const mcjs=js('mission-control/app.js');
assert.ok(mc.includes('INTERACTIVE PROTOTYPE'),'Prototype maturity label missing from Mission Control');
assert.ok(mc.includes('90-DAY PRODUCTION CORE'),'Prototype → production maturity contract missing');
assert.ok(mc.includes('FarmGraph AI'),'FarmGraph AI must be first-class in evaluator surface');
assert.ok(mc.includes('CARE')&&mc.includes('human'),'CARE human-authority story missing');
assert.ok(mc.includes('Start 90-sec Demo')&&mcjs.includes('const DEMO='),'Guided evaluator demo missing');
assert.ok(mcjs.includes("localStorage.setItem('rajAgriCareApproval'"),'CARE approval must bridge to Farmer PWA evaluator session');
assert.ok(mcjs.includes("caseId:'CARE-RAJ-2026-001284'"),'Mission Control CARE must address exact active case');
assert.ok(!/openstreetmap|leaflet/i.test(mc+mcjs),'Mission Control must not use world/OSM/Leaflet basemap');
assert.ok(/41 districts|41-district|41-DISTRICT/i.test(mc),'Current Rajasthan 41-district context missing');
assert.ok(mc.includes('Rajdharaa/LGD'),'Production GIS authority boundary missing');
assert.ok(mc.includes('synthetic')||mc.includes('SYNTHETIC'),'Synthetic evaluator-data labelling missing');

// Legacy command-centre remains as engineering reference; core governed logic must still parse.
const cc=html('command-centre/index.html',['view-mission','view-gis','view-farmgraph','view-care','view-consent','view-field','view-integrations','view-rollout','view-governance','view-evidence']);
js('command-centre/app.js');

// Farmer PWA hard requirements.
const farmer=html('farmer/index.html',['records','schemes','offlineReceipt','syncReceipt','careResolutionState','consentModal','queueState','runScheme','installBtn']);
assert.ok(farmer.includes('serviceWorker.register'),'Farmer PWA service worker registration missing');
assert.ok(farmer.includes('/api/offline-sync'),'Acknowledged offline sync API missing');
assert.ok(farmer.includes('/api/scheme-check'),'Deterministic scheme API missing');
assert.ok(farmer.includes('readCareApproval'),'Cross-surface CARE approval read missing');
assert.ok(farmer.includes('parcelCareApproved?3:0'),'Scheme parcel input must require CARE approval, not server acknowledgement');
assert.ok(farmer.includes('ACK is not approval'),'Offline acknowledgement authority boundary missing');
for(const f of ['farmer/sw.js','farmer/manifest.webmanifest','farmer/icon-192.png','farmer/icon-512.png'])assert.ok(fs.existsSync(f),`${f} missing`);
const manifest=JSON.parse(fs.readFileSync('farmer/manifest.webmanifest','utf8'));
assert.ok(manifest.icons?.some(x=>x.sizes==='192x192'),'192 PWA icon missing');
assert.ok(manifest.icons?.some(x=>x.sizes==='512x512'),'512 PWA icon missing');

// Evaluator API contracts.
for(const api of ['health','state-overview','districts','care','consent','scheme-check','offline-sync'])js(`api/${api}.js`);
const care=fs.readFileSync('api/care.js','utf8');
assert.ok(care.includes("'CARE-RAJ-2026-001284'"),'Canonical CARE case missing from API');
assert.ok(care.includes('approvalArtifact'),'CARE human approval artifact missing');
assert.ok(care.includes('case_not_found'),'CARE must reject unknown non-demo case IDs');
const consent=fs.readFileSync('api/consent.js','utf8');
assert.ok(consent.includes('AGRISTACK_CONSENT_MANAGER_PATTERN'),'Consent API must compose with AgriStack consent architecture');
assert.ok(consent.includes('itemisedData')&&consent.includes('withdrawalMethod'),'DPDP-notice design fields missing');

// Production routing must never expose the retired dashboard again.
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.equal(vercel.rewrites.find(x=>x.source==='/')?.destination,'/mission-control/','Production root must route to evaluator Mission Control');
assert.equal(vercel.rewrites.find(x=>x.source==='/dashboard')?.destination,'/mission-control/','/dashboard must route to evaluator Mission Control');
assert.equal(vercel.rewrites.find(x=>x.source==='/dashboard.html')?.destination,'/mission-control/','/dashboard.html must route to evaluator Mission Control');
assert.equal(vercel.rewrites.find(x=>x.source==='/command-centre')?.destination,'/mission-control/','/command-centre must route to evaluator Mission Control');
assert.equal(vercel.rewrites.find(x=>x.source==='/kisan')?.destination,'/farmer/','Kisan shortcut missing');
const legacy=fs.readFileSync('dashboard.html','utf8');
assert.ok(legacy.includes("location.replace('/mission-control/')"),'Legacy dashboard file must self-retire to Mission Control');

for(const f of ['docs/EVALUATOR_RUNBOOK.md','docs/RELEASE_GATE.md','docs/SUBMISSION_PROOF_MATRIX.md','docs/CROSS_DEPARTMENT_MODEL.md','docs/SECURITY_GOVERNANCE_V4.md','docs/PROTOTYPE_TO_PRODUCTION.md'])assert.ok(fs.existsSync(f),`${f} missing`);
console.log('RAJ-AGRISETU X evaluator release smoke gate: PASS');
