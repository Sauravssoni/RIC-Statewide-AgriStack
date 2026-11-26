const crypto=require('node:crypto');
const {neon}=require('@neondatabase/serverless');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const now=()=>new Date().toISOString();
const CASE={id:'CARE-DEMO-BARMER-001',farmer:'Kamla Devi (fictional)',district:'Barmer',crop:'Mustard',registry:['KH-214/1','KH-214/2'],ror:['KH-214/1','KH-214/2','KH-214/3'],sourceVersion:'DEMO-ROR-MUT-03',sourceTime:'2026-11-20T10:30:00+05:30'};
const CASES={barmer:CASE,bikaner:{id:'CARE-DEMO-BIKANER-002',farmer:'Demo farmer B (fictional)',district:'Bikaner',crop:'Bajra',registry:['KH-301/1','KH-301/9'],ror:['KH-301/1','KH-301/2'],sourceVersion:'DEMO-ROR-MUT-04',sourceTime:'2026-11-22T09:00:00+05:30'},kota:{id:'CARE-DEMO-KOTA-003',farmer:'Demo farmer C (fictional)',district:'Kota',crop:'Wheat',registry:['KH-510/1'],ror:['KH-510/1','KH-510/2','KH-510/3'],sourceVersion:'DEMO-ROR-MUT-05',sourceTime:'2026-11-24T09:00:00+05:30'}};
function diff(c){return {missing:c.ror.filter(p=>!c.registry.includes(p)),extra:c.registry.filter(p=>!c.ror.includes(p)),matched:c.registry.filter(p=>c.ror.includes(p))}}
function initial(scenario='barmer'){if(!Object.hasOwn(CASES,scenario))throw Object.assign(new Error('UNKNOWN_SCENARIO'),{status:400});return {case:CASES[scenario],scenario,status:'NEEDS_REVIEW',assertion:null,decision:null,consent:null,precheck:null,events:[],receipts:{}}}
function catalog(){return Object.entries(CASES).map(([scenario,c])=>({scenario,district:c.district,crop:c.crop,caseId:c.id,...diff(c)}))}
function publicState(row){const state=structuredClone(row.state);if(state.consent?.status==='ACTIVE'&&Date.parse(state.consent.expiresAt)<=Date.now()){state.consent.status='EXPIRED';state.precheck=null}return {id:row.id,version:row.version,...state,...diff(state.case),catalog:catalog(),effectiveParcels:state.status==='APPROVED'?state.case.ror:diff(state.case).matched,storage:'POSTGRESQL',authority:'SYNTHETIC_EVALUATOR_ONLY',updatedAt:row.updated_at}}
function apply(state,action,eventId){const s=structuredClone(state);const t=now();let type=action;
const fail=(msg)=>{throw Object.assign(new Error(msg),{status:409})};
switch(action){
case 'SYNC_ASSERTION':if(!['NEEDS_REVIEW','EVIDENCE_REQUESTED'].includes(s.status))fail('CASE_NOT_OPEN');s.assertion={parcels:diff(s.case).missing,removedLinks:diff(s.case).extra,receivedAt:t,ack:'ACK-'+eventId,source:'FICTIONAL_FARMER_ASSERTION'};s.status='ASSERTION_RECEIVED';break;
case 'REQUEST_EVIDENCE':if(s.status!=='ASSERTION_RECEIVED')fail('ASSERTION_REQUIRED');s.status='EVIDENCE_REQUESTED';break;
case 'APPROVE':case 'REJECT':if(s.status!=='ASSERTION_RECEIVED')fail('ASSERTION_REQUIRED');s.status=action==='APPROVE'?'APPROVED':'REJECTED';s.decision={state:s.status,actor:'DEMO_DISTRICT_VERIFIER',at:t,verifiedParcelCount:action==='APPROVE'?s.case.ror.length:null,effectiveParcels:action==='APPROVE'?[...s.case.ror]:[],sourceWrite:false};s.precheck=null;break;
case 'GRANT_CONSENT':if(s.status!=='APPROVED')fail('CARE_APPROVAL_REQUIRED');if(s.consent?.status==='ACTIVE'&&Date.parse(s.consent.expiresAt)>Date.now())fail('CONSENT_ALREADY_ACTIVE');s.consent={id:'CONSENT-'+eventId,status:'ACTIVE',purpose:'DEMO_SCHEME_READINESS',scope:['identity_reference','parcel_relationship','crop'],grantedAt:t,expiresAt:new Date(Date.now()+86400000).toISOString()};s.precheck=null;break;
case 'REVOKE_CONSENT':if(s.consent?.status!=='ACTIVE')fail('ACTIVE_CONSENT_REQUIRED');s.consent.status='REVOKED';s.consent.revokedAt=t;s.precheck=null;break;
case 'PRECHECK':{const checks={careApproved:s.status==='APPROVED',parcelCount:s.decision?.verifiedParcelCount>=1,crop:!!s.case.crop,consent:s.consent?.status==='ACTIVE'&&Date.parse(s.consent.expiresAt)>Date.now()&&s.consent.purpose==='DEMO_SCHEME_READINESS'};s.precheck={result:Object.values(checks).every(Boolean)?'PRECHECK_READY':'BLOCKED',checks,at:t,statutoryEligibility:false};break}
default:throw Object.assign(new Error('UNKNOWN_ACTION'),{status:400});
}
const previous=s.events.at(-1)?.hash||'GENESIS';const entry={id:eventId,action,type,at:t,state:s.status,previous};entry.hash=hash(JSON.stringify(entry));s.events.push(entry);s.receipts[eventId]={action,hash:entry.hash,at:t};return s}
module.exports=async(req,res)=>{res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');try{
if(!process.env.AGRISETU_DATABASE_URL)return res.status(503).json({error:'DATABASE_NOT_CONFIGURED'});
const sql=neon(process.env.AGRISETU_DATABASE_URL);const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
if(req.method==='POST'&&body.action==='CREATE'){
const token=crypto.randomBytes(32).toString('hex'),id=crypto.randomUUID();
const rows=await sql`INSERT INTO evaluator_sessions(id,token_hash,state) SELECT ${id}::uuid,${hash(token)},${JSON.stringify(initial(String(body.scenario||'barmer')))}::jsonb WHERE (SELECT count(*) FROM evaluator_sessions)<1000 RETURNING *`;
if(!rows.length)return res.status(429).json({error:'DEMO_CAPACITY_REACHED'});return res.status(201).json({token,session:publicState(rows[0])});
}
const auth=String(req.headers.authorization||'');const token=auth.startsWith('Bearer ')?auth.slice(7):'';if(!/^[a-f0-9]{64}$/.test(token))return res.status(401).json({error:'SESSION_TOKEN_REQUIRED'});
const rows=await sql`SELECT * FROM evaluator_sessions WHERE token_hash=${hash(token)} AND created_at>now()-interval '7 days'`;if(!rows.length)return res.status(404).json({error:'SESSION_NOT_FOUND'});
const row=rows[0];if(req.method==='GET')return res.status(200).json({session:publicState(row)});
if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'METHOD_NOT_ALLOWED'})}
const action=String(body.action||''),eventId=String(body.eventId||'');if(!/^[a-zA-Z0-9-]{16,64}$/.test(eventId))return res.status(400).json({error:'EVENT_ID_REQUIRED'});
if(row.state.receipts[eventId]){if(row.state.receipts[eventId].action!==action)return res.status(409).json({error:'EVENT_ID_CONFLICT'});return res.status(200).json({session:publicState(row),duplicate:true,receipt:row.state.receipts[eventId]})}
if(row.version>=100)return res.status(429).json({error:'SESSION_EVENT_LIMIT'});
if(!Number.isInteger(body.version)||body.version!==row.version)return res.status(409).json({error:'VERSION_CONFLICT',session:publicState(row)});
const next=apply(row.state,action,eventId);
const updated=await sql`UPDATE evaluator_sessions SET version=version+1,state=${JSON.stringify(next)}::jsonb,updated_at=now() WHERE id=${row.id}::uuid AND version=${row.version} RETURNING *`;
if(!updated.length)return res.status(409).json({error:'VERSION_CONFLICT_RELOAD'});
return res.status(200).json({session:publicState(updated[0]),receipt:next.receipts[eventId]});
}catch(e){return res.status(e.status||500).json({error:e.status?e.message:'SERVER_OPERATION_FAILED'});}};
module.exports.apply=apply;module.exports.initial=initial;module.exports.diff=diff;