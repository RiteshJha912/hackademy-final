import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../utils/api'
import styles from '../styles/MCQGamePage.module.css'
import appStyles from '../styles/App.module.css'
import {
  Award,
  RefreshCw,
  Trophy,
  CheckCircle,
  Loader,
  ArrowRight,
  Flag,
} from 'lucide-react'

const MCQGamePage = ({ currentUser }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [gameCompleted, setGameCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const questions = [
    {
      id: 1,
      question:
        "You receive a phone call from someone claiming to be a police officer, saying your name is linked to a crime and you're under 'digital arrest.' They demand you transfer money to a safe account immediately. What should you do?",
      options: [
        'Transfer the money quickly to avoid trouble',
        'Hang up and call your local police station using a known number to verify',
        'Share your bank details so they can handle it',
        'Stay on the call and follow their instructions',
      ],
      correct: 1,
      points: 10,
    },
    {
      id: 2,
      question:
        "A stranger sends you ₹50 via UPI with a note saying 'Sent by mistake, please refund.' They then send a collect request for ₹500. What is the safest action?",
      options: [
        'Approve the collect request to return the money',
        'Ignore the request and block the sender if unknown',
        'Call them back to confirm the mistake',
        'Send back exactly ₹50 using your own transaction',
      ],
      correct: 1,
      points: 10,
    },
    {
      id: 3,
      question:
        "You get an email asking you to update your Aadhaar details via a link for e-KYC, promising faster services. The link looks official but you're unsure. How should you respond?",
      options: [
        'Click the link and enter your Aadhaar number',
        'Ignore the email and use the official UIDAI website or app for any updates',
        'Reply to the email with your details',
        'Forward it to a friend for advice',
      ],
      correct: 1,
      points: 15,
    },
    {
      id: 4,
      question:
        'Your phone suddenly loses service, and soon after, you notice unauthorized transactions in your bank app. This might be a SIM swap fraud. What is your first step?',
      options: [
        'Wait for service to return',
        'Contact your telecom provider immediately to check for unauthorized porting',
        'Change your bank password online',
        'Call the bank from another number',
      ],
      correct: 1,
      points: 15,
    },
    {
      id: 5,
      question:
        'You see an ad for a work-from-home job offering ₹15,000/month for simple data entry, but they ask for ₹1,000 upfront for training materials. What should you do?',
      options: [
        'Pay the fee to secure the job',
        'Research the company on official job sites and avoid paying any upfront fees',
        'Share your bank details for salary setup',
        'Sign up and start the training immediately',
      ],
      correct: 1,
      points: 20,
    },
  ]

  // redirects to username page if no user is logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/username')
    }
  }, [currentUser, navigate])

  // handles answer selection, score updates, and backend score saving on game completion
  const handleNextQuestion = async () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    let newScore = score

    if (isCorrect) {
      newScore = score + questions[currentQuestion].points
      setScore(newScore)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
    } else {
      setLoading(true)
      try {
        if (newScore > 0) {
          await userAPI.updateScore(currentUser, newScore)
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

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer('')
    setGameCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / 70) * 100
    if (percentage >= 80) return "Excellent! You're a cybersecurity expert!"
    if (percentage >= 60)
      return 'Good job! You have solid cybersecurity knowledge.'
    if (percentage >= 40)
      return 'Not bad! Consider studying more cybersecurity concepts.'
    return 'Keep learning! Cybersecurity takes practice.'
  }

  if (!currentUser) {
    return <div>Redirecting...</div>
  }

  if (showResult) {
    return (
      <div className={`${appStyles.pageContainer} ${styles.gamePage}`}>
        <div className={styles.resultContainer}>
          <h2>
            <Award className={styles.icon} /> Game Complete!
          </h2>
          <div className={styles.scoreDisplay}>
            <div className={styles.finalScore}>
              <span className={styles.scoreLabel}>Your Score:</span>
              <span className={styles.scoreValue}>{score} / 70</span>
            </div>
            <div className={styles.scorePercentage}>
              {((score / 70) * 100).toFixed(1)}%
            </div>
          </div>

          <div className={styles.resultMessage}>{getScoreMessage()}</div>

          <div className={styles.resultActions}>
            <button onClick={resetGame} className={styles.playAgainButton}>
              <RefreshCw className={styles.icon} /> Play Again
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className={styles.leaderboardButton}
            >
              <Trophy className={styles.icon} /> View Leaderboard
            </button>
          </div>

          {gameCompleted && (
            <div className={styles.completionNote}>
              <CheckCircle className={styles.icon} /> Score has been saved to
              your profile!
            </div>
          )}
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className={`${appStyles.pageContainer} ${styles.gamePage}`}>
      <div className={styles.gameContainer}>
        <div className={styles.gameHeader}>
          <div className={styles.progressInfo}>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>Score: {score}</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(currentQuestion / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className={styles.questionContainer}>
          <h3 className={styles.questionText}>{question.question}</h3>
          <div className={styles.questionPoints}>
            Worth {question.points} points
          </div>
        </div>

        <div className={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${
                selectedAnswer === index ? styles.selected : ''
              }`}
              onClick={() => handleAnswerClick(index)}
            >
              <span className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={styles.optionText}>{option}</span>
            </button>
          ))}
        </div>

        <div className={styles.gameActions}>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === '' || loading}
            className={styles.nextButton}
          >
            {loading ? (
              <>
                <Loader className={styles.loadingIcon} /> Saving...
              </>
            ) : currentQuestion === questions.length - 1 ? (
              <>
                <Flag className={styles.icon} /> Finish Game
              </>
            ) : (
              <>
                <ArrowRight className={styles.icon} /> Next Question
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MCQGamePage
