module.exports = function(app) {
    const states = require('../controller/state.controller.js');
    app.get('/api/states', states.getStates);
    app.get('/api/states/:id', states.getState);
}