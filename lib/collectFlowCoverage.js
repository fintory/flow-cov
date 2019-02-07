const flow = require('flow-bin')
const { execFileSync } = require('child_process')
const { genCheckFlowStatus } = require('flow-annotation-check')

module.exports = async function collectFlowCoverage(config, files) {
  return Promise.all(
    files.map(async file => {
      try {
        const cov = execFileSync(flow, ['coverage', file, '--json'], {
          env: process.env,
        }).toString()
        const { expressions } = JSON.parse(cov)
        const locs = expressions.uncovered_count + expressions.covered_count
        const coveragePercentage = (expressions.covered_count / locs) * 100
        const status = await genCheckFlowStatus(flow, file)
        const satisfied = locs === 0 || coveragePercentage > config.threshold

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
    })
  )
}
