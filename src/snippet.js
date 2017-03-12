////////////////////////////////////////////////////////
// Predefined parameters                              //
// which may contain api_key, username, password      //
////////////////////////////////////////////////////////
var parameters = {};

////////////////////////////////////////////////////////
// Main function                                      //
// Output will be reflected via console.log functions  //
////////////////////////////////////////////////////////
function process(req_parameters, callback) {
	// actual code will be pasted here
	var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
api_key : your_api_key_here
});
var parameters = {
text : "I purchased this card from Best Buy for around $69 to use in my new camcorder. It's perfect. The read/write speed is exactly what I needed to record HD video and the storage ca-pacity is enough for several hours of video. I wish it had been a little cheaper when I bought it. I see it's on sale now so get it while you can before the price goes back up!"
};
alchemy_language.emotion(parameters, function(error, response) {
if (error || response.status === "ERROR") {
onError(error, response); // function to be defined by you
} else {
console.log(JSON.stringify(response, null, 2));
var docEmotions = response.docEmotions;
// process object 'docEmotions' that contains properties
// 'anger', 'disgust', 'fear', 'joy', 'sadness'
}
});  
}

////////////////////////////////////////////////////////
// Allows Execution of this process                   //
// will run only if called directly                   //
////////////////////////////////////////////////////////
if (require.main === module) {
	process(parameters,null);
} else {
	
	// name of the unit for logging 
	// and servlet path also
	var unitpath = "";
	
	// Template for making above code available
	// as service via superglue routine
	var superglue = require('sandbox-superglue');
	module.exports = {
		path: '/'+unitpath,
		priority: 1,
		
		init: function (app) {
			// something to do initially
		},
		GET:  function(req, res) {superglue.GET(req,res,parameters,unitpath)},
		POST: function(req, res) {superglue.POST(req,res,process)}
	}
}
