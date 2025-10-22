// Prompt: "Create simple structured logger with correlation id support (pseudo)."
module.exports = function createLogger(correlationId = 'NA') {
  function log(level, message, extra = {}) {
    const entry = {
      ts: new Date().toISOString(),
      level,
      message,
      correlationId,
      ...extra
    }
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry))
  }
  return {
    info: (msg, extra) => log('INFO', msg, extra),
    warn: (msg, extra) => log('WARN', msg, extra),
    error: (msg, extra) => log('ERROR', msg, extra)
  }
}
