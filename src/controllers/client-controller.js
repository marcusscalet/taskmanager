const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const client = require('../models/client');
const Client = mongoose.model('Client');

// list
exports.listClients = async (req, res) => {
  try {    
    const data = await Client.find({}, 'name _id');
    
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os clientes.'});
  }
};

// create
exports.createClient = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0){
    return res.status(400).send({message: errors})
  }
  
  try {
    const client = new Client({
      // _id: req.body._id,
      name: req.body.name
    });
    
    await client.save();

    return res.status(201).send({message: 'Cliente cadastrado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar o cliente.'});
  }
};

//delete
exports.deleteClient = (req, res) => {
  Client.findByIdAndDelete(req.params.clientId)
  .then(client => {
      if(!client) {
          return res.status(404).send({
              message: "Cliente não encontrado com id " + req.params.clientId
          });
      }
      res.send({message: "Cliente deletado com sucesso!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Client não encontrado com id " + req.params.clientId
          });                
      }
      return res.status(500).send({
          message: "Não foi possível deletar Cliente com id " + req.params.clientId
      });
  });
};

exports.updateClient = (req, res) => {
 // Validate Request
 if(!req.body.name) {
  return res.status(400).send({
      message: "Nome de cliente não pode ser vazio"
  });
}

// Find note and update it with the request body
Client.findByIdAndUpdate(req.params.clientId, {
  name: req.body.name || "Cliente sem nome",
  // content: req.body.content
}, {new: true})
.then(client => {
  if(!client) {
      return res.status(404).send({
          message: "Cliente não encontrado com id " + req.params.clientId
      });
  }
  res.send(client);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Cliente não encontrado com id " + req.params.clientId
      });                
  }
  return res.status(500).send({
      message: "Erro ao atualizar cliente com id " + req.params.clientId
  });
});
};

exports.findOne = (req, res) => {
  Client.findById(req.params.clientId)
  .then(client => {
      if(!client) {
          return res.status(404).send({
              message: "Cliente não encontrado com id " + req.params.clientId
          });            
      }
      res.send(client);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Cliente não encontrado com id " + req.params.clientId
          });                
      }
      return res.status(500).send({
          message: "Erro ao retornar cliente com id " + req.params.clientId
      });
  });
};