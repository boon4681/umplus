const { last30minute, last7day, gettransaction } = require('../../../../controllers/transaction.controller')

const router = require('express').Router()

router.post('/last30minute', last30minute)
router.post('/last7day', last7day)
router.post('/history', gettransaction)

module.exports = router