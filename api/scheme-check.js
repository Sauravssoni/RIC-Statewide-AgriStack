module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'method_not_allowed'});}
  const x=req.body||{};
  const checks=[['farmerId',Boolean(x.farmerId)],['district',Boolean(x.district)],['crop',Boolean(x.crop)],['verifiedParcelCount',(x.verifiedParcelCount||0)>=1],['purposeConsent',Boolean(x.purposeConsent)]];
  const missing=checks.filter(([,ok])=>!ok).map(([k])=>k);
  res.status(200).json({mode:'EVALUATOR_DEMO',result:missing.length?'MISSING_INPUT':'PRECHECK_READY',missing,trace:checks.map(([rule,pass])=>({rule,pass,source:rule==='verifiedParcelCount'?'CARE_ACKNOWLEDGED_RELATION':rule==='purposeConsent'?'SAHMATI_PURPOSE_RECEIPT':'DEMO_VERIFIED_INPUT'})),authorityBoundary:'This deterministic endpoint does not grant statutory eligibility, approve benefits, or overwrite a Government source system.'});
};
