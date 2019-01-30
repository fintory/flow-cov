const path = require('path')
const collectFlowStatus = require('../collectFlowStatus')

describe('collectFlowCoverage', () => {
  test('returns code 0 for successful run', async () => {
    const status = await collectFlowStatus(path.join(__dirname, 'fixtures'))

    expect(status).toBe(0)
  })
})
