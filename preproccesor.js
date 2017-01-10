const tsc = require('typescript')
const tsConfig = require('./tsconfig.json')

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(
        src,
        {
          "target": "ES6",
          "experimentalDecorators": true,
          "strictNullChecks": true,
          "module": "commonjs",
          "jsx": "react"
        },
        path,
        []
      )
    }
    return src
  }
}
