const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

const STATE_CARE_TOTAL=1284;
const DISTRICTS=['Ajmer','Alwar','Balotra','Banswara','Baran','Barmer','Beawar','Bharatpur','Bhilwara','Bikaner','Bundi','Chittorgarh','Churu','Dausa','Deeg','Dholpur','Didwana-Kuchaman','Dungarpur','Hanumangarh','Jaipur','Jaisalmer','Jalore','Jhalawar','Jhunjhunu','Jodhpur','Karauli','Khairthal-Tijara','Kota','Kotputli-Behror','Nagaur','Pali','Phalodi','Pratapgarh','Rajsamand','Salumber','Sawai Madhopur','Sikar','Sirohi','Sri Ganganagar','Tonk','Udaipur'];
const SEEDED={
  Barmer:[94,88,91,97,82,184],Jaisalmer:[95,91,89,98,84,126],Jodhpur:[98,96,95,98,93,58],Jaipur:[99,98,97,99,97,34],Bikaner:[97,95,94,98,90,61],
  Udaipur:[96,94,92,97,86,72],Kota:[98,97,96,99,95,41],Banswara:[94,90,88,96,81,119],Ajmer:[97,96,94,98,92,52],Alwar:[96,93,92,97,89,73]
};
const CASES=[
  {id:'CARE-RAJ-2026-001284',district:'Barmer',type:'LAND_MUTATION',exception:'Farmer Registry 2 vs RoR 3 parcels',age:11,priority:'HIGH',authority:'District Verifier',farmerId:'RAJ-FID-000284',sourceA:{label:'Farmer Registry',value:'2 parcels',state:'CONFLICT'},sourceB:{label:'RoR / sanctioned mutation',value:'3 parcels',state:'CURRENT'},assertion:'Third parcel confirmed'},
  {id:'CARE-RAJ-2026-001219',district:'Banswara',type:'IDENTITY_DRIFT',exception:'Identity name + relation mismatch',age:9,priority:'MEDIUM',authority:'Tehsil Verifier',farmerId:'RAJ-FID-000219',sourceA:{label:'Farmer Registry',value:'Kamli Devi · spouse relation',state:'CONFLICT'},sourceB:{label:'Jan Aadhaar reference',value:'Kamla Devi · verified relation',state:'CURRENT'},assertion:'Correction requested'},
  {id:'CARE-RAJ-2026-001178',district:'Jaisalmer',type:'CROP_CONFLICT',exception:'Farmer crop assertion vs digital crop survey',age:8,priority:'MEDIUM',authority:'Agriculture Officer',farmerId:'RAJ-FID-000178',sourceA:{label:'Farmer crop assertion',value:'Mustard',state:'ASSERTED'},sourceB:{label:'Crop survey',value:'Gram',state:'CURRENT'},assertion:'Mustard asserted with field evidence'},
  {id:'CARE-RAJ-2026-001142',district:'Barmer',type:'LAND_MUTATION',exception:'Sanctioned mutation awaiting registry sync',age:7,priority:'HIGH',authority:'District Verifier',farmerId:'RAJ-FID-000142',sourceA:{label:'Farmer Registry',value:'Old parcel relationship',state:'STALE'},sourceB:{label:'RoR / sanctioned mutation',value:'Updated parcel relationship',state:'CURRENT'},assertion:'Farmer acknowledged mutation'},
  {id:'CARE-RAJ-2026-001097',district:'Jodhpur',type:'LAND_MUTATION',exception:'Parcel relationship changed after mutation',age:5,priority:'MEDIUM',authority:'District Verifier',farmerId:'RAJ-FID-000097',sourceA:{label:'Farmer Registry',value:'Pre-mutation relationship',state:'STALE'},sourceB:{label:'RoR / mutation',value:'Post-mutation relationship',state:'CURRENT'},assertion:'No additional evidence requested yet'}
];
const DEPARTMENTS=[
  ['Revenue / e-Dharti','PUBLIC + CONTRACT','RoR / mutation authority'],['Agriculture / AgriStack','SANDBOX','Farmer + Crop registries'],['Jan Aadhaar 2.0','CONTRACT READY','person/household identity bridge'],
  ['Raj Sewa Dwaar','CONTRACT READY','State API gateway'],['Rajdharaa / LGD','REFERENCE READY','administrative/spatial authority'],['Water Resources','REFERENCE READY','policy-bound irrigation/water context'],['Cooperatives / FPO','ADAPTER PATTERN','assisted/member service context']
];
const INTEGRATIONS=[
  ['Farmer Registry / UFSI','SANDBOX','Central/State AgriStack','Federated farmer identity adapter'],['Crop Sown Registry','SANDBOX','AgriStack / State','Seasonal crop assertion adapter'],
  ['AgriStack Consent Manager','ARCHITECTURE ALIGNED','AgriStack','State notice/purpose-policy UX composes with the approved consent architecture; it is not a parallel protocol'],
  ['Jan Aadhaar 2.0','CONTRACT READY','DoIT&C Rajasthan','Reference-based identity bridge'],['e-Dharti / DILRMP','PUBLIC + CONTRACT','Revenue Department','RoR / mutation source'],
  ['Raj Sewa Dwaar','CONTRACT READY','DoIT&C Rajasthan','API gateway / subscription / policy rail'],['Raj SSO','CONTRACT READY','DoIT&C Rajasthan','Officer authentication / role context'],
  ['RajMasters','PUBLIC REFERENCE','Rajasthan Government','current administrative master'],['Rajdharaa / LGD','REFERENCE READY','State GIS / DoIT&C','production geographic authority'],
  ['RajKisan','CONTRACT READY','Agriculture Department','scheme/service workflow adapter'],['Rajasthan Sampark','ADAPTER PATTERN','Rajasthan Government','unresolved grievance escalation'],
  ['BHASHINI','PROTOTYPE ADAPTER','MeitY / Digital India','ASR/TTS/translation rail'],['SUTRA-ID Edge','LIVE PROTOTYPE','Syntheon','optional field/offline/voice execution']
];
const CONTROLS=[
  ['RBAC & scope','State / District / Field roles','District role is locked to Barmer; Field role is restricted to assigned case and field surfaces.'],
  ['Purpose policy','Itemised scope + duration + withdrawal','State UX/policy adapter is designed to compose with AgriStack consent architecture and applicable DPDP requirements.'],
  ['Source separation','Fact / assertion / decision','Farmer assertion cannot silently overwrite Farmer Registry or RoR.'],
  ['Offline integrity','Local queue → ACK → CARE','Queue entry is removed only after server acknowledgement; ACK is receipt, not verification.'],
  ['Audit & receipts','Event IDs + authority boundary','CARE, consent, sync and policy actions generate explicit evaluator receipts.'],
  ['Integration truth','No fake green connections','Sandbox, public reference, contract-ready, architecture-aligned and prototype states remain distinct.'],
  ['Data minimization','Reference, not duplicate master','Jan Aadhaar/RoR/registry data remains with authoritative systems.'],
  ['Production hosting','Department-approved environment','Evaluator APIs prove contracts; they are not authoritative Government services.'],
  ['AI boundary','Advisory, not statutory','AI may explain and prioritize; it may not mutate records or approve benefits.']
];
const DEFAULT_AUDITS=[
  ['14:18','Policy Engine','PURPOSE_SCOPE_VALIDATED','scheme-precheck · identity/parcel/crop'],['14:16','District Verifier','CARE_CASE_OPENED','CARE-RAJ-2026-001284 · Barmer'],
  ['14:12','Offline Sync','QUEUE_ACKNOWLEDGED','OFF-RAJ-82A1 · pending CARE'],['14:09','SahmatiOS','CONSENT_NOTICE_RENDERED','hi-IN · voice + text']
];
let audits=DEFAULT_AUDITS.map(x=>[...x]);
let state={role:'state',district:'all',exception:'all',season:'Kharif 2026',consentId:null,activeCaseId:'CARE-RAJ-2026-001284'};

