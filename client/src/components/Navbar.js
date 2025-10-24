import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Shield,
  Home,
  Gamepad2,
  Trophy,
  User,
  LogOut,
  BookOpen,
} from 'lucide-react'
import styles from '../styles/Navbar.module.css'

const Navbar = ({ currentUser, setUser }) => {
  const location = useLocation()

  const handleLogout = () => {
    setUser('')
  }

  const isActive = (path) => {
    return location.pathname === path ? styles.active : ''
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to='/' className={styles.navLogo}>
          <Shield className={styles.logoIcon} /> H4CK4DEMY
        </Link>

        <div className={styles.navMenu}>
          <Link to='/' className={`${styles.navLink} ${isActive('/')}`}>
            <Home className={styles.navIcon} /> Home
          </Link>

          {currentUser ? (
            <>
              <Link
                to='/learn'
                className={`${styles.navLink} ${isActive('/learn')}`}
              >
                <BookOpen className={styles.navIcon} /> Learn
              </Link>
              <Link
                to='/leaderboard'
                className={`${styles.navLink} ${isActive('/leaderboard')}`}
              >
                <Trophy className={styles.navIcon} /> Leaderboard
              </Link>
              <Link
                to='/game'
                className={`${styles.navLink} ${isActive('/game')}`}
              >
                <Gamepad2 className={styles.navIcon} /> Play Game
              </Link>
              <div className={styles.userInfo}>
                <span className={styles.username}>
                  <User className={styles.navIcon} /> {currentUser}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  <LogOut className={styles.navIcon} /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to='/learn'
                className={`${styles.navLink} ${isActive('/learn')}`}
              >
                <BookOpen className={styles.navIcon} /> Learn
              </Link>
              <Link
                to='/leaderboard'
                className={`${styles.navLink} ${isActive('/leaderboard')}`}
              >
                <Trophy className={styles.navIcon} /> Leaderboard
              </Link>
              <Link
                to='/username'
                className={`${styles.navLink} ${isActive('/username')}`}
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
