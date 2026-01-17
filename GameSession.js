const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  finalScores: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    score: Number,
    rank: Number
  }],
  totalQuestions: Number,
  duration: Number, // in seconds
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameSession', gameSessionSchema);