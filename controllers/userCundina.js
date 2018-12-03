'use strict'
const UserCundina = require('../models/userCundina');

//agregar usuarios por cundina
function adduser(req, res) {
    let userAdmin = req.user;
    let data = req.body;
    if (!data.cundina ||
        !data.user
    ) return res.status(404).send({ message: `No se mandaron todos los datos` });
    let userCundina = new UserCundina();
    userCundina.cundina = data.cundina;
    userCundina.user_admin = userAdmin;
    userCundina.user = data.user;
    userCundina.status = 'Pendiente'

}

//devuelve todos los usuarios por cundina
function getUserCundina(req, res) {
    let id_cundina = req.params.id;
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

}

module.exports = {
    adduser
}