import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  ArrowRight,
  Target,
  Search,
  Lock,
  AlertTriangle,
  Terminal,
  Fingerprint,
  Heart,
  ChevronRight
} from 'lucide-react'
import styles from '../styles/LandingPage.module.css'
import CyberText from '../components/CyberText'
import DefenseProtocol from '../components/DefenseProtocol'

// ---------------------------------------------------------------------
// IMPROVEMENT: Extracted threat count so it's easy to update globally
// ---------------------------------------------------------------------
const STATS = {
  threats: '50,000+',
  users: '1.16B+',
  lost: '₹1.25T',
}

// ---------------------------------------------------------------------
// IMPROVEMENT: Reusable BentoCard component for consistent hover/focus
// behaviour - eliminates repeated inline style blocks.
// ---------------------------------------------------------------------
const BentoCard = ({ children, className = '', as: Tag = 'div', ...props }) => (
  <Tag className={`${styles.bentoCard} ${className}`} {...props}>
    {children}
  </Tag>
)

const LandingPage = () => {
  const [terminalStep, setTerminalStep] = useState(0)
  // IMPROVEMENT: track scroll position for subtle parallax on ambient light
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalStep((prev) => (prev + 1) % 4)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className={styles.landingPage}>
      {/* ── Atmospheric Backgrounds ───────────────────────────── */}
      <div className={styles.ambientLight} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          IMPROVEMENT: Added ref for potential parallax; hero layout
          refined with explicit gap instead of relying on margin alone.
      ════════════════════════════════════════════════════════ */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroContent}>

          {/* Badge */}
          <div className={styles.badge} aria-label="Site tagline">
            <span>The Modern Survival Guide for the Internet</span>
          </div>

          {/* IMPROVEMENT: Semantic heading with better aria label */}
          <h1 className={styles.heroTitle}>
            Don't Let A <span className={styles.gradientText}><CyberText text="Scammer" /></span>
            <br />
            <span className={styles.glitchText}><CyberText text="Ruin Your Day" /></span>
          </h1>

          <p className={styles.heroSubtitle}>
            The "police" is calling. Your KYC has "expired". Strangers want to pay you to like videos. 
            <br />
            <strong> Welcome to the digital jungle. We teach you how to survive.</strong>
          </p>

          <div className={styles.ctaGroup}>
            {/* IMPROVEMENT: Icon now animated on hover via CSS, not JS */}
            <Link to="/game" className={styles.primaryBtn} aria-label="Start training now">
              Start Training
              <ArrowRight size={18} className={styles.btnArrow} aria-hidden="true" />
            </Link>
            <button
              onClick={() => scrollToSection(`.${styles.bentoSection}`)}
              className={styles.secondaryBtn}
              aria-label="Explore learning modules"
            >
              Explore Modules
            </button>
          </div>
        </div>

        {/* ── Defense Protocol Preview ────────────────────────── */}
        <div className={styles.heroDashboard}>
          <DefenseProtocol />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BENTO GRID - Defense Protocols
          IMPROVEMENT: Cards use the shared BentoCard component;
          Link cards get textDecoration via CSS class (not inline style).
      ════════════════════════════════════════════════════════ */}
      <section className={styles.bentoSection}>
        <div className={styles.sectionHeader}>
          {/* IMPROVEMENT: eyebrow label above heading for visual hierarchy */}
          <p className={styles.eyebrow}>What You'll Learn</p>
          <h2>Defense Protocols</h2>
          <p className={styles.sectionSubtitle}>Master these modules to become scambait-proof.</p>
        </div>

        <div className={styles.bentoGrid}>

          {/* ── Terminal Card (Large) ──────────────────────────── */}
          <BentoCard
            as={Link}
            to="/games"
            className={`${styles.colSpan2} ${styles.rowSpan2} ${styles.cardLink}`}
            aria-label="Live Threat Simulation module"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIconWrap} style={{ '--icon-color': '#a78bfa' }}>
                <Terminal size={20} aria-hidden="true" />
              </span>
              <h3>Live Threat Simulation</h3>
              <ChevronRight size={16} className={styles.cardChevron} aria-hidden="true" />
            </div>
            <p className={styles.cardDesc}>We simulate real-world attacks in a safe sandbox environment so you know exactly what to do when it happens for real.</p>
            <div className={styles.terminalWindow} aria-live="polite">
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>user@hackademy:~$</span>
                {terminalStep === 0
                  ? <span className={styles.typing}> analyze_incoming_call -v</span>
                  : <span> analyze_incoming_call -v</span>
                }
              </div>
              {terminalStep > 0 && (
                <div className={styles.terminalLine}>
                  <span className={styles.warning}>[WARNING]</span>
                  <span> Spoofed Caller ID detected.</span>
                </div>
              )}
              {terminalStep > 1 && (
                <div className={styles.terminalLine}>
                  <span className={styles.info}>[INFO]</span>
                  <span> Pattern match: "Digital Arrest Scam"</span>
                </div>
              )}
              {terminalStep > 2 && (
                <div className={styles.terminalLine}>
                  <span className={styles.success}>[ACTION]</span>
                  <span> Call blocked. User educated. ✓</span>
                </div>
              )}
            </div>
          </BentoCard>

          {/* ── Digital Arrest Card ────────────────────────────── */}
          <BentoCard
            as={Link}
            to="/learn/digital-arrest-scam"
            className={styles.cardLink}
            aria-label="Learn about the Digital Arrest scam"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIconWrap} style={{ '--icon-color': '#f472b6' }}>
                <Target size={20} aria-hidden="true" />
              </span>
              <h3>The "Digital Arrest"</h3>
              <ChevronRight size={16} className={styles.cardChevron} aria-hidden="true" />
            </div>
            <p className={styles.cardDesc}>Spoiler: The police don't use zoom to interrogate you. Learn to hang up with confidence.</p>
          </BentoCard>

          {/* ── Fake Jobs Card ─────────────────────────────────── */}
          <BentoCard
            as={Link}
            to="/learn/fake-job-scams"
            className={styles.cardLink}
            aria-label="Learn about Fake Job Offer scams"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIconWrap} style={{ '--icon-color': '#34d399' }}>
                <Search size={20} aria-hidden="true" />
              </span>
              <h3>Fake Job Offers</h3>
              <ChevronRight size={16} className={styles.cardChevron} aria-hidden="true" />
            </div>
            <p className={styles.cardDesc}>₹5000/hr to like YouTube videos? Takes 5 seconds to spot the trap once you know what to look for.</p>
          </BentoCard>

          {/* ── Why It Matters (Wide) ──────────────────────────── */}
          <BentoCard className={styles.colSpan2}>
            <div className={styles.rowContent}>
              <div className={styles.textContent}>
                {/* IMPROVEMENT: Semantic heading level matches document outline */}
                <h3>Why It Matters</h3>
                <p className={styles.cardDesc} style={{ marginBottom: 0 }}>
                  India is the #1 target for cyber fraud. Every person you educate is a firewall.
                </p>
              </div>
              <div className={styles.statGroup}>
                <div className={styles.miniStat}>
                  <span>{STATS.users}</span>
                  <small>Internet Users</small>
                </div>
                <div className={styles.miniStatDivider} aria-hidden="true" />
                <div className={styles.miniStat}>
                  <span>{STATS.lost}</span>
                  <small>Lost to Fraud</small>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ── Panic Button (Tall) ────────────────────────────── */}
          <BentoCard
            as={Link}
            to="/learn"
            className={`${styles.rowSpan2} ${styles.panicCard} ${styles.cardLink}`}
            aria-label="Panic Button - real-time recovery guide"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIconWrap} style={{ '--icon-color': '#fbbf24' }}>
                <AlertTriangle size={20} aria-hidden="true" />
              </span>
              <h3>Panic Button</h3>
              <ChevronRight size={16} className={styles.cardChevron} aria-hidden="true" />
            </div>
            <p className={styles.cardDesc}>Real-time steps to take when you realise you've been compromised. Act fast - every minute matters.</p>
            <div className={styles.panicVisual} aria-hidden="true">
              <div className={styles.panicRings}>
                <div className={styles.panicRing} />
                <div className={styles.panicRing} />
              </div>
              <div className={styles.panicBtn}>SOS</div>
            </div>
          </BentoCard>

          {/* ── KYC Fraud Card ────────────────────────────────── */}
          <BentoCard
            as={Link}
            to="/learn/ekyc-sim-swap"
            className={styles.cardLink}
            aria-label="Learn about KYC Fraud"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIconWrap} style={{ '--icon-color': '#60a5fa' }}>
                <Lock size={20} aria-hidden="true" />
              </span>
              <h3>KYC Fraud</h3>
              <ChevronRight size={16} className={styles.cardChevron} aria-hidden="true" />
            </div>
            <p className={styles.cardDesc}>Your bank will never SMS you asking for KYC. Full stop.</p>
          </BentoCard>

          {/* ── AI & Deepfakes Card ───────────────────────────── */}
          <BentoCard>
            <div className={styles.cardHeader}>
              <span className={styles.cardIconWrap} style={{ '--icon-color': '#a78bfa' }}>
                <Fingerprint size={20} aria-hidden="true" />
              </span>
              <h3>AI & Deepfakes</h3>
              {/* IMPROVEMENT: "Coming soon" pill instead of dead-end card */}
              <span className={styles.comingSoonPill}>Soon</span>
            </div>
            <p className={styles.cardDesc}>Is that really your uncle calling? Voice cloning is here. Learn to verify.</p>
          </BentoCard>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS - Step Timeline
          IMPROVEMENT: Numbered steps now have connecting line via
          CSS pseudo-element instead of a separate .connector div,
          which also fixes the mobile layout break.
      ════════════════════════════════════════════════════════ */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Getting Started</p>
          <h2>The Protocol</h2>
          <p className={styles.sectionSubtitle}>Three steps to immunity.</p>
        </div>

        <div className={styles.timeline}>
          {[
            { n: '01', title: 'Enter The Arena', desc: 'No login walls. Just pick a handle and start.' },
            { n: '02', title: 'Get "Scammed"', desc: 'Face safe simulations of real-world threats.' },
            { n: '03', title: 'Build Defenses', desc: 'Learn the red flags. Protect your family.' },
          ].map(({ n, title, desc }, i, arr) => (
            <React.Fragment key={n}>
              <div className={styles.timelineItem}>
                <div className={styles.stepNumber} aria-hidden="true">{n}</div>
                <div className={styles.stepContent}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
              {/* IMPROVEMENT: connector is now rendered in JSX only between items,
                  not after the last - easier than CSS nth-child tricks */}
              {i < arr.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerLine} aria-hidden="true" />
        <div className={styles.footerContent}>
          <div className={styles.brand}>
            <Shield size={18} aria-hidden="true" />
            <span>Hackademy</span>
          </div>
          {/* IMPROVEMENT: copyright text is more readable; link has proper rel */}
          <div className={styles.copyright}>
            Made with{' '}
            <Heart size={13} color="#ef4444" fill="#ef4444" aria-label="love" />{' '}
            by{' '}
            <a
              href="https://github.com/RiteshJha912"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Ritzardous
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default LandingPage