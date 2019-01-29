// @flow

module.exports = function launchReporter(type, report) {
  switch (type) {
    case 'text':
      return require('./text')(report)
    default:
      throw new Error('Reporter found, that is not supported.')
  }
}
