import React, { useState } from 'react'
import { Shield, Play, Pause } from 'lucide-react'
import styles from '../styles/ArticlePage.module.css'

const DigitalArrestScamPage = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = React.useRef(null)

  const handleReadAloud = () => {
    if (isSpeaking) {
      // Pause speech
      window.speechSynthesis.pause()
      setIsSpeaking(false)
    } else {
      // If there's an ongoing utterance, resume it
      if (utteranceRef.current && window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
        setIsSpeaking(true)
        return
      }

      // Stop any ongoing speech
      window.speechSynthesis.cancel()

      // Collect all text content from the page
      const articleText = [
        document.querySelector(`.${styles.articleHero} h1`)?.textContent,
        document.querySelector(`.${styles.articleHero} p`)?.textContent,
        document.querySelector(`.${styles.whatIsIt} h2`)?.textContent,
        document.querySelector(`.${styles.whatIsIt} p`)?.textContent,
        document.querySelector(`.${styles.howItHappens} h2`)?.textContent,
        ...Array.from(
          document.querySelectorAll(`.${styles.howItHappens} li`)
        ).map((li) => li.textContent),
        document.querySelector(`.${styles.realWorldStories} h2`)?.textContent,
        document.querySelector(`.${styles.realWorldStories} p`)?.textContent,
        document.querySelector(`.${styles.stayProtected} h2`)?.textContent,
        ...Array.from(
          document.querySelectorAll(`.${styles.stayProtected} li`)
        ).map((li) => li.textContent),
      ]
        .filter((text) => text)
        .join('. ')

      // Create and configure speech synthesis
      const utterance = new SpeechSynthesisUtterance(articleText)
      utterance.lang = 'en-US'

      // Select a natural, non-robotic voice
      const voices = window.speechSynthesis.getVoices()
      const naturalVoice = voices.find(
        (voice) =>
          voice.name.includes('Google US English') ||
          voice.name.includes('Microsoft Zira') ||
          voice.name.includes('Natural') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Alex') ||
          voice.default
      )
      if (naturalVoice) {
        utterance.voice = naturalVoice
      }

      // Adjust pitch and rate for a warmer, less robotic tone
      utterance.volume = 1.0
      utterance.rate = 0.95 // Slightly slower for clarity
      utterance.pitch = 0.9 // Slightly lower pitch for warmth

      // Handle end of speech
      utterance.onend = () => {
        setIsSpeaking(false)
        utteranceRef.current = null
      }

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  // Ensure voices are loaded (some browsers load voices asynchronously)
  React.useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices()
    }
    window.speechSynthesis.onvoiceschanged = loadVoices
    loadVoices()
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  return (
    <div className={styles.articlePage}>
      <div className={styles.articleHero}>
        <Shield className={styles.articleIcon} />
        <h1>Digital Arrest Scam</h1>
        <p>Understanding and protecting yourself from digital arrest scams</p>
        <button
          className={styles.readAloudButton}
          onClick={handleReadAloud}
          aria-label={isSpeaking ? 'Pause reading' : 'Read page content aloud'}
        >
          {isSpeaking ? (
            <>
              <Pause className={styles.buttonIcon} /> Read Aloud  
            </>
          ) : (
            <>
              <Play className={styles.buttonIcon} /> Read Aloud
            </>
          )}
        </button>
      </div>

      <div className={styles.bentoGrid}>
        <section className={`${styles.bentoCard} ${styles.whatIsIt}`}>
          <h2>What is it?</h2>
          <p>
            A digital arrest scam is a sophisticated form of cybercrime where
            scammers impersonate law enforcement officials, threatening victims
            with immediate arrest unless they make payments or provide sensitive
            information.
          </p>
          <div className={styles.imageContainer}>
            <img
              src='/images/digitalarrest3.jpg'
              alt='Digital Arrest Scam Example'
              className={styles.bentoImage}
            />
          </div>
        </section>

        <section className={`${styles.bentoCard} ${styles.howItHappens}`}>
          <h2>How it happens</h2>
          <ul>
            <li>Fake emails claiming to be from law enforcement</li>
            <li>Threatening phone calls with spoofed police numbers</li>
            <li>Fraudulent arrest warrants sent via email</li>
            <li>Pop-up messages claiming illegal activity on your device</li>
          </ul>
        </section>

        <section className={`${styles.bentoCard} ${styles.realWorldStories}`}>
          <h2>Real world stories</h2>
          <div className={styles.imageContainer}>
            <img
              src='/images/digitalarrest2.png'
              alt='Digital Arrest Scam'
              className={styles.bentoImage}
            />
          </div>
          <p>
            In a recent case, Maharashtra Police arrested seven individuals
            involved in a massive 58 crore rupee digital arrest scam. The
            fraudsters pretended to be government officials and tricked a 72
            year-old businessman from Mumbai into transferring his life savings
            through fake video court sessions and police interrogations.
            Authorities found that over 6,500 fake bank accounts were used to
            move the stolen money across multiple layers.
          </p>
        </section>

        <section className={`${styles.bentoCard} ${styles.stayProtected}`}>
          <h2>If you were scammed</h2>
          <ul>
            <li>
              Never send money to unknown parties claiming to be law enforcement
            </li>
            <li>Verify all official communication through proper channels</li>
            <li>Don't click on suspicious links in emails or messages</li>
            <li>Report suspicious activity to your local authorities</li>
            <li>
              Keep your devices and software updated with the latest security
              patches
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default DigitalArrestScamPage
