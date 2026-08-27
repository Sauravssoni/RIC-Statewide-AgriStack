# Evaluator Entry Point — RAJ-AGRISETU X

## Live prototype

**Primary evaluator URL:** https://ric-statewide-agri-stack.vercel.app/dashboard

The following routes intentionally resolve to the same current Mission Control release:

- `/`
- `/dashboard`
- `/dashboard.html`
- `/command-centre`

**Farmer PWA:** `/kisan`

The legacy standalone dashboard is retired and self-redirects to Mission Control.

## First 15 seconds

The first screen explicitly distinguishes:

**Prototype today** — interactive workflows, deterministic evaluator APIs, offline PWA and synthetic operating data.

**90-day production core** — Department-approved integrations, authoritative GIS, field validation, security/UAT, operational SLAs, training and handover.

This maturity distinction is deliberate; the prototype does not claim to be Rajasthan's production AgriStack environment.

## Recommended 90-second evaluator journey

Click **Start 90-sec Demo** and follow one synthetic Barmer farmer:

1. **Detect** — Farmer Registry shows two parcels while the RoR mutation pattern shows three.
2. **Explain** — FarmGraph AI identifies the missing farmer→parcel relationship and explains source disagreement.
3. **Verify offline** — Farmer PWA captures the farmer assertion offline and obtains a server acknowledgement on reconnect.
4. **Authorize** — CARE requires a human-authorized decision and creates an evaluator receipt.
5. **Consent** — purpose, data scope and duration are explicit; unrelated data is excluded.
6. **Serve** — Scheme Compiler produces a deterministic readiness trace; final statutory eligibility remains outside the prototype.
7. **Scale** — the 90-day plan converts the proven workflow into a Department-operational production core.

## What makes the prototype different

**FarmGraph AI** is the temporal agricultural relationship/digital-twin layer.

**CARE** is the governed reconciliation engine.

Together they solve the post-registration problem: keeping farmer-land-crop-service relationships continuously fresh without allowing AI or a new database to silently override authoritative Government sources.

## Integrity labels

Verified State baselines are visually separated from synthetic evaluator KPIs. Government integrations remain labelled as live prototype, sandbox, public reference, contract-ready or adapter pattern according to actual maturity.
