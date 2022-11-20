import { Router } from "express"
import { useAdminAuth, useUserAuth } from "../../middlewares/auth.middleware"
import { a_day, a_minute } from "../../utils/time"
import { useTransactionValidator } from "../../middlewares/transaction.middleware"
import { create } from "../../controllers/transaction"
import { UserLoginValidator } from "../../validators/auth.validator"
import { bwt } from "../../modules/jwt.module"
import { bhash } from "../../modules/hash.module"
import { Database } from "../../database/data.source"
const prisma = Database
const router = Router()

router.post('/auth/login', async (req, res, next) => {
    const auth = req.get('Authorization')
    if (auth && auth.includes('Bearer ')) {
        const b = bwt.decode(auth.slice(7))
        if (b && b.data.user_id) {
            const data = await prisma.user.findUnique({
                where: {
                    user_id: b.data.user_id
                }
            })
            if (data!.user_id == b.data.user_id) {
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
    if (user_id && password) {
        if (await UserLoginValidator.isValid({ user_id, password })) {
            const data = await prisma.user.findUnique({
                where: {
                    user_id: user_id
                },
                select: {
                    user_id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    phone_number: true,
                    balance: true,
                    expense: true,
                    setting: true,
                    password: true
                }
            })
            if (data && bhash.validate(password, Buffer.from(data.password, 'base64').toString())) {
                const user = {
                    ...data,
                    "password": undefined
                }
                // //@ts-ignore
                // // delete user.password
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
})

router.post('/@me', useUserAuth, async (req: any, res, next) => {
    return res.status(200).json(
        await prisma.user.findUnique({
            where: {
                user_id: req.jwt.data.user_id
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
    )
})

router.post('/topup', useUserAuth, async (req, res, next) => {

})

router.post('/withdraw', useUserAuth, async (req, res, next) => {

})

router.post('/transaction/create', useUserAuth, useTransactionValidator, create)

router.post('/transaction/history', useUserAuth, async (req: any, res, next) => {
    const { timestamp, skip, take } = req.body
    return res.json(
        await prisma.transaction.findMany({
            where: {
                timestamp: {
                    lte: new Date(timestamp ? new Date(timestamp) : Date.now()).toISOString(),
                },
                OR: [
                    {
                        sender_id: req.jwt.data.user_id,
                        type:'SEND'
                    },
                    {
                        receiver_id: req.jwt.data.user_id,
                        type:{
                            not:'SEND'
                        }
                    }
                ]
            },
            orderBy: {
                transaction_id: 'desc',
            },
            take: take ? take : 5,
            skip: skip ? skip : 0
        })
    )
})

export default router