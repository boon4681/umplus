import { PrismaClient } from "@prisma/client";
import minimist from 'minimist'
import { bhash } from "./modules/hash.module";
const prisma = new PrismaClient()

const argv = minimist(process.argv.slice(2), { string: ['_'] })

if (argv.user) {
    prisma.user.update({
        where: {
            user_id: argv.user
        },
        data: {
            password: Buffer.from(bhash.hash('1111111111111')).toString('base64')
        }
    })
}