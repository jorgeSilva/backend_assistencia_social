const express = require('express')
const userRoutes = express.Router()

const UserController = require('../controller/UserController')

userRoutes.post('/usuario', UserController.store)

module.exports = userRoutes