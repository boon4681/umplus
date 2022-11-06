const { UserLogin } = require('../../../../controllers/auth.controller')

const router = require('express').Router()

router.post('/login', UserLogin)

module.exports = router