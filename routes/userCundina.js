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
router.put('/changeSolicitud/:id', md_auth.ensureAuth, userCundinaCtrl.changeStatusUserCundina);
router.get('/getUserParaCundina/:id', md_auth.ensureAuth, userCundinaCtrl.getUserParaCundina);
router.get('/getCundinaClienteLogueado', md_auth.ensureAuth, userCundinaCtrl.getCundinaForUserLogeado)

module.exports = router;