'use strict'

const Pago = require('../models/pago');
const Cundinas = require('../models/cundina');
const Card = require('../models/card');
const moment = require('moment');
//Pendiente Pagado



/**
 * COBROS SON LOS QUE EL CLIENTE TIENE QUE PAGAR AL ADMINISTRADOR
 * 
 * PAGOS SON LOS QUE EL ADMINISTRADOR TIENE QUE PAGARLE AL CLIENTE, 
 * OTRO TIPO DE PAGO ES EL QUE EL ADMINISTRADOR RECIVE
 */



function cobrosPendientesClienteLogueado(req, res) {
    var cliente = req.user.sub;
    var cundina = req.params.id;
    console.log(cliente);
    Pago.find({
            user: cliente,
            type: 'Cobro',
            cundina: cundina
        })
        .populate({ path: 'cundina' })
        .populate({ path: 'user' })
        .exec((err, pagos) => {
            if (err) return res.status(500).send({ message: `Error al obtener lo cobors de la cundina ${err}` });
            if (!pagos) return res.status(404).send({ message: `No se encontraron cobros para la cundina` });
            return res.status(200).send({ pagos: pagos });
        });
}

function pagosPendientesClienteLogueado(req, res) {
    var cliente = req.user.sub;
    console.log(cliente);
    Pago.find({
            user: cliente,
            type: 'Pago'
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
            Pago.find({ cundina: c._id, status: 'Pendiente', type: 'Pago' })
                .populate({ path: 'cundina' })
                .populate({ path: 'user' })
                .exec((err, pagos) => {
                    if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
                    res.status(200).send({ pagos: pagos });
                });
        });
    });
}

function pagosAdminPagados(req, res) {
    var admin = req.user.sub;
    Cundinas.find({ user: admin, status: 'Activa' }, (err, cundinas) => {
        if (err) return res.status(500).send({ message: `Error al obtener lo datos de la cundina ${err}` });
        cundinas.forEach(c => {
            Pago.find({ cundina: c._id, status: 'Pagado', type: 'Pago' })
                .populate({ path: 'cundina' })
                .populate({ path: 'user' })
                .exec((err, pagos) => {
                    if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
                    res.status(200).send({ pagos: pagos });
                });
        });
    });
}

function cobrosAdminPendientes(req, res) {
    var admin = req.user.sub;
    Cundinas.find({ user: admin, status: 'Activa' }, (err, cundinas) => {
        if (err) return res.status(500).send({ message: `Error al obtener lo datos de la cundina ${err}` });
        cundinas.forEach(c => {
            Pago.find({ cundina: c._id, status: 'Pendiente', type: 'Cobro' })
                .populate({ path: 'cundina' })
                .populate({ path: 'user' })
                .exec((err, pagos) => {
                    if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
                    res.status(200).send({ pagos: pagos });
                });
        });
    });
}

function cobrosAdminPagados(req, res) {
    var admin = req.user.sub;
    Cundinas.find({ user: admin }, (err, cundinas) => {
        if (err) return res.status(500).send({ message: `Error al obtener lo datos de la cundina ${err}` });
        cundinas.forEach(c => {
            Pago.find({ cundina: c._id, status: 'Pagado', type: 'Cobro' })
                .populate({ path: 'cundina' })
                .populate({ path: 'user' })
                .exec((err, pagos) => {
                    if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
                    res.status(200).send({ pagos: pagos });
                });
        });
    });
}

function pagosXCundinaAdmin(req, res) {
    var admin = req.user.sub;
    var cundina = req.params.id;
    Pago.find({ cundina: cundina, type: 'Pago' })
        .populate({ path: 'cundina' })
        .populate({ path: 'user' })
        .exec((err, pagos) => {
            if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
            return res.status(200).send({ pagos: pagos });
        });
}


function cobrosXCundinaAdmin(req, res) {
    var admin = req.user.sub;
    var cundina = req.params.id;
    Pago.find({ cundina: cundina, type: 'Cobro' })
        .populate({ path: 'cundina' })
        .populate({ path: 'user' })
        .exec((err, pagos) => {
            if (err) return res.status(500).send({ message: `Error al obtener lo pagos de la cundina ${err}` });
            return res.status(200).send({ pagos: pagos });
        });
}

function pagarCobro(req, res) {
    let user = req.user.sub;
    //me deben mandar el id del pago y el id de la tarjeta con la que se pagara
    let idP = req.params.idcobro;
    let idC = req.params.idcard;
    Pago.findById(idP, (err, pago) => {
        if (err) return res.status(500).send({ message: `Error al localizar el pago: ${err}` });
        if (!pago) return res.status(404).send({ message: `el pago no existe` });
        var cantidad = pago.cantidad;
        Card.findById(idC, (err, card) => {
            if (err) return res.status(500).send({ message: `Error al localizar la tarjeta: ${err}` });
            if (!card) return res.status(404).send({ message: `la tarjeta no existe` });
            if (card.money < cantidad) return res.status(500).send({ message: `No cuenta con los fondos suficientes para realizar el pago de ${cantidad}` });
            if (card.allow_payouts == false) return res.status(500).send({ message: `Tu tarjeta no permite este tipo de pago, por favor ingrese una nueva o seleccione otra` });
            if (card.user != user) return res.status(500).send({ message: `No tienes permiso de usar esta tarjeta ` });
            var resta = card.money - parseFloat(cantidad);
            Card.findByIdAndUpdate(idC, { money: resta }, (err, cardUpdated) => {
                if (err) return res.status(500).send({ message: `Error al actualizar cantidad en  la tarjeta: ${err}` });
                Pago.findByIdAndUpdate(idP, { status: 'Pagado' }, { new: true }, (err, pagoUpdated) => {
                    if (err) return res.status(500).send({ message: `Error al actualizar status en pago: ${err}` });
                    return res.status(200).send({ pago: pagoUpdated });
                })
            });
        })
    });
}
//sdfsdfjhsdfhj

function pagarPago(req, res) {
    let idP = req.params.idP; //id del pago
    Pago.findById(idP, (err, pago) => {
        if (err) return res.status(500).send({ message: `Error al localizar el pago ${err}` });
        if (!pago) return res.status(500).send({ message: `no se encontro el pago` });
        Cundinas.findById(pago.cundina, (err, cundina) => {
            if (err) return res.status(500).send({ message: `Error al localizar la cundina ${err}` });
            Card.findOne({ user: pago.user }, (err, card) => {
                if (err) return res.status(500).send({ message: `Error al localizar la terjeta ${err}` });
                console.log(card);
                var suma = card.money + parseInt(cundina.cantidad);
                Card.findByIdAndUpdate(card._id, { money: suma }, (err, cardUpdated) => {
                    if (err) return res.status(500).send({ message: `Error al pagar ${err}` });
                    if (!card) return res.status(500).send({ message: `No se encontro tarjeta` });
                    Pago.findByIdAndUpdate(idP, { status: 'Pagado' }, (err, pagoUpdated) => {
                        if (err) return res.status(500).send({ message: `Error al pagar ${err}` });
                        return res.status(200).send({ card: cardUpdated, pago: pagoUpdated });
                    })
                })
            });
        });
    });
}





module.exports = {
    cobrosAdminPagados,
    pagosAdminPendientes,
    pagosAdminPagados,
    cobrosPendientesClienteLogueado,
    cobrosAdminPendientes,
    pagosPendientesClienteLogueado,
    pagosXCundinaAdmin,
    cobrosXCundinaAdmin,
    pagarCobro,
    pagarPago
};