const express = require('express');
const WSS = require('websocket').server;
const http = require('http');


const app = express();
const apiRoutes = require('./routes/api');

let portNumber = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/api', apiRoutes);

app.listen(portNumber, () => {
    console.log(`Server running on Port ${portNumber}!`);
});

const server =  http.createServer();
server.listen(8181);

const wss = new WSS({
    httpServer: server,
    autoAcceptConnections: false
});

const connections = [];

wss.on('request', request => {
    const connection = request.accept('chat', request.origin);

    connection.push(connection);

    connection.on('message', message => {
        for(let i; i < connections.length(); i++){
            if(connections[i] && connections[i].send){
                connections[i].send(message.utf8Data);
            }
        }
    })
})
