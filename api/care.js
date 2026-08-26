const crypto=require('crypto');

const CASES={
  'CARE-RAJ-2026-001284':{district:'Barmer',type:'LAND_MUTATION',priority:'HIGH',farmerId:'RAJ-FID-000284',summary:'Farmer Registry 2 vs RoR 3 parcels',sourceA:{label:'Farmer Registry',value:'2 parcels',state:'CONFLICT'},sourceB:{label:'RoR / sanctioned mutation',value:'3 parcels',state:'CURRENT'},farmerAssertion:'Third parcel confirmed',requiredAuthority:'District Verifier'},
  'CARE-RAJ-2026-001219':{district:'Banswara',type:'IDENTITY_DRIFT',priority:'MEDIUM',farmerId:'RAJ-FID-000219',summary:'Identity name/relation mismatch',sourceA:{label:'Farmer Registry',value:'Kamli Devi · spouse relation',state:'CONFLICT'},sourceB:{label:'Jan Aadhaar reference',value:'Kamla Devi · verified relation',state:'CURRENT'},farmerAssertion:'Correction requested',requiredAuthority:'Tehsil Verifier'},
  'CARE-RAJ-2026-001178':{district:'Jaisalmer',type:'CROP_CONFLICT',priority:'MEDIUM',farmerId:'RAJ-FID-000178',summary:'Farmer crop assertion vs digital crop survey',sourceA:{label:'Farmer crop assertion',value:'Mustard',state:'ASSERTED'},sourceB:{label:'Crop survey',value:'Gram',state:'CURRENT'},farmerAssertion:'Mustard asserted with field evidence',requiredAuthority:'Agriculture Officer'},
  'CARE-RAJ-2026-001142':{district:'Barmer',type:'LAND_MUTATION',priority:'HIGH',farmerId:'RAJ-FID-000142',summary:'Sanctioned mutation awaiting Farmer Registry relationship sync',sourceA:{label:'Farmer Registry',value:'Old parcel relationship',state:'STALE'},sourceB:{label:'RoR / sanctioned mutation',value:'Updated parcel relationship',state:'CURRENT'},farmerAssertion:'Farmer acknowledged mutation',requiredAuthority:'District Verifier'},
  'CARE-RAJ-2026-001097':{district:'Jodhpur',type:'LAND_MUTATION',priority:'MEDIUM',farmerId:'RAJ-FID-000097',summary:'Parcel relationship changed after mutation',sourceA:{label:'Farmer Registry',value:'Pre-mutation relationship',state:'STALE'},sourceB:{label:'RoR / mutation',value:'Post-mutation relationship',state:'CURRENT'},farmerAssertion:'No additional evidence requested yet',requiredAuthority:'District Verifier'}
};

function makeReceipt(caseId,action,state){return {eventId:'EVT-'+crypto.createHash('sha256').update(caseId+'|'+action+'|'+Date.now()).digest('hex').slice(0,18),authority:'AUTHORIZED_ROLE_DEMO',timestamp:new Date().toISOString(),state};}
function normaliseCase(id,body){
  if(CASES[id])return {id,...CASES[id]};
  if(/^CARE-DEMO-[A-Z0-9-]{4,40}$/.test(id||''))return {id,district:String(body.district||'Barmer'),type:String(body.type||'LAND_MUTATION'),priority:'HIGH',farmerId:String(body.farmerId||'RAJ-FID-DEMO'),summary:String(body.summary||'Synthetic evaluator exception'),sourceA:{label:'Source A',value:'Prior state',state:'CONFLICT'},sourceB:{label:'Source B',value:'Current state',state:'CURRENT'},farmerAssertion:'Synthetic evaluator assertion',requiredAuthority:'District Verifier'};
  return null;
}

module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method==='GET')return res.status(200).json({mode:'EVALUATOR_DEMO',cases:Object.entries(CASES).map(([id,x])=>({id,...x,state:'NEEDS_REVIEW'})),authorityBoundary:'Source facts, farmer assertions and official decisions remain distinct. Authoritative Government state changes require approved downstream systems and authorized personnel.'});
  if(req.method==='POST'){
    const body=req.body||{};const action=String(body.action||'').toUpperCase();const caseId=String(body.caseId||'CARE-RAJ-2026-001284');
    if(!['APPROVE','REQUEST_EVIDENCE','REJECT'].includes(action))return res.status(400).json({error:'invalid_action'});
    const c=normaliseCase(caseId,body);if(!c)return res.status(404).json({error:'case_not_found'});
    const state=action==='APPROVE'?'APPROVED':action==='REJECT'?'REJECTED':'EVIDENCE_REQUESTED';const receipt=makeReceipt(caseId,action,state);
    const approvalArtifact=state==='APPROVED'&&c.type==='LAND_MUTATION'?{artifactType:'CARE_HUMAN_APPROVAL',farmerId:c.farmerId,careCaseId:caseId,verifiedParcelRelationship:true,verifiedParcelCount:caseId==='CARE-RAJ-2026-001284'?3:null,receiptId:receipt.eventId,approvedAt:receipt.timestamp,scope:'EVALUATOR_SESSION_ONLY'}:null;
    return res.status(200).json({mode:'EVALUATOR_DEMO',caseId,farmerId:c.farmerId,district:c.district,type:c.type,action,state,receipt,approvalArtifact,propagation:state==='APPROVED'?{next:'AUTHORIZED_REGISTRY_ADAPTER',status:'DEMO_ONLY_NOT_SENT'}:{next:'CARE_CASE',status:state},notice:'Synthetic evaluator decision. No Government source record was mutated by this endpoint.'});
  }
  res.setHeader('Allow','GET, POST');return res.status(405).json({error:'method_not_allowed'});
};
