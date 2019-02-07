const CWD = process.cwd()
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const glob = require('fast-glob')
const log = require('./utils/logger')
const launchReporter = require('./reporters')
const collectFlowStatus = require('./collectFlowStatus')
const collectFlowCoverage = require('./collectFlowCoverage')

module.exports = async function run(cliConfig = {}) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json')))
    const userConfig = pkg['flow-cov']

    const defaultConfig = {
      threshold: 90,
      globIncludePatterns: [],
      globExcludePatterns: [],
      reporters: ['text'],
    }

    const config = { ...defaultConfig, ...userConfig, ...cliConfig }

    log('Configuration:')
    log(JSON.stringify(config, null, 2))
    log('Merged the configuration.')
    log('Running `flow status --json` now.')

    const result = await collectFlowStatus(CWD)
    const flowPassed = result.passed
    log(`Flow ran successfully? ${flowPassed ? chalk.bold('Yes') : 'No'}`)
    const files = await glob([
      ...config.globIncludePatterns,
      ...config.globExcludePatterns.map(p => `!${p}`),
    ])

    log(`Found ${files.length} files using the following globs:`)
    log(`  - Include: ${config.globIncludePatterns.join(', ')}`)
    log(`  - Exclude: ${config.globExcludePatterns.join(', ')}`)

    if (files.length === 0) throw new Error('No files were found matching the globs.')

    log('Running the flow coverage task now.')

    const absoluteFiles = files.map(file => path.join(CWD, file))
    const filesCoverage = await collectFlowCoverage(config, absoluteFiles)

    log(`Got a coverage for ${filesCoverage.length} files.`)

    const coverageSum = filesCoverage.reduce((acc, cur) => {
      if (Number.isNaN(cur.coverage)) return acc
      return acc + cur.coverage
    }, 0)

    const coverage = coverageSum / filesCoverage.length
    const coverageSatisfied = coverage > config.threshold

    log(`Total coverage is: ${Math.round(coverage)}%.`)

    if (!Array.isArray(config.reporters)) throw new Error('Reporters need to be an array.')
    if (config.reporters.length === 0) throw new Error('No reporters were set.')

    const response = {
      coverage,
      coverageSatisfied,
      flowPassed,
      filesCoverage,
      config,
    }

    log('Running reporters now. Selected reporters:')

    const reportersResponse = await Promise.all(
      config.reporters.map(type => {
        log(`  - ${type}`)
        return launchReporter(type, response)
      })
    )

    return {
      ...response,
      reportersResponse,
    }
  } catch (err) {
    throw err
  }
}
