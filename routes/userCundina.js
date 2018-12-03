'use strict'
const express = require('express');
const router = express.Router();
const userCundinaCtrl = require('../controllers/userCundina');
const md_auth = require('../middlewares/authenticated');


router.post('/add', md_auth.ensureAuth, userCundinaCtrl.adduser);
router.get('/getTodos', md_auth.ensureAuth, userCundinaCtrl.getUserCundina);
router.get('/getXAdmin', md_auth.ensureAuth, userCundinaCtrl.getUserCundinaXAdmin);
router.get('/getXCundina/:id', md_auth.ensureAuth, userCundinaCtrl.getUserXCundina);
router.get('/getPendientesCliente', md_auth.ensureAuth, userCundinaCtrl.getPendientesXusuarioLogueado);

module.exports = router;