module.exports = function () {

  return {
    files: [
      'index.ts'
    ],

    tests: ['**/__tests__/*'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  }
}