import { describe, it, expect } from 'vitest'
import { calculateWinner } from './gameLogic'

describe('calculateWinner', () => {
  it('should return null for an empty board', () => {
    const squares = Array(9).fill(null)
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe(null)
    expect(line).toBe(null)
  })

  it('should return null when there is no winner', () => {
    const squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe(null)
    expect(line).toBe(null)
  })

  it('should detect a winner in the first row', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null]
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('X')
    expect(line).toEqual([0, 1, 2])
  })

  it('should detect a winner in the second row', () => {
    const squares = [null, null, null, 'O', 'O', 'O', null, null, null]
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('O')
    expect(line).toEqual([3, 4, 5])
  })

  it('should detect a winner in the third row', () => {
    const squares = [null, null, null, null, null, null, 'X', 'X', 'X']
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('X')
    expect(line).toEqual([6, 7, 8])
  })

  it('should detect a winner in the first column', () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null]
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('O')
    expect(line).toEqual([0, 3, 6])
  })

  it('should detect a winner in the second column', () => {
    const squares = [null, 'X', null, null, 'X', null, null, 'X', null]
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('X')
    expect(line).toEqual([1, 4, 7])
  })

  it('should detect a winner in the third column', () => {
    const squares = [null, null, 'O', null, null, 'O', null, null, 'O']
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('O')
    expect(line).toEqual([2, 5, 8])
  })

  it('should detect a winner in the main diagonal', () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X']
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('X')
    expect(line).toEqual([0, 4, 8])
  })

  it('should detect a winner in the anti-diagonal', () => {
    const squares = [null, null, 'O', null, 'O', null, 'O', null, null]
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('O')
    expect(line).toEqual([2, 4, 6])
  })

  it('should prioritize first winning line found', () => {
    // This scenario shouldn't happen in real gameplay, but tests edge case
    const squares = ['X', 'X', 'X', 'O', 'O', 'O', null, null, null]
    const [winner, line] = calculateWinner(squares)
    expect(winner).toBe('X')
    expect(line).toEqual([0, 1, 2])
  })
})

