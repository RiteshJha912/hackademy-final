import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, Gamepad2 } from 'lucide-react'
import { Trophy } from 'lucide-react'
import { userAPI } from '../utils/api'
import LeaderboardItem from '../components/LeaderboardItem'
import styles from '../styles/LeaderboardPage.module.css'
import appStyles from '../styles/App.module.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts'

const LeaderboardPage = ({ currentUser }) => {
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
      setError('Oops! Could not load the leaderboard. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const graphData = useMemo(() => {
    const months = []
    const now = new Date()
    for (let i = 2; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleString('default', { month: 'long' })
      months.push(monthName)
    }

    const monthlyGames = {}
    months.forEach((m) => (monthlyGames[m] = 0))

    leaderboard.forEach((user) => {
      if (user.lastPlayed) {
        const date = new Date(user.lastPlayed)
        const month = date.toLocaleString('default', { month: 'long' })
        if (monthlyGames.hasOwnProperty(month)) {
          monthlyGames[month] += user.gamesPlayed || 0
        }
      }
    })

    return months.map((m) => ({ month: m, games: monthlyGames[m] }))
  }, [leaderboard])

  const topPlayersData = useMemo(() => {
    return leaderboard.slice(0, 5).map(user => ({
      username: `@${user.username}`,
      score: user.score
    }))
  }, [leaderboard])

  if (loading) {
    return (
      <div className={`${appStyles.pageContainer} ${styles.leaderboardPage}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading the leaderboard… please wait a moment.</p>
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
          <Trophy className={styles.headerIcon} /> Our Learning Leaders
        </h2>
        <p>See who is doing well and get inspired to improve your skills!</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className={styles.graphContainer} style={{ marginBottom: 0 }}>
          <h3 className={styles.graphTitle}>Games Played Per Month</h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={graphData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id='colorGames' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#a855f7' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#a855f7' stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='rgba(255, 255, 255, 0.1)'
              />
              <XAxis dataKey='month' stroke='rgba(255, 255, 255, 0.7)' />
              <YAxis stroke='rgba(255, 255, 255, 0.7)' />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 30, 40, 0.95)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '12px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Legend wrapperStyle={{ color: 'rgba(255, 255, 255, 0.8)' }} />
              <Bar
                dataKey='games'
                fill='url(#colorGames)'
                radius={[10, 10, 0, 0]}
                barSize={40}
              >
                <LabelList
                  dataKey='games'
                  position='top'
                  fill='rgba(255, 255, 255, 0.8)'
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.graphContainer} style={{ marginBottom: 0 }}>
          <h3 className={styles.graphTitle}>Top 5 Hacker Scores</h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={topPlayersData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id='colorScores' x1='0' y1='0' x2='1' y2='0'>
                  <stop offset='5%' stopColor='#a855f7' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#fb923c' stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' horizontal={true} vertical={false} stroke='rgba(255, 255, 255, 0.1)' />
              <XAxis type="number" stroke='rgba(255, 255, 255, 0.7)' />
              <YAxis dataKey='username' type="category" stroke='rgba(255, 255, 255, 0.7)' width={80} style={{fontSize: '0.85rem'}} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 30, 40, 0.95)',
                  border: '1px solid rgba(251, 146, 60, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '12px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Bar dataKey='score' fill='url(#colorScores)' radius={[0, 8, 8, 0]} barSize={25}>
                <LabelList dataKey='score' position='right' fill='rgba(255, 255, 255, 0.8)' style={{fontFamily: 'Orbitron', fontWeight: 'bold'}}/>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {stats && (
        <div className={styles.statsContainer} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalUsers}</span>
            <span className={styles.statLabel}>Total Learners</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalGamesPlayed}</span>
            <span className={styles.statLabel}>Simulations Played</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalQuestions}</span>
            <span className={styles.statLabel}>Threats Analyzed</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
            </span>
            <span className={styles.statLabel}>Global Accuracy</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalScore.toLocaleString()}</span>
            <span className={styles.statLabel}>Global Points</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {stats.topPlayer?.score || 0}
            </span>
            <span className={styles.statLabel}>Highest Score</span>
          </div>
        </div>
      )}

      {currentUser && (
        <div className={styles.userRankBanner} style={{background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px'}}>
           <h3 style={{color: '#fff', fontSize: '1.2rem', fontFamily: 'Orbitron, sans-serif', margin: 0}}>
              Your Current Rank:{' '}
              {(() => {
                 const myRank = leaderboard.findIndex(u => u.username === currentUser.toLowerCase()) + 1;
                 if (myRank > 0) return <span style={{color: '#a855f7', fontSize: '1.6rem', marginLeft: '10px'}}>#{myRank}</span>
                 return <span style={{color: '#a855f7', fontSize: '1.4rem', marginLeft: '10px'}}>Unranked</span>
              })()}
           </h3>
        </div>
      )}
      <div className={styles.leaderboardContainer}>
        {leaderboard.length === 0 ? (
          <div className={styles.emptyLeaderboard}>
            <p>
              <Gamepad2 className={styles.emptyIcon} /> No learners have started
              yet! You can be the first to try and see your name here.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.podiumContainer}>
              {leaderboard.slice(0, 3).map((user, idx) => (
                <div key={user._id} className={styles.podiumItem}>
                  <div className={styles.podiumMedal}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className={styles.podiumName}>@{user.username}</div>
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

      <div className={styles.boostContainer}>
        <h3 className={styles.boostTitle}>Ready to climb the ranks?</h3>
        <Link to="/games" className={styles.boostBtn}>
          <Gamepad2 size={24} /> Boost Your Score
        </Link>
      </div>
    </div>
  )
}

export default LeaderboardPage
