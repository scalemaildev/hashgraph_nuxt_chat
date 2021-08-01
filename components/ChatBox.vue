<template>
<v-container>
  <v-row>
    <v-col cols="8" align="center" justify="center">
      <v-text-field
	v-model="chatMessage" />
    </v-col>
    <v-col cols="2">
      <v-btn
	@click="sendMessage(chatMessage)">
	Send
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      chatMessage: "",
    }
  },
  computed: {    
    topicId () {
      return this.$store.state.topicId
    },
  },
  mounted() {
    this.socket = window.$nuxt.$root.mainSocket;
  },
  methods: {
    sendMessage(chatMessage) {
      this.socket.emit('sendMessage', {
	messageType: 'message',
	message: this.chatMessage,
	topicId: this.topicId,
	accountId: this.$config.accountId
      })
      this.chatMessage = "";
    }
  },
}
</script>
