# Pipeline Observatory

**GitHub Pages:** https://leetj94-lab.github.io/etl_monitoring/

A functional ETL operations concept: inspect source records, normalize fields/units,
validate pinned contracts, isolate rejected rows, load an equipment-context dataset
and recover failed/quarantined attempts with evidence. Actual JavaScript processing
runs in the browser; sources, latency, roles and failure scenarios are synthetic.

## Pipelines

| Pipeline | Source owner | Processing |
| --- | --- | --- |
| PIPE-ASSET-SYNC | master_data | Index a v2 equipment export; preserve four-state lifecycle vocabulary |
| PIPE-QUALITY | synthetic_sensor | Normalize observations, convert um/s to mm/s, isolate invalid tags/units |
| PIPE-DRAWING-INDEX | engineering_drawing | Index released drawing/equipment relationships and pinned revisions |
| PIPE-DELIVERY-INDEX | document_delivery | Consume accepted release references; validate manifest hash syntax |

The fixed source samples contain 8 equipment records, 11 observation rows, 20 drawing
relationships and 1 accepted handover. Seven seeded executions are calculated by
the same processor used for manual runs; they produce 37 current target records.
Two quarantined observation rows and two failed batches demonstrate recovery.

## What works

- **Systems network** is the default view: a knowledge-graph-style integration map
  with 13 nodes and 19 directed, typed relationships. Document extraction fans out to
  master candidates, SVG/title/object references and twin anchors; the master snapshot
  distributes maintenance profiles, quality limits, work constraints and identity data.
- Presets focus the entire ecosystem, handover fan-out, master distribution or delivery
  exceptions. Filter by source neighborhood (1–3 hops), upstream/downstream direction,
  payload category, delivery outcome, equipment or relationship search. Nodes can be
  dragged; canvas supports pan, zoom, Fit, layout reset and expansion.
- Select nodes to inspect dependencies/data products or select edges to inspect the
  actual sample payload, source event, recipient, outcome and message attempt history.
  Source-event simulation generates typed messages in browser-local consumer inboxes.
  Animated particles replay sample paths; animation can be paused and respects reduced motion.
- Consumer timeout and stale published-profile examples support guarded per-message
  replay. Successful recovery preserves its parent evidence. Held master candidates
  cannot bypass source Admin review. Source malformed-object/unit examples remain
  quarantined until corrected in their owner systems.
- Route health includes unresolved matching deliveries, so a newer success does not
  hide an older failure for another equipment. Source event IDs are idempotent; reused
  event identities with conflicting profile/equipment are rejected.
- Maintenance, quality, work, analytics and archive nodes are **concept consumers**;
  they do not imply new deployed services or cross-app writes. Master-sourced payload
  values come from fixtures/network-registry.json, pinned to master_data commit
  111343298226565f8a60e0e848a9e732960915fb. Network state uses a separate localStorage key
  so prior pipeline execution history remains intact.
- **Execution stages** retains the prior operational view and related-run navigation.
- Interactive SVG node/edge topology for all four pipelines: source/extract → normalize
  → validate → load → target, plus rejection branches. Colors and arrows derive from
  execution evidence; skipped stages show zero processed rows and retained targets
  preserve their existing counts. Select nodes to inspect records, logs or targets.
  Zoom, pan, Fit and canonical-equipment filters support graph exploration.
- Pipeline register, execution history, stage status, actual record counts, run search,
  status filtering and canonical equipment-context filtering.
- Real source-to-target field mapping, physical-unit normalization and row validation.
  Missing required fields fail normalization before any writes are committed.
- Idempotent target keys: repeated equivalent rows are skipped; conflicting duplicate
  event keys and older/equal conflicting target events are quarantined.
- Unknown equipment, invalid values/units/timestamps, invalid source lifecycle,
  mismatched/unreleased drawings and unaccepted handover references are blocked.
- Source timeout and contract-drift scenarios preserve target records and checkpoints.
- Corrected replay of quarantined rows processes only the original rejected subset.
  Failed-batch recovery can use a conforming replacement snapshot. Attempts preserve
  original source evidence, committed-output snapshots, logs and parent/recovery IDs.
- The event checkpoint is the maximum committed event time, never a wall-clock claim
  or a real upstream extraction cursor. Explicit replays retain rejected records
  independently of that watermark. No data is silently discarded by watermark filtering.
- Operator/Observer demo roles, reason-required interventions, pause/resume interlocks
  and a browser-local activity trace. Pause blocks manual runs and retries.
- Data lineage: source owner → mapping → pinned contract → dataset → equipment context;
  field mappings, target rows and links into the four companion applications.
- Download complete run evidence, execution logs and current target datasets as JSON/TXT.
- Browser-local persistence, malformed-state recovery and reset.

## Try it

1. Start on quality ingestion / RUN-00006. Inspect the 2 rejected records in Quarantine.
2. Replay quarantined rows → Corrected synthetic source → Execute new attempt.
   Exactly 2 rows load, target observations rise from 8 to 10, and the parent is linked
   to the recovery. History keeps the original rejection evidence.
3. Select the failed drawing-index run. An unchanged retry fails again. A corrected
   snapshot succeeds with 20 duplicates and zero new writes.
4. Run an asset batch with Simulate source timeout. Target data and checkpoint remain
   unchanged. Retry with a conforming source to inspect idempotent recovery.
5. Open Data lineage, select equipment and follow the same asset ID into master data,
   drawings, handover or the twin. Export the target dataset to inspect actual records.
6. Pause a connector or switch to Observer; domain actions prevent new execution.

## Main-branch deployment

Configure **Pages → Deploy from a branch → main → /(root)**.
Root HTML/JS/CSS, fixtures/ and .nojekyll are committed ready to serve. Our workflow
validates generated output; GitHub's branch Pages workflow publishes it.

```sh
npm run build
npm test
python3 -m http.server 8000
```

Node.js 22+, no dependency installation or build framework required. Edit src/ and
fixtures/catalog.json, build, then commit source and root output together. Optional
Google Fonts fall back to system fonts. No ChatGPT hosting dependency.

## Ownership and limits

All source rows and geometry-related references are original synthetic examples.
No employer assets, industrial credentials or production sources are included.
ETL consumes pinned source contracts; equipment standards, drawing releases and
document acceptance remain owned by their respective applications.

The role selector is not authentication, activity is not tamper-resistant, and source
connections, execution latency and faults are simulated. There is no remote agent,
database, scheduler, background job, industrial telemetry, email alert or cross-site
automatic synchronization. Handover hashes are validated as manifest references;
the underlying document bytes are not rehashed by this ETL app. Use document_delivery
to inspect the content-hash checks on its own files.

The backend extension plan and pinned source provenance are in docs/INTEGRATION.md.
Twenty-five tests cover operational interlocks, graph evidence and system-message
fan-out/replay/filtering; browser checks are in QA.md.
MIT for original code and synthetic fixtures.
