const express = require('express')
const familiaRouter = express.Router()

const FamiliaController = require('../controller/FamiliaController')

familiaRouter.post('/familia', FamiliaController.store)

module.exports = familiaRouter