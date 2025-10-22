// Prompt: "Create a CDS entity Product with UUID key, Name string(120), Stock Integer, LastUpdated timestamp, derived LowStock flag (<5)."
entity Product {
  key ID         : UUID;
  Name           : String(120);
  Stock          : Integer;
  LastUpdated    : Timestamp;
  LowStock       : Boolean; // derived in handler
}
