import React from 'react'
import { Gamepad2, Clock } from 'lucide-react'
import styles from '../styles/LeaderboardItem.module.css'

const LeaderboardItem = ({ user, position }) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${position}`
    }
  }

  const getRankClass = (position) => {
    if (position === 1) return styles.top1
    if (position === 2) return styles.top2
    if (position === 3) return styles.top3
    return ''
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`${styles.leaderboardItem} ${getRankClass(position)}`}>
      <div className={styles.rankSection}>
        <span className={styles.rankIcon}>{getRankIcon(position)}</span>
      </div>

      <div className={styles.userSection}>
        <span className={styles.username}>{user.username}</span>
        <div className={styles.userStats}>
          <span className={styles.gamesPlayed}>
            <Gamepad2 className={styles.statIcon} /> {user.gamesPlayed} game
            {user.gamesPlayed !== 1 ? 's' : ''}
          </span>
          <span className={styles.lastPlayed}>
            <Clock className={styles.statIcon} /> {formatDate(user.lastPlayed)}
          </span>
        </div>
      </div>

      <div className={styles.scoreSection}>
        <span className={styles.score}>{user.score}</span>
        <span className={styles.pointsLabel}>points</span>
      </div>
    </div>
  )
}

export default LeaderboardItem
