const express = require('express')
const ExcluidosRoutes = express.Router()

const ExcluidosController = require('../controller/ExcluidosController')
const UserMiddleware = require('../middleware/UserMiddleware')

ExcluidosRoutes.post('/familia/excluidos', ExcluidosController.store)

ExcluidosRoutes.get('/familia/excluidos/show',UserMiddleware, ExcluidosController.show)
ExcluidosRoutes.get('/familia/excluidos/:_id',UserMiddleware, ExcluidosController.index)

module.exports = ExcluidosRoutes