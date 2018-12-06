'use strict'

const Pago = require('../models/pago');
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
    //de una sola cundina
    //localhost:3000/pago/cundina/cliente
    var cliente = req.user.sub;
    console.log(cliente);
    //5c067fb213d68900163c2b0c
    //5c067fb213d68900163c2b0c
    Pago.find({
            user: '5c067fb213d68900163c2b0c'
        })
        .populate({ path: 'cundina' })
        .populate({ path: 'user' })
        .exec((err, pagos) => {
            if (err) return res.status(500).send({ message: `Error al obtener lo cobors de la cundina ${err}` });
            if (!pagos) return res.status(404).send({ message: `No se encontraron cobros para la cundina` });
            return res.status(200).send({ pagos: pagos });
        });
    //Prin si ves esto TE AMO!!
}

function pagosDelDiaAdmin(req, res) {
    //de todas las cundinas del administrador

}

function pagosAdminPagados(req, res) {

}

function pagosAdminPendientes() {

}

function gananciasAdmin(req, res) {

}

function gananciasDelDiaAdmin(req, res) {
    let hoy = moment().format('YYYY-MM-DD');
}


module.exports = {
    cobrosPagadosClientes,
    pagosPendientes,
    pagosDelDiaAdmin,
    cobrosPendientesClienteLogueado,
    pagosAdminPagados,
    pagosAdminPendientes,
    gananciasAdmin,
    gananciasDelDiaAdmin
}