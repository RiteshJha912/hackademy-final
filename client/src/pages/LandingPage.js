import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  Users,
  Brain,
  Zap,
  Ghost,
  ArrowRight,
  TrendingUp,
  Target,
  Search,
  Lock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import styles from '../styles/LandingPage.module.css'

const LandingPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.querySelector(
      `.${styles.howItWorksSection}`
    )
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.landingPage}>
      {/* Decorative Background Elements */}
      <div className={styles.glowingOrb} style={{ top: '10%', left: '5%' }} />
      <div className={styles.glowingOrb} style={{ bottom: '20%', right: '10%', background: 'rgba(236, 72, 153, 0.2)' }} />

      <div className={styles.heroContainer}>
        <div className={`${styles.badge} ${mounted ? styles.fadeInDown : ''}`}>
          <Zap size={16} className={styles.badgeIcon} />
          <span>Cybersecurity, but actually fun.</span>
        </div>

        <h1 className={`${styles.mainTitle} ${mounted ? styles.fadeInUp : ''}`}>
          Don't Let A <span className={styles.gradientText}>Scammer</span>
          <br />
          <span className={styles.glitchText} data-text="Ruin Your Day">Ruin Your Day</span>
        </h1>

        <p className={`${styles.mainDescription} ${mounted ? styles.fadeInUpDelay : ''}`}>
          The "CBI" is video calling you, your KYC has "expired", and strangers want to pay you to like videos. Welcome to the internet.
          <br /><br />
          <strong>We teach you how to say "Nice Try" and move on.</strong>
        </p>

        <div className={`${styles.buttonGroup} ${mounted ? styles.fadeInUpDelay2 : ''}`}>
          <Link to='/username' className={styles.primaryButton}>
            Start Playing <ArrowRight size={20} />
          </Link>
          <button
            onClick={scrollToHowItWorks}
            className={styles.secondaryButton}
          >
            <Ghost size={20} /> How It Works
          </button>
        </div>

        <div className={`${styles.statsGrid} ${mounted ? styles.fadeInUpDelay3 : ''}`}>
          {[
            { value: '1.16B+', label: 'Indians Online', icon: Users, color: '#a78bfa' },
            { value: '50,000+', label: 'Cyber Crimes Daily', icon: AlertTriangle, color: '#f472b6' },
            { value: '₹1.25T', label: 'Annual Cyber Losses', icon: TrendingUp, color: '#fbbf24' },
          ].map((stat, idx) => (
            <div key={idx} className={styles.statCard} style={{ animationDelay: `${idx * 0.2}s` }}>
              <stat.icon size={32} className={styles.statIcon} style={{ color: stat.color }} />
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.missionSection}>
        <div className={styles.missionCard}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              We believe cybersecurity shouldn't be boring lectures about strong passwords. It should be about spotting the red flags in a "You won an iPhone" email.
              <br /><br />
              We're here to turn every Indian internet user into a <strong>human firewall</strong>. Less panic, more logic.
            </p>
          </div>
          <div className={styles.missionVisual}>
            <div className={styles.floatingCard}>
              <AlertTriangle size={48} className={styles.floatingIcon} />
              <p>Warning: Scam Detected</p>
            </div>
            <div className={`${styles.floatingCard} ${styles.topCard}`}>
              <CheckCircle size={48} className={styles.floatingIcon} style={{ color: '#34d399' }} />
              <p>Threat Blocked</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.howItWorksSubtitle}>
          Three simple steps to becoming un-scammable.
        </p>

        <div className={styles.stepsGrid}>
          {[
            {
              step: '1',
              title: 'Enter The Arena',
              description: 'No signup forms longer than a CVS receipt. Just pick a username and jump in.',
              icon: Zap,
            },
            {
              step: '2',
              title: 'Play The Victim',
              description: 'We simulate real scams. Get "arrested" digitally, get "hired" for a fake job. Fail safely here so you don’t fail in real life.',
              icon: Ghost,
            },
            {
              step: '3',
              title: 'Get Smart',
              description: 'Learn the red flags. Take the quizzes. Earn points. Brag to your friends that you saved the family inheritance.',
              icon: TrendingUp,
            },
          ].map((item, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>{item.step}</div>
                <item.icon size={32} className={styles.stepIcon} />
              </div>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.featuresSection}>
          {/* <h3 className={styles.featuresTitle}>What You'll Actually Learn</h3> */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Target size={40} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>The "Digital Arrest"</h4>
              <p className={styles.featureDescription}>
                Spoiler: The police don't do video calls on Skype to ask for money.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Search size={40} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>The "Job Offer"</h4>
              <p className={styles.featureDescription}>
                If they pay you ₹5000/hr to like YouTube videos, it's a trap.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Lock size={40} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>The "KYC Expired"</h4>
              <p className={styles.featureDescription}>
                 Your bank account won't explode if you don't click that link within 10 mins.
              </p>
            </div>
            <div className={styles.featureCard}>
              <AlertTriangle size={40} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>The Panic Button</h4>
              <p className={styles.featureDescription}>
                What to actually do when you realize you messed up (besides crying).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>© 2026 Hackademy. Staying safe, one pixel at a time.</p>
      </div>
    </div>
  )
}

export default LandingPage
