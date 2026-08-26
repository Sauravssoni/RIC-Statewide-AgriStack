# Security & Governance Controls — v4

## Identity and access
- Target officer authentication: Raj SSO / department-authorized identity provider.
- Roles demonstrated: State Nodal Officer, District Officer, Field Operator.
- Production authorization is least-privilege and district/assignment scoped; UI role switching in evaluator mode never grants real Government privilege.

## Data minimization
- Do not create a parallel master copy of Jan Aadhaar, RoR or Farmer Registry.
- Persist only permitted references, workflow state, consent metadata, evidence hashes and audit events.
- Verified-claim responses should disclose the minimum result required for the approved purpose.

## Authority boundaries
AI may explain, translate, summarize, detect anomalies and rank conflicts. AI may not autonomously change RoR, Farmer ID, authoritative crop state, statutory eligibility or benefit approval.

## Consent
- Purpose + data scope + duration + language/modality receipt.
- Revocable policy state.
- Offline consent request remains `QUEUED_LOCAL` until server/policy acknowledgement.
- Prototype explicitly does not claim statutory Consent Manager registration.

## Offline transactions
- Local transaction IDs are generated on device.
- Reconnect posts to `/api/offline-sync`.
- Server acknowledgement includes receipt ID, next system and revalidation requirement.
- Queue entries are removed only after acknowledgement.
- Acknowledgement does not equal Government source mutation.

## Audit
Every material demo action can emit: actor role, action, case/receipt ID, timestamp, source class and authority boundary. Production should use immutable/tamper-evident storage in the department-approved environment.

## Integration truth
No Government connector is called live unless authorized credentials are available. UI must distinguish `LIVE PROTOTYPE`, `SANDBOX`, `PUBLIC REFERENCE`, and `CONTRACT READY`.
