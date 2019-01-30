const flow = require('flow-bin')
const { execFileSync } = require('child_process')

module.exports = async function collectFlowStatus(cwd = __dirname) {
  const result = execFileSync(flow, ['status', '--json'], { cwd, env: process.env })
  const resultJson = JSON.parse(result)
  return resultJson
}
