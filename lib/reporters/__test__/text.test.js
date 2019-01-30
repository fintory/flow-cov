describe('textReporter', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.console = { log: jest.fn() }
  })

  test('returns the right reporterName', () => {
    const reporter = require('../text')
    const response = reporter({
      filesCoverage: [],
      totalCoverage: 100,
      totalCoverageSatisfied: true,
      flowPassed: true,
    })

    expect(response.reporterName).toBe('text')
  })

  test('returns the right reporterName', () => {
    require('../text')({
      filesCoverage: [],
      totalCoverage: 100,
      totalCoverageSatisfied: true,
      flowPassed: true,
    })

    expect(global.console.log.mock.calls.length).toBe(2)
  })
})