const express = require('express');
const fs = require('fs');
const https = require('https');

let privateKey = fs.readFileSync( 'ssl/example.com+5-key.pem');
let certificate = fs.readFileSync( 'ssl/example.com+5.pem' );


const app = express();
app.use(express.json());

let data = {
	alpha: 0,
	beta: 0,
	gamma: 0
}


let portNumber = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

let options = {
	key: privateKey,
	cert: certificate
}

https.createServer(options, app).listen(portNumber, function(){
  console.log("Express server listening on port " + portNumber);
});


app.post('/send', (req, res) => {
	data.alpha = req.body.alpha	
	data.beta = req.body.beta;
	data.gamma = req.body.gamma;
    res.sendStatus(200);
});

app.get('/get', (req, res) => {
	res.json(data);
});
