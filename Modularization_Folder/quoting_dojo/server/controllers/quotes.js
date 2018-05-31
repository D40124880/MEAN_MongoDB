var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports = {

    quotes : function(req, res) {
            console.log("POST DATA", req.body);
            form = req.body;
            var quote = new Quote({
                quote : form.quote, 
                name: form.name,
            });
            console.log("post user", quote)
            // This is where we would add the user from req.body to the database.
            quote.save(function(err) {
                // if there is an error console.log that something went wrong!
                if(err) {
                    console.log('something went wrong');
                    for(var key in err.errors){
                        req.flash('quote', err.errors[key].message);
                        }
                    res.redirect('/')
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a quote!');
                res.redirect('/skip');
                }
            })
        },

    skip :   function(req, res) {
            // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
            Quote.find({}, function(err, quotes){
                if(err){
                    console.log("no quote found")
                    for(var key in err.errors){
                        req.flash('quote', err.errors[key].message);
                        }
                    res.render('quotes')
                }else{
                    console.log("got at least one quote")
                    console.log('quotes', quotes)
                    context = {
                        quotes : quotes
                    };
                    res.render('quotes', context)
                }
            })
        },

// end of exports
}