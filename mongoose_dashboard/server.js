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
mongoose.connect('mongodb://localhost/mongoosy');
var mongoSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength:2},
    age: {type: Number, required: true},
    favorite_food: {type: String, require: true, minlength:5, maxlength:1000},
}, {timestamps: true});
// connecting quote collection
mongoose.model('quotes', mongoSchema); // We are setting this Schema in our Models as 'User'
var Mongo = mongoose.model('quotes') // We are retrieving this Schema from our Models, named 'User'

// Add User Request 
app.get('/', function(req, res) {
    Mongo.find({}, function(err, musers){
        if(err){
            console.log("no mongooses found")
            for(var key in err.errors){
                req.flash('muser', err.errors[key].message);
                }
            res.render('index')
        }else{
            console.log("got at least one mongoose")
            // console.log('musers', musers)
            context = {
                musers : musers
            };
            res.render('index', context)
        }
    })
})
app.get('/display/:id', function(req, res){
    console.log("POST id passed", req.params.id);
    Mongo.find({_id: req.params.id}, function(err, muser){
        if(err){
            console.log('mongos not found!');
            for(var x in err.errors){
                req.flash('mongos', err.errors[x].message);
            }
            res.redirect('/')
        }else{
            console.log("RESULT Found: ", muser);
            context = {
                muser : muser
            };
            res.render('display', context)
        }
    })
});

app.get('/new', function(req, res){
    res.render('new');
})

app.post('/add', function(req, res){
    console.log('Post data:', req.body);
    form = req.body;
    var muser = new Mongo({
        name: form.name,
        age: form.age,
        favorite_food: form.favfood,
    })
    muser.save(function(err){
        if(err){
            console.log("creation failed")
            for(var key in err.errors){
                req.flash('quote', err.errors[key].message);
                }
            res.redirect('/new')
        }else{
            console.log("successfully added the mongoose");
            res.redirect('/')
        }
    })
})

app.get('/edit/:id', function(req, res){
    console.log('passed id', req.params.id)
    Mongo.find({_id: req.params.id}, function(err, muser){
        console.log('Muser to update', muser)
        if(err){
            console.log('muser not found')
            for(var key in err.errors){
                req.flash("muser", err.errors[key].message);
            }
            res.redirect('/')
        }else{
            console.log('user found')
            context = {
                muser : muser
            };
            res.render("edit", context)
        }
    })
})

app.post('/update/:id', function(req, res){
    form = req.body;
    Mongo.find({_id: req.params.id}, function(err, muser){
        muser[0].name = form.name;
        muser[0].age = form.age;
        muser[0].favorite_food = form.favfood;
        muser[0].save(function(err){
            if(err){
                console.log("update failed")
                for(var key in err.errors){
                    req.flash('quote', err.errors[key].message);
                    }
                res.redirect('/')
            }else{
                console.log("successfully added the mongoose");
                res.redirect('/')
            }  
        })
    })
})

app.get('/destroy/:id', function(req, res){
    form = req.body;
    Mongo.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("Delete failed")
            for(var key in err.errors){
                req.flash('quote', err.errors[key].message);
                }
            res.redirect('/')
        }else{
            console.log("successfully deleted the mongoose");
            res.redirect('/')
        } 
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})