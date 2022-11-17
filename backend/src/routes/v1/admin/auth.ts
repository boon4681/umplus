const { AdminLogin } = require('../../../controllers/auth.controller')

const router = require('express').Router()

router.post('/login', AdminLogin)

export default router