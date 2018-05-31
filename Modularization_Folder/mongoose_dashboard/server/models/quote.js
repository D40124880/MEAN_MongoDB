var mongoose = require('mongoose');

var mongoSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength:2},
    age: {type: Number, required: true},
    favorite_food: {type: String, require: true, minlength:5, maxlength:1000},
}, {timestamps: true});
// connecting quote collection
mongoose.model('quotes', mongoSchema); // We are setting this Schema in our Models as 'User'
