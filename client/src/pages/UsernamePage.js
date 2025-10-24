import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../utils/api';
import styles from '../styles/UsernamePage.module.css';
import commonStyles from '../styles/common.module.css';

const UsernamePage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }

    if (username.length > 30) {
      setError('Username cannot exceed 30 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await userAPI.createUser(username.trim());
      
      if (response.success) {
        setUser(username.trim().toLowerCase());
        navigate('/game');
      } else {
        setError(response.message || 'Failed to create user');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.usernamePage}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>👤 Enter Your Username</h2>
          <p>Choose a unique username to start your cybersecurity journey!</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.usernameForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              maxLength="30"
              disabled={loading}
            />
            <small>2-30 characters, letters and numbers only</small>
          </div>

          {error && <div className={commonStyles.errorMessage}>{error}</div>}

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? '⏳ Creating...' : '🎮 Start Playing'}
          </button>
        </form>

        <div className={styles.infoBox}>
          <h4>📋 Quick Info:</h4>
          <ul>
            <li>No signup required - just pick a username!</li>
            <li>Your progress is automatically saved</li>
            <li>Compete with players worldwide</li>
            <li>Earn points by answering correctly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsernamePage;