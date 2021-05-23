const http = require('http')
const express = require('express')
const { Server } = require('socket.io')

const userRoutes = require('./src/modules/user/routes')

const app = express()

app.use(express.json())

app.use((_, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT',
		'Access-Control-Allow-Headers': 'Content-Type, access_token',
	})
	next()
})

app.use('/users', userRoutes)

const server = http.createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
	console.log('a user connected')
})

app.get('/', (req, res) => {

	res.send({ ok: true })
})

server.listen(4000, () => console.log(4000))


