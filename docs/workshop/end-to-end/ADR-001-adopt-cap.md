# ADR-001: Adopt SAP CAP for Product Service Modernization

## Status
Accepted

## Context
A legacy ABAP report handles inventory listing and manual stock adjustments. Enhancing it further increases monolith complexity, limits test automation, and slows integration with modern tooling (CI/CD, security scanning, performance testing).

## Decision
Adopt SAP Cloud Application Programming Model (CAP) using Node.js/TypeScript for the Product domain service and expose OData endpoints for UI consumption.

## Rationale
| Factor | ABAP Enhancement | CAP Service |
|--------|------------------|-------------|
| Testability | Limited automated unit testing | Jest integration straightforward |
| Extensibility | Harder to modularize | Service + actions pattern |
| Tooling | Traditional transport workflow | Git-based, CI-friendly |
| Modern APIs | Manual wrappers | Native OData/REST support |
| Developer Velocity | Slower for new features | Faster with Copilot + modern libs |

## Consequences
- Requires Node.js skill uplift
- Need governance for dual landscape (ABAP + CAP)
- Introduces new deployment pipeline components

## Alternatives Considered
- Continue ABAP enhancements: Avoids new stack but perpetuates monolith limits.
- Adopt microservices with generic Express only: Faster start but loses CDS modeling benefits.

## Implementation Notes
- Start with single Product service
- Use sqlite dev, migrate to persistent store later
- Integrate security scanning (CodeQL) from initial workflow

## Prompt Used to Draft (Traceability)
"Generate an ADR adopting CAP over continuing ABAP enhancements for inventory modernization including rationale and consequences."

## Follow-Up
- ADR review sign-off by Architecture Board
- Add ADR-002 for logging/telemetry approach later
