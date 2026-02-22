const mongoose = require('mongoose')

const gameSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gameType: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'quit'],
      default: 'active'
    },
    questions: {
      type: Array, // Holds the subset and order of questions for this session
      default: []
    },
    score: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    correctAnswers: {
      type: Number,
      default: 0
    },
    incorrectAnswers: {
      type: Number,
      default: 0
    },
    totalAttempted: {
      type: Number,
      default: 0
    },
    totalDuration: {
      type: Number,
      default: 0 // In seconds
    },
    history: {
      type: Array, // Array of answers submitted: { questionId, selectedOption, isCorrect, pointsEarned, timeTaken }
      default: []
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('GameSession', gameSessionSchema)
