import * as yup from 'yup'

export const AdminLoginValidator = yup.object().shape({
    user: yup.string().required("กรุณาใส่ username"),
    password: yup.string().required("กรุณาใส่ password"),
})