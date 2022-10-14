const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const venom = require('venom-bot');
const cors = require('cors')
const path = require('path')

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
      // origin: "http://harmonious-fox-9a8089.netlify.app",
      origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5500/","http://localhost:3000","http://harmonious-fox-9a8089.netlify.app","http://localhost:8000"],
    // or with an array of origins
    credentials: true
  }
})

app.use(express.json());

app.use(cors());

let client = []

app.get('/', (req, res) => {
  const channelKeeey = Math.random().toString(36).substr(2)
  res.json({ channelKeeey })
        setInterval(() => {
            console.log('Hello World')
             io.sockets.emit(channelKeeey, {msg:"Heyyyyyyyyyyyyy This My with webcoket "})
        }, 3000);

})

app.post('/send',async (req, res) => {

    res.json({msg:'hello World'})
})

io.on("connection", (socket) => {
  // socket.emit("hello", );

});

httpServer.listen(4000,() => {
  console.log('App Has Stared On Port 4000')
})