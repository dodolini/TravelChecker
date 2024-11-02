const express = require('express')
const router = express.Router()
const cors = require('cors')
const { registerUser, loginUser, getProfile, addVisitedCountry, getUserCountries, addCountriesToVisit } = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/visitedCountry', addVisitedCountry)
router.post('/countriesToVisit', addCountriesToVisit)
router.get('/userCountries', getUserCountries)

module.exports = router