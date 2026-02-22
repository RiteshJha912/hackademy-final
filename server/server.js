const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const colors = require('colors')
require('dotenv').config()

const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gameRoutes')

// Connect to database
connectDB()

const app = express()

// Middleware
const allowedOrigins = [
  'https://hackademy-in.onrender.com', // Original Render URL
  'http://localhost:3000',           // Local Development
  process.env.FRONTEND_URL?.replace(/\/$/, ''), // Match Render dashboard + remove trailing slash
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || 
                       origin.endsWith('.vercel.app'); // Allow all Vercel previews/deployments
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', userRoutes)
app.use('/api/game', gameRoutes)

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Cybersecurity Learning Gamification API',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      'POST /api/user': 'Create new user',
      'GET /api/user/:username': 'Get user by username',
      'POST /api/score': 'Update user score',
      'GET /api/leaderboard': 'Get leaderboard',
      'GET /api/stats': 'Get platform stats',
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  })
})

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
