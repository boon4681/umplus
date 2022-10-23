const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client');
const { time } = require('console');
const { resourceUsage } = require('process');
const prisma = new PrismaClient()

// const func_list=[]
// const Folder = ('./function/')
// fs.readdirSync(Folder).forEach(file => {
//     let func=require(`./function/${file}`)
//     func_list.push(func)
//   });
// console.log(func_list)

// const add=require('./src/function/add')
// const get_users=require('./src/function/get_users')
// const register=require('./src/function/register')
// const login=require('./src/function/login')
// const transaction=require('./src/function/transition')

app.use(express.json({ limit: '8mb' }))
app.use(express.urlencoded({
    extended: true
}));

app.use(require('./src/routes'))

// app.get('/users/:id', get_users.get_users)

// app.post('/api/v1/auth/admin/login',login.login)


// app.get('/register/:email/:username/:password/:user_id',register.register)

// app.get('/add/:id/:amount',add.add)


// app.get('/', function (req, res) {
//     res.send("This is HOMEPAGE")
//     console.log(req.url)
// })

// app.post('/api/user/:id/profile', cors(), function (req, res) {
//     fs.writeFileSync(`${req.params.id}.png`, req.body.profile.replace(/^data:([A-Za-z-+/]+);base64,/, ''), 'base64')
//     res.json({
//         code: 200,
//         message: "done"
//     })
// })

// app.get('/transaction/:sender_id/:receiver_id/:amount/:info',transaction)


app.listen(3000, () => {
    console.log("สวัสดี http://159.223.71.170:3000")
})