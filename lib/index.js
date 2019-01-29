// @flow

const CWD = process.cwd()

const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')
const flow = require('flow-bin')
const chalk = require('chalk')
const { genCheckFlowStatus } = require('flow-annotation-check')
const { execFile } = require('child_process')

const logError = require('./utils/logError')
const launchReporter = require('./reporters')
const collectFlowCoverage = require('./collectFlowCoverage')

const pkg = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json')))
const userConfig = pkg['flow-cov']

const defaultConfig = {
  globIncludePatterns: [],
  globExcludePatterns: [],
  reporters: ['text'],
}

const cfg = { ...defaultConfig, ...userConfig }

if (!cfg) {
  return logError('Configuration could not be found.')
}

module.exports = async function run() {
  try {
    const flowStatus = await execFile(flow, ['status'], { cwd: CWD })
    const files = await glob([
      ...cfg.globIncludePatterns,
      ...cfg.globExcludePatterns.map(p => `!${p}`),
    ])

    if (files.length === 0) return logError('No files were found matching the globs.')

    const coverage = await collectFlowCoverage(cfg, files)

    const coverageSum = coverage.reduce((acc, cur) => {
      if (Number.isNaN(cur.coverage)) return acc
      return acc + cur.coverage
    }, 0)

    const totalCoverage = coverageSum / coverage.length
    const totalCoverageSatisfied = totalCoverage > cfg.threshold

    if (!Array.isArray(cfg.reporters)) return logError('Reporters need to be an array.')
    if (cfg.reporters.length === 0) return logError('No reporters were set.')

    return Promise.all(
      cfg.reporters.map(type =>
        launchReporter(type, {
          totalCoverage,
          totalCoverageSatisfied,
          filesCoverage: coverage,
          config: cfg,
        })
      )
    )
  } catch (err) {
    return logError(err)
  }
}
