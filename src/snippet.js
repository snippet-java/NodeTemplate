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
  
  'use strict';
var watson = require('watson-developer-cloud');
var fs     = require('fs');

var personality_insights = watson.personality_insights({
  username: "", // SET YOUR USERNAME
  password: "", // SET YOUR PASSWORD
  version: "v2"
});;

personality_insights.profile({
  text: "Call me Ishmael. Some years ago-never mind how long "
      + "precisely-having little or no money in my purse, and nothing "
      + "particular to interest me on shore, I thought I would sail about "
      + "a little and see the watery part of the world. It is a way "
      + "I have of driving off the spleen and regulating the circulation. "
      + "Whenever I find myself growing grim about the mouth; whenever it "
      + "is a damp, drizzly November in my soul; whenever I find myself "
      + "involuntarily pausing before coffin warehouses, and bringing up "
      + "the rear of every funeral I meet; and especially whenever my "
      + "hypos get such an upper hand of me, that it requires a strong "
      + "moral principle to prevent me from deliberately stepping into "
      + "the street, and methodically knocking people's hats off-then, "
      + "I account it high time to get to sea as soon as I can."},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
  
}

////////////////////////////////////////////////////////
// Allows Execution of this process                   //
// will run only if called directly                   //
////////////////////////////////////////////////////////
if (require.main === module) {
	process(parameters,null);
} else {

  // name of the unit for logging and servlet path also
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
