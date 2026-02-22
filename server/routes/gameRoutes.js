const express = require('express')
const { startGameSession, submitAnswer, finishGameSession } = require('../controllers/gameController')

const router = express.Router()

router.post('/start', startGameSession)
router.post('/submit', submitAnswer)
router.post('/finish', finishGameSession)

module.exports = router
