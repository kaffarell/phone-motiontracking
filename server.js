const express = require('express');
var bodyParser = require('body-parser');

const app = express();
var jsonParser = bodyParser.json();

var data = {
	alpha: 0,
	beta: 0,
	gamma: 0
}


let portNumber = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.post('/send', jsonParser, (req, res) => {
	data.alpha = req.body.alpha	
	data.beta = req.body.beta;
	data.gamma = req.body.gamma;
	console.log('Post Data: ' + data);
    res.sendStatus(200);
});

app.get('/get', (req, res) => {
	console.log('Get Data: ' + data);
	res.json(data);
});

app.listen(portNumber, () => {
	console.log('Listening on port: ' + portNumber);
});
