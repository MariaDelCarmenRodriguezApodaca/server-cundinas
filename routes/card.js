'use strict'
const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/card');
const md_auth = require('../middlewares/authenticated');

module.exports = router;