////////////////////////////////////////////////////////
// Predefined parameters                              //
// which may contain api_key, username, password      //
////////////////////////////////////////////////////////
var parameters = {};

////////////////////////////////////////////////////////
// Main function                                      //
// Output will be reflected via console.log function  //
////////////////////////////////////////////////////////
function process(req_parameters, callback) {
	// actual code will be pasted here
	{{code}}  
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
