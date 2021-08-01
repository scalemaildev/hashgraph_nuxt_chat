<template>
<v-container>
  <v-row>
    <v-col cols="12" justify="center">
      <strong>>> Chat Started</strong>
    </v-col>
  </v-row>
  <div v-for="messagePayload in chatMessages">
    <v-row>
      <v-col cols="12" justify="center">
	{{ messagePayload.lede }} {{ messagePayload.message }}
      </v-col>
    </v-row>
  </div>
</v-container>
</template>

<script>
export default {
  computed: {
    chatMessages () {
      return this.$store.state.chatMessages;
    },
  },
}  
</script>
