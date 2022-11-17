import { Response, NextFunction } from "express"

const useJson = (req: any, res: Response, next: NextFunction) => {
    if (!req.is('application/json') && !req.accepts('json')) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request'
        })
    }
    req.isJson = true
    if (!req.body) {
        req.body = {}
    }
    next()
}

export default useJson