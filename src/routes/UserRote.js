const express = require('express')
const userRoutes = express.Router()

const UserController = require('../controller/UserController')
const UserMiddleware = require('../middleware/UserMiddleware')

userRoutes.post('/usuario', UserController.store)
userRoutes.post('/usuario/login', UserController.login)

userRoutes.get('/usuario/:_id', UserMiddleware, UserController.index)
userRoutes.get('/usuario', UserMiddleware, UserController.show)

userRoutes.delete('/usuario/delete/:_id', UserMiddleware, UserController.delete)

module.exports = userRoutes