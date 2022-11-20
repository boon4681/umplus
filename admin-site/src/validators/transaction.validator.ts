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
    amount: yup.number().min(0).required()
})

// {transaction_id: 8, sender_id: "13737", receiver_id: "32396", type: "RECEIVE", status: "FAILED",…}