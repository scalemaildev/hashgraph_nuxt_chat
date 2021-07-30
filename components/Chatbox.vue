<template>
<div>
  Success!
</div>
</template>

<script>
export default {
  computed: {
    chatMessages () {
      return this.$store.state.chatMessages
    }
  },
  methods: {
  },
}
</script>
