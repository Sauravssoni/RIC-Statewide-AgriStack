window.RAJ_DATA = {
  districts: [
    { name:'Barmer', lat:25.75, lng:71.39, score:72, fresh:'88.4%', land:'91.2%', consent:'96.7%', cases:184, level:'risk', insight:'Mutation-linked parcel mismatches are the dominant operational issue; prioritize assisted reconciliation camps in low-connectivity blocks.' },
    { name:'Jaipur', lat:26.91, lng:75.79, score:91, fresh:'98.1%', land:'97.4%', consent:'98.8%', cases:41, level:'good', insight:'High digital service adoption; focus on identity drift and high-volume mutation automation rather than assisted access.' },
    { name:'Kota', lat:25.18, lng:75.83, score:87, fresh:'96.3%', land:'95.9%', consent:'97.5%', cases:67, level:'good', insight:'Strong registry quality; use crop and irrigation overlays to accelerate scheme readiness workflows.' },
    { name:'Bikaner', lat:28.02, lng:73.31, score:78, fresh:'92.6%', land:'93.4%', consent:'95.8%', cases:132, level:'mid', insight:'Prioritize offline sync observability and land/crop conflict resolution across dispersed field operations.' },
    { name:'Udaipur', lat:24.58, lng:73.68, score:80, fresh:'93.2%', land:'92.8%', consent:'96.4%', cases:109, level:'mid', insight:'Assisted multilingual service completion and scheme-document readiness are the leading operational opportunities.' },
    { name:'Sri Ganganagar', lat:29.90, lng:73.88, score:89, fresh:'97.0%', land:'96.1%', consent:'98.2%', cases:53, level:'good', insight:'Use water-aware parcel context and crop-season synchronization for irrigation-intensive agricultural workflows.' }
  ],
  queue: [
    {id:'CARE-001284',district:'Barmer',type:'LAND',issue:'New mutation adds parcel not present in Farmer Registry',age:'8h',priority:'High'},
    {id:'CARE-001271',district:'Bikaner',type:'IDENTITY',issue:'Name/transliteration mismatch across identity bridge',age:'13h',priority:'Medium'},
    {id:'CARE-001244',district:'Udaipur',type:'CROP',issue:'Farmer assertion differs from last synchronized crop record',age:'1d',priority:'Medium'},
    {id:'CARE-001203',district:'Jaipur',type:'LAND',issue:'Partition event affects two Farmer–Farm relationships',age:'2d',priority:'High'},
    {id:'CARE-001188',district:'Kota',type:'CONSENT',issue:'Purpose receipt expired before downstream request completed',age:'2d',priority:'Low'}
  ],
  integrations: [
    {name:'Farmer Registry / UFSI',owner:'National AgriStack',state:'SANDBOX',desc:'UFSI-compatible contract adapter; production credentials and authorization required.'},
    {name:'Crop Sown Registry',owner:'National / State',state:'SANDBOX',desc:'Seasonal crop synchronization contract with explicit source-state separation.'},
    {name:'Jan Aadhaar',owner:'Government of Rajasthan',state:'CONTRACT READY',desc:'Person and household identity bridge; no production credential is embedded.'},
    {name:'RoR / DILRMP',owner:'Revenue Department',state:'CONTRACT READY',desc:'Land and mutation authority adapter pattern with event-driven reconciliation.'},
    {name:'Raj Sewa Dwaar',owner:'DoIT&C Rajasthan',state:'ARCHITECTURE ALIGNED',desc:'Production exchange is designed to pass through approved state API management.'},
    {name:'RajKisan',owner:'Agriculture Rajasthan',state:'CONTRACT READY',desc:'Scheme/service state adapter; workflow handoff designed for existing department rails.'},
    {name:'Rajdharaa GIS',owner:'Government of Rajasthan',state:'REFERENCE READY',desc:'Spatial-context adapter for authorized agriculture/water/geospatial layers.'},
    {name:'BHASHINI',owner:'MeitY / Digital India',state:'ADAPTER READY',desc:'ASR/TTS/translation abstraction with agriculture-domain terminology pack.'},
    {name:'SUTRA-ID Edge',owner:'Syntheon',state:'PHYSICAL CAPABILITY',desc:'Existing standalone edge-device capability; this prototype simulates its AgriStack transaction bridge.'}
  ],
  audit: [
    {time:'10:42:16',actor:'CARE Engine',event:'SOURCE_DIFF_DETECTED',detail:'RoR parcel set differs from Farmer Registry snapshot',hash:'9b1d…6f20'},
    {time:'10:42:18',actor:'Policy Engine',event:'HUMAN_REVIEW_REQUIRED',detail:'Land relationship change exceeds automatic update policy',hash:'e09a…b3c1'},
    {time:'10:44:03',actor:'SUTRA-DEMO-01',event:'FARMER_ASSERTION_CAPTURED',detail:'Assisted farmer confirms newly mutated parcel',hash:'7b83…a91c'}
  ]
};
