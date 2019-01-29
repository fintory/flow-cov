// @flow

module.exports = function launchReporter(type, report) {
  switch (type) {
    case 'text':
      return require('./text')(report)
    default:
      return logError('Reporter found, that is not supported.')
  }
}
