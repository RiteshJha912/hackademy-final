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
              src='/images/digitalarrest1.jpg'
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
    In a recent case, Maharashtra Police arrested seven individuals involved in
    a massive 58-crore rupee digital arrest scam. The fraudsters pretended to be
    government officials and tricked a 72-year-old businessman from Mumbai into
    transferring his life savings through fake video court sessions and police
    interrogations. Authorities found that over 6,500 fake bank accounts were
    used to move the stolen money across multiple layers.
  </p>
  <div className={styles.imageContainer}>
    <img
      src="/images/digitalarrest2.png"
      alt="Digital Arrest Scam"
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
