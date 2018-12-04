'use strict'
const UserCundina = require('../models/userCundina');
const User = require('../models/user');

//agregar usuarios por cundina
function adduser(req, res) {
    let userAdmin = req.user.sub;
    let data = req.body;
    console.log(data);
    if (!data.cundina ||
        !data.user
    ) return res.status(404).send({ message: `No se mandaron todos los datos` });
    let userCundina = new UserCundina();
    userCundina.cundina = data.cundina;
    userCundina.user_admin = userAdmin;
    userCundina.user = data.user;
    userCundina.status = 'Pendiente';
    userCundina.save((err, userCundinaSaved) => {
        if (err) return res.status(500).send({ message: `Erro al guardar el usuario por cundina ${err}` });
        if (!userCundinaSaved) return res.status(404).send({ message: `Error desconocido al guardar el usuario por cundina` });
        return res.status(200).send({ userCundina: userCundinaSaved });
    })

}

//devuelve todos los usuarios por cundina
function getUserCundina(req, res) {
    let userLogin = req.user.sub
    UserCundina.find()
        .populate({ path: 'user' })
        .populate({ path: 'user_admin' })
        .populate({ path: 'cundina' })
        .exec((err, cundinas) => {
            if (err) return res.status(500).send({ message: `Error ${err}` });
            if (!cundinas) return releaseEvents.status(404).send({ message: `No hay usuarios para esta cundina` });
            return res.status(200).send({ userCundina: cundinas });
        })
}

//devuelve a los usuraios por cundina de un administrador
function getUserCundinaXAdmin(req, res) {
    let userLogin = req.user.sub
    UserCundina.find({ user_admin: userLogin })
        .populate({ path: 'user' })
        .populate({ path: 'user_admin' })
        .populate({ path: 'cundina' })
        .exec((err, cundinas) => {
            if (err) return res.status(500).send({ message: `Error ${err}` });
            if (!cundinas) return releaseEvents.status(404).send({ message: `No hay usuarios para esta cundina` });
            return res.status(200).send({ userCundina: cundinas });
        })
}

//devuelve a los usuraios por cundina de un administrador
function getUserXCundina(req, res) {
    let id = req.params.id
    UserCundina.find({ cundina: id })
        .populate({ path: 'user' })
        .populate({ path: 'user_admin' })
        .populate({ path: 'cundina' })
        .exec((err, cundinas) => {
            if (err) return res.status(500).send({ message: `Error ${err}` });
            if (!cundinas) return res.status(404).send({ message: `No hay usuarios para esta cundina` });
            return res.status(200).send({ userCundina: cundinas });
        })
}


function getPendientesXusuarioLogueado(req, res) {
    let userLogin = req.user.sub
    UserCundina.find({ user: userLogin, status: `Pendiente` })
        .populate({ path: 'user' })
        .populate({ path: 'user_admin' })
        .populate({ path: 'cundina' })
        .exec((err, cundinas) => {
            if (err) return res.status(500).send({ message: `Error ${err}` });
            if (!cundinas) return releaseEvents.status(404).send({ message: `No hay usuarios para esta cundina` });
            return res.status(200).send({ userCundina: cundinas });
        })
}

function changeStatusUserCundina(req, res) {
    let id = req.params.id;
    let data = req.body;
    if (!data.status) return res.status(404).send({ message: `No se mandaron todos los datos` });
    if (data.status == 'Aceptada') {
        UserCundina.findByIdAndUpdate(id, { status: data.status }, (err, solicitudUpdated) => {
            if (err) return res.status(500).send({ message: `Error al aceptar solicitud ${err}` });
            if (!solicitudUpdated) res.status(404).send({ message: `Solicitud no encontrada` });
            return res.status(200).send({ userCundina: solicitudUpdated });
        })
    } else if (data.status == 'Rechazada') {
        UserCundina.findByIdAndDelete(id, (err, solicitudDeleted) => {
            if (err) return res.status(500).send({ message: `Error al eliminar solicitud ${err}` });
            if (!solicitudDeleted) res.status(404).send({ message: `Solicitud no encontrada` });
            return res.status(200).send({ userCundina: `Solicitud elimiada con exito` });
        })
    } else return res.status(500).send({ message: `El estatus ${data.status} no es valido` });
}

function getUserParaCundina(req, res) {
    var cundina = req.params.id;
    var clientes = [];
    User.find({ role: 'Cliente' }, (err, users) => {
        if (err) return res.status(500).send({ message: `Error  ${err}` });
        UserCundina.find({ cundina: cundina }, (err, usersCundina) => {
            if (err) return res.status(500).send({ message: `Error {err}` });
            var i = 0;
            for (i; i < users.length; i++) {
                for (let q = 0; q < usersCundina.length; q++) {
                    if (users[i]._id + '' == usersCundina[q].user + '') {
                        users.splice(i, 1);
                        console.log(users);
                    }
                }
            }
            if (i == users.length) {
                return res.status(200).send(users);
            }
        })
    })
}

module.exports = {
    adduser,
    getUserCundina,
    getUserCundinaXAdmin,
    getUserXCundina,
    getPendientesXusuarioLogueado,
    changeStatusUserCundina,
    getUserParaCundina
};