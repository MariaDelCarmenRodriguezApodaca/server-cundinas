'use strict'
var Openpay = require('openpay'); //class
var openpay = new Openpay('m0402xnzlpxadtw4jpgn', 'sk_8aa66416a2964c51a1372a4159633705'); //intance (id de comerciante, clave privada)

const User = require('../models/user');

function addUser(req, res) {
    //al agregar el usuario primero se agregara en open pay y despues en mi base de datos
    var data = req.body;
    if (!data.name ||
        !data.last_name ||
        !data.phone_number ||
        !data.email ||
        !data.address ||
        !data.password ||
        !data.role)
        return res.status(500).send({ message: `No se mandaron todos los datos` });

    var customerRequest = {
        'name': data.name,
        'last_name': data.last_name,
        'email': data.email,
        'phone_number': data.telefono,
        'address.line1': data.address,
        'status': 'active',
        'requires_account': false
    };

    openpay.customers.create(customerRequest, function(err, customer) {
        if (err) return res.status(500).send({ message: err });
        let user = new User();
        user.id_openpay = customer.id;
        user.name = data.name;
        user.last_name = data.last_name;
        user.email = data.email;
        user.phone_number = data.phone_number;
        user.address = data.address;
        user.password = data.password;
        user.role = data.role || 'Cliente'; // Admin o Cliente
        user.save((err, userSaved) => {
            if (err) return res.status(500).send({ message: `Error al guardar el usuario en la base de datos ${err}` });
            if (!userSaved) return res.status(500).send({ message: `Error desconocido al guardar el usuario en la base de datos` });
            res.status(200).send({ user: userSaved });
        })

    });
}

function updateUser(req, res) {
    let customer_id = req.params.id; // id en mongodb
    let customer_id_openpay = req.body.id_openpay; // id en open pay
    var data = req.body // data de la peticion
    var customerUpdate;
    if (data.name) customerUpdate.name = data.name;
    if (data.last_name) customerUpdate.last_name = data.last_name;
    if (data.email) customerUpdate.email = data.email;
    if (data.phone_number) customerUpdate.phone_number = data.phone_number;
    if (address) customerUpdate.address.line1 = data.address;
    openpay.customers.update(customer_id_openpay, customerRequest, function(error, customer) {
        if (err) return res.status(500).send({ message: err });
        User.findOneAndUpdate({ '_id': customer_id }, (err, customerUpdated) => {
            if (err) return res.status(500).send({ message: err });
            if (!customerUpdated) return res.status(404).send({ message: `No se encontro al usuario para actualizar` });
            return res.status(200).send({ user: customerUpdated });
        });
    });
}

function deleteUser(req, res) {

}

function getUser(req, res) {

}

function login(req, res) {

}

function getUsers(req, res) {

}

function getUserXCundina(req, res) {

}



module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUser,
    login,
    getUsers,
    getUserXCundina
}