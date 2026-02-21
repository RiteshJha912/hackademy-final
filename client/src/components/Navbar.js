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
  ShieldAlert,
} from 'lucide-react'
import styles from '../styles/Navbar.module.css'
import { userAPI } from '../utils/api'

const Navbar = ({ currentUser, setUser }) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <Link
              to='/username'
              className={`${styles.navLink} ${isActive('/username')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className={styles.navIcon} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
