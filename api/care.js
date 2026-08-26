const crypto=require('crypto');
const cases=[{id:'CARE-RAJ-2026-001284',district:'Barmer',type:'LAND_MUTATION',priority:'HIGH',state:'NEEDS_REVIEW',farmerId:'RAJ-FID-000284',sourceFacts:{farmerRegistryParcels:2,rorParcels:3},farmerAssertion:'CONFIRMED_THIRD_PARCEL',requiredAuthority:'DISTRICT_VERIFIER'}];
function receipt(caseId,action,state){return {eventId:'EVT-'+crypto.createHash('sha256').update(caseId+'|'+action+'|'+Date.now()).digest('hex').slice(0,16),authority:'DISTRICT_VERIFIER_DEMO',timestamp:new Date().toISOString(),state}}
module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method==='GET')return res.status(200).json({mode:'EVALUATOR_DEMO',cases,authorityBoundary:'Source facts and farmer assertions remain distinct; authoritative state changes require an authorized Government workflow.'});
  if(req.method==='POST'){
    const action=(req.body&&req.body.action)||'NONE';
    if(!['APPROVE','REQUEST_EVIDENCE','REJECT'].includes(action))return res.status(400).json({error:'invalid_action'});
    const state=action==='APPROVE'?'APPROVED':action==='REJECT'?'REJECTED':'EVIDENCE_REQUESTED';
    return res.status(200).json({caseId:cases[0].id,action,state,receipt:receipt(cases[0].id,action,state),propagation:action==='APPROVE'?{next:'AUTHORIZED_REGISTRY_ADAPTER',status:'DEMO_ONLY_NOT_SENT'}:{next:'CARE_CASE',status:state},notice:'Synthetic evaluator response; no Government record was changed.'});
  }
  res.setHeader('Allow','GET, POST');res.status(405).json({error:'method_not_allowed'});
};
