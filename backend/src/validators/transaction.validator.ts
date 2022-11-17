import * as yup from 'yup'

const TransactionValidator = yup.object().shape({
    sender_id: yup.string().length(5).matches(/\d+/).required(),
    receiver_id: yup.string().length(5).matches(/\d+/).required(),
    type: yup.string().required(),
    info: yup.string().required(),
    amount: yup.number().min(1).required()
})

export { TransactionValidator }