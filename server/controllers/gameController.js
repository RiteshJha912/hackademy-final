const User = require('../models/User')
const GameSession = require('../models/GameSession')
const questionData = require('../data/questions')

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const startGameSession = async (req, res) => {
  try {
    const { username, gameType } = req.body;
    
    if (!username || !gameType || !questionData[gameType]) {
      return res.status(400).json({ success: false, message: 'Invalid start payload' })
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const originalQuestions = JSON.parse(JSON.stringify(questionData[gameType]))
    
    const preparedQuestions = originalQuestions.map((q) => {
      let baseTime = 90; 
      if (q.difficulty === 'medium') baseTime = 120;
      if (q.difficulty === 'hard') baseTime = 150;
      
      if (q.question.length > 200) baseTime += 20;
      const timeLimit = Math.min(baseTime, 180);
      let shuffledOptions = shuffle([...q.options]);

      return {
        id: q.id,
        question: q.question,
        options: shuffledOptions,
        points: q.points,
        difficulty: q.difficulty,
        timeLimit: timeLimit,
      }
    });

    const shuffledQuestions = shuffle(preparedQuestions).slice(0, 5); // Take 5 per session for typical gameplay

    const session = await GameSession.create({
      userId: user._id,
      gameType,
      questions: shuffledQuestions, // store the ordered prepared list here.
      status: 'active'
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: session._id,
        questions: shuffledQuestions,
        totalQuestions: shuffledQuestions.length
      }
    });

  } catch(e) {
    console.error(e)
    res.status(500).json({ success: false, message: 'Server error starting game' })
  }
}

const submitAnswer = async (req, res) => {
  try {
    const { sessionId, questionId, selectedOption, timeTaken } = req.body;

    if (!sessionId || !questionId) {
      return res.status(400).json({ success: false, message: 'Invalid payload' })
    }

    const session = await GameSession.findById(sessionId);
    if (!session || session.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Session invalid or already closed' })
    }

    // Check if already answered
    if (session.history.some(h => h.questionId === questionId)) {
      return res.status(400).json({ success: false, message: 'Question already answered' })
    }

    const masterQuestions = questionData[session.gameType];
    const qBase = masterQuestions.find(mq => mq.id === questionId);
    if (!qBase) {
      return res.status(400).json({ success: false, message: 'Question not found' })
    }

    const isCorrect = selectedOption === qBase.options[qBase.correct];
    const timeUsed = isNaN(timeTaken) ? 0 : Number(timeTaken);

    let earned = 0;
    let bonus = 0;
    let timeBonus = 0;

    if (isCorrect) {
      earned = qBase.points;
      
      if (qBase.difficulty === 'medium') earned = Math.floor(earned * 1.2);
      if (qBase.difficulty === 'hard') earned = Math.floor(earned * 1.5);

      let baseTime = 90;
      if (qBase.difficulty === 'medium') baseTime = 120;
      if (qBase.difficulty === 'hard') baseTime = 150;
      
      let timeLeft = Math.max(0, baseTime - timeUsed);
      timeBonus = Math.floor((timeLeft / baseTime) * (earned * 0.5));
      
      session.streak += 1;
      if (session.streak > session.longestStreak) {
        session.longestStreak = session.streak;
      }

      const streakBonusCapped = Math.min((session.streak - 1) * 0.1, 0.3);
      bonus = Math.floor(earned * streakBonusCapped);
      
      session.correctAnswers += 1;
    } else {
      session.streak = 0;
      session.incorrectAnswers += 1;
    }

    const finalPoints = earned + timeBonus + bonus;

    session.score += finalPoints;
    session.totalAttempted += 1;
    session.totalDuration += timeUsed;

    session.history.push({
      questionId,
      selectedOption,
      isCorrect,
      pointsEarned: finalPoints,
      timeTaken: timeUsed
    });

    await session.save();

    res.status(200).json({
      success: true,
      data: {
        isCorrect,
        pointsEarned: finalPoints,
        explanation: qBase.explanation,
        correctOption: qBase.options[qBase.correct],
        streak: session.streak,
        basePoints: earned,
        timeBonus,
        streakBonus: bonus
      }
    });

  } catch (error) {
    console.error("Submit Answer Error", error);
    res.status(500).json({ success: false, message: 'Server error processing answer' })
  }
}

const finishGameSession = async (req, res) => {
  try {
    const { sessionId, isQuit } = req.body;

    const session = await GameSession.findById(sessionId).populate('userId');
    if (!session || session.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Session invalid or already closed' })
    }

    session.status = isQuit ? 'quit' : 'completed';
    await session.save();

    const user = session.userId; // Thanks to populate
    
    // Only process stats and scores if the user successfully completed the game
    if (!isQuit) {
       user.gamesPlayed += 1; 
       user.totalQuestionsAttempted += session.totalAttempted;
       user.correctAnswers += session.correctAnswers;
       user.incorrectAnswers += session.incorrectAnswers;
       user.totalResponseTime += session.totalDuration;
       user.totalQuizDuration += session.totalDuration;

       if (session.longestStreak > user.longestStreak) {
         user.longestStreak = session.longestStreak;
       }

       // Core Rule: Only one final max score per game type counts
       const gameId = session.gameType; // 'mcq', 'phishing', or 'linkDecoder'
       if (user.bestScores && user.bestScores[gameId] !== undefined) {
          if (session.score > user.bestScores[gameId]) {
             user.bestScores[gameId] = session.score;
          }
       }

       // Recalculate total global score based purely on individual bests
       user.score = (user.bestScores.mcq || 0) + 
                    (user.bestScores.phishing || 0) + 
                    (user.bestScores.linkDecoder || 0);

       user.lastPlayed = new Date();
       await user.save();
    }

    res.status(200).json({
      success: true,
      sessionResults: {
        scoreEarned: session.score,
        correct: session.correctAnswers,
        incorrect: session.incorrectAnswers,
        longestStreak: session.longestStreak,
        totalTime: session.totalDuration,
        status: session.status
      }
    });

  } catch (error) {
    console.error("Finish error", error);
    res.status(500).json({ success: false, message: 'Server error finishing game' })
  }
}

module.exports = {
  startGameSession,
  submitAnswer,
  finishGameSession
}
