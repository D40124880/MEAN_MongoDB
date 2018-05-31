var mongoose = require('mongoose');
var api = mongoose.model('quotes') // We are retrieving this Schema from our Models, named 'User'

var controller = require('./../controllers/quotes.js')

module.exports = function(app){
    app.get('/', controller.index)

    app.get('/new/:name/', controller.new)

    app.get('/remove/:name/', controller.remove)

    app.get('/:name', controller.info)
}