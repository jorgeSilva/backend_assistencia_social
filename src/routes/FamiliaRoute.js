const express = require('express')
const familiaRouter = express.Router()

const FamiliaController = require('../controller/FamiliaController')
const UserMiddleware = require('../middleware/UserMiddleware')

familiaRouter.post('/familia', FamiliaController.store)

familiaRouter.get('/familia/show',UserMiddleware, FamiliaController.show)
familiaRouter.get('/familia/:_id',UserMiddleware, FamiliaController.index)

module.exports = familiaRouter