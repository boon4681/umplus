import { Router } from "express"
import { useAdminAuth } from "../../middlewares/auth.middleware"
import { bhash } from "../../modules/hash.module"
import { bwt } from "../../modules/jwt.module"
import { AdminLoginValidator, UserRegisterValidator } from "../../validators/auth.validator"
const { useTransactionValidator } = require('../../middlewares/transaction.middleware')
import { a_day, a_minute } from "../../utils/time"
import { create } from "../../controllers/transaction"
import { Database } from "../../database/data.source"
const prisma = Database


const router = Router()

router.post('/auth/login', async (req, res, next) => {
    const Authorization = req.get('Authorization')
    if (Authorization) {
        if (Authorization.includes('Bearer ')) {
            const b = bwt.decode(Authorization.slice(7))
            if (b && b.data.user) {
                if (b.data.user === 'banana') {
                    return res.json({
                        code: 200,
                        data: {
                            user: {
                                firstname: b.data.user
                            }
                        }
                    })
                }
            }
        }
    }
    const { user, password } = req.body
    if (user && password) {
        if (await AdminLoginValidator.isValid({ user, password })) {
            if (user === 'banana' && password === 'pythonpythan') {
                const token = bwt.encode({ user, firstname: user })
                return res.status(200).json({
                    code: 200,
                    data: {
                        user: {
                            firstname: user
                        },
                        token: token
                    }
                })
            }
        } else {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized Username or Password is incorrect'
            })
        }
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
})

router.delete('/account', useAdminAuth, async (req, res, next) => {
    const { user_id } = req.body
    try {
        await prisma.user.delete({
            where: {
                user_id: user_id
            }
        })
        return res.status(200).json({
            code: 200,
            message: "done"
        })
    } catch (error) { }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
})

router.post('/account/create', useAdminAuth, async (req, res, next) => {
    const { account_type, user_id, firstname, lastname, email, phone_number, password, balance } = req.body
    if (await UserRegisterValidator.isValid({ account_type, user_id, firstname, lastname, email, phone_number, password, balance })) {
        const check = await prisma.user.findUnique({
            where: {
                user_id: user_id
            }
        })
        if (!check) {
            try {
                await prisma.user.create({
                    data: {
                        account_type,
                        user_id,
                        firstname,
                        lastname,
                        email,
                        phone_number,
                        password: Buffer.from(bhash.hash(password)).toString('base64'),
                        balance,
                        expense: 0,
                        setting: {}
                    }
                })
            } catch (error) {
                return res.status(400).json({
                    code: 400,
                    message: 'Bad Request'
                })
            }
            return res.status(200).json({
                code: 200,
                message: "done"
            })
        } else {
            return res.status(400).json({
                code: 400,
                message: 'This user_id is already created'
            })
        }
    } else {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request'
        })
    }
})

router.post('/account/users', useAdminAuth, async (req, res, next) => {
    const data = await prisma.user.findMany({
        select: {
            account_type: true,
            user_id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone_number: true,
            balance: true,
            expense: true,
            setting: true
        }
    })

    return res.status(200).json(
        data
    )
})

router.post('/account/users/:user_id', useAdminAuth, async (req, res, next) => {
    const { user_id } = req.params
    const data = await prisma.user.findUnique({
        where: {
            user_id
        },
        select: {
            account_type: true,
            user_id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone_number: true,
            balance: true,
            expense: true,
            setting: true
        }
    })

    return res.status(200).json(
        data
    )
})

router.post('/account/students', useAdminAuth, async (req, res, next) => {
    const data = await prisma.user.findMany({
        where: {
            account_type: 'STUDENT'
        },
        select: {
            user_id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone_number: true,
            balance: true,
            expense: true,
            setting: true
        }
    })

    return res.status(200).json(
        data
    )
})

router.post('/account/admins', useAdminAuth, async (req, res, next) => {
    const data = await prisma.user.findMany({
        where: {
            account_type: 'ADMIN'
        },
        select: {
            user_id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone_number: true,
            balance: true,
            expense: true,
            setting: true
        }
    })

    return res.status(200).json(
        data
    )
})

router.post('/account/merchants', useAdminAuth, async (req, res, next) => {
    const data = await prisma.user.findMany({
        where: {
            account_type: 'MERCHANT'
        },
        select: {
            user_id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone_number: true,
            balance: true,
            expense: true,
            setting: true
        }
    })

    return res.status(200).json(
        data
    )
})

router.post('/account/top_expensed', useAdminAuth, async (req, res, next) => {
    const data = await prisma.user.findMany({
        where: {
            account_type: 'STUDENT',
        },
        orderBy: {
            expense: 'desc'
        },
        take: 10
    })

    return res.status(200).json(
        data
    )
})

router.post('/transaction/create', useAdminAuth, useTransactionValidator, create)

router.post('/transaction/last30minute', useAdminAuth, async (req, res, next) => {
    return res.json(
        await prisma.transaction.findMany({
            where: {
                timestamp: {
                    gte: new Date(Date.now() - (a_minute * 30)).toISOString()
                }
            },
            select: {
                timestamp: true
            }
        })
    )
})

router.post('/transaction/last7day', useAdminAuth, async (req, res, next) => {
    return res.json(
        await prisma.transaction.findMany({
            where: {
                timestamp: {
                    gte: new Date(Date.now() - (a_day * 7)).toISOString()
                }
            },
            select: {
                timestamp: true
            }
        })
    )
})

router.post('/transaction/history', useAdminAuth, async (req, res, next) => {
    const { timestamp, skip, take } = req.body
    return res.json(
        await prisma.transaction.findMany({
            where: {
                timestamp: {
                    lte: new Date(timestamp ? new Date(timestamp) : Date.now()).toISOString(),
                }
            },
            orderBy: {
                transaction_id: 'desc',
            },
            include: {
                receiver: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                },
                sender: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                }
            },
            take: take ? take : 5,
            skip: skip ? skip : 0
        })
    )
})

export default router