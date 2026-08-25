# RAJ-AGRISETU X
## Rajasthan AgriStack Trust, Reconciliation & Service Delivery Fabric

**Challenge:** State-wide Implementation of AgriStack — Unified Digital Agriculture Ecosystem  
**Programme:** Rajasthan Innovation Challenge 2026  
**Applicant:** Syntheon Tech Private Limited  
**Production entry point:** `dashboard.html` via Vercel root rewrite  
**Prototype status:** Evaluator-grade operational console with deterministic demo rules, CARE reconciliation, purpose-bound consent, offline SUTRA workflow, audit journal, district GIS reference layer and explicit integration truth labels.

> Rajasthan has already created Farmer IDs at massive scale. The next operating problem is keeping identity, land, crop, consent and service relationships continuously correct and usable across departments and at the last mile.

RAJ-AGRISETU X is **not another master database**. It is a federated trust and orchestration layer designed to sit between farmer/official channels and authoritative government rails: AgriStack/UFSI, Rajasthan land records, Jan Aadhaar, Raj Sewa Dwaar, Rajdharaa and other approved systems.

## Evaluator console

The root deployment opens `dashboard.html`, a State-operations console rather than a pitch/landing page. The earlier `index.html` remains only as a legacy/reference prototype and is not the production landing route.

Operational modules:

1. **Operations Overview** — compact statewide KPI rail, Rajasthan GIS reference layer, district drill-down, exception queue, service health and event journal.
2. **Registry Integrity** — source matrix, freshness, identity drift and governed entity-resolution review.
3. **CARE Reconciliation** — mutation-aware cases with evidence comparison and human approve/request-evidence/reject controls.
4. **Consent & Purpose** — SahmatiOS purpose-bound Hindi notice, exact data scope, expiry, issue/revoke receipt flow.
5. **Farmer Record** — source-attributed Farmer 360 and deterministic scheme-rule trace.
6. **SUTRA Assisted Access** — voice-first Hindi workflow, transactional offline queue and evidence-linked demo receipt.
7. **Integrations & Audit** — connector truth matrix and tamper-evident event journal.
8. **Pilot & Scale** — 90-day implementation path, contract KPIs and 2030 trust-fabric vision.

## Why this problem is now different

- The Rajasthan Innovation Challenge asks for statewide AgriStack rollout across Revenue, Agriculture, Water Resources and Cooperatives, with IDEA-compatible APIs, DPDP-aligned consent and an offline-first farmer experience.
- Government of India reported **87,23,010 Farmer IDs in Rajasthan as of 20 July 2026**.
- Rajasthan e-Dharti/Apna Khata reported **71,09,590 total mutations, 69,06,097 sanctioned and statewide median mutation time of 8 days as of 15 August 2026**.
- AgriStack's own Farmer Registry clarifications confirm that land mutation affects already-created Farmer/Farm relationships.

The thesis is therefore: **Farmer-ID creation is achieving scale; continuous registry freshness, reconciliation, consent, interoperability and inclusive service execution are the next operating problem.**

## Core architecture

```text
FARMER / OFFICIAL CHANNELS
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
```

## CARE — Continuous Agricultural Reconciliation Engine

CARE treats mutations and cross-source disagreement as bounded operational cases rather than silently overwriting authoritative records.

```text
RoR / mutation event
        ↓
impact analysis
        ↓
source comparison
        ↓
farmer assertion / evidence where needed
        ↓
authorized human decision
        ↓
propagation + receipt
```

The prototype separates:

- source facts;
- farmer assertions;
- AI observations/advice;
- authorized official decisions.

## SahmatiOS

SahmatiOS is a farmer-facing consent UX and State policy-enforcement pattern designed around:

- explicit purpose;
- itemised data scope;
- language/modality of notice;
- duration/expiry;
- revocation;
- data minimisation;
- auditable receipt.

It is described as **DPDP-aligned/future-ready** and is **not represented as a statutory registered Consent Manager**.

## SUTRA-ID Edge strategy

SUTRA is deliberately **not mandatory hardware for every farmer**. The statewide architecture remains channel-neutral:

