const mongoose = require('../config/database')
const Schema = mongoose.Schema

const IntegranteFamiliaSchema = new Schema({
  nome: String,
  dataNasc: Date,
  parentesco: String,
  cpf: Number,
  fkFamilia: {
    type: Schema.Types.ObjectId,
    ref: 'Familia'
  }
})

module.exports = mongoose.model('IntegranteFamilia', IntegranteFamiliaSchema)