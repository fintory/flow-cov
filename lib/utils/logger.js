module.exports = function log(message) {
  const { DEBUG } = process.env
  if (DEBUG && (DEBUG === 'true' || DEBUG === true)) {
    console.log(message)
  }
}
