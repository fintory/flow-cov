const textReporter = require('./text')
const jsonReporter = require('./json')

module.exports = function launchReporter(type, report) {
  switch (type) {
    case 'json':
      return jsonReporter(report)
    case 'text':
      return textReporter(report)
    default:
      throw new Error('Reporter found, that is not supported.')
  }
}
