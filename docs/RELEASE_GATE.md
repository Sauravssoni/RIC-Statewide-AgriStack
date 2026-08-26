# Evaluator Release Gate — Final Mission Control RC

A release is submission-ready only when each condition is either PASS or explicitly disclosed as an external infrastructure limitation.

## Product gates
- [x] Production root resolves to the Government-style Mission Control, not a pitch landing page.
- [x] Ten evaluator modules exist: Mission Control, GIS Intelligence, FarmGraph AI, CARE Integrity, Consent & Scheme, Farmer & SUTRA, Interoperability, Rollout & Vision, Governance, Audit & Evidence.
- [x] No world/OSM/Leaflet basemap is used.
- [x] Rajasthan context is current 41-district scope; production geography is Rajdharaa/LGD-authorized.
- [x] FarmGraph AI visibly separates identity, parcel, crop, water, consent, scheme, evidence and CARE relationships.
- [x] District and role filters change operational scope.
- [x] CARE is multi-case and uses selected case ID/source matrix.
- [x] CARE approval creates a bounded evaluator receipt; it does not mutate a Government source.
- [x] Consent is purpose/scope/duration limited and revocable.
- [x] Scheme pre-check requires governed inputs and is explicitly non-statutory.
- [x] Rollout/Vision screen shows 90-day gates, three pilot contexts, ₹72.50L ask and 2030 service layers.

## Offline/PWA gates
- [x] Manifest contains 192px and 512px icons.
- [x] Service worker and installable PWA assets are present.
- [x] Offline actions use a persistent local queue.
- [x] Reconnect uses `/api/offline-sync` acknowledgement semantics.
- [x] ACK is not represented as verification or source mutation.
- [x] Parcel corrections route to CARE human review.

## Integrity gates
- [x] Verified aggregate baselines carry source/date provenance.
- [x] Synthetic operational values remain visibly labelled.
- [x] Government connectors use truth labels instead of fake production status.
- [x] SUTRA-ID Edge is optional field rail, not a substitute for the required farmer PWA.
- [x] AI authority boundary is explicit.

## Engineering gates
- [x] Command-centre JavaScript syntax check passed locally.
- [x] Structural QA: 10/10 views, 10/10 nav targets, zero duplicate IDs.
- [x] Structural QA confirmed no OpenStreetMap/Leaflet references.
- [x] Existing API/PWA core retained from the release branch.
- [ ] GitHub Actions runner — external `startup_failure` occurs before any job is created; not counted as an application test failure or pass.
- [ ] Hosted Vercel pixel-QA requires an accessible deployment URL/environment.

## Merge rule
The Mission Control release may be promoted when branch comparison is 0-behind and the exact release commit is merged/fast-forwarded without conflict. External CI startup infrastructure remains separately disclosed.
