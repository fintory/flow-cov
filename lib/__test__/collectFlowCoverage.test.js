const path = require('path')
const collectFlowCoverage = require('../collectFlowCoverage')

describe('collectFlowCoverage', () => {
  let fileName
  let coverage

  beforeAll(async () => {
    jest.setTimeout(20000)

    fileName = path.join(__dirname, 'fixtures/simple.js')
    coverage = await collectFlowCoverage({ concurrency: 1 }, [fileName])
  })

  test('returns an array', async () => {
    expect(coverage).toBeInstanceOf(Array)
  })

  test('returns the right file names', async () => {
    const file = fileName.replace(process.cwd(), '.')
    expect(coverage[0].file).toBe(file)
  })

  test('returns the right file names', () => {
    expect(collectFlowCoverage({ flowArgs: ['--help'] }, [fileName])).rejects.toThrow()
  })
})
