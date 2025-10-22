// Prompt: "Generate CAP Node.js service handler for Product with CRUD, auto-update LastUpdated, derive LowStock, add restock(id, amount)."
// Placeholder illustrative handler. In a real CAP project this logic would be inside srv/<service>.js using cds.service.events
// Copilot Prompt Used: "Generate CAP handler logic for Product with CRUD hooks, derived LowStock, restock action."

// Pseudo-code style for workshop (no type resolution without full CAP project context):
// The following shows intent; replace with actual CAP runtime usage when integrating.

/*
module.exports = async (srv) => {
  const { Product } = srv.entities

  srv.before(['CREATE','UPDATE'], Product, req => {
    req.data.LastUpdated = new Date()
  })

  srv.after('READ', Product, each => {
    const mark = row => row && (row.LowStock = row.Stock < 5)
    Array.isArray(each) ? each.forEach(mark) : mark(each)
  })

  srv.on('restock', async req => {
    const { id, amount } = req.data
    if (!amount || amount <= 0) return req.error(400, 'Positive amount required')
    await UPDATE(Product).set({ Stock: { '+=': amount }, LastUpdated: new Date() }).where({ ID: id })
    const [updated] = await SELECT.from(Product).where({ ID: id })
    return updated
  })
}
*/

// Since CAP dependencies aren't installed in this standalone workshop doc folder, we provide pseudo-code only.
export {} // no-op export to satisfy module system
