module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'method_not_allowed'});}
  const x=req.body||{};
  const action=String(x.action||'GRANT').toUpperCase();
  if(action==='REVOKE'){
    if(!x.consentId)return res.status(400).json({error:'consent_id_required'});
    return res.status(200).json({mode:'EVALUATOR_DEMO',consentId:x.consentId,state:'REVOKED',revokedAt:new Date().toISOString(),legalNote:'Prototype policy receipt; no statutory Consent Manager status is claimed.'});
  }
  if(action!=='GRANT')return res.status(400).json({error:'invalid_action'});
  if(!x.purpose||!Array.isArray(x.scope)||!x.scope.length)return res.status(400).json({error:'purpose_and_scope_required'});
  const allowedScope=new Set(['identity','parcel','crop']);
  const scope=[...new Set(x.scope.map(String))];
  if(scope.some(s=>!allowedScope.has(s)))return res.status(400).json({error:'scope_not_permitted',allowed:[...allowedScope]});
  const hours=Math.min(24,Math.max(1,Number(x.durationHours||24)));
  const id='RAJ-SHM-'+Math.random().toString(16).slice(2,10).toUpperCase();
  res.status(201).json({
    mode:'EVALUATOR_DEMO',consentId:id,state:'ACTIVE',purpose:String(x.purpose),scope,durationHours:hours,
    notice:{language:x.language||'hi-IN',modality:Array.isArray(x.modality)?x.modality:['text'],dataExcluded:['bank_account','family_income','unrelated_household_data']},
    revocable:true,createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+hours*3600000).toISOString(),
    legalNote:'Prototype purpose-policy receipt. This service is not represented as a registered statutory Consent Manager.'
  });
};
