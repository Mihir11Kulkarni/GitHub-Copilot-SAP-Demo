# SAPUI5 / Fiori App

## Goal
Consume Product OData service and display inventory list with basic actions.

## Artifacts
- `manifest.json`: App metadata & data source
- `annotations.cds`: UI annotations (lineItem + selectionFields)
- `MainList.view.xml`: Table view
- `MainList.controller.js`: Refresh & placeholder restock

## Prompts
- "Generate Fiori manifest for Product service consumption."
- "Produce XML view listing Products with columns ID, Name, Stock, LastUpdated."
- "Create controller with refresh and placeholder restock method."

## Next Enhancements
- Add filter bar binding to Stock threshold
- Implement restock dialog calling action
- Integrate semantic colors for low stock