function readinessHealth(registry,land,crop,consent,offline,cases){
  const sla=Math.max(20,100-Math.min(80,cases*.45));
  return Math.round(registry*.15+land*.25+crop*.15+consent*.15+offline*.15+sla*.15);
}
function demoMetrics(name,index){
  const x=SEEDED[name]||[94+(index%5),91+(index*3%7),90+(index*5%8),96+(index%4),83+(index*7%12),45+(index*17%89)];
  return {name,registry:x[0],land:x[1],crop:x[2],consent:x[3],offline:x[4],cases:x[5],health:readinessHealth(x[0],x[1],x[2],x[3],x[4],x[5])};
}
const ROWS=DISTRICTS.map(demoMetrics);

function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('on');setTimeout(()=>el.classList.remove('on'),1900)}
function statusClass(v){return v>=88?'good':v>=78?'warn':'risk'}
function evidenceClass(v){return ['CURRENT','MATCH','APPROVED'].includes(v)?'good':['CONFLICT','STALE','MISMATCH'].includes(v)?'warn':'neutral'}
function scopedDistrict(){return state.role==='state'?state.district:'Barmer'}
function scopedRows(){const d=scopedDistrict();return d==='all'?ROWS:ROWS.filter(x=>x.name===d)}
function scopedCareTotal(){const d=scopedDistrict();return d==='all'?STATE_CARE_TOTAL:(ROWS.find(r=>r.name===d)?.cases||0)}
function scopedCases(){
  let rows=CASES.filter(c=>state.role==='state'||c.district==='Barmer');const d=scopedDistrict();if(d!=='all')rows=rows.filter(c=>c.district===d);
  if(state.exception==='high')rows=rows.filter(c=>c.priority==='HIGH');if(state.exception==='land')rows=rows.filter(c=>c.type==='LAND_MUTATION');if(state.exception==='identity')rows=rows.filter(c=>c.type==='IDENTITY_DRIFT');return rows;
}
function activeCase(){return CASES.find(c=>c.id===state.activeCaseId)||null}
function setDisabled(selector,disabled){$$(selector).forEach(b=>b.disabled=disabled)}

