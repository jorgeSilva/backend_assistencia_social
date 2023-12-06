const Familia = require('../model/FamiliaModel')
const User = require('../model/UserModel')
const Yup = require('yup')

class FamiliaController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.number().required(),
      parentesco: Yup.string().required(),
      responsavel: Yup.boolean().required(),
      dataNasc: Yup.date().required(),
      nis: Yup.string().required(),
      inicio: Yup.date().required(),
      fim: Yup.date(),
      nFilhosMaior: Yup.number(),
      nFilhosMenor: Yup.number(),
      residencia: Yup.string().required(),
      idoso: Yup.boolean().required(),
      bpc: Yup.boolean().required(),
      contato: Yup.string().required(),
      rua: Yup.string().required(),
      bairro: Yup.string().required(),
      nCasa: Yup.number().required(),
      complemento: Yup.string(),
      areaDeRisco: Yup.string().required(),
      fkUserCad: Yup.string().required()
    })

    const {
      nome,
      cpf,
      parentesco,
      responsavel,
      dataNasc,
      nis,
      inicio,
      fim,
      nFilhosMaior,
      nFilhosMenor,
      residencia,
      idoso,
      bpc,
      contato,
      rua,
      bairro,
      nCasa,
      complemento,
      areaDeRisco,
      fkUserCad
    } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro na validação dos campos.'})
    }

    const exist = await Familia.findOne({cpf})

    if(exist){
      return res.status(400).json({error: `Nome: ${nome}, CPF: ${cpf} já cadastrado.`})
    }

    const userExist = await User.findById(fkUserCad)

    if(!userExist){
      return res.status(400).json({error: 'Integrante da equipe não cadastrado.'})
    }

    const data = await Familia.create({
      nome,
      cpf,
      parentesco,
      responsavel,
      dataNasc,
      nis,
      inicio,
      fim,
      nFilhosMaior,
      nFilhosMenor,
      residencia,
      idoso,
      bpc,
      contato,
      rua,
      bairro,
      nCasa,
      complemento,
      areaDeRisco,
      fkUserCad
    })

    try{
      res.status(201).json({msg: 'Familia cadastrada com sucesso.'})
    }catch(error){
      res.status(500).json({msg: 'Aconteceu um erro inesperado, volte mais tarde.'})
    }
  }
}

module.exports = new FamiliaController()