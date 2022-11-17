const { UserLogin } = require('../../../controllers/auth.controller')

const router = require('express').Router()

router.post('/login', UserLogin)

export default router