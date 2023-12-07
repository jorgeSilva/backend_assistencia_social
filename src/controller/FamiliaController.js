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

  async show(req, res){
    await Familia.find()
      .then(r => res.status(200).json(r))
        .catch(e => res.status(400).json(e))
  }

  async index(req, res){
    const { _id } = req.params

    if(!_id){
      return res.status(400).json({error: `Id inválido: ${_id}`})
    }

    const idExist = await Familia.findById(_id).populate('fkUserCad')

    if(!idExist){
      return res.status(400).json({error: 'Familia não encontrada.'})
    }else{
      return res.status(200).json({idExist})
    }
  }

  async filter(req, res){
    const { id, filter } = req.params

    if(!filter){
      return res.status(400).json({error: 'Filtro inválido.'})
    }

    if(id === 'nome'){
      return await Familia.find({
        nome: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'cpf'){
      return await Familia.find({
        cpf: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'parentesco'){
      return await Familia.find({
        parentesco: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'responsavel'){
      return await Familia.find({
        responsavel: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'dataNasc'){
      return await Familia.find({
        dataNasc: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'nis'){
      return await Familia.find({
        nis: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'inicio'){
      return await Familia.find({
        inicio: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'fim'){
      return await Familia.find({
        fim: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'nFilhosMaior'){
      return await Familia.find({
        nFilhosMaior: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'nFilhosMaior'){
      return await Familia.find({
        nFilhosMaior: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'residencia'){
      return await Familia.find({
        residencia: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'idoso'){
      return await Familia.find({
        idoso: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'bpc'){
      return await Familia.find({
        bpc: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'contato'){
      return await Familia.find({
        contato: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'rua'){
      return await Familia.find({
        rua: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'bairro'){
      return await Familia.find({
        bairro: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'nCasa'){
      return await Familia.find({
        nCasa: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'complemento'){
      return await Familia.find({
        complemento: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'areaDeRisco'){
      return await Familia.find({
        areaDeRisco: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }else if(id === 'fkUserCad'){
      return await Familia.find({
        fkUserCad: {'$eq': filter}
      }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }
  }

  async update(req, res){
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

    const {_id } = req.params 
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

    await Familia.findByIdAndUpdate(
      {'_id':_id}, req.body, {new: true}
    ).then(r => res.status(200).json(r)).catch((e) => res.status(400).json(e))

  }

  async delete(req, res){
    const {_id } = req.params

    if(!_id){
      return res.status(400).json({error: `Id inválido: ${_id}`})
    }

    await Familia.deleteOne({'_id': _id})
      .then(() => res.status(200).json({msg:'Deletado com sucesso.'}))
        .catch(() => res.status(400).json({error: 'Não foi encontrado o produto informado'}))
  }
}

module.exports = new FamiliaController()