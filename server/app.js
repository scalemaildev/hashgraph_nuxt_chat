const express = require('express');
const app = express();
const server = require('http').createServer(app);
express.json();
express.urlencoded({extended: true});

 const options = {
   cors: {
     origin: "http://localhost:3000",
     credentials: true
   }
};

const io = require('socket.io')(server, options);

io.on('connection', socket => {
  console.log('IO connected');
  socket.on('destroy', () => {
    console.log('destroyed');
  });
  socket.on('hello', () => {
    console.log('hello');
  });
});

module.exports = {
  app, server
};
