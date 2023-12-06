const express = require('express')
const integranteRoute = express.Router()

const IntegranteFamiliaController = require('../controller/IntegranteFamiliaController')

integranteRoute.post('/familia/integrante', IntegranteFamiliaController.store)

module.exports = integranteRoute