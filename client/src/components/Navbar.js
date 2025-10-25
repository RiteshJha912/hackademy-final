import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
} from 'lucide-react'
import styles from '../styles/Navbar.module.css'

const Navbar = ({ currentUser, setUser }) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    setUser('')
    setIsMenuOpen(false) // Close menu on logout
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

          {currentUser ? (
            <>
              <Link
                to='/learn'
                className={`${styles.navLink} ${isActive('/learn')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className={styles.navIcon} /> Learn
              </Link>
              <Link
                to='/leaderboard'
                className={`${styles.navLink} ${isActive('/leaderboard')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className={styles.navIcon} /> Leaderboard
              </Link>
              <Link
                to='/game'
                className={`${styles.navLink} ${isActive('/game')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className={styles.navIcon} /> Play Game
              </Link>
              <div className={styles.userInfo}>
                <span className={styles.usernameWrapper}>
                  <span className={styles.username}>
                    <User className={styles.userIcon} /> {currentUser}
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
                to='/learn'
                className={`${styles.navLink} ${isActive('/learn')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className={styles.navIcon} /> Learn
              </Link>
              <Link
                to='/leaderboard'
                className={`${styles.navLink} ${isActive('/leaderboard')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className={styles.navIcon} /> Leaderboard
              </Link>
              <Link
                to='/username'
                className={`${styles.navLink} ${isActive('/username')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className={styles.navIcon} /> Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
