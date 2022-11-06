const { User } = require('../../../../controllers/user.controller')
const { useUserAuth } = require('../../../../middlewares/auth.middleware')
const { useJson } = require('../../../../middlewares/useJson.middleware')

const router = require('express').Router()

router.use('/auth', useJson, require('./auth'))
router.use('/@me', useJson, User.me)

module.exports = router