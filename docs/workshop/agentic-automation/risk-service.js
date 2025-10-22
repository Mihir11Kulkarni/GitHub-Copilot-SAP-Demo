// Express risk scoring microservice (illustrative)
// Prompt: "Create Express risk scoring service returning severity by product stock."
const express = require('express')
const app = express()
app.use(express.json())

app.post('/risk', (req,res) => {
  const { stock } = req.body
  let severity = 'LOW'
  if (stock < 5) severity = 'HIGH'
  else if (stock < 10) severity = 'MEDIUM'
  res.json({ severity, evaluatedAt: new Date().toISOString() })
})

module.exports = app
