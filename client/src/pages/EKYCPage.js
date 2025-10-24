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

      <div className={styles.bentoGrid}>
        <section className={`${styles.bentoCard} ${styles.whatIsIt}`}>
          <h2>What is it?</h2>
          <p>
            Attackers collect personal information through fake forms, phishing
            pages, or malicious apps and then misuse that data for identity
            theft or to bypass authentication systems like e-KYC. These scams
            often appear as legitimate requests from banks, telecom operators,
            or government agencies asking users to “verify” their details. Once
            the victim submits sensitive data such as Aadhaar numbers, PAN, or
            SIM details, cybercriminals use it to open fraudulent accounts,
            apply for loans, or conduct unauthorized transactions. In some
            cases, this stolen data is sold on dark web markets and reused for
            large scale fraud operations. The attackers may also combine this
            with SIM swap techniques to gain full access to the victim’s digital
            identity and financial accounts. These attacks exploit trust and
            familiarity, making them especially dangerous for users who are less
            aware of online verification processes. As a result, even a single
            careless submission of personal data can lead to long-term financial
            and identity related damage.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/ekyc1.png'
              alt='e-KYC Scam Example'
              className={styles.bentoImage}
            />
          </div>
        </section>

        <section className={`${styles.bentoCard} ${styles.howItHappens}`}>
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

        <section className={`${styles.bentoCard} ${styles.realWorldStories}`}>
          <h2>Prevention Tips</h2>
          <div className={styles.imageContainer}>
            <img
              src='/images/ekyc2.png'
              alt='SIM Swap Protection'
              className={styles.bentoImage}
            />
          </div>
          <ul>
            <li>Don't upload KYC documents to untrusted sites or apps</li>
            <li>
              Enable carrier level PINs or two-factor methods that aren't
              SMS based
            </li>
            <li>
              Use hardware/authenticator apps instead of SMS OTP where possible
            </li>
            <li>Monitor accounts for unexpected changes and set alerts</li>
          </ul>
        </section>

        <section className={`${styles.bentoCard} ${styles.stayProtected}`}>
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
