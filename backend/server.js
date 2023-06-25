const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors:{origin:'*',}
})

io.on('connection', socket => {
    console.log('Connected')
    socket.on('msg', mydata => {
        console.log('Server received: ', mydata)
        io.emit('msg', mydata)
    })
})

server.listen(4000,() => {
    console.log('Listening to port 4000');
})