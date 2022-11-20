import { Request, Response, NextFunction } from "express"
import { PrismaClient, TXStatus } from "@prisma/client"
const prisma = new PrismaClient()

export async function create(req: Request, res: Response, next: NextFunction) {
    const { sender_id, receiver_id, info, amount } = req.body
    const sender = await prisma.transaction.create({
        data: {
            status: 'PROCESS',
            type: 'SEND',
            info,
            sender_id,
            receiver_id,
            amount
        }
    })
    try {
        const result = await prisma.$transaction(async (tx) => {
            const sender = await tx.user.findUnique({
                where: {
                    user_id: sender_id
                }
            })
            const receiver = await tx.user.findUnique({
                where: {
                    user_id: receiver_id
                }
            })
            if (!sender || !receiver) {
                throw new Error('FAILED')
            }
            const user_sender = await tx.user.update({
                where: {
                    user_id: sender_id
                },
                data: {
                    balance: {
                        decrement: amount
                    },
                    expense:{
                        increment: amount
                    }
                }
            })
            if (user_sender.balance < 0) {
                throw new Error('TX_NOT_ENOUGH_MONEY')
            }
            const receive = await prisma.transaction.create({
                data: {
                    status: 'PROCESS',
                    type: 'RECEIVE',
                    info,
                    sender_id,
                    receiver_id,
                    amount
                }
            })
            await tx.user.update({
                where: {
                    user_id: receiver_id
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            })
            await prisma.transaction.update({
                where: {
                    transaction_id: receive.transaction_id
                },
                data: {
                    status: 'SUCCESS'
                }
            })
            return 'SUCCESS'
        }) as TXStatus
        await prisma.transaction.update({
            where: {
                transaction_id: sender.transaction_id
            },
            data: {
                status: result
            }
        })
        return res.status(200).json({
            code: 200,
            message: 'done'
        })
    } catch (error: any) {
        await prisma.transaction.update({
            where: {
                transaction_id: sender.transaction_id
            },
            data: {
                status: error.message
            }
        })
        return res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}