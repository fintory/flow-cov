const CWD = process.cwd()
const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')
const flow = require('flow-bin')
const { execFile } = require('child_process')
const launchReporter = require('./reporters')
const collectFlowCoverage = require('./collectFlowCoverage')

module.exports = async function run() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json')))
    const userConfig = pkg['flow-cov']

    const defaultConfig = {
      globIncludePatterns: [],
      globExcludePatterns: [],
      reporters: ['text'],
    }

    const cfg = { ...defaultConfig, ...userConfig }

    if (!cfg) {
      throw new Error('Configuration could not be found.')
    }

    const flowStatus = await execFile(flow, ['status'], { cwd: CWD })
    const files = await glob([
      ...cfg.globIncludePatterns,
      ...cfg.globExcludePatterns.map(p => `!${p}`),
    ])

    if (files.length === 0) throw new Error('No files were found matching the globs.')

    const coverage = await collectFlowCoverage(cfg, files)

    const coverageSum = coverage.reduce((acc, cur) => {
      if (Number.isNaN(cur.coverage)) return acc
      return acc + cur.coverage
    }, 0)

    const totalCoverage = coverageSum / coverage.length
    const totalCoverageSatisfied = totalCoverage > cfg.threshold

    if (!Array.isArray(cfg.reporters)) throw new Error('Reporters need to be an array.')
    if (cfg.reporters.length === 0) throw new Error('No reporters were set.')

    const response = {
      totalCoverage,
      totalCoverageSatisfied,
      filesCoverage: coverage,
      config: cfg,
    }
    const reportersResponse = await Promise.all(
      cfg.reporters.map(type => launchReporter(type, response))
    )

    return {
      ...response,
      reportersResponse,
    }
  } catch (err) {
    throw new Error(err)
  }
}
