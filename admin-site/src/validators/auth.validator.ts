import * as yup from 'yup'

export const AdminLoginValidator = yup.object().shape({
    user: yup.string().required("กรุณาใส่ username"),
    password: yup.string().required("กรุณาใส่ password"),
})

export const UserRegisterValidator = yup.object().shape({
    user_id: yup.string().length(5).matches(/\d+/).required("user_id"),
    username: yup.string().required("username"),
    email: yup.string().email().required("email"),
    password: yup.string().length(13).matches(/\d+/).required('password'),
    budget: yup.number().required('budget')
})