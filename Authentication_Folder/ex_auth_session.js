// ------- ////-/-/-/--/-/-/---//--//--/-/-/-/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-///---//--/-/-/

// the landing page: landing.html
<form method='post' action='/sessions'>
    <input type='text' name='email'>
    <input type='password' name='password'>
</form>
<form method='post' action='/users'>
    <input type='text' name='first_name'>
    <input type='text' name='last_name'>
    <input type='email' name='email'>
    <input type='password' name='password'>
</form>


// ------- ////-/-/-/--/-/-/---//--//--/-/-/-/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-///---//--/-/-/

// server.js
const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// ------- ////-/-/-/--/-/-/---//--//--/-/-/-/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-///---//--/-/-/

app.post('/sessions', (req, res) => {
    console.log(" req.body: ", req.body);
    User.findOne({email:req.body.email, password: req.body.password}, (err, user) => {
        if (err) {
            // Code...
        }
        else {
            // Code...
    		req.session.id = user._id;
		req.session.email = user.email;
        }
    })
})


// ------- ////-/-/-/--/-/-/---//--//--/-/-/-/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-///---//--/-/-/