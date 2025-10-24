import React from 'react'
import { Shield } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const DigitalArrestScamPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <Shield className={styles.articleIcon} />
        <h1>Digital Arrest Scam</h1>
        <p>Understanding and protecting yourself from digital arrest scams</p>
      </div>

      <div className={styles.articleContent}>
        <section className={styles.section}>
          <h2>What is it?</h2>
          <p>
            A digital arrest scam is a sophisticated form of cybercrime where
            scammers impersonate law enforcement officials, threatening victims
            with immediate arrest unless they make payments or provide sensitive
            information.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/digital-arrest-example.jpg'
              alt='Digital Arrest Scam Example'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>How it happens</h2>
          <p>Scammers typically initiate contact through:</p>
          <ul>
            <li>Fake emails claiming to be from law enforcement</li>
            <li>Threatening phone calls with spoofed police numbers</li>
            <li>Fraudulent arrest warrants sent via email</li>
            <li>Pop-up messages claiming illegal activity on your device</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Real world stories</h2>
          <p>
            In a recent case, Sarah, a 34-year-old professional, received an
            official-looking email claiming she had pending criminal charges.
            The scammers demanded immediate payment to "clear her record."
            Fortunately, she recognized the warning signs and reported the
            incident to actual authorities.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/scam-alert.jpg'
              alt='Scam Alert'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>How to stay protected</h2>
          <ul>
            <li>
              Never send money to unknown parties claiming to be law enforcement
            </li>
            <li>Verify all official communication through proper channels</li>
            <li>Don't click on suspicious links in emails or messages</li>
            <li>Report suspicious activity to your local authorities</li>
            <li>
              Keep your devices and software updated with the latest security
              patches
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default DigitalArrestScamPage
