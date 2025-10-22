# OData Integration (S/4 to BTP)

## Goal
Expose Product domain via OData v4 for consumption by Fiori/UI5 and potential external integration; outline future S/4HANA side-by-side flow.

## Current State (Workshop)
- Local CAP pseudo service would publish `/odata/v4/ProductService/Product`
- Fiori manifest consumes this endpoint directly

## Sample Queries
```
GET /odata/v4/ProductService/Product?$select=ID,Name,Stock&$orderby=Stock desc&$top=50
GET /odata/v4/ProductService/Product('<uuid>')
POST /odata/v4/ProductService/restock { "id": "<uuid>", "amount": 5 }
```

## Prompts
- "Generate sample OData queries for listing and detail retrieval of Product service."
- "Suggest OData filters for low stock products (Stock lt 5)."

## Future S/4 Integration
1. Use OData provisioning or SAP Cloud Connector for secure connectivity
2. Map S/4 material entity to Product via transformation layer
3. Introduce replication jobs or event-driven update (Enterprise Event enablement)

## Security Considerations
- Enforce auth scopes per action (restock requires update scope)
- Validate input payloads (positive amount)

## Next Steps
- Implement real CAP service and verify `$metadata` generation
- Add draft enablement if needed for UI scenarios
