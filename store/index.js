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
    let messagePayload = {
      lede: ">>",
      message: ""
    };
    if (data.messageType == 'newConnection') {
      messagePayload.message = "New server-side connection from account: " + data.accountId;
    } else if (data.messageType == 'message') {
      let jsonPayload = JSON.parse(data.contents);
      messagePayload.lede = jsonPayload.accountId;
      messagePayload.message = jsonPayload.message;
    }
    commit('pushMessage', messagePayload);
  },  
};
