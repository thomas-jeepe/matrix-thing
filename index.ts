function gcd(a, b) {
  return !b ? a : gcd(b, a % b)
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b)
}

type AugMatrix = [number, number, number]

export function bringTo0(a: AugMatrix, b: AugMatrix, i: number): AugMatrix {
  const target = lcm(b[i], a[i])
  const multiplier = -(target/b[i])
  const multiplierB = target/a[i]
  a = a.map(v => v * multiplierB)
  a = a.map((v, i) => v + (multiplier * b[i]))
  return a
}

export function bringTo1(a: AugMatrix, i: number): AugMatrix {
  a = a.map(v => v/a[i])
  return a = a.map(v => v === -0 ? 0 : v)
}

export function diagonalize(a: AugMatrix, b: AugMatrix) {
  if (b[0] !== 0) {
    b = bringTo0(b, a, 0)
  }
  if (b[1] !== 1) {
    b = bringTo1(b, 1)
  }
  if (a[1] !== 0) {
    a = bringTo0(a, b, 1)
  }
  if (a[0] !== 1) {
    a = bringTo1(a, 0)
  }
  return [a, b]
}

console.log(diagonalize(
  [4, 3, 29],
  [6, 7, 41]
))