function page(view){
  $$('.view').forEach(v=>v.classList.remove('active'));const target=$('#view-'+view);if(!target)return;target.classList.add('active');
  $$('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  const titles={overview:'State AgriStack Operations Overview',districts:'District Rollout Control',care:'CARE Reconciliation Workbench',consent:'Consent Ledger & Policy Trace',field:'Farmer & Field Operations',integrations:'Cross-Department Integration Fabric',governance:'Security & Governance Control Plane',reports:'Reports & Audit'};
  $('#pageTitle').textContent=titles[view]||'RAJ-AGRISETU X';window.scrollTo({top:0,behavior:'smooth'});
}
$$('#nav button').forEach(b=>b.onclick=()=>{if(state.role==='field'&&!['field','care','reports'].includes(b.dataset.view))return toast('Field Operator demo scope is limited to assigned field/case surfaces');page(b.dataset.view)});
$$('[data-go]').forEach(b=>b.onclick=()=>page(b.dataset.go));

function renderDistrictOptions(){
  const select=$('#districtFilter');select.innerHTML='<option value="all">All 41 districts</option>'+DISTRICTS.map(d=>`<option>${d}</option>`).join('');
  if(state.role!=='state'){select.value='Barmer';select.disabled=true}else{select.disabled=false;select.value=state.district}
}
function renderKpis(){
  const rows=scopedRows();const avg=k=>Math.round(rows.reduce((a,r)=>a+r[k],0)/Math.max(rows.length,1)*10)/10;
  $('#kDistrict').textContent=scopedDistrict()==='all'?'41':'1';$('#kCare').textContent=scopedCareTotal().toLocaleString('en-IN');$('#kConsent').textContent=avg('consent')+'%';$('#kOffline').textContent=avg('offline')+'%';
  const scope=state.role==='state'?(scopedDistrict()==='all'?'State scope · 41 districts':'State role · '+scopedDistrict()):state.role==='district'?'District Officer · Barmer':'Field Operator · Barmer assignments';
  $('#scopeStamp').textContent=`${scope} · ${state.season}`;$('#rolloutTitle').textContent=scopedDistrict()==='all'?'District Readiness & Exception Matrix':scopedDistrict()+' Readiness & Exception Matrix';
}
function renderRollout(){
  $('#rolloutRows').innerHTML=scopedRows().map(r=>`<tr><td><strong>${r.name}</strong></td><td>${r.registry}%</td><td>${r.land}%</td><td>${r.crop}%</td><td>${r.consent}%</td><td>${r.offline}%</td><td><span class="score" title="Composite: Registry 15%, Land sync 25%, Crop 15%, Consent 15%, Offline 15%, CARE SLA 15%"><i class="${statusClass(r.health)}"></i>${r.health}</span></td><td>${r.cases}</td><td><button class="row-action" data-district-open="${r.name}">Open</button></td></tr>`).join('');
  $$('[data-district-open]').forEach(b=>b.onclick=()=>{if(state.role!=='state'&&b.dataset.districtOpen!=='Barmer')return toast('Outside current role scope');state.district=b.dataset.districtOpen;renderDistrictOptions();renderAll();page('districts')});
}
function clearActiveCase(){
  $('#activeCaseId').textContent='NO REPRESENTATIVE CASE';$('#activeDistrict').textContent='—';$('#activeConflict').textContent='No sample matches the current filter';$('#activeAssertion').textContent='—';$('#activeAuthority').textContent='—';
  for(const id of ['sourceALabel','sourceAValue','sourceAState','sourceBLabel','sourceBValue','sourceBState','farmerAssertionValue'])$('#'+id).textContent='—';
  $('#decisionCell').innerHTML='<span class="status neutral">N/A</span>';$('#activeCaseState').textContent='FILTERED';$('#activeCaseState').className='status neutral';$('#careReceipt').className='receipt-box empty';$('#careReceipt').textContent='Select or broaden the filter to open a representative case.';setDisabled('[data-care]',true);
}
function renderActiveCase(resetReceipt=false){
  const c=activeCase();if(!c)return clearActiveCase();setDisabled('[data-care]',false);$('#activeCaseId').textContent=c.id;$('#activeDistrict').textContent=c.district;$('#activeConflict').textContent=c.exception;$('#activeAssertion').textContent=c.assertion;$('#activeAuthority').textContent=c.authority;
  $('#sourceALabel').textContent=c.sourceA.label;$('#sourceAValue').textContent=c.sourceA.value;$('#sourceAState').textContent=c.sourceA.state;$('#sourceAState').className='status '+evidenceClass(c.sourceA.state);
  $('#sourceBLabel').textContent=c.sourceB.label;$('#sourceBValue').textContent=c.sourceB.value;$('#sourceBState').textContent=c.sourceB.state;$('#sourceBState').className='status '+evidenceClass(c.sourceB.state);$('#farmerAssertionValue').textContent=c.assertion;
  if(resetReceipt){$('#activeCaseState').textContent='NEEDS REVIEW';$('#activeCaseState').className='status risk';$('#decisionCell').innerHTML='<span class="status neutral">PENDING</span>';$('#careReceipt').className='receipt-box empty';$('#careReceipt').textContent='Decision receipt appears here.'}
}
function renderCases(){
  const cases=scopedCases();const before=state.activeCaseId;if(cases.length&&!cases.some(c=>c.id===state.activeCaseId))state.activeCaseId=cases[0].id;if(!cases.length)state.activeCaseId=null;const changed=before!==state.activeCaseId;
  const empty='<tr><td colspan="8">No representative demo case matches this filter.</td></tr>';
  $('#caseRows').innerHTML=cases.length?cases.map(c=>`<tr><td>${c.id}</td><td>${c.district}</td><td>${c.exception}</td><td>${c.age}d</td><td><span class="status ${c.priority==='HIGH'?'risk':'warn'}">${c.priority}</span></td><td>${c.authority}</td><td><button class="row-action" data-case-open="${c.id}">Dispose</button></td></tr>`).join(''):empty.replace('colspan="8"','colspan="7"');
  $('#careRows').innerHTML=cases.length?cases.map(c=>`<tr><td>${c.id}</td><td>${c.district}</td><td>${c.type}</td><td>${c.exception}</td><td>${c.age}d</td><td><span class="status ${c.priority==='HIGH'?'risk':'warn'}">${c.priority}</span></td><td>${c.authority}</td><td><button class="row-action" data-case-open="${c.id}">Open</button></td></tr>`).join(''):empty;
  $$('[data-case-open]').forEach(b=>b.onclick=()=>{const c=CASES.find(x=>x.id===b.dataset.caseOpen);if(!c)return;if(state.role!=='state'&&c.district!=='Barmer')return toast('Outside current role scope');state.activeCaseId=c.id;renderActiveCase(true);page('care')});
  $('#navCaseCount').textContent=scopedCareTotal().toLocaleString('en-IN');$('#caseSampleNote').textContent=`Showing ${cases.length} representative case${cases.length===1?'':'s'} of ${scopedCareTotal().toLocaleString('en-IN')} synthetic open cases in current scope.`;
  if(!cases.length)clearActiveCase();else renderActiveCase(changed);
}
function renderAlerts(){
  const sample=scopedCases(),alerts=[];if(sample.some(x=>x.age>=10))alerts.push(['SLA risk · oldest representative CARE case',sample.find(x=>x.age>=10).id+' requires disposal','now','']);
  if(scopedDistrict()==='all'||scopedDistrict()==='Barmer')alerts.push(['Barmer · land-sync backlog','184 synthetic CARE cases in district demo scope','6m','warn']);alerts.push(['Offline acknowledgement watch','ACK means received; land correction still requires CARE','11m','warn']);
  $('#alerts').innerHTML=alerts.map(a=>`<div class="alert-item"><i class="${a[3]}"></i><div><strong>${a[0]}</strong><span>${a[1]}</span></div><time>${a[2]}</time></div>`).join('');$('#alertCount').textContent=alerts.length;
}
function renderDepartments(){$('#deptHealth').innerHTML=DEPARTMENTS.slice(0,6).map((d,i)=>`<div class="service-item"><div><strong>${d[0]}</strong><span>${d[2]}</span></div><span class="status ${i<2?'good':'neutral'}">${d[1]}</span></div>`).join('')}
function renderProvenance(){
  const rows=[['Farmer ID progress','87,23,010 · PIB/MoA&FW · 20 Jul 2026','https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289025'],['Administrative scope','41 districts · current Rajasthan master','https://rajmasters.rajasthan.gov.in/'],['Land readiness','424/425 online tehsils · e-Dharti reference','https://apnakhata.rajasthan.gov.in/'],['Data class rule','Operational district metrics = SYNTHETIC DEMO',null]];
  $('#provenance').innerHTML=rows.map(x=>`<div class="prov-item"><div><strong>${x[0]}</strong><span>${x[1]}</span></div>${x[2]?`<a style="font-size:6px;color:#2b6698;text-decoration:none;white-space:nowrap;align-self:center" href="${x[2]}" target="_blank" rel="noopener">source ↗</a>`:''}</div>`).join('');
}
function renderActivity(){$('#activity').innerHTML=audits.slice(0,5).map(a=>`<div class="activity-item"><i></i><div><strong>${a[1]} · ${a[2]}</strong><span>${a[3]}</span></div><time>${a[0]}</time></div>`).join('');$('#auditRows').innerHTML=audits.map(a=>`<div class="audit-row"><span>${a[0]}</span><strong>${a[1]}</strong><span>${a[2]}</span><code>${a[3]}</code></div>`).join('')}
function renderDistrictList(){
  const rows=[...scopedRows()].sort((a,b)=>a.health-b.health);$('#districtList').innerHTML=rows.map(r=>`<div class="district-row"><div><strong>${r.name}</strong><span>${r.cases} synthetic open cases · land ${r.land}%</span></div><span class="status ${statusClass(r.health)}" title="Explainable composite readiness">${r.health}</span><button class="row-action" data-district-case="${r.name}">Cases</button></div>`).join('');
  $('#districtListTitle').textContent=scopedDistrict()==='all'?'Risk-first readiness ranking':scopedDistrict()+' readiness';$('#districtCountBadge').textContent=rows.length+'/'+(scopedDistrict()==='all'?41:1);$$('[data-district-case]').forEach(b=>b.onclick=()=>{state.district=b.dataset.districtCase;state.exception='all';$('#exceptionFilter').value='all';renderDistrictOptions();renderAll();page('care')});
}
function renderIntegrations(){$('#integrationGrid').innerHTML=INTEGRATIONS.map(x=>`<article class="integration-card"><small>${x[1]}</small><h3>${x[0]}</h3><p>${x[3]}</p><span class="owner">Authority / owner: ${x[2]}</span></article>`).join('')}
function renderGovernance(){$('#governanceGrid').innerHTML=CONTROLS.map(x=>`<article class="control-card"><small>${x[0].toUpperCase()}</small><h3>${x[1]}</h3><p>${x[2]}</p><b>CONTROL ACTIVE IN DESIGN</b></article>`).join('')}
function renderAll(){renderKpis();renderRollout();renderCases();renderAlerts();renderDepartments();renderProvenance();renderActivity();renderDistrictList();renderIntegrations();renderGovernance()}

$('#roleSelect').onchange=e=>{state.role=e.target.value;state.district=state.role==='state'?'all':'Barmer';state.exception='all';$('#exceptionFilter').value='all';renderDistrictOptions();renderAll();page(state.role==='field'?'field':'overview');toast(state.role==='state'?'State-wide evaluator scope':'Role scope applied: Barmer')};
$('#districtFilter').onchange=e=>{state.district=e.target.value;renderAll()};$('#exceptionFilter').onchange=e=>{state.exception=e.target.value;renderAll()};$('#seasonFilter').onchange=e=>{state.season=e.target.value;renderKpis();audits.unshift([new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),'State MIS','SEASON_CONTEXT_CHANGED',state.season]);renderActivity();toast('Season context changed; synthetic metrics remain labelled')};

