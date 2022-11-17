import { Request, Response, NextFunction } from "express";

const { bwt } = require('../modules/jwt.module')
const { PrismaClient } = require('@prisma/client');
const { btime } = require('../utils/time');
const prisma = new PrismaClient()

const useAdminAuth = async (req: any, res: Response, next: NextFunction) => {
    if (!req.isJson) return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })

    const auth = req.get('Authorization')
    let p
    if (auth && auth.includes('Bearer ') && (p = auth.indexOf('Bearer ')) === 0) {
        const b = bwt.decode(auth.slice(p + 7))
        if (b && b.data.user) {
            // const expired = b.expire_date - Date.now()
            // console.log(new btime(expired).toDay())
            if (b.data.user === process.env.ADMIN_USER) {
                req.jwt = b
                return next()
            }
        }
    }
    return res.status(401).json({
        code: 401,
        message: 'Unauthorized'
    })
}

const useUserAuth = async (req: any, res: Response, next: NextFunction) => {
    if (!req.isJson) return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
    const auth = req.get('Authorization')
    let p;
    if (auth && auth.includes('Bearer ') && (p = auth.indexOf('Bearer ')) === 0) {
        const b = bwt.decode(auth.slice(p + 7))
        if (b && b.data.user_id) {
            const data = await prisma.user.findUnique({
                where: {
                    user_id: b.data.user_id
                }
            })
            if (b.data.user_id === data.user_id) {
                req.jwt = b
                return next()
            }
        }
    }
    return res.status(401).json({
        code: 401,
        message: 'Unauthorized'
    })
}

const useAuthorizationHeader = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.get('Authorization')
    if (auth) {
        return next()
    }
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
}

export { useAdminAuth, useUserAuth, useAuthorizationHeader }