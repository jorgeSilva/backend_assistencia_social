const express = require('express')
const ExcluidosRoutes = express.Router()

const ExcluidosController = require('../controller/ExcluidosController')

ExcluidosRoutes.post('/familia/excluidos', ExcluidosController.store)

ExcluidosRoutes.get('/familia/excluidos/show', ExcluidosController.show)
ExcluidosRoutes.get('/familia/excluidos/:_id', ExcluidosController.index)

module.exports = ExcluidosRoutes