const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const hashgraph = require('./hashgraph');
express.json();
express.urlencoded({extended: true});

// Make sure there's an account in .env
if (!process.env.ACCOUNT_ID) {
  throw 'NO ACCOUNT ID FOUND IN .ENV!';
}

// Socket
const options = {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
};
const io = require('socket.io')(server, options);

// IO
io.on('connection', socket => {
  io.emit('newMessage', {
    'messageType': 'newConnection',
    'accountId': process.env.ACCOUNT_ID,
  });

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

  socket.on('subscribeToMirror', async (data) => {    
    let topicId = data.topicId;
    await hashgraph.subscribeToMirror(io, topicId);
  });

  socket.on('sendMessage', (data) => {
    hashgraph.sendHCSMessage(data);
  });
});

module.exports = {
  app, server
};
