const textReporter = require('./text')

module.exports = function launchReporter(type, report) {
  switch (type) {
    case 'text':
      return textReporter(report)
    default:
      throw new Error('Reporter found, that is not supported.')
  }
}
