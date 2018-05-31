var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

var controller = require('./../controllers/quotes.js')

module.exports = function(app){
    app.get('/', function(request, response){
        response.render('index');
    });

    // Add User Request 
    app.post('/quotes', controller.quotes) 
    

    app.get('/skip', controller.skip)
  
}
