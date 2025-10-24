import React from 'react'
import { Smartphone } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const UPIScamPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <Smartphone className={styles.articleIcon} />
        <h1>UPI Payment / Refund / Collect Request Scams</h1>
        <p>How UPI based scams work and how to avoid falling victim</p>
      </div>

      <div className={styles.bentoGrid}>
        <section className={`${styles.bentoCard} ${styles.whatIsIt}`}>
          <h2>What is it?</h2>
          <p>
            Scammers use UPI collect requests, fake refund messages, or social
            engineering to trick users into sending money or approving
            transactions. These attacks often rely on urgency, impersonation, or
            vulnerabilities in how users approve payments. In many cases,
            scammers pose as customer support agents or delivery staff, asking
            victims to “verify” or “accept” small refund amounts. Fraudsters may
            also send screenshots or use familiar logos to make their requests
            appear genuine. Such scams commonly spread through chat apps, social
            media, and fake helpline numbers. As UPI becomes more popular for
            daily payments, fraudsters continue to evolve their tactics, making
            awareness the strongest defense.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/upi1.jpg'
              alt='UPI Scam Example'
              className={styles.bentoImage}
            />
          </div>
        </section>

        <section className={`${styles.bentoCard} ${styles.howItHappens}`}>
          <h2>How it happens</h2>
          <ul>
            <li>Fake refund messages asking you to accept a collect request</li>
            <li>
              Impersonation of merchants or support staff asking for UPI
              approval
            </li>
            <li>
              Links leading to fake payment pages that harvest credentials
            </li>
            <li>
              Social engineering to pressure quick approval of a transaction
            </li>
          </ul>
        </section>

        <section className={`${styles.bentoCard} ${styles.realWorldStories}`}>
          <h2>How to Protect Yourself</h2>
          <div className={styles.imageContainer}>
            <img
              src='/images/upi2.png'
              alt='UPI Safety Tips'
              className={styles.bentoImage}
            />
          </div>
          <ul>
            <li>
              Never accept or approve UPI collect requests from unknown parties
            </li>
            <li>
              Verify refund claims through official channels before responding
            </li>
            <li>
              Use app notifications and transaction details to confirm payee
              identity
            </li>
            <li>
              Keep your UPI app and phone OS updated; use app level
              authentication
            </li>
          </ul>
        </section>

        <section className={`${styles.bentoCard} ${styles.stayProtected}`}>
          <h2>If You Were Scammed</h2>
          <p>
            Immediately contact your bank and block payments, report the fraud
            via official channels, and consider filing a police report. Preserve
            chat logs and transaction IDs for investigation.
          </p>
        </section>
      </div>
    </div>
  )
}

export default UPIScamPage
