# RAJ-AGRISETU X — Rajasthan AgriStack Trust, Reconciliation & Intelligence Fabric

**Challenge:** State-wide Implementation of AgriStack — Unified Digital Agriculture Ecosystem  
**Programme:** Rajasthan Innovation Challenge 2026  
**Applicant:** Syntheon Tech Private Limited  
**iStart Registration:** 3B9D9E48  
**Entity CIN:** U63120RJ2025PTC100649  
**Production root:** `/` → `/command-centre/`  
**Farmer PWA:** `/kisan` → `/farmer/`

> Rajasthan has achieved Farmer-ID scale. The next mission is to keep agricultural digital truth continuously correct, consented, explainable and usable across all 41 districts — from State Mission Control to an offline farmer transaction.

RAJ-AGRISETU X is **not another master database**. It is a federated operating layer built around existing Government DPI and departmental systems.

## Evaluator surfaces

### 1. State AgriStack Mission Control
`command-centre/`

Ten operational modules:
1. Mission Control
2. GIS Intelligence
3. FarmGraph AI
4. CARE Integrity
5. Consent & Scheme
6. Farmer & SUTRA
7. Interoperability
8. Rollout & Vision
9. Governance
10. Audit & Evidence

The homepage is officer-first: verified baselines, district readiness, pendency/SLA, cross-department health, FarmGraph integrity, CARE exceptions and trusted events. No marketing hero or world basemap is used.

### 2. FarmGraph AI — temporal agricultural digital twin
FarmGraph AI links **Farmer ID ↔ Jan Aadhaar reference ↔ parcel/khasra ↔ crop ↔ water context ↔ consent ↔ scheme ↔ evidence ↔ CARE case** while keeping source authority, effective time, verification state, consent context and provenance attached to each relationship.

It does not replace Farmer Registry, RoR, Crop Sown Registry or Jan Aadhaar. It gives officers an explainable relationship layer for detecting drift and orchestrating correction.

### 3. CARE — Continuous Agricultural Reconciliation Engine
CARE turns source disagreement into a governed workflow:

```text
source / mutation event
        ↓
relationship impact analysis
        ↓
source-state comparison
        ↓
farmer assertion / evidence where required
        ↓
authorized human decision
        ↓
approved downstream adapter + receipt
```

Source fact, farmer assertion, AI observation and official decision remain distinct states.

### 4. Offline-first Farmer PWA
`farmer/`

The challenge-required farmer application demonstrates:
- installable PWA shell;
- Hindi-first self-verification;
- Farmer Registry vs RoR parcel mismatch;
- persistent local transaction queue;
- reconnect acknowledgement via `/api/offline-sync`;
- CARE revalidation requirement;
- purpose-bound consent;
- deterministic scheme pre-check with authority boundary.

**Offline acknowledgement is not Government record mutation.** A land-linked correction remains subject to CARE/human review and authorized downstream integration.

### 5. SUTRA-ID Edge + BHASHINI
The PWA is the primary farmer mobile channel. SUTRA-ID Edge is an **optional voice-first, low-connectivity field execution rail** for camps, assisted service and digital-literacy edge cases. BHASHINI is the preferred production ASR/TTS/translation rail where authorized.

## Verified Rajasthan operating context

| Baseline | Value | Provenance |
|---|---:|---|
| Rajasthan Farmer IDs generated | **87,23,010** | PIB / Ministry of Agriculture & Farmers Welfare · 20 Jul 2026 |
| Current Rajasthan district scope | **41** | Rajasthan current administrative master / RajMasters-compatible reference |
| e-Dharti online tehsils | **424 / 425** | Rajasthan e-Dharti / DILRMP current reference |
| Mutation research snapshot | **71,09,590 total; 69,06,097 sanctioned; 8-day statewide median** | Rajasthan e-Dharti research snapshot · 15 Aug 2026 |

Every district health score, CARE backlog, consent rate, graph integrity rate and offline KPI is **synthetic evaluator data** unless explicitly marked VERIFIED.

## Interoperability anchors

The design extends rather than replaces:
- AgriStack Farmer Registry / Crop Sown Registry / UFSI;
- AgriStack Consent Manager architecture;
- Jan Aadhaar 2.0;
- e-Dharti / DILRMP / RoR;
- Raj Sewa Dwaar;
- Raj SSO;
- RajMasters / LGD;
- Rajdharaa;
- RajKisan;
- Rajasthan Sampark;
- Water Resources / authorized spatial context;
- Cooperatives / FPO assisted-service patterns;
- BHASHINI.

