'use strict'
const Bankaccount = require('../models/bankaccount');
var Openpay = require('openpay'); //class
var openpay = new Openpay('m0402xnzlpxadtw4jpgn', 'sk_8aa66416a2964c51a1372a4159633705'); //intance (id de comerciante, clave privada)

function addBankaccount(req, res) {
    let data = req.body;
    let user_openpay = req.user.id_openpay;
    let id = req.user.sub;
    if (!data.clave ||
        !data.alias ||
        !data.holder_name
    ) return res.status(404).send({ message: `No se mandaron todos los datos` });
    let bankaccountRequest = {
        'clabe': data.clabe,
        'alias': data.alias,
        'holder_name': data.holder_name
    };
    openpay.customers.bankaccounts.create(user_openpay, bankaccountRequest, function(err, bankaccount_openpay) {
        if (err) return res.status(500).send({ message: err, punto: 'si' });
        console.log(bankaccount_openpay)
        let bankaccount = new Bankaccount();
        bankaccount.user_openpay = user_openpay;
        bankaccount.id_openpay = bankaccount_openpay.id;
        bankaccount.clave = data.clave;
        bankaccount.alias = data.alias;
        bankaccount.holder_name = data.holder_name;
        bankaccount.save((err, bankaccountSaved) => {
            if (err) return res.status(500).send({ message: `Error al guardar la cuenta bancaria ${err}` });
            if (!bankaccountSaved) return res.status(404).send({ message: `No se guardo la cuenta bancaria` });
            return res.status(200).send({ bankaccount: bankaccountSaved, bankaccount_openpay: bankaccount_openpay });
        })
    });
}

function deleteBankaccount(req, res) {

}

function getBankaccoutn(req, res) {

}

module.exports = {
    addBankaccount
}