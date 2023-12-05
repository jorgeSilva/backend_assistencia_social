const express = require('express')
const cors = require('cors')
const server = express()

require('dotenv').config()

server.use(cors())
server.use(express.json())

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('Servidor funcionando');
})