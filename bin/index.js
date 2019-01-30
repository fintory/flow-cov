#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const logError = require('./utils/logError')

program
  .version(pkg.version)
  .option('-r, --reporter <reporters>', 'Specify custom reporters (multiple allowed with comma)')
  .option('-v, --verbose', 'Run `flow-cov` in verbose mode')
  .parse(process.argv)

// eslint-disable-next-line
async function run() {
  try {
    const runCoverageTool = require('../lib')
    const report = await runCoverageTool()

    if (report.coverageSatisfied) {
      process.exit(0)
    } else {
      process.exit(127)
    }
  } catch (err) {
    return logError(err)
  }
}

run()
