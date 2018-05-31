// on the controllers folder
app.get('/', function(req, res){
    quotes.index(req, res);
})

// -----/-/-/-/---/-/-/-/-/-/-/-/-/-/-/-/-/-/-/--/-/-/ /--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/--/-/-/-//-/-/-/-/

// on the models folder
const QuoteSchema = new mongoose.Schema({
    quote: {type: String, required: true, minlength:10},
    author: {type: String, required: true},
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema);

// -----/-/-/-/---/-/-/-/-/-/-/-/-/-/-/-/-/-/-/--/-/-/ /--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/--/-/-/-//-/-/-/-/

// on the config folder

// create a variable that points to the models folder
var models_path = path.join(__dirname,  './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file){
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
})
