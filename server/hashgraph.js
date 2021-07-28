const {
  Client,
  AccountId,
  PrivateKey,
  TopicId,
  TopicCreateTransaction,
  TopicMessageQuery,
} = require("@hashgraph/sdk");

function initHashgraphClient() {
  if (!process.env.ACCOUNT_ID || !process.env.PRIVATE_KEY) {
    console.error("Did not find ACCOUNT_ID or PRIVATE_KEY in .env file!");
  } else {
    try {
      HederaClient = Client.forTestnet();
      let accountId = AccountId.fromString(process.env.ACCOUNT_ID);
      let privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
      HederaClient.setOperator(accountId, privateKey);
      console.log("Hedera client is set.");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  initHashgraphClient
};
