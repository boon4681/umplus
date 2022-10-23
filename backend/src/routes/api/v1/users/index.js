const { useAdminAuth } = require('../../../../middlewares/auth.middleware')
const { useJson } = require('../../../../middlewares/useJson.middleware')

const router = require('express').Router()

router.use('/auth', require('./admin'))
router.use('/transaction', useAdminAuth, require('./transaction'))

module.exports = router