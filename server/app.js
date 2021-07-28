const express = require('express');
const app = express();
const server = require('http').createServer(app);
const hashgraph = require('./hashgraph');
express.json();
express.urlencoded({extended: true});

const options = {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
};
const io = require('socket.io')(server, options);

// Hedera
var HederaClient = "";

// IO
io.on('connection', socket => {
  console.log('IO connected');

  // Init the hedera client
  socket.on('initHederaClient', () => {
    hashgraph.initHashgraphClient();
  });
});

module.exports = {
  app, server
};
