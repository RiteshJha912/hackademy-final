import React from 'react'
import { Smartphone } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const UPIScamPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <Smartphone className={styles.articleIcon} />
        <h1>UPI Payment / Refund / Collect-Request Scams</h1>
        <p>How UPI-based scams work and how to avoid falling victim</p>
      </div>

      <div className={styles.articleContent}>
        <section className={styles.section}>
          <h2>Overview</h2>
          <p>
            Scammers use UPI collect requests, fake refund messages, or social
            engineering to trick users into sending money or approving
            transactions. These attacks often rely on urgency, impersonation, or
            vulnerabilities in how users approve payments.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Common Tactics</h2>
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

        <section className={styles.section}>
          <h2>How to Protect Yourself</h2>
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
              Keep your UPI app and phone OS updated; use app-level
              authentication
            </li>
          </ul>
        </section>

        <section className={styles.section}>
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
