const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
      trim: true,
      minlength: [2, 'Username must be at least 2 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    score: {
      type: Number,
      default: 0,
      min: [0, 'Score cannot be negative'],
    },
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    // Track best completed score per game type to prevent cumulative abuse
    bestScores: {
      mcq: { type: Number, default: 0 },
      phishing: { type: Number, default: 0 },
      linkDecoder: { type: Number, default: 0 }
    },
    totalQuestionsAttempted: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    incorrectAnswers: {
      type: Number,
      default: 0,
    },
    totalResponseTime: {
      type: Number,
      default: 0, // In seconds
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    totalQuizDuration: {
      type: Number,
      default: 0, // In seconds
    },
    lastPlayed: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    visitorToken: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster leaderboard queries
userSchema.index({ score: -1 })

module.exports = mongoose.model('User', userSchema)
