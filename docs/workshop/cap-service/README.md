# CAP Service Creation

## Objective
Show how GitHub Copilot accelerates creation of Product service (CDS + handler + action + derived fields).

## Artifacts
- `schema.cds`: Product entity
- `product-service.ts`: Pseudo-handler (in end-to-end folder)

## Typical Prompts
1. "Create a CDS entity Product with UUID key ..."
2. "Generate CAP handler implementing restock action and derived LowStock flag."
3. "Suggest validation improvements for restock action."

## Implementation Notes
- Real CAP runtime: place `schema.cds` under `db/`, handler under `srv/`.
- Use `cds watch` for local dev.

## Next Steps
- Add real cds tests
- Introduce persistence beyond sqlite
- Implement multi-tenancy scenario
