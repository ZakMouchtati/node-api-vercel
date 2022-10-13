const express = require('express')

const venom = require('venom-bot');

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
    venom
    .create(
      'carrefour-chat-bot',
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
        console.log(imageBuffer['type'])
        res.send(base64Qr)
      },
      undefined,
      { logQR: false }
    )
    .then(async (client) => {
      console.log('client has Benn Addd')
      client.sendText('212621586010@c.us','Hello World Finally Done !!')
    })
    .catch((erro) => {
      console.log(erro);
    });
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app