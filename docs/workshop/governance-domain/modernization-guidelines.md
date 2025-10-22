# Modernization Guidelines (ABAP -> CAP)
- Map SELECT fields to CDS entity columns explicitly.
- Preserve filters; use cds queries with where clause.
- Use actions for imperative updates (e.g., restock).
- Derive computed flags post-read using after READ hook.
- Separate domain logic from UI layer; Fiori uses OData only.
