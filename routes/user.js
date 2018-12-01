'use strict'
const express = require('express'); 
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/add',userCtrl.addUser);

module.exports = router