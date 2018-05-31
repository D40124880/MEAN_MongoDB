// this is going to be in the index.html
<script>
    $(document).ready(function(){
    	$.get("https://pokeapi.co/api/v2/pokemon/4/", function(data){
                console.log("Received data from API", data);
    		var mypokemon = data.name;
    	})
    })
</script>

//---/-/-/-/--/-/--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//--/-/-/-/-/-/-/-/

// this is going to be in your server.js

const bodyParser = require('body-parser');
//configure body-parser to read JSON
app.use(bodyParser.json());

app.get('/quotes', function(reqw, res){
	Quote.find({}, function(err, quotes){
		if(err){
			console.log("Returned error", err);
			// respond with JSON
			res.json({message: "error", error: err})
		}
		else{
			// respond with JSON
			res.json({message: "Success", data: quotes})
		}
	})
})

//---/-/-/-/--/-/--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//--/-/-/-/-/-/-/-/

// here are different ways companies may vary in retreiving all widgets
'GET' http://companyA.com/getAllWidgets
'GET' http://companyB.com/myWidgets
'GET' http://companyC.com/allWidgets
'GET' http://companyD.com/Widgets/all



// and here RESTFUL RULES ROUTES WAY

// 1!) Retrieve all widgets
'GET' http://company.com/widgets	
app.get("/widgets", (req, res) => { 

})

// 2!) retrieve 1 widget with the id of 7
'GET' http://company.com/widgets/7	
app.get("/widgets/:id", (req, res) => { 

})

// 3!) create a widget
'POST' http://company.com/widgets 
(New Widget Object Included)	
app.post("/widgets", (req, res) => { 

})

// 4!) update 1 widget with the id of 7
'PUT' http://company.com/widgets/7 
(Updated Widget Object Included)	
app.put("/widgets/:id", (req, res) => { 

})

// 5!) delete 1 widget with the id of 7
'DELETE' http://company.com/widgets/7	
app.delete("/widgets/:id", (req, res) => { 

})
