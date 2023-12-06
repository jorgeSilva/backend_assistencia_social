const mongoose = require('../config/database')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nome: String,
  cpf: Number,
  senha: String,
  patamar: String
})

module.exports = mongoose.model('User', UserSchema)