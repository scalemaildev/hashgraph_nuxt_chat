<template>
<v-container>
  <v-row>
    <v-col cols="12" align="center" justify="center">
      Chat input goes here.
    </v-col>
  </v-row>
</v-container>
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
