const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const result = await prisma.$queryRaw`
SELECT * FROM transaction 
WHERE timestamp > current_timestamp - interval '7 days'
`
