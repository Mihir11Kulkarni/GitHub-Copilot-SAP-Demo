// Prompt: "Convert this ABAP inventory fetch into CAP cds.run(...) with pagination limit 50, sort by Stock desc."
// Original snippet in abap-original.zreport.abap
// Pseudo-code since full CAP not installed here.
/*
const rows = await SELECT.from(Product)
  .columns(['ID','Name','Stock'])
  .where({ Plant: '0001' })
  .orderBy({ Stock: 'desc' })
  .limit(50)
*/
// In runtime usage with cds:
/*
const rows = await cds.run(SELECT.from(Product)
  .columns('ID','Name','Stock')
  .where({ Plant: '0001' })
  .orderBy({ Stock: 'desc' })
  .limit(50))
*/
export {}
