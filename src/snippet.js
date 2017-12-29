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
	var parameters = {
 username: '6620c8ed-e3c8-49b5-8420-fa3cb622c51e-bluemix',
 password: '97e542480dcfa4ba9382f2413e2b926a4eeaec88bc065f1f6090b338fb465dcb',
 dbName: 'alice',
 docId: 'zorro'
};

//Main function
//Output will be reflected via console.log function
function process(req_parameters, callback) {
    
    var Cloudant = require('cloudant');
    
    var cloudant = Cloudant({
        account:req_parameters.username,
        password:req_parameters.password
    });
    
    var db = cloudant.db.use(req_parameters.dbName);

    // gets docname from the database with query string {params}.
    db.get(req_parameters.docId, { revs_info: false }, function(err, body) {
     if (!err)
        console.log(body);
    });
    
}


//Allows Execution of this process
//will run if only called directly
if (require.main === module) {
    process(parameters,null);
} else {

//    name of the unit for logging and servlet path also
    var unitpath = "";

//    Template for making above code available
//    as service via superglue routine
    var superglue = require('../lib/superglue.js');
    module.exports = {
            path: '/'+unitpath,
            priority: 1,

            init: function (app) {
                // something to do initially
            },
            GET: function(req, res) {superglue.GET(req,res,parameters,unitpath)},
            POST: function(req, res) {superglue.POST(req,res,process)}
    }
}  
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
