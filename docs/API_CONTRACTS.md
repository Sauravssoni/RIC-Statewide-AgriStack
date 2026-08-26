# API Contract Summary

Evaluator APIs are deterministic proof endpoints. They model the behavior expected from production adapters without pretending to possess Government credentials.

| Endpoint | Method | Purpose | Authority boundary |
|---|---|---|---|
| `/api/health` | GET | Evaluator service health | No Government connectivity implied |
| `/api/state-overview` | GET | Verified aggregate baselines + synthetic ops KPIs | Sources/date separated from demo data |
| `/api/districts` | GET | Current 41-district master + deterministic readiness demo | Operational KPIs synthetic |
| `/api/care` | GET/POST | Reconciliation case read/decision receipt | Human decision demo; no source mutation |
| `/api/consent` | POST | Grant/revoke purpose-policy receipt | Not statutory Consent Manager |
| `/api/scheme-check` | POST | Deterministic input/rule trace | Never benefit approval |
| `/api/offline-sync` | POST | Acknowledge queued PWA/SUTRA transactions | Ack ≠ source update; parcel requires CARE revalidation |

Production adapters are intended to sit behind department-approved controls / Raj Sewa Dwaar and authorized AgriStack UFSI interfaces.
