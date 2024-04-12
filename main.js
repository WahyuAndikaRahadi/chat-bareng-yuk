const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let HitungUserOnline = 1
io.on('connection', socket => {
    socket.on('join', param => {
        console.log('Ada Yang Join')
        HitungUserOnline++;
        io.emit('HitungUserOnline', HitungUserOnline)
    })
    
    socket.on('message', param => {
        console.log('kirim pesan')
        io.emit('message', param)
    })

    socket.on('disconnect', param => {
        HitungUserOnline--;
        io.emit('HitungUserOnline', HitungUserOnline)
    })
})
server.listen(3000)