const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const task = require('../models/task');
const Task = mongoose.model('Task');

// list
exports.listTasks = async (req, res) => {
  try {    
    const data = await Task.find({}, 'description dateStart dateFinish userId taskDate projectId');
    
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as tarefas.'});
  }
};

// create
exports.createTask = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0){
    return res.status(400).send({message: errors})
  }
  
  try {
    const task = new Task({
      description: req.body.description,
      dateStart: req.body.dateStart,
      dateFinish: req.body.dateFinish,
      userId: req.body.userId,
      taskDate: req.body.taskDate,
      projectId: req.body.projectId
    });
    
    await task.save();

    return res.status(201).send({message: 'Tarefa cadastrada com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar a tarefa.'});
  }
};

//delete
exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.taskId)
  .then(task => {
      if(!task) {
          return res.status(404).send({
              message: "Tarefa não encontrada com id " + req.params.taskId
          });
      }
      res.send({message: "Tarefa deletada com sucesso!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Tarefa não encontrada com id " + req.params.taskId
          });                
      }
      return res.status(500).send({
          message: "Não foi possível deletar tarefa com id " + req.params.taskId
      });
  });
};

exports.updateTask = (req, res) => {
 // Validate Request
 if(!req.body.description) {
  return res.status(400).send({
      message: "Descrição de tarefa não pode ser vazia"
  });
}

// Find note and update it with the request body
Task.findByIdAndUpdate(req.params.taskId, {
    description: req.body.description,
    dateStart: req.body.dateStart,
    dateFinish: req.body.dateFinish,
    userId: req.body.userId,
    taskDate: req.body.taskDate,
    projectId: req.body.projectId
}, {new: true})
.then(task => {
  if(!task) {
      return res.status(404).send({
          message: "Tarefa não encontrada com id " + req.params.taskId
      });
  }
  res.send(task);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Tarefa não encontrada com id " + req.params.taskId
      });                
  }
  return res.status(500).send({
      message: "Erro ao atualizar tarefa com id " + req.params.taskId
  });
});
};

exports.findOne = (req, res) => {
  Task.findById(req.params.taskId)
  .then(task => {
      if(!task) {
          return res.status(404).send({
              message: "Tarefa não encontrada com id " + req.params.taskId
          });            
      }
      res.send(task);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Tarefa não encontrada com id " + req.params.taskId
          });                
      }
      return res.status(500).send({
          message: "Erro ao retornar tarefa com id " + req.params.taskId
      });
  });
};