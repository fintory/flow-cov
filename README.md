# flow-cov

Your new favorite flow coverage reporting tool.

## Usage

### Command line tool

You can easily use the command line tool we are currently shipping with, by using the following command:

```
$ flow-cov
```

_More options to come_

### Node.js API

_Soon to come_

## About

### Inspiration

[We](https://fintory.com/en?ref=flow-cov) almost worked with `flow-coverage-report` for one and a half year now, but at some point felt, like we need some more features and needed to have them evolved quickly. But since the [code frequency](https://github.com/rpl/flow-coverage-report/graphs/code-frequency) and [commit activity](https://github.com/rpl/flow-coverage-report/graphs/commit-activity) slept a little in the last time, we are now creating our very own coverage reporter.

Though, we are starting with a little bare construction of the reporter, the repository is here to live up a little more and by evolving to a better coverage reporter. [We also have a roadmap.](#roadmap)

### Roadmap

- [x] **Bare construction** – Ship the first v0.1.0
- [ ] **Write tests** – Tests that don't fail and implement "OK"-ish coverage
- [ ] **Strict mode** – Don't care about the `@flow` annotation
- [ ] **HTML Reporter** – e.g. for using artifacts in CircleCI
- [ ] **LCOV Reporter** – e.g. for Codecov, Coveralls, ...
