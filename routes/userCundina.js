'use strict'
const express = require('express');
const router = express.Router();
const userCundinaCtrl = require('../controllers/userCundina');
const md_auth = require('../middlewares/authenticated');


router.post('/add', md_auth.ensureAuth, userCundinaCtrl.adduser);

module.exports = router;