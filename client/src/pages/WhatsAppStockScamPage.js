import React from 'react'
import { AlertTriangle } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const WhatsAppStockScamPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <AlertTriangle className={styles.articleIcon} />
        <h1>WhatsApp Stock Market Groups Scam</h1>
        <p>Protect yourself from fraudulent stock market schemes on WhatsApp</p>
      </div>

      <div className={styles.articleContent}>
        <section className={styles.section}>
          <h2>What is the WhatsApp Stock Market Groups Scam?</h2>
          <p>
            Buzzing WhatsApp groups promise "insider" stock tips for quick
            riches, but they're traps run by fraudsters posing as experts. They
            lure you with free advice, then push fake apps or schemes where your
            investments vanish. Seniors eyeing easy gains are easy prey in
            India, where trading hype is huge.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/whatsapp1.png'
              alt='Spotting WhatsApp Investment Red Flags'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>How Does It Happen? (The Scammers' Tricks)</h2>
          <ul>
            <li>
              <strong>The Invite:</strong> Unsolicited add via ad or contact,
              with "free tips" hype.
            </li>
            <li>
              <strong>Trust Build:</strong> Fake wins shared, small tips work to
              reel you in.
            </li>
            <li>
              <strong>The Push:</strong> Urge downloads of bogus apps or big
              deposits for "VIP" returns.
            </li>
            <li>
              <strong>The Sting:</strong> Rigged profits shown, but withdrawals
              blocked—money gone.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Real-World Stories</h2>
          <p>
            A 70-year-old from Kolshet, Thane, lost ₹2 crore after joining a
            WhatsApp group promising stock tips. The admin, posing as a Chicago
            investment firm rep, lured him with fake high-return trades. He
            invested, saw false profits, but withdrawal demands exposed the
            scam.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/whatsapp2.png'
              alt='Warning Poster for Stock Tips Groups'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>If You Were Scammed</h2>
          <p>
            Verify sources with SEBI, avoid group-shared apps or links, and
            report suspicious invites to cybercrime.gov.in or 1930
            immediately.2.3s
          </p>
        </section>
      </div>
    </div>
  )
}

export default WhatsAppStockScamPage
