

const useJson = (req,res,next) =>{
    if (!req.is('application/json'))
    return res.status(400).json({
        code: 400,
        message: 'Bad Request'
    })
    req.isJson = true
    if(req.body == undefined){
        req.body = {}
    }
    next()
}

module.exports = {
    useJson
}