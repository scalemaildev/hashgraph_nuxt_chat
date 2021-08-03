<template>
<v-container class="chatbox">
  <v-row no-gutters>
    <v-col>
      <div class="d-flex flex-row align-center">
        <v-text-field v-model="chatMessage" placeholder="Enter text here..." @keypress.enter="sendMessage()"></v-text-field>
        <v-btn class="ml-4" @click="sendMessage()">Send</v-btn>
      </div>
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
    sendMessage() {
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
