import React, { useState, useEffect } from 'react'
import { RefreshCw, Gamepad2 } from 'lucide-react'
import { userAPI } from '../utils/api'
import LeaderboardItem from '../components/LeaderboardItem'
import styles from '../styles/LeaderboardPage.module.css'
import appStyles from '../styles/App.module.css'

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
      <div className={`${appStyles.pageContainer} ${styles.leaderboardPage}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${appStyles.pageContainer} ${styles.leaderboardPage}`}>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={fetchData} className={styles.retryButton}>
            <RefreshCw className={styles.buttonIcon} /> Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${appStyles.pageContainer} ${styles.leaderboardPage}`}>
      <div className={styles.leaderboardHeader}>
        <h2>
          <span className={styles.headerIcon}>🏆</span> Global Leaderboard
        </h2>
        <p>Top cybersecurity learning champions</p>
      </div>

      {stats && (
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalUsers}</span>
            <span className={styles.statLabel}>Total Players</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalGamesPlayed}</span>
            <span className={styles.statLabel}>Games Played</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {stats.topPlayer?.score || 0}
            </span>
            <span className={styles.statLabel}>Highest Score</span>
          </div>
        </div>
      )}

      <div className={styles.leaderboardContainer}>
        {leaderboard.length === 0 ? (
          <div className={styles.emptyLeaderboard}>
            <p>
              <Gamepad2 className={styles.emptyIcon} /> No players yet! Be the
              first to play and climb the leaderboard.
            </p>
          </div>
        ) : (
          <>
            {/* Podium view for top 3 */}
            <div className={styles.podiumContainer}>
              {leaderboard.slice(0, 3).map((user, idx) => (
                <div key={user._id} className={styles.podiumItem}>
                  <div className={styles.podiumMedal}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className={styles.podiumName}>{user.username}</div>
                  <div className={styles.podiumScore}>{user.score}</div>
                </div>
              ))}
            </div>

            <div className={styles.leaderboardList}>
              {leaderboard.map((user, index) => (
                <LeaderboardItem
                  key={user._id}
                  user={user}
                  position={index + 1}
                />
              ))}
            </div>

            {leaderboard.length >= 20 && (
              <div className={styles.loadMoreContainer}>
                <button onClick={fetchData} className={styles.loadMoreButton}>
                  <RefreshCw className={styles.buttonIcon} /> Refresh
                  Leaderboard
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
