// Imports
const express = require('express');
const path = require('path')
const db = require('./db');
const socket = require('socket.io');

const app = express();

// middleware to share files in client folder
app.use(express.static(path.join(__dirname, '/client')))
// return client application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(3030, () => {
  console.log('Server is running on Port:', 3030)
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  // emit Event updateData to socket
  io.to(socket.id).emit('updateData', db.tasks);

  // EventListener to event addTask
  socket.on('addTask', (task) => {
    db.tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });

  // EventListener to event removeTask
  socket.on('removeTask', (idTask) => {
    db.tasks = db.tasks.filter(task => task.id !== idTask);
    socket.broadcast.emit('removeTask', idTask);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});