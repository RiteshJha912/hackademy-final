import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UsernamePage from './pages/UsernamePage'
import MCQGamePage from './pages/MCQGamePage'
import LeaderboardPage from './pages/LeaderboardPage'
import LearnPage from './pages/LearnPage'
import DigitalArrestScamPage from './pages/DigitalArrestScamPage'
import UPIScamPage from './pages/UPIScamPage'
import PhishingGamePage from './pages/PhishingGamePage'
import GamesHubPage from './pages/GamesHubPage'
import EKYCPage from './pages/EKYCPage'
import FakeJobScamPage from './pages/FakeJobScamPage'
import WhatsAppStockScamPage from './pages/WhatsAppStockScam'
import Navbar from './components/Navbar'
import styles from './styles/App.module.css'
import './styles/common.module.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('currentUser') || ''
  )

  const setUser = (username, token = null) => {
    setCurrentUser(username)
    if (username) {
      localStorage.setItem('currentUser', username)
      if (token) {
        localStorage.setItem(`visitorToken_${username}`, token)
      }
    } else {
      localStorage.removeItem('currentUser')
    }
  }

  // Gracefully log the user out when they close the browser tab
  useEffect(() => {
    const handleUnload = () => {
      if (currentUser) {
        const backendUrl =
          process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACKEND_URL
            : 'http://localhost:5000'

        fetch(`${backendUrl}/api/user/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: currentUser }),
          keepalive: true, // Crucial for unload events
        }).catch(() => {})
      }
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [currentUser])

  return (
    <Router>
      <div className={styles.app}>
        <Navbar currentUser={currentUser} setUser={setUser} />
        <main className={styles.mainContent}>
          <div className={styles.pageContainer}>
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route
                path='/username'
                element={<UsernamePage setUser={setUser} />}
              />
              <Route
                path='/games'
                element={<GamesHubPage currentUser={currentUser} />}
              />
              <Route
                path='/game'
                element={<MCQGamePage currentUser={currentUser} />}
              />
              <Route
                path='/phishing-game'
                element={<PhishingGamePage currentUser={currentUser} />}
              />
              <Route path='/leaderboard' element={<LeaderboardPage />} />
              <Route
                path='/learn'
                element={<LearnPage currentUser={currentUser} />}
              />
              <Route
                path='/learn/digital-arrest-scam'
                element={<DigitalArrestScamPage />}
              />
              <Route
                path='/learn/upi-payment-scams'
                element={<UPIScamPage />}
              />
              <Route path='/learn/ekyc-sim-swap' element={<EKYCPage />} />
              <Route
                path='/learn/fake-job-scams'
                element={<FakeJobScamPage />}
              />
              <Route
                path='/learn/whatsapp-stock-scam'
                element={<WhatsAppStockScamPage />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
