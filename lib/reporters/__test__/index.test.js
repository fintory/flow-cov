describe('launchReporter', () => {
  beforeEach(() => {
    jest.mock('../text', () => jest.fn())
  })

  test('launches the text reporter right', () => {
    const launchReporter = require('../')
    const reporter = require('../text')

    launchReporter('text', {})

    expect(reporter.mock.calls.length).toBe(1)
  })
})
