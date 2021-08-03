<template>
<v-container class="chatwindow overflow-y-auto pb-0 mb-0">
  <strong>>> Chat Started on Topic Id: {{ topicId }}</strong>
  <v-row align="end">
    <v-col>
      <div v-for="msg in chatMessages">
	<strong>{{ msg.lede }}</strong> {{ msg.message }}
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  computed: {
    chatMessages () {
      return this.$store.state.chatMessages;
    },
    topicId () {
      return this.$store.state.topicId;
    }
  }
}  
</script>
