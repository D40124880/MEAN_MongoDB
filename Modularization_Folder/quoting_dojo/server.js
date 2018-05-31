// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const flash = require('express-flash');

// invoke express and store the result in the variable app
var app = express();

app.use(express.static(__dirname + '/client/static'));
app.use(session({secret: 'codingdojo'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/client/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');


require('./server/config/mongoose.js')
// require('./server/models/quote.js')

// var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'User'

require('./server/config/routes.js')(app)

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
});