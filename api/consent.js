module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'method_not_allowed'});}
  const x=req.body||{};
  const action=String(x.action||'GRANT').toUpperCase();
  if(action==='REVOKE'){
    if(!x.consentId)return res.status(400).json({error:'consent_id_required'});
    return res.status(200).json({mode:'EVALUATOR_DEMO',consentId:x.consentId,state:'REVOKED',revokedAt:new Date().toISOString(),withdrawal:{method:'same-product revoke action',comparableEase:true},legalNote:'Prototype State consent UX/policy receipt. No statutory Consent Manager registration is claimed.'});
  }
  if(action!=='GRANT')return res.status(400).json({error:'invalid_action'});
  if(!x.purpose||!Array.isArray(x.scope)||!x.scope.length)return res.status(400).json({error:'purpose_and_scope_required'});
  const allowedScope=new Set(['identity','parcel','crop']);
  const scope=[...new Set(x.scope.map(String))];
  if(scope.some(s=>!allowedScope.has(s)))return res.status(400).json({error:'scope_not_permitted',allowed:[...allowedScope]});
  const hours=Math.min(24,Math.max(1,Number(x.durationHours||24)));
  const id='RAJ-SHM-'+Math.random().toString(16).slice(2,10).toUpperCase();
  const purpose=String(x.purpose);
  res.status(201).json({
    mode:'EVALUATOR_DEMO',consentId:id,state:'ACTIVE',purpose,scope,durationHours:hours,
    architecture:{role:'STATE_CONSENT_UX_POLICY_ADAPTER',upstream:'AGRISTACK_CONSENT_MANAGER_PATTERN',designBasis:'AgriStack consent architecture / DEPA-compatible pattern'},
    notice:{
      language:x.language||'hi-IN',
      modality:Array.isArray(x.modality)?x.modality:['text'],
      itemisedData:scope,
      specifiedPurpose:purpose,
      purposeDescription:'Use the minimum selected farmer data only to run the requested scheme-readiness pre-check.',
      dataExcluded:['bank_account','family_income','unrelated_household_data'],
      withdrawalMethod:'Same product revoke action; production link/method supplied by authorized Data Fiduciary.',
      rightsMethod:'Production notice will link the applicable Data Principal rights channel.',
      grievanceMethod:'Production notice will link the department/Board complaint channel as legally applicable.'
    },
    revocable:true,createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+hours*3600000).toISOString(),
    complianceNote:'Notice model is designed toward the clear, itemised, purpose-specific and comparable-ease withdrawal principles in the notified DPDP Rules 2025, subject to applicable commencement dates, departmental legal review and the actual lawful basis for each production processing activity.',
    legalNote:'Prototype State consent UX/policy adapter. It complements the approved AgriStack consent architecture and is not represented as a registered statutory Consent Manager.'
  });
};
