require('dotenv').config()
const User = require('../model/UserModel')
const Yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.number().required(),
      patamar: Yup.string().required(),
      senha: Yup.string().required(),
      confirmSenha: Yup.string().required()
    })

    const { nome, cpf, patamar, senha, confirmSenha } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro na validação dos campos.'})
    }

    const exist = await User.findOne({cpf})

    if(exist){
      return res.status(400).json({error: 'Usuario já cadastrado.'})
    }

    if(senha != confirmSenha){
      return res.status(400).json({error: 'Senhas incopatives.'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    const user = await User.create({
      nome,
      cpf,
      patamar,
      senha: passwordHash
    })

    try{
      await user.save()
      res.status(201).json({msg: 'Usuario criado com sucesso.'})
    }catch (error){
      res.status(500).json({msg: 'Aconteceu um erro inesperado, volte mais tarde.'})
    }
  }

  async login(req, res){
    const schema = Yup.object().shape({
      cpf: Yup.number().required(),
      senha: Yup.string().required()
    })

    const { cpf, senha } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error:'Informe CPF e SENHA.'})
    }

    const user = await User.findOne({cpf})

    if(!user){
      return res.status(400).json({error: 'Usuario não encontrado'})
    }

    const checkPassword = await bcrypt.compare(senha, user.senha)

    if(!checkPassword){
      return res.status(400).json({error: 'Senha inválida'})
    }

    try{
      const secret = process.env.SECRET
      const token = jwt.sign(
        {
          id: user._id
        },
        secret
      )
      res.status(200).json({ user, token })
    }catch(error){
      res.status(500).json(error)
    }
  }

  async index(req, res){
    const { _id } = req.params

    const userExist = await User.findById(_id, '-senha')

    if(!userExist){
      return res.status(400).json({error: 'Usuário não encontrado'})
    }

    res.status(200).json(userExist)
  }

  async show(req, res){
    await User.find()
      .then(r => res.status(200).json(r))
        .catch(e => res.status(400).json(e))
  }

  async delete(req, res){
    const {_id } = req.params

    if(!_id){
      return res.status(400).json({error: `Id inválido: ${_id}`})
    }

    await User.deleteOne({'_id': _id})
      .then(() => res.status(200).json({msg:'Deletado com sucesso.'}))
        .catch(() => res.status(400).json({error: 'Não foi encontrado o usuario'}))
  }
}

module.exports = new UserController()