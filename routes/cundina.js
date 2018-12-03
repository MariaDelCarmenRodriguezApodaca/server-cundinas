'use strict'
const express = require('express');
const router = express.Router();
const md_auth = require('../middlewares/authenticated');
const cundinaCtrl = require('../controllers/cundina');

router.post('/add', md_auth.ensureAuth, cundinaCtrl.addCundina);

module.exports = router