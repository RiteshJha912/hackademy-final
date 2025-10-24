import React from 'react'
import { UserCheck } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const EKYCPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <UserCheck className={styles.articleIcon} />
        <h1>e-KYC / Data-Harvesting & SIM-Swap Frauds</h1>
        <p>Understanding data-harvesting, e-KYC attacks, and SIM-swap frauds</p>
      </div>

      <div className={styles.articleContent}>
        <section className={styles.section}>
          <h2>What is e-KYC & Data Harvesting?</h2>
          <p>
            Attackers collect personal information through fake forms, phishing
            pages, or malicious apps and then misuse that data for identity
            theft or to bypass authentication systems like e-KYC.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/ekyc1.png'
              alt='e-KYC Scam Example'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>SIM-Swap Frauds</h2>
          <p>
            SIM-swap fraud occurs when attackers convince a mobile carrier to
            move a victim's number to a SIM they control. With control of the
            number, attackers can intercept OTPs and reset account passwords.
          </p>
          <ul>
            <li>Phishing for KYC documents or credentials</li>
            <li>Buying stolen personal data on underground markets</li>
            <li>Social engineering mobile carrier support to port a number</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Prevention Tips</h2>
          <ul>
            <li>Don't upload KYC documents to untrusted sites or apps</li>
            <li>
              Enable carrier-level PINs or two-factor methods that aren't
              SMS-based
            </li>
            <li>
              Use hardware/authenticator apps instead of SMS OTP where possible
            </li>
            <li>Monitor accounts for unexpected changes and set alerts</li>
          </ul>
          <div className={styles.imageContainer}>
            <img
              src='/images/ekyc2.png'
              alt='SIM Swap Protection'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Recovery Steps</h2>
          <p>
            If your number is ported, contact your carrier immediately, report
            to banks and services that may be affected, and file an official
            complaint with authorities. Change passwords for accounts using the
            number and enable stronger authentication.
          </p>
        </section>
      </div>
    </div>
  )
}

export default EKYCPage
