# Agentic Automation

## Purpose
Introduce proactive services and prompt-driven automation (risk scoring, telemetry suggestions, resilience strategies).

## Artifacts
- `risk-service.js`: Express risk scoring example
- `prompts-cheatsheet.md`: Curated automation prompts

## Example Flow
1. Fiori UI requests Product list
2. For each LowStock item, call risk microservice
3. Display severity badge (future enhancement)

## Prompts
- "Create Express risk scoring service returning severity by product stock."
- "Suggest resilience improvements for restock action." 
- "Generate telemetry middleware capturing latency and correlation id." (future)

## Next Steps
- Integrate risk service call in CAP handler or UI
- Add telemetry middleware sample
- Add Chat Extension concept for automated risk evaluation
