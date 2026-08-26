# RAJ-AGRISETU X — Evaluator Runbook

## 3-minute proof journey

1. **State baseline (20s)** — Open `/`. Show 87.23L verified Farmer IDs, 41 current Rajasthan districts and 424/425 e-Dharti online tehsils. Point out that verified aggregate baselines are visually separated from synthetic operational KPIs.
2. **District operations (20s)** — Filter to Barmer. Show district readiness, land-sync backlog, 184 synthetic open CARE cases and representative oldest cases. Switch to District Officer and show that scope is locked to Barmer.
3. **Farmer last mile (40s)** — Open `/kisan`. Synthetic farmer Kamla Devi sees Farmer Registry=2 parcels versus RoR=3. Turn demo offline. Confirm the third parcel. Show `QUEUED LOCALLY`; emphasize that no Government source changed.
4. **Reconnect acknowledgement (20s)** — Return online. `/api/offline-sync` issues an ACK receipt and routes the assertion to `CARE_RECONCILIATION`. The farmer UI must remain `CARE REVIEW`; ACK means received, **not verified**.
5. **Human authority (35s)** — Return to the officer console. Open `CARE-RAJ-2026-001284`, verify the Barmer parcel evidence matrix, and approve as District Verifier. The API must return the exact same case ID plus a human-approval artifact. No Government source mutation is claimed.
6. **Cross-surface proof (20s)** — Return/focus the farmer PWA. The evaluator-session approval receipt is recognized. CARE becomes `APPROVED` while the Farmer Registry source snapshot still visibly remains 2 parcels, proving approval and source propagation are distinct states.
7. **Consent + scheme pre-check (20s)** — Grant 24h purpose consent limited to identity/parcel/crop. Run deterministic scheme pre-check. It becomes ready only after CARE approval + consent and still states that it cannot grant statutory eligibility.
8. **Integration truth + audit (5s)** — Show sandbox/contract-ready/public-reference/prototype connector states and evidence exports.

## Judge questions to answer before they are asked

- **Why not another Farmer Registry?** Rajasthan already has Farmer-ID scale. RAJ-AGRISETU X operationalizes freshness, reconciliation, consent, last-mile verification and scheme execution around the federated State-owned registry.
- **Does AI change land/eligibility?** No. Source facts, farmer assertions, AI observations and official decisions remain separate. Human authority is required for governed state change.
- **Does offline mean cached pages only?** No. It is transactional: local queue → reconnect ACK → CARE revalidation → human decision → approved downstream adapter path.
- **Is server ACK equivalent to verification?** No. This is intentionally prevented in both UI and smoke gates.
- **Are Government APIs really connected?** Only services with actual credentials are labelled live. Others are explicitly `SANDBOX`, `PUBLIC REFERENCE`, `CONTRACT READY`, or `ADAPTER PATTERN`.
- **Why SUTRA-ID Edge?** It is an optional voice-first, low-connectivity field rail aligned with BHASHINI/VYOMA-style edge workflows; the required farmer channel remains the installable offline PWA.

## Demo integrity

Every farmer identity, Farmer ID, parcel and operational KPI in the evaluator flow is synthetic. Verified aggregate baselines retain source and date provenance. No demo transaction is represented as a Government record or statutory decision.
