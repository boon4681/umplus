require('dotenv').config()

import express from 'express'
import Router from "./routes"

const app = express()
app.disable('x-powered-by')

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({
    extended: true
}))

app.use(Router)

app.listen(3000, () => {
    console.log("สวัสดี http://159.223.71.170:3000")
})