// this is how it would normally look before it is even being modulized

app.get('/', function(req, res){
    Quote.find({}, function(err, data){
        if(err){
            // handle error, send response
        }
        else{
            // handle data, send response
        }
    })
})

// -----/-/-/-/-/--/---/-/-/-/-/-/-/-/-/-/--/-/-/- /-/-/--/-/-//-/-/--/-/-/-/-/-/-/-/-/-/-/-/-/-//-//

// when we call for "require" -- we are causing a particular file to be running

// then you also need to require mongoose once more in order for the variables to work

// just as we are going to do in the next example-- which it is enhanced from the one above

// ---server/config/routes.js
const mongoose = require('mongoose'),
    Quote = mongoose.model('Quote')
module.exports = function(app){
    app.get('/', function(req, res){
        Quote.find({}, function(err, data){
            // certain code that will run after the Database has just been called to find information
        })
    })
    // here is where all of the other routes will be going
}

// ---server.js---
// where the routes used to be, we're going to require routes.js
// since rotues.js exports a function, server.js will recieve that function
// invoke the function we get from the require and pass it app as an argument
require('./server/config/routes.js')(app)

// -----/-/-/-/-/--/---/-/-/-/-/-/-/-/-/-/--/-/-/- /-/-/--/-/-//-/-/--/-/-/-/-/-/-/-/-/-/-/-/-/-//-//

// THIS IS WHAT WE ARE TRYING TO DO

quotingDojo{ // --- the name of a certain project
    client{
        static{

        }
        views{
            index.ejs
            main.ejs
        }
    }
    node_modules{

    }
    server{
        config{
            mongoose.js
            routes.js
        }
        controllers{
            quotes.js
        }
        models{
            quote.js
        }
    }
    package.json
    server.js
}