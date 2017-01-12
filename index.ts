import * as _ from 'lodash'

export class Quadratic {
  constructor(public equation: [number, number, number]) {}

  xIntercept() {
    return this.solve()
  }

  yIntercept() {
    return { x: 0, y: this.equation[2] }
  }

  /**
   * Gets the vertex of the parabola
   */
  vertex() {
    let [a, b, c] = this.equation
    return {
      x: -b / (2 * a),
      y: (-(b * b) / (4 * a)) + c,
    }
  }

  /**
   * Gets coords of focus of the parabola
   */
  focus() {
    let [a, b, c] = this.equation
    return {
      x: this.vertex().x,
      y: ((1 - b * b) / (4 * a)) + c
    }
  }

  /**
   * Solves the quadratic equation
   */
  solve() {
    let [a, b, c] = this.equation
    return [
      (-b + Math.sqrt(this.discriminant())) / (2 * a),
      (-b - Math.sqrt(this.discriminant())) / (2 * a)
    ]
  }

  /**
   * Sees whether or not the equation will return a real number
   */
  isReal() {
    return this.discriminant() >= 0
  }

  /**
   * Gives the point symmetrical to the y Intercept, for easy graphing
   */
  symmetricPoint() {
    return {
      x: 2 * this.vertex().x,
      y: this.yIntercept().y
    }
  }

  /**
   * Solves for imaginary numbers
   */
  imaginary() {
    if (this.isReal()) {
      return this.solve()
    }
    let [a, b, c] = this.equation
    const factors = primeFactors(-this.discriminant())
    const grouped = groupByNumber(factors)
    let outSquare = 1
    let inSquare = 1
    grouped.forEach((v, key) => {
      while (v % 2 === 0 && v !== 0) {
        outSquare = outSquare * key
        v = v - 2
      }
      if (v === 1) {
        inSquare = inSquare * key
      }
    })
    return `${-b} ± ${outSquare === 1 ? '' : outSquare}i${inSquare !== 1 ? `*SQRT(${inSquare})`: ''} / ${2 * a}`
  }

  /**
   * Gets the discriminant of the equation
   */
  discriminant() {
    let [a, b, c] = this.equation
    return b * b - 4 * a * c
  }

  solveWith(x: number) {
    let [a, b, c] = this.equation
    return a * (x*x) + b * x + c
  }

  /**
   * Gets discriminant if y is set to a special number
   */
  specialDiscriminant(y: number) {
    let [a, b, c] = this.equation
    const newC = c - y
    return b * b - 4 * a * newC
  }

  /**
   * If the equation has a real solution for y
   */
  contains(y: number) {
    return this.specialDiscriminant(y) >= 0
  }

  solveFor(y: number) {
    let [a, b, c] = this.equation
    return [
      (-b + Math.sqrt(this.specialDiscriminant(y))) / (2 * a),
      (-b - Math.sqrt(this.specialDiscriminant(y))) / (2 * a)
    ]
  }

  toString() {
    let [a, b, c] = this.equation
    return `y = ${a}x² + ${b}x + ${c}`
  }

  static fromPoints([ax, ay]: [number, number], [bx, by]: [number, number], [cx, cy]: [number, number]) {
    const answer = rref([
      [ax * ax, ax, 1, ay],
      [bx * bx, bx, 1, by],
      [cx * cx, cx, 1, cy]
    ])
    return new Quadratic([answer[0][3], answer[1][3], answer[2][3]])
  }
}

export function groupByNumber(arr: number[]) {
  return arr.reduce((acc, v) => {
    acc.set(v, (acc.get(v) || 0) + 1)
    return acc
  }, new Map())
}

export function primeFactors(n: number) {
  let factors = []
  for (let i = 2; i < n; i++) {
    while (n % i === 0) {
      n = n / i
      factors.push(i)
    }
  }
  if (n !== 1) {
    factors.push(n)
  }
  return factors
}

export class Polynomial {
  static square(a: number, b: number) {
    if (a < 0) {
      return `-${a*a}x² - ${b * a + b * a}x - ${b * b}`
    }
    return `${a*a}x² + ${b * a + b * a}x + ${b * b}`
  }
}

export function rref(matrix: number[][]) {
  const columns = matrix[0].length
  for (let i = 0; i < columns; i++) {
    for (let j = i; j < matrix.length; j++) {
      if (j === i) {
        matrix[i] = matrix[i].map(v => v / matrix[i][j])
      } else {
        const refMatrix = matrix[i]
        matrix[j] = matrix[j].map((v, k) => v - refMatrix[k] * matrix[j][i])
      }
    }
  }
  for (let i = columns - 2; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      const refMatrix = matrix[i]
      matrix[j] = matrix[j].map((v, k) => v - refMatrix[k] * matrix[j][i])
    }
  }
  return matrix
}

const result = Quadratic.fromPoints(
  [1, 6],
  [3, 26],
  [-2, 21]
)
// const result = new Quadratic([1, -6, 2])
console.log(result.toString())
// console.log(result.yIntercept())
// console.log(result.symmetricPoint())
// console.log(result.xIntercept())
// console.log(result.vertex())
// console.log(result.focus())
// console.log(result.solve())
// console.log(result.isReal())
// console.log(result.imaginary())
// console.log(result.discriminant())
// console.log(result.solveWith(-9))
// console.log(result.solveFor(15))
// console.log(result.contains(0))
// console.log(Polynomial.square(1, -7))
