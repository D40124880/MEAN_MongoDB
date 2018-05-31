var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String, default: " "},
    completed: {type: Boolean, default: false},
}, {timestamps:true});

mongoose.model('tasks', taskSchema)