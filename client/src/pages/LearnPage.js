import React from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  AlertTriangle,
  CreditCard,
  Smartphone,
  Briefcase,
} from 'lucide-react'
import styles from '../styles/LearnPage.module.css'

const LearnPage = () => {
  return (
    <div className={styles.learnPage}>
      <div className={styles.updateWrapper}>
        <div className={styles.updateBanner}>
          <div className={styles.updateLeft}>
            <div className={styles.pulse}></div>
            <span className={styles.updateMessage}>
              <span className={styles.ticker}>
                Stay vigilant! New scams are
                updated in real-time as they start occuring. Check back often to protect yourself.
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <Shield className={styles.titleIcon} /> Learn About Cybersecurity
          Scams
        </h1>
        <p className={styles.heroDescription}>
          Explore common scams targeting seniors and learn how to stay protected
          with practical tips and real-world examples.
        </p>
      </div>

      <div className={styles.articlesGrid}>
        <Link to='/learn/digital-arrest-scam' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <Shield className={styles.articleIcon} />
            <h2>Digital Arrest Scam</h2>
            <p>
              Fake law enforcement threats demand payments or sensitive info,
              preying on trust.
            </p>
          </div>
        </Link>

        <Link to='/learn/upi-payment-scams' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <CreditCard className={styles.articleIcon} />
            <h2>UPI Payment Scams</h2>
            <p>
              Fraudsters trick you into sending money via fake UPI apps or QR
              codes.
            </p>
          </div>
        </Link>

        <Link to='/learn/ekyc-sim-swap' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <Smartphone className={styles.articleIcon} />
            <h2>eKYC SIM Swap Scam</h2>
            <p>
              Scammers steal your phone number to access bank accounts via fake
              eKYC.
            </p>
          </div>
        </Link>

        <Link to='/learn/fake-job-scams' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <Briefcase className={styles.articleIcon} />
            <h2>Fake Job Scams</h2>
            <p>
              Bogus job offers lure seniors with promises of easy money,
              stealing data or fees.
            </p>
          </div>
        </Link>

        <Link to='/learn/whatsapp-stock-scam' className={styles.articleCard}>
          <div className={styles.articleContent}>
            <AlertTriangle className={styles.articleIcon} />
            <h2>WhatsApp Stock Market Groups Scam</h2>
            <p>
              Fake stock tips in WhatsApp groups lead to fraudulent apps and
              lost investments.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LearnPage
