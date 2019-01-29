const flow = require('flow-bin')
const { spawn } = require('child_process')

module.exports = function collectFlowStatus() {
  return new Promise((yes, no) => {
    const process = spawn(flow, ['status'])

    process.on('close', code => (code === 0 ? yes(code) : no(code)))
  })
}
