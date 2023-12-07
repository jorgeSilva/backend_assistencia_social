const express = require('express')
const integranteRoute = express.Router()

const IntegranteFamiliaController = require('../controller/IntegranteFamiliaController')
const UserMiddleware = require('../middleware/UserMiddleware')

integranteRoute.post('/familia/integrante', IntegranteFamiliaController.store)

integranteRoute.get('/familia/integrante/show/:fkFamilia', UserMiddleware, IntegranteFamiliaController.show)
integranteRoute.get('/familia/integrante/index/:_id', UserMiddleware, IntegranteFamiliaController.index)

module.exports = integranteRoute