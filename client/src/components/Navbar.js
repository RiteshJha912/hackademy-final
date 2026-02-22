import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ShieldUser,
  Home,
  Gamepad2,
  Trophy,
  User,
  LogOut,
  BookOpen,
  Menu,
  X,
  Github,
  Star,
} from 'lucide-react'
import styles from '../styles/Navbar.module.css'
import { userAPI } from '../utils/api'

const Navbar = ({ currentUser, setUser }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Lock body scroll when mobile menu is open (works on iOS + Android)
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLogout = async () => {
    if (currentUser) {
      try {
        await userAPI.logoutUser(currentUser)
      } catch (err) {
        console.error('Failed to log out cleanly', err)
      }
    }
    setUser('')
    setIsMenuOpen(false)
    navigate('/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? styles.active : ''
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to='/' className={styles.navLogo}>
          <ShieldUser className={styles.logoIcon} /> Hackademy
        </Link>



        <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayOpen : ''}`} onClick={() => setIsMenuOpen(false)}></div>

        <div
          className={`${styles.navMenu} ${
            isMenuOpen ? styles.navMenuOpen : ''
          }`}
          data-testid='nav-menu'
        >
          <Link
            to='/'
            className={`${styles.navLink} ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className={styles.navIcon} /> Home
          </Link>

          <Link
            to='/learn'
            className={`${styles.navLink} ${isActive('/learn')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <BookOpen className={styles.navIcon} /> Learn
          </Link>



          {currentUser ? (
            <>
              <Link
                to='/leaderboard'
                className={`${styles.navLink} ${isActive('/leaderboard')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className={styles.navIcon} /> Leaderboard
              </Link>
              <Link
                to='/games'
                className={`${styles.navLink} ${isActive('/games')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className={styles.navIcon} /> Play Games
              </Link>
              <a
                href='https://github.com/RiteshJha912/hackademy-final'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.githubMobilePill}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.ghMobileContent}>
                  <Star size={18} fill="#fbbf24" color="#fbbf24" />
                  <span>on</span>
                  <Github size={20} />
                </div>
              </a>
              <div className={styles.userInfo}>
                <span className={styles.usernameWrapper}>
                  <span className={styles.username}>
                    <User className={styles.userIcon} /> @{currentUser}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                  data-testid='logout-button'
                >
                  <LogOut className={styles.navIcon} /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to='/username'
                className={`${styles.navLink} ${styles.loginBtn} ${isActive('/username')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className={styles.navIcon} /> Login
              </Link>
              <a
                href='https://github.com/RiteshJha912/hackademy-final'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.githubMobilePill}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={styles.ghMobileContent}>
                  <Star size={18} fill="#fbbf24" color="#fbbf24" />
                  <span>on</span>
                  <Github size={20} />
                </div>
              </a>
            </>
          )}
        </div>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          data-testid='hamburger-button'
        >
          {isMenuOpen ? (
            <X className={styles.navIcon} />
          ) : (
            <Menu className={styles.navIcon} />
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
