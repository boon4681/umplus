import { Response, NextFunction } from "express"

const { TransactionValidator } = require("../validators/transaction.validator")

const useTransactionValidator = async (req: any, res: Response, next: NextFunction) => {
    if (!req.isJson) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request'
        })
    }
    const { sender_id, receiver_id, type, info, amount } = req.body
    if (await TransactionValidator.isValid({ sender_id, receiver_id, type, info, amount })) {
        return next()
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
}

export { useTransactionValidator }