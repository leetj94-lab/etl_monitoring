# Platform contract and ownership

Common site ID: DEMO-PLANT-01. Canonical asset IDs retain their existing EQ-XX-NNNNN
form across all five demos. Display names are never used as identity keys.

## Source responsibilities

- master_data owns equipment lifecycle (set-up/active/inactive/expired), management
  specifications and maintenance standards. ETL reads an export rather than redefining
  those standards or changing an equipment record.
- engineering_drawing owns drawing IDs, objects and released revisions. Its relationships
  are indexed as pinned references; ETL does not release a drawing.
- document_delivery owns submission, review and acceptance. Only its seeded Accepted
  manifest is consumed; ETL does not accept a package or verify a digital signature.
- digital_twin owns spatial context and simulated quality/work examples.
- etl_monitoring owns execution evidence, transformations, quarantine and recovery.

## Pinned synthetic snapshots

fixtures/catalog.json is a self-contained pinned input, with explicit provenance:

| Source | Commit |
| --- | --- |
| master_data | 2dc41179b8d755b61d7512ace60076aad699210b |
| engineering_drawing | 13d575593f7edb7eb5523bfa4dffa906e9da1bf1 |
| document_delivery | 9a3cce40f2bf81437d4d85bb05369a2a515168a7 |

Observation rows are original synthetic fixtures. Common metric/unit constraints are
an ingestion contract, not ETL-owned maintenance or business standards. New source
registrations/revisions and browser-local edits are not automatically imported.

## URLs and exports

Inbound: /etl_monitoring/?assetId=EQ-UT-00142&pipelineId=PIPE-QUALITY&runId=RUN-00006.
Every parameter is optional. Run selection resolves its pipeline; an equipment filter
only selects related pipelines, not partial run metrics. Invalid asset context is shown
explicitly. Outbound links preserve assetId to companion applications.

Run evidence exports schemaVersion 1.0.0, source etl_monitoring, siteId, synthetic,
pipeline contract metadata, actual input/output evidence, checkpoints and logs.
Exported current target records are attributed to their last writer run. Historical
committed-output snapshots are stored separately on each run.

## Production extension plan

Use versioned source APIs and immutable object snapshots with real source cursors.
Run orchestration on a backend queue/worker with transactional loading, execution
leases, retry limits/backoff and idempotency keys. Persist jobs, rejection evidence and
checkpoint commits atomically in a database. Protect source access with scoped service
identities and secret management; apply server-side Operator/Observer permissions.
Integrate real metrics, freshness/SLA checks, alerts and trace IDs. Keep source-owner
approval workflows authoritative. Use an outbox/event bus for MasterUpdated,
DrawingReleased and HandoverAccepted events, rather than overwriting source policy.

These backend capabilities are a roadmap, not claimed behavior of this static sample.

## Many-to-many systems network

The default Systems network adds explicit directed topics across delivery, extraction,
master data, drawings, the twin and concept maintenance/quality/work/analytics/archive
consumers. The source source-of-truth is unchanged: extracted asset candidates stay
Held for master Admin review; staging a drawing reference does not release it, and
twin anchors do not activate equipment. Published maintenance/quality profiles come
from the pinned master registry, not ETL-authored policy.

fixtures/network-registry.json contains synthetic identity/lifecycle/profile data from
master_data commit 111343298226565f8a60e0e848a9e732960915fb. A handover event routes proposed
metadata and real bundled SVG/specification URLs; no file bytes are remotely uploaded.
Master events represent an already-published pinned export. Concept consumer inboxes
are browser-local JSON records with event/message/route IDs. They are not network calls.

Network source events, per-consumer replay history and inboxes are stored separately
under tj.etl.system-network.v1. Pipeline runs retain their original persistence key.
The view URL uses view=systems or view=execution; existing explicit pipeline/run deep
links still open execution detail. Equipment context is preserved on owner links and
related-run navigation. Layout/filter choices are transient UI state.

Route health considers unresolved deliveries within the equipment filter. Retrying a
timeout/profile mismatch creates a new attempt; master review holds are not retryable.
Playback animation represents recorded synthetic paths, not live remote activity.
