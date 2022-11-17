const { user_get_transaction, add_money, with_draw } = require('../../../../controllers/transaction.controller').User

const router = require('express').Router()

router.post('/history', user_get_transaction)
router.post('/add_money', add_money)
router.post('/with_draw', with_draw)

module.exports = router