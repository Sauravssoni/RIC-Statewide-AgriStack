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

## Consent: AgriStack-aligned, not a parallel protocol
SahmatiOS is the proposed **State notice, UX and purpose-policy adapter** around the approved AgriStack consent architecture. AgriStack itself describes its Consent Manager as a foundational privacy rail designed around DEPA-style data-blind sharing and revocation.

Prototype controls:
- standalone Hindi/English notice;
- itemised data scope;
- specified purpose and service description;
- short duration / expiry;
- explicit excluded data;
- language and modality record;
- revocation from the same product surface;
- offline consent request remains `QUEUED_LOCAL` until acknowledgement/policy activation;
- no statutory Consent Manager registration is claimed.

### DPDP Rules 2025 posture
The Digital Personal Data Protection Rules, 2025 were notified in November 2025. Their commencement is staggered; in particular Rule 3 and several operational rules commence eighteen months after Gazette publication. The prototype therefore does **not** claim present Rule-3 certification. Instead it deliberately anticipates the notified notice design principles: independently understandable notice, clear/plain language, itemised personal data, specified purpose, and a withdrawal path whose ease is comparable to giving consent. Production implementation remains subject to applicable commencement dates, the actual lawful basis for each processing activity, departmental legal review and approved grievance/rights channels.

## Offline transactions
- Local transaction IDs are generated on device.
- Reconnect posts to `/api/offline-sync`.
- Server acknowledgement includes receipt ID, next system and revalidation requirement.
- Queue entries are removed only after acknowledgement.
- **Acknowledgement means received, not verified or approved.**
- Land-linked farmer assertions route to CARE and remain pending until authorized human review.
- Only a CARE human-approval artifact may satisfy the evaluator's verified-parcel input; even that does not claim that an authoritative Government source has already been mutated.

## Audit
Every material demo action can emit: actor role, action, case/receipt ID, timestamp, source class and authority boundary. Production should use immutable/tamper-evident storage in the department-approved environment.

## Integration truth
No Government connector is called live unless authorized credentials are available. UI must distinguish `LIVE PROTOTYPE`, `SANDBOX`, `PUBLIC REFERENCE`, `CONTRACT READY`, `ARCHITECTURE ALIGNED`, and `ADAPTER PATTERN`.

## Production security acceptance areas
Before production authorization, the pilot should validate at minimum: encryption/tokenisation strategy, Raj SSO/RBAC, API gateway policy, logging/monitoring, secret management, retention, incident response, backup/recovery, processor contracts where applicable, vulnerability remediation and department-approved hosting/network controls.
