# Verification

- Fourteen domain tests pass: seeded real-row processing, unit conversion, deduplication,
  conflicting keys, equivalent normalized units, timestamp/value constraints, atomic
  drift failure, timeout safety, rejected-row recovery, unchanged/corrected retries,
  idempotent full replay, source ownership contracts, pause/role gates, deep links and
  persistence/export evidence.
- Browser: initial quality run reads 11 records, skips 9 already-loaded/duplicate rows
  and isolates exactly two invalid source records.
- Browser: corrected rejected-row replay reads 2, loads 2, clears unresolved quarantine,
  moves the event checkpoint to the corrected event and links the original/recovery runs.
- Browser: lineage shows the real current dataset and companion links by canonical ID.
- Root publication is regenerated and compared against committed output by CI.
- Three topology tests verify row counts, rejection branches, failed/skipped edges,
  retained targets, historical selection, recovery, pause and equipment filters.
- Browser: selecting the failed drawing Normalize node selects RUN-00007 and exposes
  its missing drawingId contract failure with Records / Execution trace actions.
- No physical-device, production-connector, scheduler, authentication, tamper-resistant
  logging or live telemetry verification is claimed.
