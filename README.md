# RAJ-AGRISETU X
## Rajasthan AgriStack Trust, Reconciliation & Service Delivery Fabric

**Challenge:** State-wide Implementation of AgriStack — Unified Digital Agriculture Ecosystem  
**Programme:** Rajasthan Innovation Challenge 2026  
**Applicant:** Syntheon Tech Private Limited  
**Production root:** `/` → `/command-centre/`  
**Farmer PWA:** `/kisan` → `/farmer/`

> Rajasthan has achieved Farmer-ID scale. The next operating challenge is keeping farmer, land, crop, consent and service relationships continuously correct, explainable and usable across departments and at the last mile.

RAJ-AGRISETU X is **not another master database**. It is a federated trust, reconciliation and service-execution layer designed around existing Government rails.

## What this repository proves

### 1. State Operations MIS
`command-centre/`

Officer-first rather than pitch-first:
- verified Rajasthan baselines separated from synthetic operating metrics;
- State / District / Field role scope;
- 41-district rollout and readiness matrix;
- CARE pendency/SLA and direct case disposal;
- cross-department integration health;
- consent ledger;
- farmer/field channel operations;
- security/governance control plane;
- audit and evidence exports.

The homepage intentionally does **not** use a world/OSM map. Geography is a dedicated contextual module. Production administrative/spatial geometry is bound to authorized Rajdharaa/LGD services.

### 2. Offline-first farmer PWA
`farmer/`

A synthetic Hindi-first farmer workflow demonstrates:
- record self-verification;
- Farmer Registry vs RoR parcel mismatch;
- installable PWA shell;
- local transaction queue that survives connectivity loss;
- reconnect acknowledgement through `/api/offline-sync`;
- CARE revalidation semantics;
- purpose-bound consent;
- deterministic scheme pre-check with authority boundary;
- assisted-service / SUTRA channel handoff pattern.

**Offline acknowledgement is not Government record mutation.** A land-linked correction remains subject to CARE/human review and authorized downstream integration.

### 3. Deterministic evaluator API contracts
`api/`

- `GET /api/health`
- `GET /api/state-overview`
- `GET /api/districts`
- `GET/POST /api/care`
- `POST /api/consent`
- `POST /api/scheme-check`
- `POST /api/offline-sync`

These endpoints prove interaction contracts. They do not claim privileged Government credentials or source-system authority.

## Verified Rajasthan operating context

| Baseline | Value | Provenance |
|---|---:|---|
| Farmer IDs generated | **87,23,010** | PIB / Ministry of Agriculture & Farmers Welfare · 20 Jul 2026 |
| Current district scope | **41** | Rajasthan current administrative master / RajMasters-compatible reference |
| e-Dharti online tehsils | **424 / 425** | Rajasthan e-Dharti / DILRMP current reference |
| Mutation workload research snapshot | **71,09,590 total; 69,06,097 sanctioned; 8-day statewide median** | Rajasthan e-Dharti · 15 Aug 2026 research snapshot |

Every other district health score, CARE backlog, consent rate or offline metric is **synthetic evaluator data** unless explicitly marked verified.

## Architecture

```text
FARMER / FIELD CHANNELS
 Farmer PWA ─ Assisted eMitra/CSC/FPO/Krishi Sakhi ─ SUTRA-ID Edge
      │                         │                         │
      └──────────── governed offline transaction ────────┘
                             │
                      /api/offline-sync
                             │
                ACK + next-system routing
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
        CARE             SahmatiOS        Scheme Pre-check
   human authority      purpose policy    deterministic trace
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                   State Operations MIS
                 rollout · pendency · audit
                             │
                    Raj Sewa Dwaar pattern
                             │
 ┌────────────┬──────────────┼─────────────┬──────────────┐
 ▼            ▼              ▼             ▼              ▼
AgriStack   Jan Aadhaar   e-Dharti/RoR   Rajdharaa    approved State
 / UFSI      reference      DILRMP          GIS           systems
```

## CARE — Continuous Agricultural Reconciliation Engine

CARE converts source disagreement into bounded workflow:

```text
mutation / source event
        ↓
impact analysis
        ↓
source comparison
        ↓
farmer assertion / evidence where required
        ↓
authorized human decision
        ↓
approved downstream adapter + receipt
```

