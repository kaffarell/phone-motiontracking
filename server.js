const express = require('express');
const WSS = require('websocket').server;
const https = require('https');
const fs = require('fs');

// Load https key and certificate
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
const apiRoutes = require('./routes/api');

let portNumber = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/api', apiRoutes);


var httpsServer = https.createServer(credentials, app);
httpsServer.listen(portNumber, () => {
    console.log("https server starting on port : " + portNumber)
  });

const wssserver =  https.createServer(credentials);
wssserver.listen(8181);

const wss = new WSS({
    httpServer: wssserver,
    autoAcceptConnections: false
});

wss.on('connection', (ws) => {
    ws.send('New Device Connected!');
  
    ws.on('message', (data) => {
      ws.send('message received: ', data);
    });
    ws.on('close', () => {
      console.log('socket closed');
    });
  });
