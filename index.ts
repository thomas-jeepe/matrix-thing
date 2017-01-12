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

const result = new Quadratic([1, -14, 58])

console.log(result.yIntercept())
console.log(result.symmetricPoint())
console.log(result.xIntercept())
console.log(result.vertex())
console.log(result.focus())
console.log(result.solve())
console.log(result.isReal())
console.log(result.imaginary())
console.log(result.discriminant())
