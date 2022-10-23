const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function add (req,res){
    const{id,amount}=req.params
    try{
        const user = await prisma.user.update({
            where:{id:parseInt(id)},
            data:{
                budget:{
                    increment:parseInt(amount)
                }
            }
        })
        
        res.json({
            'code':200,
            'message':"add budget successful"
        })
    }
    catch(error){
        console.log(error)
        res.json({'code': 400,
        'message': 'This user is already'})
    }
}

exports.add=add;