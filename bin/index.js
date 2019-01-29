#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const runCoverageTool = require('../lib')

program
  .version(pkg.version)
  .option('-r, --reporter <reporters>', 'Specify custom reporters (multiple allowed with comma)')
  .option('-v, --verbose', 'Run `flow-cov` in verbose mode')
  .parse(process.argv)

runCoverageTool()
