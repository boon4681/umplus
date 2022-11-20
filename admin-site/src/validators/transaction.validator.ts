import * as yup from 'yup'

export const TransactionValidator = yup.object().shape({
    sender_id: yup.string().length(5).matches(/\d+/).required(),
    receiver_id: yup.string().length(5).matches(/\d+/).required(),
    info: yup.string().required(),
    amount: yup.number().min(1).required()
})

export const TransactionResValidator = yup.object().shape({
    date: yup.string().required(),
    transaction_id: yup.number().required(),
    firstname: yup.string().required(),
    status: yup.string().required(),
    amount: yup.number().min(1).required()
})

export const TopupMoneyValidator = yup.object().shape({
    amount: yup.number().min(1).required()
})