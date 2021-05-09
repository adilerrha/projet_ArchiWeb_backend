const db = require('../configuration/database.config.js');
var uuid = require('uuid');

class Category {
    constructor(name) {
        this.id = uuid.v4();
        this.name = name;
    }

    save(cb) {
        db.query('INSERT INTO categories SET ?', [this], (err, results) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, this);
            }
        });
    }

    static findAll(cb) {
        db.query(
            'SELECT * FROM categories', (err, results) => {
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
            'SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, results[0]);
                }
            }
        );
    }


    static delete(id, cb) {
        db.query("DELETE from categories WHERE id = ?", [id], (err, results) => {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        });
    }

};
module.exports = Category;