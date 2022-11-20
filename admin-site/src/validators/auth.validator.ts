import * as yup from 'yup'

export const AdminLoginValidator = yup.object().shape({
    user: yup.string().required("กรุณาใส่ username"),
    password: yup.string().required("กรุณาใส่ password"),
})

export const UserRegisterValidator = yup.object().shape({
    account_type: yup.string().required(),
    user_id: yup.string().min(5).matches(/\d+/).required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().length(10).required(),
    password: yup.string().min(8).matches(/\d+/).required(),
    balance: yup.number().required()
})

export const UserUpdateValidator = yup.object().shape({
    account_type: yup.string().required(),
    user_id: yup.string().min(5).matches(/\d+/).required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().length(10).required(),
    balance: yup.number().required()
})
