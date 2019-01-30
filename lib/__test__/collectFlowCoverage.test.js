const path = require('path')
const collectFlowCoverage = require('../collectFlowCoverage')

describe('collectFlowCoverage', () => {
  let fileName
  let coverage

  beforeEach(async () => {
    fileName = path.join(__dirname, 'fixtures/simple.js')
    coverage = await collectFlowCoverage({}, [fileName])
  })

  test('returns an array', async () => {
    expect(coverage).toBeInstanceOf(Array)
  })

  test('returns the right file names', async () => {
    expect(coverage[0].file).toBe(fileName)
  })
})
