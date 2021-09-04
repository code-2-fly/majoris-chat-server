import express, { Express } from 'express'
import mongoose from 'mongoose'

const app: Express = express()

const port: string | number | undefined = process.env.PORT || 4000
const MONGO_URI: string | undefined = process.env.DB_URI || 'Error'

mongoose.connect(MONGO_URI)

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('connect', () => {
    console.log('Database connected')
})

app.listen(port, () => {
    console.log(`Server running on: ${port}`)
})
