const { validationResult } = require('express-validator');
const Movie = require('../model/movie.model.js');
const fs = require('fs')
const faker = require('faker');
const http = require('http');


/**
 * Ajouter un film
 * @param {*} req 
 * @param {*} res 
 */
exports.addMovie = (req, res) => {
    if (req.file == undefined) {
        res.status(400).send({
            message: 'Vous devez sélectionner un fichier image !'
        });
    }
    let { title, description, director, releaseYear, duration, stateID, userID, categoryID } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
    }

    let movie = new Movie(title, description, director, releaseYear, duration, stateID, `/uploads/${req.file.filename}`, userID, categoryID);
    movie.save((err, result) => {
        if (err) {
            res.status(500).send({ message: "Une erreur interne s'est produite !" });
        } else {
            res.status(201).send(result);
        }
    })
};



/**
 * Récupérer la liste de tous les films
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllMovies = (req, res) => {
    Movie.findAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Une erreur interne s'est produite !" });
        } else {
            res.status(200).send(results);
        }
    })
};

/**
 * Récupérer un film à l'aide de son identifiant
 * @param {*} req 
 * @param {*} res 
 */
exports.getMovie = (req, res) => {
    let id = req.params.id;
    Movie.findById(id, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Une erreur interne s'est produite !" })
        } else {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send({ message: `Le film avec l'identifiant ${id} n'existe pas !` });
            }
        }
    })
};




/**
 * Modifier le film
 * @param {*} req 
 * @param {*} res 
 */
exports.updateMovie = (req, res) => {
    let { title, description, director, releaseYear, duration, stateID, userID, categoryID } = req.body;
    let id = req.params.id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array()[0].msg });
    }

    Movie.findById(id, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Une erreur interne s'est produite !" })
        } else {
            if (result) {
                let movie = new Movie(title, description, director, releaseYear, duration, stateID, result.urlImage, userID, categoryID);
                movie.update(id, movie, (err, result) => {
                    if (err) {
                        /* if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
                             res.status(400).send({ message: "Mauvaise requête !" });
                         } else {
                             
                         }*/
                        res.status(500).send({ message: "Une erreur interne s'est produite !" });
                    } else {
                        if (result) {
                            res.status(200).send(result);
                        }
                    }
                })
            } else {
                res.status(404).send({ message: `Le film avec l'identifiant ${id} n'existe pas !` })
            }
        }
    });
};

/**
 * 
 * Supprime toute trace du film dans la DB et dans le dossier /uploads
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteMovie = (req, res) => {
    let id = req.params.id;

    Movie.findById(id, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Une erreur interne s'est produite !" })
        } else {
            if (result) {
                let movie = result;
                let path = "./src/public" + movie.urlImage;
                fs.unlink(path, (err) => {
                    if (err) {
                        res.status(500).send({ message: "Une erreur interne s'est produite !" })
                    }
                    //console.log("")
                    Movie.delete(movie.id, (err, results) => {
                        if (results.affectedRows != 0) {
                            res.status(200).send({ message: `Le film avec l'identifiant ${id} a été supprimé avec succès !` });
                        }
                    })
                });
            }
        }
    });

};


/**
 * Permet d'ajouter des films pour effectuer seulement des tests
 */

exports.fakerMovies = async(req, res) => {
    let qty = req.params.qty;
    if (qty > 20) {
        return res.status(400).send({
            message: `Vous ne pouvez pas ajouter plus que 20 à la fois !`
        });
    }
    let statesIDs = ['bfe35b03-1f23-40b6-813d-0273293dfeb4', '2f7038d8-98a0-44f9-94bd-81d853d7470b', 'afa84b57-05df-4a2d-8def-51f6b07a9d36'];
    let categoriesIDs = ["dd528c94-4d38-4c57-ae50-ef9504d783e6", "dd528c94-4d38-4c57-ae50-ef9504d783e7", "dd528c94-4d38-4c57-ae50-ef9504d783e8", "dd528c94-4d38-4c57-ae50-ef9504d783e9", "dd528c94-4d38-4c57-ae50-ef9504d78310",
        "dd528c94-4d38-4c57-ae50-ef9504d78311"
    ]
    let i = 0;
    while (i < qty) {
        let state_id = statesIDs[Math.floor(Math.random() * statesIDs.length)];
        let category_id = categoriesIDs[Math.floor(Math.random() * categoriesIDs.length)];
        const path = new Date().getTime();
        const file = fs.createWriteStream(`./src/public/uploads/${path + i}.png`);
        http.get(faker.image.animals(100, 100), function(response) {
            response.pipe(file)
        });
        let movie = new Movie(faker.name.title(), faker.lorem.paragraph(), faker.name.findName(), faker.date.past().getFullYear(), faker.datatype.number(), state_id, `/uploads/${path + i}.png`, 'd7ead69e-56ec-4e4c-bafd-0114ef54260f', category_id);
        movie.save((err, result) => {
            if (err) {
                res.status(500).send({ message: "Une erreur interne s'est produite !" });
            }
        })
        i++;
    }

    res.status(201).send({
        message: `Les ${qty} fausses données ont été effectuées avec succès !`
    });
}