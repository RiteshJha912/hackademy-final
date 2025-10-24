import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Shield, Lock, AlertTriangle } from 'lucide-react'
import styles from '../styles/LearnPage.module.css'

const LearnPage = () => {
  return (
    <div className={styles.learnPage}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <BookOpen className={styles.titleIcon} /> Learn Cybersecurity
        </h1>
        <p className={styles.heroDescription}>
          Explore our comprehensive guides to understand and protect against
          cyber threats
        </p>
      </div>

      <div className={styles.articlesGrid}>
        <Link to='/learn/digital-arrest-scam' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <Shield className={styles.articleIcon} />
            <h2>Digital Arrest Scam</h2>
            <p>
              Learn about digital arrest scams and how to protect yourself from
              these emerging threats.
            </p>
          </div>
        </Link>

        <Link to='/learn/digital-arrest-scam' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <Lock className={styles.articleIcon} />
            <h2>Identity Protection</h2>
            <p>
              Understanding the importance of protecting your digital identity
              in today's connected world.
            </p>
          </div>
        </Link>

        <Link to='/learn/digital-arrest-scam' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <AlertTriangle className={styles.articleIcon} />
            <h2>Common Cyber Threats</h2>
            <p>
              Discover the most common cybersecurity threats and learn effective
              prevention strategies.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LearnPage
