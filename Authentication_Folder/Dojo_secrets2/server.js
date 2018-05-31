// Load the express module and store it in the variable express (Where do you think this comes from?)
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

mongoose.connect('mongodb://localhost/dojo_secrets');
var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true, minlength: 3},
    last_name: {type: String, required: true, minlength: 3},
    birthday: {type: Date, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 10},
    secrets : [
        {
            title : {type: String},
            comments : [
                {
                    content : {type: String}
                }
            ]
        }
    ]
   }, {timestamps: true})

   mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// routes
// /
app.get('/', function(req, res){
    res.render('index');
});
// /login
app.get('/login', function(req,res){
    res.render('login');
});
// /Reg
app.get('/reg', function(req, res){
    res.render('reg');
});
// /login2account
app.post('/login2account', function(req, res){
    form = req.body
    if (form.email < 5){
        req.flash('user', "An email is required")
        return res.redirect('/reg')
    }else if(validator.isEmail(form.email) == false){
        req.flash('user', "This is not a valid e-mail")
        return res.redirect('/reg')
    }   
    if(form.password.length < 8){
        req.flash('user', "The password must be longer than 8 characters")
        return res.redirect('/reg')
    }
    User.findOne({email:form.email}, function(err, user){
        if(err){
            console.log("error on findone search")
            for(var key in err.errors){
                req.flash('user', err.errors[key].message);
                return res.redirect('/reg')
            }   
        }else{
            bcrypt.compare(form.password, user.password)
                .then( result => {
                    console.log('result', result)
                    if(result){
                        req.flash('user', "User found and logged in")
                        req.session.user_id = user._id
                        return res.redirect('/home')
                    }else{
                        req.flash('user', "The password did not match the user information")
                        return res.redirect('/login')
                    }    
                })
                .catch( error => {
                    req.flash('user', "Error on the password Bcrypt compare")
                    return res.redirect('/login')
                })   
        }
    })
});

app.get('/home', function(req, res){
    // get all secrets and display them
    User.find({}, function(err, user){
        if(err){
            for(var key in err.errors){
                req.flash('user', err.errors[key].message);
                }
            res.render('secret')    
        }else{
            console.log("got at least one user")
            console.log("session id", req.session.user_id)
            console.log("user", user)
            context = {
                dmessages : user,
                session_id : req.session.user_id,
            }
            res.render('secret', context)
        }
    })
});
// /register_account
app.post('/register_account', function(req, res){
    form = req.body;
    if (form.first_name.length < 3){
        req.flash('user', "First name must be longer than 3 characters")
        return res.redirect('/reg')
    }else if(validator.isAlpha(form.first_name) == false){
        req.flash('user', "The first name must contain only alphabet characters")
        return res.redirect('/reg')
    }
    if(form.last_name.length < 3){
        req.flash('user', "Last name must be longer than 3 characters")
        return res.redirect('/reg')
    }else if(validator.isAlpha(form.last_name) == false){
        req.flash('user', "The last name must contain only alphabet characters")
        return res.redirect('/reg')
    }
    if (form.email < 5){
        req.flash('user', "An email is required")
        return res.redirect('/reg')
    }else if(validator.isEmail(form.email) == false){
        req.flash('user', "This is not a valid e-mail")
        return res.redirect('/reg')
    }
    var date = new Date();
    var curmonth = date.getMonth()
    var curday = date.getDay()
    var curyear = date.getFullYear()
    if(validator.isNumeric(form.bmonth)){
        if(parseInt(form.bmonth) > 12 || parseInt(form.bmonth) < 1){
            req.flash('user', "The month entered is out side the range of 1-12")
            return res.redirect('/reg')
        }else{
            console.log("good month")
        }
    }else{
        req.flash('user', "Month needs to be numeric")
        return res.redirect('/reg')
    }
    if(validator.isNumeric(form.bday)){
        if(parseInt(form.bday) > 31 || parseInt(form.day) < 1){
            req.flash('user', "The month entered is out side the range of 1-12")
            return res.redirect('/reg')
        }else{
            console.log("good day")
        }
    }else{
        req.flash('user', "Day needs to be numeric")
        return res.redirect('/reg')
    }
    if(validator.isNumeric(form.byear)){
        if(form.byear > curyear){
            req.flash('user', "The year can not be in the future")
            return res.redirect('/reg')
        }else{
            console.log("good year")
        }
    }else{
        req.flash('user', "Year needs to be numeric")
        return res.redirect('/reg')
    }
    if(form.password.length < 8){
        req.flash('user', "The password must be longer than 8 characters")
        return res.redirect('/reg')
    }else if(form.password != form.pass_conf){
        req.flash('user', "Your passwords do not match. Please re-enter")
        return res.redirect('/reg')
    }
    bcrypt.hash(form.password, 10)
        .then(hashed_password => {
            console.log("password hashed")
            User.findOne({email:form.email, password:hashed_password}, function(err, user){
                if(err){
                    console.log("error on findone search")
                    for(var key in err.errors){
                        req.flash('user', err.errors[key].message);
                        return res.redirect('/reg')
                    }
                }else{
                    if(user){
                        req.flash('user', "This combination of email password is already in the system")
                        return res.redirect('/reg')
                    }else{
                        console.log('creating user')
                        var newbd = form.byear + "-" + form.bmonth + "-" + form.bday + " 00:00:00.000"
                        var user = new User({
                            first_name : form.first_name,
                            last_name : form.last_name,
                            birthday : newbd,
                            email : form.email,
                            password : hashed_password 
                        })
                        user.save(function(err){
                            if(err){
                                console.log("creation failed")
                                for(var key in err.errors){
                                    req.flash('user', err.errors[key].message);
                                    }
                                return res.redirect('/reg')
                            }else{
                                console.log("successfully added the user");
                                return res.redirect('/')
                            }
                        });
                        // return res.redirect('/reg')
                    }
                }
            })
        })
        .catch(error => {
            console.log("error on bcrypt")        
        });
})

