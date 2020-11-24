const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const user = require('../models/user');
const User = mongoose.model('User');

// list
exports.listUsers = async (req, res) => {
  try {    
    const data = await User.find({}, 'name email avatar_url current_project');
    
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os usuários.'});
  }
};

// create
exports.createUser = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0){
    return res.status(400).send({message: errors})
  }
  
  try {
    const user = new User({
      // _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      avatar_url: req.body.avatar_url,
      current_project: req.body.current_project,
    });
    
    await user.save();

    return res.status(201).send({message: 'Usuário cadastrado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar o usuário.'});
  }
};

//delete
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "Usuário não encontrado com id " + req.params.userId
          });
      }
      res.send({message: "Usuário deletado com sucesso!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Usuário não encontrado com id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Não foi possível deletar usuário com id " + req.params.userId
      });
  });
};

exports.updateUser = (req, res) => {
 // Validate Request
 if(!req.body.name) {
  return res.status(400).send({
      message: "Nome de usuário não pode ser vazio"
  });
}

// Find note and update it with the request body
User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name,
    email: req.body.email,
    avatar_url: req.body.avatar_url,
    current_project: req.body.current_project,
}, {new: true})
.then(user => {
  if(!user) {
      return res.status(404).send({
          message: "Usuário não encontrado com id " + req.params.userId
      });
  }
  res.send(user);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Usuário não encontrado com id " + req.params.userId
      });                
  }
  return res.status(500).send({
      message: "Erro ao atualizar usuário com id " + req.params.userId
  });
});
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "Usuário não encontrado com id " + req.params.userId
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Usuário não encontrado com id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Erro ao retornar usuário com id " + req.params.userId
      });
  });
};