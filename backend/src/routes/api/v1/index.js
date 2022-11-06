const { useJson } = require('../../../middlewares/useJson.middleware')

const router = require('express').Router()

router.use('/admin', useJson, require('./admin'))
router.use('/user', useJson, require('./user'))

module.exports = router