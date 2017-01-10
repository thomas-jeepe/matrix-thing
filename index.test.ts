import { diagonalize, bringTo0, bringTo1 } from './index'

describe('solve', () => {
  it('should handle problem 1', () => {
    expect(diagonalize(
      [3, 8, 54],
      [4, 5, 38]
    )).toEqual([
      [1, 0, 2],
      [0, 1, 6]
    ])
  })
  it('should handle problem 3', () => {
    expect(diagonalize(
      [4, 3, 29],
      [6, 7, 41]
    )).toEqual([
      [1, 0, 8],
      [0, 1, -1]
    ])
  })
  it('should handle problem 5', () => {
    expect(diagonalize(
      [5, -3, -7],
      [2, 5, 22]
    )).toEqual([
      [1, 0, 1],
      [0, 1, 4]
    ])
  })
})