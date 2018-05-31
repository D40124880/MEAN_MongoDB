// require the mongoose module
var mongoose = require('mongoose');
// to make a model, you can first define a schema, which is just the BLUEPRINT for a model
var UserSchema = new mongoose.Schema({
    first_name:  { type: String, required: true, minlength: 6},
    last_name: { type: String, required: true, maxlength: 20 },
    age: { type: Number, min: 1, max: 150 },
    email: { type: String, required: true }
}, {timestamps: true });

//-----/-//-/-/-/-/-/-/-////--------/////---//--/--/-/-/-/-//--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

// DISPLAYING VALIDATION ERRORS
// ...  // set up other middleware, such as session
const flash = require('express-flash');
app.use(flash());
app.post('/users', function (req, res){
    var user = new User(req.body);
    user.save(function(err){
        if(err){
            // if there is an error upon saving, use console.log to see what is in the err object copy
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        }
        else {
            res.redirect('/users');
        }
    });
});

// THIS IS ON THE index.ejs
<!-- tip to easily see objects printed in full instead of [object Object] -->
<%- JSON.stringify(messages) %> 
<!-- based on the structure of your messages, determine how to display them -->
<% if(messages.registration) { %>
     <% for (var x of messages.registration) { %>
      <h3><%= x %></h3>
     <% } %>
 <% } %>

//-----/-//-/-/-/-/-/-/-////--------/////---//--/--/-/-/-/-//--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

