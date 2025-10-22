# ABAP Extension Modernization (Side-by-Side)

## Objective
Translate legacy ABAP extract logic to a CAP service query enabling broader feature evolution and testability.

## Artifacts
- `abap-original.zreport.abap`: Minimal anonymized SELECT logic
- `abap-transformed-handler.ts`: Pseudo-code CAP equivalent with pagination & sorting

## Prompt Examples
- "Convert this ABAP SELECT into CAP cds.run(...) including pagination and descending stock order."
- "Explain differences in scalability between ABAP loop and CAP query." (for docs)

## Validation Checklist
- Field mapping correct (matnr->ID, maktx->Name, labst->Stock)
- Filter preserved (lgort/Plant mapping)
- Sorting applied
- Limit present

## Next Steps
- Implement real handler in `srv/` using CAP runtime
- Add automated test verifying ABAP vs CAP result parity
