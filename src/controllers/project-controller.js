const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const project = require('../models/project');
const Project = mongoose.model('Project');

// list
exports.listProjects = async (req, res) => {
  try {    
    const data = await Project.find({}, 'name _id description goal manager');
    
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os projetos.'});
  }
};

// create
exports.createProject = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0){
    return res.status(400).send({message: errors})
  }
  
  try {
    const project = new Project({
      // _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      goal: req.body.goal,
      manager: req.body.manager,
    });
    
    await project.save();

    return res.status(201).send({message: 'Projeto cadastrado com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar o projeto.'});
  }
};

//delete
exports.deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.projectId)
  .then(project => {
      if(!project) {
          return res.status(404).send({
              message: "Projeto não encontrado com id " + req.params.projectId
          });
      }
      res.send({message: "Projeto deletado com sucesso!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Projeto não encontrado com id " + req.params.projectId
          });                
      }
      return res.status(500).send({
          message: "Não foi possível deletar projeto com id " + req.params.projectId
      });
  });
};

exports.updateProject = (req, res) => {
 // Validate Request
 if(!req.body.name) {
  return res.status(400).send({
      message: "Nome de projeto não pode ser vazio"
  });
}

// Find project and update it with the request body
Project.findByIdAndUpdate(req.params.projectId, {
  // name: req.body.name || "Projeto sem nome",
  name: req.body.name,
  description: req.body.description,
  goal: req.body.goal,
  manager: req.body.manager,
}, {new: true})
.then(project => {
  if(!project) {
      return res.status(404).send({
          message: "Projeto não encontrado com id " + req.params.projectId
      });
  }
  res.send(project);
}).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Projeto não encontrado com id " + req.params.projectId
      });                
  }
  return res.status(500).send({
      message: "Erro ao atualizar projeto com id " + req.params.projectId
  });
});
};

exports.findOne = (req, res) => {
  Project.findById(req.params.projectId)
  .then(project => {
      if(!project) {
          return res.status(404).send({
              message: "Projeto não encontrado com id " + req.params.projectId
          });            
      }
      res.send(project);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Projeto não encontrado com id " + req.params.projectId
          });                
      }
      return res.status(500).send({
          message: "Erro ao retornar projeto com id " + req.params.projectId
      });
  });
};