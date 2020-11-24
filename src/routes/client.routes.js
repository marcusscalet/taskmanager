const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const clientController = require('../controllers/client-controller');

router.get('/clientes', clientController.listClients);

router.post('/clientes', [
    check('name').isLength({ max: 30 }).withMessage("O nome pode ter no máximo 30 caracteres.")
], clientController.createClient);

router.delete('/cliente/:clientId', clientController.deleteClient);

router.get('/cliente/:clientId', clientController.findOne);

router.put('/cliente/:clientId', clientController.updateClient);

module.exports = router;