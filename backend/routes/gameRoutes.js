const express = require('express');
const Game = require('./models/game');
const router = express.Router();

// Create a new game
router.post('/start', async (req, res) => {
  try {
    const game = new Game();
    await game.save();
    res.status(201).json(game); // Created status
  } catch (error) {
    res.status(500).json({ message: 'Failed to start the game', error });
  }
});

// Get the current game state
router.get('/game/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error });
  }
});

// Make a move
router.post('/game/:id/move', async (req, res) => {
  const { index } = req.body; // Index of the move

  // Validate the index
  if (typeof index !== 'number' || index < 0 || index > 8) {
    return res.status(400).json({ message: 'Invalid index' });
  }

  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.winner) return res.status(400).json({ message: 'Game Over' });

    if (game.board[index] !== '') return res.status(400).json({ message: 'Invalid move' });

    game.board[index] = game.currentPlayer;
    game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
  
    // Check for a winner
    const winner = checkWinner(game.board);
    if (winner) {
      game.winner = winner;
    }

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error making move', error });
  }
});

// Function to check for a winner
function checkWinner(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // X or O
    }
  }

  if (!board.includes('')) {
    return 'Draw';
  }

  return null;
}

module.exports = router;
