// @flow

const chalk = require('chalk')

const fixes = {
  'Configuration could not be found.': [
    'Make sure your configuration is in a `flow-cov` block in your package.json.',
    'Make sure you are running the command in the right folder.',
  ],
  'No files were found matching the globs.': [
    'Make sure to add a `globIncludePatterns` in your package.json.',
    "Make sure, your `globExcludePatterns` isn't excluding all files.",
  ],
  'Reporters need to be an array.': [
    'Make sure to have a `reporters` in your package.json as an array.',
  ],
  'No reporters were set.': [
    'Seems like you have unset the `reporters` config in your package.json.',
  ],
}

module.exports = function logError(error) {
  console.error(chalk.red(chalk.bold('An error happened, while executing `flow-cov`:')))
  console.error(chalk.red(`${error}\n`))

  console.log(error)

  if (fixes[error]) {
    console.log(chalk.bold('Try one of the following things to fix the issue:'))
    fixes[error].map((err, index) => {
      console.log(`${index + 1}. ${err}`)
    })
  }
}
