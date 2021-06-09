const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');

var privateKey = fs.readFileSync( 'ssl/example.com+5-key.pem');
var certificate = fs.readFileSync( 'ssl/example.com+5.pem' );


const app = express();
var jsonParser = bodyParser.json();

var data = {
	alpha: 0,
	beta: 0,
	gamma: 0
}


let portNumber = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

var options = {
	key: privateKey,
	cert: certificate
}

var server = https.createServer(options, app).listen(portNumber, function(){
  console.log("Express server listening on port " + portNumber);
});


app.post('/send', jsonParser, (req, res) => {
	data.alpha = req.body.alpha	
	data.beta = req.body.beta;
	data.gamma = req.body.gamma;
    res.sendStatus(200);
});

app.get('/get', (req, res) => {
	res.json(data);
	console.log(data);
});

