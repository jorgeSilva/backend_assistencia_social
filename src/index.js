const express = require('express')
const cors = require('cors')
const server = express()

require('dotenv').config()

server.use(cors())
server.use(express.json())

const UserRoutes = require('./routes/UserRote')
const FamiliaRoutes = require('./routes/FamiliaRoute')
const IntegranteRoutes = require('./routes/IntegranteRoute')
const ExcluidosRoutes = require('./routes/ExcluidosRoute')

server.use(UserRoutes)
server.use(FamiliaRoutes)
server.use(IntegranteRoutes)
server.use(ExcluidosRoutes)

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('Servidor funcionando');
})