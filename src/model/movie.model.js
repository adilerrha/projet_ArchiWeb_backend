var uuid = require('uuid');
const db = require('../configuration/database.config.js');
class Movie {
    constructor(title, description, director, releaseYear, duration, stateID, urlImage, userID, categoryID) {
        this.id = uuid.v4();
        this.title = title;
        this.description = description;
        this.director = director;
        this.releaseYear = releaseYear;
        this.duration = duration;
        this.stateID = stateID;
        this.urlImage = urlImage;
        this.userID = userID;
        this.categoryID = categoryID;
    }



    save(cb) {
        db.query('INSERT INTO movies SET ?', [this], (err, results) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, this);
            }
        });
    }

    static findAll(cb) {
        db.query(
            'SELECT * FROM movies', (err, results) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, results);
                }
            }
        );
    }


    static findById(id, cb) {
        db.query(
            'SELECT * FROM movies WHERE id = ?', [id], (err, results) => {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, results[0]);
                }
            }
        );
    }

    update(id, updateData, cb) {
        this.id = id;
        db.query("UPDATE movies SET ? WHERE id = ?", [updateData, id], (err, results) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, this);
            }
        });
    }

    static delete(id, cb) {
        db.query("DELETE from movies WHERE id = ?", [id], (err, results) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        });
    }

};
module.exports = Movie;