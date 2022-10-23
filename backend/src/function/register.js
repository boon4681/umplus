const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function register(req,res){
    const { email,username,password,user_id} = req.params
    try{
        const user= await prisma.user.create({data:{
            user_id:parseInt(user_id),
            username:String(username),
            email:String(email),
            budget:0,
            password:String(password),
            
            setting:{setting:'default'},
            created:new Date(2022-07-01),
            last_update: new Date(2022-08-01)
            }
        })
        res.json({
            
            'code': 200,
            'message': "login successful"
        })
    }
    catch(error){
        console.log(error)
        res.json({
            'code': 400,
            'message': 'This user is already created'
        })
    }
}
exports.register=register