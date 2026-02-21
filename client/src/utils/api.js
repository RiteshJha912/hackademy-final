import axios from 'axios'

// Base URL for API calls
   const API_BASE_URL =
     process.env.NODE_ENV === 'production'
       ? process.env.REACT_APP_BACKEND_URL  // This will use the environment variable
       : 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// User API functions
export const userAPI = {
  // Create new user
  createUser: async (username, forceLogin = false, returningToken = '') => {
    try {
      const response = await api.post('/api/user', { username, forceLogin, returningToken })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Network error' }
    }
  },

  // Logout user
  logoutUser: async (username) => {
    try {
      const response = await api.post('/api/user/logout', { username })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Network error' }
    }
  },

  // Get user by username
  getUser: async (username) => {
    try {
      const response = await api.get(`/api/user/${username}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Network error' }
    }
  },

  // Update user score
  updateScore: async (username, scoreToAdd) => {
    try {
      const response = await api.post('/api/score', { username, scoreToAdd })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Network error' }
    }
  },

  // Get leaderboard
  getLeaderboard: async (limit = 50) => {
    try {
      const response = await api.get(`/api/leaderboard?limit=${limit}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Network error' }
    }
  },

  // Get platform stats
  getStats: async () => {
    try {
      const response = await api.get('/api/stats')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Network error' }
    }
  },
}

export default api
