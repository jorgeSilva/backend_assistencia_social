const mongoose = require('../config/database')
const Schema = mongoose.Schema

const FamiliaSchema = new Schema({
  nome: String,
  cpf: Number,
  parentesco: String,
  responsavel: Boolean,
  dataNasc: Date,
  nis: String,
  inicio: Date,
  fim: Date,
  nFilhosMaior: Number,
  nFilhosMenor: Number,
  residencia: String,
  idoso: Boolean,
  bpc: Boolean,
  contato: String,
  rua: String,
  bairro: String,
  nCasa: Number,
  complemento: String,
  areaDeRisco: String,
  fkUserCad: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Familia', FamiliaSchema)