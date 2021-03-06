'use strict'
var Openpay = require('openpay'); //class
var openpay = new Openpay('m0402xnzlpxadtw4jpgn', 'sk_8aa66416a2964c51a1372a4159633705'); //intance (id de comerciante, clave privada)
var jwt = require('../service/jwt');
const User = require('../models/user');

/**
 * ----------------------------NUEVO USUARIO---------------------------------
 */

function addUser(req, res) {
    //al agregar el usuario primero se agregara en open pay y despues en mi base de datos
    var data = req.body;
    if (!data.name ||
        !data.last_name ||
        !data.phone_number ||
        !data.email ||
        !data.address ||
        !data.password ||
        !data.role
    ) return res.status(500).send({ message: `No se mandaron todos los datos` });
    var customerRequest = {
        'name': data.name,
        'last_name': data.last_name,
        'email': data.email,
        'phone_number': data.telefono,
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
        });

    });
}
/**
 * ----------------------------ACTUALIZAR USUARIO--------------------------------
 */
function updateUser(req, res) {
    let customer_id = req.params.id; // id en mongodb
    let customer_id_openpay = req.body.id_openpay; // id en open pay
    var data = req.body // data de la peticion
    if (!data.name ||
        !data.last_name ||
        !data.email ||
        !data.id_openpay ||
        !data.address
    ) return res.status(500).send({ message: `Faltaron campos en la peticion` });
    var customerUpdate = {};
    if (data.name) customerUpdate['name'] = data.name;
    if (data.last_name) customerUpdate['last_name'] = data.last_name;
    if (data.email) customerUpdate['email'] = data.email;
    if (data.phone_number) customerUpdate['phone_number'] = data.phone_number;
    openpay.customers.update(customer_id_openpay, customerUpdate, function(err, customer) {
        if (err) return res.status(500).send({ message: err });
        User.findOneAndUpdate({ '_id': customer_id }, data, (err, customerUpdated) => {
            if (err) return res.status(500).send({ message: err });
            if (!customerUpdated) return res.status(404).send({ message: `No se encontro al usuario para actualizar` });
            return res.status(200).send({ user: customerUpdated });
        });
    });
}
/**
 * -----------------------------LOGIN DE USUARIO--------------------------------
 */
function login(req, res) {
    let data = req.body;
    if (!data.password || !data.email) return res.status(403).send({ message: `Error, no se mandaron todos los campos` });
    User.findOne({ 'email': data.email }, (err, userLocated) => {
        if (err) return res.status(500).send({ message: err });
        if (!userLocated) return res.status(404).send({ message: `No existe el usuario con emal ${data.email}` });
        User.findOne({ 'email': data.email, 'password': data.password }, (err, userLocated2) => {
            if (err) return res.status(500).send({ message: err });
            if (!userLocated2) return res.status(404).send({ message: `No existe el usuario con emal ${data.email}` });
            return res.status(200).send({
                'user': userLocated2,
                'token': jwt.create(userLocated2)
            })
        })
    })
}
/**
 * ----------------------------BORRAR USUARIO-----------------------------------
 */
function deleteUser(req, res) {
    let customer_id = req.params.id; // id en mongodb
    let customer_id_openpay = req.body.id_openpay; // id en open pay
    openpay.customers.delete(customer_id_openpay, function(err) {
        if (err) return res.status(500).send({ message: err });
        User.findByIdAndDelete(customer_id, (err, userDeleted) => {
            if (err) return res.status(500).send({ message: `Error al eliminar usuario ${err}` });
            if (!userDeleted) return res.status(404).send({ message: `No se encontro al usuario` });
            return res.status(200).send({ user: 'userDeleted' });
        });
    });
}
/**
 * ---------------------------OBTENER UN USUARIO--------------------------------
 */
function getUser(req, res) {
    let id = req.params.id;
    User.findById(id, (err, usersLocated) => {
        if (err) return res.status(500).send({ message: `Error al obtener el listado de usuarios ${err}` });
        if (!usersLocated) return res.status(404).send({ message: `No se encontraron usuarios` });
        return res.status(200).send({ users: usersLocated });
    })
}
/**
 * --------------------------LISTADO DE USUARIO----------------------------------
 */
function getUsers(req, res) {
    User.find({}, (err, usersLocated) => {
        if (err) return res.status(500).send({ message: `Error al obtener el listado de usuarios ${err}` });
        if (!usersLocated) return res.status(404).send({ message: `No se encontraron usuarios` });
        return res.status(200).send({ users: usersLocated });
    })
}

/**
 * --------------------------LISTADO DE USUARIO----------------------------------
 */
function getUsersCliente(req, res) {
    User.find({ role: 'Cliente' }, (err, usersLocated) => {
        if (err) return res.status(500).send({ message: `Error al obtener el listado de usuarios ${err}` });
        if (!usersLocated) return res.status(404).send({ message: `No se encontraron usuarios` });
        return res.status(200).send({ users: usersLocated });
    })
}
/**
 * --------------------------OBTENER USUARIOS OPENPAY ---------------------------
 */
function getUsersOpenPay(req, res) {
    openpay.customers.list({}, function(err, list) {
        if (err) return res.status(500).send({ message: err });
        if (!list) return res.status(404).send({ message: `No hay usuarios en open pay, registre para poder obtener una lista` });
        return res.status(200).send({ users: list });
    });
}
/**
 * --------------------------OBTENER UN USUARIO OPENPAY---------------------------
 */
function getUserOpenPay(req, res) {
    let id = req.params.id;
    openpay.customers.get(id, function(err, customer) {
        if (err) return res.status(500).send({ message: err });
        if (!customer) return res.status(404).send({ message: `No hay usuarios en open pay, registre para poder obtener una lista` });
        return res.status(200).send({ users: customer });
    });
}




module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUser,
    login,
    getUsers,
    getUsersOpenPay,
    getUserOpenPay,
    getUsersCliente
}