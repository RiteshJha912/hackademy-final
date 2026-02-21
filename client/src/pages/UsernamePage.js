import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../utils/api'
import { Loader, Gamepad2 } from 'lucide-react'
import styles from '../styles/UsernamePage.module.css'
import commonStyles from '../styles/common.module.css'

const UsernamePage = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [forceLoginNeeded, setForceLoginNeeded] = useState(false)
  const navigate = useNavigate()

  // handles username submission, validates input, creates user via API, and navigates to game
  const handleSubmit = async (e, force = false) => {
    e.preventDefault()

    const normalizedUsername = username.trim().toLowerCase()

    if (!normalizedUsername) {
      setError('Please enter a username')
      return
    }

    if (normalizedUsername.length < 2) {
      setError('Username must be at least 2 characters')
      return
    }

    if (normalizedUsername.length > 30) {
      setError('Username cannot exceed 30 characters')
      return
    }

    if (!/^[a-z0-9_]+$/.test(normalizedUsername)) {
      setError('Username can only contain letters, numbers, and underscores')
      return
    }

    setLoading(true)
    setError('')

    try {
      const storedToken = localStorage.getItem(`visitorToken_${normalizedUsername}`) || ''
      const response = await userAPI.createUser(normalizedUsername, force, storedToken)

      if (response.success) {
        // We use the normalized username from the backend response to ensure full parity
        // and safely save their new or existing secure token
        setUser(response.data.username, response.token)
        navigate('/games')
      } else {
        setError(response.message || 'Failed to create user')
      }
    } catch (error) {
      if (error.isAlreadyActive) {
        setForceLoginNeeded(true)
        setError(error.message || 'Username is active elsewhere. Force login to disconnect them.')
      } else {
         setError(error.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.usernamePage}>
      <div className={styles.particleBackground}></div>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Choose Your Username</h2>
          <p>
            Please pick a simple name. This will be used to track your quiz
            progress and scores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.usernameForm}>
          <div className={styles.inputGroup}>
            <label htmlFor='username'>Your Name:</label>
            <div className={`${styles.inputWrapper} ${error ? styles.inputError : ''}`}>
              <span className={styles.atSymbol}>@</span>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setForceLoginNeeded(false)
                  setError('')
                }}
                placeholder='player_one'
                maxLength='30'
                disabled={loading}
              />
            </div>
            <small>Use 2-30 letters or numbers. Keep it simple.</small>
          </div>

          {error && (
            <div
              className={`${commonStyles.errorMessage} ${styles.errorShake}`}
            >
              {error}
            </div>
          )}

          {forceLoginNeeded ? (
            <button
              type='button'
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
              className={`${styles.primaryButton} ${
                loading ? styles.disabledButton : ''
              }`}
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}
            >
              {loading ? (
                <><Loader className={styles.loadingIcon} /> Logging in...</>
              ) : (
                <><Gamepad2 className={styles.icon} /> Force Login</>
              )}
            </button>
          ) : (
            <button
              type='submit'
              disabled={loading}
              className={`${styles.primaryButton} ${
                loading ? styles.disabledButton : ''
              }`}
            >
              {loading ? (
                <><Loader className={styles.loadingIcon} /> Logging in...</>
              ) : (
                <><Gamepad2 className={styles.icon} /> Start Playing</>
              )}
            </button>
          )}

          {loading && (
            <p className={styles.loadingMessage}>
              Hold tight! The server is waking up, so this might take a moment...
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default UsernamePage
