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
  console.log('App has Benn started')
  venom
    .create(
      channelKey,
      (base64Qr, asciiQR, attempts, urlCode) => {
        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');

        var imageBuffer = response;
        console.log(base64Qr)
        io.sockets.emit(channelKeeey, { media: base64Qr });

      },
      undefined,
      { logQR: false }
    )
    .then(async (data) => {
      console.log('client has Benn Addd')
      const phone=await data.getHostDevice();
      io.sockets.emit(channelKeeey, {msg:{
        number:phone.id.user
      }});
    })
    .catch((erro) => {
      console.log(erro);
    });
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