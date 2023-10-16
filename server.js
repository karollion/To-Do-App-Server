// Imports
const express = require('express');
const path = require('path')
const db = require('./db');
const socket = require('socket.io');

const app = express();

const server = app.listen(3030, () => {
  console.log('Server is running on Port:', 3030)
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

});