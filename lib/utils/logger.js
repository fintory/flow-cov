module.exports = function log(message) {
  const { DEBUG, SILENT } = process.env
  if (!SILENT && (DEBUG && (DEBUG === 'true' || DEBUG === true))) {
    console.log(message)
  }
}
