const express = require('express')

const venom = require('venom-bot');

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
    const channelKey = Math.random().toString(36).substr(2)
    res.json({ channelKey })
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app