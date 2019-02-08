describe('textReporter', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.console = { log: jest.fn() }
  })

  test('returns the right reporterName', () => {
    const reporter = require('../text')
    const response = reporter({
      filesCoverage: [],
      coverage: 100,
      coverageSatisfied: true,
      flowPassed: true,
      config: { threshold: 90 },
    })

    expect(response.reporterName).toBe('text')
  })

  test('returns an array with length 2 as contents', () => {
    const reporter = require('../text')
    const response = reporter({
      filesCoverage: [],
      coverage: 100,
      coverageSatisfied: true,
      flowPassed: true,
      config: { threshold: 90 },
    })

    expect(response.contents).toBeInstanceOf(Array)
    expect(response.contents.length).toBe(2)
  })

  test('returns the right reporterName', () => {
    require('../text')({
      filesCoverage: [],
      coverage: 100,
      coverageSatisfied: true,
      flowPassed: true,
      config: { threshold: 90 },
    })

    expect(global.console.log.mock.calls.length).toBe(2)
  })
})