app.post('/addsec', function(req, res){
    form = req.body
    console.log("session", req.session.user_id)
    if(form.secret < 3){
        req.flash('user', "The secret can not be blank")
        return res.redirect('/home')
    }
    User.findOne({_id: req.session.user_id}, function(err, user){
        user.secrets.push({title: form.secret})
        user.save(function(err){
            if(err){
                console.log("secret creation failed")
                for(var key in err.errors){
                    req.flash('user', err.errors[key].message);
                    }
                return res.redirect('/home')
            }else{
                console.log("successfully added the secret");
                return res.redirect('/home')
            }
        });
    })
})

app.get('/detail/:userid/:secretid', function(req, res){
    User.findOne({_id:req.params.userid}, function(err, user){
        if(err){
            console.log("error on findone search")
            for(var key in err.errors){
                req.flash('user', err.errors[key].message);
                return res.redirect('/home')
            }   
        }else{
            console.log("user", user)
            var sec = user.secrets.id(req.params.secretid)
            console.log("sec", sec)
            context ={
                userid : req.params.userid,
                secretid : req.params.secretid,
                title : sec.title,
                comments : sec.comments,
            }
            console.log('context', context)
            return res.render('detail', context)
        }
    }) 
})

app.post('/addcmt/:userid/:secretid', function(req, res){
    form = req.body
    if(form.comment < 3){
        req.flash('user', "The comment can not be blank")
        return res.redirect('/detail/' + req.params.userid + '/' + req.params.secretid)
    }
    User.findOne({_id:req.params.userid}, function(err, user){
        if(err){
            console.log("error on findone search")
            for(var key in err.errors){
                req.flash('user', err.errors[key].message);
                return res.redirect('/detail/' + req.params.userid + '/' + req.params.secretid)
            }   
        }else{
            var sec = user.secrets.id(req.params.secretid)
            console.log("sec", sec)
            sec.comments.push({content : form.comment})
            user.save(function(err){
                if(err){
                    console.log("secret creation failed")
                    for(var key in err.errors){
                        req.flash('user', err.errors[key].message);
                        }
                        return res.redirect('/detail/' + req.params.userid + '/' + req.params.secretid)
                }else{
                    console.log("successfully added the secret");
                    return res.redirect('/detail/' + req.params.userid + '/' + req.params.secretid)
                }
            });
        }   
    })
})

app.get('/delete/:userid/:secretid', function(req, res){
    User.findOne({_id: req.session.user_id}, function(err, user){
        if(err){
            console.log("error on findone search")
            for(var key in err.errors){
                req.flash('user', err.errors[key].message);
                return res.redirect('/home')
            }   
        }else{
            var sec = user.secrets.id(req.params.secretid)
            console.log("sec", sec)
            sec.remove()
            user.save(function(err){
                if(err){
                    console.log("delete failed")
                    for(var key in err.errors){
                        req.flash('user', err.errors[key].message);
                        }
                        return res.redirect('/home')
                }else{
                    console.log("successfully deleted the secret");
                    return res.redirect('/home')
                }
            });
        } 
    })
})

app.get('/logout', function(req, res){
    if (req.session){
        req.session.destroy(function(err){
            if(err){
                req.flash('user', err.errors[key].message);
                return res.redirect('/home')
            }else {
                return res.redirect('/')
            }
        })
    }
})

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
    console.log("listening on port 8000");
  });