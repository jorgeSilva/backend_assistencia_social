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

  async show(req, res){
    const { fkFamilia } = req.params

    const familiaExist = await Familia.findById(fkFamilia)

    if(!familiaExist) res.status(400).json('Familia não encontrada.')

    await Integrante.find({
      fkFamilia: {'$eq': fkFamilia}
    }).then(r => res.status(200).json(r))
    .catch((e) => res.status(400).json(e))
  }

  async index(req, res){
    const { _id } = req.params

    if(!_id) return res.status(400).json({error: `Id inválido: ${_id}`})

    const idExist = await Integrante.findById(_id)

    if(!idExist){
      return res.status(400).json({error: 'Familia não encontrada.'})
    }else{
      return res.status(200).json(idExist)
    }
  }

  async update(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      dataNasc: Yup.date().required(),
      parentesco: Yup.string().required(),
      cpf: Yup.string().required(),
      fkFamilia: Yup.string().required()
    })

    const { nome, dataNasc, parentesco, cpf, fkFamilia } = req.body
    const {_id } = req.params 

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro na validação dos campos.'})
    }

    await Integrante.findByIdAndUpdate(
      {'_id':_id}, req.body, {new: true}
    ).then(r => res.status(200).json(r)).catch((e) => res.status(400).json(e))

  }

  async delete(req, res){
    const {_id } = req.params

    if(!_id){
      return res.status(400).json({error: `Id inválido: ${_id}`})
    }

    await Integrante.deleteOne({'_id': _id})
      .then(() => res.status(200).json({msg:'Deletado com sucesso.'}))
        .catch(() => res.status(400).json({error: 'Não foi encontrado o produto informado'}))
  }
}

module.exports = new IntegranteFamilia()