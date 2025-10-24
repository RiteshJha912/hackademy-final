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

  // Sample cybersecurity questions
  const questions = [
    {
      id: 1,
      question: "What does 'phishing' refer to in cybersecurity?",
      options: [
        'A type of malware that encrypts files',
        'A social engineering attack to steal sensitive information',
        'A method of securing network connections',
        'A type of firewall protection',
      ],
      correct: 1,
      points: 10,
    },
    {
      id: 2,
      question: 'Which of the following is considered a strong password?',
      options: ['password123', 'MyP@ssw0rd!2024', '12345678', 'qwerty'],
      correct: 1,
      points: 10,
    },
    {
      id: 3,
      question: "What does 'MFA' stand for in cybersecurity?",
      options: [
        'Multiple File Access',
        'Multi-Factor Authentication',
        'Managed Firewall Application',
        'Mobile Fraud Alert',
      ],
      correct: 1,
      points: 15,
    },
    {
      id: 4,
      question: 'Which port is commonly used for HTTPS traffic?',
      options: ['80', '443', '21', '25'],
      correct: 1,
      points: 15,
    },
    {
      id: 5,
      question: 'What is the primary purpose of a VPN?',
      options: [
        'To increase internet speed',
        'To create a secure, encrypted connection over the internet',
        'To block advertisements',
        'To compress data files',
      ],
      correct: 1,
      points: 20,
    },
  ]

  useEffect(() => {
    if (!currentUser) {
      navigate('/username')
    }
  }, [currentUser, navigate])

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

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
      // Game completed, update score in backend
      setLoading(true)
      try {
        if (newScore > 0) {
          await userAPI.updateScore(currentUser, newScore)
        }
        setGameCompleted(true)
        setShowResult(true)
      } catch (error) {
        console.error('Error updating score:', error)
        // Still show results even if score update fails
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
    setSelectedAnswer('')
    setGameCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / 70) * 100 // Total possible score is 70
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
