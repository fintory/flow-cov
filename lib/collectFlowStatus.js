const flow = require('flow-bin')
const { execFileSync } = require('child_process')

module.exports = function collectFlowStatus(cwd = __dirname) {
  try {
    console.log('starting flow status')
    const result = execFileSync(flow, ['status', '--json'], { cwd, env: process.env })
    const resultJson = JSON.parse(result)
    console.log('exited flow status')
    return resultJson
  } catch (err) {
    console.log('flow status raised an error')
    return { passed: false }
  }
}
