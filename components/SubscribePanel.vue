<template>
  <v-container class="content-body">
    <v-row>
      <v-col cols="12" align="center" justify="center">
	<p><strong>Topic Id: {{ topicId }}</strong></p>
	<p>Subscribing to Mirror Network <i>
	    hcs.testnet.mirrornode.hedera.com:5600</i>...</p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
	@click="subscribeToMirror(topicId)">
	Subscribe
      </v-btn>
    </v-row>
  </v-container>  
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    topicId () {
      return this.$store.state.topicId
    },
  },
  mounted() {
    this.socket = window.$nuxt.$root.mainSocket;
  },
  methods: {    
    ...mapMutations([
      'toggleMirrorSubbed',
    ]),    
    async subscribeToMirror(topicId) {
      console.log('Subscribing to mirror network...')
      this.socket.emit('subscribeToMirror', {
	topicId: topicId
      })
      this.toggleMirrorSubbed(true)
      this.socket.emit('sendMessage', {
	'messageType': 'newConnection'
      })
    },
  }
}
</script>
