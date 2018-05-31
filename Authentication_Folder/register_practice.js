var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
var validator = require('validator');

// invoke express and store the result in the variable app
var app = express();

app.use(express.static(__dirname + '/static'));
app.use(session({secret: 'codingdojo'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/login_registration');
var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, "first name is required"], minlength: [3, 'Name must be at least 3 characters long']},
    last_name: {type: String, required: [true, "first name is required"], minlength: [3, 'Name must be at least 3 characters long']},
    birthday: {type: Date, required: [true, "Birthday is required"]},
    email: {type: String, required: [true, "Email is required"]},
    password: {type: String, required: [true, "Password is required"], minlength: [8, 'Password minimum is 8 characters!']}
   }, {timestamps: true})

mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

app.get('/', function(req, res){
    res.redirect('/');
})

app.post('/register', function(req, res){
    console.log(req.body);
    if(req.body.password === req.body.password_confirm){
        User.findOne({email: req.body.email}, (err, user)=>{
            console.log(user);
            if(!user){
                user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                bcrypt.hash("password_from_form", 10)
                    .then(hashed_password => {
                        console.log(hashed_password);
                        user.password = hashed_password;
                        user.save(err=>{
                            if(err){
                                console.log(err);
                            }else{
                                req.session._id = newUser._id
                                return res.redirect('/');
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error) ;
                    })
            }else{
            console.log('error');
            return res.redirect('/');
        
    }else{
        console.log('error');
        return res.redirect('/');
    }
})

app.post('/login', (req, res)=>{
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        if(user){
            bcrypt.compare(req, body.password, user.password)
                .then(result => {
                    console.log(result);
                    console.log('Logging In');
                    req.session._id = user._id;
                    return res.redirect('/');
                })
                .catch(error => {
                    console.log("error", error);
                })
        }
    })
})


app.listen(6789, () => {
    console.log('Listening on 6789');
})