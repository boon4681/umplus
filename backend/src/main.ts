require('dotenv').config()

import express from 'express'
import Router from "./routes"
import morgan from 'morgan'
const methodOverride = require('method-override')

const app = express()
app.disable('x-powered-by')

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({
    extended: true
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use('/download',express.static('download'))
app.use(Router)

app.listen(3000, () => {
    console.log("สวัสดี http://159.223.71.170:3000")
})
