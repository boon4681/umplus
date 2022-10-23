const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function get_users(req, res){
    const id = req.params.id
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            transaction: true,
        }
    })
    res.json({ user: user })

}
exports.get_users=get_users