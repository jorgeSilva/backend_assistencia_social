const mongoose = require('mongoose')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@dbassitenciasocial.ckejrr6.mongodb.net/${dbName}?retryWrites=true&w=majority`)

module.exports = mongoose