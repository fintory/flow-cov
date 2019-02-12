![flow-cov – Your new favorite flow coverage reporting tool.](https://s3.eu-central-1.amazonaws.com/github-banner/flow-cov.png)

[![CircleCI](https://circleci.com/gh/fintory/flow-cov.svg?style=shield)](https://circleci.com/gh/fintory/flow-cov) [![Waffle.io - Columns and their card count](https://badge.waffle.io/fintory/flow-cov.svg?columns=To%20Do)](https://waffle.io/fintory/flow-cov) [![](https://img.shields.io/codeclimate/maintainability/fintory/flow-cov.svg?style=flat)](https://codeclimate.com/github/fintory/flow-cov)

## What is `flow-cov`?

`flow-cov` is aimed to be a tool to collect the flow-coverage of your project, just like you collect the test coverage for your Jest projects. `flow-bin` only has support for collecting coverage from one file at a time. What `flow-cov` does is that it uses globs to find all files you want, runs the command for each file found, and collects coverage and the parts of the files that are not covered. Easy as that.

Unlike jest, istanbul, etc., you sadly cannot post your results to coveralls.io or codecov.io. **Yet!**

## Command line tool

You can easily use the command line tool we are currently shipping with, by using the following command:

```
$ flow-cov
```

### Options

The command line interface tool offers some options you can use to customize the behavior of the configuration specified in `package.json`. See below for all options.

**`--reporters <reporters>`**

The reporters option is used for overwriting the reporters specified in your `package.json`. It can be used when in a CI environment or even on your computer. 
To use it, see the following usage:

```sh
$ flow-cov --reporters json
```

You can also supply a list of reporters by seperating the reporters with a `,`:

```sh
$ flow-cov --reporters json,text
```

**`--concurrency <numberOfFiles>`**

The concurrency option is for specifying a number of files that are worked on concurrently. This can be used to limit the numbers, when there is not that much RAM available. **Note:** `Infinity` is not a valid value. Try to use a high value, if you want all files at once.

**`--threshold <number>`**

Overwrite or define the threshold specified in your `package.json` file. 

**`--pretty`**

Only with the use of the JSON reporter. The `--pretty` option is telling the tool to prettify the output of the JSON returned by the reporter.

**`--verbose`**

Not much to say here. Verbose is just saying that everything in the script should be logged. Do not use if you are using piping such as `flow-cov --reporters json > output.json`.

**`--no-progress`**

Suppresses the progress bar output. 

## Configuration

Configuration is very easy and straight forward. Just include the following object in your package.json under the `flow-cov` key. For a specific comment and notes for the configurations, please refer to the "[Options](#options)" part of the README.md

```json
{
  "threshold": 90,
  "globIncludePatterns": ["**/*.js"],
  "globExcludePatterns": [],
  "reporters": ["text"],
  "concurrency": 5
}
```

The `package.json` would look something like this then:

```json
{
  "name": "your-project-name",
  "devDependencies": {
    "flow-cov": "*"
  },
  "flow-cov": {
    "threshold": 90,
    "globIncludePatterns": ["**/*.js"],
    "globExcludePatterns": [],
    "reporters": ["text"],
    "concurrency": 5
  }
}
```

## About

### Inspiration

[We](https://fintory.com/en?ref=flow-cov) almost worked with `flow-coverage-report` for one and a half year now, but at some point felt, like we need some more features and needed to have them evolved quickly. But since the [code frequency](https://github.com/rpl/flow-coverage-report/graphs/code-frequency) and [commit activity](https://github.com/rpl/flow-coverage-report/graphs/commit-activity) slept a little in the last time, we are now creating our very own coverage reporter.

Though, we are starting with a little bare construction of the reporter, the repository is here to live up a little more and by evolving to a better coverage reporter. [We also have a roadmap.](https://github.com/fintory/flow-cov/issues/12)

### Shameless plug

[![Powered by Fintory](https://img.shields.io/badge/Powered%20by-Fintory-2e8eff.svg?style=for-the-badge)](https://fintory.com)
