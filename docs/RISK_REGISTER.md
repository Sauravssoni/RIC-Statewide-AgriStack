# Evaluator Risk Register

| Risk | Why it matters | Mitigation in v4 |
|---|---|---|
| Dashboard looks like startup landing page | weak Government procurement credibility | officer-first MIS, matrices, pendency, SLA, audit; no marketing hero |
| Wrong/old Rajasthan geography | immediate evaluator trust loss | current 41-district context; no world basemap; production GIS explicitly Rajdharaa/LGD |
| Fake Government integrations | credibility/compliance failure | explicit live/sandbox/reference/contract-ready labels |
| Offline demo only caches HTML | does not satisfy operational requirement | persistent local transaction queue + server acknowledgement + revalidation semantics |
| Offline transaction silently becomes authoritative | unsafe architecture | ACK routes to CARE; source mutation remains outside evaluator API |
| Consent checkbox theatre | weak DPDP alignment | purpose, scope, duration, notice modality, data exclusions, revocation |
| AI decides eligibility/land state | serious Government-governance risk | deterministic rules + human authority boundary |
| SUTRA substitutes for required farmer app | challenge mismatch | installable farmer PWA is primary; SUTRA optional field rail |
| Synthetic KPIs mistaken for real Rajasthan metrics | misleading submission | visible data classes and source provenance |
| Old deployment remains at `/` | evaluator sees superseded UI | `vercel.json` root route explicitly targets `/command-centre/` and is smoke-tested |
