const { useAdminAuth } = require('../../../middlewares/auth.middleware')
const { useJson } = require('../../../middlewares/useJson.middleware')

const router = require('express').Router()

router.use('/admin', useJson, require('./admin'))

module.exports = router