// Require the Mongoose Module
var mongoose = require('mongoose');
// Require the Express Module

const session = require('express-session');

const flash = require('express-flash');

var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

// Routes
// Root Request

// Connecting our database to the mongodb that was made on the terminal on 'mongo'
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/quoting');
var quotingSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength:2},
    quote: {type: String, require: true, minlength:5, maxlength:1000},
}, {timestamps: true});
// connecting quote collection
mongoose.model('quotes', quotingSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('quotes') // We are retrieving this Schema from our Models, named 'User'


app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes){
        if(err){
            console.log(err)
        }
        res.render('quotes', {quotes: quotes})
    }).sort({createdAt: -1})
})
app.post('/add_quotes', function(req, res){
    console.log("POST DATA", req.body);
    Quote.create(req.body, function(err, result){
        if(err){
            console.log(err);
            for(var x in err.errors){
                req.flash('add_quote', err.errors[x].message);
            }
            res.redirect('/');
        }else{
            console.log("RESULT: ", result);
            res.redirect('/quotes')
        }
    })
})


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})