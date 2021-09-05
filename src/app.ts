import express, { Express } from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import mongoose from 'mongoose'

const app: Express = express()
const httpServer = createServer(app)

const port: string | number | undefined = process.env.PORT || 4000
const MONGO_URI: string | undefined = process.env.DB_URI || 'Error'

mongoose.connect(MONGO_URI)

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => {
    console.log('Database connected')
})

/* ROUTES BELOW HERE */
const io = new Server(httpServer)
io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} connected `)
    socket.on('message', (evt) => {
        socket.broadcast.emit('message', evt)
    })
})

httpServer.listen(port)
