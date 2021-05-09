const uuid = require('uuid');
const db = require('../configuration/database.config.js');
const md5 = require('md5');

class User {
    constructor(name, email, password) {
        this.id = uuid.v4();
        this.name = name;
        this.email = email;
        this.password = md5(password);
    }


    save(cb) {
        db.query('INSERT INTO users SET ?', [this], (err, results) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, { id: this.id, name: this.name, email: this.email });
            }
        });
    }


    static findByEmailAndPassword({ email, password }, cb) {

        db.query(
            'SELECT * FROM users WHERE email = ? AND password = ?', [email, md5(password)], (err, results) => {
                if (err) {
                    cb(err, null);
                } else {
                    if (results.length > 0) {
                        delete results[0].password;
                    }
                    cb(null, results[0]);
                }
            }
        );
    }

    static findById(id, cb) {
        db.query(
            'SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) {
                    cb(err, null);
                } else {
                    delete results[0].password;
                    cb(null, results[0]);
                }
            }
        );
    }

};
module.exports = User;