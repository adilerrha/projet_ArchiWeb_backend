const { validationResult } = require('express-validator');
const User = require('../model/user.model.js');

/**
 * Inscrire un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {

    let { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
    }
    let user = new User(name, email, password);

    user.save((err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).send({ error: "L'adresse email existe déjà !" })
            } else {
                res.status(500).send({ error: "Une erreur interne s'est produite !" })
            }
        } else {
            res.status(201).send(result)
        }
    })
};

/**
 * Récupérer un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
    }
    User.findByEmailAndPassword(req.body, (err, result) => {
        if (err) {
            res.status(500).send({ error: "Une erreur interne s'est produite !" })
        } else {
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(401).send({ error: "L'utilisateur/Mot de passe ne sont pas correct !" })
            }
        }
    });
};

/**
 * Récupérer l'utilisateur par son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.getUser = (req, res) => {
    let { id } = req.params;
    User.findById(id, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Une erreur interne s'est produite !" });
        } else {
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(401).send({ error: "L'utilisateur n'existe pas !" });
            }
        }
    })
};