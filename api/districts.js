const districts=['Ajmer','Alwar','Balotra','Banswara','Baran','Barmer','Beawar','Bharatpur','Bhilwara','Bikaner','Bundi','Chittorgarh','Churu','Dausa','Deeg','Dholpur','Didwana-Kuchaman','Dungarpur','Hanumangarh','Jaipur','Jaisalmer','Jalore','Jhalawar','Jhunjhunu','Jodhpur','Karauli','Khairthal-Tijara','Kota','Kotputli-Behror','Nagaur','Pali','Phalodi','Pratapgarh','Rajsamand','Salumber','Sawai Madhopur','Sikar','Sirohi','Sri Ganganagar','Tonk','Udaipur'];
const seeded={Barmer:[94,88,91,97,82,72,184],Jaisalmer:[95,91,89,98,84,76,126],Jodhpur:[98,96,95,98,93,92,58],Jaipur:[99,98,97,99,97,96,34],Bikaner:[97,95,94,98,90,90,61],Udaipur:[96,94,92,97,86,87,72],Kota:[98,97,96,99,95,94,41],Banswara:[94,90,88,96,81,78,119],Ajmer:[97,96,94,98,92,91,52],Alwar:[96,93,92,97,89,86,73]};
function metrics(name,index){const x=seeded[name]||[94+(index%5),91+(index*3%7),90+(index*5%8),96+(index%4),83+(index*7%12),80+(index*11%15),45+(index*17%89)];return {registryPct:x[0],landSyncPct:x[1],cropSurveyPct:x[2],consentPct:x[3],offlineReachPct:x[4],healthScore:x[5],openCases:x[6]}}
module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'method_not_allowed'});}
  const rows=districts.map((name,index)=>({name,...metrics(name,index),dataClass:'SYNTHETIC_OPERATIONAL_KPI'}));
  const requested=String(req.query?.district||'').trim();
  if(requested){const row=rows.find(x=>x.name.toLowerCase()===requested.toLowerCase());if(!row)return res.status(404).json({error:'district_not_found'});return res.status(200).json({mode:'EVALUATOR_DEMO',asOf:'2026-08-26',source:{districtMaster:'RajMasters-compatible current Rajasthan master',districtCount:41},district:row});}
  res.status(200).json({mode:'EVALUATOR_DEMO',asOf:'2026-08-26',count:rows.length,source:{districtMaster:'RajMasters-compatible current Rajasthan master',districtCount:41,operationalMetrics:'Deterministic synthetic evaluator data'},districts:rows});
};
