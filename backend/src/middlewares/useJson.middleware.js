

const useJson = (req,res,next) =>{
    if (!req.is('application/json'))
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
    next()
}

module.exports = {
    useJson
}