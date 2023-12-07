const express = require('express')
const integranteRoute = express.Router()

const IntegranteFamiliaController = require('../controller/IntegranteFamiliaController')
const UserMiddleware = require('../middleware/UserMiddleware')

integranteRoute.post('/familia/integrante', IntegranteFamiliaController.store)
integranteRoute.put('/familia/integrante/update/:_id', IntegranteFamiliaController.update)

integranteRoute.delete('/familia/integrante/delete/:_id', UserMiddleware, IntegranteFamiliaController.delete)

integranteRoute.get('/familia/integrante/show/:fkFamilia', UserMiddleware, IntegranteFamiliaController.show)
integranteRoute.get('/familia/integrante/index/:_id', UserMiddleware, IntegranteFamiliaController.index)

module.exports = integranteRoute