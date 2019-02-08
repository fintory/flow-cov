const log = require('../logger')

describe('logger', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    global.console = { log: jest.fn() }
  })

  test('logs to console in debug mode', () => {
    process.env.DEBUG = true
    log('foobar')

    expect(global.console.log.mock.calls.length).toEqual(1)
  })

  test("doesn't logs to console out of debug mode", () => {
    process.env.DEBUG = false
    log('foobar')

    expect(global.console.log.mock.calls.length).toEqual(0)
  })
})
