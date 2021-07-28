<template>
  <div>
    <div>Navbar</div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    window.socket = io();
    this.$store.commit("addIo", io);
    window.addEventListener("beforeunload", (event) => {
      window.socket.emit("destroy");
    });
  },
  destroyed() {
    window.socket.emit("destroy");
  },
};
</script>

<style scoped>
</style>
