#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const pkg = require('../package.json')
const logError = require('./utils/logError')

program
  .version(pkg.version)
  .option('-r, --reporters <reporters>', 'Specify custom reporters (multiple allowed with comma)')
  .option('-c, --concurrency <numberOfFiles>', 'Number of files that are handled at a time')
  .option('--no-progress', 'Use this flag to hide the progress bar')
  .option('-t, --threshold <number>', 'Specify a custom threshold')
  .option('-P, --pretty', 'Prettify the output (only with `json` reporter)')
  .option('-v, --verbose', 'Run `flow-cov` in verbose mode')
  .parse(process.argv)

// eslint-disable-next-line
async function run() {
  try {
    const runCoverageTool = require('../lib')
    const config = {}

    if (!program.progress) {
      process.env.SILENT = true
    }

    if (program.verbose) {
      console.log(chalk.red('ATTENTION!'))
      console.log(chalk.red(`You are currently running in ${chalk.bold('verbose')} mode.`))
      console.log(chalk.red(`The output is possibly not valid for piping, etc.`))
      console.log('')

      process.env.DEBUG = true
    }

    if (program.threshold) {
      config.threshold = parseInt(program.threshold)
    }

    if (program.concurrency) {
      config.concurrency = parseInt(program.concurrency)
    }

    if (program.reporters) {
      config.reporters = program.reporters.split(',')
    }

    if (program.pretty) {
      config.pretty = program.pretty
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
