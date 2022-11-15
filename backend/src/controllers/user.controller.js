const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { a_day } = require('../utils/time')

const Admin = {
    getAllUser: async (req, res) => {
        const data = await (await prisma.user.findMany({
            select: {
                'user_id': true,
                'username': true,
                'budget': true,
                'email': true
            }
        })).map(a => {
            return a
        })
        return res.status(200).json(
            data
        )
    }
}

const User = {
    me: async (req, res) => {
        const data = await prisma.user.findUnique({
            where: {
                user_id: parseInt(req.jwt.data.user_id)
            }
        })
        delete data.created
        delete data.id
        delete data.last_update
        delete data.password
        return res.status(200).json(
            data
        )
    },
    history: async (req, res) => {
        const { user_id } = req.body
        const history = await prisma.transaction.findMany({
            where: {
                user_id: parseInt(user_id),
                timestamp: {
                    gte: new Date(Date.now() - (a_day * 30)).toISOString()
                }
            },
            include: {
                send: true,
                receive: true
            }
        })
        return res.status(200).json(history)
    }
}

module.exports = { Admin, User }


