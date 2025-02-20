const express = require('express');
const socket = require('socket.io');
const http = require('http')
const {Chess} = require('chess.js');
const path = require('path');
const { title } = require('process');

const app = express()

const server = http.createServer(app)
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ['websocket', 'polling']
});

const chess = new Chess()
let players = {}
let currentPlayer = 'w'

// Configure views and static files
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/',(req,res) => {
    try {
        res.render('index', {title: 'Chess game'})
    } catch (error) {
        console.error('Render error:', error);
        res.status(500).send('Error rendering page');
    }
})
io.on('connection', function(uniquesocket){
    console.log('connected');

    if(!players.white){
        players.white = uniquesocket.id
        uniquesocket.emit('playerRole', 'w')
    }
    else if(!players.black){
        players.black = uniquesocket.id
        uniquesocket.emit('playerRole', 'b')
    }
    else{
        uniquesocket.emit('spectatorRole')
    }

    uniquesocket.on('disconnect', () => {
        if(uniquesocket.id === players.white) {
            delete players.white
        }
        else if(uniquesocket.id === players.black) {
            delete players.black
        }
    })

    uniquesocket.on('move', (move) => {
        try{
            if(chess.turn() === 'w' && uniquesocket.id !== players.white) return
            if(chess.turn() === 'b' && uniquesocket.id !== players.black) return

            const result = chess.move(move)
            if(result){
                currentPlayer = chess.turn()
                io.emit('move', move)
                io.emit('boardState',chess.fen())
            }
            else{
                console.log('Invalid move : ', move);
                uniquesocket.emit('invalidMove',move)
            }
        }
        catch(err){
            console.log(err);
            uniquesocket.emit("Invalid move : ", move);
            
        }
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
});