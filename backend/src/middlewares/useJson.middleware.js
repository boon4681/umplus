

const useJson = (req,res,next) =>{
    if (!req.is('application/json'))
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
    req.isJson = true
    next()
}

module.exports = {
    useJson
}