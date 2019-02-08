// const path = require('path')
//
// describe('lib/index.js', () => {
//   let runFlowCov
//   let coverage
//
//   beforeAll(async () => {
//     jest.setTimeout(10000)
//
//     process.cwd = () => path.join(__dirname, 'fixtures')
//     global.console.log = () => {}
//
//     try {
//       runFlowCov = require('../')
//       coverage = await runFlowCov()
//     } catch (e) {
//       console.error(e)
//     }
//   })
//
//   test('has the right coverage status', () => {
//     expect(coverage.flowPassed).toBe(true)
//   })
//
//   test('has the right satisfaction', () => {
//     // The threshold is so low, that even with a coverage of 10 it would
//     // pass here
//     expect(coverage.coverageSatisfied).toBe(true)
//   })
//
//   test('should be 100% coverage for mocks', () => {
//     expect(coverage.coverage).toBe(100)
//   })
// })
