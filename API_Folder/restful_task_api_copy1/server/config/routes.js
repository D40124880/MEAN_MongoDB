var mongoose = require('mongoose');
var task = mongoose.model('tasks');

var controller = require('./../controllers/quotes.js');

module.exports = function(app){
    app.get('/tasks', controller.all)

    app.get('/:id', controller.display)

    app.post('/new', controller.new)

    app.put('/update/:id', controller.update)

    app.delete('/delete/:id', controller.destroy)
}