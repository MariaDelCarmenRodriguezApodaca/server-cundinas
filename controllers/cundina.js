'use strict'
const moment = require('moment');
const Cundina = require('../models/cundina');


function addCundina(req, res) {
    let data = req.body;
    if (!data.title ||
        !data.tipo ||
        !data.time ||
        !data.cantidad ||
        !data.integrantes
    ) return res.status(500).send({ message: `No se mandaron todos los datos` });
    if (data.tipo != 'Mes' ||
        data.tipo != 'Semana' ||
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
    cundina.cantidad = data.cantidad;
    cundina.creation = creation;
    cundina.start = null;
    cundina.end = null;
    cundina.integrantes = data.integrantes;
    cundina.pago_individual = pago_individual;
    cundina.status = 'Pendiente';
    cundina.save((err, cundinaSaved) => {
        if (err) return res.start(500).send({ message: `Error al crear la cundina ${err}` });
        if (!cundinaSaved) return res.start(404).send({ message: `No se logro crear la cundina` });
        return res.status(200).send({ cundina: cundinaSaved });
    })

}

function listCundina(req, res) {
    let user = req.user.sub;
    Cundina.find()
}

module.exports = {
    addCundina
}