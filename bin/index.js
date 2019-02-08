#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const logError = require('./utils/logError')

program
  .version(pkg.version)
  .option('-t, --threshold <number>', 'Specify a custom threshold')
  .option('-r, --reporters <reporters>', 'Specify custom reporters (multiple allowed with comma)')
  .option('-c, --concurrency <numberOfFiles>', 'Number of files that are handled at a time')
  .option('-v, --verbose', 'Run `flow-cov` in verbose mode')
  .parse(process.argv)

// eslint-disable-next-line
async function run() {
  try {
    const runCoverageTool = require('../lib')
    const config = {}

    if (program.threshold) {
      config.threshold = parseInt(program.threshold)
    }

    if (program.concurrency) {
      config.concurrency = parseInt(program.concurrency)
    }

    if (program.reporters) {
      config.reporters = program.reporters.split(',')
    }

    const report = await runCoverageTool(config)

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
