'use strict'
const moment = require('moment');
const Cundina = require('../models/cundina');
const Pago = require('../models/pago');
const User = require('../models/user');
const UserCundina = require('../models/userCundina');

function addCundina(req, res) {
    let data = req.body;
    if (!data.title ||
        !data.tipo ||
        !data.time ||
        !data.cantidad ||
        !data.integrantes
    ) return res.status(500).send({ message: `No se mandaron todos los datos` });
    if (data.tipo != 'Mes' &&
        data.tipo != 'Semana' &&
        data.tipo != 'Quincena'
    ) return res.status(500).send({ message: `El tipo: ${data.tipo} no es valido` });
    //calcular el pago individual 
    let pago_individual = data.cantidad / data.integrantes;
    pago_individual += '';
    let creation = moment().format('YYYY-MM-DD');
    let user = req.user.sub;
    let cundina = new Cundina();
    cundina.user = user;
    cundina.title = data.title;
    cundina.tipo = data.tipo;
    cundina.time = data.time;
    cundina.cantidad = data.cantidad;
    cundina.creation = creation;
    cundina.start = null;
    cundina.end = null;
    cundina.integrantes = data.integrantes;
    cundina.pago_individual = pago_individual;
    cundina.status = 'Pendiente';
    cundina.save((err, cundinaSaved) => {
        if (err) return res.status(500).send({ message: `Error al crear la cundina ${err}` });
        if (!cundinaSaved) return res.status(404).send({ message: `No se logro crear la cundina` });
        return res.status(200).send({ cundina: cundinaSaved });
    })

}

function listCundinaXAdmin(req, res) {
    let user = req.user.sub;
    Cundina.find({ user: user }).populate({ path: 'user' }).exec((err, cundinas) => {
        if (err) return res.status(200).send({ message: `Error al obtener listado ${err}` });
        if (!cundinas) return res.status(404).send({ message: `No se encontraron cundinas` });
        return res.status(200).send({ cundinas: cundinas });
    })
}

function listAllCundinas(req, res) {
    Cundina.find().populate({ path: 'user' }).exec((err, cundinas) => {
        if (err) return res.status(200).send({ message: `Error al obtener listado ${err}` });
        if (!cundinas) return res.status(404).send({ message: `No se encontraron cundinas` });
        return res.status(200).send({ cundinas: cundinas });
    })
}

function iniciarCundina(req, res) {
    var id_cundina = req.params.id; //id de la cundina
    var data = req.body;
    var enviado = false;
    var hoy = moment().format('YYYY-MM-DD');
    if (!data.pago_individual |
        !data.tipo ||
        !data.time ||
        !data.status ||
        !data.integrantes
    ) return res.status(500).send({ message: `No se mandaron todos los datos` });

    UserCundina.find({ cundina: id_cundina }, (err, clientes) => {
        if (err) return res.status(200).send({ message: `Error al obtener listado ${err}` });
        if (!clientes) return res.status(404).send({ message: `No se encontraron clientes` });
        var fecha = moment(hoy);
        var i = 0;
        for (i; i <= parseInt(data.time); i++) {
            switch (data.tipo) {
                case 'Semana':
                    fecha.add(1, 'weeks');
                    break;
                case 'Quincena':
                    fecha.add(2, 'weeks');
                    break;
                case 'Mes':
                    fecha.add(1, 'months');
                    break;
            }
            for (let x = 0; x < clientes.length; x++) {
                let pago = new Pago();
                pago.cundina = id_cundina;
                pago.user = clientes[x]._id;
                pago.cantidad = data.pago_individual;
                pago.fecha = fecha.format('YYYY-MM-DD');
                pago.status = 'Pendiente';
                pago.save((err, saved) => {
                    if (err) return res.status({ message: `Error al guardar el pago ${err}` });
                    if (!saved) console.log('No se guardo un pago');
                    console.log('pago agregado')
                });
            }
            console.log(fecha);
            if (i == parseInt(data.time) && !enviado) {
                let data2 = {
                    start: hoy,
                    end: fecha.format('YYYY-MM-DD'),
                    status: 'Activa',
                }
                Cundina.findByIdAndUpdate(id_cundina, data2, (err, cundinaUpdated) => {
                    enviado = true;
                    if (err) return res.status(500).send({ message: `Error al actualizar la cundina ${err}` });
                    return res.status(200).send({ cundina: `OK` });
                })
            }
        }
    })

}

function eliminarCundina(req, res) {
    let id = req.params.id
    Cundina.findByIdAndDelete(id, (err, deleted) => {
        if (err) return res.status(200).send({ message: `Error al eliminar listado ${err}` });
        if (!deleted) return res.status(404).send({ message: `No se encontraron cundinas` });
        res.status(200).send({ cundina: deleted });
        UserCundina.find({ cundina: deleted._id }, (err, users) => {
            users.forEach(user => {
                UserCundina.findByIdAndDelete(user._id, (err, userDeleted) => {
                    if (err) console.log(err);
                });
            });
        });
    })
}

module.exports = {
    addCundina,
    listCundinaXAdmin,
    listAllCundinas,
    iniciarCundina,
    eliminarCundina
}