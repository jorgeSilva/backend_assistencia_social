const express = require('express')
const userRoutes = express.Router()

const UserController = require('../controller/UserController')

userRoutes.post('/usuario', UserController.store)
userRoutes.post('/usuario/login', UserController.login)

module.exports = userRoutes