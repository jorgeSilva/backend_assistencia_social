const Integrante = require('../model/IntegranteFamiliaModel')
const Familia = require('../model/FamiliaModel')
const User = require('../model/UserModel')
const Yup = require('yup')

class IntegranteFamilia{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      dataNasc: Yup.date().required(),
      parentesco: Yup.string().required(),
      cpf: Yup.string().required(),
      fkFamilia: Yup.string().required()
    })

    const { nome, dataNasc, parentesco, cpf, fkFamilia } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro na validação dos campos.'})
    }

    const exist = await Integrante.findOne({cpf})

    if(exist){
      return res.status(400).json({error: `Nome: ${nome}, CPF: ${cpf} já faz parte de uma familia.`})
    }

    const userExist = await Familia.findById(fkFamilia)

    if(!userExist){
      return res.status(400).json({error: 'Integrante da equipe não cadastrado.'})
    }

    const data = await Integrante.create({
      nome, 
      dataNasc, 
      parentesco, 
      cpf, 
      fkFamilia: userExist
    })

    try{
      await data.save()
      res.status(201).json({msg: 'Familia cadastrada com sucesso.'})
    }catch(error){
      res.status(500).json({msg: 'Aconteceu um erro inesperado, volte mais tarde.'})
    }
  }
}

module.exports = new IntegranteFamilia()