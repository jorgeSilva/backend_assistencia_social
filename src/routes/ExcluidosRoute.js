const express = require('express')
const excluidosRoutes = express.Router()

const ExcluidosController = require('../controller/ExcluidosController')
const UserMiddleware = require('../middleware/UserMiddleware')

excluidosRoutes.post('/familia/excluidos', ExcluidosController.store)

excluidosRoutes.get('/excluidos/show',UserMiddleware, ExcluidosController.show)
excluidosRoutes.get('/familia/excluidos/:_id',UserMiddleware, ExcluidosController.index)

module.exports = excluidosRoutes