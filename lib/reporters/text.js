const chalk = require('chalk')
const Table = require('cli-table2')

const coverageTable = new Table({
  head: ['File', 'Annotated?', 'Coverage', 'Covered', 'Uncovered'].map(t => chalk.bold(t)),
  chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
})

const summaryTable = new Table()

module.exports = function textReporter(report) {
  report.filesCoverage.forEach(file => {
    coverageTable.push(
      [
        file.file,
        file.annotated ? 'No' : 'Yes',
        file.locs === 0 ? '100%' : `${Math.round(file.coverage)}%`,
        file.covered_count,
        file.uncovered_count,
      ].map(t => (file.satisfied ? chalk.green(t) : chalk.red(t)))
    )
  })

  summaryTable.push(
    [chalk.bold('Summarized coverage'), `${Math.round(report.totalCoverage)}%`],
    [
      chalk.bold('Summarized coverage satisfied?'),
      report.totalCoverageSatisfied ? chalk.green('Yes') : chalk.red('No'),
    ],
    [
      chalk.bold('Flow successfully ran?'),
      report.flowRanSuccessfully ? chalk.green('Yes') : chalk.red('No'),
    ]
  )

  console.log(coverageTable.toString())
  console.log(summaryTable.toString())
}
