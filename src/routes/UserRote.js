const express = require('express')
const userRoutes = express.Router()

const UserController = require('../controller/UserController')
const UserMiddleware = require('../middleware/UserMiddleware')

userRoutes.post('/usuario', UserController.store)
userRoutes.post('/usuario/login', UserController.login)

userRoutes.get('/usuario/:_id', UserMiddleware, UserController.index)

module.exports = userRoutes