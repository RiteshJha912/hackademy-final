import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../utils/api'
import styles from '../styles/PhishingGamePage.module.css'
import {
  Award,
  RefreshCw,
  Trophy,
  CheckCircle,
  Loader,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Smartphone,
  Gamepad2
} from 'lucide-react'

const PhishingGamePage = ({ currentUser }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const scenarios = [
    {
      id: 1,
      type: 'email',
      sender: 'Support@pay-pal-security.com',
      subject: 'Urgent: Account Suspended',
      content: 'Dear User,\n\nWe have detected unusual activity on your account. Please click the link below to verify your identity or your account will be permanently locked.\n\nhttp://paypal.verify-update-info.com\n\nRegards,\nPayPal Team',
      isPhishing: true,
      explanation: 'The sender email address uses a fake domain (-security.com), creates a false sense of urgency, and includes a highly suspicious link.',
      points: 15
    },
    {
      id: 2,
      type: 'sms',
      sender: 'VD-KOTAKB',
      subject: 'Bank Alert',
      content: 'Dear Customer, your Kotak Bank account ending in 4321 has been credited with Rs 5000.00 on 24-Oct. Avl Bal Rs 52,430.00. Pls check Kotak App for details.',
      isPhishing: false,
      explanation: 'This is a standard bank alert. It uses a verified sender ID, does not ask for any personal information, and does not contain any suspicious links.',
      points: 10
    },
    {
      id: 3,
      type: 'sms',
      sender: '+91 9876543210',
      subject: 'Delivery Alert',
      content: 'Your IndiaPost package is waiting for delivery. Please update your address and pay the Rs 5.00 redelivery fee here: https://indiapost-update-tracking.info',
      isPhishing: true,
      explanation: 'Official services rarely use a generic 10-digit mobile number for automated alerts. The link is clearly fake and points to a credential harvesting site.',
      points: 15
    },
    {
      id: 4,
      type: 'email',
      sender: 'HR_Department@your-company.com',
      subject: 'Mandatory Policy Update - Action Required',
      content: 'Hello Team,\n\nPlease review the attached updated Work From Home policy document for Q4. You must sign in with your corporate Microsoft account to view the document.\n\nClick here: https://login.microsoft-corp-portal.com/auth\n\nThanks,\nHuman Resources',
      isPhishing: true,
      explanation: 'A classic "spear phishing" attempt. The link points to a fake Microsoft login page designed to steal your corporate credentials.',
      points: 20
    },
    {
      id: 5,
      type: 'email',
      sender: 'no-reply@netflix.com',
      subject: 'New sign-in to your account',
      content: 'Hi there,\n\nWe noticed a new sign-in to your Netflix account from a new device (Smart TV in Mumbai).\nIf this was you, you can ignore this email. If you don\'t recognize this activity, please change your password by visiting netflix.com directly.',
      isPhishing: false,
      explanation: 'This is a genuine security alert. The sender address is correct, and it safely advises you to visit the website directly rather than providing a masked link.',
      points: 10
    }
  ]

  useEffect(() => {
    if (!currentUser) {
      navigate('/username')
    }
  }, [currentUser, navigate])

  const handleAnswer = (answerIsPhishing) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIsPhishing)
    setShowFeedback(true)

    const isCorrect = answerIsPhishing === scenarios[currentQuestion].isPhishing
    if (isCorrect) {
      setScore(score + scenarios[currentQuestion].points)
    }
  }

  const handleNext = async () => {
    if (currentQuestion < scenarios.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setLoading(true)
      try {
        if (score > 0) {
          await userAPI.updateScore(currentUser, score)
        }
        setGameCompleted(true)
        setShowResult(true)
      } catch (error) {
        console.error('Error updating score:', error)
        setGameCompleted(true)
        setShowResult(true)
      } finally {
        setLoading(false)
      }
    }
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setGameCompleted(false)
  }

  const getScoreMessage = () => {
    const maxScore = scenarios.reduce((acc, curr) => acc + curr.points, 0)
    const percentage = (score / maxScore) * 100
    if (percentage === 100) return "Perfect! You have a hawkeye for scams."
    if (percentage >= 70) return "Great job! You made mostly safe choices."
    return "You fell for some traps! Keep learning to stay safe."
  }

  if (!currentUser) return <div>Redirecting...</div>

  if (showResult) {
    const maxScore = scenarios.reduce((acc, curr) => acc + curr.points, 0)
    return (
      <div className={styles.gamePage}>
        <div className={styles.ambientLight} />
        <div className={styles.gridOverlay} />
        <div className={styles.resultContainer}>
          <h2><Award className={styles.icon} /> Game Complete!</h2>
          <div className={styles.scoreDisplay}>
            <div className={styles.finalScore}>
              <span className={styles.scoreLabel}>Your Score:</span>
              <span className={styles.scoreValue}>{score} / {maxScore}</span>
            </div>
            <div className={styles.scorePercentage}>
              {((score / maxScore) * 100).toFixed(0)}%
            </div>
          </div>
          <div className={styles.resultMessage}>{getScoreMessage()}</div>
          <div className={styles.resultActions}>
            <button onClick={resetGame} className={styles.playAgainButton}>
              <RefreshCw className={styles.icon} /> Play Again
            </button>
            <button onClick={() => navigate('/leaderboard')} className={styles.leaderboardButton}>
              <Trophy className={styles.icon} /> Leaderboard
            </button>
            <button onClick={() => navigate('/games')} className={styles.arcadeButton}>
              <Gamepad2 className={styles.icon} /> Arcade
            </button>
          </div>
          {gameCompleted && (
            <div className={styles.completionNote}>
              <CheckCircle className={styles.icon} /> Score saved to profile!
            </div>
          )}
        </div>
      </div>
    )
  }

  const scenario = scenarios[currentQuestion]
  const isCorrect = selectedAnswer === scenario.isPhishing

  return (
    <div className={styles.gamePage}>
      <div className={styles.ambientLight} />
      <div className={styles.gridOverlay} />
      <div className={styles.gameContainer}>
        
        <div className={styles.gameHeader}>
          <div className={styles.progressInfo}>
            <span>Case {currentQuestion + 1} of {scenarios.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentQuestion / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.questionContainer}>
          <h3 className={styles.questionText}>Analyze this message. Is it a scam?</h3>
          <div className={styles.questionPoints}>Worth {scenario.points} points</div>
        </div>

        <div className={styles.messageContainer}>
          <div className={styles.messageHeader}>
            <div className={styles.messageSender}>
              {scenario.type === 'email' ? <Mail size={16} /> : <Smartphone size={16} />}
              <strong>From:</strong> {scenario.sender}
            </div>
            <div className={styles.messageSubject}>
              {scenario.subject}
            </div>
          </div>
          <div className={styles.messageBody}>
            {scenario.content.split('http').map((part, i, arr) => {
              if (i === 0) return part;
              const linkUrl = 'http' + part.split('\n')[0].split(' ')[0];
              const rest = part.substring(linkUrl.length - 4);
              return (
                <React.Fragment key={i}>
                  <span className={styles.fakeLink}>{linkUrl}</span>{rest}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {!showFeedback ? (
          <div className={styles.optionsContainer}>
            <button 
              className={`${styles.optionButton} ${styles.legit}`}
              onClick={() => handleAnswer(false)}
            >
              <ShieldCheck className={styles.optionIcon} color="#10b981" />
              <span>It's Legitimate</span>
            </button>
            <button 
              className={`${styles.optionButton} ${styles.phishing}`}
              onClick={() => handleAnswer(true)}
            >
              <ShieldAlert className={styles.optionIcon} color="#ef4444" />
              <span>It's a Scam!</span>
            </button>
          </div>
        ) : (
          <div className={`${styles.feedbackPanel} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}>
            <div className={styles.feedbackTitle}>
              {isCorrect ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
            <p className={styles.feedbackText}>{scenario.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <div className={styles.gameActions}>
            <button onClick={handleNext} disabled={loading} className={styles.nextButton}>
              {loading ? (
                <><Loader className={styles.loadingIcon} /> Saving...</>
              ) : (
                <><ArrowRight className={styles.icon} /> {currentQuestion === scenarios.length - 1 ? 'Finish Game' : 'Next Case'}</>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default PhishingGamePage
