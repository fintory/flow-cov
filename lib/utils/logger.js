module.exports = function log(message) {
  if (process.env.DEBUG) {
    console.log(message)
  }
}
