const path = require('path')
const collectFlowStatus = require('../collectFlowStatus')

describe('collectFlowCoverage', () => {
  test('returns code 0 for successful run', async () => {
    const report = await collectFlowStatus(path.join(__dirname, 'fixtures'))

    expect(report.passed).toBe(true)
  })
})