Connector truth states are explicit: **LIVE PROTOTYPE · SANDBOX · PUBLIC REFERENCE · CONTRACT READY · ARCHITECTURE ALIGNED · ADAPTER PATTERN**.

## GIS integrity

The evaluator console uses Rajasthan-only 41-district contextual reference imagery and never loads a world/OSM basemap. Production administrative/spatial geometry is bound to authorized **Rajdharaa/LGD** services. GIS layers in Mission Control are operational views (readiness, land sync, CARE load, offline reach, water context), not claims that the reference image is a live Government GIS feed.

## Responsible AI boundary

AI may:
- explain and translate;
- OCR and summarize;
- detect anomalies and relationship drift;
- rank conflicts;
- recommend next action.

AI may **not autonomously**:
- modify RoR;
- alter Farmer ID relationships;
- convert a farmer assertion into Government fact;
- approve or deny statutory benefits;
- bypass authorized human decision-makers.

Scheme pre-checks are deterministic and non-statutory.

## 90-day implementation

Indicative commercial envelope: **₹72.50 lakh** for production core, approved integration onboarding, contrasting field validation, UAT/security, documentation, training and handover.

Five gates:
- Days 0–15: source discovery, interface mapping, privacy/security plan, pilot selection
- Days 15–35: FarmGraph AI, CARE, SahmatiOS, provenance/audit
- Days 35–55: State MIS, Farmer PWA, Scheme Compiler, BHASHINI/SUTRA field pattern
- Days 55–75: three contrasting Rajasthan field contexts
- Days 75–90: UAT, security/load/accessibility, operating runbooks, training, statewide scale blueprint

No claim is made that Rajasthan-wide replacement happens within 90 days.

## 2030 vision

The same trust rails can grow into:
- **Living AgriStack** — continuously fresh relationships;
- **FarmGraph AI** — explainable agricultural digital twin;
- **Verified Agricultural Claims** — minimum-necessary service assertions;
- **Unified Agri Services** — scheme, insurance, procurement, dealer/fertilizer and future DaaS workflows;
- **Rural Edge Access** — PWA + assisted service + selective SUTRA;
- **Rajasthan AgriStack Innovation Sandbox** — UFSI-aligned synthetic data and conformance testing.

## Evaluator API contracts

- `GET /api/health`
- `GET /api/state-overview`
- `GET /api/districts`
- `GET/POST /api/care`
- `POST /api/consent`
- `POST /api/scheme-check`
- `POST /api/offline-sync`

These are deterministic evaluator contracts and do not claim privileged Government credentials.

## Evidence-first documentation

- `docs/EVALUATOR_RUNBOOK.md`
- `docs/EVIDENCE_INDEX.md`
- `docs/SUBMISSION_PROOF_MATRIX.md`
- `docs/VERIFIED_BASELINES.md`
- `docs/CROSS_DEPARTMENT_MODEL.md`
- `docs/INTEGRATION_TRUTH_MATRIX_V4.md`
- `docs/SECURITY_GOVERNANCE_V4.md`
- `docs/PILOT_ACCEPTANCE.md`
- `docs/RELEASE_GATE.md`
- `docs/RISK_REGISTER.md`

## Local evaluator run

```bash
python3 -m http.server 3000
```

Open:

```text
http://localhost:3000/command-centre/
http://localhost:3000/farmer/
```

Release checks:

```bash
npm test
```

Hosted Vercel builds additionally expose the serverless `/api/*` contracts.

## Primary research anchors

- Rajasthan Innovation Challenge: https://change.rajasthan.gov.in/challenge-detail/174876e845
- AgriStack: https://agristack.gov.in/
- Farmer-ID progress: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289025
- Rajasthan e-Dharti: https://apnakhata.rajasthan.gov.in/
- RajMasters: https://rajmasters.rajasthan.gov.in/
- Rajdharaa: https://gis.rajasthan.gov.in/
- Jan Aadhaar: https://janaadhaar.rajasthan.gov.in/
- Rajasthan DoIT&C / Raj Sewa Dwaar: https://doitc.rajasthan.gov.in/
- BHASHINI: https://bhashini.gov.in/

## Prototype integrity

All farmer identities, Farmer IDs, parcels, cases, graph edges, consent receipts and operational KPIs are synthetic evaluator records unless visibly marked as an official dated aggregate baseline. Production use requires departmental authorization, approved credentials, current authoritative geography, security/privacy review and UAT.
