'use strict'
const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/pago');
const md_auth = require('../middlewares/authenticated');

// router.get('/pendienteXCliente/', md_auth.ensureAuth, pagoCtrl.cobrosPendientesCliente);
router.get('/pendienteXClienteLogeado', md_auth.ensureAuth, pagoCtrl.cobrosPendientesClienteLogueado);

module.exports = router;