module.exports = function(app) {
    const validator = require('./validator.js');
    const movies = require('../controller/movie.controller.js');
    const imageUploader = require("../helpers/image-uploader")

    app.post('/api/movies', imageUploader.upload.single('image'), validator.validateMovie, movies.addMovie);
    app.get('/api/movies/:id', movies.getMovie);
    app.get('/api/movies', movies.getAllMovies);
    app.put('/api/movies/:id', validator.validateMovie, movies.updateMovie);
    app.delete('/api/movies/:id', movies.deleteMovie);

    app.post('/api/faker-movies/:qty', movies.fakerMovies);


}