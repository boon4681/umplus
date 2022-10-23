const yup = require('yup')

const AdminLoginValidator = yup.object().shape({
    user: yup.string().required(),
    password: yup.string().required()
})

const UserLoginValidator = yup.object().shape({
    user_id: yup.string().length(6).required(),
    password: yup.string().length(13).matches(/\d+/).required()
})

module.exports = { AdminLoginValidator, UserLoginValidator }