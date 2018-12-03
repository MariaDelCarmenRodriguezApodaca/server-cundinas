'use strict'
const express = require('express');
const router = express.Router();

'use strict'
const userCtrl = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

router.post('/add', userCtrl.addUser);
router.put('/update/:id', md_auth.ensureAuth, userCtrl.updateUser);
router.post('/login', userCtrl.login)
router.delete('/delete/:id', userCtrl.deleteUser);
router.get('/getTodos', userCtrl.getUsers);
router.get('/getTodosOpenPay', md_auth.ensureAuth, userCtrl.getUsersOpenPay);
router.get('/getUser/:id', md_auth.ensureAuth, userCtrl.getUser);
router.get('/getUserOpenPay/:id', md_auth.ensureAuth, userCtrl.getUserOpenPay);
router.get('/getClientes', md_auth.ensureAuth, userCtrl.getUsersCliente);

module.exports = router