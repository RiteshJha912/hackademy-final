import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gameAPI } from '../utils/api'
import styles from '../styles/MCQGamePage.module.css'
import {
  Award,
  RefreshCw,
  Trophy,
  CheckCircle,
  Loader,
  ArrowRight,
  Flag,
  Gamepad2,
  ShieldAlert,
  Clock,
  ArrowLeft
} from 'lucide-react'

const MCQGamePage = ({ currentUser }) => {
  const [questions, setQuestions] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [streak, setStreak] = useState(0)
  const [bonusPoints, setBonusPoints] = useState(0)
  const [explanation, setExplanation] = useState('')
  const [correctOptionText, setCorrectOptionText] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [timeTakenForQuestion, setTimeTakenForQuestion] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)
  
  const timerRef = useRef()
  const navigate = useNavigate()

  const startNewGame = useCallback(async () => {
    setLoading(true)
    try {
      const resp = await gameAPI.startGame(currentUser, 'mcq')
      if (resp.success) {
        setQuestions(resp.data.questions)
        setSessionId(resp.data.sessionId)
        setCurrentQuestion(0)
        setScore(0)
        setShowResult(false)
        setSelectedAnswer('')
        setShowFeedback(false)
        setIsCorrect(null)
        setStreak(0)
        setBonusPoints(0)
        setGameCompleted(false)
        setTimeRemaining(resp.data.questions[0].timeLimit)
        setTimeTakenForQuestion(0)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  // redirects to username page if no user is logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/username')
    } else if (questions.length === 0 && !showResult) {
      startNewGame()
    }
  }, [currentUser, navigate, questions.length, showResult, startNewGame])



  const handleTimeOut = useCallback(() => {
    // Auto-submit with empty/timeout selectedAnswer
    handleAnswerSubmit('__TIMEOUT__', questions[currentQuestion].timeLimit)
  }, [handleAnswerSubmit, questions, currentQuestion])

  // Timer logic
  useEffect(() => {
    if (loading || showResult || showFeedback || !questions.length) {
      clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleTimeOut()
          return 0
        }
        return prev - 1
      })
      setTimeTakenForQuestion((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [loading, showResult, showFeedback, questions, currentQuestion, handleTimeOut])

  // handles moving to the next question or finishing game
  const handleAnswerSubmit = useCallback(async (answerOption, finalTimeTaken) => {
    if (showFeedback || submitting) return // Prevent duplicate clicking

    setSelectedAnswer(answerOption)
    setShowFeedback(true)
    setSubmitting(true)
    clearInterval(timerRef.current)

    try {
      const resp = await gameAPI.submitAnswer(
        sessionId,
        questions[currentQuestion].id,
        answerOption,
        finalTimeTaken
      )

      if (resp.success) {
        setIsCorrect(resp.data.isCorrect)
        setScore(prev => prev + resp.data.pointsEarned)
        setStreak(resp.data.streak)
        setBonusPoints(resp.data.streakBonus + resp.data.timeBonus)
        setExplanation(resp.data.explanation)
        setCorrectOptionText(resp.data.correctOption)
      }
    } catch (e) {
      console.error("Submission failed", e)
    } finally {
      setSubmitting(false)
    }
  }, [showFeedback, submitting, sessionId, questions, currentQuestion])

  // handles moving to the next question or finishing game
  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
      setShowFeedback(false)
      setIsCorrect(null)
      setBonusPoints(0)
      setTimeRemaining(questions[currentQuestion + 1].timeLimit)
      setTimeTakenForQuestion(0)
    } else {
      finishQuiz(false)
    }
  }

  const finishQuiz = async (isQuit = false) => {
    setLoading(true)
    try {
      await gameAPI.finishGame(sessionId, isQuit)
      
      if (isQuit) {
        navigate('/games')
        return
      }

      setGameCompleted(true)
      setShowResult(true)
    } catch (error) {
      console.error('Error finishing game:', error)
      if (!isQuit) {
        setGameCompleted(true)
        setShowResult(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const resetGame = () => {
    startNewGame()
  }

  const getScoreMessage = () => {
    if (score > 200) return "Excellent! You're a cybersecurity expert!"
    if (score > 100)
      return 'Good job! You have solid cybersecurity knowledge.'
    if (score > 0)
      return 'Not bad! Consider studying more cybersecurity concepts.'
    return 'Keep learning! Cybersecurity takes practice.'
  }

  if (loading && questions.length === 0) {
    return (
      <div className={styles.gamePage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <Loader className={styles.loadingIcon} size={48} />
      </div>
    )
  }

  if (!currentUser) {
    return <div>Redirecting...</div>
  }

  if (showResult) {
    return (
      <div className={styles.gamePage}>
        <div className={styles.ambientLight} />
        <div className={styles.gridOverlay} />
        <div className={styles.resultContainer}>
          <h2>
            <Award className={styles.icon} /> Game Complete!
          </h2>
          <div className={styles.scoreDisplay}>
            <div className={styles.finalScore}>
              <span className={styles.scoreLabel}>Final Score:</span>
              <span className={styles.scoreValue}>{score}</span>
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
              <Trophy className={styles.icon} /> Leaderboard
            </button>
            <button
              onClick={() => navigate('/games')}
              className={styles.arcadeButton}
            >
              <Gamepad2 className={styles.icon} /> Arcade
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
    <div className={styles.gamePage}>
      <div className={styles.ambientLight} />
      <div className={styles.gridOverlay} />

      {showQuitConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
          <div style={{ background: '#121218', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'Orbitron, sans-serif' }}>Abandon Training?</h3>
            <p style={{ color: '#a1a1aa', fontSize: '1rem', marginBottom: '8px' }}>Your progress will be lost and no score will be saved.</p>
            <p style={{ color: '#a855f7', fontSize: '0.9rem', marginBottom: '2rem' }}>This strictly will not affect your ranking.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowQuitConfirm(false)} 
                style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #52525b', color: '#e4e4e7', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}
              >Cancel</button>
              <button 
                onClick={() => { setShowQuitConfirm(false); finishQuiz(true); }} 
                style={{ flex: 1, padding: '12px', background: '#ef4444', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: '500' }}
              >Quit</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.gameContainer}>
        {!showResult && (
          <button 
            onClick={() => setShowQuitConfirm(true)} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', transition: 'color 0.2s', padding: 0, marginBottom: '20px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
          >
            <ArrowLeft size={20} /> Back
          </button>
        )}

        <div className={styles.gameHeader}>
          <div className={styles.progressInfo}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: timeRemaining <= 10 ? '#ef4444' : '#a855f7' }}>
                <Clock size={16} /> {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {streak >= 2 && (
                <span style={{ color: '#f59e0b', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '5px', animation: 'slideUp 0.3s ease-out' }}>
                  🔥 {streak} Streak!
                </span>
              )}
              <span>Score: {score}</span>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${(timeRemaining / question.timeLimit) * 100}%`,
                background: timeRemaining <= 10 ? '#ef4444' : '#a855f7'
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
          {question.options.map((option, index) => {
            let optionStyles = `${styles.optionButton}`
            
            // Add visual feedback to clicked buttons AFTER backend evaluation
            if (showFeedback && !submitting) {
              if (option === correctOptionText) {
                 optionStyles += ` ${styles.correctOption}`
              } else if (selectedAnswer === option && !isCorrect) {
                 optionStyles += ` ${styles.incorrectOption}`
              }
            } else if (selectedAnswer === option) {
              optionStyles += ` ${styles.selected}`
            }

            return (
              <button
                key={index}
                className={optionStyles}
                onClick={() => handleAnswerSubmit(option, timeTakenForQuestion)}
                disabled={showFeedback || submitting}
              >
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={styles.optionText}>{option}</span>
              </button>
            )
          })}
        </div>

        {submitting && (
           <div style={{ textAlign: 'center', color: '#a855f7', marginBottom: '20px' }}>
              <Loader className={styles.loadingIcon} style={{display:'inline', marginRight:'10px'}}/> Evaluating Securely...
           </div>
        )}

        {showFeedback && !submitting && (
          <div className={`${styles.feedbackPanel} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}>
            <h4 className={styles.feedbackTitle}>
              {isCorrect ? (
                <><CheckCircle size={20} /> Correct!</>
              ) : (
                <><ShieldAlert size={20} /> Incorrect</>
              )}

              {isCorrect && bonusPoints > 0 && (
                <span className={styles.bonusBadge} style={{marginLeft: '10px', background: '#f59e0b', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem'}}>
                  +{bonusPoints} Bonus! 🎁 Time & Streak
                </span>
              )}
            </h4>
            <p className={styles.feedbackText}>{explanation}</p>
          </div>
        )}

        {showFeedback && !submitting && (
          <div className={styles.gameActions}>
            <button
              onClick={handleNextQuestion}
              disabled={loading}
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
        )}
      </div>
    </div>
  )
}

export default MCQGamePage