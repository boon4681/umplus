const { Admin } = require('../../../../controllers/transaction.controller')
const { useTransactionValidator } = require('../../../../middlewares/transaction.middleware')

const { last30minute, last7day, gettransaction } = require('../../../../controllers/transaction.controller').Admin

const router = require('express').Router()

router.post('/last30minute', last30minute)
router.post('/last7day', last7day)
router.post('/history', gettransaction)
router.post('/dummy_transaction', useTransactionValidator, Admin.dummyTransaction)

module.exports = router