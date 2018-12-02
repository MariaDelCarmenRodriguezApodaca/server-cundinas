'use strict'
const Bankaccount = require('../models/bankaccount');

function addBanckaccount(req, res) {
    let data = req.body;
    if (!data.clave ||
        !data.alias ||
        !data.holder_name
    ) return res.status(404).send({ message: `No se mandaron todos los datos` });
}

function deleteBackaccount(req, res) {

}

function getBackaccoutn(req, res) {

}

module.exports = {}