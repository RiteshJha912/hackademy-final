import React from 'react'
import {
  TrendingUp,
  AlertTriangle,
  Activity,
  Lock,
} from 'lucide-react'
import styles from '../styles/DefenseProtocol.module.css'

// ─────────────────────────────────────────────────────────────
// Stats data - each stat gets its own accent colour for the
// top-edge glow AND the icon background tint.
// ─────────────────────────────────────────────────────────────
const PROTOCOL_STATS = [
  {
    id: 'threats',
    label: 'Active Threats',
    value: '50,000+',
    meta: '+12% this week',
    metaType: 'up',
    Icon: TrendingUp,
    accent: 'rgba(52, 211, 153, 0.35)',
    iconBg: 'rgba(52, 211, 153, 0.1)',
  },
  {
    id: 'status',
    label: 'Your Status',
    value: 'Unprotected',
    meta: 'High Risk',
    metaType: 'danger',
    Icon: AlertTriangle,
    accent: 'rgba(248, 113, 113, 0.35)',
    iconBg: 'rgba(248, 113, 113, 0.1)',
  },
  {
    id: 'loss',
    label: 'Potential Loss',
    value: '₹1.25T',
    meta: 'Annually in India',
    metaType: 'neutral',
    Icon: Activity,
    accent: 'rgba(167, 139, 250, 0.35)',
    iconBg: 'rgba(167, 139, 250, 0.1)',
  },
]

// ─────────────────────────────────────────────────────────────
// META_CLASS - maps metaType → CSS module class
// ─────────────────────────────────────────────────────────────
const META_CLASS = {
  up: styles.metaUp,
  danger: styles.metaDanger,
  neutral: styles.metaNeutral,
}

// ─────────────────────────────────────────────────────────────
// DefenseProtocol - YC-startup quality product preview
//
// Visual architecture:
//  ┌─ productFrame ─────────────────────────────────────────┐
//  │ windowChrome  (frosted glass toolbar)                  │
//  │ ┌─ dashboardBody ────────────────────────────────────┐ │
//  │ │  statsGrid (3-col stat cards)                      │ │
//  │ │  scanOverlay (perspective grid)                    │ │
//  │ └────────────────────────────────────────────────────┘ │
//  └────────────────────────────────────────────────────────┘
//  reflection (grounding shadow)
// ─────────────────────────────────────────────────────────────
const DefenseProtocol = () => (
  <div className={styles.wrapper}>
    <div
      className={styles.productFrame}
      role="img"
      aria-label="Hackademy defense protocol dashboard preview"
    >
      {/* ═══ Window Chrome ═══════════════════════════════════
          Frosted-glass toolbar with traffic-light dots,
          inset address bar with lock icon, and LIVE badge. */}
      <div className={styles.windowChrome}>
        {/* Traffic light dots - dim when toolbar isn't hovered */}
        <div className={styles.windowDots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>

        {/* Address bar - inset pill with lock icon for authenticity */}
        <div className={styles.addressBar}>
          <Lock size={9} className={styles.lockIcon} aria-hidden="true" />
          hackademy://defense_protocols/active
        </div>

        {/* LIVE badge - double-ring pulse dot */}
        <div className={styles.liveBadge} aria-label="Live status">
          <span className={styles.liveDot} aria-hidden="true" />
          LIVE
        </div>
      </div>

      {/* ═══ Dashboard Content ═══════════════════════════════
          Three stat cards with accent glows and hover lift. */}
      <div className={styles.dashboardBody}>
        <div className={styles.statsGrid}>
          {PROTOCOL_STATS.map(({ id, label, value, meta, metaType, Icon, accent, iconBg }) => (
            <div
              key={id}
              className={styles.statCard}
              style={{
                '--stat-accent': accent,
                '--icon-bg': iconBg,
              }}
            >
              {/* Label row - icon in tinted circle + uppercase label */}
              <span className={styles.statLabel}>
                <span className={styles.statLabelIcon}>
                  <Icon size={10} aria-hidden="true" />
                </span>
                {label}
              </span>

              {/* Value - large bold number, red for danger */}
              <span
                className={`${styles.statValue} ${metaType === 'danger' ? styles.valueDanger : ''}`}
              >
                {value}
              </span>

              {/* Meta - small trend indicator */}
              <span className={`${styles.statMeta} ${META_CLASS[metaType] || styles.metaNeutral}`}>
                <Icon size={9} aria-hidden="true" />
                {meta}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle scan grid at the bottom - visual depth */}
        <div className={styles.scanOverlay} aria-hidden="true">
          <div className={styles.perspectiveGrid} />
        </div>
      </div>
    </div>

    {/* Reflection - grounding shadow beneath the frame */}
    <div className={styles.reflection} aria-hidden="true" />
  </div>
)

export default DefenseProtocol
