import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
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
    const receiver = await prisma.transaction.create({
        data: {
            status: 'PROCESS',
            type: 'RECEIVE',
            info,
            sender_id,
            receiver_id,
            amount
        }
    })
    try {
        const result = await prisma.$transaction(async (tx) => {
            const [sender, receiver] = await tx.user.findMany({
                where: {
                    user_id: {
                        in: [sender_id, receiver_id]
                    }
                }
            })
            if (!sender || !receiver) {
                return 'FAILED'
            }
            await tx.user.update({
                where: {
                    user_id: sender_id
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            })
            if (sender.balance < 0) {
                return 'TX_NOT_ENOUGH_MONEY'
            }
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
            return 'SUCCESS'
        })
        await prisma.transaction.update({
            where: {
                transaction_id: sender.transaction_id
            },
            data: {
                status: result
            }
        })
        await prisma.transaction.update({
            where: {
                transaction_id: receiver.transaction_id
            },
            data: {
                status: result
            }
        })
    } catch (error) {
        await prisma.transaction.update({
            where: {
                transaction_id: sender.transaction_id
            },
            data: {
                status: 'FAILED'
            }
        })
        await prisma.transaction.update({
            where: {
                transaction_id: receiver.transaction_id
            },
            data: {
                status: 'FAILED'
            }
        })
    }
}