async function api(path,opt){try{const r=await fetch(path,opt);if(!r.ok)throw new Error('HTTP '+r.status);return await r.json()}catch{return null}}
async function hydrate(){
  const [h,o,d]=await Promise.all([api('/api/health'),api('/api/state-overview'),api('/api/districts')]);
  if(h){$('#apiState').textContent='API '+h.status;$('#apiDot').style.background='#21a66f'}else{$('#apiState').textContent='API fallback';$('#apiDot').style.background='#d39a45'}
  if(o){$('#kFarmer').textContent=(o.baseline.verified.farmerIds.value/100000).toFixed(2)+'L';$('#kTehsil').textContent=o.baseline.verified.eDhartiOnlineTehsils.value+'/'+o.baseline.verified.eDhartiOnlineTehsils.total}
  if(d&&d.count!==41)toast('District-master contract mismatch detected');
}
$('#refreshBtn').onclick=async()=>{await hydrate();renderAll();toast('Baselines refreshed; synthetic evaluator data remains labelled')};

$$('[data-care]').forEach(b=>b.onclick=async()=>{
  if(state.role==='field')return toast('Field Operator cannot dispose CARE decisions');const c=activeCase();if(!c)return toast('No case selected');const action=b.dataset.care;
  const out=await api('/api/care',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({caseId:c.id,action,district:c.district,type:c.type,farmerId:c.farmerId,summary:c.exception})});
  if(!out)return toast('CARE API unavailable; no state changed');if(out.caseId!==c.id)return toast('CARE receipt case mismatch blocked');
  $('#activeCaseState').textContent=out.state;$('#activeCaseState').className='status '+(out.state==='APPROVED'?'good':out.state==='REJECTED'?'risk':'warn');$('#decisionCell').innerHTML=`<span class="status ${out.state==='APPROVED'?'good':out.state==='REJECTED'?'risk':'warn'}">${out.state}</span>`;
  $('#careReceipt').className='receipt-box';$('#careReceipt').innerHTML=`<code>${out.receipt.eventId}</code><strong>${out.caseId} · ${out.state}</strong><br>${out.notice}<br>Next: ${out.propagation?.next||'CARE_CASE'} · ${out.propagation?.status||''}`;
  if(out.approvalArtifact){localStorage.setItem('rajAgriCareApproval',JSON.stringify(out.approvalArtifact));audits.unshift([new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),'District Verifier','CARE_APPROVAL_ARTIFACT',out.approvalArtifact.receiptId])}
  audits.unshift([new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),'Authorized Verifier','CARE_'+out.state,out.caseId]);renderActivity();toast('CARE decision receipt generated');
});

