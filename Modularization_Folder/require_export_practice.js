// dictionary.js
var dictionary = ['apple', 'banana', 'peanut', 'butter', 'grapes', 'jelly'];

module.exports = dictionary

// ----- ------//// ---------/////------/-/-/-//--/-/- /-/-/-/---/-/-/-/-/-/-/-/-/-/-/-/ -/ -/ -/ -/ -/ -/ -/ 

// search.js
var dictionary = require('./dictionary.js');

function search(word, dictionary){
    for(w in dictionary){
        if(dictionary[w] == word){
            return true;
        }
    }
    return false;
}
