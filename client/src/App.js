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
import EKYCPage from './pages/EKYCPage'
import FakeJobScamPage from './pages/FakeJobScamPage'
import WhatsAppStockScamPage from './pages/WhatsAppStockScamPage'
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

  const setUser = (username) => {
    setCurrentUser(username)
    if (username) {
      localStorage.setItem('currentUser', username)
    } else {
      localStorage.removeItem('currentUser')
    }
  }

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
                path='/game'
                element={<MCQGamePage currentUser={currentUser} />}
              />
              <Route path='/leaderboard' element={<LeaderboardPage />} />
              <Route path='/learn' element={<LearnPage />} />
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
