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

      <div className={styles.bentoGrid}>
        <section className={`${styles.bentoCard} ${styles.whatIsIt}`}>
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
              src='/images/job2.jpg'
              alt='Fake Job Email Ad Example'
              className={styles.bentoImage}
            />
          </div>
        </section>

        <section className={`${styles.bentoCard} ${styles.howItHappens}`}>
          <h2>How it happens</h2>
          <p>Scammers cleverly lure victims with these manipulative tactics:</p>
          <ul>
            <li>
              Email or SMS messages promising “No experience needed, start
              earning today now!”
            </li>
            <li>
              Demanding ₹500 or even more for “kit/training materials,” followed
              by further creative excuses for additional unnecessary payments.
            </li>
            <li>
              Requesting complete bank details for “salary setup,” eventually
              leading to financial data theft and personal loss.
            </li>
            <li>
              Involving unsuspecting victims in “payment processing” schemes
              that secretly support serious criminal or illegal activities
              unknowingly.
            </li>
          </ul>
        </section>

        <section className={`${styles.bentoCard} ${styles.realWorldStories}`}>
          <h2>Real world stories</h2>
          <div className={styles.imageContainer}>
            <img
              src='/images/job3.png'
              alt='Fake Job and Investment Scam Arrest'
              className={styles.bentoImage}
            />
          </div>
          <p>
            A Delhi based family was defrauded of ₹1.10 crore in a fake job and
            investment scam. The accused, posing as a company CEO, used forged
            documents, fake offer letters, and social media to trick victims.
            Police tracked him down in Goa after months of digital investigation
            and arrested him for running a sophisticated cyber fraud network.
          </p>
        </section>

        <section className={`${styles.bentoCard} ${styles.stayProtected}`}>
          <h2>How to stay protected</h2>
          <ul>
            <li>
              Use trusted platforms like Naukri.com; legitimate jobs don’t
              require upfront fees.
            </li>
            <li>Never share bank details for "verification."</li>
            <li>
              Prefer in person interviews; video calls are acceptable but verify
              the employer.
            </li>
            <li>Discuss job offers with trusted family or friends.</li>
            <li>
              Contact local police or report to cybercrime.gov.in if suspicious.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default FakeJobScamPage
