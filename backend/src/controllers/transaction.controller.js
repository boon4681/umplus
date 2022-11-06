const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { a_minute, a_day } = require('../utils/time')

const Admin = {
    last30minute: async (req, res) => {
        return res.json(
            await prisma.transaction.findMany({
                where: {
                    timestamp: {
                        gte: new Date(Date.now() - (a_minute * 30)).toISOString()
                    }
                }
            })
        )
    },
    last7day: async (req, res) => {
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
    gettransaction: async (req, res) => {
        const { timestamp, skip } = req.body
        return res.json(
            await prisma.transaction.findMany({
                where: {
                    timestamp: {
                        lte: new Date(timestamp ? new Date(timestamp) : new Date.now()).toISOString(),
                    }
                },
                take: 5,
                skip: skip ? skip : 0
            })
        )
    },
    getsend: async (req, res) => {
        const { timestamp, skip } = req.body
        return res.json(
            await prisma.send.findMany({
                where: {
                    timestamp: {
                        lte: new Date(timestamp ? new Date(timestamp) : new Date.now()).toISOString(),
                    }
                },
                take: 5,
                skip: skip ? skip : 0
            })
        )
    },
    getreceive: async (req, res) => {
        const { timestamp, skip } = req.body
        return res.json(
            await prisma.receive.findMany({
                where: {
                    timestamp: {
                        lte: new Date(timestamp ? new Date(timestamp) : new Date.now()).toISOString(),
                    }
                },
                take: 5,
                skip: skip ? skip : 0
            })
        )
    },
    dummyTransaction: async (req, res) => {
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

module.exports = { Admin }