const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function transaction(req,res){
    const { receiver_id,sender_id,info,amount} = req.params
    try{
        const user= await prisma.user.create({data:{
            receiver_id:parseInt(receiver_id),
            sender_id:parseInt(sender_id),
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