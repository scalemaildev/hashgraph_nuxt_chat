/* State */
export const state = () => ({
  chatMessages: [],
  topicId: "",
  topicQuerying: false,
  topicSet: false,
  mirrorSubbed: false,
});

/* Mutations */
export const mutations = {  
  toggleTopicSet(state, bool) {
    state.topicSet = bool;
  },
  toggleTopicQuerying(state, bool) {
    state.topicQuerying = bool;
  },
  toggleMirrorSubbed(state, bool) {
    state.mirrorSubbed = bool;
  },
  storeTopicId(state, topicId) {
    state.topicId = topicId;
  },
  pushMessage(state, message) {
    state.chatMessages.push(message);
  }
};

/* Actions */
export const actions = {
  asyncEmit({ commit }, context) {
    if (!context.eventName) {
      console.error('No eventName in asyncEmit invocation!');
      return -1;
    }
    let eventName = context.eventName;
    let socket = window.$nuxt.$root.mainSocket;
    return new Promise(function (resolve) {
      socket.emit(eventName, context);
      socket.on(eventName, result => {
	socket.off(eventName);
	resolve(result);
      });
    });
  },
  
  formatMessage({ commit }, data) {
    let inJson = JSON.parse(data.contents);
    let outJson = {};
    console.log(data);
    if (inJson.messageType == 'newConnection') {
      outJson.lede = ">>";
      outJson.message = "Account ID " + inJson.accountId + " has subscribed to the chat topic...";
    } else if (inJson.messageType == 'message') {
      outJson.lede = "Account " + inJson.accountId + ": ";
      outJson.message = inJson.message;
    } else if (inJson.messageType == 'disconnect') {
      outJson.lede = ">>";
      outJson.message = "Account " + inJson.accountId + " has disconnected from the chat topic...";
    } else {
      console.log('Got unknown message from HCS...');
      console.log(data);
    }
    commit('pushMessage', outJson);
  },  
};
