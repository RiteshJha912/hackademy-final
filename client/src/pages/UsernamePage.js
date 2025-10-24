import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../utils/api'
import { Key, Zap, Clipboard, Loader } from 'lucide-react'
import styles from '../styles/UsernamePage.module.css'
import commonStyles from '../styles/common.module.css'

const UsernamePage = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    if (username.length < 2) {
      setError('Username must be at least 2 characters')
      return
    }

    if (username.length > 30) {
      setError('Username cannot exceed 30 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await userAPI.createUser(username.trim())

      if (response.success) {
        setUser(username.trim().toLowerCase())
        navigate('/game')
      } else {
        setError(response.message || 'Failed to create user')
      }
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.usernamePage}>
      <div className={styles.particleBackground}></div>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>
            <Key className={styles.icon} /> Choose Your Name
          </h2>
          <p>
            Please pick a simple name. This will be used to track your quiz
            progress and scores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.usernameForm}>
          <div className={styles.inputGroup}>
            <label htmlFor='username'>Your Name:</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Type your name here...'
              maxLength='30'
              disabled={loading}
              className={error ? styles.inputError : ''}
            />
            <small>Use 2-30 letters or numbers. Keep it simple.</small>
          </div>

          {error && (
            <div
              className={`${commonStyles.errorMessage} ${styles.errorShake}`}
            >
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? (
              <>
                <Loader className={styles.loadingIcon} /> Logging in...
              </>
            ) : (
              <>
                 Test your knowledge
              </>
            )}
          </button>
        </form>

        <div className={styles.infoBox}>
          <h4>
            <Clipboard className={styles.icon} /> Tips for Getting Started:
          </h4>
          <ul>
            <li>No technical skills required, just your name.</li>
            <li>Your progress saves automatically.</li>
            <li>Test your knowledge at your own page.</li>
            <li>Answer questions, earn points and feel confident online.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UsernamePage
