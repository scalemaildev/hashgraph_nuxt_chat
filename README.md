# Hashgraph Nuxt Chat

This is a PoC for a NuxtJS app that utilizes the hashgraph. It's based off the original [hedera-hcs-chat-js](https://github.com/hashgraph/hedera-hcs-chat-js) and uses nuxt-socket-io along with base socket.io to serve the hashgraph code.

This is not intended to be used on the Mainnet or as a base for any dapp, but may be a useful starting point for someone interested in using the hashgraph SDK with a modern Javascript framework.

Built from template: https://github.com/xreider/nuxt-express-boilerplate

## Setup

Type your Testnet account id and private key into the .env file. Use 'npm install' to grab all the packages. You will also need nodemon installed, either locally or globally (npm install -g nodemon for globally).

## Running

Use 'npm run dev' to startup the server and client. Then go to localhost:3000 and test the browser app. Look in the console for the play-by-play of each client action.

## Issues

When subscribing to the same topic multiple times from one client, duplicate messages appear in the chat.
