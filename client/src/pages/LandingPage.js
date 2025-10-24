import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Target, Trophy, BookOpen, Rocket } from 'lucide-react'
import styles from '../styles/LandingPage.module.css'

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <Shield className={styles.titleIcon} /> HACKADEMY
        </h1>
        <p className={styles.heroSubtitle}>
          Master Cybersecurity Through Interactive Gaming
        </p>
        <p className={styles.heroDescription}>
          Test your knowledge, earn points, and climb the leaderboard while
          learning essential cybersecurity concepts through engaging quiz games.
        </p>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <Target className={styles.statIcon} />
            <span className={styles.statText}>Interactive Quizzes</span>
          </div>
          <div className={styles.statItem}>
            <Trophy className={styles.statIcon} />
            <span className={styles.statText}>Global Leaderboard</span>
          </div>
          <div className={styles.statItem}>
            <BookOpen className={styles.statIcon} />
            <span className={styles.statText}>Learn by Playing</span>
          </div>
        </div>

        <Link to='/username' className={styles.ctaButton}>
          <Rocket className={styles.buttonIcon} /> Start Learning Now
        </Link>

        <div className={styles.secondaryActions}>
          <Link to='/leaderboard' className={styles.secondaryLink}>
            View Leaderboard here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
