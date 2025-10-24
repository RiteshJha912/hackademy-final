import React, { useState, useEffect } from 'react'
import { userAPI } from '../utils/api'
import LeaderboardItem from '../components/LeaderboardItem'

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [leaderboardResponse, statsResponse] = await Promise.all([
        userAPI.getLeaderboard(20),
        userAPI.getStats(),
      ])

      if (leaderboardResponse.success) {
        setLeaderboard(leaderboardResponse.data)
      }

      if (statsResponse.success) {
        setStats(statsResponse.data)
      }
    } catch (error) {
      setError('Failed to load leaderboard data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='page-container leaderboard-page'>
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='page-container leaderboard-page'>
        <div className='error-container'>
          <p className='error-message'>{error}</p>
          <button onClick={fetchData} className='retry-button'>
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='page-container leaderboard-page'>
      <div className='leaderboard-header'>
        <h2>🏆 Global Leaderboard</h2>
        <p>Top cybersecurity learning champions</p>
      </div>

      {stats && (
        <div className='stats-container'>
          <div className='stat-card'>
            <span className='stat-number'>{stats.totalUsers}</span>
            <span className='stat-label'>Total Players</span>
          </div>
          <div className='stat-card'>
            <span className='stat-number'>{stats.totalGamesPlayed}</span>
            <span className='stat-label'>Games Played</span>
          </div>
          <div className='stat-card'>
            <span className='stat-number'>{stats.topPlayer?.score || 0}</span>
            <span className='stat-label'>Highest Score</span>
          </div>
        </div>
      )}

      <div className='leaderboard-container'>
        {leaderboard.length === 0 ? (
          <div className='empty-leaderboard'>
            <p>
              🎮 No players yet! Be the first to play and climb the leaderboard.
            </p>
          </div>
        ) : (
          <>
            <div className='leaderboard-list'>
              {leaderboard.map((user, index) => (
                <LeaderboardItem
                  key={user._id}
                  user={user}
                  position={index + 1}
                />
              ))}
            </div>

            {leaderboard.length >= 20 && (
              <div className='load-more-container'>
                <button onClick={fetchData} className='load-more-button'>
                  🔄 Refresh Leaderboard
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default LeaderboardPage
