const { user_get_transaction } = require('../../../../controllers/transaction.controller').User

const router = require('express').Router()

router.post('/history',user_get_transaction)

module.exports = router