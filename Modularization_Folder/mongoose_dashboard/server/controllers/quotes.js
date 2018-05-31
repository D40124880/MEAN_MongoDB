var mongoose = require('mongoose');
var Mongo = mongoose.model('quotes') // We are retrieving this Schema from our Models, named 'User'

module.exports = {
    index : function(req, res){
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
    },

    display : function(req, res){
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
    },

    new : function(req, res){
        res.render('new');
    },

    add : function(req, res){
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
    },

    edit : function(req, res){
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
    },

    update : function(req, res){
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
    },

    destroy : function(req, res){
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
    },
}