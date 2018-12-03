'use strict'
const express = require('express');
const router = express.Router();
const md_auth = require('../middlewares/authenticated');
const cundinaCtrl = require('../controllers/cundina');

router.post('/add', md_auth.ensureAuth, cundinaCtrl.addCundina);
router.get('/getXAdmin', md_auth.ensureAuth, cundinaCtrl.listCundinaXAdmin);
router.get('/getTodas', md_auth.ensureAuth, cundinaCtrl.listAllCundinas);

module.exports = router