export const state = () => ({
  socket: ''
});

export const mutations = {
  addIo(state, fn) {
    state.socket = fn;
  },
};
