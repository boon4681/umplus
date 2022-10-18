const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors');
// import { PrismaClient } from '@prisma/client'
const {PrismaClient}=require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json({ limit: '8mb' }))
app.use(express.urlencoded({
    extended: true
}));

app.get('/users/:id',async (req,res)=>{
    console.log(req.params)
    id=req.params
    const user = await prisma.user.findUnique({
        where:{
            id:parseInt(id),
        }, 
    })
    res.json({user:user})

    // const allusers = await prisma.user.findMany();
    // console.log(allusers)
    res.send(`your ID is ${x}`)
})



app.get('/', function (req, res) {
    res.send("sdfsdfss")
    console.log(req.url)
})

app.post('/api/user/:id/profile', cors(), function (req, res) {
    fs.writeFileSync(`${req.params.id}.png`, req.body.profile.replace(/^data:([A-Za-z-+/]+);base64,/, ''), 'base64')
    res.json({
        code: 200,
        message: "done"
    })
})

app.get('/upload', function (reg, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
        `
        <input type="file" name="profile" id="hello">
        <button id="hi">upload</button>
        <script>
        document.getElementById('hi').addEventListener("click",()=>{
            const input = document.getElementById('hello');
            const reader = new FileReader()
            reader.onload = (e) => {
                fetch('/api/user/32396/profile',{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({profile:e.target.result})
                })
            }
            reader.readAsDataURL(input.files[0])
        })
        </script>
        `
        
    )
    return res.end();
})

app.listen(3000, () => {
    console.log("สัวสดี http://localhost:3000")
})