1. personal smartphone/PWA where available;
2. existing assisted government/service channels where available;
3. SUTRA-ID Edge for field/camp/offline/voice-first execution where normal digital access fails.

The evaluator console demonstrates an agriculture-specific SUTRA workflow with Hindi assistance, human confirmation, local transaction queue and a synthetic evidence receipt.

This aligns with BHASHINI's 2026 push for multilingual, voice-first and offline/low-connectivity edge AI, including the Suno Sutra handheld reference-device direction showcased in Rajasthan.

## Rajasthan GIS integrity

The evaluator map uses a **public Rajasthan district reference GeoJSON layer** with OpenStreetMap only for visual demonstration. It is clearly labelled as reference/demo geography and should not be treated as the 2026 authoritative administrative boundary source.

For production, district/village/parcel geography is designed to be sourced from the **current authorized Rajdharaa/LGD/departmental layer** under Government approval.

Operational health, CARE-load, freshness and offline-load values on the map are synthetic evaluator data.

## Integration truth labels

Every connector is explicitly represented as one of the following states rather than fabricating live production access:

- `LIVE_PROTOTYPE`
- `SANDBOX`
- `CONTRACT_READY`
- `REFERENCE_READY`
- `ARCHITECTURE_ALIGNED`

Production Government credentials and source-system writes require departmental authorization, security review and UAT.

## Responsible-AI boundary

AI may explain, translate, OCR, detect anomalies, rank reconciliation cases and help an officer interpret evidence. AI may **not autonomously**:

- transfer land ownership;
- modify RoR;
- alter Farmer ID relationships;
- deny statutory benefits;
- convert an assertion into an authoritative fact;
- bypass an authorised decision-maker.

The Scheme Compiler is deterministic; AI can explain a rule result but is not the legal eligibility authority.

## 90-day pilot

Indicative implementation envelope: **₹72.50 lakh** for production core + contrasting field pilot.

- **Day 0–15:** source inventory, UFSI mapping, DPIA, integration contracts, pilot selection.
- **Day 15–35:** Farmer Graph, CARE, SahmatiOS, event/provenance layer.
- **Day 35–55:** officer console, farmer PWA, deterministic scheme rules, SUTRA assisted channel.
- **Day 55–75:** field pilot, security/accessibility/offline/data-quality UAT.
- **Day 75–90:** hardening, observability, training, API documentation, handover and statewide scale blueprint.

Contract KPIs focus on reconciliation latency, registry freshness, mismatch density, consent-policy completeness, offline-sync success and smartphone-independent completion — not vanity model accuracy.

## Local run

```bash
python3 -m http.server 3000
```

Open:

```text
http://localhost:3000/dashboard.html
```

Quality checks:

```bash
npm test
```

## Research anchors

Primary sources shaping the architecture:

- Rajasthan Innovation Challenge problem statement: https://change.rajasthan.gov.in/challenge-detail/174876e845
- AgriStack official architecture/UFSI/Consent/Sandbox: https://agristack.gov.in/
- Farmer Registry administrative & technical clarifications: https://agristack.gov.in/assets/registries/farmerRegistry/farmer_registry_faqs.pdf
- Farmer-ID progress, 20 July 2026: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2289025&lang=1&reg=1
- Rajasthan e-Dharti / Apna Khata: https://apnakhata.rajasthan.gov.in/
- Current mutation-performance reference: https://www.apnakhata.rajasthan.gov.in/track_meanmedian.aspx
- Jan Aadhaar: https://janaadhaar.rajasthan.gov.in/
- Rajasthan DoIT&C / Raj Sewa Dwaar: https://doitc.rajasthan.gov.in/
- Rajdharaa GIS: https://gis.rajasthan.gov.in/
- Local Government Directory: https://lgdirectory.gov.in/
- DPDP Rules / MeitY: https://www.meity.gov.in/
- BHASHINI / Digital India language infrastructure: https://bhashini.gov.in/

## Prototype integrity

All personal identities, Farmer IDs, parcels, consent IDs, cases and operational KPIs in the interactive product are synthetic evaluator records unless visibly labelled as an official dated baseline. Production use would require authorized Government APIs, current authoritative geographies, security review, privacy assessment and UAT.
