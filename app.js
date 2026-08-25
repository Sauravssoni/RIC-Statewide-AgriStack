(() => {
  const DATA = window.RAJ_DATA;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  let offline = false, map, markers = [], sutraStep = 0, consentActive = false, caseResolved = false, demoStep=0;
  const titles = {command:'State AgriStack Command Centre',registry:'Federated Registry Operations',care:'CARE Reconciliation',consent:'SahmatiOS Consent Management',farmer:'Farmer 360',schemes:'Scheme Compiler',exchange:'AgriStack Exchange',sutra:'SUTRA-ID Edge Assisted Access',audit:'Audit, Security & Governance',pilot:'90-Day Pilot & Statewide Vision'};

  function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._x); t._x=setTimeout(()=>t.classList.remove('show'),2600); }
  function view(name){ $$('.view').forEach(v=>v.classList.remove('active')); $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===name)); $('#view-'+name).classList.add('active'); $('#pageTitle').textContent=titles[name]||''; window.scrollTo({top:0,behavior:'smooth'}); $('.sidebar').classList.remove('open'); if(name==='command'&&map) setTimeout(()=>map.invalidateSize(),100); }
  $$('.nav-item').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
  $$('[data-jump]').forEach(b=>b.addEventListener('click',()=>view(b.dataset.jump)));
  $('#menuBtn').addEventListener('click',()=>$('.sidebar').classList.toggle('open'));

  function splash(){ const bar=$('#splashBar'), txt=$('#splashText'); const stages=[[24,'Loading state integration contracts…'],[50,'Starting CARE reconciliation engine…'],[76,'Preparing Sahmati consent ledger…'],[100,'Control Tower ready.']]; stages.forEach(([w,t],i)=>setTimeout(()=>{bar.style.width=w+'%';txt.textContent=t;if(w===100)setTimeout(()=>$('#splash').classList.add('hide'),380)},250+i*360)); }

  function initMap(){ if(!window.L){ $('#map').innerHTML='<div style="padding:24px;color:#65778a">Interactive base map unavailable. District operational drilldown remains available.</div>'; return; }
    map=L.map('map',{zoomControl:true,attributionControl:false}).setView([26.9,74.4],6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:10,attribution:'© OpenStreetMap contributors'}).addTo(map);
    const colors={good:'#18815c',mid:'#c98425',risk:'#bd3e3e'};
    DATA.districts.forEach(d=>{ const m=L.circleMarker([d.lat,d.lng],{radius:9,color:'#fff',weight:2,fillColor:colors[d.level],fillOpacity:.92}).addTo(map); m.bindTooltip(`${d.name} · ${d.score}/100`); m.on('click',()=>selectDistrict(d)); markers.push(m); });
  }
  function selectDistrict(d){ $('#districtName').textContent=d.name; const s=$('#districtScore'); s.textContent=d.score+' / 100'; s.className='score-badge '+d.level; $('#mFresh').textContent=d.fresh;$('#mLand').textContent=d.land;$('#mConsent').textContent=d.consent;$('#mCases').textContent=d.cases;$('#districtInsight').textContent=d.insight; }

  function renderQueue(){ const q=$('#queue'); q.innerHTML=''; DATA.queue.forEach(r=>{ const div=document.createElement('div'); div.className='queue-item'; div.innerHTML=`<b>${r.id}</b><span>${r.district}</span><span>${r.issue}</span><span>${r.age}</span><span class="priority ${r.priority}">${r.priority}</span><button class="btn ghost">Open</button>`; div.querySelector('button').addEventListener('click',()=>toast(`Opened ${r.id} · demo record`)); q.appendChild(div); }); }
  function renderIntegrations(){ const root=$('#integrations'); DATA.integrations.forEach(x=>{ const d=document.createElement('article');d.className='integration';d.innerHTML=`<div class="integration-head"><div><b>${x.name}</b><small>${x.owner}</small></div><span class="state-pill">${x.state}</span></div><p>${x.desc}</p>`;root.appendChild(d);}); }
  function renderAudit(){ const root=$('#auditLog'); root.innerHTML=''; DATA.audit.slice().reverse().forEach(a=>{ const d=document.createElement('div');d.className='audit-row';d.innerHTML=`<code>${a.time}</code><b>${a.actor}</b><span>${a.event}</span><span>${a.detail}</span><code>${a.hash}</code>`;root.appendChild(d);}); }

  $('#offlineBtn').addEventListener('click',()=>{ offline=!offline; $('#offlineBtn').textContent=offline?'Return online':'Simulate offline'; $('#syncLabel').textContent=offline?'Transactional offline mode':'Network online'; $('.pulse').style.background=offline?'#d18a23':'#16a66d'; toast(offline?'Offline: new transactions will be signed and queued locally.':'Network restored: queued events can synchronize.'); });
  $('#approveCase').addEventListener('click',()=>{ if(caseResolved)return toast('Case already resolved in this demo.'); caseResolved=true; $('#caseStatus').className='tag live';$('#caseStatus').textContent='APPROVED';$('#officerDecision').innerHTML='<span class="mini ok">APPROVED</span>';$('#openCasesKpi').textContent='1,283';$('#parcelCount').textContent='3 of 3 linked';$('#landReady').textContent='3/3 verified';$('#profileHealth').textContent='96';$('#graphNewFarm').classList.remove('pending'); DATA.audit.push({time:new Date().toLocaleTimeString('en-GB',{hour12:false}).slice(0,8),actor:'District Verifier',event:'RECONCILIATION_APPROVED',detail:'Parcel relationship accepted against mutation evidence',hash:'c4f2…91ab'});renderAudit();toast('Reconciliation approved; demo downstream propagation receipt generated.'); });
  $('#evidenceCase').addEventListener('click',()=>toast('Evidence request generated for assisted farmer channel.'));
  $('#rejectCase').addEventListener('click',()=>{ $('#caseStatus').className='tag risk';$('#caseStatus').textContent='REJECTED';toast('Demo case rejected with reason-required workflow.'); });
  $('#newMismatchBtn').addEventListener('click',()=>{ const id='CARE-'+String(1300+DATA.queue.length); DATA.queue.unshift({id,district:'Jodhpur',type:'LAND',issue:'Demo mutation changes parcel relationship after registry snapshot',age:'now',priority:'High'});renderQueue();toast('Synthetic mutation event ingested into CARE queue.'); });

  $('#grantConsent').addEventListener('click',()=>{ consentActive=true; const id='RAJ-SHM-'+Math.random().toString(16).slice(2,8).toUpperCase();$('#receiptId').textContent=id;$('#receiptEmpty').classList.add('hidden');$('#receipt').classList.remove('hidden');$('#consentState').className='tag live';$('#consentState').textContent='ACTIVE · 24H';DATA.audit.push({time:new Date().toLocaleTimeString('en-GB',{hour12:false}).slice(0,8),actor:'Kamla Devi · demo',event:'PURPOSE_CONSENT_GRANTED',detail:'Land + crop + identity for scheme readiness only',hash:'a1d7…c02e'});renderAudit();toast('Purpose consent receipt issued.'); });
  $('#denyConsent').addEventListener('click',()=>toast('Consent declined. No protected data is released to the requesting workflow.'));
  $('#revokeConsent').addEventListener('click',()=>{ consentActive=false;$('#consentState').className='tag risk';$('#consentState').textContent='REVOKED';toast('Consent revoked; subsequent purpose requests require fresh authorization.'); });

  $$('.traceBtn').forEach(b=>b.addEventListener('click',()=>$('#ruleTrace').classList.remove('hidden')));$('#runScheme').addEventListener('click',()=>{$('#ruleTrace').classList.remove('hidden');toast('Deterministic rule trace executed. AI explanation layer remains advisory.');});

  const sutraSteps=[
    {screen:['किसान रिकॉर्ड','“मेरे किसान रिकॉर्ड में मेरा दूसरा खेत नहीं दिख रहा।”'],speaker:'farmer',text:'मेरे किसान रिकॉर्ड में मेरा दूसरा खेत नहीं दिख रहा।'},
    {screen:['रिकॉर्ड जाँच','Farmer Registry: 2 parcels · Land source: 3 parcels'],speaker:'assistant',text:'मुझे एक अंतर मिला है। किसान रजिस्ट्री में 2 खेत हैं, भूमि स्रोत में 3।'},
    {screen:['पुष्टि आवश्यक','क्या खसरा 156/4 आपका नया नामांतरित खेत है?'],speaker:'assistant',text:'क्या खसरा 156/4 आपका नया नामांतरित खेत है?'},
    {screen:['किसान पुष्टि','हाँ — पुष्टि दर्ज की गई'],speaker:'farmer',text:'हाँ, यह मेरा खेत है।'},
    {screen:['ऑफलाइन रसीद','Evidence-linked transaction signed locally'],speaker:'assistant',text:'आपकी पुष्टि सुरक्षित रूप से दर्ज है। नेटवर्क मिलने पर अधिकृत प्रणाली में भेजी जाएगी।'}
  ];
  $('#sutraNext').addEventListener('click',()=>{ if(sutraStep>=sutraSteps.length){sutraStep=0;$('#sutraTranscript').innerHTML='<div class="system">BHASHINI / domain ASR adapter ready</div>';$('#queueCount').textContent='0';$('#downloadReceipt').disabled=true;$('#sutraNext').textContent='Start assisted flow';return;} const s=sutraSteps[sutraStep];$('#sutraStage').innerHTML=`<span>${s.screen[0]}</span><b>${s.screen[1]}</b>`;const line=document.createElement('div');line.className=s.speaker;line.textContent=s.text;$('#sutraTranscript').appendChild(line);$('#sutraTranscript').scrollTop=$('#sutraTranscript').scrollHeight;sutraStep++;$('#sutraState').textContent=sutraStep===sutraSteps.length?'RECEIPT READY':'IN PROGRESS';if(sutraStep===sutraSteps.length){$('#queueCount').textContent=offline?'1':'0';$('#downloadReceipt').disabled=false;$('#sutraNext').textContent='Reset flow';DATA.audit.push({time:new Date().toLocaleTimeString('en-GB',{hour12:false}).slice(0,8),actor:'SUTRA-DEMO-01',event:offline?'OFFLINE_RECEIPT_QUEUED':'ASSISTED_RECEIPT_ACKNOWLEDGED',detail:'Farmer assertion + evidence bundle confirmed',hash:'61cf…708e'});renderAudit();}else $('#sutraNext').textContent='Continue →'; });
  $('#downloadReceipt').addEventListener('click',()=>{ const payload={demo:true,channel:'SUTRA-ID Edge bridge simulation',farmer:'RAJ-DEMO-7A•••91',event:'parcel-correction-assertion',offline,sourceSnapshotHash:'7b83a91c',timestamp:new Date().toISOString(),notice:'Synthetic evaluator receipt — not a government record.'}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='raj-agrisetu-demo-receipt.json';a.click();URL.revokeObjectURL(a.href); });

  $('#addAudit').addEventListener('click',()=>{DATA.audit.push({time:new Date().toLocaleTimeString('en-GB',{hour12:false}).slice(0,8),actor:'Policy Engine',event:'DEMO_POLICY_CHECK',detail:'Purpose, source authority and human decision boundary validated',hash:Math.random().toString(16).slice(2,6)+'…'+Math.random().toString(16).slice(2,6)});renderAudit();toast('Demo audit event appended.');});

  const demo=[
    ['Baseline, not vanity metrics','Rajasthan already has 87,23,010 Farmer IDs generated as of 20 July 2026. The prototype therefore focuses on keeping agricultural relationships correct and useful after identity creation.','command'],
    ['CARE detects a real operational class of failure','A new land mutation changes the farmer–parcel relationship. The registry is not overwritten automatically; a governed reconciliation case is opened.','care'],
    ['Farmer correction remains human-authority first','Source fact, farmer assertion, AI observation and official decision are kept separate. Approve the demo case to generate the propagated state.','care'],
    ['SahmatiOS makes consent understandable','The farmer sees a purpose, exact data categories, duration and revocation path. Comprehension-render metadata becomes auditable.','consent'],
    ['Scheme linkage is deterministic','Machine-readable rules evaluate verified claims. Missing or disputed evidence produces VERIFY, not an LLM hallucination.','schemes'],
    ['SUTRA extends the last mile','The edge channel supports assisted voice-first, transactional offline workflows. Walk through the simulated bridge and produce a signed local receipt.','sutra'],
    ['Integration truth is explicit','Every government connector is labelled sandbox, contract-ready, reference-ready or architecture-aligned. Production authorization remains a dependency.','exchange'],
    ['90 days proves the fabric, not a fantasy','The pilot measures reconciliation latency, data quality, inclusion, consent integrity, offline synchronization and service readiness before statewide scale.','pilot']
  ];
  function showDemo(){ const [t,p,v]=demo[demoStep]; view(v);$('#demoTitle').textContent=t;$('#demoText').textContent=p;$('#demoProgress').style.width=((demoStep+1)/demo.length*100)+'%';$('#demoNext').textContent=demoStep===demo.length-1?'Finish':'Next →';$('#demoOverlay').classList.remove('hidden'); }
  $('#judgeBtn').addEventListener('click',()=>{demoStep=0;showDemo();});$('#demoNext').addEventListener('click',()=>{if(demoStep===demo.length-1){$('#demoOverlay').classList.add('hidden');toast('Judge demo complete.');return;}demoStep++;showDemo();});$('#demoSkip').addEventListener('click',()=>$('#demoOverlay').classList.add('hidden'));

  renderQueue(); renderIntegrations(); renderAudit(); splash(); setTimeout(initMap,900);
})();
