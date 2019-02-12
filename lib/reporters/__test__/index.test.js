describe('launchReporter', () => {
  beforeEach(() => {
    jest.mock('../text', () => jest.fn(() => ({ reporterName: 'text' })))
    jest.mock('../json', () => jest.fn(() => ({ reporterName: 'json' })))
  })

  test('launches the text reporter right', () => {
    const launchReporter = require('../')
    const reporter = require('../text')
    const report = launchReporter('text', {})

    expect(report.reporterName).toBe('text')
    expect(reporter.mock.calls.length).toBe(1)
  })

  test('launches the json reporter right', () => {
    const launchReporter = require('../')
    const reporter = require('../json')
    const report = launchReporter('json', {})

    expect(report.reporterName).toBe('json')
    expect(reporter.mock.calls.length).toBe(1)
  })

  test('throws when wrong reporter is supplied', () => {
    const launchReporter = require('../')
    expect(() => launchReporter('foobar', {})).toThrow()
  })
})
