const db = require('../configuration/database.config.js');

/**
 * 
 * Récupérer tous les états d'un film
 * @param {*} req 
 * @param {*} res 
 */
exports.getStates = (req, res) => {
    db.query(
        'SELECT * FROM states', (err, results) => {
            if (err) {
                res.status(500).send({ message: "Une erreur interne s'est produite !" });
            } else {
                res.status(200).send(results);
            }
        }
    );
};

/**
 * Récupérer l'état d'un film par son id
 * @param {*} req 
 * @param {*} res 
 */
exports.getState = (req, res) => {
    let { id } = req.params;
    db.query(
        "SELECT * FROM states WHERE id = ?", [id], (err, results) => {
            if (err) {
                res.status(500).send({ message: "Une erreur interne s'est produite !" })
            } else {
                if (results.length != 0) {
                    res.status(200).send(results[0])
                } else {
                    res.status(404).send({ message: `Le status n'existe pas !` });
                }
            }
        }
    );
};