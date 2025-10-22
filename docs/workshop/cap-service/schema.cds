// Duplicate from end-to-end/schema.cds for focused CAP folder
entity Product {
  key ID         : UUID;
  Name           : String(120);
  Stock          : Integer;
  LastUpdated    : Timestamp;
  LowStock       : Boolean; // derived
}
