<template>
<v-container class="chatbox">
  <v-row>
    <v-col cols="11">
      <v-text-field
	v-model="chatMessage" />
    </v-col>
    <v-col cols="1" justify="center" align="center">
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
      let messagePayload = {
	messageType: 'message',
	message: this.chatMessage,
	topicId: this.topicId,
	accountId: this.$config.accountId
      };
      
      this.socket.emit('sendMessage', messagePayload)
      this.chatMessage = "";
    }
  },
}
</script>
