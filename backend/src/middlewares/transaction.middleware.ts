import { Response, NextFunction } from "express"

const { TransactionValidator } = require("../validators/transaction.validator")

const useTransactionValidator = async (req: any, res: Response, next: NextFunction) => {
    if (!req.isJson) return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
    const { sender_id, receiver_id, info, amount } = req.body
    if (sender_id && receiver_id && info && amount) {
        if (await TransactionValidator.isValid({ sender_id, receiver_id, info, amount })) {
            req.body.sender_id = parseInt(sender_id)
            req.body.receiver_id = parseInt(receiver_id)
            return next()
        }
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
}

export = { useTransactionValidator }