import { PrismaClient } from "@prisma/client";
import minimist from 'minimist'
import { bhash } from "./modules/hash.module";
const prisma = new PrismaClient()

const argv = minimist(process.argv.slice(2), { string: ['_'] })

if (argv.user) {
    console.log(argv.user)
    prisma.user.update({
        where: {
            user_id: argv.user + ''
        },
        data: {
            password: Buffer.from(bhash.hash('1111111111111')).toString('base64')
        }
    }).then(a => {
        console.log(a)
    })
}

if (argv.tx_fail) {
    prisma.transaction.findMany({
        where: {
            status: 'PROCESS'
        }
    }).then(a => {
        a.forEach(a => {
            prisma.transaction.update({
                where: {
                    transaction_id:a.transaction_id
                },
                data:{
                    status: 'FAILED'
                }
            }).then(a => {
                console.log(a)
            })
        })
    })
}