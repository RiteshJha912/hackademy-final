import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../utils/api'

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
    if (percentage >= 80) return "🏆 Excellent! You're a cybersecurity expert!"
    if (percentage >= 60)
      return '👍 Good job! You have solid cybersecurity knowledge.'
    if (percentage >= 40)
      return '📚 Not bad! Consider studying more cybersecurity concepts.'
    return '💪 Keep learning! Cybersecurity takes practice.'
  }

  if (!currentUser) {
    return <div>Redirecting...</div>
  }

  if (showResult) {
    return (
      <div className='page-container game-page'>
        <div className='result-container'>
          <h2>🎯 Game Complete!</h2>
          <div className='score-display'>
            <div className='final-score'>
              <span className='score-label'>Your Score:</span>
              <span className='score-value'>{score} / 70</span>
            </div>
            <div className='score-percentage'>
              {((score / 70) * 100).toFixed(1)}%
            </div>
          </div>

          <div className='result-message'>{getScoreMessage()}</div>

          <div className='result-actions'>
            <button onClick={resetGame} className='play-again-button'>
              🔄 Play Again
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className='leaderboard-button'
            >
              🏆 View Leaderboard
            </button>
          </div>

          {gameCompleted && (
            <div className='completion-note'>
              ✅ Score has been saved to your profile!
            </div>
          )}
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className='page-container game-page'>
      <div className='game-container'>
        <div className='game-header'>
          <div className='progress-info'>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>Score: {score}</span>
          </div>
          <div className='progress-bar'>
            <div
              className='progress-fill'
              style={{
                width: `${(currentQuestion / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className='question-container'>
          <h3 className='question-text'>{question.question}</h3>
          <div className='question-points'>Worth {question.points} points</div>
        </div>

        <div className='options-container'>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              }`}
              onClick={() => handleAnswerClick(index)}
            >
              <span className='option-letter'>
                {String.fromCharCode(65 + index)}
              </span>
              <span className='option-text'>{option}</span>
            </button>
          ))}
        </div>

        <div className='game-actions'>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === '' || loading}
            className='next-button'
          >
            {loading
              ? '⏳ Saving...'
              : currentQuestion === questions.length - 1
              ? '🏁 Finish Game'
              : '➡️ Next Question'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MCQGamePage
