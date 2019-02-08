const flow = require('flow-bin')
const { execFileSync } = require('child_process')

module.exports = function collectFlowStatus(cwd = __dirname) {
  try {
    const result = execFileSync(flow, ['status', '--json'], { cwd, env: process.env })
    const resultJson = JSON.parse(result)
    return resultJson
  } catch (err) {
    return { passed: false }
  }
}
