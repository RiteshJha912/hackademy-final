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

      <div className={styles.updateWrapper}>
        <div className={styles.updateBanner} role='status'>
          <div className={styles.updateLeft}>
            <span className={styles.pulse} />
            <span className={styles.updateMessage}>
              Staying vigilant — We monitor and document new cybersecurity
              threats as they emerge
            </span>
          </div>
        </div>
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

        <Link to='/learn/upi-payment-scams' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <Lock className={styles.articleIcon} />
            <h2>UPI / Payment & Refund Scams</h2>
            <p>
              Learn about UPI payment, refund and collect-request scams and how
              to spot and avoid fraudulent requests.
            </p>
          </div>
        </Link>

        <Link to='/learn/ekyc-sim-swap' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <AlertTriangle className={styles.articleIcon} />
            <h2>e-KYC, Data Harvesting & SIM-Swap Frauds</h2>
            <p>
              Understand e-KYC and data-harvesting scams, SIM-swap frauds, and
              practical steps to protect your identity and devices.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LearnPage
