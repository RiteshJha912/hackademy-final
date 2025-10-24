import React from 'react'
import { Briefcase } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const FakeJobScamPage = () => {
  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <Briefcase className={styles.articleIcon} />
        <h1>Fake Job / Work-From-Home / Call-Centre Scams</h1>
        <p>
          Understanding and protecting yourself from fake job and work-from-home
          scams
        </p>
      </div>

      <div className={styles.articleContent}>
        <section className={styles.section}>
          <h2>What is it?</h2>
          <p>
            Fake job, work-from-home, and call-centre scams promise easy income
            through ads for jobs like "data entry for ₹20,000/month" or
            call-center roles. Scammers demand upfront fees, access to bank
            accounts, or involve victims in illegal money mule activities.
            Seniors seeking extra income are often targeted in India.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='https://cdn.prod.website-files.com/6082ee0e95eb6459d78fac06/6467d6b3e76bdcdd93af93e6_e38e8637.png'
              alt='Fake Job Email Ad Example'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>How it happens</h2>
          <p>Scammers lure victims with these tactics:</p>
          <ul>
            <li>
              The Ad: Email or SMS promising "No experience needed—start today!"
            </li>
            <li>
              The Fee: Demanding ₹500 or more for "kit/training" with further
              excuses for additional payments.
            </li>
            <li>
              Data Drain: Requesting bank details for "salary setup," leading to
              theft.
            </li>
            <li>
              Mule Role: Involving victims in "payment processing" that supports
              criminal activities unknowingly.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Real world stories</h2>
          <p>
            Bengaluru-based fake call centers have been busted for scamming
            Americans with "digital arrest" hoaxes, leading to 16 arrests. These
            scam operations have caused significant financial and emotional
            damage globally.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/wfh-scam-warning.jpg'
              alt='Work-From-Home Scam Warning'
              className={styles.articleImage}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>How to stay protected</h2>
          <ul>
            <li>
              Legit Check: Use trusted platforms like Naukri.com; legitimate
              jobs don’t require upfront fees.
            </li>
            <li>
              No Bank Shares: Never share bank details for "verification."
            </li>
            <li>
              Interview Real: Prefer in-person interviews; video calls are
              acceptable but verify the employer.
            </li>
            <li>
              Family Veto: Discuss job offers with trusted family or friends.
            </li>
            <li>
              Report: Contact local police or report to cybercrime.gov.in if
              suspicious.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default FakeJobScamPage
