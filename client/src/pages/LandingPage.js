import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  Users,
  Zap,
  Ghost,
  ArrowRight,
  TrendingUp,
  Target,
  Search,
  Lock,
  AlertTriangle,
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  Globe,
  Fingerprint
} from 'lucide-react'
import styles from '../styles/LandingPage.module.css'
import CyberText from '../components/CyberText'

const LandingPage = () => {
  const [mounted, setMounted] = useState(false)
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTerminalStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, [])

  const scrollToSection = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className={styles.landingPage}>
      {/* Dynamic Background */}
      <div className={styles.ambientLight} />
      <div className={styles.gridOverlay} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} ${mounted ? styles.fadeDown : ''}`}>
            <div className={styles.pulseDot} />
            <span>The Modern Survival Guide for the Internet</span>
          </div>

          <h1 className={`${styles.heroTitle} ${mounted ? styles.fadeUp : ''}`}>
            Don't Let A <span className={styles.gradientText}><CyberText text="Scammer" /></span>
            <br />
            <span className={styles.glitchText}><CyberText text="Ruin Your Day" /></span>
          </h1>

          <p className={`${styles.heroSubtitle} ${mounted ? styles.fadeUpDelay : ''}`}>
            The "CBI" is calling. Your KYC has "expired". Strangers want to pay you to like videos.
            <br />
            <strong>Welcome to the digital jungle. We teach you how to survive.</strong>
          </p>

          <div className={`${styles.ctaGroup} ${mounted ? styles.fadeUpDelay2 : ''}`}>
            <Link to='/game' className={styles.primaryBtn}>
              Start Training <ArrowRight size={18} />
            </Link>
            <button onClick={() => scrollToSection(`.${styles.bentoSection}`)} className={styles.secondaryBtn}>
              Explore Modules
            </button>
          </div>
        </div>

        {/* Floating Dashboard Preview (Visual Anchor) */}
        <div className={`${styles.heroDashboard} ${mounted ? styles.fadeUpDelay3 : ''}`}>
          <div className={styles.dashboardHeader}>
            <div className={styles.windowControls}>
              <span className={styles.controlDot} />
              <span className={styles.controlDot} />
              <span className={styles.controlDot} />
            </div>
            <div className={styles.searchBar}>hackademy://defense_protocols/active</div>
          </div>
          <div className={styles.dashboardContent}>
             <div className={styles.statRow}>
                <div className={styles.statItem}>
                   <span className={styles.statLabel}>Active Threats</span>
                   <span className={styles.statValue}>50,000+</span>
                   <span className={styles.statTrend}><TrendingUp size={12}/> +12%</span>
                </div>
                <div className={styles.statItem}>
                   <span className={styles.statLabel}>Your Status</span>
                   <span className={styles.statValue} style={{color: '#fff'}}>Unprotected</span>
                   <span className={styles.statTrend} style={{color: '#f472b6'}}><AlertTriangle size={12}/> Risk</span>
                </div>
                <div className={styles.statItem}>
                   <span className={styles.statLabel}>Potential Loss</span>
                   <span className={styles.statValue}>₹1.25T</span>
                </div>
             </div>
             <div className={styles.scanVisual}>
                <div className={styles.scanLine} />
                <div className={styles.threatNode} style={{top: '30%', left: '20%'}}></div>
                <div className={styles.threatNode} style={{top: '60%', left: '70%'}}></div>
                <div className={styles.threatNode} style={{top: '40%', left: '50%'}}></div>
                <div className={styles.gridLines}></div>
             </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className={styles.bentoSection}>
        <div className={styles.sectionHeader}>
           <h2>Defense Protocols</h2>
           <p>Master these modules to become scambait-proof.</p>
        </div>
        
        <div className={styles.bentoGrid}>
          {/* Large Card: Mission/Terminal */}
          <div className={`${styles.bentoCard} ${styles.colSpan2} ${styles.rowSpan2}`}>
             <div className={styles.cardHeader}>
               <Terminal className={styles.cardIcon} size={24} color="#a78bfa" />
               <h3>Live Threat Simulation</h3>
             </div>
             <p className={styles.cardDesc}>We simulate real-world attacks in a safe sandbox environment.</p>
             <div className={styles.terminalWindow}>
                <div className={styles.terminalLine}>
                   <span className={styles.prompt}>user@hackademy:~$</span> 
                   {terminalStep === 0 && <span className={styles.typing}> analyze_incoming_call -v</span>}
                   {terminalStep > 0 && <span> analyze_incoming_call -v</span>}
                </div>
                {terminalStep > 0 && (
                   <div className={styles.terminalLine}>
                      <span className={styles.warning}>[WARNING]</span> Spoofed Caller ID detected.
                   </div>
                )}
                {terminalStep > 1 && (
                   <div className={styles.terminalLine}>
                      <span className={styles.info}>[INFO]</span> Pattern match: "Digital Arrest Scam"
                   </div>
                )}
                {terminalStep > 2 && (
                   <div className={styles.terminalLine}>
                      <span className={styles.success}>[ACTION]</span> Call blocked. User educated.
                   </div>
                )}
             </div>
          </div>

          {/* Medium Card: Digital Arrest */}
          <div className={styles.bentoCard}>
             <div className={styles.cardHeader}>
               <Target className={styles.cardIcon} size={24} color="#f472b6" />
               <h3>The "Digital Arrest"</h3>
             </div>
             <p className={styles.cardDesc}>Spoiler: The police don't use Skype to interrogate you.</p>
             <div className={styles.miniVisual}>
                <div className={styles.visualIcon}><Target size={40} /></div>
             </div>
          </div>

          {/* Medium Card: Job Scams */}
          <div className={styles.bentoCard}>
             <div className={styles.cardHeader}>
               <Search className={styles.cardIcon} size={24} color="#34d399" />
               <h3>Fake Job Offers</h3>
             </div>
             <p className={styles.cardDesc}>₹5000/hr to like YouTube videos? Takes 5 seconds to spot the trap.</p>
          </div>

          {/* Wide Card: The Stats */}
          <div className={`${styles.bentoCard} ${styles.colSpan2}`}>
             <div className={styles.rowContent}>
                <div className={styles.textContent}>
                   <h3>Why It Matters</h3>
                   <p>India is the #1 target for cyber fraud. Be the firewall.</p>
                </div>
                <div className={styles.statGroup}>
                   <div className={styles.miniStat}>
                      <span>1.16B+</span>
                      <small>Users</small>
                   </div>
                   <div className={styles.miniStat}>
                      <span>₹1.25T</span>
                      <small>Lost</small>
                   </div>
                </div>
             </div>
          </div>

          {/* Tall Card: Panic Button */}
          <div className={`${styles.bentoCard} ${styles.rowSpan2} ${styles.panicCard}`}>
             <div className={styles.cardHeader}>
               <AlertTriangle className={styles.cardIcon} size={24} color="#fbbf24" />
               <h3>Panic Button</h3>
             </div>
             <p className={styles.cardDesc}>Real-time steps to take when you realize you've been compromised.</p>
             <div className={styles.panicVisual}>
                <div className={styles.panicBtn}>SOS</div>
             </div>
          </div>

          {/* Small Card: KYC */}
          <div className={styles.bentoCard}>
             <div className={styles.cardHeader}>
               <Lock className={styles.cardIcon} size={24} color="#60a5fa" />
               <h3>KYC Fraud</h3>
             </div>
             <p className={styles.cardDesc}>Your bank won't SMS you for KYC.</p>
          </div>

          {/* Small Card: Deepfakes */}
          <div className={styles.bentoCard}>
             <div className={styles.cardHeader}>
               <Fingerprint className={styles.cardIcon} size={24} color="#a78bfa" />
               <h3>AI & Deepfakes</h3>
             </div>
             <p className={styles.cardDesc}>Is that really your uncle calling?</p>
          </div>
        </div>
      </section>

      {/* How It Works - Step Timeline */}
      <section className={styles.timelineSection}>
         <div className={styles.sectionHeader}>
            <h2>The Protocol</h2>
            <p>Three steps to immunity.</p>
         </div>
         
         <div className={styles.timeline}>
            <div className={styles.timelineItem}>
               <div className={styles.stepNumber}>01</div>
               <div className={styles.stepContent}>
                  <h3>Enter The Arena</h3>
                  <p>No login walls. Just pick a handle and start.</p>
               </div>
            </div>
            <div className={styles.connector} />
            <div className={styles.timelineItem}>
               <div className={styles.stepNumber}>02</div>
               <div className={styles.stepContent}>
                  <h3>Get "Scammed"</h3>
                  <p>Face safe simulations of real threats.</p>
               </div>
            </div>
             <div className={styles.connector} />
            <div className={styles.timelineItem}>
               <div className={styles.stepNumber}>03</div>
               <div className={styles.stepContent}>
                  <h3>Build Defenses</h3>
                  <p>Learn the red flags. Protect your family.</p>
               </div>
            </div>
         </div>
      </section>

      <footer className={styles.footer}>
         <div className={styles.footerLine} />
         <div className={styles.footerContent}>
            <div className={styles.brand}>
               <Shield size={20} />
               <span>Hackademy</span>
            </div>
            <div className={styles.copyright}>© 2026 Secured.</div>
         </div>
      </footer>
    </main>
  )
}

export default LandingPage
