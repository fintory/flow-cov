const flow = require('flow-bin')
const { execFileSync } = require('child_process')

module.exports = function collectFlowStatus(cwd = process.cwd(), config = {}) {
  try {
    const { flowArgs = [] } = config
    const result = execFileSync(flow, ['status', '--json', ...flowArgs], { cwd, env: process.env })
    const resultJson = JSON.parse(result)
    return resultJson
  } catch (err) {
    return { passed: false }
  }
}
