const express = require('express')
const venom = require('venom-bot')
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()
const PORT = 4000
const httpServer = createServer(app);
const cors = require('cors')


const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:8000",
      // or with an array of origins
      //   origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
      credentials: true
    }
  })
  



app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})
app.use(cors())

app.get('/', (req, res) => {
    const channelKey = Math.random().toString(36).substr(2)
    res.json({ channelKey })
    setInterval(() => {
        io.sockets.emit(channelKey, {msg:'Hello World'});
    }, 3000);

})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

io.on("connection", (socket) => {
    // socket.emit("hello", );
  
  });
  

// Export the Express API
module.exports = app


