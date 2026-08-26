# v4 Architecture Snapshot

```text
FARMER / FIELD CHANNELS
  Farmer PWA ─ Assisted eMitra/CSC/FPO/Krishi Sakhi ─ SUTRA-ID Edge
       │                         │                         │
       └──────────── offline transaction contract ────────┘
                              │
                       /api/offline-sync
                              │
                  ACK + next-system routing
                              │
        ┌─────────────────────┼──────────────────────┐
        ▼                     ▼                      ▼
      CARE                SahmatiOS           Scheme Pre-check
human authority        purpose policy        deterministic trace
        │                     │                      │
        └─────────────────────┼──────────────────────┘
                              ▼
                    State Operations MIS
                  rollout · pendency · audit
                              │
                      Raj Sewa Dwaar pattern
                              │
 ┌─────────────┬──────────────┼──────────────┬───────────────┐
 ▼             ▼              ▼              ▼               ▼
Farmer/CSR   Jan Aadhaar   e-Dharti/RoR   Rajdharaa      other approved
UFSI         reference      DILRMP          GIS            State rails
```

## Trust boundary
The evaluator API layer proves workflow contracts only. Production integration is deployed through department-approved identity, middleware and source-system interfaces. No evaluator API is an authoritative Government system.
