const User = require('../models/User')

// @desc    Create new user
// @route   POST /api/user
// @access  Public
const createUser = async (req, res) => {
  try {
    const { username, forceLogin, returningToken } = req.body

    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid username',
      })
    }

    // Normalize username (trim and lowercase)
    const normalizedUsername = username.trim().toLowerCase()

    // Validate length
    if (normalizedUsername.length < 2 || normalizedUsername.length > 30) {
      return res.status(400).json({
        success: false,
        message: 'Username must be between 2 and 30 characters',
      })
    }

    // Validate characters (letters, numbers, underscore only)
    if (!/^[a-z0-9_]+$/.test(normalizedUsername)) {
      return res.status(400).json({
        success: false,
        message: 'Username can only contain letters, numbers, and underscores',
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      username: normalizedUsername,
    })

    if (existingUser) {
      if (existingUser.isActive && !forceLogin) {
        return res.status(409).json({
          success: false,
          isAlreadyActive: true,
          message: 'Username is currently active in another session.',
        })
      }

      // If they don't provide a matching returningToken, they are a DIFFERENT user trying to take an existing name.
      if (!returningToken || returningToken !== existingUser.visitorToken) {
         return res.status(403).json({
           success: false,
           message: 'This username is already taken. Please choose another one.',
         })
      }

      // Valid returning user
      existingUser.isActive = true
      await existingUser.save()

      return res.status(200).json({
        success: true,
        message: 'Welcome back!',
        isNew: false,
        token: existingUser.visitorToken,
        data: existingUser,
      })
    }

    // Create a simple random token for the newly created user
    const newToken = Math.random().toString(36).substring(2, 15)

    // Create new user
    const user = await User.create({
      username: normalizedUsername,
      score: 0,
      isActive: true,
      visitorToken: newToken,
    })

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      isNew: true,
      token: newToken,
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error. Please try again.',
    })
  }
}

// @desc    Update user score
// @route   POST /api/score
// @access  Public
const updateScore = async (req, res) => {
  try {
    const { username, scoreToAdd } = req.body

    if (!username || scoreToAdd === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and score to add',
      })
    }

    const user = await User.findOne({ username: username.toLowerCase() })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Update score and increment games played
    user.score += parseInt(scoreToAdd)
    user.gamesPlayed += 1
    user.lastPlayed = new Date()

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Score updated successfully',
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50

    const users = await User.find({})
      .sort({ score: -1, lastPlayed: -1 })
      .limit(limit)
      .select('username score gamesPlayed lastPlayed')

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Get user by username
// @route   GET /api/user/:username
// @access  Public
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params

    const user = await User.findOne({ username: username.toLowerCase() })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Get user stats
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    
    // Aggregate total games and total score across all users
    const aggregates = await User.aggregate([
      { 
        $group: { 
          _id: null, 
          totalGames: { $sum: '$gamesPlayed' },
          totalScore: { $sum: '$score' }
        } 
      }
    ])
    
    const activeUsersCount = await User.countDocuments({ isActive: true })

    const topPlayer = await User.findOne().sort({ score: -1 })

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalGamesPlayed: aggregates[0]?.totalGames || 0,
        totalScore: aggregates[0]?.totalScore || 0,
        activeUsers: activeUsersCount,
        topPlayer: topPlayer
          ? {
              username: topPlayer.username,
              score: topPlayer.score,
            }
          : null,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Logout user
// @route   POST /api/user/logout
// @access  Public
const logoutUser = async (req, res) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(400).json({ success: false, message: 'Provide a username' })
    }

    const user = await User.findOne({ username: username.toLowerCase() })

    if (user) {
      user.isActive = false
      await user.save()
    }

    res.status(200).json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

module.exports = {
  createUser,
  updateScore,
  getLeaderboard,
  getUserByUsername,
  getStats,
  logoutUser,
}