The architecture keeps **source fact**, **farmer assertion**, **AI observation** and **official decision** as distinct states.

## SahmatiOS

Purpose-policy pattern includes:
- explicit purpose;
- itemized data scope;
- language/modality of notice;
- duration/expiry;
- revocation;
- explicit excluded data;
- auditable receipt.

The prototype is **DPDP-aligned in design** and is **not represented as a registered statutory Consent Manager**.

## SUTRA-ID Edge + BHASHINI positioning

The challenge requires an offline-first farmer-facing mobile application, so the **PWA is primary**.

SUTRA-ID Edge is an **optional last-mile field rail** for camps, low-connectivity situations and voice-first/low-literacy workflows. It reuses the same governed transaction pattern as the PWA. BHASHINI is the preferred production ASR/TTS/translation rail where authorized; browser speech in the evaluator PWA is only a local fallback.

## Rajasthan integration anchors

The design extends rather than replaces:
- AgriStack Farmer Registry / Crop Sown Registry / UFSI;
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

Connector truth states are explicit: **LIVE PROTOTYPE · SANDBOX · PUBLIC REFERENCE · CONTRACT READY · ADAPTER PATTERN**.

## Responsible-AI boundary

AI may:
- explain;
- translate;
- OCR;
- detect anomalies;
- rank conflicts;
- summarize cases;
- recommend next action.

AI may **not autonomously**:
- modify RoR;
- alter Farmer ID relationships;
- convert a farmer assertion into Government fact;
- approve or deny statutory benefits;
- bypass an authorized decision-maker.

Scheme pre-check is deterministic and non-statutory.

## 90-day implementation position

Indicative commercial envelope used in the proposal: **₹72.50 lakh** for production core, approved integration onboarding, contrasting field pilot, UAT, documentation and handover.

The proposal is intentionally a **production-core + field-validation pilot**, not a claim to replace every statewide system in 90 days.

See:
- `docs/PILOT_ACCEPTANCE.md`
- `docs/BUSINESS_POSITIONING.md`
- `docs/SUBMISSION_PROOF_MATRIX.md`

## Evaluator run

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

The hosted Vercel build additionally provides the serverless `/api/*` contracts.

## Evidence-first documentation

Start here:
- `docs/EVALUATOR_RUNBOOK.md` — 3-minute proof journey
- `docs/EVIDENCE_INDEX.md` — claim → implementation/evidence index
- `docs/VERIFIED_BASELINES.md` — verified Rajasthan baselines
- `docs/CROSS_DEPARTMENT_MODEL.md` — Revenue/Agriculture/Water/Cooperatives operating model
- `docs/INTEGRATION_TRUTH_MATRIX_V4.md` — connector truth states
- `docs/SECURITY_GOVERNANCE_V4.md` — privacy/access/authority model
- `docs/API_CONTRACTS.md` — deterministic API behavior
- `docs/RELEASE_GATE.md` — hard submission gate
- `docs/RISK_REGISTER.md` — evaluator-risk mitigation

## Primary research anchors

- Rajasthan Innovation Challenge problem statement: https://change.rajasthan.gov.in/challenge-detail/174876e845
- AgriStack architecture/UFSI/Consent/Sandbox: https://agristack.gov.in/
- Farmer Registry clarifications: https://agristack.gov.in/assets/registries/farmerRegistry/farmer_registry_faqs.pdf
- Farmer-ID progress: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289025
- Rajasthan e-Dharti: https://apnakhata.rajasthan.gov.in/
- RajMasters: https://rajmasters.rajasthan.gov.in/
- Rajdharaa: https://gis.rajasthan.gov.in/
- Rajasthan DoIT&C / Raj Sewa Dwaar: https://doitc.rajasthan.gov.in/
- Jan Aadhaar: https://janaadhaar.rajasthan.gov.in/
- BHASHINI: https://bhashini.gov.in/

## Prototype integrity

All farmer identities, Farmer IDs, parcels, cases, consent receipts and operational KPIs are synthetic evaluator records unless visibly marked as an official dated aggregate baseline. Production use requires departmental authorization, approved credentials, current authoritative geography, security/privacy review and UAT.
