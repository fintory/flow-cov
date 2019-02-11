module.exports = function jsonReporter(report) {
  const contents = JSON.stringify(report, null, report.config.pretty ? 2 : 0)

  console.log(contents)

  return {
    reporterName: 'json',
    contents,
  }
}
