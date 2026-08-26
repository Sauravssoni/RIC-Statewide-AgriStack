# Cross-Department Operating Model

RAJ-AGRISETU X is designed as an orchestration and reconciliation layer, not a replacement for departmental source systems.

| Department / rail | Authoritative responsibility in target architecture | RAJ-AGRISETU X responsibility | Prototype truth state |
|---|---|---|---|
| Revenue / e-Dharti / DILRMP | RoR, sanctioned mutation, parcel ownership/relationship source | Detect changed relationships, create CARE cases, preserve provenance | PUBLIC + CONTRACT READY |
| Agriculture / Farmer Registry / Crop Sown Registry / RajKisan | Farmer functional identity, crop assertions, scheme/service state | Federated graph references, UFSI adapters, scheme pre-check, farmer self-verification | UFSI SANDBOX / CONTRACT READY |
| Jan Aadhaar 2.0 | Person/household identity bridge under authorized purpose | Reference-based identity matching; no duplicate master identity | CONTRACT READY |
| Water Resources / Rajdharaa layers | Authorized water/irrigation/spatial context | Optional policy-bound parcel context for water-aware schemes | REFERENCE READY |
| Cooperatives / FPO ecosystem | Authorized cooperative/FPO participation and assisted services | Consent-bound service desk / verified claims pattern | ADAPTER PATTERN |
| Raj Sewa Dwaar | State API gateway, auth, subscription/policy enforcement | Deploy approved connectors through State middleware | CONTRACT READY |
| Raj SSO | Officer authentication / role context | Production RBAC integration point | CONTRACT READY |
| RajMasters / LGD | Current administrative master | District/tehsil scope validation and reporting dimensions | PUBLIC REFERENCE / CONTRACT READY |
| Rajasthan Sampark | State grievance escalation | Escalate unresolved farmer discrepancy with linked case reference | ADAPTER PATTERN |
| BHASHINI | Language AI infrastructure | ASR/TTS/translation interface for farmer/field workflow | PROTOTYPE ADAPTER |
| SUTRA-ID Edge | Syntheon field hardware/channel | Optional offline/voice field execution; human-confirmed evidence receipts | REAL PROTOTYPE |

## Governing principle

**Authoritative data stays authoritative.** RAJ-AGRISETU X stores only the minimum references, workflow state, consent scope, provenance and audit evidence necessary to orchestrate cross-system service delivery.
