const express = require('express')
const ExcluidosRoutes = express.Router()

const ExcluidosController = require('../controller/ExcluidosController')

ExcluidosRoutes.post('/familia/excluidos', ExcluidosController.store)

module.exports = ExcluidosRoutes