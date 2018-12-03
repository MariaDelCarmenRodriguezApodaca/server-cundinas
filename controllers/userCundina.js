'use strict'
const UserCundina = require('../models/userCundina');

//agregar usuarios por cundina
function addCundina(req, res) {
    let user = req.user;
    let data = req.body;
    if (

    ) return res.status(404).send({ message: `No se mandaron todos los datos` });
}

//devuelve todos los usuarios por cundina
function getUserCundina(req, res) {

}

//devuelve a los usuraios por cundina de un administrador
function getUserCundinaXAdmin(req, res) {

}

module.exports = {

}