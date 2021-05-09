const { body, param } = require('express-validator');


/**
 * VALIDATION DE L'UTILISATEUR
 */
exports.validateRegisterUser = [
    body("name").not().isEmpty().withMessage("Le nom est requis"),
    body('password').not().isEmpty().withMessage("Le mot de passe est requis").isLength({ min: 6 }).withMessage("Mot de passe doit avoir minimum 6 caractères."),
    body("email").not().isEmpty().withMessage("L'email est requis").isEmail().withMessage("L'email n'est pas valide")
];

exports.validateLoginUser = [
    body('password').not().isEmpty().withMessage("Le mot de passe est requis"),
    body("email").not().isEmpty().withMessage("L'email est requis").isEmail().withMessage("L'email n'est pas valide")
];

/**
 * VALIDATION DE LA CATEGORIE
 */
exports.validateAddCategory = [
    body("name").not().isEmpty().withMessage("Le nom est requis")
];

exports.validateCategoryById = [
    param('id').not().isEmpty().withMessage("L'identifiant est requis")
];

/**
 * VALIDATION DU FILM
 */
exports.validateMovie = [
    body("title").not().isEmpty().withMessage("Le title est requis"),
    body('director').not().isEmpty().withMessage("Le directeur est requis"),
    body("releaseYear").not().isEmpty().withMessage("L'année de sortie est requise"),
    body("duration").not().isEmpty().withMessage("La durée est requise"),
    body("stateID").not().isEmpty().withMessage("Le status est requis"),
];