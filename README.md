# RAJ-AGRISETU X
## Rajasthan AgriStack Trust, Reconciliation & Service Delivery Fabric

**Challenge:** State-wide Implementation of AgriStack — Unified Digital Agriculture Ecosystem  
**Programme:** Rajasthan Innovation Challenge 2026  
**Applicant:** Syntheon Tech Private Limited  
**Prototype status:** Working evaluator-grade front end with deterministic demo rules, offline transaction queue, consent receipts, reconciliation workflows and integration truth labels.

> Rajasthan has already created Farmer IDs at massive scale. The next problem is keeping identity, land, crop, consent and service relationships continuously correct and usable across departments and at the last mile.

RAJ-AGRISETU X is **not another master database**. It is a federated trust and orchestration layer designed to sit between farmer channels and authoritative government rails: AgriStack/UFSI, Rajasthan land records, Jan Aadhaar, Raj Sewa Dwaar, Rajdharaa and other approved systems.

## Why this problem is now different

- The Rajasthan Innovation Challenge asks for statewide AgriStack rollout across Revenue, Agriculture, Water Resources and Cooperatives, with IDEA-compatible APIs, DPDP-aligned consent and an offline-first farmer experience.
- Official Government of India data reported **87,23,010 Farmer IDs in Rajasthan as of 20 July 2026**.
- Rajasthan's Apna Khata/e-Dharti public operational dashboard showed **71,09,590 total mutations, 69,06,097 sanctioned, statewide median 8 days as of 15 August 2026**.
- AgriStack's own Farmer Registry clarifications confirm that land mutation affects already-created Farm IDs.

The product thesis is therefore: **identity creation is becoming a solved scale problem; registry freshness, reconciliation, consent, cross-DPI interoperability and inclusive execution are the next operating problem.**

## What is live in this repository

### 1. AgriStack Control Tower
A state operations view focused on actionable rollout metrics, not vanity charts: Farmer-ID scale, land-mutation pressure, integration state, district AgriStack health and event flow.

### 2. Temporal Farmer–Farm Graph
A source-attributed relationship model linking a synthetic Farmer ID to Jan Aadhaar reference, parcels, crop assertions and service readiness. Authoritative facts, farmer assertions and pending relationships remain separate.

### 3. CARE — Continuous Agricultural Reconciliation Engine
Mutation-aware cases for land change, identity drift and crop conflicts. CARE never lets a model silently overwrite an authoritative registry; it creates a bounded, auditable case with a human/approved-workflow decision point.

### 4. SahmatiOS
A farmer-facing consent UX that captures purpose, itemised data scope, language, modality, duration and revocation. It is designed around clear-notice and data-minimisation principles; the prototype **does not claim statutory Consent Manager registration**.

### 5. Transactional offline + SUTRA-ID Edge mode
The app demonstrates an optional edge execution rail for camps, field officers, low-literacy users and weak-connectivity conditions. A transaction can be created while offline, queued locally and acknowledged after reconnection.

### 6. Scheme Compiler demo
Deterministic sample rules show how verified facts can drive scheme pre-checks while AI/voice explains the result. The model never becomes the legal eligibility authority.

### 7. Integration Truth Matrix
Every connector is labelled as one of:

- `LIVE_PUBLIC_REFERENCE`
- `CONTRACT_READY`
- `DEMO_SANDBOX`
- `LIVE_PROTOTYPE`

No production Government integration is fabricated.

### 8. Evaluator Judge Mode
A ten-step guided walkthrough moves evaluators across the core proof: Rajasthan reality → Farmer Graph → mutation drift → consent → offline SUTRA → state/national integration rails → 90-day rollout.

## Architecture

```text
FARMER / OFFICER CHANNELS
Mobile • PWA • eMitra/FPO-assisted pattern • SUTRA-ID Edge
                         │
                 BHASHINI-ready rail
                         │
┌────────────────────────▼────────────────────────┐
│                 RAJ-AGRISETU X                 │
│                                                │
│ Farmer Graph      CARE Reconciliation          │
│ SahmatiOS         Scheme Compiler              │
│ Offline Sync      Evidence / Audit Events      │
│ AgriSpatial       Control Tower                │
│ Verified Claims   Integration Conformance      │
└────────────────────────┬────────────────────────┘
                         │
                  RAJ SEWA DWAAR
                         │
  ┌──────────┬───────────┼──────────┬─────────────┐
  ▼          ▼           ▼          ▼             ▼
AgriStack   Jan       e-Dharti   Rajdharaa   Rajasthan
 / UFSI    Aadhaar    / DILRMP      GIS       Sampark
  │
Farmer Registry • Crop Sown Registry • Geo-referenced Village Maps
  │
Krishi-DSS / authorised Digital Agriculture Mission services
```

## SUTRA-ID Edge strategy

SUTRA is deliberately **not mandatory hardware for every farmer**. The statewide architecture remains channel-neutral:

1. personal smartphone/PWA where available;
2. existing assisted government/service channels where available;
3. SUTRA-ID Edge for field/camp/offline/voice-first execution where the normal digital channel fails.

This aligns directly with BHASHINI's 2026 push for multilingual, voice-first and offline/low-connectivity edge AI. It also avoids turning a software DPI project into a hardware procurement dependency.

## Responsible-AI boundary

AI may explain, translate, OCR, detect anomalies, rank reconciliation cases and help an officer understand evidence. AI may **not autonomously**:

- transfer land ownership;
- modify RoR;
- alter Farmer ID relationships;
- deny statutory benefits;
- convert an assertion into an authoritative fact;
- bypass an authorised decision-maker.

## Run locally

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm test
npm run build
```

## Research anchors

Primary sources used to shape this architecture:

- Rajasthan Innovation Challenge problem statement: https://change.rajasthan.gov.in/challenge-detail/174876e845
- Current Rajasthan Innovation Challenge programme page: https://change.rajasthan.gov.in/
- AgriStack official architecture/UFSI/Consent/Sandbox: https://agristack.gov.in/
- Farmer Registry administrative & technical clarifications: https://agristack.gov.in/assets/registries/farmerRegistry/farmer_registry_faqs.pdf
- Farmer-ID progress, 20 July 2026: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289025&lang=1&reg=1
- Digital Agriculture Mission / Krishi-DSS: https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=157351&lang=1&reg=1
- Rajasthan e-Dharti / Apna Khata: https://apnakhata.rajasthan.gov.in/
- Rajasthan current mutation performance: https://www.apnakhata.rajasthan.gov.in/track_meanmedian.aspx
- Jan Aadhaar 2.0 data-sharing API integration document: https://janaadhaar.rajasthan.gov.in/content/dam/doitassets/janaadhaar/PDF/DBT/Jan%20Aadhaar%20Integration%20Document%20v1.8%20%281%29.pdf
- RajNET 2.0: https://doitc.rajasthan.gov.in/Files/DOITCWEB/WriteReadData/CircularNotificaionsOrders/202603131140308841196112thSeMTMOM250220261.pdf
- DPDP Rules 2025: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
- BHASHINI at NCeG Rajasthan 2026 / Suno Sutra: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2280490&lang=1&reg=48

See `docs/` for the product thesis, integration matrix, security posture and 90-day implementation plan.

## Prototype integrity

All personal identities, Farmer IDs, parcels, consent IDs, cases and transactions in the UI are synthetic demo records. Publicly cited aggregate Government statistics are labelled with their source date. Production access to Government APIs would be enabled only after department approval, credentials and security/UAT gates.
