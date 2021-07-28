export const state = () => ({
  socket: ''
});

export const mutations = {
  addIo(state, fn) {
    console.log('hi there');
    state.socket = fn;
  },
};
