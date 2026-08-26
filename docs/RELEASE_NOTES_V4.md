# RAJ-AGRISETU X v4 — Release Notes

## Why this release exists
The legacy prototype looked too much like a pitch/landing page. v4 restructures the product around the way a Rajasthan State Nodal Officer, district verifier and farmer would actually work.

## Product surfaces
- `/` — State AgriStack Operations MIS
- `/kisan` — installable offline-first farmer PWA
- `/api/*` — evaluator-grade deterministic service contracts

## Operational model
- Verified State baselines are separated from synthetic demo KPIs.
- State Overview prioritizes rollout, pendency, SLA, source provenance and integration health.
- GIS is contextual; authorized Rajdharaa/LGD is the production administrative geometry authority.
- CARE separates source facts, farmer assertions and official decisions.
- Offline workflows use local queue → server acknowledgement → revalidation/CARE, never silent source mutation.
- SahmatiOS limits consent by purpose, scope and duration and does not claim statutory Consent Manager status.
- Scheme checks are deterministic pre-checks, not benefit approvals.
- SUTRA-ID Edge remains an optional BHASHINI-aligned voice/low-connectivity field channel alongside the required farmer PWA and assisted service paths.

## External integration truth states
`LIVE PROTOTYPE` · `SANDBOX` · `PUBLIC REFERENCE` · `CONTRACT READY`

No Government connector is labelled live unless credentials and a real response are available.
