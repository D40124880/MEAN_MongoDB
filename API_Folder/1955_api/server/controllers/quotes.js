var mongoose = require('mongoose');
var api = mongoose.model('quotes');

module.exports = {
    index : function(req, res){
        api.find({}, function(err, people){
            if(err){
                console.log('no people found')
                for(var key in err.errors){
                    req.flash('api', err.errors[key].message);
                }
                res.json({error: err})
            }
            else{
                console.log('got at least one person')
                res.json({people:people})
            }
        })
    },

    new : function(req, res){
        console.log('passed name', req.params.name)
        var person = new api({
            name : req.params.name,
        });
        person.save(function(err){
            if(err){
                console.log('creaion failed')
                for(var key in err.errors){
                    req.flash('quote', err.errors[key].message);
                }
                res.json({error: err})
            }
            else{
                console.log("successfully created person")
                res.json({person: people})
            }
        })
    },

    remove : function(req, res){
        api.remove({name: req.params.name}, function(err){
            if(err){
                console.log('delete failed')
                for(var key in err.errors){
                    req.flash('api', err.errors[key].message);
                }
                res.json({error: err})
            }
            else{
                console.log("successfully deleted person")
                res.json({message: "success"})
            }
        })
    },

    info : function(req, res){
        console.log("passed name", req.params.name)
        api.find({name: req.params.name}, function(err, person){
            if(err){
                console.log("person not found")
                for(var key in err.errors){
                    req.flash('api', err.errors[key].message);
                    }
                res.json({error: err})
            }else{
                console.log("person found")
                res.json({people:person})
            }
        })
    },
}