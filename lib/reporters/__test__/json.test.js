const report = {
  filesCoverage: [],
  coverage: 100,
  coverageSatisfied: true,
  flowPassed: true,
  config: { threshold: 90 },
}

describe('jsonReporter', () => {
  beforeEach(() => {
    global.console = { log: () => {} }
  })

  test('returns the right reporterName', () => {
    const reporter = require('../json')
    const response = reporter(report)

    expect(response.reporterName).toBe('json')
  })

  test('returns valid stringified json', () => {
    const reporter = require('../json')
    const response = reporter(report)

    expect(() => JSON.parse(response.contents)).not.toThrow()
    expect(JSON.parse(response.contents).coverageSatisfied).toEqual(true)
  })

  test('works with a pretty option', () => {
    const reporter = require('../json')
    const response = reporter({ ...report, config: { ...report.config, pretty: true } })

    expect(() => JSON.parse(response.contents)).not.toThrow()
    expect(JSON.parse(response.contents).coverageSatisfied).toEqual(true)
  })
})
