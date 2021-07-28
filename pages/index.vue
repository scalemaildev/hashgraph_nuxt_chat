<template>
  <div>
    <h1>Index</h1>
    <div>
      <NuxtLink to="/about">About</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  mounted() {
    this.$nextTick(() => {
      window.socket.emit("hello");
    });
  },
};
</script>

<style scoped>
</style>
