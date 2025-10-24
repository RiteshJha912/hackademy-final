import React from 'react'
import { AlertTriangle } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const WhatsAppStockScamPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <AlertTriangle className={styles.articleIcon} />
        <h1>WhatsApp/Telegram Stock Market Group Scam</h1>
        <p>Protect yourself from fraudulent stock market schemes on WhatsApp</p>
      </div>

      <div className={styles.bentoGrid}>
        <section className={`${styles.bentoCard} ${styles.whatIsIt}`}>
          <h2>What is it?</h2>
          <p>
            Buzzing WhatsApp groups promise "insider" stock tips for quick
            riches, but they're traps run by fraudsters posing as experts. They
            lure you with free advice, then push fake apps or schemes where your
            investments vanish. Seniors eyeing easy gains are easy prey in
            India, where trading hype is huge. Many victims only realize they've
            been scammed when trying to withdraw money or when the admin
            suddenly disappears. These scams exploit trust and the fear of
            missing out on high returns, making it crucial to stay cautious.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/whatsapp1.png'
              alt='Spotting WhatsApp Investment Red Flags'
              className={styles.bentoImage}
            />
          </div>
        </section>

        <section className={`${styles.bentoCard} ${styles.howItHappens}`}>
          <h2>How it happens</h2>
          <ul>
            <li>Unsolicited add via ad or contact, with "free tips" hype.</li>
            <li>Fake wins shared, small tips work to reel you in.</li>
            <li>
              Urge downloads of bogus apps or big deposits for "VIP" returns.
            </li>
            <li>Rigged profits shown, but withdrawals blocked money gone.</li>
          </ul>
        </section>

        <section className={`${styles.bentoCard} ${styles.realWorldStories}`}>
          <h2>Real-World Stories</h2>
          <div className={styles.imageContainer}>
            <img
              src='/images/whatsapp2.png'
              alt='Warning Poster for Stock Tips Groups'
              className={styles.bentoImage}
            />
          </div>
          <p>
            A 70 year-old from Kolshet, Thane, lost ₹2 crore after joining a
            WhatsApp group promising stock tips. The admin, posing as a Chicago
            investment firm rep, lured him with fake high return trades. He
            invested, saw false profits, but withdrawal demands exposed the
            scam.
          </p>
        </section>

        <section className={`${styles.bentoCard} ${styles.stayProtected}`}>
          <h2>If You Were Scammed</h2>
          <p>
            Verify sources with SEBI, avoid group shared apps or links, and
            report suspicious invites to cybercrime.gov.in or 1930 immediately.
          </p>
        </section>
      </div>
    </div>
  )
}

export default WhatsAppStockScamPage
