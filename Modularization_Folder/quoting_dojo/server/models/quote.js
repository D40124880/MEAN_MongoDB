var mongoose = require('mongoose');
var QuoteSchema = new mongoose.Schema({
    quote: {type: String, required: true, minlength: 10},
    name: {type: String, required: true, minlength: 10},
   }, {timestamps: true})
   mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'