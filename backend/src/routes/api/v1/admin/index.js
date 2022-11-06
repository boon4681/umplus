const { DummyRegister } = require('../../../../controllers/auth.controller')
const { Admin } = require('../../../../controllers/user.controller')
const { useAdminAuth } = require('../../../../middlewares/auth.middleware')

const router = require('express').Router()

router.use('/auth', require('./auth'))
router.post('/dummy', useAdminAuth, DummyRegister)
router.post('/all_user', useAdminAuth, Admin.getAllUser)
router.use('/transaction', useAdminAuth, require('./transaction'))

module.exports = router