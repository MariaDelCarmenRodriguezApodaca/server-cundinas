'use strict'

const Pago = require('../models/pago');
const Cundinas = require('../models/cundina');
const moment = require('moment');

//pagos por cliente
//pagos por cundina
//pagos por admin
//todos los pagos
//pagos por admin pagados
//pagos por cliente pagados
//pagos por cundina pagados

//proximos pagos por clientes


/**
 * COBROS SON LOS QUE EL CLIENTE TIENE QUE PAGAR AL ADMINISTRADOR
 * 
 * PAGOS SON LOS QUE EL ADMINISTRADOR TIENE QUE PAGARLE AL CLIENTE, 
 * OTRO TIPO DE PAGO ES EL QUE EL ADMINISTRADOR RECIVE
 */


function pagosPendientes(req, res) {

}

function cobrosPagadosClientes(req, res) {

}


function cobrosPendientesClienteLogueado(req, res) {
    var cliente = req.user.sub;
    console.log(cliente);
    Pago.find({
            user: cliente,
            type: 'Cobro'
        })
        .populate({ path: 'cundina' })
        .populate({ path: 'user' })
        .exec((err, pagos) => {
            if (err) return res.status(500).send({ message: `Error al obtener lo cobors de la cundina ${err}` });
            if (!pagos) return res.status(404).send({ message: `No se encontraron cobros para la cundina` });
            return res.status(200).send({ pagos: pagos });
        });
}

function pagosAdminPendientes(req, res) {
    var admin = req.user.sub;
    Cundinas.find({ user: admin, status: 'Activa' }, (err, cundinas) => {
        if (err) return res.status(500).send({ message: `Error al obtener lo datos de la cundina ${err}` });
        cundinas.forEach(c => {
            Pago.find({ cundina: c._id, status: 'Pendiente', type: 'Pago' }, (err, pagos) => {
                if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
                res.status(200).send({ pagos: pagos });
            });
        });
    });
}

function pagosAdminPagados(req, res) {

}


function gananciasAdmin(req, res) {

}

function gananciasDelDiaAdmin(req, res) {
    let hoy = moment().format('YYYY-MM-DD');
}


module.exports = {
    cobrosPagadosClientes,
    pagosPendientes,
    cobrosPendientesClienteLogueado,
    pagosAdminPagados,
    pagosAdminPendientes,
    gananciasAdmin,
    gananciasDelDiaAdmin
}