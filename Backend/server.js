var express = require('express');
var http = require('http').createServer(express());
var io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000", // Allow the React app running on port 3000
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('User Online');

    socket.on('canvas-data', (data) => {
        //console.log("Received canvas data:", data);  // For debugging
        socket.broadcast.emit('canvas-data', data);  // Emit data to other users
    });
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Server started on port " + server_port);
});
