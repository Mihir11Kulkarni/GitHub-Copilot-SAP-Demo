# Quality & Security

## Components
- Tests (illustrative Jest skeleton)
- Performance baseline (k6)
- Code scanning (CodeQL workflow + config)
- Structured logging utility

## Prompts
- "Create Jest tests for Product service covering create and restock error."
- "Generate k6 script for Product list endpoint." 
- "Add CodeQL scanning job to Node workflow."
- "Create structured JSON logger with correlation id." 

## Next Enhancements
- Real cds.test integration
- Thresholds & checks in k6 (p95 < 500ms)
- Custom CodeQL queries for business logic anti-patterns
- Log ingestion to monitoring backend
