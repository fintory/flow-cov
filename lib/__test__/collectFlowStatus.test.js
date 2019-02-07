const path = require('path')
const collectFlowStatus = require('../collectFlowStatus')

describe('collectFlowCoverage', () => {
  test('returns object with `passed: true`', () => {
    const report = collectFlowStatus(path.join(__dirname, 'fixtures'))

    expect(report.passed).toBe(true)
  })

  test('returns object with `passed: false` for failing tests', () => {
    const report = collectFlowStatus(path.join(__dirname, 'fixtures-failing'))

    expect(report.passed).toBe(false)
  })

  test("does't throw error when failing", () => {
    expect(() => {
      collectFlowStatus(path.join(__dirname, 'fixtures-failing'))
    }).not.toThrow()
  })
})
