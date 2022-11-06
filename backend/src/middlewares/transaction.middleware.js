const { TransactionValidator } = require("../validators/transaction.validator")


const useTransactionValidator = async (req, res, next) => {
    if (!req.isJson) return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
    const { sender_id, receiver_id, info, amount } = req.body
    if (sender_id, receiver_id, info, amount) {
        if (await TransactionValidator.isValid({ sender_id, receiver_id, info, amount })) {
            return next()
        }
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
}

module.exports = { useTransactionValidator }