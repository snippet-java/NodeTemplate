var express = require('express'),
http = require('http'),
path = require('path'),
DynamicRoutes = require('dynamic-routes'),
bodyParser = require('body-parser'),
app = express();;

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

DynamicRoutes(app, __dirname + '/src/');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

require("cf-deployment-tracker-client").track();