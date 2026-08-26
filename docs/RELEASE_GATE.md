# Evaluator Release Gate

A release is submission-ready only when every gate below is either PASS or explicitly disclosed as an external infrastructure limitation.

## Product gates
- [ ] Production `/` resolves to `command-centre/`, not legacy dashboard/pitch HTML.
- [ ] `/kisan` resolves to the installable farmer PWA.
- [ ] No OpenStreetMap/world basemap exists in the command centre.
- [ ] Rajasthan current context states 41 districts and keeps production geography bound to authorized Rajdharaa/LGD.
- [ ] State Overview is officer-first: rollout matrix, pendency/SLA, integration health, source provenance and trusted events.
- [ ] District and role filters change operational scope rather than acting as decorative controls.
- [ ] CARE actions create bounded decision receipts; no action silently mutates a Government source.
- [ ] Consent is purpose/scope/duration limited and revocable; offline requests are not shown as active before acknowledgement.
- [ ] Scheme pre-check is deterministic and explicitly non-statutory.

## Offline/PWA gates
- [ ] Manifest includes 192px and 512px icons.
- [ ] Service worker caches the app shell and same-origin assets only.
- [ ] Farmer action works in simulated offline mode and survives reload in local storage.
- [ ] Reconnect posts queued transactions to `/api/offline-sync`.
- [ ] Queue items are removed only after server acknowledgement.
- [ ] Parcel acknowledgement routes to CARE with revalidation required.

## Integrity gates
- [ ] Verified aggregate baselines carry source, date and URL provenance.
- [ ] Synthetic operational data is visibly labelled.
- [ ] Government connectors use truth states: live prototype / sandbox / public reference / contract ready.
- [ ] SUTRA-ID Edge is optional last-mile rail, not a substitute for the required farmer app.
- [ ] No demo farmer data is real personal data.

## Engineering gates
- [ ] `npm test` passes locally or in CI.
- [ ] API modules compile.
- [ ] Command-centre and farmer inline JavaScript compile.
- [ ] GitHub Actions job runs; if GitHub returns `startup_failure` before a job exists, document it separately rather than misclassifying it as test failure.
- [ ] Desktop visual QA at evaluator resolution.
- [ ] Mobile visual/PWA QA.
- [ ] End-to-end 3-minute judge walkthrough completed without manual state repair.

## Merge rule
Do not merge the release PR until code/product gates pass. External CI startup infrastructure may be separately disclosed only if the same smoke gate has been executed successfully in an independent environment.
