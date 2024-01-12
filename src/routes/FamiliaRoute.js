const express = require('express')
const familiaRouter = express.Router()

const FamiliaController = require('../controller/FamiliaController')
const UserMiddleware = require('../middleware/UserMiddleware')

familiaRouter.post('/familia', FamiliaController.store)
familiaRouter.put('/familia/update/:_id', UserMiddleware, FamiliaController.update)

familiaRouter.delete('/familia/delete/:_id', UserMiddleware, FamiliaController.delete)

familiaRouter.get('/familia/show', UserMiddleware, FamiliaController.show)
familiaRouter.get('/familia/:_id', UserMiddleware, FamiliaController.index)
familiaRouter.get('/familia/:id/:filter', UserMiddleware, FamiliaController.filter)

module.exports = familiaRouter