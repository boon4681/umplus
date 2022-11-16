const { User } = require('../../../../controllers/user.controller')
const { useUserAuth } = require('../../../../middlewares/auth.middleware')
const { useJson } = require('../../../../middlewares/useJson.middleware')

const router = require('express').Router()

router.use('/auth', require('./auth'))
router.post('/@me', useUserAuth, User.me)
router.use('/transaction', useUserAuth, require('./transction'))

module.exports = router 