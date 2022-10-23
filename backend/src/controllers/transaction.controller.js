const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { a_minute, a_day } = require('../utils/time')

const last30minute = async (req, res) => {
    return res.json(
        await prisma.transaction.findMany({
            where: {
                timestamp: {
                    gte: new Date(Date.now() - (a_minute * 30)).toISOString()
                }
            }
        })
    )
}

const last7day = async (req, res) => {
    return res.json(
        await prisma.transaction.findMany({
            where: {
                timestamp: {
                    gte: new Date(Date.now() - (a_day * 7)).toISOString()
                }
            }
        })
    )
}

const gettransaction = async (req, res) => {
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
}

const getsend = async (req, res) => {
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
}

const getreceive = async (req, res) => {
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
}

module.exports = { last30minute, last7day, gettransaction }