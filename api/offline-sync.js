const crypto=require('crypto');

function stableHash(value){return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0,24)}

module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){
    res.setHeader('Allow','POST');
    return res.status(405).json({error:'method_not_allowed'});
  }
  const body=req.body||{};
  const transactions=Array.isArray(body.transactions)?body.transactions:[];
  if(!transactions.length||transactions.length>25)return res.status(400).json({error:'transactions_required',maxBatch:25});
  const acknowledged=[];const rejected=[];
  for(const txn of transactions){
    if(!txn||!txn.id||!txn.kind||!txn.createdAt){rejected.push({id:txn&&txn.id||'UNKNOWN',reason:'MALFORMED_TRANSACTION'});continue}
    const supported=['PARCEL_CONFIRMATION','PURPOSE_CONSENT','ASSISTED_CASE'];
    if(!supported.includes(txn.kind)){rejected.push({id:txn.id,reason:'UNSUPPORTED_KIND'});continue}
    const receiptId='ACK-'+stableHash({id:txn.id,kind:txn.kind,createdAt:txn.createdAt});
    acknowledged.push({
      id:txn.id,
      kind:txn.kind,
      state:'ACKNOWLEDGED',
      receiptId,
      receivedAt:new Date().toISOString(),
      revalidationRequired:txn.kind==='PARCEL_CONFIRMATION',
      nextSystem:txn.kind==='PARCEL_CONFIRMATION'?'CARE_RECONCILIATION':txn.kind==='PURPOSE_CONSENT'?'CONSENT_POLICY_ENGINE':'ASSISTED_SERVICE_QUEUE'
    });
  }
  return res.status(rejected.length&& !acknowledged.length?422:200).json({
    mode:'EVALUATOR_DEMO',
    acknowledged,
    rejected,
    authorityBoundary:'Acknowledgement means the transaction reached the evaluator service. It does not mutate a Government source system or establish legal entitlement.',
    serverTime:new Date().toISOString()
  });
};
