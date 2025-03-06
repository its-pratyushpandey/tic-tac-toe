const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const gameSchema = new mongoose.Schema({
  board: {
    type: [String],
    required: true,
    default: Array(9).fill(''), // 3x3 Tic-Tac-Toe board
  },
  currentPlayer: {
    type: String,
    required: true,
    enum: ['X', 'O'],
    default: 'X', // Player X starts
  },
  winner: {
    type: String,
    enum: ['X', 'O', 'Draw', null],
    default: null,
  },
});

module.exports = mongoose.model('Game', gameSchema);
