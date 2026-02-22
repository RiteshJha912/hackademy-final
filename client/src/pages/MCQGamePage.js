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
  Gamepad2,
  ShieldAlert
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
        "You receive a WhatsApp video call from someone in a police uniform, in what looks like a real police station. They say your Aadhaar was used to register a SIM card sending illegal messages, and you must stay on the call for a 'virtual investigation' or be physically arrested. What should you do?",
      options: [
        'Stay on the call - ignoring a police investigation could make things worse',
        'Ask them to send an official written notice to your registered address instead',
        'Disconnect immediately - no real law enforcement agency in India conducts investigations or arrests over WhatsApp video calls',
        'Call a family member while staying on the call to act as a witness',
      ],
      correct: 2,
      explanation:
        "This is a 'Digital Arrest' scam. In India, no law - CrPC, IPC, or IT Act - permits arrest via video call. Scammers use AI-generated police station backgrounds and uniforms to appear authentic. The National Cyber Crime helpline is 1930. Real agencies send written summons through official channels.",
      points: 15,
    },
    {
      id: 2,
      question:
        "A customer service agent calls from your bank's official number (verified on Truecaller) saying your account is at risk. To 'secure' it, they ask you to download AnyDesk and share the 9-digit access code. What is the right move?",
      options: [
        'Share the code - the caller ID matched your bank and Truecaller confirmed it',
        'Refuse and hang up. Call your bank back using the number on the back of your debit card',
        'Download the app but share only the code, not your passwords',
        'Ask the agent to verify themselves by stating your account balance first',
      ],
      correct: 1,
      explanation:
        "Caller IDs and Truecaller entries can be spoofed. AnyDesk, TeamViewer, and Quick Support are legitimate remote access tools that fraudsters weaponize to take full control of your phone screen - including reading OTPs in real time. Sharing a remote access code with any caller is equivalent to handing over your phone. Your bank will NEVER ask you to install such apps.",
      points: 20,
    },
    {
      id: 3,
      question:
        "You're selling a second-hand phone on OLX. A buyer says he'll pay via UPI and sends you a QR code to 'confirm your account' before the payment is credited. When you scan it, your UPI app asks you to enter your PIN. What is happening?",
      options: [
        'This is normal - UPI requires PIN confirmation to receive payments too',
        'The buyer is verifying your identity before transferring a large amount',
        "You are about to make a payment, not receive one - QR codes and UPI collect requests always debit your account, never credit it",
        'The app may be buggy; try scanning from a different UPI app',
      ],
      correct: 2,
      explanation:
        "In UPI, your PIN is ONLY required when you are sending money. Receiving money requires zero action from you - it just appears in your account. Any scenario where you must scan a QR code or enter your PIN to 'receive' money is a fraud. This is one of India's most reported UPI scam vectors, documented extensively by Delhi Police cybercrime units.",
      points: 15,
    },
    {
      id: 4,
      question:
        "You see a Telegram group offering a 'task-based earning' scheme: like YouTube videos and get paid ₹50–₹150 per task. After completing free tasks and receiving small real payments, they offer a 'premium membership' for ₹5,000 that promises ₹1,500 per task. What is this?",
      options: [
        'A legitimate micro-task platform - the initial payments prove it is real',
        'A part-time freelancing opportunity popular with students',
        "A 'task fraud' or 'pig-butchering' scam - the initial small payments are deliberate bait to build trust before the large upfront fee is stolen",
        "Potentially real, but only invest if you verify their GST registration first",
      ],
      correct: 2,
      explanation:
        "This is called 'task fraud' - a top-ranked cybercrime in India in 2025, accounting for 35% of all reported cases per I4C. The initial real payments are not proof of legitimacy; they are a deliberate investment by scammers to build trust. Once you pay the 'upgrade fee', the group vanishes. The MHA has specifically warned against Telegram and WhatsApp-based task earning groups.",
      points: 20,
    },
    {
      id: 5,
      question:
        "An elderly relative in a village uses AePS (Aadhaar Enabled Payment System) to withdraw cash at a local banking correspondent. They later find ₹8,000 debited in transactions they didn't make. Which attack is most likely responsible?",
      options: [
        'SIM swap fraud - their mobile number was ported without consent',
        'Biometric cloning - their fingerprint was captured and replicated to authenticate fraudulent AePS withdrawals',
        'Phishing - they clicked a fake Aadhaar update link',
        'OTP fraud - someone tricked them into sharing a one-time password',
      ],
      correct: 1,
      explanation:
        "AePS fraud via biometric cloning is a documented and growing threat in rural India, particularly in the Mewat and Jamtara regions. Fraudsters use silicone rubber fingerprint replicas created from lifted prints to impersonate victims at AePS terminals. Since AePS uses biometrics - not OTPs or PINs - traditional fraud alerts don't apply. Victims often discover the theft days later.",
      points: 25,
    },
    {
      id: 6,
      question:
        "You receive a voice call that sounds exactly like your cousin asking you to urgently transfer ₹15,000 to a new number as they are stuck at a hospital. The voice, accent, and speech pattern are a perfect match. You're about to transfer. What should you do first?",
      options: [
        'Transfer immediately - you recognized the voice and it is an emergency',
        'Transfer half the amount first to test if it goes through correctly',
        "Hang up and call your cousin back on their known saved number to verify - this may be an AI deepfake voice call",
        'Ask the caller to prove identity by telling you something only they would know',
      ],
      correct: 2,
      explanation:
        "AI voice cloning (deepfake audio) requires as little as 30 seconds of audio - easily harvested from social media - to generate a convincing replica of any voice. In 2024, a Kerala businessman lost ₹40,000 after receiving a deepfake call mimicking a family member. Option D is close but still risky - a scammer may have scraped personal data from social media to answer security questions. The safest action is always to terminate and call back on a known, saved number.",
      points: 25,
    },
    {
      id: 7,
      question:
        "After filing an ITR, you call a number you found via a Google search for 'Income Tax refund helpline' and the agent asks for your PAN, date of birth, and net banking credentials to 'process the refund directly.' What is wrong here?",
      options: [
        'Nothing - sharing credentials with the tax department is standard for refund processing',
        "The agent should have asked for your Aadhaar, not PAN, for refund verification",
        "Google search results can surface fake helpline numbers. The IT Department processes refunds automatically to your pre-validated bank account - no credentials or calls are needed",
        'You should only share this information if the call comes from a 1800 toll-free number',
      ],
      correct: 2,
      explanation:
        "Fraudsters buy Google Ads and use SEO to push fake helpline numbers to the top of search results - a practice known as 'search engine poisoning'. The Income Tax Department credits refunds directly to the bank account linked to your PAN via the pre-validated process on incometax.gov.in. No agent from the IT Department will ever call you asking for net banking credentials, OTPs, or passwords.",
      points: 20,
    },
    {
      id: 8,
      question:
        "Your friend tells you he made ₹80,000 in a month by investing in a stock trading group on WhatsApp, run by someone claiming to be a SEBI-certified advisor. He insists the returns are real because he could see profits in his 'portfolio dashboard' and even withdrew ₹5,000 once as proof. He asks if you want to join. What do you tell him?",
      options: [
        'Join - SEBI certification and a real withdrawal are solid proof of legitimacy',
        "Invest a small amount first to personally test the platform's credibility",
        "This is almost certainly an investment scam. The fake dashboard and one small withdrawal are deliberate trust-building tactics before a large 'investment' is demanded and stolen",
        'Ask to see the advisor\'s SEBI registration number and verify on sebi.gov.in before deciding',
      ],
      correct: 2,
      explanation:
        "Investment scams were the single largest category of cybercrime in India in 2025, accounting for 76% of total financial losses per I4C data. The visible 'profits' are shown on a fake dashboard the scammers control, and one small withdrawal is a classic bait tactic. SEBI registration can be faked too - real SEBI advisors don't operate through WhatsApp groups. Option D sounds sensible but is still risky because once you are in contact, psychological manipulation begins. The right answer is to recognize and warn your friend about the pattern.",
      points: 25,
    },
  ]

  const maxScore = questions.reduce((acc, curr) => acc + curr.points, 0)

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
    const percentage = (score / maxScore) * 100
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
      <div className={styles.gamePage}>
        <div className={styles.ambientLight} />
        <div className={styles.gridOverlay} />
        <div className={styles.resultContainer}>
          <h2>
            <Award className={styles.icon} /> Game Complete!
          </h2>
          <div className={styles.scoreDisplay}>
            <div className={styles.finalScore}>
              <span className={styles.scoreLabel}>Your Score:</span>
              <span className={styles.scoreValue}>{score} / {maxScore}</span>
            </div>
            <div className={styles.scorePercentage}>
              {((score / maxScore) * 100).toFixed(1)}%
            </div>
          </div>

          <div className={styles.resultMessage}>{getScoreMessage()}</div>

          <div className={styles.resultActions}>
            <button
              onClick={() => navigate('/phishing-game')}
              className={styles.playAgainButton}
              style={{ background: '#ef4444', color: 'white', border: 'none' }}
            >
              <ShieldAlert className={styles.icon} /> Spot them in the wild
            </button>
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