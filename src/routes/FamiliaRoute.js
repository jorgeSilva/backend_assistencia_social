const express = require('express')
const familiaRouter = express.Router()

const FamiliaController = require('../controller/FamiliaController')

familiaRouter.post('/familia', FamiliaController.store)

familiaRouter.get('/familia/show', FamiliaController.show)
familiaRouter.get('/familia/:_id', FamiliaController.index)

module.exports = familiaRouter