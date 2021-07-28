/* State */
export const state = () => ({
  socket: "",
  topicId: "",
  topicQuerying: false,
  topicSet: false,
  mirrorSubbed: false,
});

/* Mutations */
export const mutations = {  
  addIo(state, fn) {
    state.socket = fn;
  },
  
  setTopicId(state, topicId) {
    try {
      state.topicId = TopicId.fromString(topicId);
      console.log(`Setting topic id: ${topicId}`);
      state.topicSet = true;
      state.topicQuerying = false;
    } catch (error) {
      console.error(error);
    }
  },
  
  toggleTopicQuerying(state, bool) {
    state.topicQuerying = bool;
  },
};

/*  Actions */
export const actions = {  
  async createAndSetTopicId({ commit }) {
    try {
      commit('toggleTopicQuerying', true);
      console.log("Creating new topic id...");
      const txId = await new TopicCreateTransaction()
	    .execute(state.HederaClient);
      const receipt = await txId.getReceipt(state.HederaClient);
      const newTopicId = receipt.topicId + ''; // BUG: TopicId.fromString() complains about 'text.split' unless empty string is appended
      console.log(`Got new Topic Id: ${newTopicId}`);
      commit('setTopicId', newTopicId);
    } catch (error) {
      console.error(error);
    }
  },
};

