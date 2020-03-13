var express = require('express');
var http = require('http');
var app = express();
var path = require('path');

var Stream = require('stream');
var readableStream = new Stream.Readable();

var host = '127.0.0.1';
var port = 8080;

var server = http.createServer(app).listen(port, host, function() {
    var serverUrl = host + ':' + port
    console.log('Server running at ' + serverUrl);
});

var io = require('socket.io').listen(server);

var indexPath = path.join(__dirname, '..', 'instachat/public/index.html');
 
app.get('/', function(req, res) {
    console.log('index page from : ' + indexPath);
    res.sendFile(indexPath);
})

var __users = [];

io.sockets.on('connection', function(socket) {
    var __pseudo = '';

    socket.on('new_channel', function(channel) {
        socket.channel = '/' + channel;
        io.emit('new_channel', channel);
    })

    socket.on('new_client', function(data) {
        var payload = { pseudo: data.pseudo, channel: data.channel };

        __pseudo = data.pseudo;
        __users.push(payload);

        io.emit('new_client', __users);
    });

    socket.on('stream', function(flow) {
        console.log(flow);
        socket.broadcast.emit('streaming', flow);
    });

    socket.on('disconnect', function() {
        for (let i = 0; i < __users.length; i++) __users[i].pseudo === __pseudo && __users.splice(i, 1);
        io.emit('disconnect', __users);
    })
});