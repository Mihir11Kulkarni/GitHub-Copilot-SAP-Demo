# End-to-End Modernization Example

## 1. Overview
This directory shows the full lifecycle from initial requirements to deployment artifacts for modernizing a legacy ABAP inventory routine into a CAP Product service consumed by a Fiori UI, with tests, performance baseline, logging, and CI security integration.

## 2. Artifact Map
| Stage | Artifact | Description |
|-------|----------|-------------|
| Requirements | requirements.md | Business + functional + non-functional requirements |
| User Stories | user-stories.md | Stakeholder goals & acceptance criteria |
| Architecture Decision | ADR-001-adopt-cap.md | Rationale for CAP adoption |
| Domain Model | schema.cds | CDS entity definition |
| Service Logic | product-service.ts | Pseudo CAP handler (illustrative) |
| Legacy Source | abap-original.zreport.abap | Anonymized ABAP snippet |
| Modernized Logic | abap-transformed-handler.ts | Equivalent CAP query pseudo-code |
| UI Manifest | manifest.json | Fiori data source config |
| UI Annotations | annotations.cds | UI metadata for list view |
| UI View | MainList.view.xml | XML table view |
| UI Controller | MainList.controller.js | Simple interactions |
| Tests | product.test.ts | Illustrative Jest test skeleton |
| Performance | k6-script.js | Load test baseline script |
| Security CI | workflow.yml | Build/test/CodeQL/deploy placeholder |
| CodeQL Config | codeql-config.yml | Query suite config |
| Logging | logger.js | Structured logging utility |

## 3. Prompt Traceability
Each file header includes a comment showing the original Copilot prompt used for generation. Adjust and regenerate by pasting file content into Copilot Chat and refining prompts (e.g., "Improve performance test to randomize product IDs").

## 4. Modernization Flow (Step-by-Step)
1. Capture requirements & user stories
2. Record ADR for CAP adoption
3. Generate CDS entity via prompt
4. Draft service handler skeleton
5. Translate ABAP snippet into CAP query logic
6. Create Fiori manifest + annotations + view
7. Generate Jest tests (add edge refinements)
8. Produce k6 script for baseline performance
9. Add structured logger
10. Implement CI workflow with CodeQL and placeholder deploy
11. Review artifacts against requirements metrics

## 5. Key Prompts Used
| Goal | Prompt |
|------|--------|
| CDS Generation | "Create a CDS entity Product with UUID key ..." |
| Handler Logic | "Generate CAP Node.js service handler for Product ..." |
| ABAP Translation | "Convert this ABAP inventory fetch into CAP cds.run(...) ..." |
| UI Scaffold | "Generate XML view listing Products with columns ..." |
| Jest Tests | "Create Jest tests for Product service covering create ..." |
| Performance | "Generate k6 script load testing Product list endpoint ..." |
| CI Security | "Add build/test, CodeQL, and placeholder OIDC deploy jobs." |
| Logger | "Create simple structured logger with correlation id support (pseudo)." |
| ADR | "Generate an ADR adopting CAP over continuing ABAP enhancements ..." |

## 6. Validation Checklist
| Item | Status |
|------|--------|
| Requirements defined | ✅ |
| ADR recorded | ✅ |
| Domain model created | ✅ |
| Handler drafted | ✅ (pseudo) |
| ABAP translation sample | ✅ |
| UI scaffold present | ✅ |
| Tests baseline | ✅ (illustrative) |
| Performance script | ✅ |
| CI workflow | ✅ |
| Logging utility | ✅ |
| Prompts documented | ✅ |

## 7. Next Improvements
- Replace pseudo service with real CAP runtime implementation
- Integrate real Jest + cds test harness
- Add multi-tenancy example (tenant ID in Product)
- Enhance k6 script with scenario & thresholds
- Extend CodeQL config with custom queries (inventory logic anti-patterns)
- Add deployment script (e.g., SAP BTP, Azure Web App)

## 8. How to Regenerate Artifacts with Copilot
1. Open a file (e.g., `schema.cds`)
2. Highlight contents
3. Open Copilot Chat: Provide refinement prompt ("Add an Index on Name and default Stock 0")
4. Accept or adjust suggestions
5. Commit with message referencing prompt ("feat: refine CDS with index via Copilot prompt")

## 9. Deployment Readiness (Placeholder)
| Aspect | Placeholder Action |
|--------|--------------------|
| Persistence | Switch sqlite -> HDI container / PostgreSQL |
| Secrets | Introduce vault (Key Vault / AWS Secrets Manager) |
| Observability | Add telemetry middleware + dashboard |
| Auth | Add OAuth2 / JWT in handler before actions |

## 10. Wrap-Up
This end-to-end example packages all modernization lifecycle artifacts with prompt traceability. Use it as a baseline template to replicate additional domain services.
