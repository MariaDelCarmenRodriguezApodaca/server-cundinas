'use strict'
const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/card');
const md_auth = require('../middlewares/authenticated');

//PREFIJO :card    ejemplo: http://localhost:3000/card/add

router.post('/add', md_auth.ensureAuth, cardCtrl.addCard);
router.post('/delete/:id', md_auth.ensureAuth, cardCtrl.deleteCard); //solo se manda el id por la url
router.get('/getTodas/:id', md_auth.ensureAuth, cardCtrl.getCardsForUser);

module.exports = router;