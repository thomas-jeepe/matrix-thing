module.exports = function () {

  return {
    files: [
      'index.ts'
    ],

    tests: ['index.test.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  }
}