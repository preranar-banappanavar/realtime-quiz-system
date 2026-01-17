const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    score: { type: Number, default: 0 },
    answers: [{
      questionId: mongoose.Schema.Types.ObjectId,
      answer: Number,
      correct: Boolean,
      points: Number,
      timeSpent: Number
    }],
    joinedAt: { type: Date, default: Date.now }
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  maxPlayers: {
    type: Number,
    default: 50
  },
  status: {
    type: String,
    enum: ['waiting', 'active', 'finished'],
    default: 'waiting'
  },
  currentQuestion: {
    type: Number,
    default: 0
  },
  gameStartedAt: Date,
  gameEndedAt: Date,
  settings: {
    timePerQuestion: { type: Number, default: 30 }, // seconds
    pointsPerCorrect: { type: Number, default: 10 },
    showLeaderboardBetween: { type: Boolean, default: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', roomSchema);