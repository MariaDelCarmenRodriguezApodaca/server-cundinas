'use strict'
const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/pago');
const md_auth = require('../middlewares/authenticated');

//prefijo: pago
router.get('/cobrosCliente/:id', md_auth.ensureAuth, pagoCtrl.cobrosPendientesClienteLogueado);
router.get('/pagosCliente', md_auth.ensureAuth, pagoCtrl.pagosPendientesClienteLogueado);
router.get('/pagosPendientesAdmin', md_auth.ensureAuth, pagoCtrl.pagosAdminPendientes);
router.get('/pagosPagadosAdmin', md_auth.ensureAuth, pagoCtrl.pagosAdminPagados);
router.get('/cobrosPendientesAdmin', md_auth.ensureAuth, pagoCtrl.cobrosAdminPendientes);
router.get('/cobrosPagadossAdmin', md_auth.ensureAuth, pagoCtrl.cobrosAdminPendientes);
router.get('/pagosAdminXCundina/:id', md_auth.ensureAuth, pagoCtrl.pagosXCundinaAdmin);
router.get('/cobrosAdminXCundina/:id', md_auth.ensureAuth, pagoCtrl.cobrosXCundinaAdmin);
router.put('/pagarCobro/:idcobro/:idcard', md_auth.ensureAuth, pagoCtrl.pagarCobro);
router.put('/pagarPago/:idP', md_auth.ensureAuth, pagoCtrl.pagarPago);


module.exports = router;