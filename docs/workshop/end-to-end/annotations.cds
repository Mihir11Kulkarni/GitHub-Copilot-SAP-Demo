// Prompt: "Generate Fiori annotation snippet for Product list with sortable Name and filterable Stock."
using ProductService from './schema';

annotate ProductService.Product with @UI: {
  lineItem: [
    { value: ID },
    { value: Name },
    { value: Stock },
    { value: LastUpdated }
  ],
  selectionFields: [ Name, Stock ]
};