$('#grantConsent').onclick=async()=>{
  const out=await api('/api/consent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'GRANT',purpose:'SCHEME_PRECHECK',scope:['identity','parcel','crop'],durationHours:24,language:'hi-IN',modality:['text','voice']})});if(!out)return toast('Consent policy service unavailable');
  state.consentId=out.consentId;$('#consentState').textContent='ACTIVE · 24H';$('#consentState').className='status good';$('#consentReceipt').className='receipt-box';
  $('#consentReceipt').innerHTML=`<code>${out.consentId}</code><strong>Purpose:</strong> ${out.purpose}<br><strong>Scope:</strong> ${out.scope.join(' · ')}<br><strong>Expires:</strong> ${new Date(out.expiresAt).toLocaleString()}<br><strong>Excluded:</strong> ${out.notice.dataExcluded.join(' · ')}<br><strong>Architecture:</strong> ${out.architecture?.upstream||'AgriStack consent pattern'}<br>${out.legalNote}`;
  audits.unshift([new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),'SahmatiOS','CONSENT_GRANTED',out.consentId]);renderActivity();toast('Purpose-bound consent issued');
};
$('#revokeConsent').onclick=async()=>{if(!state.consentId)return toast('No active consent to revoke');const out=await api('/api/consent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'REVOKE',consentId:state.consentId})});if(!out)return toast('Consent policy service unavailable');$('#consentState').textContent='REVOKED';$('#consentState').className='status risk';$('#consentReceipt').innerHTML=`<code>${out.consentId}</code><strong>REVOKED</strong><br>${out.legalNote}`;audits.unshift([new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),'SahmatiOS','CONSENT_REVOKED',out.consentId]);state.consentId=null;renderActivity();toast('Consent revoked with comparable in-product action')};

$('#injectCase').onclick=()=>{const suffix=Date.now().toString(36).toUpperCase();const c={id:'CARE-DEMO-'+suffix,district:'Barmer',type:'LAND_MUTATION',exception:'Synthetic mutation changed parcel relationship',age:0,priority:'HIGH',authority:'District Verifier',farmerId:'RAJ-FID-DEMO',sourceA:{label:'Farmer Registry',value:'Prior relationship',state:'STALE'},sourceB:{label:'RoR / mutation',value:'Updated relationship',state:'CURRENT'},assertion:'Farmer confirmation pending'};CASES.unshift(c);state.activeCaseId=c.id;renderAll();renderActiveCase(true);page('care');toast('Synthetic mutation ingested into CARE')};
$('#pingApi').onclick=async()=>{$('#apiOutput').textContent='Checking…';const out=await api('/api/health');$('#apiOutput').textContent=JSON.stringify(out||{status:'unavailable',note:'No Government connectivity implied.'},null,2)};

function csv(name,rows){const text=rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/csv'}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
$('#exportDistricts').onclick=$('#reportDistricts').onclick=()=>csv('raj-agrisetu-district-readiness-demo.csv',[['District','Registry','Land Sync','Crop Survey','Consent','Offline','Health','Open Cases'],...scopedRows().map(r=>[r.name,r.registry,r.land,r.crop,r.consent,r.offline,r.health,r.cases])]);
$('#reportCare').onclick=()=>csv('raj-agrisetu-care-ledger-demo.csv',[['Case','District','Type','Exception','Age','Priority','Authority'],...scopedCases().map(c=>[c.id,c.district,c.type,c.exception,c.age,c.priority,c.authority])]);
$('#reportIntegrations').onclick=()=>csv('raj-agrisetu-integration-truth.csv',[['System','Truth State','Authority','Role'],...INTEGRATIONS]);
$('#appendAudit').onclick=()=>{audits.unshift([new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),'Policy Engine','AUTHORITY_BOUNDARY_CHECK','purpose · source · role · human decision']);renderActivity();toast('Demo audit event appended')};

const map=$('#rajasthanMap');map.onerror=()=>{map.style.display='none';$('#mapFallback').style.display='block'};

function addReleaseControls(){
  const healthHeader=$$('.data-table th').find(x=>x.textContent.trim()==='Health');if(healthHeader)healthHeader.title='Composite readiness = Registry 15% + Land sync 25% + Crop 15% + Consent 15% + Offline 15% + CARE SLA 15%';
  const p=$('.rollout-panel .panel-head p');if(p&&!p.textContent.includes('Composite readiness'))p.textContent+=' Composite readiness is deterministic and explainable; hover Health for weights.';
  const consentIntro=$('#view-consent .section-title p');if(consentIntro)consentIntro.textContent='State consent UX/policy adapter designed to compose with AgriStack Consent Manager architecture. Purpose, itemised scope, duration, notice modality, exclusions and comparable-ease withdrawal are explicit; no statutory Consent Manager registration is claimed.';
  const actions=$('.top-actions');if(actions&&!$('#resetDemo')){const b=document.createElement('button');b.className='btn';b.id='resetDemo';b.textContent='↺ Reset Demo';b.onclick=()=>{localStorage.removeItem('rajAgriCareApproval');localStorage.removeItem('rajAgriQueue');sessionStorage.clear();location.reload()};actions.insertBefore(b,$('#judgeMode'))}
}

const WALK=[
  ['Real Rajasthan operating context','87.23L Farmer IDs, 41 current districts and 424/425 e-Dharti online tehsils establish the verified baseline.'],
  ['Officer-first MIS','The first screen is rollout quality, pendency, source provenance and integration health—not a marketing hero or decorative map.'],
  ['Explainable readiness','Health is a deterministic composite: Registry 15%, Land sync 25%, Crop 15%, Consent 15%, Offline 15%, CARE SLA 15%. All operating values are synthetic demo metrics.'],
  ['Transactional offline farmer workflow','The PWA stores a farmer assertion locally and obtains a server acknowledgement on reconnect. ACK means received—not verified.'],
  ['Human-authority CARE','CARE compares the correct sources for each selected case. A human approval receipt is required before a land relationship can feed downstream pre-checks.'],
  ['AgriStack-aligned consent','SahmatiOS is the Rajasthan UX/policy adapter—not a competing protocol—and is designed to compose with AgriStack consent architecture and applicable DPDP notice requirements.'],
  ['Integration truth','Rajasthan and central rails are visibly labelled sandbox, public reference, contract-ready, architecture-aligned, adapter pattern or live prototype.'],
  ['90-day work-order readiness','The implementation is a production-core + field-validation pilot with measurable acceptance criteria, not an instant statewide replacement claim.']
];
let walkIndex=0;function showWalk(){const w=WALK[walkIndex];$('#modalStep').textContent=(walkIndex+1)+' / '+WALK.length;$('#modalTitle').textContent=w[0];$('#modalText').textContent=w[1];$('#modalBack').style.visibility=walkIndex?'visible':'hidden';$('#modalNext').textContent=walkIndex===WALK.length-1?'Finish':'Next';$('#modal').classList.add('on')}
$('#judgeMode').onclick=()=>{walkIndex=0;showWalk()};$('#modalBack').onclick=()=>{if(walkIndex){walkIndex--;showWalk()}};$('#modalNext').onclick=()=>{if(walkIndex===WALK.length-1)$('#modal').classList.remove('on');else{walkIndex++;showWalk()}};

renderDistrictOptions();renderAll();addReleaseControls();hydrate();
