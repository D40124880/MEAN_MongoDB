var mongoose = require('mongoose');
var Mongo = mongoose.model('quotes') // We are retrieving this Schema from our Models, named 'User'

var controller = require('./../controllers/quotes.js')

module.exports = function(app){
    app.get('/', controller.index)

    app.get('/display/:id', controller.display)

    app.get('/new', controller.new)

    app.post('/add', controller.add)

    app.get('/edit/:id', controller.edit)

    app.post('/update/:id', controller.update)

    app.get('/destroy/:id', controller.destroy)

}