import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from './App'

describe('Tic Tac Toe Game', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  // Helper function to get board squares (excludes history and reset buttons)
  function getBoardSquares(container) {
    const board = container.querySelector('.board')
    if (!board) return []
    return Array.from(board.querySelectorAll('button.square'))
  }

  describe('Square Component', () => {
    it('should render empty square', () => {
      const handleClick = () => {}
      const { container } = render(
        <button onClick={handleClick} className="square">null</button>
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('Board Component', () => {
    it('should display initial game status', () => {
      render(<Game />)
      expect(screen.getByText(/Next player: X/i)).toBeInTheDocument()
    })

    it('should allow X to make the first move', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      await user.click(squares[0])
      expect(squares[0]).toHaveTextContent('X')
      expect(screen.getByText(/Next player: O/i)).toBeInTheDocument()
    })

    it('should alternate between X and O', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      
      expect(squares[0]).toHaveTextContent('X')
      expect(squares[1]).toHaveTextContent('O')
    })

    it('should not allow clicking on an already filled square', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      await user.click(squares[0]) // X
      await user.click(squares[0]) // Try to click again
      
      expect(squares[0]).toHaveTextContent('X')
      expect(screen.getByText(/Next player: O/i)).toBeInTheDocument() // Still O's turn
    })
  })

  describe('Winner Detection', () => {
    it('should detect X wins in first row', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      // X wins: first row
      await user.click(squares[0]) // X
      await user.click(squares[3]) // O
      await user.click(squares[1]) // X
      await user.click(squares[4]) // O
      await user.click(squares[2]) // X wins!
      
      expect(screen.getByText(/Winner: X/i)).toBeInTheDocument()
    })

    it('should detect O wins in a column', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      // O wins: first column
      await user.click(squares[1]) // X
      await user.click(squares[0]) // O
      await user.click(squares[2]) // X
      await user.click(squares[3]) // O
      await user.click(squares[4]) // X
      await user.click(squares[6]) // O wins!
      
      expect(screen.getByText(/Winner: O/i)).toBeInTheDocument()
    })

    it('should detect X wins in main diagonal', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      // X wins: diagonal
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      await user.click(squares[4]) // X
      await user.click(squares[2]) // O
      await user.click(squares[8]) // X wins!
      
      expect(screen.getByText(/Winner: X/i)).toBeInTheDocument()
    })

    it('should prevent moves after a winner is declared', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      // X wins
      await user.click(squares[0]) // X
      await user.click(squares[3]) // O
      await user.click(squares[1]) // X
      await user.click(squares[4]) // O
      await user.click(squares[2]) // X wins!
      
      expect(screen.getByText(/Winner: X/i)).toBeInTheDocument()
      
      // Try to make another move
      await user.click(squares[5])
      // Square should remain empty
      expect(squares[5]).toHaveTextContent('')
    })
  })

  describe('Draw Detection', () => {
    it('should detect a draw', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      // Play a full game without a winner
      // X O X
      // O X O
      // O X O
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      await user.click(squares[2]) // X
      await user.click(squares[4]) // O
      await user.click(squares[3]) // X
      await user.click(squares[5]) // O
      await user.click(squares[7]) // X
      await user.click(squares[6]) // O
      await user.click(squares[8]) // X
      
      expect(screen.getByText(/It's a Draw!/i)).toBeInTheDocument()
    })
  })

  describe('Game History', () => {
    it('should show move history', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      
      expect(screen.getByText('Go to game start')).toBeInTheDocument()
      expect(screen.getByText('Go to move #1')).toBeInTheDocument()
      expect(screen.getByText('Go to move #2')).toBeInTheDocument()
    })

    it('should allow jumping to previous moves', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      await user.click(squares[2]) // X
      
      // Jump to move #1
      const historyButtons = screen.getAllByRole('button').filter(
        btn => btn.textContent.includes('Go to')
      )
      await user.click(historyButtons[1]) // Go to move #1
      
      // Re-fetch squares after state change
      const updatedSquares = getBoardSquares(container)
      // Square 2 should be empty, square 0 and 1 should have X and O
      expect(updatedSquares[0]).toHaveTextContent('X')
      expect(updatedSquares[1]).toHaveTextContent('O')
      expect(updatedSquares[2]).toHaveTextContent('')
    })

    it('should update history when making moves after jumping back', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      await user.click(squares[2]) // X
      
      // Jump back
      const historyButtons = screen.getAllByRole('button').filter(
        btn => btn.textContent.includes('Go to')
      )
      await user.click(historyButtons[1]) // Go to move #1
      
      // Make a new move - should truncate future history
      const updatedSquares = getBoardSquares(container)
      await user.click(updatedSquares[2])
      
      // Should only have 3 moves now (start, move 1, new move)
      const newHistoryButtons = screen.getAllByRole('button').filter(
        btn => btn.textContent.includes('Go to')
      )
      expect(newHistoryButtons.length).toBe(3)
    })
  })

  describe('Reset Game', () => {
    it('should reset the game when New Game button is clicked', async () => {
      const { container } = render(<Game />)
      const squares = getBoardSquares(container)
      
      // Make some moves
      await user.click(squares[0]) // X
      await user.click(squares[1]) // O
      
      // Reset
      const resetButton = screen.getByText('New Game')
      await user.click(resetButton)
      
      // Re-fetch squares after reset
      const resetSquares = getBoardSquares(container)
      // Board should be empty and back to X's turn
      resetSquares.forEach(square => {
        expect(square).toHaveTextContent('')
      })
      expect(screen.getByText(/Next player: X/i)).toBeInTheDocument()
    })
  })
})

