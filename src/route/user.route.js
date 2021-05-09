module.exports = function(app) {
    const validator = require('./validator.js');
    const users = require('../controller/user.controller.js');

    app.post('/api/register', validator.validateRegisterUser, users.register);
    app.post('/api/login', validator.validateLoginUser, users.login);
    app.get('/api/users/:id', validator.validateLoginUser, users.getUser);

}