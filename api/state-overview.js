const BASELINE={
  asOf:'2026-08-26',
  verified:{
    districts:{value:41,source:'RajMasters / Rajasthan current district master',sourceUrl:'https://rajmasters.rajasthan.gov.in/',sourceDate:'2026-08-26'},
    eDhartiOnlineTehsils:{value:424,total:425,source:'e-Dharti / DILRMP Rajasthan',sourceUrl:'https://apnakhata.rajasthan.gov.in/',sourceDate:'2026-08-26'},
    farmerIds:{value:8723010,source:'PIB / Ministry of Agriculture & Farmers Welfare',sourceUrl:'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289025',sourceDate:'2026-07-20'}
  },
  demo:{registryFreshnessPct:96.8,openReconciliations:1284,offlineSyncPct:99.2,consentIntegrityPct:97.6}
};
module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'method_not_allowed'});}
  res.status(200).json({mode:'EVALUATOR_DEMO',baseline:BASELINE,retrievedAt:new Date().toISOString(),notice:'Verified aggregate baselines are separated from deterministic synthetic operational KPIs. Source URLs are supplied for evaluator provenance.'});
};
