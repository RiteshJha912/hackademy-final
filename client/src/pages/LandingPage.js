import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldUser,
  Shield,
  Users,
  Brain,
  BookOpen,
  ArrowRight,
  Trophy,
  Target,
  Search,
  UserLock,
  Siren,
} from 'lucide-react'
import styles from '../styles/LandingPage.module.css'

const LandingPage = () => {
  const [visibleWords, setVisibleWords] = useState(0)
  const words = [
    'Making',
    'Cybersecurity',
    'Fun',
    '&',
    'Accessible',
    'for',
    'Everyone',
  ]

  // animates the main title by revealing words one by one with a delay
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev < words.length) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 150)

    return () => clearInterval(timer)
  }, [words.length])

  // function to handle smooth scrolling to How It Works section
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
      <div className={styles.heroContainer}>
        <div className={styles.badge}>
          <ShieldUser size={16} className={styles.badgeIcon} />
          Secure India, One Game at a Time
        </div>

        <h1 className={styles.mainTitle}>
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <span
                className={`${styles.animatedWord} ${
                  index < visibleWords ? styles.visible : ''
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {word === 'Cybersecurity' ? (
                  <span className={styles.gradientText}>{word}</span>
                ) : (
                  word
                )}
              </span>
              {index === 1 && <br />}{' '}
              {/* Existing line break after 'Cybersecurity' */}
              {index === 5 && <br />} {/* New line break after 'for' */}
              {index < words.length - 1 && ' '} {/* Space between words */}
            </React.Fragment>
          ))}
        </h1>

        <p className={styles.mainDescription}>
          Join India’s fight against online frauds. Discover real scams and
          digital traps affecting everyday users, and learn how to stop them.
          Stay alert, take short quizzes, and safeguard your digital life with
          every lesson.
        </p>

        <div className={styles.buttonGroup}>
          <Link to='/username' className={styles.primaryButton}>
            Start Learning <ArrowRight size={20} />
          </Link>
          <button
            onClick={scrollToHowItWorks}
            className={styles.secondaryButton}
          >
            <BookOpen size={20} /> Know More
          </button>
        </div>

        <div className={styles.statsGrid}>
          {[
            { value: '1.16B+', label: 'Indians Online', icon: Users },
            { value: '50,000+', label: 'Cyber Crimes Daily', icon: Shield },
            { value: '₹1.25T', label: 'Annual Cyber Losses', icon: Trophy },
          ].map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <stat.icon size={32} className={styles.statIcon} />
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.missionSection}>
        <div className={styles.missionCard}>
          <div>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              Empowering every Indian citizen with essential cybersecurity
              knowledge through gamification. From password hygiene to safe
              browsing, we make learning engaging and accessible, creating a
              digitally secure nation one player at a time.
            </p>
          </div>
          <div className={styles.missionVisual}>
            <img
              src='/images/flag.png'
              alt='Indian Flag'
              className={styles.flagPlaceholder}
            />
            <p className={styles.flagCaption}>Digital India, Secure India</p>
          </div>
        </div>
      </div>

      <div className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.howItWorksSubtitle}>
          A comprehensive, gamified learning experience designed to protect you
          from real-world cyber threats
        </p>

        <div className={styles.stepsGrid}>
          {[
            {
              step: '1',
              title: 'Quick Access',
              description:
                'No signup required - just enter your username and dive straight into learning. Start your cybersecurity journey instantly without any barriers.',
              icon: Users,
            },
            {
              step: '2',
              title: 'Interactive Learning',
              description:
                'Explore comprehensive modules on Digital Arrest Scams, UPI Frauds, e-KYC attacks, Job Scams, and more. Audio narration enhances accessibility.',
              icon: BookOpen,
            },
            {
              step: '3',
              title: 'Real-World Quizzes',
              description:
                'Test your knowledge with scenario-based quizzes simulating actual scam attempts. Discover vulnerabilities and learn protection strategies.',
              icon: Brain,
            },
          ].map((item, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepNumber}>{item.step}</div>
              <item.icon size={40} className={styles.stepIcon} />
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.featuresSection}>
          <h3 className={styles.featuresTitle}>What You'll Learn</h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Target size={48} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>What is it?</h4>
              <p className={styles.featureDescription}>
                Clear explanations of each scam type, how fraudsters operate,
                and why these threats are dangerous
              </p>
            </div>
            <div className={styles.featureCard}>
              <Search size={48} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>How it Happens</h4>
              <p className={styles.featureDescription}>
                Step-by-step breakdown of scammer tactics, common red flags, and
                real-world case studies
              </p>
            </div>
            <div className={styles.featureCard}>
              <UserLock size={48} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>How to Protect Yourself</h4>
              <p className={styles.featureDescription}>
                Actionable prevention strategies, best practices, and security
                measures to stay safe online
              </p>
            </div>
            <div className={styles.featureCard}>
              <Siren size={48} className={styles.featureIcon} />
              <h4 className={styles.featureTitle}>If You Were Scammed</h4>
              <p className={styles.featureDescription}>
                Immediate action steps, reporting procedures, and recovery
                guidance if you've been victimized
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>© 2025 H4CK4DEMY. All rights reserved.</p>
      </div>
    </div>
  )
}

export default LandingPage
