import * as yup from 'yup'

const AdminLoginValidator = yup.object().shape({
    user: yup.string().required(),
    password: yup.string().required()
})

const UserLoginValidator = yup.object().shape({
    user_id: yup.string().length(5).matches(/\d+/).required(),
    password: yup.string().length(8).matches(/\d+/).required()
})

const UserRegisterValidator = yup.object().shape({
    account_type: yup.string().required(),
    user_id: yup.string().min(5).matches(/\d+/).required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().length(10).required(),
    password: yup.string().min(8).matches(/\d+/).required(),
    balance: yup.number().required()
})

export { AdminLoginValidator, UserLoginValidator, UserRegisterValidator }