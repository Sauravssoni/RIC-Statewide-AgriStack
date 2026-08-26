# Integration Truth Matrix — v4

| System | Target role | Evaluator state | What is proven now | Production dependency |
|---|---|---|---|---|
| AgriStack Farmer Registry / UFSI | Farmer identity + registry interoperability | SANDBOX / CONTRACT READY | adapter contract, source separation, deterministic workflow | central/state credentials and approved interface |
| Crop Sown Registry | Seasonal crop assertion | SANDBOX / CONTRACT READY | crop assertion in source-state model and scheme trace | approved UFSI/State connector |
| Jan Aadhaar 2.0 | person/household identity bridge | CONTRACT READY | reference-based matching UX and consent scope | authorized Jan Aadhaar integration |
| e-Dharti / DILRMP / RoR | land and mutation source | PUBLIC REFERENCE + CONTRACT READY | CARE 2-vs-3 parcel reconciliation and mutation workload thesis | authorized mutation/RoR event interface |
| Raj Sewa Dwaar | State API middleware | ARCHITECTURE ALIGNED | connector truth states and API boundary | onboarding/auth/subscription through State gateway |
| Rajdharaa / LGD | authoritative administrative/spatial context | REFERENCE READY | current 41-district context and production GIS boundary | approved spatial service/layers |
| Raj SSO | officer identity / role | CONTRACT READY | evaluator role-scoping pattern | authorized SSO application onboarding |
| RajMasters | administrative master | PUBLIC REFERENCE | current 41-district reporting scope | approved master lookup if required |
| RajKisan | agriculture scheme/service workflows | CONTRACT READY | scheme-linkage adapter pattern | department API/workflow approval |
| Rajasthan Sampark | grievance escalation | ADAPTER PATTERN | unresolved-case escalation design | approved grievance connector |
| BHASHINI | ASR/TTS/translation | PROTOTYPE ADAPTER | Hindi voice UX / architecture | approved BHASHINI service/model access |
| SUTRA-ID Edge | edge field execution | REAL PROTOTYPE | offline/voice/human-confirmed evidence channel | field deployment hardware/support plan |

No `CONTRACT READY` or `REFERENCE READY` label means a live production connection exists.
