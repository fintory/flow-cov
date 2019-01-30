const CWD = process.cwd()
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const glob = require('fast-glob')
const log = require('./utils/logger')
const launchReporter = require('./reporters')
const collectFlowStatus = require('./collectFlowStatus')
const collectFlowCoverage = require('./collectFlowCoverage')

module.exports = async function run() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json')))
    const userConfig = pkg['flow-cov']

    const defaultConfig = {
      threshold: 90,
      globIncludePatterns: [],
      globExcludePatterns: [],
      reporters: ['text'],
    }

    const cfg = { ...defaultConfig, ...userConfig }

    if (!cfg) {
      throw new Error('Configuration could not be found.')
    }

    log('Configuration:')
    log(JSON.stringify(cfg, null, 2))
    log('Merged the configuration.')
    log('Running `flow status --json` now.')

    const result = await collectFlowStatus(CWD)
    const flowPassed = result.passed
    log(`Flow ran successfully? ${flowPassed ? chalk.bold('Yes') : 'No'}`)
    const files = await glob([
      ...cfg.globIncludePatterns,
      ...cfg.globExcludePatterns.map(p => `!${p}`),
    ])

    log(`Found ${files.length} files using the following globs:`)
    log(`  - Include: ${cfg.globIncludePatterns.join(', ')}`)
    log(`  - Exclude: ${cfg.globExcludePatterns.join(', ')}`)

    if (files.length === 0) throw new Error('No files were found matching the globs.')

    log('Running the flow coverage task now.')

    const absoluteFiles = files.map(file => path.join(CWD, file))
    const coverage = await collectFlowCoverage(cfg, absoluteFiles)

    log(`Got a coverage for ${coverage.length} files.`)

    const coverageSum = coverage.reduce((acc, cur) => {
      if (Number.isNaN(cur.coverage)) return acc
      return acc + cur.coverage
    }, 0)

    const totalCoverage = coverageSum / coverage.length
    const totalCoverageSatisfied = totalCoverage > cfg.threshold

    log(`Total coverage is: ${Math.round(totalCoverage)}%.`)

    if (!Array.isArray(cfg.reporters)) throw new Error('Reporters need to be an array.')
    if (cfg.reporters.length === 0) throw new Error('No reporters were set.')

    const response = {
      totalCoverage,
      totalCoverageSatisfied,
      flowPassed,
      filesCoverage: coverage,
      config: cfg,
    }

    log('Running reporters now. Selected reporters:')

    const reportersResponse = await Promise.all(
      cfg.reporters.map(type => {
        log(`  - ${type}`)
        return launchReporter(type, response)
      })
    )

    return {
      ...response,
      reportersResponse,
    }
  } catch (err) {
    throw new Error(err)
  }
}
