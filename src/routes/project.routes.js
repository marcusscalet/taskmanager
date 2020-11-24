const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/project-controller');

router.get('/projetos', projectController.listProjects);

router.post('/projetos', [
    check('name').isLength({ max: 30 }).withMessage("O nome pode ter no máximo 30 caracteres.")
], projectController.createProject);

router.delete('/projeto/:projectId', projectController.deleteProject);

router.get('/projeto/:projectId', projectController.findOne);

router.put('/projeto/:projectId', projectController.updateProject);

module.exports = router;