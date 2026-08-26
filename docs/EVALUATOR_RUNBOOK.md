# RAJ-AGRISETU X — Evaluator Runbook

## 3-minute proof journey

1. **State baseline (20s)** — Open `/`. Show 87.23L verified Farmer IDs, 41 current Rajasthan districts and 424/425 e-Dharti online tehsils. Point out that verified aggregate baselines are visually separated from synthetic operational KPIs.
2. **District operations (25s)** — State Overview → Barmer. Show district readiness, land-sync backlog and CARE priority queue. Explain that production geography is Rajdharaa/LGD-authorized; the embedded map is contextual only.
3. **Farmer last mile (45s)** — Open `/kisan`. Synthetic farmer Kamla Devi sees Farmer Registry=2 parcels versus RoR=3. Turn demo offline. Confirm the third parcel. Show `QUEUED LOCALLY` receipt; emphasize that no Government source changed.
4. **Reconnect (25s)** — Return online. `/api/offline-sync` issues an acknowledgement receipt and routes the parcel assertion to `CARE_RECONCILIATION`, with revalidation required.
5. **Human authority (30s)** — CARE workbench compares Farmer Registry, RoR and farmer assertion. District Verifier approves the demo reconciliation. Explain that AI can explain/rank anomalies but cannot mutate RoR/Farmer ID or grant statutory eligibility.
6. **Consent + scheme pre-check (25s)** — Farmer grants 24h purpose consent limited to identity/parcel/crop. Run deterministic scheme pre-check. Show the rule trace and authority-boundary statement.
7. **Integration truth + audit (10s)** — Show sandbox/contract-ready/public-reference/prototype connector states and downloadable audit/CSV evidence.

## Judge questions to answer before they are asked

- **Why not another Farmer Registry?** Rajasthan already has Farmer-ID scale. RAJ-AGRISETU X operationalizes freshness, reconciliation, consent, last-mile verification and scheme execution around the federated State-owned registry.
- **Does AI change land/eligibility?** No. Source facts, farmer assertions, AI observations and official decisions remain separate. Human authority is required for governed state change.
- **Does offline mean cached pages only?** No. It is transactional: local queue → reconnect → server acknowledgement → revalidation/CARE → human decision → downstream acknowledgement.
- **Are Government APIs really connected?** Only services with actual credentials are labelled live. Others are explicitly `SANDBOX`, `PUBLIC REFERENCE`, or `CONTRACT READY`.
- **Why SUTRA-ID Edge?** It is an optional voice-first, low-connectivity field rail aligned with BHASHINI/VYOMA-style edge workflows; the required farmer channel remains the installable offline PWA.

## Demo integrity

Every farmer identity, Farmer ID, parcel and operational KPI in the evaluator flow is synthetic. Verified aggregate baselines retain source and date provenance. No demo transaction is represented as a Government record or statutory decision.
