import * as yup from 'yup'

const AdminLoginValidator = yup.object().shape({
    user: yup.string().required(),
    password: yup.string().required()
})

const UserLoginValidator = yup.object().shape({
    user_id: yup.string().length(5).matches(/\d+/).required(),
    password: yup.string().length(13).matches(/\d+/).required()
})

const UserRegisterValidator = yup.object().shape({
    user_id: yup.string().length(5).matches(/\d+/).required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().length(13).matches(/\d+/).required(),
    budget: yup.number().required()
})

export { AdminLoginValidator, UserLoginValidator, UserRegisterValidator }