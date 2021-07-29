# Hashgraph Nuxt Chat

This is a PoC for a NuxtJS app that utilizes the hashgraph. It's based off the original [hedera-hcs-chat-js](https://github.com/hashgraph/hedera-hcs-chat-js) and uses nuxt-socket-io along with base socket.io to serve the hashgraph code.

This is not intended to be used on the Mainnet or as a base for any dapp, but may be a useful starting point for someone interested in using the hashgraph on a modern Javascript framework.

Built from template: https://github.com/xreider/nuxt-express-boilerplate

## Running

Use 'npm run dev' to startup the server and client. You will need nodemon installed (npm install -g nodemon). Then go to localhost:3000 and test the browser app. Look in the console for the play-by-play of each client action.

## Issues

Occasionally attempts to create a new topic id fail with an 'INVALID_TRANSACTION_START' message. The SDK describes this as a transaction with a start time greater than 0. It's likely obfuscating some other error. Feels like a race condition?
