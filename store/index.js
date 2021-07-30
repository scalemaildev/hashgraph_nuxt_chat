/* State */
export const state = () => ({
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
  }
};
