const { AdminLoginValidator, UserLoginValidator } = require("../validators/auth.validator")
const { bwt } = require('../modules/jwt.module')
const { bhash } = require('../modules/hash.module')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const AdminLogin = async (req, res) => {
    const auth = req.get('Authorization')
    if (auth && auth.includes('Bearer ') && (p = auth.indexOf('Bearer ')) === 0) {
        const b = bwt.decode(auth.slice(p + 7))
        if (b && b.data.user) {
            if (b.data.user === process.env.ADMIN_USER) {
                return res.json({
                    code: 200, data: {
                        user: {
                            name: b.data.user
                        }
                    }
                })
            }
        }
    }
    const { user, password } = req.body
    if (user, password) {
        if (await AdminLoginValidator.isValid({ user, password })) {
            if (process.env.ADMIN_USER === user && process.env.ADMIN_PASSWORD === password) {
                const token = bwt.encode({ user: user, name: user })
                return res.status(200).json({
                    code: 200,
                    data: {
                        user: {
                            name: user
                        },
                        token: token
                    }
                });
            } else {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorized Username or Password is incorrect'
                })
            }
        }
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
}

const UserLogin = async (req, res) => {
    const auth = req.get('Authorization')
    if (auth && auth.includes('Bearer ') && (p = auth.indexOf('Bearer ')) === 0) {
        const b = bwt.decode(auth.slice(p + 7))
        if (b && b.data.user_id) {
            const data = await prisma.user.findUnique({
                where: {
                    user_id: b.data.user_id
                }
            })
            if (data.user_id == b.data.user_id) {
                return res.json({
                    code: 200,
                    data: {
                        user: b.data
                    }
                })
            }
        }
    }
    const { user_id, password } = req.body
    if (user_id, password) {
        if (await UserLoginValidator.isValid({ user_id, password })) {
            const data = await prisma.user.findUnique({
                where: {
                    user_id: user_id
                }
            })
            if (data && bhash.validate(password, data.password)) {
                const user = {
                    username: data.username,
                    user_id: data.user_id,
                    email: data.email,
                    setting: data.setting
                }
                const token = bwt.encode(user)
                return res.status(200).json({
                    user,
                    token
                })
            } else {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorized Username or Password is incorrect'
                })
            }
        }
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
}
module.exports = {
    AdminLogin, UserLogin
}