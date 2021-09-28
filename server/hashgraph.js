/* Utils */
const TextDecoder = require("text-encoding").TextDecoder;

/* From SDK */
const {
    Client,
    AccountId,
    PrivateKey,
    TopicId,
    TopicCreateTransaction,
    TopicMessageQuery,
    TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");

/* Inits */
var HederaClient = "";
var topicId = "";
var operatorAccountId = process.env.ACCOUNT_ID;
var subscriptions = {};

function initHashgraphClient() {
    if (!process.env.ACCOUNT_ID || !process.env.PRIVATE_KEY) {
        console.error("Did not find ACCOUNT_ID or PRIVATE_KEY in .env file!");
        return -1;
    } else {
        try {
            HederaClient = Client.forTestnet();
            let accountId = AccountId.fromString(process.env.ACCOUNT_ID);
            let privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
            HederaClient.setOperator(accountId, privateKey);
            operatorAccountId = accountId;
            return 'Hedera client initialized...';
        } catch (error) {
            console.error(error);
            return -1;
        }
    }
}

function setTopicId(newTopicId) {
    try {
        if (typeof newTopicId === 'string' || newTopicId instanceof String) {
            topicId = TopicId.fromString(newTopicId);
        } else {
            topicId = newTopicId;
        }
        return 'Setting Topic Id: ' + topicId + '...';
    } catch (error) {
        console.error(error);
        return -1;
    }
}

async function createNewTopicId() {
    try {
        const tx = await new TopicCreateTransaction().execute(HederaClient);
        const receipt = await tx.getReceipt(HederaClient);
        const newTopicId = receipt.topicId + ''; // BUG: TopicId.fromString() complains about 'text.split' unless empty string is appended
        topicId = newTopicId;
        return newTopicId;
    } catch (error) {
        console.error(error);
        return -1;
    }
}

async function subscribeToMirror(io, topicId) {

    // when the page is refreshed, pre-existing subs still remain
    if (subscriptions[topicId]) {
        subscriptions[topicId].unsubscribe();
    }
    
    try {
        let sub = new TopicMessageQuery()
            .setTopicId(topicId)
            .setStartTime(0) // TODO: set this three days back
            .subscribe(HederaClient, res => {	
	        const contents = new TextDecoder("utf-8").decode(res.contents);
	        io.emit('newMessage', {
	            'contents': contents
	        });
            });
        subscriptions[topicId] = sub;
    } catch (error) {
        console.error(error);
    }
};

async function sendHCSMessage(data) {
    data.topicId = topicId;
    data.accountId = process.env.ACCOUNT_ID;
    let messagePayloadJson = JSON.stringify(data);
    
    try {
        await new TopicMessageSubmitTransaction({
            topicId: data.topicId,
            message: messagePayloadJson})
	    .execute(HederaClient);
        
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    operatorAccountId,
    initHashgraphClient,
    setTopicId,
    createNewTopicId,
    subscribeToMirror,
    sendHCSMessage
};
