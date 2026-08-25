window.RAJ_DATA = {
  districts: [
    {name:'Barmer',score:72,fresh:88.4,land:91.2,consent:96.7,cases:184,offline:37,level:'risk',insight:'Prioritize mutation-linked reconciliation through assisted camps in low-connectivity blocks.'},
    {name:'Jaipur',score:91,fresh:98.1,land:97.4,consent:98.8,cases:41,offline:9,level:'good',insight:'High digital adoption; focus on automated identity-drift detection and high-volume mutation processing.'},
    {name:'Kota',score:87,fresh:96.3,land:95.9,consent:97.5,cases:67,offline:11,level:'good',insight:'Strong registry quality; prioritize crop and irrigation context for scheme-readiness workflows.'},
    {name:'Bikaner',score:78,fresh:92.6,land:93.4,consent:95.8,cases:132,offline:29,level:'mid',insight:'Prioritize offline sync observability and land/crop conflict resolution across dispersed field operations.'},
    {name:'Udaipur',score:80,fresh:93.2,land:92.8,consent:96.4,cases:109,offline:21,level:'mid',insight:'Expand assisted multilingual completion and document-readiness support through existing service channels.'},
    {name:'Sri Ganganagar',score:89,fresh:97.0,land:96.1,consent:98.2,cases:53,offline:8,level:'good',insight:'Use water-aware parcel context and crop-season synchronization for irrigation-intensive workflows.'},
    {name:'Jodhpur',score:82,fresh:94.0,land:93.8,consent:97.1,cases:103,offline:23,level:'mid',insight:'Balance mutation throughput with assisted resolution for dispersed rural service points.'},
    {name:'Ajmer',score:88,fresh:96.9,land:96.0,consent:97.7,cases:58,offline:10,level:'good',insight:'Maintain strong service quality while expanding scheme-rule automation and consented verified claims.'}
  ],
  queue:[
    {id:'CARE-001284',district:'Barmer',type:'LAND',issue:'Sanctioned mutation adds parcel absent from Farmer Registry snapshot',age:'8h',priority:'High',status:'Review'},
    {id:'CARE-001271',district:'Bikaner',type:'IDENTITY',issue:'Name / transliteration drift across identity bridge',age:'13h',priority:'Medium',status:'Review'},
    {id:'CARE-001244',district:'Udaipur',type:'CROP',issue:'Farmer assertion differs from synchronized crop state',age:'1d',priority:'Medium',status:'Evidence'},
    {id:'CARE-001203',district:'Jaipur',type:'LAND',issue:'Partition event affects two Farmer–Farm relationships',age:'2d',priority:'High',status:'Review'},
    {id:'CARE-001188',district:'Kota',type:'CONSENT',issue:'Purpose receipt expired before downstream request completed',age:'2d',priority:'Low',status:'Policy'}
  ],
  integrations:[
    {name:'Farmer Registry / UFSI',owner:'National AgriStack',state:'SANDBOX',stateClass:'sandbox',desc:'UFSI-compatible adapter pattern; production authorization and credentials required.'},
    {name:'Crop Sown Registry',owner:'National / State',state:'SANDBOX',stateClass:'sandbox',desc:'Seasonal crop synchronization with explicit source-state separation.'},
    {name:'Jan Aadhaar',owner:'Government of Rajasthan',state:'CONTRACT READY',stateClass:'',desc:'Person and household identity bridge; no production credential is embedded.'},
    {name:'RoR / DILRMP',owner:'Revenue Department',state:'CONTRACT READY',stateClass:'',desc:'Land and mutation authority adapter with event-driven reconciliation.'},
    {name:'Raj Sewa Dwaar',owner:'DoIT&C Rajasthan',state:'ARCHITECTURE ALIGNED',stateClass:'',desc:'Production exchange designed to route through approved State API management.'},
    {name:'RajKisan',owner:'Agriculture Department',state:'CONTRACT READY',stateClass:'',desc:'Scheme/service handoff designed around existing departmental rails.'},
    {name:'Rajdharaa GIS',owner:'Government of Rajasthan',state:'REFERENCE READY',stateClass:'',desc:'Spatial-context adapter for authorized agriculture and water layers.'},
    {name:'BHASHINI',owner:'MeitY / Digital India',state:'ADAPTER READY',stateClass:'sandbox',desc:'ASR/TTS/translation abstraction with agriculture-domain language pack.'},
    {name:'SUTRA-ID Edge',owner:'Syntheon',state:'LIVE PROTOTYPE',stateClass:'live',desc:'Existing standalone edge capability; this app demonstrates the agriculture transaction bridge.'}
  ],
  audit:[
    {time:'10:42:16',actor:'CARE Engine',event:'SOURCE_DIFF_DETECTED',detail:'RoR parcel set differs from Farmer Registry snapshot',hash:'9b1d…6f20'},
    {time:'10:42:18',actor:'Policy Engine',event:'HUMAN_REVIEW_REQUIRED',detail:'Land relationship change exceeds auto-update policy',hash:'e09a…b3c1'},
    {time:'10:44:03',actor:'SUTRA-DEMO-01',event:'FARMER_ASSERTION_CAPTURED',detail:'Assisted farmer confirms newly mutated parcel',hash:'7b83…a91c'},
    {time:'10:45:41',actor:'Consent Engine',event:'PURPOSE_POLICY_CHECK',detail:'Requested scope minimized to identity, parcel and crop claims',hash:'63ab…11de'}
  ],
  serviceHealth:[
    {name:'CARE Engine',detail:'Local evaluator service',state:'LIVE',className:'live'},
    {name:'Scheme Rules',detail:'Deterministic demo compiler',state:'LIVE',className:'live'},
    {name:'AgriStack / UFSI',detail:'Contract adapter',state:'SANDBOX',className:'sandbox'},
    {name:'Jan Aadhaar',detail:'Production authorization required',state:'READY',className:''},
    {name:'Raj Sewa Dwaar',detail:'Target gateway route',state:'ALIGNED',className:''}
  ]
};
