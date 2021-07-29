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

// IO
io.on('connection', socket => {
  console.log('IO connected');

  // Init the hedera client
  socket.on('initHederaClient', () => {
    let response = hashgraph.initHashgraphClient();
    io.emit('initHederaClient', response);
  });

  socket.on('setTopicId', (data) => {
    let newTopicId = data.topicId;
    let response = hashgraph.setTopicId(newTopicId);
    io.emit('setTopicId', response);
  });

  socket.on('createNewTopicId', async () => {
    let response = await hashgraph.createNewTopicId();
    io.emit('createNewTopicId', response);
  });
});

module.exports = {
  app, server
};
