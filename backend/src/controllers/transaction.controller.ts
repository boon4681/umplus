import { Request, Response } from "express";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
import { a_minute, a_day } from "../utils/time"

const Admin: any = {
    last30minute: async (req: Request, res: Response) => {
        const data = await prisma.transaction.findMany({
            where: {
                timestamp: {
                    gte: new Date(Date.now() - (a_minute * 30)).toISOString()
                }
            }
        })

        return res.json(data)
    },
    last7day: async (req: Request, res: Response) => {
        return res.json(
            await prisma.transaction.findMany({
                where: {
                    timestamp: {
                        gte: new Date(Date.now() - (a_day * 7)).toISOString()
                    }
                }
            })
        )
    },
    gettransaction: async (req: Request, res: Response) => {
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
                    receive: true,
                    send: true
                },
                take: take ? take : 5,
                skip: skip ? skip : 0
            })
        )
    },
    getsend: async (req: Request, res: Response) => {
        const { timestamp, skip } = req.body
        return res.json(
            await prisma.send.findMany({
                where: {
                    timestamp: {
                        lte: new Date(timestamp ? new Date(timestamp) : Date.now()).toISOString(),
                    }
                },
                take: 5,
                skip: skip ? skip : 0
            })
        )
    },
    getreceive: async (req: Request, res: Response) => {
        const { timestamp, skip } = req.body
        return res.json(
            await prisma.receive.findMany({
                where: {
                    timestamp: {
                        lte: new Date(timestamp ? new Date(timestamp) : Date.now()).toISOString(),
                    }
                },
                take: 5,
                skip: skip ? skip : 0
            })
        )
    },
    dummyTransaction: async (req: Request, res: Response) => {
        const { sender_id, receiver_id, info, amount } = req.body;
        const is_exist = await prisma.user.findMany({
            where: {
                user_id: {
                    in: [sender_id, receiver_id]
                }
            }
        })
        if (is_exist[0] && is_exist[1]) {
            if (is_exist[0].budget > amount) {
                const send_ts = await prisma.transaction.create({
                    data: {
                        user_id: sender_id,
                        status: "complete"
                    }
                })
                const send = await prisma.send.create({
                    data: {
                        sender_id,
                        receiver_id,
                        info,
                        amount,
                        transaction_id: send_ts.transaction_id
                    }
                })


                const receive_ts = await prisma.transaction.create({
                    data: {
                        user_id: receiver_id,
                        status: "complete"
                    }
                })
                const receive = await prisma.receive.create({
                    data: {
                        sender_id,
                        receiver_id,
                        info,
                        amount,
                        transaction_id: receive_ts.transaction_id
                    }
                })


                const update_sender = await prisma.user.update({
                    where: {
                        user_id: parseInt(sender_id)
                    },
                    data: {
                        budget: { increment: -(parseInt(amount)) }
                    }
                })
                const update_receiver = await prisma.user.update({
                    where: {
                        user_id: parseInt(receiver_id)
                    },
                    data: {
                        budget: { increment: (parseInt(amount)) }
                    }
                })
            } else {
                return res.status(400).json({
                    code: 400,
                    message: 'Fail to create transaction'
                })
            }
        } else {
            return res.status(400).json({
                code: 400,
                message: 'Fail to create transaction'
            })
        }
        return res.status(200).json({
            code: 200,
            message: "done"
        })
    },
}

const User = {
    user_send: async (req: Request, res: Response) => {
        const { sender_id, receiver_id, info, amount } = req.body;
        const is_exist = await prisma.user.findMany({
            where: {
                user_id: {
                    in: [sender_id, receiver_id]
                }
            }
        })

        if (is_exist[0] && is_exist[1]) {
            if (is_exist[0].budget > amount) {
                const send_ts = await prisma.transaction.create({
                    data: {
                        user_id: sender_id,
                        status: "complete"
                    }
                })
                const send = await prisma.send.create({
                    data: {
                        sender_id,
                        receiver_id,
                        info,
                        amount,
                        transaction_id: send_ts.transaction_id
                    }
                })


                const receive_ts = await prisma.transaction.create({
                    data: {
                        user_id: receiver_id,
                        status: "complete"
                    }
                })
                const receive = await prisma.receive.create({
                    data: {
                        sender_id,
                        receiver_id,
                        info,
                        amount,
                        transaction_id: receive_ts.transaction_id
                    }
                })


                const update_sender = await prisma.user.update({
                    where: {
                        user_id: parseInt(sender_id)
                    },
                    data: {
                        budget: { increment: -(parseInt(amount)) }
                    }
                })
                const update_receiver = await prisma.user.update({
                    where: {
                        user_id: parseInt(receiver_id)
                    },
                    data: {
                        budget: { increment: (parseInt(amount)) }
                    }
                })
            } else {
                return res.status(400).json({
                    code: 400,
                    message: 'Fail to create transaction'
                })
            }
        } else {
            return res.status(400).json({
                code: 400,
                message: 'Fail to create transaction'
            })
        }
        return res.status(200).json({
            code: 200,
            message: "done"
        })
    },
    add_money: async (req: any, res: Response) => {
        const { amount } = req.body
        if (typeof amount == 'number') {
            const receive_ts = await prisma.transaction.create({
                data: {
                    user_id: req.jwt.data.user_id,
                    status: "complete"
                }
            })
            const receive = await prisma.receive.create({
                data: {
                    sender_id: 9999999,
                    receiver_id: req.jwt.data.user_id,
                    info: "ของฝากจาก admin (เติมตัง)",
                    amount,
                    transaction_id: receive_ts.transaction_id
                }
            })
            await prisma.user.update({
                where: {
                    user_id: req.jwt.data.user_id
                },
                data: {
                    budget: { increment: amount }
                }
            })
            return res.status(200).json({
                code: 200,
                message: "done"
            })
        } else {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request'
            })
        }
    },
    with_draw: async (req: any, res: Response) => {
        const { amount, account } = req.body
        if (typeof amount == 'number' && typeof account == 'number') {
            const send_ts = await prisma.transaction.create({
                data: {
                    user_id: req.jwt.data.user_id,
                    status: "complete"
                }
            })
            const send = await prisma.send.create({
                data: {
                    sender_id: req.jwt.data.user_id,
                    receiver_id:account,
                    info:"ถอนเงินเข้ากระเป๋า admin",
                    amount,
                    transaction_id: send_ts.transaction_id
                }
            })
            await prisma.user.update({
                where: {
                    user_id: req.jwt.data.user_id
                },
                data: {
                    budget: { increment: -amount }
                }
            })
            return res.status(200).json({
                code: 200,
                message: "done"
            })
        } else {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request'
            })
        }
    },
    user_get_transaction: async (req: any, res: Response) => {
        const { timestamp, skip } = req.body
        return res.json(
            await prisma.transaction.findMany({
                where: {
                    user_id: req.jwt.data.user_id,
                    timestamp: {
                        lte: new Date(timestamp ? new Date(timestamp) : Date.now()).toISOString(),
                    }
                },
                orderBy: {
                    'transaction_id': 'desc',
                },
                take: 10,
                skip: skip ? skip : 0,
                include: {
                    receive: true,
                    send: true
                }
            })
        )
    }
}

export {
    Admin,
    User
}