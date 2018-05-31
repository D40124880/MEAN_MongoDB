// ------- ////-/-/-/--/-/-/---//--//--/-/-/-/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-///---//--/-/-/

// requiring bcrypt
const bcrypt = require('bcrypt-as-promised');

// Hashing
bcrypt.hash('password_from_form', 10)
.then(hashed_password => {

})

.catch (error =>{
    
})

// Validation
bcrypt.compare('password_from_form', 'stored_hased_password')
.then( result => {

})
.catch( error => {

})