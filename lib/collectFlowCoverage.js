const flow = require('flow-bin')
const Promise = require('bluebird')
const { execFileSync } = require('child_process')
const { genCheckFlowStatus } = require('flow-annotation-check')

const handleFile = async (config, filePath) => {
  try {
    const cov = execFileSync(flow, ['coverage', filePath, '--json'], {
      env: process.env,
    }).toString()
    const file = filePath.replace(`${process.cwd()}`, '.')
    const { expressions } = JSON.parse(cov)
    const locs = expressions.uncovered_count + expressions.covered_count
    const coveragePercentage = (expressions.covered_count / locs) * 100
    const status = await genCheckFlowStatus(flow, filePath)
    const satisfied = locs === 0 || coveragePercentage >= config.threshold

    return {
      file,
      status,
      satisfied,
      locs,
      annotated: status.indexOf('no') === 0,
      coverage: locs === 0 ? 100 : coveragePercentage,
      ...expressions,
    }
  } catch (err) {
    throw err
  }
}

module.exports = async function collectFlowCoverage(config, files) {
  return Promise.map(files, file => handleFile(config, file), { concurrency: config.concurrency })
}
