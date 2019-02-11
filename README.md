![flow-cov – Your new favorite flow coverage reporting tool.](https://s3.eu-central-1.amazonaws.com/github-banner/flow-cov.png)

[![CircleCI](https://circleci.com/gh/fintory/flow-cov.svg?style=shield)](https://circleci.com/gh/fintory/flow-cov) [![Waffle.io - Columns and their card count](https://badge.waffle.io/fintory/flow-cov.svg?columns=To%20Do)](https://waffle.io/fintory/flow-cov) ![](https://img.shields.io/codeclimate/coverage/fintory/flow-cov.svg?style=flat)

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

## About

### Inspiration

[We](https://fintory.com/en?ref=flow-cov) almost worked with `flow-coverage-report` for one and a half year now, but at some point felt, like we need some more features and needed to have them evolved quickly. But since the [code frequency](https://github.com/rpl/flow-coverage-report/graphs/code-frequency) and [commit activity](https://github.com/rpl/flow-coverage-report/graphs/commit-activity) slept a little in the last time, we are now creating our very own coverage reporter.

Though, we are starting with a little bare construction of the reporter, the repository is here to live up a little more and by evolving to a better coverage reporter. [We also have a roadmap.](https://github.com/fintory/flow-cov/issues/12)
