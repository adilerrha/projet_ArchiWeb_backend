module.exports = function(app) {
    const validator = require('./validator.js');
    const categories = require('../controller/category.controller.js');

    app.post('/api/categories', validator.validateAddCategory, categories.addCategory);
    app.get('/api/categories/:id', validator.validateCategoryById, categories.getCategory);
    app.get('/api/categories', categories.getAllCategories);
    app.delete('/api/categories/:id', validator.validateCategoryById, categories.deleteCategory)

}