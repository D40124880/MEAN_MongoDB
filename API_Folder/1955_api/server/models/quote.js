var mongoose = require('mongoose');

var apiSchema = new mongoose.Schema({
    name : {type: String, require: true, minlength:3},
}, {timestamps:true});

// connecting quote collection
mongoose.model('quotes', apiSchema);