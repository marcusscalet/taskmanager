const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/user-controller');

router.get('/usuarios', userController.listUsers);

router.post('/usuarios', [
    check('name').isLength({ max: 30 }).withMessage("O nome pode ter no máximo 30 caracteres.")
], userController.createUser);

router.delete('/usuario/:userId', userController.deleteUser);

router.get('/usuario/:userId', userController.findOne);

router.put('/usuario/:userId', userController.updateUser);

module.exports = router;