const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const taskController = require('../controllers/task-controller');

router.get('/tarefas', taskController.listTasks);

router.post('/tarefas', [
    check('name').isLength({ max: 30 }).withMessage("O nome pode ter no máximo 30 caracteres.")
], taskController.createTask);

router.delete('/tarefa/:taskId', taskController.deleteTask);

router.get('/tarefa/:taskId', taskController.findOne);

router.put('/tarefa/:taskId', taskController.updateTask);

module.exports = router;