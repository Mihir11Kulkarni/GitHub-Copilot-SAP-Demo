# Requirements

## Business Goal
Modernize legacy inventory tracking by replacing a monolithic ABAP report with a modular CAP-based Product service and Fiori UI, enabling faster feature delivery, testability, and integration with modern DevOps/security tooling.

## Functional Requirements
- Maintain Product with fields: ID(UUID), Name, Stock(Integer), LastUpdated(Timestamp), LowStock(derived boolean)
- CRUD operations for Product
- Custom action `restock(id, amount)` with validation
- Derived `LowStock` flag when Stock < 5
- Pagination and sorting on product list (default sort by Stock desc)
- Provide OData endpoint for Fiori consumption

## Non-Functional Requirements
- Response time < 300ms for list under 500 products
- Test coverage >= 60% initially
- CodeQL security scanning integrated into CI
- Secrets not stored in repo (use environment variables / vault later)
- Structured logging (JSON) with correlation id placeholder

## Constraints
- Must be buildable via Node.js 18+ and cds-dk
- Use in-memory sqlite for workshop simplicity
- Avoid proprietary ABAP content; only anonymized snippet allowed

## Success Metrics
| Metric | Target |
|--------|--------|
| Service scaffold time | < 10m |
| Modernization translation accuracy | > 90% (manual review) |
| Test coverage | >= 60% |
| Performance (p95 list endpoint) | < 500ms |

## Copilot Enablement Objectives
- Generate initial CDS and handler from natural language
- Convert ABAP snippet with minimal manual intervention
- Produce starter Jest suite
- Draft CI workflow with security steps
- Document service leveraging glossary terms

## Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| Incorrect ABAP->CAP mapping | Manual validation + refinement prompt |
| Insufficient test edge cases | Prompt for edge paths explicitly |
| Over-permissioned workflow | Use least-permission and review YAML with security prompt |
| Logging inconsistency | Centralize logger util and prompt doc generation |

## Prompts Traceability
Each artifact file will include a comment referencing the originating prompt used for its initial generation.
